"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  User,
  Briefcase,
  LayoutGrid,
  Cpu,
  Compass,
  Home,
  Copy,
  Check,
  Command,
  FileText,
  BookOpen,
} from "lucide-react";
import { navLinks, site } from "@/lib/data";
import { caseStudies } from "@/lib/case-studies";

type Item = {
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  action: () => void;
};

const sectionIcon: Record<string, React.ReactNode> = {
  "/#about": <User className="h-4 w-4" />,
  "/#experience": <Briefcase className="h-4 w-4" />,
  "/#projects": <LayoutGrid className="h-4 w-4" />,
  "/#skills": <Cpu className="h-4 w-4" />,
  "/#philosophy": <Compass className="h-4 w-4" />,
  "/#contact": <Mail className="h-4 w-4" />,
};

export function CommandMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Section hrefs look like "/#about". On the homepage we smooth-scroll to
   * the element; on inner pages (case studies, resume) the element doesn't
   * exist, so we do a real navigation instead.
   */
  const go = (href: string) => {
    setOpen(false);
    const hashIndex = href.indexOf("#");
    const el =
      hashIndex >= 0 ? document.getElementById(href.slice(hashIndex + 1)) : null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  const items: Item[] = useMemo(() => {
    const nav: Item[] = [
      {
        group: "Navigate",
        label: "Top",
        icon: <Home className="h-4 w-4" />,
        action: () => go("/#top"),
      },
      {
        group: "Navigate",
        label: "Resume",
        hint: "View · Download PDF",
        icon: <FileText className="h-4 w-4" />,
        action: () => {
          setOpen(false);
          window.location.href = "/resume";
        },
      },
      ...navLinks.map((l) => ({
        group: "Navigate",
        label: l.label,
        icon: sectionIcon[l.href] ?? <ArrowUpRight className="h-4 w-4" />,
        action: () => go(l.href),
      })),
    ];

    const actions: Item[] = [
      {
        group: "Actions",
        label: "Copy email",
        hint: site.email,
        icon: copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />,
        action: async () => {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        },
      },
      {
        group: "Actions",
        label: "Email me",
        icon: <Mail className="h-4 w-4" />,
        action: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
    ];

    const links: Item[] = [
      {
        group: "Links",
        label: "GitHub",
        hint: "github.com/priyeshkhamar",
        icon: <Github className="h-4 w-4" />,
        action: () => window.open(site.github, "_blank"),
      },
      {
        group: "Links",
        label: "LinkedIn",
        hint: "linkedin.com/in/priyeshkhamar",
        icon: <Linkedin className="h-4 w-4" />,
        action: () => window.open(site.linkedin, "_blank"),
      },
    ];

    const studies: Item[] = caseStudies.map((c) => ({
      group: "Case studies",
      label: c.name,
      hint: c.status,
      icon: <BookOpen className="h-4 w-4" />,
      action: () => {
        setOpen(false);
        window.location.href = `/projects/${c.slug}`;
      },
    }));

    return [...nav, ...studies, ...actions, ...links];
  }, [copied]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        i.hint?.toLowerCase().includes(q),
    );
  }, [items, query]);

  // global ⌘K / Ctrl+K toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.action();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Command className="h-4 w-4 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, links, actions…"
                className="w-full bg-transparent py-4 text-sm text-text outline-none placeholder:text-faint"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-faint">
                  No results.
                </p>
              )}
              {filtered.map((item, i) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <div key={`${item.group}-${item.label}`}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-faint">
                        {item.group}
                      </p>
                    )}
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => item.action()}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        active === i
                          ? "bg-surface-2 text-text"
                          : "text-muted hover:text-text"
                      }`}
                    >
                      <span className="text-faint">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.hint && (
                        <span className="font-mono text-[11px] text-faint">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
