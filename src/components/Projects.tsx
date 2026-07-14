import ProjectItems from "./ProjectItems";
import { getProjects } from "../server/db/queries";

const Projects = async () => {
  const projects = await getProjects();

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-20 h-64 bg-[#29F3C3]/8 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 sm:mb-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Projects</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">Proyectos destacados</h2>
          </div>
          <p className="text-lg leading-8 text-white/58">
            Selección de trabajos publicados en GitHub y Vercel: herramientas para clientes,
            APIs, aplicaciones frontend y experimentos técnicos que muestran mi evolución full stack.
        </p>
        </div>
        <div className="grid gap-5">
          {projects.map((project) => (
            <ProjectItems key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
