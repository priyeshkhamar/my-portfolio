"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Command } from "lucide-react";
import { navLinks, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view to highlight its nav pill
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300",
          scrolled
            ? "border-border bg-bg/70 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 pl-2 text-sm font-medium tracking-tight"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {site.name}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "group rounded-full px-3 py-1.5 text-sm transition-colors",
                active === link.href
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:text-text",
              )}
            >
              <span
                className={cn(
                  "mr-1 font-mono text-[10px]",
                  active === link.href ? "text-accent" : "text-faint group-hover:text-accent",
                )}
              >
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenCommand}
          className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-text"
          aria-label="Open command menu"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Menu</span>
          <kbd className="hidden font-mono text-[10px] text-faint sm:inline">⌘K</kbd>
        </button>
      </nav>
    </motion.header>
  );
}
