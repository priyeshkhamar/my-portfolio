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
import { cn } from "@/lib/utils";
import { getTechIcon } from "@/lib/tech-icons";

/**
 * Marquee — a horizontally scrolling strip that drifts on its own and speeds up
 * (and flips direction) with scroll velocity. (React Bits "Scroll Velocity".)
 * `direction=-1` reverses the base drift; `outline` renders hollow display text.
 */
export function Marquee({
  items,
  baseSpeed = 40,
  direction = 1,
  outline = false,
  className,
}: {
  items: string[];
  baseSpeed?: number;
  direction?: 1 | -1;
  outline?: boolean;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const directionFactor = useRef(direction);

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let moveBy =
      directionFactor.current * (baseSpeed / 1000) * (delta / 16.6);
    const f = factor.get();
    if (f < 0) directionFactor.current = -direction as 1 | -1;
    else if (f > 0) directionFactor.current = direction;
    moveBy += directionFactor.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy * 0.05);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div
      className={cn(
        "relative flex overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <motion.div className="flex shrink-0 gap-10 whitespace-nowrap pr-10" style={{ x }}>
        {row.map((item, i) => {
          const Icon = getTechIcon(item);
          return (
            <span
              key={i}
              className={cn(
                "flex items-center gap-10 text-[clamp(1.75rem,4vw,3rem)] font-semibold uppercase tracking-tight",
                outline ? "text-outline" : "text-faint",
              )}
            >
              <span className="flex items-center gap-4">
                {Icon && (
                  <Icon className="h-[0.72em] w-[0.72em] shrink-0 text-accent/70" />
                )}
                {item}
              </span>
              <span className="text-accent" style={{ WebkitTextStroke: 0 }}>
                ✦
              </span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
