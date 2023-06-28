import ProjectItems from './ProjectItems'
import giffity from '../assets/giffity.png'
import petsgram from '../assets/petsgram.png'
import fastfood from '../assets/fastfood.png'
import extranjeria from '../assets/extranjeria.png'

const Projects = () => {
    return (
        <div className="bg-white/10">
        <div id='projects' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
            <h1 className='text-4xl font-bold text-center text-white'>Projectos</h1>
            <p className='text-center py-8 text-gray-200'>Te presento cuatro emocionantes proyectos desarrollados utilizando ReactJS. Uno de ellos es una página web interactiva de GIFs, donde los usuarios pueden descubrir y compartir divertidas animaciones. También he creado una plataforma similar a Instagram pero enfocada en las mascotas, donde los amantes de los animales pueden compartir fotos y conectarse. Además, diseñé un sitio web para un negocio de comida rápida, con opciones de menú, pedidos en línea y entrega a domicilio. Por último, desarrollé una página para un estudio de abogados especializado en extranjería, brindando información y servicios legales a clientes internacionales.</p>
            <div className='grid sm:grid-cols-2 gap-12'>
                <ProjectItems img={giffity} title='Giffity App' />
                <ProjectItems img={petsgram} title='Petsgram App' />
                <ProjectItems img={extranjeria} title='Extranjeria App' />
                <ProjectItems img={fastfood} title='FastFood App' />
            </div>
        </div>
        </div>
    )
}

export default Projects
