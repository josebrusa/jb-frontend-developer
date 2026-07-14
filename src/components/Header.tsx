import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { AnimHeader } from "../utils/AnimHeader";
import MotionCard from "./visuals/MotionCard";
import ReactScrollMark from "./visuals/ReactScrollMark";

const Header = () => {
  return (
    <section id="header" className="relative min-h-screen overflow-hidden px-6 py-10">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#29F3C3]/15 blur-3xl md:h-[32rem] md:w-[32rem]" />
      <ReactScrollMark />
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#29F3C3] backdrop-blur">
              Full Stack Developer · MERN · TypeScript
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              Jose Brusa
            </h1>
            <div className="mt-5 text-2xl font-light text-white/70 sm:text-4xl">
              <AnimHeader />
            </div>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62">
              Desarrollo aplicaciones web y móviles con React, Node.js y TypeScript. Me enfoco en convertir
              necesidades de negocio en productos claros, mantenibles y listos para producción.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-[#29F3C3] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white"
              >
                Ver proyectos
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-[#29F3C3] hover:text-[#29F3C3]"
              >
                Contactar
              </a>
            </div>
          </div>

          <MotionCard className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl lg:translate-y-20" delay={0.12}>
            <div className="mb-16 flex items-center justify-between text-sm text-white/45">
              <span>available for full stack work</span>
              <span>2026</span>
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/35">Stack</p>
                <p className="mt-3 text-3xl font-semibold text-white">React, Node.js, TypeScript</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-white/40">Focus</p>
                  <p className="mt-2 text-white">Apps & APIs</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-white/40">Data</p>
                  <p className="mt-2 text-white">MongoDB + REST</p>
                </div>
              </div>
            </div>
          </MotionCard>
        </div>

        <div className="mt-14 flex gap-5 text-white/70">
          <a href="https://github.com/josebrusa" aria-label="Abrir perfil de GitHub de Jose Brusa" className="transition hover:text-[#29F3C3]">
              <FaGithub className="h-7 w-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/josebrusa/"
              aria-label="Abrir perfil de LinkedIn de Jose Brusa"
              className="transition hover:text-[#29F3C3]"
            >
              <FaLinkedin className="h-7 w-7" />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=34670969147"
              aria-label="Contactar por WhatsApp"
              className="transition hover:text-[#29F3C3]"
            >
              <FaWhatsapp className="h-7 w-7" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
