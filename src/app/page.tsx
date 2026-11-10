import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Clients } from "@/components/sections/clients";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Experience />
      <Projects />
      <Clients />
      <Skills />
      <Contact />
    </>
  );
}
