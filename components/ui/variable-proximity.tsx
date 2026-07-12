"use client";

import { useEffect, useRef } from "react";

/**
 * VariableProximity (React Bits Pro "Variable Proximity") — letters swell
 * toward the pointer by animating the variable-font weight axis. Geist Sans
 * is a variable font (wght 100–900), so this costs no extra font downloads.
 * Falls back to static text on touch / reduced-motion.
 */
export function VariableProximity({
  text,
  className,
  baseWeight = 600,
  maxWeight = 900,
  radius = 140,
}: {
  text: string;
  className?: string;
  baseWeight?: number;
  maxWeight?: number;
  radius?: number;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = rootRef.current!;
    const letters = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-letter]"),
    );

    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let needsFrame = false;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!needsFrame) {
        needsFrame = true;
        raf = requestAnimationFrame(update);
      }
    };

    const update = () => {
      needsFrame = false;
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(mouse.x - cx, mouse.y - cy);
        const t = Math.max(0, 1 - d / radius);
        const w = Math.round(baseWeight + (maxWeight - baseWeight) * t * t);
        el.style.fontVariationSettings = `'wght' ${w}`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [baseWeight, maxWeight, radius]);

  return (
    <span ref={rootRef} className={className} aria-label={text}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i}> </span>
        ) : (
          <span
            key={i}
            data-letter
            aria-hidden
            className="inline-block will-change-[font-variation-settings]"
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
