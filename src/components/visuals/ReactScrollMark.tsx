"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function ReactScrollMark() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.18, 0.48, 0.82], [0, 220, 560, 920]);
  const rotate = useTransform(scrollYProgress, [0, 0.82], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.38, 0.72, 0.9], [0.9, 0.82, 0.36, 0]);

  return (
    <motion.div
      aria-hidden="true"
      style={reducedMotion ? { opacity: 0.34 } : { y, rotate, opacity }}
      className="pointer-events-none fixed right-[-5rem] top-24 z-0 hidden h-[26rem] w-[26rem] text-[#29F3C3] opacity-40 blur-[0.2px] lg:block"
    >
      <svg viewBox="-120 -120 240 240" className="h-full w-full drop-shadow-[0_0_48px_rgba(41,243,195,0.22)]">
        <circle cx="0" cy="0" r="12" fill="currentColor" />
        {[0, 60, -60].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="0"
            rx="104"
            ry="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            opacity="0.65"
            transform={`rotate(${angle})`}
          />
        ))}
      </svg>
    </motion.div>
  );
}
