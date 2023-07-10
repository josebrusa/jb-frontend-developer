const Contact = () => {
  return (
    <div id="contact" className="bg-white/10 px-6">
      <div className="max-w-[1040px] m-auto md:px-20 py-10">
        <h1 className="py-4 text-4xl font-bold text-center text-white">
          Contacto
        </h1>
        <form
          action="https://getform.io/f/9fd8e7ee-9ce5-4c6e-9b54-5b98df956f40"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="grid md:grid-cols-2 gap-4 w-full py-2">
            <div className="flex flex-col">
              <label className="text-white uppercase text-sm py-2">
                Nombre
              </label>
              <input
                className="bg-[#4A484F] flex p-3 rounded-xl border-2 border-[#29F3C3] focus:outline-none text-white focus-visible:ring-0"
                type="text"
                name="name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white uppercase text-sm py-2">Movil</label>
              <input
                className="bg-[#4A484F] flex p-3 rounded-xl border-2 border-[#29F3C3] focus:outline-none text-white"
                type="tel"
                name="phone"
              />
            </div>
          </div>
          <div className="flex flex-col py-2">
            <label className="text-white uppercase text-sm py-2">Email</label>
            <input
              className="bg-[#4A484F] flex p-3 rounded-xl border-2 border-[#29F3C3] focus:outline-none text-white"
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="text-white uppercase text-sm py-2">Subject</label>
            <input
              className="bg-[#4A484F] flex p-3 rounded-xl border-2 border-[#29F3C3] focus:outline-none text-white"
              type="text"
              name="subject"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="text-white uppercase text-sm py-2">Mensaje</label>
            <textarea
              className="flex p-3 bg-[#4A484F] border-2 rounded-xl border-[#29F3C3] focus:outline-none text-white"
              rows="8"
              name="message"
            ></textarea>
          </div>
          <div className="flex justify-end py-2">
            <button className="text-white mt-4 p-4 rounded-lg border-1 border-solid border-[#4A4A4A] bg-[#343639]  cursor-pointer  hover:text-black hover:opacity-80 hover:shadow-sm hover:shadow-[#29F3C3] hover:border-[#313131] hover:bg-[#29F3C3]">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
