"use client";

import {
  ExternalLink,
  GitFork,
  Shield,
  Bot,
  ImageIcon,
  Vote,
  Swords,
  FileText,
  Monitor,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  story: string;
  tech: string[];
  icon: React.ElementType;
  github?: string;
  live?: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    title: "OKX DeFi AI Copilot",
    description:
      "AI-powered DeFi portfolio manager on Solana. Natural language trading strategies with one-click execution via OKX DEX.",
    story:
      "Built an AI agent that bridges natural language to on-chain execution. Users request strategies in plain English, the AI returns structured trade cards, and swaps execute in one click. Combines Perplexity API reasoning with Solana mainnet transactions.",
    tech: ["React 19", "TypeScript", "Solana", "OKX DEX API", "Perplexity AI", "Tailwind CSS"],
    icon: Bot,
    github: "https://github.com/aakash074/okxcopilot",
    category: "AI × DeFi",
  },
  {
    title: "SafeLease — ZK Property Leasing",
    description:
      "Decentralized property leasing with zero-knowledge identity verification. Privacy-preserving rental management on Celo.",
    story:
      "Integrated Self Protocol's ZK identity system with four Solidity smart contracts for rental management, deposit escrow, and identity verification. Supports passport, Aadhaar, and ID card verification without exposing personal data. Includes AI-powered damage assessment and roommate matching.",
    tech: ["Solidity", "React", "TypeScript", "Celo", "Zero-Knowledge Proofs", "Hardhat"],
    icon: Shield,
    github: "https://github.com/aakash074/safelease",
    category: "Web3 × AI",
  },
  {
    title: "Wedding Album AI Shortlister",
    description:
      "AI pipeline that curates top photos from thousands using CLIP embeddings, aesthetic scoring, and LLM reasoning.",
    story:
      "Designed a multi-stage AI pipeline: CLIP embeddings for semantic understanding, aesthetic scoring for visual quality, duplicate removal via clustering, and LLM-based final curation. Reduces wedding photo selection from days to minutes. Launched on Product Hunt (Mar 2026).",
    tech: ["Python", "CLIP", "LLMs", "Computer Vision", "Clustering", "AI Pipeline"],
    icon: ImageIcon,
    github: "https://github.com/aakash074/Wedding-photos-shortlister",
    category: "AI / ML",
  },
  {
    title: "e-Voting System on Blockchain",
    description:
      "Decentralized electronic voting system using blockchain for transparent, verifiable, and tamper-proof elections.",
    story:
      "Designed and built an e-voting system leveraging blockchain's decentralization, irreversibility, and asymmetric encryption. Ensured transparency and verifiability — only eligible voters can vote, all votes are correctly counted, and voters can independently verify their vote.",
    tech: ["Blockchain", "Solidity", "Ethereum", "Cryptography", "React", "Node.js"],
    icon: Vote,
    category: "Blockchain",
  },
  {
    title: "WeaponHEX — CTF Toolkit",
    description:
      "All-in-one Capture The Flag tool for jeopardy-style cybersecurity competitions. Built for the global CTF community.",
    story:
      "Created a comprehensive CTF toolkit that consolidates essential competition tools into a single interface. Designed for the CybSec NITW community and used in competitions worldwide. Represents the intersection of deep cybersecurity expertise and product thinking.",
    tech: ["Python", "Shell", "Cryptography", "Reverse Engineering", "Web Exploitation"],
    icon: Swords,
    category: "Cybersecurity",
  },
  {
    title: "Grievances Management Portal",
    description:
      "Complaint tracking system with intelligent department classification built on Django for NIT Warangal's administration.",
    story:
      "Built a full grievance portal with photo/document evidence support, ML-based department classification, role-based views for administrators and departments, and real-time status tracking. Deployed and used across NIT Warangal's administrative departments.",
    tech: ["Django", "Python", "PostgreSQL", "Machine Learning", "Classification"],
    icon: FileText,
    category: "Full Stack",
  },
  {
    title: "Cynux Security OS",
    description:
      "Arch Linux-based penetration testing distribution for pentesters, security researchers, and developers. Complete operating system with custom tooling.",
    story:
      "Built and maintained a full Arch-based security distribution with custom ISO builds, CLI installer, Calamares GUI installer configs, XFCE desktop customization, Fish shell defaults, package keyring, and curated pentesting tool packages. 12 repositories covering every layer of a Linux distro.",
    tech: ["Arch Linux", "Shell", "XFCE", "Calamares", "Fish Shell", "Package Management"],
    icon: Monitor,
    github: "https://github.com/cynuxsecurity",
    live: "https://cynuxsecurity.org",
    category: "Cybersecurity",
  },
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeading
        label="Personal Projects"
        title="Built from scratch."
        description="Selected work across AI, Web3, cybersecurity, and full-stack engineering. Each project demonstrates product thinking, technical depth, and real-world impact."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Card key={project.title} delay={i * 0.08} className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5">
                <project.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <Badge variant="outline">{project.category}</Badge>
            </div>

            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <p className="mt-3 border-l-2 border-border/50 pl-3 text-sm italic leading-relaxed text-muted-foreground/70">
              {project.story}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GitFork className="h-3.5 w-3.5" />
                  Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Demo
                </a>
              )}
              {!project.live && !project.github && (
                <span className="text-xs text-muted-foreground/50">Private</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
