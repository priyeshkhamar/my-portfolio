import { Shell } from "@/components/shell";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { CaseStudy } from "@/components/sections/case-study";
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
      <CaseStudy />
      <Skills />
      <Philosophy />
      <Contact />
      <Footer />
    </Shell>
  );
}
