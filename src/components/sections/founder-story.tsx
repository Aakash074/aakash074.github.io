"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";

const STORY_BEATS = [
  {
    title: "National Institute of Technology, Warangal",
    subtitle: "B.Tech Computer Science & Engineering · 2018–2022",
    body: "The foundation was laid at NIT Warangal, one of India's premier Institutes of National Importance. But the real education happened outside the classroom — co-founding CybSec NITW and BugClaim, organizing PhantomCTF (the campus's first hacking competition), leading the Startup Cell at Innovation Garage, building for IEEE and Ronin Racing. By graduation, he'd already founded ventures, led teams, and earned a global reputation in cybersecurity.",
  },
  {
    title: "The Hacker-to-Builder Arc",
    subtitle: "Cybersecurity → Product Engineering",
    body: "Ranked #1 in India and top 5 globally on HackTheBox among 400K+ hackers. Built WeaponHEX (a CTF toolkit), Cynux Security OS, and the CybSec NITW platform. Won two EthGlobal hackathons. Filed an Australian patent for ML-based duplicate vulnerability detection. The pattern was undeniable: identify complex systems, understand them at depth, and build something that outlasts you. This instinct carried into everything that followed.",
  },
  {
    title: "International Web3 Engineer",
    subtitle: "Safle · Calmverse · The Global Stage",
    body: "First professional role: Senior Frontend Developer at QuickSell in Mumbai. Then the leap to Web3 — built a crypto wallet at Safle, working remotely with a team in Abu Dhabi. Co-founded Calmverse, a Web3 metaverse for mental health. Shipped products across borders, blockchains, and time zones. These weren't freelance gigs — they were an apprenticeship in building global products for real users.",
  },
  {
    title: "Startup Operator",
    subtitle: "CTO of CloneMyTrips → Successful Acquisition",
    body: "Took the CTO role at CloneMyTrips — an AI-powered travel platform. Designed the architecture from scratch, led engineering, managed product scaling, and worked directly with founders to execute the vision. The platform connected travel influencers with audiences through AI-curated itineraries. The outcome: built, scaled, and successfully acquired. Going from zero to acquired isn't theory — it's lived experience.",
  },
  {
    title: "AI at Scale",
    subtitle: "Head of AI at WanderOn · Strengthened AI → ₹54 Cr Series A",
    body: "Joined WanderOn to strengthen and lead their AI capabilities. The company subsequently raised ₹54 Cr Series A, validating the AI-first direction. Building systems that automate operations, power product intelligence, and reshape customer workflows. LLM applications, AI agents, RAG systems, multi-agent orchestration — all in production, not demos.",
  },
  {
    title: "Full Stack Architect",
    subtitle: "AI · Web3 · Fintech · Cybersecurity · Infrastructure",
    body: "The throughline is clear: complex systems, elegantly engineered — across every domain. AI agents and RAG pipelines on Solana. Zero-knowledge identity on Celo. BNPL infrastructure on Hedera. Crypto wallets. DeFi terminals. Token launchpads. E-voting on blockchain. Not because they're buzzwords — because each one solved a real problem. The stack changes. The mindset doesn't.",
  },
];

export function FounderStory() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeading
        label="Founder Story"
        title="From engineer to operator."
        description="The throughline: building products that matter, at every scale."
      />

      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border/50 hidden sm:block" />

          <div className="space-y-12">
            {STORY_BEATS.map((beat, i) => (
              <FadeIn key={beat.title} delay={i * 0.1} className="sm:pl-10 relative">
                <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-foreground/20 border-2 border-background hidden sm:block" />
                <h3 className="text-xl font-semibold tracking-tight">{beat.title}</h3>
                <p className="mt-0.5 text-sm font-medium text-muted-foreground">{beat.subtitle}</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{beat.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
