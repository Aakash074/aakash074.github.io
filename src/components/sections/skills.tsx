import { Section } from "@/components/ui/section";

const SKILLS = [
  {
    group: "AI",
    items:
      "LLM apps, RAG, semantic search, embeddings (MiniLM, CLIP), reranking (Cohere), AI agents, multi-agent systems, evals, OpenAI and Claude APIs, AWS Bedrock, MCP",
  },
  { group: "Languages", items: "Python, TypeScript, JavaScript, SQL, Solidity, Bash" },
  { group: "Backend and data", items: "Node.js, Express, Django, REST, GraphQL, PostgreSQL, MongoDB, Redis" },
  { group: "Frontend", items: "React, Next.js, React Native, Tailwind CSS" },
  { group: "Cloud", items: "AWS, Docker, CI/CD, Vercel, Netlify, Linux" },
  { group: "Web3 and security", items: "Solana, Ethereum, Hedera, Celo, wallets, smart contracts, pentesting, OWASP Top 10" },
];

const RECOGNITION = [
  { big: "HTB", title: "Omniscient rank", detail: "HackTheBox, among 400,000+ hackers." },
  { big: "2x", title: "ETHGlobal winner", detail: "ETHGlobal Singapore and Bangkok." },
  { big: "AU", title: "patent 2021105619", detail: "An ML method to find duplicate security vulnerabilities." },
  { big: "Paid", title: "bug bounties", detail: "From Dell, Samsung and others." },
];

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Skills and recognition"
      title={
        <>
          What I work with, <em className="text-accent">and a few wins.</em>
        </>
      }
    >
      <ul data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-border-strong bg-border-strong lg:grid-cols-4">
        {RECOGNITION.map((r) => (
          <li key={r.title} className="bg-surface p-5 sm:p-7">
            <p className="font-serif text-4xl leading-none tracking-[-0.02em] text-accent sm:text-5xl">{r.big}</p>
            <p className="mt-3 font-medium text-foreground">{r.title}</p>
            <p className="mt-1 text-[15px] leading-snug text-muted">{r.detail}</p>
          </li>
        ))}
      </ul>

      <dl className="mt-14 border-t border-border">
        {SKILLS.map((s) => (
          <div key={s.group} data-reveal className="grid gap-1 border-b border-border py-5 sm:grid-cols-12 sm:gap-6">
            <dt className="label pt-1 text-subtle sm:col-span-3">{s.group}</dt>
            <dd className="text-[17px] leading-relaxed text-foreground sm:col-span-9">{s.items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
