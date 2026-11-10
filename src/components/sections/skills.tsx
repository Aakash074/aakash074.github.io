import { Section } from "@/components/ui/section";

const SKILLS = [
  {
    group: "AI",
    items:
      "LLM apps, RAG, semantic search, embeddings (MiniLM, CLIP), reranking (Cohere), AI agents, multi-agent systems, LangGraph, evals, OpenAI and Claude APIs, MCP",
  },
  { group: "Languages", items: "Python, TypeScript, JavaScript, SQL, Solidity, Bash" },
  { group: "Backend and data", items: "Node.js, Express, Django, REST, GraphQL, PostgreSQL, MongoDB, Redis" },
  { group: "Frontend", items: "React, Next.js, React Native, Tailwind CSS" },
  { group: "Cloud", items: "AWS, Docker, CI/CD, Vercel, Netlify, Linux" },
  { group: "Web3 and security", items: "Solana, Ethereum, Hedera, Celo, wallets, smart contracts, pentesting, OWASP Top 10" },
];

const RECOGNITION = [
  { title: "Top 5 globally on HackTheBox", detail: "Omniscient rank, among 400,000+ hackers." },
  { title: "2x ETHGlobal winner", detail: "ETHGlobal Singapore and Bangkok." },
  { title: "Australian patent AU 2021105619", detail: "An ML method to find duplicate security vulnerabilities." },
  { title: "Bug bounties", detail: "INR 2 lakh+ for vulnerabilities reported to Dell, Samsung and others." },
];

export function Skills() {
  return (
    <Section id="skills" label="Skills and recognition" title="What I work with.">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
        <dl className="divide-y divide-border border-y border-border">
          {SKILLS.map((s) => (
            <div key={s.group} className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
              <dt className="text-sm font-semibold text-foreground">{s.group}</dt>
              <dd className="text-sm leading-relaxed text-muted">{s.items}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-subtle">Recognition</h3>
          <ul className="mt-4 space-y-4">
            {RECOGNITION.map((r) => (
              <li key={r.title} className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{r.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
