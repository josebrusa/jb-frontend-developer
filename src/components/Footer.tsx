import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-6 pb-12">
      <div id="footer" className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-white/45 md:flex-row">
          <div className="flex flex-row gap-5 text-white/60">
            <a
              href="https://github.com/josebrusa"
              aria-label="github-link"
              className="transition hover:text-[#29F3C3]"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/josebrusa/"
              aria-label="linkedin-link"
              className="transition hover:text-[#29F3C3]"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=34670969147"
              aria-label="whatsapp-link"
              className="transition hover:text-[#29F3C3]"
            >
              <FaWhatsapp className="h-6 w-6" />
            </a>
          </div>
          <div>
            <p className="text-sm text-center md:text-right">
              Pagina creada por <strong className="text-white/70">Jose Brusa</strong> · Frontend Developer
            </p>
            <div className="mt-3 flex justify-center gap-4 text-sm md:justify-end">
              <Link href="/blog" className="transition hover:text-[#29F3C3]">Blog</Link>
              <Link href="/privacidad" className="transition hover:text-[#29F3C3]">Privacidad</Link>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
