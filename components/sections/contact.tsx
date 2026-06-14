"use client";

import { ArrowUpRight, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { contact, site } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 sm:py-40">
      <div className="mx-auto w-full max-w-3xl text-center">
        <ScrollReveal>
          <p className="kicker">{contact.kicker}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="mt-5 text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {contact.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {contact.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-text px-7 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-white"
              >
                <Mail className="h-4 w-4" />
                {site.email}
              </a>
            </Magnetic>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-text"
            >
              <Github className="h-4 w-4" /> GitHub
              <ArrowUpRight className="h-3 w-3 text-faint" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-text"
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
