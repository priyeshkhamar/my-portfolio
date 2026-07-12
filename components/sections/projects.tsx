"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { projects, type Project } from "@/lib/data";
import { TechLabel } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

/**
 * Projects — a scroll-pinned card deck. Each card sticks below the nav with a
 * progressive offset, so the next project slides over the last like a deck
 * being flipped through. Pure CSS sticky; no scroll-jacking.
 */
export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ScrollReveal>
          <p className="kicker flex items-center gap-3">
            <span className="h-px w-8 bg-accent/50" />
            03 — Projects
          </p>
          <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
            Things I&apos;ve{" "}
            <span className="serif-accent text-accent">built and shipped.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-14 space-y-10 lg:space-y-14">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = (
    <div
      className={cn(
        "glare-sweep relative grid gap-10 overflow-hidden bg-surface p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14",
        project.featured ? "rounded-[17px]" : "rounded-2xl border border-border",
      )}
    >
      {/* main column */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[11px]",
              project.featured
                ? "border-accent/30 bg-accent-soft text-accent"
                : "border-border bg-bg text-faint",
            )}
          >
            ● {project.status}
          </span>
          <span className="serif-accent text-xl italic text-accent/50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
          {project.name}
          <span className="text-accent">.</span>
        </h3>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>
        <p className="mt-3 text-pretty leading-relaxed text-faint">
          {project.description}
        </p>

        {project.links && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs font-medium text-text transition-colors hover:border-accent hover:text-accent"
              >
                {l.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* highlights + stack column */}
      <div className="lg:border-l lg:border-border lg:pl-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
          What I owned
        </p>
        <ul className="mt-4 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-faint">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-bg px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-text"
            >
              <TechLabel name={s} iconClassName="h-3 w-3 shrink-0 opacity-80" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="sticky"
      style={{ top: `calc(88px + ${index * 26}px)`, zIndex: index + 1 }}
    >
      {project.featured ? (
        <div className="rounded-[18px] bg-gradient-to-br from-accent/50 via-border to-accent-2/50 p-px shadow-[0_-12px_40px_rgba(0,0,0,0.5)]">
          {card}
        </div>
      ) : (
        <div className="shadow-[0_-12px_40px_rgba(0,0,0,0.5)]">{card}</div>
      )}
    </div>
  );
}
