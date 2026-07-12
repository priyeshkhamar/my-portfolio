"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { VariableProximity } from "@/components/ui/variable-proximity";
import { StarBorder } from "@/components/ui/star-border";
import { Magnetic } from "@/components/ui/magnetic";
import { CountUp } from "@/components/ui/count-up";
import { ShinyText } from "@/components/ui/shiny-text";
import { hero, site } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

// Lazy: three.js only downloads after hydration, and only mounts on desktop.
const Hero3D = dynamic(
  () => import("@/components/ui/hero-3d").then((m) => m.Hero3D),
  { ssr: false },
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-24 pt-28"
    >
      {/* aurora + particles + grid backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
        <Particles />
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* oversized ghost text pinned behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-full -translate-x-1/2 -translate-y-1/2 select-none text-center font-semibold uppercase tracking-[-0.04em] text-outline opacity-[0.14] text-[clamp(6rem,18vw,16rem)] leading-none"
      >
        Dev
      </div>

      {/* 3D centerpiece — floats over the hero's empty right half */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-2%] top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 lg:block xl:right-[2%]"
      >
        <Hero3D />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3.5 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              <DecryptedText text="Open to full-stack roles" />
            </span>
          </span>
        </motion.div>

        <h1 className="max-w-5xl text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="block"
          >
            <VariableProximity text="Full-stack developer" />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="serif-accent block text-gradient pb-2 pr-2"
          >
            from idea to deployment.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <StarBorder href="#projects">
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
          <span className="ml-1 hidden sm:block">
            <ShinyText
              text={`Based in ${site.location}`}
              className="font-mono text-xs tracking-wide"
            />
          </span>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
          className="mt-20 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
        >
          <div className="group bg-surface/80 px-6 py-5 backdrop-blur transition-colors hover:bg-surface-2">
            <dt className="text-3xl font-semibold tracking-tight">
              <CountUp value={2} suffix="+" />
            </dt>
            <dd className="mt-1 text-sm text-muted">Years shipping production</dd>
          </div>
          <div className="group bg-surface/80 px-6 py-5 backdrop-blur transition-colors hover:bg-surface-2">
            <dt className="text-3xl font-semibold tracking-tight text-accent">Sole</dt>
            <dd className="mt-1 text-sm text-muted">Developer of the platform web app</dd>
          </div>
          <div className="group bg-surface/80 px-6 py-5 backdrop-blur transition-colors hover:bg-surface-2">
            <dt className="text-3xl font-semibold tracking-tight">
              <CountUp value={3} />
            </dt>
            <dd className="mt-1 text-sm text-muted">Workstreams · web · iOS · backend</dd>
          </div>
        </motion.dl>
      </div>

      <span className="sr-only">
        {site.name} — {site.role} based in {site.location}.
      </span>
    </section>
  );
}
