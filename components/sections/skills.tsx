"use client";

import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="04"
          kicker="Capabilities"
          title={
            <>
              The stack I{" "}
              <span className="serif-accent text-accent">work with.</span>
            </>
          }
        />

        {/* bento: first card spans two columns on large screens */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <ScrollReveal
              key={group.title}
              delay={(i % 3) * 0.06}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <SpotlightCard tilt className="h-full p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-medium tracking-tight">
                    {group.title}
                  </h3>
                  <span className="serif-accent text-xl italic text-accent/50">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-1 text-sm text-faint">{group.caption}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-bg px-2.5 py-1.5 text-[13px] text-muted transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-text"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
