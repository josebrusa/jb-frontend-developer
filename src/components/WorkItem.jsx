
const WorkItem = ({ yers, title, duration, details}) => {
    return (
        <ol className='flex flex-col md:flex-row relative border-l border-stone-200'>
            <li className='mb-10 ml-4'>
                <div className='absolute w-3 h-3 bg-stone-200 rounded-full mt-1.5 -left-1.5 border-white' />
                    <p className='text-white flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm'>
                        <span className='inline-block px-2 py-1 font-semibold text-gray-600 bg-[#29F3C3] rounded-md'>{yers}</span>
                        <span className='text-lg font-semibold text-[#29F3C3]'>{title}</span>
                        <span className='my-1 text-sm font-normal leading-none text-gray-300 opacity-90'>{duration}</span>
                    </p>
                        <p className='my-2 text-base font-normal text-gray-200'>
                            {details}
                        </p>
            </li>
        </ol>
    )
}

export default WorkItem
