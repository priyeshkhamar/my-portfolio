"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Command } from "lucide-react";
import { navLinks, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            ? "border-border bg-surface/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 pl-2 text-sm font-medium tracking-tight"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          {site.name}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenCommand}
          className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-text"
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
