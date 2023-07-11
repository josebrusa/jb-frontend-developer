import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white/">
      <div id="footer" className="max-w-[1040px] m-auto md:pl-20 p-6 py-16">
        <div className="grid grid-row-2 gap-10 justify-center justify-items-center ">
          <div className="flex flex-row gap-5">
            <a href="https://github.com/josebrusa" alt="github-link">
              <FaGithub className=" w-[50px] h-[50px] cursor-pointer text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/josebrusa/"
              alt="linkedin-link"
            >
              <FaLinkedin className="w-[50px] h-[50px] cursor-pointer text-white" />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=34670969147"
              alt="whatsapp-link"
            >
              <FaWhatsapp className="w-[50px] h-[50px] cursor-pointer text-white" />
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-white size-">
              Pagina creada por <strong> Jose Brusa </strong>Frontend Developer
              julio del 2023
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
