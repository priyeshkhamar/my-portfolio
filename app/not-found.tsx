import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { site } from "@/lib/data";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <p className="text-outline select-none text-[clamp(6rem,20vw,14rem)] font-semibold leading-none">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        This page doesn&apos;t exist
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-3 max-w-md text-pretty text-muted">
        The link may be old, or the page moved. Everything worth seeing is one
        click away.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {site.name.split(" ")[0]}&apos;s work
        </Link>
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          <FileText className="h-4 w-4" />
          View resume
        </Link>
      </div>
    </main>
  );
}
