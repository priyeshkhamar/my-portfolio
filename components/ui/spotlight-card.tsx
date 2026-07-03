"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * SpotlightCard — cursor-tracked radial highlight on a bordered surface, with
 * optional 3D tilt that leans the card toward the pointer.
 * Premium hover without glassmorphism; cheap to render.
 */
export function SpotlightCard({
  children,
  className,
  tilt = false,
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    el.style.setProperty("--x", `${px}px`);
    el.style.setProperty("--y", `${py}px`);
    if (tilt) {
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      ry.set(((px - cx) / cx) * maxTilt);
      rx.set(((cy - py) / cy) * maxTilt);
    }
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        tilt
          ? { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x) var(--y), rgba(200,247,81,0.09), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
