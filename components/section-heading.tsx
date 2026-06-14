import { ScrollReveal } from "@/components/ui/scroll-reveal";

/** Shared section kicker + title block for consistent rhythm. */
export function SectionHeading({
  kicker,
  title,
  align = "left",
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <ScrollReveal>
      <div className={align === "center" ? "text-center" : ""}>
        <p className="kicker">{kicker}</p>
        <h2 className="mt-4 max-w-2xl text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
          {title}
        </h2>
      </div>
    </ScrollReveal>
  );
}
