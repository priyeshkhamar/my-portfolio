"use client";

import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { caseStudy } from "@/lib/data";

export function CaseStudy() {
  return (
    <section id="work" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ScrollReveal>
          <p className="kicker flex items-center gap-3">
            <span className="h-px w-8 bg-accent/50" />
            03 — {caseStudy.kicker}
          </p>
        </ScrollReveal>

        {/* Header card with gradient frame */}
        <ScrollReveal delay={0.05}>
          <div className="mt-6 rounded-[18px] bg-gradient-to-br from-accent/50 via-border to-accent-2/50 p-px">
            <SpotlightCard className="rounded-[17px] p-8 sm:p-12">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                    {caseStudy.name}
                    <span className="text-accent">.</span>
                  </h2>
                  <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                    {caseStudy.tagline}
                  </p>
                  <p className="mt-4 text-pretty leading-relaxed text-faint">
                    {caseStudy.context}
                  </p>
                </div>
                <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">
                  ● Production
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {caseStudy.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-bg px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-text"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>

        {/* Case study sections */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {caseStudy.sections.map((s, i) => (
            <ScrollReveal key={s.label} delay={(i % 2) * 0.08}>
              <SpotlightCard tilt maxTilt={5} className="h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                    {s.label}
                  </span>
                  <span className="serif-accent text-2xl italic text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium leading-snug tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <p className="mt-10 flex items-center gap-2 text-sm text-faint">
            <ArrowUpRight className="h-4 w-4 text-accent" />
            Built at Attra Technologies. Architecture and ownership described
            faithfully.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
