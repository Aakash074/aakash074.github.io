import { ArrowRight, Calendar, CheckCircle2, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS, PHOTON_EVAL_LINE } from "@/lib/site";
import { Chip, Section } from "@/components/ui/section";

/* ---------- Diagram primitives ---------- */

type Kind = "input" | "model" | "data" | "logic" | "output";

const KIND_STYLE: Record<Kind, { label: string; box: string; tag: string }> = {
  input: { label: "Input", box: "border-border-strong", tag: "text-subtle" },
  model: { label: "Model", box: "border-accent/60", tag: "text-accent" },
  data: { label: "Data", box: "border-sky-400/50", tag: "text-sky-300" },
  logic: { label: "Code", box: "border-amber-300/50", tag: "text-amber-200" },
  output: { label: "Output", box: "border-success/50", tag: "text-success" },
};

interface Node {
  label: string;
  detail: string;
  kind: Kind;
}

function NodeBox({ node, className }: { node: Node; className?: string }) {
  const k = KIND_STYLE[node.kind];
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 rounded-lg border bg-surface-2 px-3 py-2 md:block md:py-2.5",
        k.box,
        className
      )}
    >
      <p className={cn("w-12 font-mono text-[11px] font-medium uppercase tracking-[0.14em] md:w-auto", k.tag)}>
        {k.label}
      </p>
      <p className="text-sm font-semibold text-foreground md:mt-0.5">{node.label}</p>
      <p className="basis-full pl-14 text-xs leading-snug text-muted md:mt-0.5 md:basis-auto md:pl-0">{node.detail}</p>
    </div>
  );
}

/** Arrows only on md and up. On mobile the stacked, typed rows read top to bottom. */
function Arrow() {
  return (
    <span aria-hidden="true" className="hidden px-1.5 text-subtle md:block">
      <ArrowRight className="h-4 w-4" />
    </span>
  );
}

