"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * CursorTrail — a soft accent glow that lags behind the pointer, plus a crisp
 * dot that tracks it 1:1. Screen blend so it reads on the dark UI.
 * Disabled on touch / coarse pointers and under reduced motion.
 */
export function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glowX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[65] mix-blend-screen">
      {/* lagging glow */}
      <motion.div
        className="absolute h-[260px] w-[260px] rounded-full"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(79,140,255,0.18), transparent 60%)",
          filter: "blur(8px)",
        }}
      />
      {/* crisp dot */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent"
        style={{ left: x, top: y, x: "-50%", y: "-50%" }}
      />
    </div>
  );
}
