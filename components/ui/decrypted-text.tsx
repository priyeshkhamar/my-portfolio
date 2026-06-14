"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#01";

/**
 * DecryptedText — letters scramble through random glyphs, then resolve to the
 * final string left-to-right. On-theme for a security/SOAR platform.
 * Reveals once when scrolled into view; static under reduced motion.
 */
export function DecryptedText({
  text,
  className,
  speed = 38,
  revealEvery = 2,
}: {
  text: string;
  className?: string;
  speed?: number;
  revealEvery?: number;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(text);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let frame = 0;
      let revealed = 0;
      const id = setInterval(() => {
        frame++;
        if (frame % revealEvery === 0) revealed++;
        const out = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealed) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(out);
        if (revealed >= text.length) clearInterval(id);
      }, speed);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, speed, revealEvery]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
