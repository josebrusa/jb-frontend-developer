"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineProject,
  AiOutlineRead,
} from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

const Sidenav = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    if (!nav) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNav(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [nav]);

  return (
    <>
      <nav aria-label="Navegación principal" className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <div className="flex flex-col rounded-full border border-white/10 bg-black/30 p-2 backdrop-blur-xl">
          <a
            href="#header"
            aria-label="Ir al inicio"
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-[#29F3C3] focus-visible:bg-white/10 focus-visible:text-[#29F3C3]"
          >
            <AiOutlineHome size={20} />
          </a>
          <a
            href="#works"
            aria-label="Ir a experiencia profesional"
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-[#29F3C3] focus-visible:bg-white/10 focus-visible:text-[#29F3C3]"
          >
            <MdOutlineWorkOutline size={20} />
          </a>
          <a
            href="#resume"
            aria-label="Ir a sobre mi"
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-[#29F3C3] focus-visible:bg-white/10 focus-visible:text-[#29F3C3]"
          >
            <BsPerson size={20} />
          </a>
          <a
            href="#projects"
            aria-label="Ir a proyectos"
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-[#29F3C3] focus-visible:bg-white/10 focus-visible:text-[#29F3C3]"
          >
            <AiOutlineProject size={20} />
          </a>
          <a
            href="#contact"
            aria-label="Ir a contacto"
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-[#29F3C3] focus-visible:bg-white/10 focus-visible:text-[#29F3C3]"
          >
            <AiOutlineMail size={20} />
          </a>
          <Link
            href="/blog"
            aria-label="Ir al blog"
            className="rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-[#29F3C3] focus-visible:bg-white/10 focus-visible:text-[#29F3C3]"
          >
            <AiOutlineRead size={20} />
          </Link>
        </div>
      </nav>
      <div>
        <button
          type="button"
          onClick={handleNav}
          aria-label={nav ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={nav}
          aria-controls="mobile-navigation"
          className="fixed right-5 top-5 z-[99] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur md:hidden"
        >
          <AiOutlineMenu aria-hidden="true" className="h-6 w-6" />
        </button>
        {nav ? (
          <nav id="mobile-navigation" aria-label="Navegación móvil" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
            <a
              onClick={handleNav}
              href="#header"
              aria-label="Ir al inicio"
              className="m-2 flex w-[70%] items-center justify-center rounded-full border border-white/10 bg-white/5 p-4 text-white"
            >
              <AiOutlineHome size={20} />
              <span className="pl-4 text-white">Home</span>
            </a>
            <a
              onClick={handleNav}
              href="#works"
              aria-label="Ir a experiencia profesional"
              className="m-2 flex w-[70%] items-center justify-center rounded-full border border-white/10 bg-white/5 p-4 text-white"
            >
              <MdOutlineWorkOutline size={20} />
              <span className="pl-4 text-white">Works</span>
            </a>
            <a
              onClick={handleNav}
              href="#resume"
              aria-label="Ir a sobre mi"
              className="m-2 flex w-[70%] items-center justify-center rounded-full border border-white/10 bg-white/5 p-4 text-white"
            >
              <BsPerson size={20} />
              <span className="pl-4 text-white">Sobre mi</span>
            </a>
            <a
              onClick={handleNav}
              href="#projects"
              aria-label="Ir a proyectos"
              className="m-2 flex w-[70%] items-center justify-center rounded-full border border-white/10 bg-white/5 p-4 text-white"
            >
              <AiOutlineProject size={20} />
              <span className="pl-4 text-white">Projects</span>
            </a>

            <a
              onClick={handleNav}
              aria-label="Ir a contacto"
              href="#contact"
              className="m-2 flex w-[70%] items-center justify-center rounded-full border border-white/10 bg-white/5 p-4 text-white"
            >
              <AiOutlineMail size={20} />
              <span className="pl-4 text-white">Contact</span>
            </a>
            <Link
              onClick={handleNav}
              aria-label="Ir al blog"
              href="/blog"
              className="m-2 flex w-[70%] items-center justify-center rounded-full border border-white/10 bg-white/5 p-4 text-white"
            >
              <AiOutlineRead size={20} />
              <span className="pl-4 text-white">Blog</span>
            </Link>
          </nav>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Sidenav;
