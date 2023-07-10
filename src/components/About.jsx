const miperfil =
  "https://scxchfxwxsaoyvffjfhi.supabase.co/storage/v1/object/public/images/miperfil.webp?t=2023-07-07T13%3A45%3A03.517Z";

const About = () => {
  return (
    <div id="resume" className="bg-white/10">
      <div className="max-w-[1040px]  m-auto py-10">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Sobre mi
        </h1>
        <div className="grid sm:grid-cols-2 gap-8 p-8 py-10 justify-items-center">
          <p className="text-start py-4 text-gray-200 sm:text-base font-normal">
            Soy un estudiante que se ha dedicado al aprendizaje y desarrollo
            como profesional en el campo del desarrollo frontend. Desde 2019, me
            he enfocado en adquirir habilidades sólidas en tecnologías como
            HTML, CSS, JavaScript, ReactJS, React Native, Bootstrap, Styled
            Components y Tailwind CSS, a través de cursos ofrecidos por
            plataformas líderes como Google, Udemy y Platzi.
            <br /> Como frontend developer, mi objetivo es crear experiencias de
            usuario atractivas y funcionales a través de interfaces web y
            móviles intuitivas.
            <br /> Siempre busco mejorar mis habilidades técnicas y mantenerme
            actualizado con las últimas tendencias y mejores prácticas del
            desarrollo frontend. Estoy emocionado por la oportunidad de aplicar
            mi pasión y conocimientos en mi primer trabajo en IT.
          </p>
          <div className="w-[250px] h-[250px] rounded-md shadow-[30px_-23px_28px_-2px_rgba(41,243,195,0.55)]">
            <img
              className="rounded-md w-full h-full  object-cover object-center"
              src={miperfil}
              alt="foto perfil"
            />
          </div>
        </div>
        <div className="flex justify-center py-2">
          <button className="text-white mt-4 p-4 rounded-lg border-1 border-solid border-[#4A4A4A] bg-[#343639]  cursor-pointer hover:text-black hover:opacity-80 hover:shadow-sm hover:shadow-[#29F3C3] hover:border-[#313131] hover:bg-[#29F3C3]">
            <a
              href="https://scxchfxwxsaoyvffjfhi.supabase.co/storage/v1/object/public/images/cv.pdf?t=2023-07-10T15%3A13%3A38.755Z"
              download="cv"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descarga mi cv!
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
