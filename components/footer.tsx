import { site } from "@/lib/data";

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

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
        <p>
          © {year} {site.name}
        </p>
        <p className="font-mono text-xs">
          Built with Next.js, React &amp; Tailwind
        </p>
      </div>
    </footer>
  );
}
