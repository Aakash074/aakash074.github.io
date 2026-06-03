"use client";

import {
  Trophy,
  Rocket,
  Globe,
  Shield,
  Building2,
  GraduationCap,
  Zap,
  Cpu,
  FileCheck,
  Users,
  Swords,
  Coins,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "2x EthGlobal Winner",
    description: "Won multiple EthGlobal hackathons, competing against top Web3 builders worldwide.",
  },
  {
    icon: Shield,
    title: "Top 5 HackTheBox Global",
    description: "Ranked #1 in India and top 5 globally among 400,000+ hackers on HackTheBox.",
  },
  {
    icon: Rocket,
    title: "CTO of Acquired Startup",
    description: "Led engineering at CloneMyTrips from concept to successful acquisition. Built platform, team, and product.",
  },
  {
    icon: Cpu,
    title: "Head of AI at WanderOn",
    description: "Joined to strengthen AI capabilities. The company then raised ₹54 Cr Series A, validating the AI-first direction.",
  },
  {
    icon: FileCheck,
    title: "Patent Holder",
    description: "Australian patent AU 2021105619: ML-based method for identifying duplicate security vulnerabilities.",
  },
  {
    icon: Building2,
    title: "Co-Founded Two Startups",
    description: "Co-founded BugClaim (cybersecurity) and Calmverse (Web3 mental health metaverse).",
  },
  {
    icon: Users,
    title: "Built CybSec NITW",
    description: "Co-founded NIT Warangal's cybersecurity club. Built a community from scratch that continues to thrive.",
  },
  {
    icon: Swords,
    title: "Organized PhantomCTF",
    description: "Conceived and executed the first-ever Capture The Flag competition at NIT Warangal.",
  },
  {
    icon: Globe,
    title: "International Experience",
    description: "Worked remotely with teams in UAE (Safle). Built products for global users across Web3 and AI.",
  },
  {
    icon: Zap,
    title: "20+ Products Shipped",
    description: "Built and deployed products across AI, fintech, Web3, travel, SaaS, cybersecurity, and consumer tech.",
  },
  {
    icon: Coins,
    title: "Web3 Native Since 2023",
    description: "Built crypto wallets, DeFi terminals, BNPL infrastructure, token launchpads, and metaverse platforms.",
  },
  {
    icon: GraduationCap,
    title: "NIT Warangal Graduate",
    description: "B.Tech in Computer Science & Engineering from an Institute of National Importance.",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeading
        label="Achievements"
        title="Impact, measured."
        description="Milestones across engineering, competition, leadership, and innovation."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((achievement, i) => (
          <FadeIn
            key={achievement.title}
            delay={i * 0.04}
            className="group rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 transition-colors group-hover:bg-foreground/10">
              <achievement.icon className="h-5 w-5 text-foreground/60" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight">{achievement.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {achievement.description}
            </p>
          </FadeIn>
        ))}
      </div>
      </div>
    </section>
  );
}
