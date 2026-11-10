import Image from "next/image";
import { Calendar, Download, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/site";
import { buttonStyles } from "@/components/ui/section";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

/** Short, concrete proof. `short` is the label used in the compact mobile grid. */
const PROOF = [
  { stat: "~26M", short: "patent families searched", label: "Patent families in the prior-art search I built for Photon Legal, tested against real examiner citations on every change." },
  { stat: "Acquired", short: "CloneMyTrips, as CTO", label: "CloneMyTrips, where I was CTO from the first architecture to the acquisition." },
  { stat: "Shipped", short: "WhatsApp agent, WanderOn", label: "Production WhatsApp sales agent (v1) I led as Head of AI at WanderOn." },
  { stat: "Top 5", short: "HackTheBox, global", label: "HackTheBox, globally. Also a 2x ETHGlobal winner." },
];

export function Hero() {
  return (
    <section id="intro" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Static, cheap background glow. No canvas, no animation loop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(180,156,255,0.14),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-6 pb-12 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14 lg:pt-20 lg:pb-24">
        <div>
          <div className="rise rise-1 flex items-center gap-4">
            <Image
              src="/avatar.jpg"
              alt="Portrait of Aakash Kumar"
              width={72}
              height={72}
              loading="eager"
              fetchPriority="high"
              className="h-12 w-12 rounded-full object-cover ring-1 ring-border-strong sm:h-[72px] sm:w-[72px]"
            />
            <p className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm font-medium text-foreground">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" />
              Open to remote AI roles
            </p>
          </div>

          <h1 id="hero-heading" className="rise rise-2 mt-5 text-4xl font-semibold sm:mt-7 tracking-tight sm:text-5xl lg:text-6xl">
            Aakash Kumar{" "}
            <span className="mt-2 block text-2xl font-medium text-muted sm:text-3xl lg:text-4xl">
              AI Product Engineer
            </span>
          </h1>

          <p className="rise rise-3 mt-4 max-w-xl text-lg sm:mt-6 leading-relaxed text-foreground/90 text-pretty">
            I build AI search and AI agents that run in production, and the evals that tell you if they
            work.
          </p>
          <p className="rise rise-3 mt-3 max-w-xl text-base leading-relaxed text-muted text-pretty">
            Ex-CTO of CloneMyTrips (acquired). Former Head of AI at WanderOn. Now AI Consultant at Shifu
            Ventures.
          </p>

          <ul aria-label="Proof at a glance" className="rise rise-3 mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
            {PROOF.map((item) => (
              <li key={item.stat} className="rounded-lg border border-border bg-surface px-3 py-2.5">
                <p className="text-lg font-semibold leading-tight tracking-tight text-accent">{item.stat}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{item.short}</p>
              </li>
            ))}
          </ul>

          <div className="rise rise-4 mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <a href={LINKS.resume} className={cn(buttonStyles.base, buttonStyles.primary, "col-span-2 px-5")}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonStyles.base, buttonStyles.secondary, "px-5")}
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Book a call
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={LINKS.mailto} className={cn(buttonStyles.base, buttonStyles.secondary, "px-5")}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email me
            </a>
          </div>

          <div className="rise rise-4 mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 -ml-2 hover:text-foreground"
            >
              <LinkedInIcon /> LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 hover:text-foreground"
            >
              <GitHubIcon /> GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <span className="inline-flex min-h-11 items-center gap-2 px-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              New Delhi (IST). Can overlap US hours.
            </span>
          </div>
        </div>

        <aside aria-label="Proof at a glance" className="rise rise-3 hidden lg:block lg:pt-4">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-subtle">
            Proof at a glance
          </p>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
            {PROOF.map((item) => (
              <li key={item.stat} className="flex items-baseline gap-4 p-5">
                <p className="w-28 shrink-0 text-2xl font-semibold tracking-tight text-accent">{item.stat}</p>
                <p className="text-sm leading-relaxed text-muted">{item.label}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
