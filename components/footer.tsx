"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { site } from "@/lib/data";

/** Live clock in the site owner's timezone — an "is he awake?" signal. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs tabular-nums text-faint">
      Ahmedabad&nbsp;·&nbsp;{time ?? "--:--:--"}&nbsp;IST
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 pb-10 pt-14">
      {/* oversized outline wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-semibold uppercase leading-none tracking-[-0.04em] text-outline opacity-[0.35] text-[clamp(3rem,11vw,10rem)]"
      >
        {site.name}
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center justify-between gap-5 text-sm text-faint sm:flex-row">
        <p>
          © {year} {site.name}
        </p>
        <LocalTime />
        <div className="flex items-center gap-4">
          <Magnetic strength={0.3}>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
