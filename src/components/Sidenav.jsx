import { useState } from 'react'
import { AiOutlineMenu, AiOutlineHome, AiOutlineMail, AiOutlineProject } from 'react-icons/ai'
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsPerson } from "react-icons/bs";


const Sidenav = () => {

    const [ nav, setNav ] = useState(false);

    const handelNav = () => {
        setNav(!nav);
    }

    return (
        <div>
            <AiOutlineMenu
                onClick={ handelNav }
                className='text-black absolute top-4 right-4 z-[99] md:hidden' />

        {
            nav ? (
                    <div className='fixed w-full h-screen bg-white/90 flex flex-col justify-center items-center z-20'>
                        <a  onClick={handelNav}
                            href="#header"
                            className='w-[70%] flex justify-center items-center rounded-full border-1 border-solid border-[#4A4A4A] opacity-90 shadow-md bg-[#343639] shadow-[#343639]  m-2 p-4 cursor-pointer hover:scale-105 ease-in duration-200'>
                                <AiOutlineHome size={20} color='#fff'/>
                                <span className='pl-4 text-white'>Home</span>
                        </a>
                        <a
                            href="#works"
                            className='w-[70%] flex justify-center items-center rounded-full border-1 border-solid border-[#4A4A4A] opacity-90 shadow-md bg-[#343639] shadow-[#343639] m-2 p-4 cursor-pointer hover:scale-105 ease-in duration-200'>
                                <MdOutlineWorkOutline size={20} color='#fff' />
                                <span className='pl-4 text-white'>Works</span>
                        </a>
                        <a  onClick={handelNav}
                            href="#resume"
                            className='w-[70%] flex justify-center items-center rounded-full border-1 border-solid border-[#4A4A4A] opacity-90 shadow-md bg-[#343639] shadow-[#343639] m-2 p-4 cursor-pointer hover:scale-105 ease-in duration-200'>
                                <BsPerson size={20} color='#fff'/>
                                <span className='pl-4 text-white'>Sobre mi</span>
                        </a>
                        <a  onClick={handelNav}
                            href="#projects"
                            className='w-[70%] flex justify-center items-center rounded-full border-1 border-solid border-[#4A4A4A] opacity-90 shadow-md bg-[#343639] shadow-[#343639] m-2 p-4 cursor-pointer hover:scale-105 ease-in duration-200'>
                                <AiOutlineProject size={20} color='#fff' />
                                <span className='pl-4 text-white'>Projects</span>
                        </a>
                        
                        <a  onClick={handelNav}
                            href="#contact"
                            className='w-[70%] flex justify-center items-center rounded-full border-1 border-solid border-[#4A4A4A] opacity-90  shadow-md bg-[#343639] shadow-[#343639] m-2 p-4 cursor-pointer hover:scale-105 ease-in duration-200'>
                                <AiOutlineMail size={20} color='#fff'/>
                                <span className='pl-4 text-white'>Contact</span>
                        </a>
                    </div>
                )
                : (
                    ''
                )
        }


        <div className='md:block hidden fixed top-[25%] z-10'>
            <div className='flex flex-col'>
                <a href="#header" className='rounded-full border-1 border-solid border-[#4A4A4A] opacity-80 shadow-md bg-[#343639] shadow-[#343639]  m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <AiOutlineHome size={20} color='#fff'/>
                </a>
                <a href="#works" className='rounded-full border-1 border-solid border-[#4A4A4A] opacity-80 shadow-md bg-[#343639] shadow-[#343639]  m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <MdOutlineWorkOutline size={20} color='#fff' />
                </a>
                <a href="#resume" className='rounded-full border-1 border-solid border-[#4A4A4A] opacity-80 shadow-md bg-[#343639] shadow-[#343639]  m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <BsPerson size={20} color='#fff' />
                </a>
                <a href="#projects" className='rounded-full border-1 border-solid border-[#4A4A4A] opacity-80 shadow-md bg-[#343639] shadow-[#343639]  m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <AiOutlineProject size={20} color='#fff' />
                </a>
                <a href="#contact" className='rounded-full border-1 border-solid border-[#4A4A4A] opacity-80 shadow-md bg-[#343639] shadow-[#343639]  m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <AiOutlineMail size={20} color='#fff' />
                </a>
            </div>
        </div>
    </div>
    )
}

export default Sidenav
