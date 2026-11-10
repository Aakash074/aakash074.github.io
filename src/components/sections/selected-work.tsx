import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/site";
import { Chip, Section, buttonStyles, delay } from "@/components/ui/section";

/* ---------- Shared case-study chrome ---------- */

function CaseHeader({
  id,
  n,
  company,
  role,
  dates,
  title,
  badge,
}: {
  id: string;
  n: string;
  company: string;
  role: string;
  dates: string;
  title: string;
  badge: string;
}) {
  return (
    <header className="grid gap-6 lg:grid-cols-12 lg:gap-10" data-reveal>
      <p aria-hidden="true" className="font-serif text-6xl leading-none text-accent italic lg:col-span-2 lg:text-7xl">
        {n}
      </p>
      <div className="lg:col-span-10">
        <p className="text-[15px] text-muted">
          <span className="font-medium text-foreground">{company}</span>
          <span aria-hidden="true" className="px-2 text-border-strong">/</span>
          <span className="whitespace-nowrap">{role}</span>
          <span aria-hidden="true" className="px-2 text-border-strong">/</span>
          <span className="whitespace-nowrap">{dates}</span>
        </p>
        <h3 id={id} className="mt-3 max-w-3xl font-serif text-3xl leading-[1.12] tracking-[-0.015em] text-balance sm:text-[2.6rem]">
          {title}
        </h3>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-sm font-medium text-green">
          <Check className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2.5} />
          {badge}
        </p>
      </div>
    </header>
  );
}

function Stack({ tools }: { tools: string[] }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3" data-reveal>
      <p className="label text-subtle">Built with</p>
      <ul aria-label="Tools used" className="flex flex-wrap gap-2">
        {tools.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </ul>
    </div>
  );
}

