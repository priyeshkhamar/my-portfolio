import { SectionHeading } from "@/components/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { philosophy } from "@/lib/data";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="05"
          kicker={philosophy.kicker}
          title={
            <>
              A few things I try{" "}
              <span className="serif-accent text-accent">to work by.</span>
            </>
          }
        />

        {/* hover-invert rows — the row floods lime on hover */}
        <div className="mt-14 divide-y divide-border border-y border-border">
          {philosophy.principles.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 0.04}>
              <div
                data-cursor-target
                className="group grid gap-3 px-4 py-7 transition-colors duration-300 hover:bg-accent sm:grid-cols-[auto_0.8fr_1.2fr] sm:gap-8 sm:px-6 sm:py-8"
              >
                <span className="serif-accent text-2xl italic text-accent transition-colors duration-300 group-hover:text-bg">
                  {p.n}
                </span>
                <h3 className="text-lg font-medium tracking-tight transition-colors duration-300 group-hover:text-bg">
                  {p.title}
                </h3>
                <p className="text-pretty leading-relaxed text-muted transition-colors duration-300 group-hover:text-bg/80">
                  {p.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
