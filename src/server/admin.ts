"use server";

import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getGitHubProjects } from "./github";
import { getVercelProjects } from "./vercel";
import { db, hasDatabaseUrl } from "./db";
import { fallbackProjects } from "./db/fallback-projects";
import { projects, type NewProject } from "./db/schema";
import { hasR2Config, uploadToR2 } from "./storage/r2";

const adminCookieName = "portfolio_admin";
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const loginWindowMs = 15 * 60 * 1000;
const maxLoginAttempts = 5;

function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = loginAttempts.get(key);

  if (!current || current.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > limit;
}

async function getRequestKey(): Promise<string> {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

function getAdminPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

function getSessionValue(password: string): string {
  return createHmac("sha256", password).update("portfolio-admin-session").digest("hex");
}

function safeCompare(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = getAdminPassword();

  if (!password) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(adminCookieName)?.value;

  return Boolean(session && safeCompare(session, getSessionValue(password)));
}

export async function loginAdmin(formData: FormData): Promise<void> {
  const password = getAdminPassword();
  const submittedPassword = String(formData.get("password") ?? "");
  const requestKey = await getRequestKey();

  if (isRateLimited(requestKey, maxLoginAttempts, loginWindowMs)) {
    redirect("/admin?error=limited");
  }

  if (!password || !safeCompare(submittedPassword, password)) {
    redirect("/admin?error=1");
  }

  loginAttempts.delete(requestKey);

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, getSessionValue(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
  redirect("/admin");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseTechnologies(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

function getImageExtension(contentType: string): string {
  if (contentType.includes("png")) {
    return "png";
  }

  if (contentType.includes("webp")) {
    return "webp";
  }

  return "jpg";
}

async function uploadDeploymentPreviewToR2(imageUrl: string | null, slug: string): Promise<string | null> {
  if (!imageUrl || !hasR2Config()) {
    return null;
  }

  const response = await fetch(imageUrl, { next: { revalidate: 0 } }).catch(() => null);

  if (!response?.ok) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";

  if (!contentType.startsWith("image/")) {
    return null;
  }

  const body = Buffer.from(await response.arrayBuffer());
  const extension = getImageExtension(contentType);

  return uploadToR2({
    key: `assets/img/deployment/${slug}.${extension}`,
    body,
    contentType,
  }).catch(() => null);
}

async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin?error=auth");
  }
}

export async function getAdminProjectData() {
  const [githubProjects, vercelProjects] = await Promise.all([
    getGitHubProjects(),
    getVercelProjects(),
  ]);
  const databaseProjects = db
    ? await db
        .select({
          id: projects.id,
          title: projects.title,
          slug: projects.slug,
          description: projects.description,
          repositoryUrl: projects.repositoryUrl,
          demoUrl: projects.demoUrl,
          imageUrl: projects.imageUrl,
          technologies: projects.technologies,
          featured: projects.featured,
          sortOrder: projects.sortOrder,
        })
        .from(projects)
        .orderBy(asc(projects.sortOrder), asc(projects.title))
        .catch(() => [])
    : [];

  const knownRepositoryUrls = new Set(databaseProjects.map((project) => project.repositoryUrl).filter(Boolean));
  const knownSlugs = new Set(databaseProjects.map((project) => project.slug));
  const githubByRepositoryUrl = new Map(githubProjects.map((project) => [project.repositoryUrl, project]));
  const githubBySlug = new Map(githubProjects.map((project) => [slugify(project.name), project]));

  return {
    hasDatabaseUrl,
    databaseProjects,
    fallbackProjects,
    githubProjects: githubProjects.map((project) => ({
      ...project,
      slug: slugify(project.name),
      alreadyImported:
        knownRepositoryUrls.has(project.repositoryUrl) || knownSlugs.has(slugify(project.name)),
    })),
    vercelProjects: vercelProjects.map((project) => {
      const matchedGitHubProject = project.repositoryUrl
        ? githubByRepositoryUrl.get(project.repositoryUrl)
        : githubBySlug.get(slugify(project.repositoryName ?? project.name));
      const technologies = [
        project.framework,
        ...(matchedGitHubProject?.technologies ?? []),
      ].filter((technology): technology is string => Boolean(technology));

      return {
        ...project,
        description: matchedGitHubProject?.description ?? `Deployment publicado en Vercel para ${project.name}.`,
        repositoryUrl: project.repositoryUrl ?? matchedGitHubProject?.repositoryUrl ?? null,
        technologies: [...new Set(technologies)],
        matchedGitHubName: matchedGitHubProject?.name ?? null,
        alreadyImported:
          knownSlugs.has(project.slug) ||
          Boolean(project.repositoryUrl && knownRepositoryUrls.has(project.repositoryUrl)) ||
          Boolean(matchedGitHubProject && knownRepositoryUrls.has(matchedGitHubProject.repositoryUrl)),
      };
    }),
  };
}

export async function toggleProjectVisibility(formData: FormData): Promise<void> {
  await requireAdmin();

  if (!db) {
    redirect("/admin?error=db");
  }

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) {
    redirect("/admin?error=project");
  }

  await db.delete(projects).where(eq(projects.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function importGitHubProject(formData: FormData): Promise<void> {
  await requireAdmin();

  if (!db) {
    redirect("/admin?error=db");
  }

  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? title));
  const description = String(formData.get("description") ?? "Proyecto publicado en GitHub.").trim();
  const repositoryUrl = String(formData.get("repositoryUrl") ?? "").trim() || null;
  const demoUrl = String(formData.get("demoUrl") ?? "").trim() || null;
  const externalImageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const technologies = parseTechnologies(formData.get("technologies"));

  if (!title || !slug) {
    redirect("/admin?error=project");
  }

  const sortOrder = Number(formData.get("sortOrder")) || 100;
  const imageUrl = await uploadDeploymentPreviewToR2(externalImageUrl, slug);
  const newProject: NewProject = {
    title,
    slug,
    description,
    repositoryUrl,
    demoUrl,
    imageUrl,
    technologies,
    featured: true,
    sortOrder,
  };

  await db
    .insert(projects)
    .values(newProject)
    .onConflictDoUpdate({
      target: projects.slug,
      set: {
        title: newProject.title,
        description: newProject.description,
        repositoryUrl: newProject.repositoryUrl,
        demoUrl: newProject.demoUrl,
        ...(newProject.imageUrl ? { imageUrl: newProject.imageUrl } : {}),
        technologies: newProject.technologies,
        featured: true,
        sortOrder: newProject.sortOrder,
      },
    });

  revalidatePath("/");
  revalidatePath("/admin");
}
