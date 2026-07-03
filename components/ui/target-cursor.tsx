"use client";

import { useEffect, useRef } from "react";

/**
 * TargetCursor (React Bits Pro "Target Cursor") — replaces the native cursor
 * with a center dot and four corner brackets. The brackets idle-spin around
 * the pointer; when hovering a link, button or [data-cursor-target] element
 * they unfold and lock onto that element's bounding box like a viewfinder.
 * Native cursor is hidden via the `custom-cursor` class on <html>.
 * Disabled on touch / reduced-motion.
 */
export function TargetCursor({
  idleGap = 14,
  lockPadding = 6,
  cornerSize = 11,
}: {
  idleGap?: number;
  lockPadding?: number;
  cornerSize?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("custom-cursor");

    const wrap = wrapRef.current!;
    const dot = dotRef.current!;
    const corners = cornerRefs.current as HTMLDivElement[];

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // Rendered state, lerped toward targets each frame
    const pos = { x: mouse.x, y: mouse.y };
    const cur = corners.map(() => ({ x: 0, y: 0 }));
    let spin = 0;
    let locked: HTMLElement | null = null;
    let pressed = false;
    let raf = 0;
    let running = true;

    const SELECTOR = "a, button, [role='button'], [data-cursor-target]";

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const t = (e.target as Element | null)?.closest?.(SELECTOR) ?? null;
      locked = (t as HTMLElement) ?? null;
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeaveDoc = () => (locked = null);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    // Re-evaluate lock on scroll (element moves under a static pointer)
    const onScroll = () => {
      const t = document.elementFromPoint(mouse.x, mouse.y)?.closest?.(SELECTOR);
      locked = (t as HTMLElement) ?? null;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const frame = () => {
      // wrapper follows pointer tightly
      pos.x = lerp(pos.x, mouse.x, 0.32);
      pos.y = lerp(pos.y, mouse.y, 0.32);
      wrap.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      // corner targets: locked box corners, or idle diamond spinning around dot
      let targets: { x: number; y: number; r: number }[];
      if (locked && document.contains(locked)) {
        const r = locked.getBoundingClientRect();
        const p = lockPadding;
        targets = [
          { x: r.left - p - pos.x, y: r.top - p - pos.y, r: 0 },
          { x: r.right + p - pos.x, y: r.top - p - pos.y, r: 90 },
          { x: r.right + p - pos.x, y: r.bottom + p - pos.y, r: 180 },
          { x: r.left - p - pos.x, y: r.bottom + p - pos.y, r: 270 },
        ];
      } else {
        spin += pressed ? 0.9 : 1.6;
        const g = pressed ? idleGap * 0.6 : idleGap;
        targets = [0, 1, 2, 3].map((i) => {
          const a = ((spin + i * 90) * Math.PI) / 180;
          return {
            x: Math.cos(a) * g,
            y: Math.sin(a) * g,
            r: spin + i * 90 + 45,
          };
        });
      }

      const ease = locked ? 0.22 : 0.3;
      corners.forEach((c, i) => {
        if (!c) return;
        cur[i].x = lerp(cur[i].x, targets[i].x, ease);
        cur[i].y = lerp(cur[i].y, targets[i].y, ease);
        c.style.transform = `translate3d(${cur[i].x}px, ${cur[i].y}px, 0) rotate(${targets[i].r}deg)`;
      });

      dot.style.transform = `translate(-50%, -50%) scale(${pressed ? 0.6 : locked ? 1.6 : 1})`;

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
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [idleGap, lockPadding, cornerSize]);

  const corner = (i: number) => (
    <div
      key={i}
      ref={(el) => {
        cornerRefs.current[i] = el;
      }}
      className="absolute left-0 top-0"
      style={{ width: cornerSize, height: cornerSize, marginLeft: -cornerSize / 2, marginTop: -cornerSize / 2 }}
    >
      {/* L-shaped bracket: top + left edges; rotation orients it per corner */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-accent" />
      <div className="absolute inset-y-0 left-0 w-[2px] bg-accent" />
    </div>
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-150"
      />
      {[0, 1, 2, 3].map(corner)}
    </div>
  );
}
