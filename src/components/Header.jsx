import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { AnimHeader } from "../utils/AnimHeader";
import { InfoTerm } from "../utils/InfoTerm";

const Header = () => {
  return (
    <div id="header">
      <div className="flex justify-end items-center h-screen overflow-hidden">
        <div className="w-2/3 h-2/3 transform -translate-x-[-32%] -translate-y-[9%] rotate-[-6deg]  shrink-[10] bg-[#171A1B] rounded-2xl border-1 border-solid border-[#4A4A4A] opacity-80">
          <div className="flex flex-row m-2">
            <div className="bg-red-700 rounded-full m-2 w-5 h-5"></div>
            <div className="bg-amber-400 rounded-full m-2 w-5 h-5"></div>
            <div className="bg-lime-500 rounded-full m-2 w-5 h-5"></div>
          </div>
          <InfoTerm />
        </div>
      </div>
      <div className="w-full h-screen absolute top-0 left-0 bg-white/10 ">
        <div className="max-w-[700px] m-auto h-full flex flex-col justify-center lg:items-start items-center">
          <h1 className="flex justify-center sm:text-5xl text-2xl font-light text-[#29F3C3] uppercase">
            <AnimHeader />
          </h1>
          <div className="mt-16 w-1/2 flex justify-around">
            <a href="https://github.com/josebrusa">
              <FaGithub className=" w-[50px] h-[50px] cursor-pointer text-white" />
            </a>
            <a href="https://www.linkedin.com/in/josebrusa/">
              <FaLinkedin className="w-[50px] h-[50px] cursor-pointer text-white" />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=34670969147">
              <FaWhatsapp className="w-[50px] h-[50px] cursor-pointer text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
