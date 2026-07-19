import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SubShell } from "@/components/subshell";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { caseStudies, getCaseStudy, type CaseSection } from "@/lib/case-studies";
import { site } from "@/lib/data";
import { TechLabel } from "@/lib/tech-icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.name} — Case study`,
    description: study.tagline,
    alternates: { canonical: `${site.url}/projects/${study.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/projects/${study.slug}`,
      title: `${study.name} — Case study by ${site.name}`,
      description: study.tagline,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.name} — Case study`,
    description: study.tagline,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/projects/${study.slug}`,
  };

  return (
    <SubShell>
      <article className="px-6 pb-24 pt-32 sm:pt-36">
        <div className="mx-auto w-full max-w-6xl">
          {/* header */}
          <header>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All projects
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">
                ● {study.status}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                Case study
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {study.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-xl leading-relaxed text-muted">
              {study.tagline}
            </p>
            <p className="mt-4 max-w-3xl text-pretty leading-relaxed text-faint">
              {study.summary}
            </p>

            {study.links && (
              <div className="mt-6 flex flex-wrap gap-3">
                {study.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs font-medium text-text transition-colors hover:border-accent hover:text-accent"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}

            {/* meta strip */}
            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {study.meta.map((m) => (
                <div key={m.label} className="bg-surface px-5 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    {m.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-snug text-text">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted"
                >
                  <TechLabel name={s} iconClassName="h-3 w-3 shrink-0 opacity-80" />
                </span>
              ))}
            </div>
          </header>

          {/* body: sticky TOC + content */}
          <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            <nav
              aria-label="Case study sections"
              className="hidden lg:block lg:self-start lg:sticky lg:top-28"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                On this page
              </p>
              <ol className="mt-4 space-y-2.5 border-l border-border pl-4">
                {study.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-[13px] leading-snug text-muted transition-colors hover:text-accent"
                    >
                      <span className="mr-1.5 font-mono text-[10px] text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 max-w-3xl space-y-16">
              {study.sections.map((section, i) => (
                <Section key={section.id} section={section} index={i} />
              ))}

              {/* takeaways */}
              <ScrollReveal>
                <div className="rounded-2xl border border-accent/20 bg-accent-soft p-7 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    If you only remember four things
                  </p>
                  <ul className="mt-5 space-y-3">
                    {study.takeaways.map((t) => (
                      <li
                        key={t}
                        className="flex gap-3 text-sm leading-relaxed text-text"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* footer CTA */}
              <div className="flex flex-col gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-accent"
                >
                  Want the longer version? Let&apos;s talk —{" "}
                  <span className="text-accent">{site.email}</span>
                </a>
                <Link
                  href={`/projects/${next.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Next: {next.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SubShell>
  );
}

function Section({ section, index }: { section: CaseSection; index: number }) {
  return (
    <ScrollReveal>
      <section id={section.id} className="scroll-mt-28">
        <p className="kicker flex items-center gap-3">
          <span className="h-px w-8 bg-accent/50" />
          {String(index + 1).padStart(2, "0")} — {section.title}
        </p>
        <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {section.title}
        </h2>

        <div className="mt-5 space-y-5">
          {section.body.map((p) => (
            <p key={p.slice(0, 40)} className="text-pretty leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>

        {section.bullets && (
          <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {section.bullets.map((b) => (
              <div
                key={b.title}
                className="group bg-surface p-6 transition-colors hover:bg-surface-2"
              >
                <h3 className="text-sm font-medium text-text">
                  <span className="mr-2 text-accent">→</span>
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{b.body}</p>
              </div>
            ))}
          </div>
        )}

        {section.code && (
          <figure className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface">
            <figcaption className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono text-[11px] text-muted">
                {section.code.title}
              </span>
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
              </span>
            </figcaption>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-muted">
              <code>{section.code.snippet}</code>
            </pre>
            {section.code.caption && (
              <p className="border-t border-border px-5 py-3 text-[13px] leading-relaxed text-faint">
                {section.code.caption}
              </p>
            )}
          </figure>
        )}
      </section>
    </ScrollReveal>
  );
}
