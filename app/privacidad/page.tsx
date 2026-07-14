import Link from "next/link";

export const metadata = {
  title: "Política de privacidad | Jose Brusa",
  description: "Información sobre el tratamiento de datos personales enviados desde el formulario de contacto.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-20 text-white">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-[#29F3C3] transition hover:text-white">
          Volver al portfolio
        </Link>
        <p className="mt-10 text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Privacidad</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Política de privacidad</h1>
        <div className="mt-10 space-y-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-base leading-8 text-white/70 backdrop-blur-xl md:p-10">
          <section>
            <h2 className="text-2xl font-semibold text-white">Responsable</h2>
            <p className="mt-3">El responsable del tratamiento de los datos enviados desde este portfolio es Jose Brusa.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Datos recogidos</h2>
            <p className="mt-3">El formulario puede recoger nombre, email, teléfono, asunto y mensaje. Solo se usan para responder la consulta recibida.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Finalidad</h2>
            <p className="mt-3">Los datos se tratan para gestionar solicitudes de contacto, propuestas profesionales o comunicaciones iniciadas por la persona usuaria.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Conservación</h2>
            <p className="mt-3">Los datos se conservarán durante el tiempo necesario para responder la consulta y mantener una relación profesional si corresponde.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Derechos</h2>
            <p className="mt-3">Podés solicitar acceso, rectificación o eliminación de tus datos escribiendo por los canales de contacto publicados en este sitio.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Encargados y servicios externos</h2>
            <p className="mt-3">El envío del formulario puede usar servicios técnicos de email/hosting necesarios para entregar el mensaje. No se venden datos personales ni se usan para campañas no solicitadas.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
