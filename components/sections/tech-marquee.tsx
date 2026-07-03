import { Marquee } from "@/components/ui/marquee";

const ROW_A = [
  "React.js",
  "Redux",
  "Node.js",
  "Express.js",
  "REST APIs",
  "MongoDB",
];

const ROW_B = [
  "MySQL",
  "Laravel",
  "iOS",
  "API Contracts",
  "JavaScript",
  "Git",
];

/** Dual scroll-velocity marquee of the working stack, between sections. */
export function TechMarquee() {
  return (
    <section
      aria-label="Technology stack"
      className="border-y border-border py-8"
    >
      <Marquee items={ROW_A} outline direction={1} />
      <Marquee items={ROW_B} direction={-1} />
    </section>
  );
}
