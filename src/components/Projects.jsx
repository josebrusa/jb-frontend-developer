import ProjectItems from "./ProjectItems";
const giffity =
  "https://scxchfxwxsaoyvffjfhi.supabase.co/storage/v1/object/public/images/giffity.webp";
const minecraft =
  "https://scxchfxwxsaoyvffjfhi.supabase.co/storage/v1/object/public/images/javascrift.vercel.app.png?t=2024-04-12T15%3A56%3A01.273Z";
const fastfood =
  "https://scxchfxwxsaoyvffjfhi.supabase.co/storage/v1/object/public/images/fastfood.webp";
<<<<<<< HEAD
const calendary =
  "https://scxchfxwxsaoyvffjfhi.supabase.co/storage/v1/object/public/images/candelary-app-vite.vercel.png";
=======
const extranjeria =
  "gs://myweb-9312f.appspot.com/img/extranjeria.webp";
>>>>>>> 73927a78cdc16fe642e10cae3cb3ae3fe7bedcda

const Projects = () => {
  return (
    <div className="bg-white/10">
      <div id="projects" className="max-w-[1040px] m-auto md:pl-20 p-6 py-16 ">
        <h1 className="text-4xl font-bold text-center text-white">Projectos</h1>
        <p className="text-start py-8 text-gray-200">
          Te presento cuatro emocionantes proyectos desarrollados utilizando
          ReactJS. Uno de ellos es una página web interactiva de GIFs, donde los
          usuarios pueden descubrir y compartir divertidas animaciones. También
          he creado una plataforma similar a Instagram pero enfocada en las
          mascotas, donde los amantes de los animales pueden compartir fotos y
          conectarse. Además, diseñé un sitio web para un negocio de comida
          rápida, con opciones de menú, pedidos en línea y entrega a domicilio.
          Por último, desarrollé una página para un estudio de abogados
          especializado en extranjería, brindando información y servicios
          legales a clientes internacionales.
        </p>
        <div className="grid sm:grid-cols-2 gap-12 mb-12">
          <ProjectItems
            img={giffity}
            title="Giffity App"
            link={"https://giffity.vercel.app/"}
          />
          <ProjectItems
            img={minecraft}
            title="Minecraft App"
            link={"https://javascrift.vercel.app/"}
          />
          <ProjectItems
            img={calendary}
            title="Calendary App"
            link={"https://candelary-app-vite.vercel.app/auth/login"}
          />
          <ProjectItems
            img={fastfood}
            title="FastFood App"
            link={"https://www.chickengrill.es/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
