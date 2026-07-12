"use client";

import { useEffect, useRef } from "react";

/**
 * RingCursor — the classic award-site cursor: a solid lime dot glued to the
 * pointer, with a springy halo ring trailing behind it. The ring expands and
 * brightens over links, buttons and [data-cursor-target] elements, and
 * collapses while the mouse is pressed. Native cursor is hidden via the
 * `custom-cursor` class on <html>. Disabled on touch / reduced-motion.
 */
export function RingCursor({
  ringSize = 36,
  hoverScale = 1.7,
  pressScale = 0.75,
  ringLag = 0.2,
}: {
  ringSize?: number;
  hoverScale?: number;
  pressScale?: number;
  ringLag?: number;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    let scale = 1;
    let targetScale = 1;
    let hovered = false;
    let pressed = false;
    let raf = 0;
    let running = true;

    const SELECTOR = "a, button, [role='button'], [data-cursor-target]";

    const updateTargetScale = () => {
      targetScale = pressed ? pressScale : hovered ? hoverScale : 1;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // dot is glued to the pointer — zero lag
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      hovered = !!(e.target as Element | null)?.closest?.(SELECTOR);
      updateTargetScale();
    };
    const onDown = () => {
      pressed = true;
      updateTargetScale();
    };
    const onUp = () => {
      pressed = false;
      updateTargetScale();
    };
    // re-evaluate hover when content scrolls under a static pointer
    const onScroll = () => {
      hovered = !!document
        .elementFromPoint(mouse.x, mouse.y)
        ?.closest?.(SELECTOR);
      updateTargetScale();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const frame = () => {
      ringPos.x = lerp(ringPos.x, mouse.x, ringLag);
      ringPos.y = lerp(ringPos.y, mouse.y, ringLag);
      scale = lerp(scale, targetScale, 0.22);
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.borderColor = hovered
        ? "rgba(200, 247, 81, 0.9)"
        : "rgba(200, 247, 81, 0.45)";
      ring.style.backgroundColor = hovered
        ? "rgba(200, 247, 81, 0.08)"
        : "transparent";
      if (running) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ringSize, hoverScale, pressScale, ringLag]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border-[1.5px] transition-colors duration-200"
        style={{ width: ringSize, height: ringSize }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent"
      />
    </div>
  );
}