/** A labelled diagram that reads like a figure from a design doc. */
function Figure({
  number,
  title,
  caption,
  kinds = [],
  className,
  children,
}: {
  number: number;
  title: string;
  caption: string;
  kinds?: Kind[];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-border bg-background/70", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-foreground">
          Fig. {number} <span className="text-subtle">/ {title}</span>
        </p>
        {kinds.length > 0 && (
          <ul aria-label="Legend" className="hidden flex-wrap gap-x-3 gap-y-1 md:flex">
            {kinds.map((kind) => (
              <li
                key={kind}
                className={cn("flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em]", KIND_STYLE[kind].tag)}
              >
                <span aria-hidden="true" className="h-2 w-2 rounded-sm bg-current" />
                {KIND_STYLE[kind].label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4">{children}</div>
      <figcaption className="border-t border-border px-4 py-2.5 text-xs leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}

/** Linear flow: stacks on mobile, one row on md and up. */
function Flow({ nodes }: { nodes: Node[] }) {
  return (
    <ol className="flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-0">
      {nodes.map((n, i) => (
        <li key={n.label} className="flex flex-col md:flex-1 md:flex-row md:items-center">
          <NodeBox node={n} className="md:h-full md:flex-1" />
          {i < nodes.length - 1 && <Arrow />}
        </li>
      ))}
    </ol>
  );
}

/* ---------- Card chrome ---------- */

interface Badge {
  text: string;
  live?: boolean;
}

function CaseHeader({
  company,
  role,
  dates,
  title,
  badges,
}: {
  company: string;
  role: string;
  dates: string;
  title: string;
  badges: Badge[];
}) {
  return (
    <header>
      <p className="text-sm text-muted">
        <span className="font-semibold text-foreground">{company}</span>
        <span aria-hidden="true"> · </span>
        {role}
        <span aria-hidden="true"> · </span>
        <span className="whitespace-nowrap">{dates}</span>
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance sm:text-2xl">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Status">
        {badges.map((b) =>
          b.live ? (
            <li
              key={b.text}
              className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-foreground"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              {b.text}
            </li>
          ) : (
            <li
              key={b.text}
              className="inline-flex items-center rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-muted"
            >
              {b.text}
            </li>
          )
        )}
      </ul>
    </header>
  );
}

function CardFooter({ tools, topic }: { tools: string[]; topic: string }) {
  return (
    <footer className="mt-6 flex flex-col gap-4 border-t border-border pt-5 lg:flex-row lg:items-center lg:justify-between">
      <ul aria-label="Tools used" className="flex flex-wrap gap-2">
        {tools.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </ul>
      <p className="flex shrink-0 flex-wrap items-center gap-x-2 text-sm text-muted">
        Want the architecture walk-through?
        <a
          href={LINKS.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md font-medium text-accent underline-offset-4 hover:underline"
        >
          <Calendar className="h-4 w-4" aria-hidden="true" />
          Book 30 min
          <span className="sr-only">to talk about {topic} (opens in a new tab)</span>
        </a>
      </p>
    </footer>
  );
}

/* ---------- Section ---------- */

export function SelectedWork() {
  return (
    <Section
      id="work"
      label="Selected AI work"
      title="AI systems I built, and how I know they work."
      intro="Three pieces of work that show what I do best: search and retrieval with real evals, agents that face customers, and owning a product end to end."
    >
      <div className="space-y-6">
        {/* 1. Photon Legal: the flagship */}
        <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <CaseHeader
            company="Photon Legal, via Shifu Ventures"
            role="AI Consultant"
            dates="Aug 2026 to present"
            title="Prior-art patent search over ~26M patent families"
            badges={[{ text: "Recall eval gates every merge", live: true }]}
          />

          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                Inventors want to know if an idea is new before they pay to file a patent. I designed and
                built the core AI behind Photon Legal&apos;s Product Pulse to answer that.
              </p>
              <p>
                It searches ~26M deduplicated Google Patents families, reranks the best candidates, shows the
                closest prior art, and scores how patentable the idea is. It helps client companies decide which
                inventions to file.
              </p>
            </div>

            <div className="rounded-xl border border-accent/30 bg-accent-soft p-4 sm:p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FlaskConical className="h-4 w-4 text-accent" aria-hidden="true" />
                How I know it works
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A recall eval runs in CI and gates merges. It scores results against the prior art that patent
                examiners actually cited.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{PHOTON_EVAL_LINE}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <Figure
              number={1}
              title="Search pipeline"
              kinds={["input", "model", "data", "output"]}
              caption="One search, left to right. Retrieval is fast and wide. The reranker is slower and only sees the top candidates."
            >
              <Flow
                nodes={[
                  { label: "Idea text", detail: "Written by the inventor", kind: "input" },
                  { label: "MiniLM", detail: "Turns the idea into an embedding", kind: "model" },
                  { label: "Vector search", detail: "Over ~26M patent families", kind: "data" },
                  { label: "Cohere Rerank", detail: "Puts the closest matches first", kind: "model" },
                  { label: "Idea score", detail: "Plus the closest prior art", kind: "output" },
                ]}
              />
            </Figure>
            {/* The eval loop repeats the text box above, so it is shown from md up to keep mobile short. */}
            <Figure
              className="hidden md:block"
              number={2}
              title="Eval loop, on every change"
              kinds={["input", "logic", "output"]}
              caption="The answer key is real: prior art that patent examiners cited. A drop in recall blocks the change before it ships."
            >
              <Flow
                nodes={[
                  { label: "Code change", detail: "Any pull request", kind: "input" },
                  { label: "Run test queries", detail: "With examiner-cited prior art", kind: "logic" },
                  { label: "Score recall", detail: "By patent family", kind: "logic" },
                  { label: "Gate the merge", detail: "In CI", kind: "output" },
                ]}
              />
            </Figure>
          </div>

          <CardFooter
            topic="the patent search"
            tools={["Semantic search", "MiniLM embeddings", "Vector retrieval", "Cohere Rerank", "Recall eval in CI"]}
          />
        </article>

        {/* 2. WanderOn WhatsApp agent */}
        <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <CaseHeader
            company="WanderOn"
            role="Head of AI"
            dates="Oct 2025 to Jul 2026"
            title="WhatsApp sales agent, from first message to qualified lead"
            badges={[{ text: "Live with customers", live: true }]}
          />

          <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
            <p>
              Travel enquiries arrive on WhatsApp and need qualifying before the sales team can act. As Head of AI
              I led and built the agent that handled them in production, chatting with travellers and turning each
              enquiry into a qualified lead in our CRM.
            </p>
            <p>
              I also built internal AI tools for the operations team, and WanderOn raised an INR 54 Cr Series A
              during my time there.
            </p>
          </div>

          <CardFooter topic="the WhatsApp agent" tools={["WhatsApp", "LLMs", "Node.js", "CRM integration"]} />
        </article>

        {/* 3. CloneMyTrips */}
        <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <CaseHeader
            company="CloneMyTrips"
            role="CTO"
            dates="Mar 2024 to Sep 2025"
            title="Built the platform from scratch, through to acquisition"
            badges={[{ text: "Company acquired", live: true }]}
          />

          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                I designed the platform architecture from scratch, then led engineering and product until the
                company was acquired. I worked directly with the founders on technical strategy, the roadmap and
                scaling.
              </p>
              <p>
                I launched the Dora AI Engine in the mobile app. It builds travel itineraries with AI and links
                travel creators with their audiences.
              </p>
            </div>

            <Figure className="hidden md:block" number={4} title="What I owned" caption="One owner, from the first architecture doc to the acquisition.">
              <ol className="space-y-3 border-l border-border-strong pl-5">
                {[
                  { when: "Mar 2024", what: "Joined as CTO. Designed the architecture from scratch.", dot: "bg-subtle" },
                  { when: "In the app", what: "Launched the Dora AI Engine for AI travel itineraries.", dot: "bg-accent" },
                  { when: "Sep 2025", what: "CloneMyTrips was acquired.", dot: "bg-success" },
                ].map((m) => (
                  <li key={m.when} className="relative">
                    <span
                      aria-hidden="true"
                      className={cn("absolute top-1 -left-[25px] h-2.5 w-2.5 rounded-full ring-4 ring-background", m.dot)}
                    />
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">{m.when}</p>
                    <p className="mt-0.5 text-sm text-foreground">{m.what}</p>
                  </li>
                ))}
              </ol>
            </Figure>
          </div>

          <CardFooter
            topic="CloneMyTrips"
            tools={["System design", "Full-stack", "Mobile app", "LLM features", "Engineering leadership"]}
          />
        </article>
      </div>
    </Section>
  );
}
