"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { CommandMenu } from "@/components/command-menu";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";

/** Client shell: wires the scroll progress, nav, smooth scroll and ⌘K menu. */
export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav onOpenCommand={() => setOpen(true)} />
      <CommandMenu open={open} setOpen={setOpen} />
      <main>{children}</main>
    </SmoothScroll>
  );
}
