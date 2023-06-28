import miperfil from '../assets/miperfil.jpg'

const About = () => {
    return (
        <div id="resume" className="bg-white/10">
            <div className="max-w-[1040px]  m-auto md:pl-20 p-4 py-16">
                <h1 className="text-4xl font-bold text-center text-white mb-16">Sobre mi</h1>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className='text-center py-2 text-gray-200'>Soy un estudiante que se ha dedicado al aprendizaje y desarrollo como profesional en el campo del desarrollo frontend. Desde 2019, me he enfocado en adquirir habilidades sólidas en tecnologías como HTML, CSS, JavaScript, ReactJS, React Native, Bootstrap, Styled Components y Tailwind CSS, a través de cursos ofrecidos por plataformas líderes como Google, Udemy y Platzi.</p>
                        <p className='text-center py-2 text-gray-200'>Como frontend developer, mi objetivo es crear experiencias de usuario atractivas y funcionales a través de interfaces web y móviles intuitivas. Siempre busco mejorar mis habilidades técnicas y mantenerme actualizado con las últimas tendencias y mejores prácticas del desarrollo frontend. Estoy emocionado por la oportunidad de aplicar mi pasión y conocimientos en mi primer trabajo en IT.</p>
                    </div>
                    <div className='w-[300px] h-[300px] rounded-md shadow-[30px_-23px_28px_-2px_rgba(41,243,195,0.55)]'>
                        <img className='rounded-md w-full h-full object-cover object-center' src={miperfil} alt="foto perfil" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About
