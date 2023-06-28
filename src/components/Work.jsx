import WorkItem from "./WorkItem"
import data from '../db/data'


const Work = () => {
    return (
        <div id="works" className="bg-white/10">
            <div className="max-w-[1040px]  m-auto md:pl-20 p-4 py-16">
                <h1 className="text-4xl font-bold text-center text-white mb-10">Mi Experiencia</h1>
                {data.map((item, index) => (
                    <WorkItem
                    key={index}
                    yers={item.yers}
                    title={item.title}
                    duration={item.duration}
                    details={item.details}
                    />
                    ))
                }
            </div>
        </div>
    )
}

export default Work
