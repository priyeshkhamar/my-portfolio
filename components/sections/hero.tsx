"use client";

import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { TextReveal } from "@/components/ui/text-reveal";
import { StarBorder } from "@/components/ui/star-border";
import { Magnetic } from "@/components/ui/magnetic";
import { hero, site } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28"
    >
      {/* interactive particle field */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Particles />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="kicker">{hero.kicker}</span>
        </motion.div>

        <h1 className="max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          <DecryptedText text="Building production software" />
          <br className="hidden sm:block" />
          <span className="text-muted">
            <TextReveal text="from idea to deployment." delay={0.35} as="span" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <StarBorder href="#work">
              View featured work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </StarBorder>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
        >
          {hero.metrics.map((m) => (
            <div key={m.label} className="bg-surface px-6 py-5">
              <dt className="text-3xl font-semibold tracking-tight">{m.value}</dt>
              <dd className="mt-1 text-sm text-muted">{m.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint"
      >
        Scroll
      </motion.div>

      <span className="sr-only">
        {site.name} — {site.role} based in {site.location}.
      </span>
    </section>
  );
}
