import { asc, desc, eq } from "drizzle-orm";

import { getGitHubProjects } from "../github";
import { getPublicAssetUrl } from "../storage/r2";
import { getVercelProjects, type VercelProject } from "../vercel";
import { db } from "./index";
import { fallbackExperiences, type WorkExperience } from "./fallback-experiences";
import { fallbackProjects, type PortfolioProject } from "./fallback-projects";
import { fallbackBlogPosts, type PublicBlogPost } from "./fallback-blog-posts";
import { assets, blogPosts, experiences, projects } from "./schema";

const fallbackCvUrl = getPublicAssetUrl("assets/cv/cv.docx") ?? "/#contact";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function applyVercelUrls(portfolioProjects: PortfolioProject[], vercelProjects: VercelProject[]): PortfolioProject[] {
  if (vercelProjects.length === 0) {
    return portfolioProjects;
  }

  const vercelByRepositoryUrl = new Map(
    vercelProjects
      .filter((project) => project.repositoryUrl && project.demoUrl)
      .map((project) => [project.repositoryUrl, project]),
  );
  const vercelBySlug = new Map(
    vercelProjects
      .filter((project) => project.demoUrl)
      .map((project) => [project.slug, project]),
  );

  return portfolioProjects.map((project) => {
    const vercelProject =
      (project.repositoryUrl ? vercelByRepositoryUrl.get(project.repositoryUrl) : null) ??
      vercelBySlug.get(slugify(project.title));

    return {
      ...project,
      demoUrl: vercelProject?.demoUrl ?? project.demoUrl,
      imageUrl: project.imageUrl,
    };
  });
}

function mergeRelatedProjects(portfolioProjects: PortfolioProject[]): PortfolioProject[] {
  const landing = portfolioProjects.find((project) => slugify(project.title) === "coreback-cli-landing");
  const lumifyFrontend = portfolioProjects.find((project) => slugify(project.title) === "lumify-pim-dam-frontend");
  const lumifyBackend = portfolioProjects.find((project) => slugify(project.title) === "lumify-pim-dam-backend");
  const hiddenRelatedSlugs = new Set([
    ...(landing ? ["coreback-cli-landing"] : []),
    ...(lumifyFrontend && lumifyBackend ? ["lumify-pim-dam-backend"] : []),
  ]);

  return portfolioProjects
    .filter((project) => !hiddenRelatedSlugs.has(slugify(project.title)))
    .map((project) => {
      if (slugify(project.title) !== "create-backforge") {
        if (slugify(project.title) === "lumify-pim-dam-frontend" && lumifyFrontend && lumifyBackend) {
          return {
            ...project,
            title: "Lumify PIM/DAM",
            description:
              "Aplicación full stack para Lumify orientada a gestión de información y activos digitales. Incluye frontend en React/TypeScript, backend API en Node.js y despliegue en Vercel.",
            demoUrl: lumifyFrontend.demoUrl ?? project.demoUrl,
            repositoryUrl: lumifyFrontend.repositoryUrl ?? project.repositoryUrl,
            imageUrl: lumifyFrontend.imageUrl ?? lumifyBackend.imageUrl,
            technologies: [...new Set([...lumifyFrontend.technologies, ...lumifyBackend.technologies])],
          };
        }

        return project;
      }

      if (!landing) {
        return project;
      }

      return {
        ...project,
        demoUrl: landing.demoUrl ?? project.demoUrl,
        imageUrl: project.imageUrl ?? landing.imageUrl,
        technologies: [...new Set([...project.technologies, ...landing.technologies])],
      };
    });
}

export async function getExperiences(): Promise<WorkExperience[]> {
  if (!db) {
    return fallbackExperiences;
  }

  try {
    const rows = await db
      .select({
        year: experiences.year,
        title: experiences.title,
        duration: experiences.duration,
        details: experiences.details,
      })
      .from(experiences)
      .orderBy(asc(experiences.sortOrder), desc(experiences.year));

    return rows.length > 0 ? rows : fallbackExperiences;
  } catch {
    return fallbackExperiences;
  }
}

export async function getProjects(): Promise<PortfolioProject[]> {
  const [githubProjects, vercelProjects] = await Promise.all([
    getGitHubPortfolioProjects(),
    getVercelProjects(),
  ]);

  if (!db) {
    return mergeRelatedProjects(applyVercelUrls(fallbackProjects.length > 0 ? fallbackProjects : githubProjects, vercelProjects));
  }

  try {
    const rows = await db
      .select({
        title: projects.title,
        description: projects.description,
        repositoryUrl: projects.repositoryUrl,
        demoUrl: projects.demoUrl,
        imageUrl: projects.imageUrl,
        technologies: projects.technologies,
        featured: projects.featured,
      })
      .from(projects)
      .orderBy(asc(projects.sortOrder), asc(projects.title));

    if (rows.length > 0) {
      return mergeRelatedProjects(applyVercelUrls(rows.filter((project) => project.featured), vercelProjects));
    }
  } catch {
    return mergeRelatedProjects(applyVercelUrls(fallbackProjects.length > 0 ? fallbackProjects : githubProjects, vercelProjects));
  }

  return mergeRelatedProjects(applyVercelUrls(fallbackProjects.length > 0 ? fallbackProjects : githubProjects, vercelProjects));
}

async function getGitHubPortfolioProjects(): Promise<PortfolioProject[]> {
  const githubProjects = await getGitHubProjects();

  return githubProjects.slice(0, 6).map((project) => ({
    title: project.name,
    description: project.description,
    repositoryUrl: project.repositoryUrl,
    demoUrl: project.demoUrl,
    imageUrl: null,
    technologies: project.technologies,
  }));
}

export async function getCvUrl(): Promise<string> {
  if (!db) {
    return fallbackCvUrl;
  }

  try {
    const [cvAsset] = await db
      .select({ url: assets.url })
      .from(assets)
      .where(eq(assets.type, "cv"))
      .orderBy(desc(assets.updatedAt))
      .limit(1);

    return cvAsset?.url ?? fallbackCvUrl;
  } catch {
    return fallbackCvUrl;
  }
}

export async function getBlogPosts(): Promise<PublicBlogPost[]> {
  if (!db) {
    return fallbackBlogPosts;
  }

  try {
    const rows = await db
      .select({
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        tags: blogPosts.tags,
        publishedAt: blogPosts.publishedAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));

    return rows.length > 0 ? rows : fallbackBlogPosts;
  } catch {
    return fallbackBlogPosts;
  }
}

export async function getBlogPost(slug: string): Promise<PublicBlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
