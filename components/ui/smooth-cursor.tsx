"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; vx: number; vy: number };

/**
 * SmoothCursor (React Bits Pro "Smooth Cursor") — a canvas-based flowing trail
 * that streams behind the native pointer. A chain of spring-coupled points
 * forms a tapering ribbon that thickens with velocity and glows via blur.
 * The native cursor is left intact. Disabled on touch / reduced-motion.
 */
export function SmoothCursor({
  pointsCount = 40,
  spring = 0.4,
  damping = 0.5,
  color = "79,140,255",
  baseWidth = 8,
  blur = 10,
  opacity = 1,
  blend = "source-over" as GlobalCompositeOperation,
}: {
  pointsCount?: number;
  spring?: number;
  damping?: number;
  color?: string;
  baseWidth?: number;
  blur?: number;
  opacity?: number;
  blend?: GlobalCompositeOperation;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const canvas = ref.current!;
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

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let speed = 0;
    let last = { x: mouse.x, y: mouse.y };

    const points: Pt[] = Array.from({ length: pointsCount }, () => ({
      x: mouse.x,
      y: mouse.y,
      vx: 0,
      vy: 0,
    }));

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - last.x;
      const dy = mouse.y - last.y;
      // smoothed pointer speed → drives ribbon thickness
      speed = Math.min(speed * 0.7 + Math.hypot(dx, dy) * 0.3, 60);
      last = { x: mouse.x, y: mouse.y };
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let running = true;

    const draw = () => {
      // integrate the spring chain
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const target = i === 0 ? mouse : points[i - 1];
        p.vx = (p.vx + (target.x - p.x) * spring) * damping;
        p.vy = (p.vy + (target.y - p.y) * spring) * damping;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = blend;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = blur;
      ctx.shadowColor = `rgba(${color},0.9)`;
      ctx.strokeStyle = `rgba(${color},${opacity})`;

      const velo = Math.min(speed / 14, 2.4); // velocity scaling

      // One continuous smooth curve through the chain (quadratic through
      // midpoints). Stacking progressively shorter sub-strokes from the head
      // produces a ribbon that is thick at the pointer and tapers to the tail.
      const strokeChain = (count: number, width: number) => {
        if (width < 0.2 || count < 2) return;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < count - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        ctx.stroke();
      };

      const scale = 0.45 + velo;
      strokeChain(points.length, baseWidth * 0.55 * scale);
      strokeChain(Math.floor(points.length * 0.62), baseWidth * 0.9 * scale);
      strokeChain(Math.floor(points.length * 0.32), baseWidth * 1.25 * scale);

      // gentle decay so a stationary pointer settles
      speed *= 0.92;

      if (running) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pointsCount, spring, damping, color, baseWidth, blur, opacity, blend]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[68]"
    />
  );
}
