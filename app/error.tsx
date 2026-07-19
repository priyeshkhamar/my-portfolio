"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { site } from "@/lib/data";

/** Route-level error boundary — keeps a crash from ever showing a blank page. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="kicker">Something broke</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        That wasn&apos;t supposed to happen
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-3 max-w-md text-pretty text-muted">
        An unexpected error occurred. Try again — and if it keeps happening,
        I&apos;d genuinely like to know:{" "}
        <a href={`mailto:${site.email}`} className="text-accent hover:underline">
          {site.email}
        </a>
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
      >
        <RotateCcw className="h-4 w-4" />
        Try again
      </button>
    </main>
  );
}
