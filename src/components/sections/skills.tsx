"use client";

import {
  Brain,
  Server,
  Layout,
  Cloud,
  Blocks,
  GitBranch,
  Shield,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";

interface SkillGroup {
  title: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "AI Engineering",
    icon: Brain,
    color: "from-purple-500/10 to-violet-500/5",
    skills: [
      "LLM Applications",
      "AI Agents",
      "RAG Systems",
      "Multi-Agent Systems",
      "AI Automation",
      "Prompt Engineering",
      "AI Workflow Orchestration",
      "OpenAI / Claude",
      "MCP Integrations",
      "AI Product Strategy",
    ],
  },
  {
    title: "Backend Engineering",
    icon: Server,
    color: "from-blue-500/10 to-cyan-500/5",
    skills: [
      "Node.js",
      "TypeScript",
      "Python",
      "REST & GraphQL APIs",
      "Distributed Systems",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Express.js",
      "Django",
      "System Design",
    ],
  },
  {
    title: "Frontend Engineering",
    icon: Layout,
    color: "from-orange-500/10 to-amber-500/5",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive Design",
      "Modern UI Systems",
      "TypeScript",
      "Component Architecture",
      "Design Systems",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    color: "from-emerald-500/10 to-green-500/5",
    skills: [
      "AWS",
      "Docker",
      "CI/CD Pipelines",
      "Vercel",
      "Netlify",
      "MongoDB Atlas",
      "Monitoring & Logging",
      "Security Best Practices",
    ],
  },
  {
    title: "Blockchain & Web3",
    icon: Blocks,
    color: "from-yellow-500/10 to-amber-500/5",
    skills: [
      "Solana",
      "Hedera (HTS/HCS)",
      "Smart Contracts (Solidity)",
      "Wallet Integrations",
      "DeFi Infrastructure",
      "Celo",
      "Web3 Product Development",
      "Token Economics",
      "Ethereum",
      "dApp Architecture",
    ],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    color: "from-red-500/10 to-rose-500/5",
    skills: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "CTF Competition",
      "Security Architecture",
      "OWASP Top 10",
      "Malware Analysis",
      "Cryptography",
      "Security Tooling",
      "Threat Modeling",
    ],
  },
  {
    title: "Engineering Practices",
    icon: GitBranch,
    color: "from-rose-500/10 to-pink-500/5",
    skills: [
      "Agile/Scrum",
      "Technical Architecture",
      "Code Review",
      "Testing (Unit/E2E)",
      "Performance Optimization",
      "Security Auditing",
      "Technical Writing",
      "Mentorship",
    ],
  },
];

function SkillBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-border/40 bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:border-border hover:text-foreground hover:bg-accent/50">
      {name}
    </span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading
          label="Skills & Expertise"
          title="Full stack across the stack."
          description="Technologies and domains proven through shipped products, not just familiarity."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <FadeIn
              key={group.title}
              delay={i * 0.08}
              className={`rounded-2xl border border-border/40 bg-card bg-gradient-to-br ${group.color} p-6 transition-all duration-300 hover:border-border hover:shadow-sm`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5">
                  <group.icon className="h-5 w-5 text-foreground/60" />
                </div>
                <h3 className="text-base font-semibold tracking-tight">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
