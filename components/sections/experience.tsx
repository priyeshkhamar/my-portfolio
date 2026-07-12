"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { experience, education } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="02"
          kicker="Trajectory"
          title={
            <>
              From coordinator{" "}
              <span className="serif-accent text-accent">to engineer.</span>
            </>
          }
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-10">
          {/* timeline rail */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-border sm:left-[11px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent to-accent-2 sm:left-[11px]"
          />

          <div className="space-y-14">
            {experience.map((item) => (
              <ScrollReveal key={item.role + item.company} delay={0.05}>
                <article className="group relative rounded-2xl border border-transparent p-5 transition-colors hover:border-border hover:bg-surface/60 sm:-ml-5">
                  {/* node */}
                  <span className="absolute -left-8 top-7 flex h-4 w-4 items-center justify-center sm:-left-[26px]">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg transition-transform group-hover:scale-125" />
                  </span>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {item.role}
                    </h3>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-faint">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-accent">
                    {item.company}
                    <span className="text-faint"> · {item.location}</span>
                  </p>

                  <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
                    {item.summary}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {item.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex gap-3 text-sm leading-relaxed text-faint"
                      >
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-border-strong"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education & certification */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {education.map((e, i) => (
            <ScrollReveal key={e.title} delay={i * 0.06}>
              <div className="group flex h-full gap-4 bg-surface p-6 transition-colors hover:bg-surface-2">
                <span className="mt-0.5 text-accent">
                  {e.kind === "Education" ? (
                    <GraduationCap className="h-5 w-5" />
                  ) : (
                    <Award className="h-5 w-5" />
                  )}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
                    {e.kind}
                  </p>
                  <h3 className="mt-2 text-sm font-medium text-text">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {e.org} <span className="text-faint">· {e.location}</span>
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-faint">
                    {e.period}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
