import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";

interface Role {
  company: string;
  role: string;
  dates: string;
  place: string;
  summary: string;
  tag?: string;
  logo?: string;
}

const ROLES: Role[] = [
  {
    company: "Shifu Ventures",
    role: "AI Consultant",
    dates: "Aug 2026 to present",
    place: "Product studio and VC, India",
    summary:
      "I build AI for portfolio startups and get their products working in production. Lead build: Photon Legal's prior-art search over ~26M patent families.",
    tag: "Current",
  },
  {
    company: "WanderOn",
    role: "Head of AI",
    dates: "Oct 2025 to Jul 2026",
    place: "Gurugram, India",
    summary:
      "Led AI across the company. Built internal AI tools for operations and the WhatsApp sales agent for customers. WanderOn raised an INR 54 Cr Series A in this period.",
    logo: "/logos/wanderon.png",
  },
  {
    company: "CloneMyTrips",
    role: "Chief Technology Officer",
    dates: "Mar 2024 to Sep 2025",
    place: "Bengaluru, India (hybrid)",
    summary:
      "Built the platform from scratch and led engineering and product to acquisition. Launched the Dora AI Engine for AI travel itineraries.",
    tag: "Acquired",
  },
  {
    company: "Safle",
    role: "Senior Frontend Developer, Web3",
    dates: "Feb 2023 to Mar 2024",
    place: "Abu Dhabi, UAE (remote)",
    summary: "Built a crypto wallet that works without an internet connection.",
    logo: "/logos/safle.png",
  },
  {
    company: "Calmverse",
    role: "Co-founder",
    dates: "Aug 2022 to Feb 2023",
    place: "Remote",
    summary: "Co-founded a Web3 metaverse for mental health. Owned the product concept and the architecture.",
  },
  {
    company: "QuickSell",
    role: "Senior Frontend Developer",
    dates: "Jun 2022 to Nov 2022",
    place: "Mumbai, India",
    summary: "Promoted from junior to senior. Built React apps for a conversational commerce platform.",
    logo: "/logos/quicksell.png",
  },
];

const EARLY = [
  {
    title: "Lead Developer, Megham Cloud",
    detail: "Centre of Innovation and Incubation, NIT Warangal. Aug 2020 to Apr 2022. Led the institute's cloud platform.",
  },
  { title: "Co-founder, BugClaim", detail: "Crowdsourced security SaaS. 2021 to 2022." },
  { title: "Co-founder, CybSec NITW", detail: "The campus security club. 2019 to 2022. Organised PhantomCTF, the first CTF at NIT Warangal." },
  { title: "Chapter Lead, OWASP Warangal", detail: "Student chapter, 2021." },
  { title: "B.Tech, Computer Science and Engineering", detail: "NIT Warangal, 2018 to 2022." },
];

export function Experience() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="4+ years shipping products. Since 2024, leading AI and engineering."
    >
      <ol className="divide-y divide-border border-y border-border">
        {ROLES.map((r) => (
          <li key={r.company} className="grid gap-2 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
            <p className="text-sm text-subtle sm:pt-1">{r.dates}</p>
            <div className="flex gap-4">
              <div
                aria-hidden="true"
                className="hidden h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-surface-2 sm:grid"
              >
                {r.logo ? (
                  <Image src={r.logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                ) : (
                  <span className="font-mono text-xs font-semibold text-muted">{r.company.slice(0, 2)}</span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-semibold text-foreground">
                  <span>
                    {r.role}, {r.company}
                  </span>
                  {r.tag && (
                    <span className="rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                      {r.tag}
                    </span>
                  )}
                </h3>
                <p className="mt-0.5 text-sm text-subtle">{r.place}</p>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted">{r.summary}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <details className="group mt-6 rounded-xl border border-border bg-surface">
        <summary className="flex min-h-12 items-center justify-between gap-4 rounded-xl px-5 text-sm font-medium text-foreground hover:bg-surface-2">
          Before 2022: university, founding roles and security
          <ChevronDown className="chevron h-4 w-4 text-muted transition-transform" aria-hidden="true" />
        </summary>
        <ul className="grid gap-x-8 gap-y-4 border-t border-border px-5 py-5 sm:grid-cols-2">
          {EARLY.map((e) => (
            <li key={e.title}>
              <p className="text-sm font-semibold text-foreground">{e.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{e.detail}</p>
            </li>
          ))}
        </ul>
      </details>
    </Section>
  );
}
