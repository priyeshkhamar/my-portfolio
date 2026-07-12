"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/data";

/**
 * Preloader — award-site intro: name + counter climb to 100, then the curtain
 * wipes up to reveal the hero. Shown once per browser session; skipped
 * entirely for reduced-motion users.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("preloaded");
    // Background tabs get no rAF frames — showing the intro there would block
    // the page until focus. Skip it entirely.
    if (reduce || seen || document.hidden) {
      setShow(false);
      return;
    }
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      sessionStorage.setItem("preloaded", "1");
      setTimeout(() => {
        setShow(false);
        document.documentElement.style.overflow = "";
      }, 250);
    };

    // ease the counter to 100 over ~1.1s
    const start = performance.now();
    const DURATION = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);
    // Hard fallback: if rAF stalls (tab hidden mid-load, busy main thread),
    // never leave the curtain up.
    const failsafe = setTimeout(finish, DURATION + 1200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-bg"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-semibold tracking-tight"
          >
            {site.name}
            <span className="text-accent">.</span>
          </motion.p>
          <div className="mt-6 h-px w-48 overflow-hidden bg-border">
            <div
              className="h-full bg-accent transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-mono text-xs tabular-nums text-faint">
            {String(progress).padStart(3, "0")} / 100
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
