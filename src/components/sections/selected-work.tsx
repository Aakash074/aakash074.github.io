import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import { Chip, Section } from "@/components/ui/section";

interface Step {
  label: string;
  detail: string;
}

function Pipeline({ steps, caption }: { steps: Step[]; caption: string }) {
  return (
    <figure className="rounded-xl border border-border bg-background/60 p-4 sm:p-5">
      <figcaption className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        {caption}
      </figcaption>
      <ol className="flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-0">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-stretch md:flex-1 md:items-center">
            <div className="flex flex-1 items-baseline gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2 md:block md:py-2.5">
              <span aria-hidden="true" className="font-mono text-xs text-subtle md:hidden">
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-foreground">{step.label}</p>
              <p className="text-xs leading-snug text-muted md:mt-0.5">{step.detail}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="hidden px-1.5 text-subtle md:block">
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

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

function Tools({ items }: { items: string[] }) {
  return (
    <ul aria-label="Tools used" className="mt-6 flex flex-wrap gap-2">
      {items.map((t) => (
        <Chip key={t}>{t}</Chip>
      ))}
    </ul>
  );
}

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
                closest prior art, and scores how patentable the idea is. Client companies use it to decide
                what to file.
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
              <p className="mt-2 text-sm leading-relaxed text-muted">
                When it said a 1M-family subset beat the full corpus, I dug in and found a family-level scoring
                flaw that was understating recall. Fixing it reversed a planned switch to the smaller subset.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Pipeline
              caption="How a search runs"
              steps={[
                { label: "Idea text", detail: "From the inventor" },
                { label: "MiniLM", detail: "Sentence embeddings" },
                { label: "Vector search", detail: "~26M patent families" },
                { label: "Cohere Rerank", detail: "Best matches first" },
                { label: "Idea score", detail: "With closest prior art" },
              ]}
            />
          </div>

          <Tools items={["Semantic search", "MiniLM embeddings", "Vector retrieval", "Cohere Rerank", "Recall eval in CI", "Google Patents data"]} />
        </article>

        {/* 2. WanderOn WhatsApp agent */}
        <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <CaseHeader
            company="WanderOn"
            role="Head of AI"
            dates="Oct 2025 to Jul 2026"
            title="WhatsApp sales agent, from first message to qualified lead"
            badges={[
              { text: "v1 live with customers", live: true },
              { text: "v2 designed, led the build" },
            ]}
          />

          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                Travel enquiries come in on WhatsApp and need qualifying before sales can act. I led and built
                v1. It went live and took each enquiry to a qualified lead in the CRM, with hand-off to a human.
              </p>
              <p>
                For v2, built in TypeScript on LangGraph, a fast model pulls out trip details and intent on each
                turn. The graph, not the model, picks the next step.
              </p>
            </div>

            <div className="space-y-4">
              <Pipeline
                caption="v2, on each message"
                steps={[
                  { label: "Message", detail: "From WhatsApp" },
                  { label: "Extract", detail: "Trip details, intent" },
                  { label: "Route", detail: "Search, RAG, CRM or human" },
                ]}
              />
              <p className="border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">Lesson from production:</span>{" "}
                a fuzzy-match safety net once turned a customer&apos;s pickup city, Mumbai, into Dubai. I fixed the
                matching, repaired the stored profiles and added a regression suite built from the failing
                messages.
              </p>
            </div>
          </div>

          <Tools items={["TypeScript", "LangGraph", "RAG", "Vector search", "Redis", "BullMQ", "CRM integration"]} />
        </article>

        {/* 3. CloneMyTrips */}
        <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <CaseHeader
            company="CloneMyTrips"
            role="CTO"
            dates="Mar 2024 to Sep 2025"
            title="CTO from the first line of code to acquisition"
            badges={[{ text: "Company acquired", live: true }]}
          />

          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                I designed the platform architecture from scratch, then led engineering and product until the
                company was acquired.
              </p>
              <p>
                I launched the Dora AI Engine in the mobile app. It builds travel itineraries with AI and links
                travel creators with their audiences.
              </p>
            </div>

            <dl className="grid content-start gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <dt className="text-xs text-subtle">What I owned</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">Architecture, engineering, product</dd>
              </div>
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <dt className="text-xs text-subtle">AI in the product</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">Dora AI itineraries, mobile app</dd>
              </div>
              <div className="rounded-xl border border-border bg-background/60 p-4 sm:col-span-2">
                <dt className="text-xs text-subtle">Worked with</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  The founders, on technical strategy, the roadmap and scaling
                </dd>
              </div>
            </dl>
          </div>

          <Tools items={["System design", "Full-stack", "Mobile app", "LLM features", "Engineering leadership"]} />
        </article>
      </div>
    </Section>
  );
}
