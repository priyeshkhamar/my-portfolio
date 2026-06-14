"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * SmoothCursor — a spring-following custom cursor (React Bits "Smooth Cursor").
 * The arrow lags slightly, rotates toward the direction of travel, stretches
 * with speed, and grows + dims over interactive elements. Replaces the native
 * cursor on fine pointers; fully disabled on touch / reduced-motion.
 */
const MOVE_SPRING = { damping: 45, stiffness: 400, mass: 1 };
const FX_SPRING = { damping: 30, stiffness: 300, mass: 0.8 };

export function SmoothCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, MOVE_SPRING);
  const sy = useSpring(y, MOVE_SPRING);

  const rotate = useMotionValue(0);
  const srotate = useSpring(rotate, FX_SPRING);
  const scale = useMotionValue(1);
  const sscale = useSpring(scale, FX_SPRING);

  const hovering = useRef(false);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    let prev = { x: window.innerWidth / 2, y: window.innerHeight / 2, t: performance.now() };

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const now = performance.now();
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(now - prev.t, 1);

      if (dist > 2 && !hovering.current) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        // keep within ±180 of current to avoid full-circle spins
        const current = rotate.get();
        let next = angle;
        while (next - current > 180) next -= 360;
        while (next - current < -180) next += 360;
        rotate.set(next);

        const speed = Math.min(dist / dt, 4);
        scale.set(1 + speed * 0.12);
      }
      prev = { x: e.clientX, y: e.clientY, t: now };

      clearTimeout(idle.current);
      idle.current = setTimeout(() => {
        if (!hovering.current) scale.set(1);
      }, 90);
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], input, textarea, [data-cursor='hover']",
      );
      if (interactive) {
        hovering.current = true;
        rotate.set(0);
        scale.set(2.4);
      }
    };
    const onOut = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], input, textarea, [data-cursor='hover']",
      );
      if (interactive) {
        hovering.current = false;
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      clearTimeout(idle.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [x, y, rotate, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div style={{ rotate: srotate, scale: sscale }} className="-translate-x-1/2 -translate-y-1/2">
        <svg
          width="22"
          height="26"
          viewBox="0 0 22 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 0.5 L21 25 L11 19.5 L1 25 Z"
            fill="#EDEDED"
            stroke="#0A0A0A"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
