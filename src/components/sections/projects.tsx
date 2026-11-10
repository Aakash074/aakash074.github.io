import { ArrowUpRight, Plus } from "lucide-react";
import { Chip, Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  kind: string;
  body: string;
  tech: string[];
  href: string;
  note?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Wedding Album AI Shortlister",
    kind: "AI pipeline",
    body: "Picks the best photos out of thousands. CLIP embeddings find what is in each shot, an aesthetic score ranks quality, clustering drops near duplicates, and an LLM makes the final pick.",
    tech: ["Python", "CLIP", "Clustering", "LLMs"],
    href: "https://github.com/aakash074/Wedding-photos-shortlister",
    note: "Launched on Product Hunt, Mar 2026",
  },
  {
    title: "OKX DeFi AI Copilot",
    kind: "AI agent",
    body: "Type a trading idea in plain English and it builds the trade and runs it in one click on Solana, through the OKX DEX API.",
    tech: ["React 19", "TypeScript", "Solana", "Perplexity API"],
    href: "https://github.com/aakash074/okxcopilot",
  },
];

const EARLIER = [
  {
    title: "SafeLease",
    detail: "Property leasing where tenants prove who they are without sharing personal data. ZK identity on Celo.",
    href: "https://github.com/aakash074/safelease",
  },
  {
    title: "Cynux Security OS",
    detail: "An Arch Linux based distro for security testing, with its own installer and tool packages.",
    href: "https://github.com/cynuxsecurity",
  },
  { title: "WeaponHEX", detail: "An all-in-one toolkit for jeopardy-style CTF contests." },
  { title: "Grievance portal, NIT Warangal", detail: "Django complaint tracker that sends each complaint to the right department with ML." },
  { title: "e-Voting on blockchain", detail: "A voting system where each voter can check their own vote was counted." },
];

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      label="Side projects"
      title="Things I built on my own time."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
        {PROJECTS.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            style={{ "--d": i } as React.CSSProperties}
            className={cn(
              "lift group flex flex-col rounded-[1.5rem] border border-border-strong bg-surface p-6 sm:p-8",
              i === 0 ? "lg:col-span-7" : "lg:col-span-5"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="label text-accent">{p.kind}</p>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-strong transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="nudge h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <h3 className="mt-6 font-serif text-3xl leading-tight tracking-[-0.015em] text-foreground">{p.title}</h3>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{p.body}</p>
            {p.note && <p className="mt-4 text-[15px] font-medium text-green">{p.note}</p>}
            <div className="mt-auto pt-8">
              <ul aria-label="Tools used" className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </ul>
              <p className="mt-5 text-sm text-subtle">
                Source on GitHub<span className="sr-only"> (opens in a new tab)</span>
              </p>
            </div>
          </a>
        ))}
      </div>

      <details className="mt-10 border-y border-border" data-reveal>
        <summary className="flex min-h-16 items-center justify-between gap-4 text-[17px] text-foreground transition-colors hover:text-accent">
          Earlier projects: Web3 and security
          <Plus className="chevron h-5 w-5 shrink-0 text-subtle" aria-hidden="true" />
        </summary>
        <ul className="grid gap-x-10 gap-y-5 pb-8 sm:grid-cols-2">
          {EARLIER.map((e) => (
            <li key={e.title}>
              <p className="text-[15px] font-medium text-foreground">
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="link-static inline-flex min-h-11 items-center">
                    {e.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  e.title
                )}
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{e.detail}</p>
            </li>
          ))}
        </ul>
      </details>
    </Section>
  );
}
