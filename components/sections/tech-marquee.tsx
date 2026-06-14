import { Marquee } from "@/components/ui/marquee";

const TECH = [
  "React.js",
  "Redux",
  "Node.js",
  "Express.js",
  "REST APIs",
  "Laravel",
  "iOS",
  "MongoDB",
  "MySQL",
  "API Contracts",
  "JavaScript",
  "Git",
];

/** Scroll-velocity marquee of the working stack, between sections. */
export function TechMarquee() {
  return (
    <section aria-label="Technology stack" className="py-10">
      <Marquee items={TECH} />
    </section>
  );
}
