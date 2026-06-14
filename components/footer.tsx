import { site } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
        <p>
          © {year} {site.name}. Built from scratch — Next.js, React & Tailwind.
        </p>
        <p className="font-mono text-xs">
          Designed &amp; engineered end-to-end.
        </p>
      </div>
    </footer>
  );
}
