"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * AnimatedGrid — subtle perspective grid + drifting accent glow for the hero.
 * Low opacity, slow loop, disabled under reduced motion.
 */
export function AnimatedGrid() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* base grid */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* drifting accent glows */}
      {!reduce && (
        <>
          <motion.div
            className="absolute left-1/2 top-[-10%] h-[480px] w-[480px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(79,140,255,0.16), transparent 65%)",
              filter: "blur(40px)",
            }}
            animate={{ y: [0, 30, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[12%] top-[30%] h-[320px] w-[320px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(79,140,255,0.08), transparent 60%)",
              filter: "blur(50px)",
            }}
            animate={{ y: [0, -24, 0], x: [0, 18, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
