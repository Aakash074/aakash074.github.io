import { Plus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface Role {
  company: string;
  role: string;
  dates: string;
  place: string;
  summary: string;
  tag?: string;
}

const ROLES: Role[] = [
  {
    company: "Shifu Ventures",
    role: "AI Consultant",
    dates: "Aug 2026 to present",
    place: "Product studio and VC, India",
    summary:
      "I build AI features for startups in the Shifu portfolio and take them to production. The main one is Photon Legal's patent search.",
    tag: "Current",
  },
  {
    company: "WanderOn",
    role: "Head of AI",
    dates: "Oct 2025 to Jul 2026",
    place: "Gurugram, India",
    summary:
      "Led AI across the company, from internal tools for the operations team to the WhatsApp sales agent that customers talk to.",
  },
  {
    company: "CloneMyTrips",
    role: "CTO",
    dates: "Mar 2024 to Sep 2025",
    place: "Bengaluru, India (hybrid)",
    summary:
      "Built the platform from scratch, ran engineering and product, and launched Dora, the AI trip planner.",
    tag: "Acquired",
  },
  {
    company: "Safle",
    role: "Senior Frontend Developer, Web3",
    dates: "Feb 2023 to Mar 2024",
    place: "Abu Dhabi, UAE (remote)",
    summary: "Built a crypto wallet that works without an internet connection.",
  },
  {
    company: "Calmverse",
    role: "Co-founder",
    dates: "Aug 2022 to Feb 2023",
    place: "Remote",
    summary: "Co-founded a mental health startup and owned the product and its architecture.",
  },
  {
    company: "QuickSell",
    role: "Senior Frontend Developer",
    dates: "Jun 2022 to Nov 2022",
    place: "Mumbai, India",
    summary: "Promoted from junior to senior while building the web apps for a conversational commerce platform.",
  },
];

const CLIENTS = [
  { name: "Frontline", what: "Buy now, pay later gateway with tokenized credit lines." },
  { name: "PayoutRails", what: "Stablecoin batch payroll for global freelancers." },
  { name: "Nihaan Energy", what: "EV charging app and a web platform to manage chargers." },
  { name: "HashFast", what: "Payment links that take many tokens and confirm in real time." },
  { name: "NanoBond", what: "A launchpad for token bonds." },
  { name: "Strawbee", what: "Browser extension that pays crypto cashback at checkout." },
  { name: "LetsPay", what: "Bill splitting for groups, with instant settlement." },
];

const EARLY = [
  { title: "Lead Developer, Megham Cloud", detail: "NIT Warangal's in-house cloud platform, built at the campus incubator. Aug 2020 to Apr 2022." },
  { title: "Co-founder, BugClaim", detail: "Crowdsourced security SaaS. 2021 to 2022." },
  { title: "Co-founder, CybSec NITW", detail: "The campus security club. Ran PhantomCTF, the first CTF at NIT Warangal." },
  { title: "Chapter Lead, OWASP Warangal", detail: "Student chapter, 2021." },
];

function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-border">
      <summary className="flex min-h-16 items-center justify-between gap-4 text-[17px] text-foreground transition-colors hover:text-accent">
        {title}
        <Plus className="chevron h-5 w-5 shrink-0 text-subtle" aria-hidden="true" />
      </summary>
      <div className="pb-8">{children}</div>
    </details>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title="4+ years shipping products. Since 2024, leading AI and engineering."
    >
      <ol data-timeline className="relative border-t border-border pl-7 sm:pl-9">
        <span
          aria-hidden="true"
          className="timeline-line absolute top-0 bottom-0 left-[5px] w-px bg-border-strong"
        />
        {ROLES.map((r, i) => (
          <li
            key={r.company}
            data-reveal
            style={{ "--d": Math.min(i, 3) } as React.CSSProperties}
            className="group relative grid gap-2 border-b border-border py-7 transition-colors sm:grid-cols-12 sm:gap-6 sm:py-8"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-[2.2rem] -left-7 h-[11px] w-[11px] rounded-full border-2 transition-colors duration-300 sm:top-[2.45rem] sm:-left-9",
                i === 0
                  ? "border-accent bg-accent shadow-[0_0_0_4px_var(--accent-soft)]"
                  : "border-border-strong bg-background group-hover:border-accent group-hover:bg-accent"
              )}
            />
            <p className="label num pt-1.5 text-subtle sm:col-span-3">{r.dates}</p>
            <div className="transition-transform duration-500 ease-out group-hover:translate-x-1 sm:col-span-9 lg:col-span-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.01em] text-foreground">
                  {r.role}, <span className="transition-colors group-hover:text-accent">{r.company}</span>
                </h3>
                {r.tag && (
                  <p
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      r.tag === "Current" ? "bg-green/10 text-green" : "bg-accent-soft text-accent"
                    )}
                  >
                    {r.tag}
                  </p>
                )}
              </div>
              <p className="mt-1 text-sm text-subtle">{r.place}</p>
              <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">{r.summary}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-x-6 sm:grid-cols-12" data-reveal>
        <p className="label pt-1.5 text-subtle sm:col-span-3">Education</p>
        <p className="mt-2 text-[17px] text-foreground sm:col-span-9 sm:mt-0">
          B.Tech, Computer Science and Engineering, NIT Warangal{" "}
          <span className="text-muted">(2018 to 2022)</span>
        </p>
      </div>

      <div className="mt-12 sm:grid sm:grid-cols-12 sm:gap-6" data-reveal>
        <div className="border-t border-border sm:col-span-9 sm:col-start-4">
        <Disclosure title="Client work for startups: payments, fintech and EV charging">
          <p className="mb-5 max-w-2xl text-muted">
            Mostly payments and fintech, where a mistake costs someone money, plus an EV charging platform.
          </p>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {CLIENTS.map((c) => (
              <li key={c.name} className="text-[15px] leading-relaxed">
                <span className="font-medium text-foreground">{c.name}.</span>{" "}
                <span className="text-muted">{c.what}</span>
              </li>
            ))}
          </ul>
        </Disclosure>
        <Disclosure title="Before 2022: college startups, cloud and security work">
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {EARLY.map((e) => (
              <li key={e.title}>
                <p className="text-[15px] font-medium text-foreground">{e.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{e.detail}</p>
              </li>
            ))}
          </ul>
        </Disclosure>
        </div>
      </div>
    </Section>
  );
}
