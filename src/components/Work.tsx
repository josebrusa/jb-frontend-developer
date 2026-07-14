import WorkItem from "./WorkItem"
import { getExperiences } from "../server/db/queries"


const Work = async () => {
    const experiences = await getExperiences()

    return (
        <section id="works" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Experience</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">Experiencia profesional</h2>
                </div>
                <div className="space-y-4">
                {experiences.map((item) => (
                    <WorkItem
                    key={`${item.year}-${item.title}`}
                    year={item.year}
                    title={item.title}
                    duration={item.duration}
                    details={item.details}
                    />
                    ))
                }
                </div>
            </div>
        </section>
    )
}

export default Work
