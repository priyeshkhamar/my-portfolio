import { Shell } from "@/components/shell";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Philosophy } from "@/components/sections/philosophy";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <Shell>
      <Hero />
      <About />
      <Experience />
      <TechMarquee />
      <Projects />
      <Skills />
      <Philosophy />
      <Contact />
      <Footer />
    </Shell>
  );
}
