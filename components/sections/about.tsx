import { SectionHeading } from "@/components/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { about } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto grid w-full max-w-5xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading kicker={about.kicker} title={about.title} />
        </div>

        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <p className="text-pretty text-[17px] leading-relaxed text-muted">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-5xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {about.pillars.map((pillar, i) => (
          <ScrollReveal key={pillar.title} delay={i * 0.06}>
            <div className="h-full bg-surface p-6">
              <h3 className="text-sm font-medium text-text">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-faint">
                {pillar.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
