/**
 * Stylized product mockups for the project cards — pure CSS/SVG "abstract
 * screenshots" in the site palette. Deliberately skeleton-styled (bars, not
 * legible text) so the proprietary CIO 360 UI is evoked, never leaked.
 * All decorative: aria-hidden, non-interactive.
 */

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return (
    <div
      className={`h-1.5 rounded-full bg-border-strong ${className}`}
      style={{ width: w }}
    />
  );
}

export function BrowserFrame({
  address,
  children,
}: {
  address: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none select-none overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-accent/60" />
        <span className="mx-auto flex h-4 w-36 items-center justify-center rounded-full bg-bg font-mono text-[8px] tracking-wide text-faint sm:w-44">
          {address}
        </span>
        <span className="h-2 w-6" />
      </div>
      {children}
    </div>
  );
}

/** CIO 360 — abstracted SOAR dashboard: sidebar, stat tiles, charts, alert feed. */
export function Cio360Mockup() {
  return (
    <BrowserFrame address="cio360 · dashboard">
      <div className="flex bg-bg">
        {/* sidebar */}
        <div className="w-[21%] space-y-2.5 border-r border-border p-2.5">
          <div className="flex items-center gap-1.5 pb-1">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <Bar w="60%" />
          </div>
          <div className="rounded bg-accent-soft px-1.5 py-1">
            <Bar w="70%" className="!bg-accent/70" />
          </div>
          {["80%", "55%", "70%", "60%", "45%"].map((w, i) => (
            <div key={i} className="px-1.5 py-1">
              <Bar w={w} />
            </div>
          ))}
        </div>

        {/* main */}
        <div className="flex-1 space-y-2.5 p-2.5">
          {/* stat tiles */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { n: "h-2.5 w-8 bg-accent/80" },
              { n: "h-2.5 w-7 bg-text/60" },
              { n: "h-2.5 w-9 bg-text/60" },
              { n: "h-2.5 w-6 bg-accent-2/70" },
            ].map((t, i) => (
              <div key={i} className="rounded-md bg-surface-2 p-2">
                <Bar w="55%" className="!h-1" />
                <div className={`mt-1.5 rounded-sm ${t.n}`} />
              </div>
            ))}
          </div>

          {/* charts */}
          <div className="grid grid-cols-[1.6fr_1fr] gap-2">
            <div className="rounded-md bg-surface-2 p-2">
              <Bar w="34%" className="!h-1" />
              <svg viewBox="0 0 200 60" className="mt-1 h-16 w-full">
                <defs>
                  <linearGradient id="cioArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(200,247,81,0.35)" />
                    <stop offset="100%" stopColor="rgba(200,247,81,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,46 C25,42 35,28 55,30 C75,32 85,16 105,18 C125,20 140,34 160,26 C175,20 190,10 200,12 L200,60 L0,60 Z"
                  fill="url(#cioArea)"
                />
                <path
                  d="M0,46 C25,42 35,28 55,30 C75,32 85,16 105,18 C125,20 140,34 160,26 C175,20 190,10 200,12"
                  fill="none"
                  stroke="rgba(200,247,81,0.9)"
                  strokeWidth="1.5"
                />
                <path
                  d="M0,52 C30,50 45,40 70,42 C95,44 115,32 140,36 C165,40 185,30 200,32"
                  fill="none"
                  stroke="rgba(139,124,255,0.8)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>
            <div className="rounded-md bg-surface-2 p-2">
              <Bar w="50%" className="!h-1" />
              <div className="mt-2 flex h-14 items-end gap-1.5">
                {[38, 62, 45, 80, 55, 70, 30].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-sm ${
                      i === 3 ? "bg-accent/80" : i % 2 ? "bg-accent-2/50" : "bg-border-strong"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* alert feed */}
          <div className="space-y-1.5 rounded-md bg-surface-2 p-2">
            {[
              { dot: "bg-accent", chip: "bg-accent-soft" },
              { dot: "bg-amber-400/80", chip: "bg-border" },
              { dot: "bg-red-400/70", chip: "bg-border" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2 rounded bg-bg px-2 py-1.5">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${r.dot}`} />
                <Bar w={`${52 - i * 8}%`} />
                <span className={`ml-auto h-2.5 w-10 rounded-full ${r.chip}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** This portfolio — a tiny self-referential replica of the hero. */
export function PortfolioMockup() {
  return (
    <BrowserFrame address="priyeshkhamar.vercel.app">
      <div className="relative overflow-hidden bg-bg p-4">
        <div className="bg-grid absolute inset-0 opacity-40" />
        {/* mini nav */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <Bar w="42px" />
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <Bar key={i} w="16px" />
            ))}
          </div>
        </div>
        {/* mini hero */}
        <div className="relative py-6">
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5">
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-accent">
              Open to roles
            </span>
          </span>
          <p className="mt-2 text-[17px] font-semibold leading-tight tracking-tight text-text">
            Full-stack developer
            <br />
            <span className="serif-accent text-gradient">
              from idea to deployment.
            </span>
          </p>
          <div className="mt-3 flex gap-2">
            <span className="h-4 w-16 rounded-full bg-text/90" />
            <span className="h-4 w-14 rounded-full border border-border-strong" />
          </div>
          {/* cursor brackets ornament */}
          <div className="absolute right-6 top-8 h-6 w-10">
            <span className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-accent" />
            <span className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-accent" />
            <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-accent" />
            <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-accent" />
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** ERP modules — data-heavy admin table with toolbar and status chips. */
export function ErpMockup() {
  return (
    <BrowserFrame address="erp · asset management">
      <div className="flex bg-bg">
        {/* icon rail */}
        <div className="space-y-2.5 border-r border-border p-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded ${i === 1 ? "bg-accent/70" : "bg-border-strong"}`}
            />
          ))}
        </div>
        {/* table */}
        <div className="flex-1 space-y-2 p-2.5">
          <div className="flex items-center gap-2">
            <span className="h-4 flex-1 rounded-full bg-surface-2" />
            <span className="h-4 w-14 rounded-full bg-accent/80" />
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            <div className="flex gap-3 border-b border-border bg-surface-2 px-2 py-1.5">
              {["18%", "26%", "20%", "12%"].map((w, i) => (
                <Bar key={i} w={w} className="!h-1" />
              ))}
            </div>
            {[0, 1, 2, 3].map((row) => (
              <div
                key={row}
                className="flex items-center gap-3 border-b border-border/60 px-2 py-1.5 last:border-0"
              >
                <span className="h-3 w-3 shrink-0 rounded-full bg-border-strong" />
                <Bar w="24%" />
                <Bar w="18%" />
                <span
                  className={`ml-auto h-2.5 w-11 rounded-full ${
                    row % 2 ? "bg-accent-soft" : "bg-border"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-1 pt-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-border-strong"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
