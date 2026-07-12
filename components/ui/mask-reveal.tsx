"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * MaskReveal — child slides up from behind an invisible mask when scrolled
 * into view. The editorial heading entrance (SplitText-style, but works with
 * mixed sans/serif nodes).
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
