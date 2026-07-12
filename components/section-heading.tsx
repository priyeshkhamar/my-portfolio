import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MaskReveal } from "@/components/ui/mask-reveal";

/**
 * Shared section header: `[ 01 — KICKER ]` index rail + oversized title.
 * Pass a ReactNode title to mix in `.serif-accent` italic words.
 */
export function SectionHeading({
  kicker,
  title,
  index,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  index?: string;
  align?: "left" | "center";
}) {
  return (
    <ScrollReveal>
      <div className={align === "center" ? "text-center" : ""}>
        <p
          className={`kicker flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          {align === "left" && <span className="h-px w-8 bg-accent/50" />}
          <span>
            {index ? `${index} — ` : ""}
            {kicker}
          </span>
          {align === "center" && <span className="h-px w-8 bg-accent/50" />}
        </p>
        <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
          <MaskReveal delay={0.1}>{title}</MaskReveal>
        </h2>
      </div>
    </ScrollReveal>
  );
}
