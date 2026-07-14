import { sendContactMessage } from "../server/contact";
import MotionCard from "./visuals/MotionCard";

type ContactProps = {
  status?: string;
};

function getStatusMessage(status: string | undefined): string | null {
  if (status === "sent") {
    return "Mensaje enviado correctamente. Te responderé lo antes posible.";
  }

  if (status === "missing") {
    return "Completá nombre, email y mensaje para poder enviarlo.";
  }

  if (status === "config") {
    return "Falta configurar el envío de emails en el servidor.";
  }

  if (status === "error") {
    return "No se pudo enviar el mensaje. Probá nuevamente o escribime por LinkedIn.";
  }

  return null;
}

const Contact = ({ status }: ContactProps) => {
  const statusMessage = getStatusMessage(status);
  const isSuccess = status === "sent";

  return (
    <section id="contact" className="px-6 py-24">
      <MotionCard className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Contact</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">Contacto</h2>
        </div>
        {statusMessage ? (
          <p className={`mb-6 rounded-2xl border p-4 text-sm ${isSuccess ? "border-[#29F3C3]/25 bg-[#29F3C3]/10 text-[#C8FFF3]" : "border-red-400/20 bg-red-400/10 text-red-100"}`}>
            {statusMessage}
          </p>
        ) : null}
        <form action={sendContactMessage}>
          <div className="grid md:grid-cols-2 gap-4 w-full py-2">
            <div className="flex flex-col">
              <label htmlFor="name" className="py-2 text-sm uppercase tracking-[0.2em] text-white/45">
                Nombre
              </label>
              <input
                id="name"
                className="flex rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none transition focus:border-[#29F3C3]"
                type="text"
                name="name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="py-2 text-sm uppercase tracking-[0.2em] text-white/45">Movil</label>
              <input
                id="phone"
                className="flex rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none transition focus:border-[#29F3C3]"
                type="tel"
                name="phone"
              />
            </div>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="py-2 text-sm uppercase tracking-[0.2em] text-white/45">Email</label>
            <input
              id="email"
              className="flex rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none transition focus:border-[#29F3C3]"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="subject" className="py-2 text-sm uppercase tracking-[0.2em] text-white/45">Subject</label>
            <input
              id="subject"
              className="flex rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none transition focus:border-[#29F3C3]"
              type="text"
              name="subject"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="message" className="py-2 text-sm uppercase tracking-[0.2em] text-white/45">Mensaje</label>
            <textarea
              id="message"
              className="flex rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none transition focus:border-[#29F3C3]"
              rows={8}
              name="message"
              required
            ></textarea>
          </div>
          <label className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/58">
            <input className="mt-1 accent-[#29F3C3]" type="checkbox" required />
            <span>
              Acepto que mis datos se usen para responder esta consulta y confirmo que he leído la{" "}
              <a href="/privacidad" className="font-semibold text-[#29F3C3] transition hover:text-white">
                política de privacidad
              </a>
              .
            </span>
          </label>
          <div className="flex justify-end py-2">
            <button className="mt-4 rounded-full bg-[#29F3C3] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white">
              Enviar
            </button>
          </div>
        </form>
      </MotionCard>
    </section>
  );
};

export default Contact;
