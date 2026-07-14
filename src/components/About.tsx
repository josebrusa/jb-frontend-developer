import { getCvUrl } from "../server/db/queries";
import MotionCard from "./visuals/MotionCard";

const miperfil =
  process.env.CLOUDFLARE_PUBLIC_ASSETS_URL
    ? `${process.env.CLOUDFLARE_PUBLIC_ASSETS_URL.replace(/\/$/, "")}/assets/img/yo/me.png`
    : "/profile-placeholder.svg";

const About = async () => {
  const curriculum = await getCvUrl();

  return (
    <section id="resume" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">About</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">Sobre mi</h2>
          </div>
          <a
            href={curriculum}
            download="jose-brusa-cv"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-[#29F3C3] hover:text-[#29F3C3] sm:inline-flex"
          >
            Descargar CV
          </a>
        </div>
        <MotionCard className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:grid-cols-[1fr_320px] md:p-10">
          <p className="text-pretty text-lg leading-9 text-white/68">
            Soy desarrollador MERN Stack con experiencia construyendo aplicaciones web y móviles,
            APIs REST y herramientas internas para equipos que necesitan convertir procesos en
            producto. Trabajo principalmente con React, Next.js, Node.js, Express, MongoDB y
            TypeScript.
            <br /> Me gusta involucrarme en todo el ciclo: entender el problema, diseñar una
            interfaz clara, conectar servicios, cuidar la mantenibilidad y desplegar en entornos
            reales como Vercel o Firebase.
            <br /> Además de proyectos personales y formación constante, he trabajado en equipos
            ágiles, code reviews, QA, automatizaciones y soluciones freelance para clientes como
            Lumify.
          </p>
          <div className="relative h-[380px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
            <img
              className="h-full w-full object-cover object-center grayscale transition duration-700 hover:grayscale-0"
              src={miperfil}
              alt="Retrato de Jose Brusa"
            />
          </div>
        </MotionCard>
        <a
          href={curriculum}
          download="jose-brusa-cv"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-[#29F3C3] px-5 py-3 text-sm font-semibold text-black sm:hidden"
        >
          Descargar CV
        </a>
      </div>
    </section>
  );
};

export default About;
