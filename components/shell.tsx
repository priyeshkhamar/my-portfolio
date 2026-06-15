"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { CommandMenu } from "@/components/command-menu";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClickSpark } from "@/components/ui/click-spark";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

/** Client shell: wires scroll progress, nav, smooth scroll, ⌘K and cursor FX. */
export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <SmoothCursor baseRadius={35} />
      <ClickSpark />
      <Nav onOpenCommand={() => setOpen(true)} />
      <CommandMenu open={open} setOpen={setOpen} />
      <main>{children}</main>
    </SmoothScroll>
  );
}
