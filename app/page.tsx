import { Shell } from "@/components/shell";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <Shell>
      <Hero />
      <TechMarquee />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </Shell>
  );
}
