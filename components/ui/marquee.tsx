"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  wrap,
} from "motion/react";

/**
 * Marquee — a horizontally scrolling strip that drifts on its own and speeds up
 * (and flips direction) with scroll velocity. (React Bits "Scroll Velocity".)
 */
export function Marquee({
  items,
  baseSpeed = 40,
}: {
  items: string[];
  baseSpeed?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const directionFactor = useRef(1);
  const wrapper = useRef<HTMLDivElement>(null);

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let moveBy = directionFactor.current * (baseSpeed / 1000) * (delta / 16.6);
    const f = factor.get();
    if (f < 0) directionFactor.current = -1;
    else if (f > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy * 0.05);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={wrapper}
      className="relative flex overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <motion.div className="flex shrink-0 gap-8 whitespace-nowrap pr-8" style={{ x }}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-2xl font-medium tracking-tight text-faint">
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
