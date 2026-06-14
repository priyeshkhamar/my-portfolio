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
  color = "237,237,237",
  baseRadius = 17,
  opacity = 0.85,
  blend = "lighter" as GlobalCompositeOperation,
}: {
  pointsCount?: number;
  spring?: number;
  damping?: number;
  color?: string;
  baseRadius?: number;
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

      const velo = Math.min(speed / 16, 1.6); // velocity scaling

      // Soft airbrush: stamp feathered radial-gradient blobs along the chain,
      // interpolating between points so they overlap into one continuous brush.
      // Radius tapers from the pointer (head) to the tail; additive blend builds
      // the bright, soft-edged core seen in the reference.
      const stamp = (cx: number, cy: number, r: number, a: number) => {
        if (r < 0.5) return;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${color},${a})`);
        g.addColorStop(0.5, `rgba(${color},${a * 0.45})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      };

      const sub = 4; // interpolation density between chain points
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const taper = 1 - i / points.length; // 1 at head → 0 at tail
        const radius = baseRadius * taper * (0.55 + velo);
        const alpha = opacity * 0.12 * (0.4 + taper);
        for (let s = 0; s < sub; s++) {
          const f = s / sub;
          stamp(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, radius, alpha);
        }
      }

      // gentle decay so a stationary pointer settles
      speed *= 0.9;

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
  }, [pointsCount, spring, damping, color, baseRadius, opacity, blend]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[68]"
    />
  );
}
