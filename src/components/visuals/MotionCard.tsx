"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type MotionCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export default function MotionCard({ children, className, delay = 0, ...props }: MotionCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
