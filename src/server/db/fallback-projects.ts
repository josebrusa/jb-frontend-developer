import type { NewProject, Project } from "./schema";

export type PortfolioProject = Pick<
  Project,
  "title" | "description" | "repositoryUrl" | "demoUrl" | "imageUrl" | "technologies"
>;

export const seedProjects: NewProject[] = [
  {
    title: "Lumify PIM/DAM Frontend",
    slug: "lumify-pim-dam-frontend",
    description:
      "Aplicación frontend para Lumify orientada a gestión de información y activos digitales. Proyecto freelance construido con TypeScript, foco en flujos internos y despliegue en Vercel.",
    repositoryUrl: "https://github.com/josebrusa/pim_dam_frontend",
    demoUrl: "https://pim-dam-lumify.vercel.app",
    imageUrl: null,
    technologies: ["TypeScript", "React", "Vercel", "Frontend", "Freelance"],
    featured: true,
    sortOrder: 10,
  },
  {
    title: "Lumify PIM/DAM Backend",
    slug: "lumify-pim-dam-backend",
    description:
      "API backend para acompañar la herramienta PIM/DAM de Lumify. Incluye estructura server-side en TypeScript, endpoints para operaciones internas y publicación en Vercel.",
    repositoryUrl: "https://github.com/josebrusa/pim_dam_backend",
    demoUrl: "https://pim-dam-backend.vercel.app",
    imageUrl: null,
    technologies: ["TypeScript", "Node.js", "API", "Backend", "Vercel"],
    featured: true,
    sortOrder: 20,
  },
  {
    title: "CoreBack CLI Landing",
    slug: "coreback-cli-landing",
    description:
      "Landing page para presentar una herramienta CLI que genera backends con Node.js, TypeScript, Express y Prisma. Copy técnico, documentación y diseño responsive con modo oscuro.",
    repositoryUrl: "https://github.com/josebrusa/landing-coreback",
    demoUrl: "https://landing-coreback.vercel.app",
    imageUrl: null,
    technologies: ["TypeScript", "Next.js", "Landing Page", "CLI", "Vercel"],
    featured: true,
    sortOrder: 30,
  },
  {
    title: "Create Backforge",
    slug: "create-backforge",
    description:
      "CLI para generar proyectos backend production-ready con Node.js, TypeScript y Express. Proyecto pensado para acelerar setups repetitivos y estandarizar arquitectura inicial.",
    repositoryUrl: "https://github.com/josebrusa/create-backforge",
    demoUrl: null,
    imageUrl: null,
    technologies: ["TypeScript", "Node.js", "Express", "CLI", "Developer Tools"],
    featured: true,
    sortOrder: 40,
  },
  {
    title: "Cool Vue Icons",
    slug: "cool-vue-icons",
    description:
      "Biblioteca de iconos como componentes Vue 3 con TypeScript. Proyecto enfocado en reutilización, DX y empaquetado de componentes para interfaces frontend.",
    repositoryUrl: "https://github.com/josebrusa/cool-vue-icons",
    demoUrl: null,
    imageUrl: null,
    technologies: ["Vue 3", "TypeScript", "Component Library", "NPM"],
    featured: true,
    sortOrder: 50,
  },
  {
    title: "Calendar App",
    slug: "calendar-app",
    description:
      "Aplicación de calendario con React, rutas protegidas, autenticación y backend propio. Proyecto de práctica full stack orientado a flujos reales de login y eventos.",
    repositoryUrl: "https://github.com/josebrusa/candelary-app-vite",
    demoUrl: "https://candelary-app-vite.vercel.app",
    imageUrl: null,
    technologies: ["React", "Vite", "Redux", "Auth", "Node.js"],
    featured: true,
    sortOrder: 60,
  },
];

export const fallbackProjects: PortfolioProject[] = seedProjects.map(
  ({ title, description, repositoryUrl, demoUrl, imageUrl, technologies }) => ({
    title,
    description,
    repositoryUrl: repositoryUrl ?? null,
    demoUrl: demoUrl ?? null,
    imageUrl: imageUrl ?? null,
    technologies: technologies ?? [],
  }),
);
