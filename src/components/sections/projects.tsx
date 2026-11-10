import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Chip, Section } from "@/components/ui/section";
import { GitHubIcon } from "@/components/ui/brand-icons";

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
    body: "Turns a plain-English trading idea into a structured trade card, then a one-click swap on Solana through the OKX DEX API.",
    tech: ["React 19", "TypeScript", "Solana", "Perplexity API"],
    href: "https://github.com/aakash074/okxcopilot",
  },
  {
    title: "SafeLease",
    kind: "Zero-knowledge identity",
    body: "Property leasing where tenants prove who they are without sharing personal data. Uses Self Protocol ZK identity and four Solidity contracts on Celo.",
    tech: ["Solidity", "Celo", "ZK proofs", "React"],
    href: "https://github.com/aakash074/safelease",
  },
];

const EARLIER = [
  {
    title: "Cynux Security OS",
    detail: "An Arch Linux-based distro for security testing, with its own installer and tool packages.",
    href: "https://cynuxsecurity.org",
  },
  { title: "WeaponHEX", detail: "An all-in-one toolkit for jeopardy-style CTF contests." },
  { title: "Grievance portal, NIT Warangal", detail: "Django complaint tracker that sorts each complaint to the right department with ML." },
  { title: "e-Voting on blockchain", detail: "A voting system where each voter can check their own vote was counted." },
];

export function Projects() {
  return (
    <Section id="projects" label="Projects" title="Things I built on my own time.">
      <div className="grid gap-4 md:grid-cols-3">
        {PROJECTS.map((p) => (
          <article key={p.title} className="flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">{p.kind}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            {p.note && <p className="mt-3 text-sm font-medium text-foreground">{p.note}</p>}
            <ul aria-label="Tools used" className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </ul>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-md pt-4 text-sm font-medium text-foreground hover:text-accent"
            >
              <GitHubIcon />
              Source code
              <span className="sr-only">for {p.title} (opens in a new tab)</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>

      <details className="mt-6 rounded-xl border border-border bg-surface">
        <summary className="flex min-h-12 items-center justify-between gap-4 rounded-xl px-5 text-sm font-medium text-foreground hover:bg-surface-2">
          Earlier security and systems projects
          <ChevronDown className="chevron h-4 w-4 text-muted transition-transform" aria-hidden="true" />
        </summary>
        <ul className="grid gap-x-8 gap-y-4 border-t border-border px-5 py-5 sm:grid-cols-2">
          {EARLIER.map((e) => (
            <li key={e.title}>
              <p className="flex min-h-6 items-center text-sm font-semibold text-foreground">
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline decoration-border-strong underline-offset-4 hover:text-accent">
                    {e.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  e.title
                )}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{e.detail}</p>
            </li>
          ))}
        </ul>
      </details>
    </Section>
  );
}
