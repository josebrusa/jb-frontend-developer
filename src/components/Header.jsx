import { TypeAnimation } from 'react-type-animation';
import {FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';




const Header = () => {
    return (
        <div id='header'>
            <div className='flex justify-end items-center h-screen overflow-hidden'>
                <div className='w-2/3 h-2/3 transform -translate-x-[-32%] -translate-y-[9%] rotate-[-6deg]  shrink-[10] bg-[#171A1B] rounded-2xl border-1 border-solid border-[#4A4A4A] opacity-80'>
                    <div className='flex flex-row m-2'>
                        <div className='bg-red-700 rounded-full m-2 w-5 h-5'>
                        
                        </div>
                        <div className='bg-amber-400 rounded-full m-2 w-5 h-5'>

                        </div>
                        <div className='bg-lime-500 rounded-full m-2 w-5 h-5'>

                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
            <div className='w-full h-screen absolute top-0 left-0 bg-white/10 '>
                <div className='max-w-[700px] m-auto h-full flex flex-col justify-center lg:items-start items-center'>
                    <h1 className='flex sm:text-5xl text-4xl font-light text-[#29F3C3] uppercase'>
                        <TypeAnimation
                            sequence={[
                                'Hola!!!',
                                1000,
                                'Soy Jose Brusa',
                                2000,
                                'Frontend Developer',
                                5000,
                            ]}
                        wrapper='div'
                        cursor={true}
                        repeat={Infinity}
                        style={{
                            fontSize: '1em',
                            paddingLeft: '5px'
                        }}
                        />
                    </h1>
                    <div className='mt-20 w-1/2 flex justify-around'>
                        <FaTwitter className='w-10 h-10 cursor-pointer text-white' />
                        <FaLinkedin className='w-10 h-10 cursor-pointer text-white' />
                        <FaGithub className=' w-10 h-10 cursor-pointer text-white' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
