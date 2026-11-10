import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/site";
import { buttonStyles, delay } from "@/components/ui/section";
import { CountUp } from "@/components/motion/count-up";
import { VectorField } from "@/components/hero/vector-field";

/** Splits a word into letters that rise in one after another on load. */
function Letters({ word, offset = 0 }: { word: string; offset?: number }) {
  return (
    <span aria-hidden="true" className="block">
      {word.split("").map((ch, i) => (
        <span key={i} className="name-letter" style={{ "--i": i + offset } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

const PROOF = [
  {
    stat: <CountUp to={26} suffix="M" />,
    text: "patents searched by the AI search I built for Photon Legal.",
  },
  { stat: "CTO", text: "of CloneMyTrips from day one to its acquisition." },
  { stat: "Live", text: "WhatsApp sales agent I led at WanderOn. It turns customer chats into sales leads." },
  { stat: "Top 5", text: "on HackTheBox worldwide. Security is where I started." },
];

export function Hero() {
  return (
    <section id="intro" aria-labelledby="hero-heading" className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="intro flex flex-wrap items-center gap-3" style={delay(0)}>
              <Image
                src="/avatar.jpg"
                alt="Portrait of Aakash Kumar"
                width={96}
                height={96}
                priority
                className="h-12 w-12 rounded-full object-cover ring-1 ring-border-strong"
              />
              <p className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface/70 px-3.5 py-1.5 text-sm text-foreground">
                <span aria-hidden="true" className="status-dot relative h-2 w-2 rounded-full bg-green text-green" />
                Open to remote AI roles, full-time or contract. Can start now.
              </p>
            </div>

            <h1
              id="hero-heading"
              className="mt-7 font-serif text-[clamp(4.25rem,19vw,7.5rem)] leading-[0.92] font-normal tracking-[-0.035em] sm:mt-10"
            >
              <span className="sr-only">Aakash Kumar, AI Engineer</span>
              <Letters word="Aakash" />
              <span className="block pl-[0.6em]">
                <Letters word="Kumar" offset={6} />
              </span>
              <span aria-hidden="true" className="intro mt-4 block w-fit text-[0.36em] tracking-[-0.02em] italic" style={delay(1)}>
                <span className="relative inline-block text-accent">
                  AI Engineer
                  <svg
                    className="swash absolute -bottom-[0.28em] left-0 h-[0.4em] w-full overflow-visible text-accent"
                    viewBox="0 0 200 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M2 14 C 50 4, 120 4, 198 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" pathLength={1} />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="intro mt-8 max-w-xl font-serif text-[1.45rem] leading-[1.35] text-foreground text-pretty sm:text-[1.7rem]" style={delay(2)}>
              I build AI search and AI agents that real customers use, and the tests that prove they give the right
              answers.
            </p>
            <p className="intro mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty" style={delay(3)}>
              4+ years building products. I was CTO of CloneMyTrips through its acquisition and Head of AI at
              WanderOn, and I now build AI for startups at Shifu Ventures.
            </p>

            <div className="intro mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(4)}>
              <a href={LINKS.resume} className={cn(buttonStyles.base, buttonStyles.primary)}>
                Download resume
                <ArrowDown className="nudge nudge-down h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(PDF)</span>
              </a>
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonStyles.base, buttonStyles.secondary)}
              >
                Book a 30 min call
                <ArrowUpRight className="nudge h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <ul className="intro mt-6 flex flex-wrap items-center gap-x-6 text-[15px] text-muted" style={delay(5)}>
              <li>
                <a href={LINKS.mailto} className="inline-flex min-h-11 items-center hover:text-foreground">
                  <span className="link-u">Email</span>
                </a>
              </li>
              <li>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-foreground">
                  <span className="link-u">LinkedIn</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-foreground">
                  <span className="link-u">GitHub</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li className="inline-flex min-h-11 items-center text-subtle">New Delhi, IST. Happy to work US hours.</li>
            </ul>
          </div>

          <figure className="intro lg:col-span-5 lg:pt-6" style={delay(3)}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-border-strong bg-surface sm:aspect-[16/10] lg:aspect-[4/5]">
              <VectorField />
              <p className="label pointer-events-none absolute top-4 left-5 text-subtle">Fig. 0 / Vector search</p>
            </div>
            <figcaption className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Each dot is a document, placed by meaning. Move your cursor, or tap, and the search picks the closest
              ones. The same idea powers the patent search below.
            </figcaption>
          </figure>
        </div>

        <ul
          aria-label="Proof at a glance"
          className="mt-16 grid grid-cols-1 border-t border-foreground/80 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {PROOF.map((p, i) => (
            <li
              key={i}
              data-reveal
              style={delay(i)}
              className={cn(
                "border-b border-border py-6 sm:px-6 lg:border-b-0 lg:py-8",
                i % 2 === 1 && "sm:border-l",
                i === 0 && "sm:pl-0",
                i === 2 && "sm:pl-0 lg:pl-6",
                i > 0 && "lg:border-l"
              )}
            >
              <p className="font-serif text-5xl leading-none tracking-[-0.03em] text-foreground">{p.stat}</p>
              <p className="mt-3 max-w-[16rem] text-[15px] leading-snug text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
