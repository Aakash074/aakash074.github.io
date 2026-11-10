import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/site";
import { Chip, Section, buttonStyles, delay } from "@/components/ui/section";

const v = (vars: Record<string, string | number>) => vars as React.CSSProperties;

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
        <h3
          id={id}
          className="mt-3 max-w-3xl font-serif text-3xl leading-[1.12] tracking-[-0.015em] text-balance sm:text-[2.6rem]"
        >
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

/**
 * Body copy on the left, a slim sticky fact column on the right.
 * The Outcome slot is sized to also take a big number later.
 */
function CaseBody({
  children,
  role,
  outcome,
  tools,
}: {
  children: React.ReactNode;
  role: string;
  outcome: string;
  tools: string[];
}) {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-3" data-reveal>
        {children}
      </div>
      <aside className="lg:col-span-3 lg:col-start-10" data-reveal style={delay(1)}>
        <dl className="space-y-6 border-t border-border-strong pt-5 lg:sticky lg:top-24">
          <div>
            <dt className="label text-subtle">Role</dt>
            <dd className="mt-1.5 text-[15px] leading-snug text-foreground">{role}</dd>
          </div>
          <div>
            <dt className="label text-subtle">Outcome</dt>
            <dd className="mt-1.5 font-serif text-[1.35rem] leading-snug text-foreground">{outcome}</dd>
          </div>
          <div>
            <dt className="label text-subtle">Stack</dt>
            <dd className="mt-2.5">
              <ul aria-label="Tools used" className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </aside>
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

/**
 * Steps draw in, then a query hops along each connector and lights up each
 * card it reaches. Hover or focus the figure to replay (see MotionRoot).
 */
function Pipeline() {
  return (
    <div data-steps data-replay tabIndex={-1} className="outline-none" style={v({ "--n": PIPELINE.length })}>
      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {PIPELINE.map((s, i) => {
          const k = KIND[s.kind];
          return (
            <li key={s.title} className="flex flex-col lg:flex-1 lg:flex-row">
              <div
                className="step hl-card relative flex-1 rounded-2xl border border-border bg-background/60 p-4"
                style={v({ "--i": i })}
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
                <span aria-hidden="true" className="connector-v relative mx-auto h-8 w-px lg:hidden" style={v({ "--i": i })}>
                  <span className="hop hop-y" />
                </span>
              )}
              {i < PIPELINE.length - 1 && (
                <span
                  aria-hidden="true"
                  className="connector relative hidden w-8 shrink-0 self-center lg:block"
                  style={v({ "--i": i })}
                >
                  <span className="block h-px" />
                  <span className="hop hop-x" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- The eval result as a small chart ---------- */

function RecallChart() {
  return (
    <div
      data-steps
      className="space-y-4"
      role="img"
      aria-label="Chart: counted per invention, the search found 2.4 to 3 times as many real matches as counted per patent number."
    >
      <div className="step" style={v({ "--i": 0 })}>
        <div className="flex items-baseline justify-between gap-4 text-sm">
          <span className="text-muted">Counted per patent number</span>
          <span className="num text-muted">1x</span>
        </div>
        <div className="mt-2 h-3 rounded-full bg-surface-2">
          <div className="bar h-3 w-[30%] rounded-full bg-border-strong" style={v({ "--i": 0 })} />
        </div>
      </div>
      <div className="step" style={v({ "--i": 1 })}>
        <div className="flex items-baseline justify-between gap-4 text-sm">
          <span className="font-medium text-foreground">Counted per invention</span>
          <span className="num font-medium text-accent">2.4 to 3x</span>
        </div>
        <div className="relative mt-2 h-3 rounded-full bg-surface-2">
          <div className="bar h-3 w-[72%] rounded-full bg-accent" style={v({ "--i": 1 })} />
          {/* The 2.4x to 3x range, as a lighter band after the solid bar */}
          <div className="bar absolute top-0 left-[72%] h-3 w-[18%] rounded-r-full bg-accent/35" style={v({ "--i": 2 })} />
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
    <div data-chat className="grid gap-3 md:grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1fr)] md:items-center md:gap-5">
      <div className="rounded-2xl border border-border bg-background/60 p-4 sm:p-5">
        <p className="label flex items-center gap-2 text-subtle">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green" />
          WhatsApp
        </p>
        <ol className="mt-4 flex flex-col gap-2.5">
          {CHAT.map((m, i) => (
            <li
              key={i}
              className={cn("relative flex max-w-[82%]", m.from === "user" ? "self-start" : "self-end justify-end")}
              style={v({ "--i": i, "--origin": m.from === "user" ? "left bottom" : "right bottom" })}
            >
              {m.from === "agent" && (
                <span
                  aria-hidden="true"
                  className="typing absolute right-0 bottom-0 flex h-8 items-center gap-1 rounded-2xl rounded-br-md bg-foreground px-3"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-background" />
                  <span className="h-1.5 w-1.5 rounded-full bg-background" />
                  <span className="h-1.5 w-1.5 rounded-full bg-background" />
                </span>
              )}
              <p
                className={cn(
                  "bubble rounded-2xl px-3.5 py-2 text-[15px] leading-snug",
                  m.from === "user"
                    ? "rounded-bl-md bg-surface-2 text-foreground"
                    : "rounded-br-md bg-foreground text-background"
                )}
              >
                <span className="sr-only">{m.from === "user" ? "Customer: " : "Agent: "}</span>
                {m.text}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p
        aria-hidden="true"
        className="bubble label flex flex-col items-center justify-center gap-1.5 py-1 text-accent"
        style={v({ "--i": 3.7, "--origin": "center" })}
      >
        <span className="h-4 w-px bg-accent/50 md:hidden" />
        <span className="flex items-center gap-2">
          AI qualifies
          <ArrowRight className="hidden h-3.5 w-3.5 md:block" />
        </span>
        <ArrowDown className="h-4 w-4 md:hidden" />
      </p>

      <div
        className="bubble rounded-2xl border border-border-strong bg-background p-4 shadow-[var(--shadow)] sm:p-5"
        style={v({ "--i": 4.2, "--origin": "left center" })}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="label text-subtle">CRM, new lead</p>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-0.5 text-xs font-medium text-green">
            <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
            Qualified
          </p>
        </div>
        <dl className="mt-3 divide-y divide-border text-sm">
          {LEAD.map(([k, val]) => (
            <div key={k} className="flex justify-between gap-4 py-2">
              <dt className="text-subtle">{k}</dt>
              <dd className="text-right text-foreground">{val}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-sm text-muted">Sent to sales, ready to call.</p>
      </div>
    </div>
  );
}

/* ---------- CloneMyTrips: a short timeline, horizontal on wide screens ---------- */

const MILESTONES = [
  { when: "Mar 2024", what: "Designs the platform from scratch.", dot: "bg-subtle" },
  { when: "2024", what: "Dora goes live on LLMs with real users.", dot: "bg-accent" },
  { when: "Sep 2025", what: "The company is acquired.", dot: "bg-green" },
];

function Timeline() {
  return (
    <ol data-timeline className="relative grid gap-7 pl-8 lg:grid-cols-3 lg:gap-8 lg:pt-8 lg:pl-0">
      <span aria-hidden="true" className="timeline-line absolute top-2 bottom-2 left-[5px] w-px bg-border-strong lg:hidden" />
      <span
        aria-hidden="true"
        className="timeline-line-x absolute top-[5px] right-0 left-0 hidden h-px bg-border-strong lg:block"
      />
      {MILESTONES.map((m, i) => (
        <li key={m.when} className="timeline-item relative" style={v({ "--i": i })}>
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 -left-8 h-[11px] w-[11px] rounded-full ring-4 ring-surface lg:-top-8 lg:left-0",
              m.dot
            )}
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
      intro="Search that has to find the right answer among millions of documents, an agent that talks to customers, and a startup where I was CTO until it was acquired."
    >
      <div className="space-y-28 sm:space-y-32">
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
          <CaseBody
            role="Designed and built the core AI: search, ranking, scoring and the tests."
            outcome="Client companies use it to decide which inventions are worth filing."
            tools={["MiniLM embeddings", "Vector search", "Cohere Rerank", "Evals in CI"]}
          >
            <p>
              Inventors want to know if an idea is new before they pay to file a patent. I designed and built the AI
              behind Photon Legal&apos;s Product Pulse, which answers that question.
            </p>
            <p>
              It reads the idea and searches about 26 million patent families from Google Patents (a family is one
              invention, filed in one or more countries). Then it puts the closest matches first and scores how
              likely the idea is to be patentable.
            </p>
          </CaseBody>

          <FigureFrame
            className="mt-12"
            number={1}
            title="How one search works"
            caption="A fast, wide search finds candidates, then a slower, sharper model ranks only the best ones, so results stay quick and accurate."
          >
            <Pipeline />
          </FigureFrame>

          <div
            className="mt-6 grid gap-6 rounded-[1.5rem] bg-block p-6 text-block-fg sm:p-10 lg:grid-cols-12 lg:gap-10"
            data-reveal
          >
            <div className="lg:col-span-5">
              <p className="label opacity-75">How I know it works</p>
              <p className="mt-4 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl">2.4 to 3x</p>
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
            badge="Shipped to customers"
          />
          <CaseBody
            role="Led AI across the company and led the build of the agent."
            outcome="Sales gets ready-to-call leads instead of raw chats."
            tools={["WhatsApp", "LLMs", "CRM integration"]}
          >
            <p>
              WanderOn gets a steady stream of travel enquiries on WhatsApp, and the sales team only wants the
              serious ones. I led the build of an AI agent that chats with each customer, collects their trip details
              and creates a ready-to-call lead in the CRM, handing off to a person when needed.
            </p>
            <p>
              As Head of AI I also built internal AI tools for the operations team, and WanderOn raised an INR 54
              crore Series A while I was there.
            </p>
          </CaseBody>

          <FigureFrame
            className="mt-12"
            number={2}
            title="From chat to lead"
            caption="An illustration of the flow, not a real customer chat."
          >
            <ChatToLead />
          </FigureFrame>
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
          <CaseBody
            role="Ran engineering and product."
            outcome="Acquired in Sep 2025."
            tools={["React Native", "LLM APIs", "Mobile app"]}
          >
            <p>
              CloneMyTrips is a travel app. I designed the platform from scratch and worked directly with the
              founders on what to build and when.
            </p>
            <p>I also built Dora, the app&apos;s AI trip planner, which ran on LLMs with real users from 2024 onward.</p>
          </CaseBody>

          <FigureFrame className="mt-12" number={3} title="What I owned" caption="From the first architecture to the acquisition.">
            <div className="py-2">
              <Timeline />
            </div>
          </FigureFrame>
        </article>
      </div>

      <div
        className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center"
        data-reveal
      >
        <p className="max-w-lg font-serif text-2xl leading-snug sm:text-3xl">Want the details on any of these?</p>
        <a
          href={LINKS.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonStyles.base, buttonStyles.primary)}
        >
          Book 30 minutes
          <ArrowUpRight className="nudge h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </Section>
  );
}
