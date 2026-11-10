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
    text: "patent families searched by the AI I built for Photon Legal.",
  },
  { stat: "2.4 to 3x", text: "more real matches than first measured, once I changed how the patent search was scored." },
  { stat: "Head of AI", text: "at WanderOn, where I led the WhatsApp agent that turns customer chats into sales leads." },
  { stat: "Top 5", text: "on HackTheBox worldwide. Security is where I started." },
];

export function Hero() {
  return (
    <section id="intro" aria-labelledby="hero-heading" className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-7 sm:px-6 sm:pt-10 lg:px-8 lg:pt-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="intro flex items-center gap-3" style={delay(0)}>
              <Image
                src="/avatar.jpg"
                alt="Portrait of Aakash Kumar"
                width={96}
                height={96}
                priority
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-border-strong sm:h-12 sm:w-12"
              />
              <p className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface/70 px-3.5 py-1.5 text-sm text-foreground">
                <span aria-hidden="true" className="status-dot relative h-2 w-2 shrink-0 rounded-full bg-green text-green" />
                <span className="sm:hidden">Open to remote AI roles</span>
                <span className="hidden sm:inline">Open to remote AI roles, full-time or contract. Can start now.</span>
              </p>
            </div>

            <h1
              id="hero-heading"
              className="mt-4 font-serif text-[clamp(4.25rem,19vw,6.5rem)] leading-[0.92] font-normal tracking-[-0.035em] sm:mt-10"
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

            <p className="intro mt-5 max-w-xl font-serif text-[1.45rem] leading-[1.35] text-foreground text-pretty sm:text-[1.7rem]" style={delay(2)}>
              I build AI search and agents that real customers use, and the tests that check they give the right
              answers.
            </p>
            <p className="intro mt-4 max-w-xl text-lg leading-relaxed text-muted text-pretty" style={delay(3)}>
              4+ years building products. I was CTO of CloneMyTrips through its acquisition and Head of AI at
              WanderOn, and I now build AI for startups at Shifu Ventures.
            </p>

            <div className="intro mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(4)}>
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

            <ul className="intro mt-4 flex flex-wrap items-center gap-x-6 text-[15px] text-muted" style={delay(5)}>
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

          <figure className="intro lg:col-span-5 lg:pt-2" style={delay(3)}>
            <VectorField />
            <figcaption className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Move your cursor, or tap. Each dot is a document placed by meaning, and the search returns the closest
              ones. Same idea as the patent search below, with made-up data.
              <span className="sr-only">
                {" "}For example, an idea about an insulin pump returns similar medical device patents first, with the
                closest ones scoring highest.
              </span>
            </figcaption>
          </figure>
        </div>

        <ul
          aria-label="Proof at a glance"
          className="mt-12 grid grid-cols-2 border-t border-foreground/80 lg:mt-8 lg:grid-cols-4"
        >
          {PROOF.map((p, i) => (
            <li
              key={i}
              data-reveal
              style={delay(i)}
              className={cn(
                "py-5 pr-3 sm:py-6 sm:pr-6 lg:py-7",
                i % 2 === 1 && "border-l border-border pl-4 sm:pl-6",
                i < 2 && "border-b border-border lg:border-b-0",
                i === 2 && "lg:border-l lg:pl-6"
              )}
            >
              <p className="font-serif text-[2rem] leading-none tracking-[-0.03em] whitespace-nowrap text-foreground sm:text-[2.6rem] xl:text-5xl">
                {p.stat}
              </p>
              <p className="mt-3 max-w-[17rem] text-sm leading-snug text-muted sm:text-[15px]">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
