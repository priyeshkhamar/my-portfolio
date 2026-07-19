"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { CommandMenu } from "@/components/command-menu";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClickSpark } from "@/components/ui/click-spark";
import { RingCursor } from "@/components/ui/ring-cursor";

/**
 * SubShell — the Shell minus the preloader, for inner pages (case studies,
 * resume). Keeps nav, ⌘K, cursor FX and scroll progress consistent site-wide.
 */
export function SubShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <RingCursor />
      <ClickSpark />
      <div aria-hidden className="noise-overlay" />
      <Nav onOpenCommand={() => setOpen(true)} />
      <CommandMenu open={open} setOpen={setOpen} />
      <main id="top">{children}</main>
    </SmoothScroll>
  );
}
