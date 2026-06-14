"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Particles — interactive particle field with proximity links that repel from
 * the cursor. Canvas-based, capped count, pauses when offscreen / tab hidden.
 * Used as the hero background. (React Bits "Particles" reimagined.)
 */
export function Particles({
  density = 64,
  color = "79,140,255",
  linkDist = 130,
}: {
  density?: number;
  color?: string;
  linkDist?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let running = true;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(density, Math.floor((w * h) / 14000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };
    init();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // cursor repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) || 1;
          const f = (120 - d) / 120;
          p.vx += (dx / d) * f * 0.6;
          p.vy += (dy / d) * f * 0.6;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        // gentle drift floor so it never freezes
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.1;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.7)`;
        ctx.fill();
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (running) raf = requestAnimationFrame(step);
    };

    if (!reduce) {
      raf = requestAnimationFrame(step);
    } else {
      // single static frame
      step();
      running = false;
    }

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce && !running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, color, linkDist]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