function FigureFrame({
  number,
  title,
  caption,
  className,
  children,
}: {
  number: number;
  title: string;
  caption: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={cn("rounded-[1.5rem] border border-border-strong bg-surface", className)} data-reveal>
      <p className="label border-b border-border px-5 py-3.5 text-subtle sm:px-6">
        Fig. {number} <span className="text-border-strong">/</span> {title}
      </p>
      <div className="p-5 sm:p-6">{children}</div>
      <figcaption className="border-t border-border px-5 py-3.5 text-sm leading-relaxed text-muted sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ---------- Fig. 1: the Photon search pipeline ---------- */

type Kind = "input" | "model" | "data" | "output";

const KIND: Record<Kind, { label: string; text: string; dot: string }> = {
  input: { label: "Input", text: "text-subtle", dot: "bg-subtle" },
  model: { label: "Model", text: "text-accent", dot: "bg-accent" },
  data: { label: "Data", text: "text-blue", dot: "bg-blue" },
  output: { label: "Output", text: "text-green", dot: "bg-green" },
};

const PIPELINE: { title: string; detail: string; kind: Kind }[] = [
  { title: "Idea", detail: "Written by the inventor in plain words", kind: "input" },
  { title: "MiniLM", detail: "Turns the idea into numbers a computer can compare", kind: "model" },
  { title: "Vector search", detail: "Finds similar patents among 26M", kind: "data" },
  { title: "Cohere Rerank", detail: "Puts the closest matches first", kind: "model" },
  { title: "Result", detail: "Patentability score and the closest patents", kind: "output" },
];

function Pipeline() {
  return (
    <div data-steps style={{ "--n": PIPELINE.length } as React.CSSProperties}>
      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {PIPELINE.map((s, i) => {
          const k = KIND[s.kind];
          return (
            <li key={s.title} className="flex flex-col lg:flex-1 lg:flex-row">
              <div
                className="step relative flex-1 rounded-2xl border border-border bg-background/60 p-4 lg:p-4"
                style={{ "--i": i } as React.CSSProperties}
              >
                <p className={cn("label flex items-center gap-2", k.text)}>
                  <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", k.dot)} />
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sr-only">,</span> {k.label}
                </p>
                <p className="mt-3 font-serif text-xl leading-tight text-foreground">{s.title}</p>
                <p className="mt-1.5 text-sm leading-snug text-muted">{s.detail}</p>
              </div>
              {i < PIPELINE.length - 1 && (
                <span
                  aria-hidden="true"
                  className="connector-v mx-auto h-6 w-px lg:hidden"
                  style={{ "--i": i } as React.CSSProperties}
                />
              )}
              {i < PIPELINE.length - 1 && (
                <span
                  aria-hidden="true"
                  className="connector hidden w-5 shrink-0 self-center lg:block"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="block h-px" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {/* A query travelling through the pipeline, once, after the steps draw in */}
      <div aria-hidden="true" className="relative mx-2 mt-5 hidden h-px bg-border lg:block">
        <span className="pulse absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_6px_var(--accent-soft)]" />
      </div>
    </div>
  );
}

/* ---------- The eval result as a small chart ---------- */

function RecallChart() {
  return (
    <div data-steps className="space-y-4" role="img" aria-label="Chart: true recall was 2.4 to 3 times the first reported number.">
      <div className="step" style={{ "--i": 0 } as React.CSSProperties}>
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-muted">First reported</span>
          <span className="num text-muted">1x</span>
        </div>
        <div className="mt-2 h-3 rounded-full bg-surface-2">
          <div className="bar h-3 w-[30%] rounded-full bg-border-strong" style={{ "--i": 0 } as React.CSSProperties} />
        </div>
      </div>
      <div className="step" style={{ "--i": 1 } as React.CSSProperties}>
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium text-foreground">Measured by invention</span>
          <span className="num font-medium text-accent">2.4 to 3x</span>
        </div>
        <div className="relative mt-2 h-3 rounded-full bg-surface-2">
          <div className="bar h-3 w-[72%] rounded-full bg-accent" style={{ "--i": 1 } as React.CSSProperties} />
          {/* The 2.4x to 3x range, shown as a lighter band after the solid bar */}
          <div
            className="bar absolute top-0 left-[72%] h-3 w-[18%] rounded-r-full bg-accent/35"
            style={{ "--i": 2 } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- WanderOn: an illustrated chat that becomes a CRM lead ---------- */

const CHAT: { from: "user" | "agent"; text: string }[] = [
  { from: "user", text: "Hi! Planning Ladakh in June for 4 of us." },
  { from: "agent", text: "Lovely. Which dates, and will you start from Delhi?" },
  { from: "user", text: "15 to 22 June, from Delhi. Around 30k each." },
  { from: "agent", text: "Got it. A trip expert will call you today with options." },
];

const LEAD = [
  ["Trip", "Ladakh, 7 nights"],
  ["Dates", "15 to 22 June"],
  ["Group", "4 people, from Delhi"],
  ["Budget", "About 30k each"],
];

function ChatToLead() {
  return (
    <div data-chat className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1fr)] md:items-center md:gap-5">
      <div className="rounded-2xl border border-border bg-background/60 p-4 sm:p-5">
        <p className="label flex items-center gap-2 text-subtle">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green" />
          WhatsApp
        </p>
        <ol className="mt-4 flex flex-col gap-2.5">
          {CHAT.map((m, i) => (
            <li
              key={i}
              className={cn(
                "bubble max-w-[80%] rounded-2xl px-3.5 py-2 text-[15px] leading-snug",
                m.from === "user"
                  ? "self-start rounded-bl-md bg-surface-2 text-foreground"
                  : "self-end rounded-br-md bg-foreground text-background"
              )}
              style={{ "--i": i, "--origin": m.from === "user" ? "left bottom" : "right bottom" } as React.CSSProperties}
            >
              <span className="sr-only">{m.from === "user" ? "Customer: " : "Agent: "}</span>
              {m.text}
            </li>
          ))}
        </ol>
      </div>

      <p
        aria-hidden="true"
        className="bubble label flex items-center justify-center gap-2 text-accent md:flex-col"
        style={{ "--i": 3.6, "--origin": "center" } as React.CSSProperties}
      >
        <span className="h-6 w-px bg-accent/50 md:h-px md:w-10" />
        AI qualifies
        <span className="h-6 w-px bg-accent/50 md:h-px md:w-10" />
      </p>

      <div className="bubble rounded-2xl border border-border-strong bg-background p-4 shadow-[var(--shadow)] sm:p-5" style={{ "--i": 4.2, "--origin": "left center" } as React.CSSProperties}>
        <div className="flex items-center justify-between gap-3">
          <p className="label text-subtle">CRM, new lead</p>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-0.5 text-xs font-medium text-green">
            <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
            Qualified
          </p>
        </div>
        <dl className="mt-3 divide-y divide-border text-sm">
          {LEAD.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2">
              <dt className="text-subtle">{k}</dt>
              <dd className="text-right text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-sm text-muted">Sent to sales, ready to call.</p>
      </div>
    </div>
  );
}

/* ---------- CloneMyTrips: a short timeline ---------- */

const MILESTONES = [
  { when: "Mar 2024", what: "Joined as CTO. Designed the platform from scratch.", dot: "bg-subtle" },
  { when: "2024", what: "Dora, the app's AI trip planner, goes live on LLMs with real users.", dot: "bg-accent" },
  { when: "Sep 2025", what: "CloneMyTrips is acquired.", dot: "bg-green" },
];

function Timeline() {
  return (
    <ol data-timeline className="relative space-y-7 pl-8">
      <span aria-hidden="true" className="timeline-line absolute top-2 bottom-2 left-[5px] w-px bg-border-strong" />
      {MILESTONES.map((m, i) => (
        <li key={m.when} className="timeline-item relative" style={{ "--i": i } as React.CSSProperties}>
          <span
            aria-hidden="true"
            className={cn("absolute top-1.5 -left-8 h-[11px] w-[11px] rounded-full ring-4 ring-surface", m.dot)}
          />
          <p className="label text-subtle">{m.when}</p>
          <p className="mt-1 font-serif text-xl leading-snug text-foreground">{m.what}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Section ---------- */

export function SelectedWork() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title={
        <>
          AI I built that <em className="text-accent">real people</em> use.
        </>
      }
      intro="Search that has to find the right answer among millions of documents, an agent that talks to customers, and a startup I ran as CTO until it was acquired."
    >
      <div className="space-y-28 sm:space-y-36">
        {/* 01. Photon Legal */}
        <article aria-labelledby="case-photon">
          <CaseHeader
            id="case-photon"
            n="01"
            company="Photon Legal, via Shifu Ventures"
            role="AI Consultant"
            dates="Aug 2026 to present"
            title="AI search that tells inventors if their idea is already patented"
            badge="In production"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-3" data-reveal>
              <p>
                Inventors want to know if an idea is new before they pay to file a patent. I designed and built the AI
                behind Photon Legal&apos;s Product Pulse, which answers that question.
              </p>
              <p>
                It reads the idea, searches about 26 million patents from Google Patents, puts the closest matches
                first and scores how likely the idea is to be patentable. Client companies use it to decide which
                inventions are worth filing.
              </p>
            </div>
          </div>

          <FigureFrame
            className="mt-12"
            number={1}
            title="How one search works"
            caption="A fast, wide search finds candidates, then a slower, sharper model ranks only the best ones, so results stay quick and accurate."
          >
            <Pipeline />
          </FigureFrame>

          <div className="mt-6 grid gap-6 rounded-[1.5rem] bg-block p-6 text-block-fg sm:p-10 lg:grid-cols-12 lg:gap-10" data-reveal>
            <div className="lg:col-span-5">
              <p className="label opacity-70">How I know it works</p>
              <p className="mt-4 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl">
                2.4 to 3x
              </p>
              <p className="mt-3 max-w-xs font-serif text-xl leading-snug italic opacity-90">
                more real matches than the first tests showed.
              </p>
            </div>
            <div className="space-y-4 text-[17px] leading-relaxed opacity-90 lg:col-span-7">
              <p>
                Every code change is tested against real cases: patents that examiners actually cited. If the search
                starts missing them, the change can&apos;t ship.
              </p>
              <p>
                Early tests said a 1M-patent slice beat the full 26M, which made no sense, so I checked the test
                itself. Examiners often cite a different filing of the same invention, so matching by exact patent
                number missed most real hits. I changed the test to match by invention, which showed the search was
                finding 2.4 to 3 times more than first reported, and the team kept the full search.
              </p>
            </div>
            <div className="rounded-2xl bg-background p-5 text-foreground lg:col-span-12">
              <RecallChart />
            </div>
          </div>

          <Stack tools={["MiniLM embeddings", "Vector search", "Cohere Rerank", "Evals in CI"]} />
        </article>

        {/* 02. WanderOn */}
        <article aria-labelledby="case-wanderon">
          <CaseHeader
            id="case-wanderon"
            n="02"
            company="WanderOn"
            role="Head of AI"
            dates="Oct 2025 to Jul 2026"
            title="A WhatsApp agent that turns travel enquiries into sales leads"
            badge="Live with customers"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-3" data-reveal>
              <p>
                WanderOn gets a steady stream of travel enquiries on WhatsApp, and the sales team only wants the
                serious ones. I led the build of an AI agent that chats with each customer, collects their trip
                details and creates a ready-to-call lead in the CRM, handing off to a person when needed.
              </p>
              <p>
                As Head of AI I also built internal AI tools for the operations team, and WanderOn raised an INR 54
                crore Series A while I was there.
              </p>
            </div>
          </div>

          <FigureFrame
            className="mt-12"
            number={2}
            title="From chat to lead"
            caption="An illustration of the flow, not a real customer chat."
          >
            <ChatToLead />
          </FigureFrame>

          <Stack tools={["WhatsApp", "LLMs", "Node.js", "CRM integration"]} />
        </article>

        {/* 03. CloneMyTrips */}
        <article aria-labelledby="case-cmt">
          <CaseHeader
            id="case-cmt"
            n="03"
            company="CloneMyTrips"
            role="CTO"
            dates="Mar 2024 to Sep 2025"
            title="Built the product as CTO, from first line of code to acquisition"
            badge="Company acquired"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-3" data-reveal>
              <p>
                CloneMyTrips is a travel app. I designed the platform from scratch and then ran engineering and
                product, working directly with the founders, until the company was acquired.
              </p>
              <p>
                I also built Dora, the app&apos;s AI trip planner. It has run on LLMs with real users since early
                2024, which is where my work on AI in production began.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border-strong bg-surface p-6 sm:p-8 lg:col-span-5" data-reveal>
              <Timeline />
            </div>
          </div>

          <Stack tools={["React Native", "LLM APIs", "System design", "Team leadership"]} />
        </article>
      </div>

      <div
        className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center"
        data-reveal
      >
        <p className="max-w-lg font-serif text-2xl leading-snug sm:text-3xl">
          Want the details on any of these?
        </p>
        <a
          href={LINKS.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonStyles.base, buttonStyles.primary)}
          style={delay(1)}
        >
          Book 30 minutes
          <ArrowUpRight className="nudge h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </Section>
  );
}
