"use client";

import Image from "next/image";
import { Cpu, Wallet, Brain, Rocket, Globe } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  logo?: string;
  tag: string;
  tagColor: string;
}

const EXPERIENCES: ExperienceEntry[] = [
  {
    company: "WanderOn",
    role: "Head of Artificial Intelligence",
    period: "Oct 2025 — Present",
    location: "Gurugram, India · On-site",
    description:
      "Joined to strengthen and lead AI capabilities across the organization. The company subsequently raised ₹54 Cr Series A, validating the AI-first direction. Building AI-first systems for operational automation, product intelligence, and scalable infrastructure across the travel tech platform.",
    highlights: [
      "AI product strategy & roadmap",
      "Operational automation systems",
      "AI-powered customer workflows",
      "Internal tooling & optimization",
      "Scalable AI infrastructure",
    ],
    icon: Cpu,
    logo: "/logos/wanderon.png",
    tag: "Current",
    tagColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    company: "CloneMyTrips",
    role: "Chief Technology Officer",
    period: "Mar 2024 — Sep 2025",
    location: "Bengaluru, India · Hybrid",
    description:
      "Led engineering and product development from concept to successful acquisition. Built the platform architecture from scratch, drove technical strategy, and managed product scaling. Worked directly with founders to execute the product vision.",
    highlights: [
      "Platform architecture from zero",
      "Full-stack product development",
      "Technical strategy & execution",
      "Product scaling & infrastructure",
      "Successfully acquired",
    ],
    icon: Rocket,
    tag: "Acquired",
    tagColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    company: "Safle",
    role: "Senior Frontend Developer",
    period: "Feb 2023 — Mar 2024",
    location: "Abu Dhabi, UAE · Remote",
    description:
      "Built core frontend systems for a Web3 crypto wallet serving a global user base. Developed wallet interfaces, transaction flows, and dApp integration layers. Worked remotely with an international team in the UAE.",
    highlights: [
      "Web3 crypto wallet development",
      "dApp integration architecture",
      "Cross-border remote collaboration",
      "Blockchain transaction interfaces",
      "Wallet security patterns",
    ],
    icon: Wallet,
    tag: "Web3",
    tagColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  {
    company: "Calmverse",
    role: "Co-Founder",
    period: "Aug 2022 — Feb 2023",
    location: "Remote",
    description:
      "Co-founded a Web3-based metaverse for mental health. Built the platform concept, product strategy, and initial technical architecture. Explored the intersection of blockchain, virtual worlds, and wellness technology.",
    highlights: [
      "Web3 metaverse for mental health",
      "Product concept & strategy",
      "Technical architecture",
      "Blockchain + wellness intersection",
    ],
    icon: Brain,
    tag: "Startup",
    tagColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    company: "QuickSell",
    role: "Senior Frontend Developer",
    period: "Jun 2022 — Nov 2022",
    location: "Mumbai, India",
    description:
      "First professional engineering role. Started as a junior developer and was quickly promoted to senior. Built and shipped React.js applications, establishing patterns for component architecture, state management, and performance optimization.",
    highlights: [
      "React.js application development",
      "Component architecture patterns",
      "Performance optimization",
      "First professional engineering role",
    ],
    icon: Globe,
    logo: "/logos/quicksell.png",
    tag: "Early Career",
    tagColor: "bg-muted text-muted-foreground border-border",
  },
];

const EARLY_EXPERIENCES = [
  {
    label: "Innovation Garage, NIT Warangal",
    detail: "Startup Cell Lead (2021-22) · Technical Team Member, Cloud Development — Megham (2020-21)",
  },
  {
    label: "BugClaim",
    detail: "Co-Founder (2021-22) — Cybersecurity startup. bugclaim.com",
  },
  {
    label: "CybSec NITW",
    detail: "Co-Founder (2019-22) — Built the cybersecurity culture at NIT Warangal. cybsec.in",
  },
  {
    label: "OWASP Warangal Student Chapter",
    detail: "Chapter Lead (2021) — Led the local OWASP community and security initiatives.",
  },
  {
    label: "CampusRadio",
    detail: "Co-Founder (2021) — Student media platform at NIT Warangal.",
  },
  {
    label: "IEEE Student Branch NITW",
    detail: "Web Developer (2020-21) — Built and maintained web platforms for IEEE NITW.",
  },
  {
    label: "Ronin Racing",
    detail: "Web Developer (2019-20) — Built the team website for FSEV Design Competition. roninracing.in",
  },
];

export function Experience() {
  return (
    <section id="experience" className="bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading
          label="Experience"
          title="Where leadership meets execution."
          description="From startup founder to AI leader — a career built on shipping products and scaling teams."
        />

        {/* Main experience cards */}
        <div className="mx-auto max-w-4xl space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <Card key={exp.company + exp.role} delay={i * 0.12} className="overflow-hidden p-0">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 overflow-hidden">
                      {exp.logo ? (
                        <Image src={exp.logo} alt={exp.company} width={32} height={32} className="object-contain" />
                      ) : (
                        <exp.icon className="h-6 w-6 text-foreground/50" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">{exp.company}</h3>
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${exp.tagColor}`}
                        >
                          {exp.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">
                        {exp.role}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/70">
                        {exp.period} · {exp.location}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <Badge key={h} variant="secondary">
                      {h}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Early experience collapsible grid */}
        <div className="mx-auto mt-12 max-w-4xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Early Career & Founding Roles
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {EARLY_EXPERIENCES.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/30 bg-card/50 p-4 transition-all hover:border-border hover:bg-card"
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
