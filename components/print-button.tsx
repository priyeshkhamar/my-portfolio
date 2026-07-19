"use client";

import { Printer } from "lucide-react";

/** Triggers the browser print dialog — "Save as PDF" is the download path. */
export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
    >
      <Printer className="h-4 w-4" />
      Download PDF
    </button>
  );
}
