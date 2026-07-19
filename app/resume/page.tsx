import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PrintButton } from "@/components/print-button";
import { education, experience, projects, site, skillGroups } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name} — ${site.role}. View online or save as PDF.`,
  alternates: { canonical: `${site.url}/resume` },
};

/**
 * /resume — an always-current HTML resume generated from lib/data.ts.
 * On screen it renders as a paper sheet; printing it (the "Download PDF"
 * button) produces a clean single-document PDF via the print stylesheet.
 */
export default function ResumePage() {
  return (
    <div className="resume-page min-h-screen bg-bg px-4 py-8 sm:px-6 sm:py-12">
      {/* toolbar — hidden in print */}
      <div className="print-hidden mx-auto mb-8 flex w-full max-w-3xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to site
        </Link>
        <PrintButton />
      </div>

      {/* paper sheet — light on purpose, matches the printed output */}
      <article className="resume-sheet mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 text-neutral-900 shadow-2xl sm:p-12">
        {/* header */}
        <header className="border-b border-neutral-200 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-lg text-neutral-600">{site.role}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-neutral-600">
            <li className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {site.phone}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {site.location}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Github className="h-3.5 w-3.5" />
              <a href={site.github} className="hover:underline">
                github.com/priyeshkhamar
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5" />
              <a href={site.linkedin} className="hover:underline">
                linkedin.com/in/priyeshkhamar
              </a>
            </li>
          </ul>
        </header>

        {/* summary */}
        <ResumeSection title="Summary">
          <p className="text-[13.5px] leading-relaxed text-neutral-700">
            {site.description}
          </p>
        </ResumeSection>

        {/* experience */}
        <ResumeSection title="Experience">
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.role + job.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[15px] font-semibold">
                    {job.role}{" "}
                    <span className="font-normal text-neutral-500">
                      · {job.company}, {job.location}
                    </span>
                  </h3>
                  <span className="text-[12px] tabular-nums text-neutral-500">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-neutral-700">
                  {job.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* projects */}
        <ResumeSection title="Selected projects">
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.slug}>
                <h3 className="text-[14px] font-semibold">
                  {p.name}{" "}
                  <span className="font-normal text-neutral-500">
                    — {p.status}
                  </span>
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-700">
                  {p.tagline}
                </p>
                <p className="mt-1 text-[12px] text-neutral-500">
                  {p.stack.join(" · ")} · Case study: {site.url}/projects/{p.slug}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* skills */}
        <ResumeSection title="Skills">
          <dl className="space-y-2">
            {skillGroups.map((g) => (
              <div key={g.title} className="flex gap-3 text-[13px]">
                <dt className="w-40 shrink-0 font-semibold text-neutral-800">
                  {g.title}
                </dt>
                <dd className="leading-relaxed text-neutral-700">
                  {g.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        {/* education */}
        <ResumeSection title="Education & certification">
          <div className="space-y-3">
            {education.map((e) => (
              <div
                key={e.title}
                className="flex flex-wrap items-baseline justify-between gap-x-4"
              >
                <p className="text-[13.5px]">
                  <span className="font-semibold">{e.title}</span>{" "}
                  <span className="text-neutral-500">
                    · {e.org}, {e.location}
                  </span>
                </p>
                <span className="text-[12px] tabular-nums text-neutral-500">
                  {e.period}
                </span>
              </div>
            ))}
          </div>
        </ResumeSection>

        <p className="mt-8 border-t border-neutral-200 pt-4 text-center text-[11px] text-neutral-400">
          Always-current version at {site.url}/resume
        </p>
      </article>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-block mt-7">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
