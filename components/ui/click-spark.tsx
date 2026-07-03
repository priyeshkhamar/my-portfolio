"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; start: number };

/**
 * ClickSpark — emits a burst of accent spark-lines from the pointer on every
 * click, site-wide. Canvas overlay, pointer-events-none. (React Bits-style.)
 */
export function ClickSpark({
  color = "#c8f751",
  count = 9,
  radius = 22,
  duration = 420,
}: {
  color?: string;
  count?: number;
  radius?: number;
  duration?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter((s) => now - s.start < duration);

      for (const s of sparks.current) {
        const t = (now - s.start) / duration;
        const e = ease(t);
        const len = radius * e;
        const dist = 6 + radius * e;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 1 - t;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const x1 = s.x + Math.cos(a) * dist;
          const y1 = s.y + Math.sin(a) * dist;
          const x2 = s.x + Math.cos(a) * (dist + len);
          const y2 = s.y + Math.sin(a) * (dist + len);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    const onClick = (e: MouseEvent) => {
      sparks.current.push({ x: e.clientX, y: e.clientY, start: performance.now() });
    };
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
    };
  }, [color, count, radius, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  );
}
