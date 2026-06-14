import { SectionHeading } from "@/components/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { philosophy } from "@/lib/data";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading kicker={philosophy.kicker} title={philosophy.title} />

        <div className="mt-14 divide-y divide-border border-y border-border">
          {philosophy.principles.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 0.04}>
              <div className="group grid gap-3 py-7 transition-colors sm:grid-cols-[auto_0.8fr_1.2fr] sm:gap-8 sm:py-8">
                <span className="font-mono text-sm text-accent">{p.n}</span>
                <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="text-pretty leading-relaxed text-muted">{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
