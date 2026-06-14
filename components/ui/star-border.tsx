"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * StarBorder — animated conic-gradient border that sweeps around a pill button.
 * (React Bits "Star Border", themed to the single accent.)
 */
export function StarBorder({
  children,
  href,
  onClick,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const inner = (
    <span className="relative z-10 flex items-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-colors group-hover:bg-white">
      {children}
    </span>
  );

  const cls = cn(
    "star-border group relative inline-flex rounded-full p-px",
    className,
  );

  return (
    <>
      {href ? (
        <a href={href} className={cls}>
          <span className="star-border__spin absolute inset-0 rounded-full" aria-hidden />
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className={cls}>
          <span className="star-border__spin absolute inset-0 rounded-full" aria-hidden />
          {inner}
        </button>
      )}
    </>
  );
}
