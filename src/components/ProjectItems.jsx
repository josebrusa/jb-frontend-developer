const ProjectItems = ({ img, title, link }) => {
  return (
    <div className="relative flex items-center justify-center h-auto w-full shadow-[4px_12px_29px_3px_rgba(0,0,0,0.55)] rounded-xl group hover:bg-gradient-to-r from-[#4A4A4A] to-[#171A1B]">
      <a href={link}>
        <img
          src={img}
          alt={title}
          className="rounded-xl group-hover:opacity-10 w-full h-full object-cover"
        />
      </a>
      <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h3 className="text-2xl font-bold text-gray-200 tracking-wide text-center">
          {title}
        </h3>
        <p className="pb-4 pt-4 text-white text-center">Vite + React Js</p>
      </div>
    </div>
  );
};

export default ProjectItems;
