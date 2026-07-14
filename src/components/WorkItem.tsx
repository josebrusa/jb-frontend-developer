import type { WorkExperience } from "../server/db/fallback-experiences"
import MotionCard from "./visuals/MotionCard"

const WorkItem = ({ year, title, duration, details}: WorkExperience) => {
    return (
        <MotionCard className='group grid gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur transition hover:border-[#29F3C3]/40 hover:bg-white/[0.06] md:grid-cols-[160px_1fr]'>
            <div>
                <span className='inline-flex rounded-full bg-[#29F3C3]/12 px-3 py-1 text-sm font-semibold text-[#29F3C3]'>{year}</span>
                <p className='mt-3 text-sm text-white/45'>{duration}</p>
            </div>
            <div>
                <h3 className='text-2xl font-semibold tracking-[-0.03em] text-white'>{title}</h3>
                <p className='mt-4 text-base leading-8 text-white/62'>{details}</p>
            </div>
        </MotionCard>
    )
}

export default WorkItem
