"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { CommandMenu } from "@/components/command-menu";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClickSpark } from "@/components/ui/click-spark";
import { RingCursor } from "@/components/ui/ring-cursor";
import { Preloader } from "@/components/preloader";

/** Client shell: wires scroll progress, nav, smooth scroll, ⌘K and cursor FX. */
export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <RingCursor />
      <ClickSpark />
      <div aria-hidden className="noise-overlay" />
      <Nav onOpenCommand={() => setOpen(true)} />
      <CommandMenu open={open} setOpen={setOpen} />
      <main>{children}</main>
    </SmoothScroll>
  );
}
