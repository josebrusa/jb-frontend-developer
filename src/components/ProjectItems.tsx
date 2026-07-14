"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "motion/react";

import type { PortfolioProject } from "../server/db/fallback-projects";

type ProjectItemsProps = { project: PortfolioProject };

function getDisplayUrl(url: string | null): string | null {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    return `${parsedUrl.hostname}${parsedUrl.pathname.replace(/\/$/, "")}`;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

const ProjectItems = ({ project }: ProjectItemsProps) => {
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg)");
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const href = project.demoUrl ?? project.repositoryUrl ?? "#";
  const technologies = project.technologies.slice(0, 5);
  const deployment = getDisplayUrl(project.demoUrl) ?? "Private deployment";
  const repository = getDisplayUrl(project.repositoryUrl) ?? "GitHub source";
  const availability = project.demoUrl ? "Live" : project.repositoryUrl ? "Code" : "Private";
  const initials = project.title
    .split(/\s|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTransform(`perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`);
  }

  function resetTransform() {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg)");
  }

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <article
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTransform}
        style={{ transform }}
        className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050505]/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-white/25 hover:bg-[#080808] md:grid md:grid-cols-[0.9fr_1.55fr] md:gap-6 md:p-5"
      >
        <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-[#29F3C3]/10 blur-3xl transition group-hover:bg-[#29F3C3]/20" />
        <div className="relative block overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#111] shadow-inner shadow-white/5">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-64 w-full object-cover opacity-80 grayscale transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0 md:h-full"
            />
          ) : project.demoUrl ? (
            <div className="relative h-64 min-h-full overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(41,243,195,0.18),transparent_30%),linear-gradient(145deg,#101010,#050505)] md:h-full">
              <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-white/[0.055] px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 min-w-0 flex-1 truncate rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-medium text-white/45">
                  {deployment}
                </span>
              </div>
              <div className="absolute inset-x-6 bottom-6 top-14 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl shadow-black/30 transition duration-500 group-hover:border-[#29F3C3]/35">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-[#29F3C3]/25 bg-[#29F3C3]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#29F3C3]">
                    Live preview
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#29F3C3] shadow-[0_0_22px_#29F3C3]" />
                </div>
                <div className="space-y-3">
                  <div className="h-8 w-3/4 rounded-lg bg-white/14" />
                  <div className="h-3 w-full rounded-full bg-white/8" />
                  <div className="h-3 w-5/6 rounded-full bg-white/8" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="h-14 rounded-xl border border-white/10 bg-white/[0.055]" />
                  <div className="h-14 rounded-xl border border-white/10 bg-white/[0.055]" />
                  <div className="h-14 rounded-xl border border-white/10 bg-[#29F3C3]/12" />
                </div>
                <span className="absolute bottom-4 right-5 text-5xl font-semibold tracking-[-0.12em] text-white/12">
                  {initials}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="relative flex h-64 min-h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_40%_35%,rgba(41,243,195,0.20),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] md:h-full">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="absolute left-8 top-8 h-2 w-2 rounded-full bg-[#29F3C3] shadow-[0_0_28px_#29F3C3]" />
              <div className="absolute bottom-10 right-8 h-16 w-16 rounded-full border border-[#29F3C3]/20" />
              <span className="relative text-6xl font-semibold tracking-[-0.1em] text-white/78 drop-shadow-[0_0_24px_rgba(41,243,195,0.28)]">
                {initials}
              </span>
            </div>
          )}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${project.title}`}
            className="absolute inset-0"
          />
        </div>

      <div className="relative pt-6 md:py-2">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-lg text-white/45">Deployment</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">{project.title}</h3>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex max-w-full break-all text-base font-medium text-white/82 transition hover:text-[#29F3C3]"
            >
              {deployment}
            </a>
          </div>
          <div className="hidden shrink-0 rounded-full border border-[#29F3C3]/25 bg-[#29F3C3]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#29F3C3] shadow-[0_0_24px_rgba(41,243,195,0.08)] md:block">
            {availability}
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/58 md:text-base md:leading-7">{project.description}</p>

        <div className="mt-7 grid gap-5 text-sm text-white/70 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-base text-white/42">Status</p>
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-[#72F0D1]" />
              Ready
            </div>
          </div>
          <div>
            <p className="mb-2 text-base text-white/42">Domains</p>
            <p className="break-all font-semibold text-white">{deployment}</p>
          </div>
          <div>
            <p className="mb-2 text-base text-white/42">Source</p>
            <p className="break-all font-semibold text-white">{repository}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span key={technology} className="rounded-md border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-medium text-white/62">
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#29F3C3]">
              Abrir deployment
            </a>
          ) : null}
          {project.repositoryUrl ? (
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-[#29F3C3] hover:text-[#29F3C3]">
              Ver source
            </a>
          ) : null}
        </div>
      </div>
      </article>
    </motion.div>
  );
};

export default ProjectItems;
