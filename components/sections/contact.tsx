"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Github, Linkedin, MapPin, FileText } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { contact, site } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 sm:py-40">
      {/* backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(200,247,81,0.08), rgba(139,124,255,0.06) 55%, transparent 75%)",
        }}
      />

      <div className="mx-auto w-full max-w-4xl text-center">
        <ScrollReveal>
          <p className="kicker flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent/50" />
            05 — {contact.kicker}
            <span className="h-px w-8 bg-accent/50" />
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="mt-6 text-balance text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            Let&apos;s{" "}
            <span className="serif-accent text-gradient">talk.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {contact.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
              >
                <Mail className="h-4 w-4" />
                {site.email}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
              >
                <FileText className="h-4 w-4" />
                View resume
              </Link>
            </Magnetic>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" /> GitHub
              <ArrowUpRight className="h-3 w-3 text-faint" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
              <ArrowUpRight className="h-3 w-3 text-faint" />
            </a>
            <span className="inline-flex items-center gap-2 text-faint">
              <MapPin className="h-4 w-4" /> {site.location}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
