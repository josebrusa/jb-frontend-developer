import type { Experience, NewExperience } from "./schema";

export type WorkExperience = Pick<Experience, "year" | "title" | "duration" | "details">;

export const seedExperiences: NewExperience[] = [
  {
    slug: "lumify-freelance-2026",
    year: "2026",
    title: "Freelance Full Stack Developer · Lumify",
    duration: "Proyecto freelance",
    skills: ["React", "TypeScript", "Node.js", "Automatizaciones", "Vercel"],
    sortOrder: 10,
    details:
      "Trabajo con Lumify desarrollando aplicaciones, paneles y automatizaciones a medida para resolver necesidades operativas concretas. Me encargo de transformar procesos manuales en flujos digitales, construir interfaces claras y conectar frontend, backend y despliegues en Vercel para entregar herramientas utilizables por el equipo.",
  },
  {
    slug: "findspo-2025",
    year: "2025 - 2026",
    title: "Full Stack Developer · Findspo",
    duration: "8 meses",
    skills: ["Vue.js", "Node.js", "APIs REST", "GitLab CI/CD", "QA"],
    sortOrder: 20,
    details:
      "Desarrollé aplicaciones web con Vue.js y Node.js, trabajando en autenticación, validación de usuarios e integración con APIs REST. También participé en refactors de handlers de API, revisiones de código, control de calidad y gestión de entornos con GitLab Flow y Conventional Commits.",
  },
  {
    slug: "smartaos-2024",
    year: "2024 - 2025",
    title: "Full Stack Developer · Smartaos",
    duration: "1 año 3 meses",
    skills: ["React", "React Native", "Node.js", "Express", "MongoDB", "JWT"],
    sortOrder: 30,
    details:
      "Participé en el desarrollo de aplicaciones web y móviles con React, React Native y Node.js/Express. Integré APIs REST, autenticación JWT y gestión de estado, colaborando en decisiones técnicas, mantenimiento en producción, revisión de código y resolución de incidencias en distintos entornos.",
  },
  {
    slug: "freelance-2021",
    year: "2021 - 2024",
    title: "Desarrollador Full Stack · Freelance",
    duration: "3 años",
    skills: ["MERN", "Next.js", "Firebase", "Testing", "Vercel"],
    sortOrder: 40,
    details:
      "Construí proyectos web y móviles con React, Node.js, Express y MongoDB, cubriendo desde componentes reutilizables hasta integraciones con APIs, autenticación y despliegues. En esta etapa consolidé buenas prácticas de frontend, testing con Jest/React Testing Library y publicación en Vercel y Firebase.",
  },
  {
    slug: "ucompany-2021",
    year: "2021 - 2022",
    title: "Frontend Web Developer · Ucompany",
    duration: "1 año",
    skills: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
    sortOrder: 50,
    details:
      "Desarrollé interfaces dinámicas y responsivas con React, colaborando con backend para integrar servicios en Node.js y asegurar entregas funcionales. Esta experiencia fortaleció mi base en componentes, consumo de APIs y trabajo coordinado con otros perfiles técnicos.",
  },
  {
    slug: "apple-reseller-2011",
    year: "2011 - 2019",
    title: "Sales Manager & Soporte Técnico · APR Apple",
    duration: "8 años",
    skills: ["Soporte técnico", "Apple", "Atención al cliente", "Liderazgo"],
    sortOrder: 60,
    details:
      "Antes de dedicarme de lleno al desarrollo, trabajé en tiendas Apple Premium Reseller liderando ventas, soporte técnico de primer nivel, gestión de stock y atención a clientes particulares y empresas. Esta etapa aportó criterio de producto, comunicación con usuarios y responsabilidad operativa.",
  },
];

export const fallbackExperiences: WorkExperience[] = seedExperiences.map(
  ({ year, title, duration, details }) => ({ year, title, duration, details }),
);
