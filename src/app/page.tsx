import { Hero } from "@/components/sections/hero";
import { FounderStory } from "@/components/sections/founder-story";
import { Achievements } from "@/components/sections/achievements";
import { Ventures } from "@/components/sections/ventures";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { GitHubIntelligence } from "@/components/sections/github-intelligence";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FounderStory />
      <Achievements />
      <Ventures />
      <Experience />
      <FeaturedProjects />
      <Skills />
      <GitHubIntelligence />
      <CTASection />
    </>
  );
}
