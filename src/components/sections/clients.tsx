import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";

interface Client {
  name: string;
  domain: string;
  built: string;
  /** Only set when the site is reachable. */
  url?: string;
  /** Only set when we have the company's real mark. */
  logo?: string;
}

const FEATURED: Client[] = [
  {
    name: "Frontline",
    domain: "Fintech, BNPL",
    built: "Buy now, pay later gateway with tokenized credit lines and on-chain repayment logs.",
    url: "https://getfrontline.xyz",
  },
  {
    name: "PayoutRails",
    domain: "Payroll",
    built: "Stablecoin batch payroll for global freelancers, with audit-ready receipts.",
    url: "https://payoutrails.xyz",
    logo: "/logos/payoutrails.png",
  },
  {
    name: "Nihaan Energy",
    domain: "EV charging",
    built: "The NEO mobile app and a web platform to manage chargers, with live monitoring and OCPP.",
    url: "https://www.nihaanenergy.com",
    logo: "/logos/nihaanenergy.png",
  },
];

const MORE: Client[] = [
  {
    name: "HashFast",
    domain: "Payments",
    built: "Payment links that take many tokens and confirm in real time.",
    logo: "/logos/hashfast.png",
  },
  {
    name: "NanoBond",
    domain: "DeFi",
    built: "A launchpad for token bonds, with staking and portfolio tracking.",
  },
  {
    name: "Strawbee",
    domain: "Consumer",
    built: "Browser extension that applies coupons at checkout and pays crypto cashback.",
    url: "https://www.strawbee.xyz",
  },
  {
    name: "LetsPay",
    domain: "Consumer fintech",
    built: "Bill splitting for groups, with instant settlement and expense tracking.",
    url: "https://useletspay.com",
    logo: "/logos/letspay.png",
  },
];

function ClientCard({ c }: { c: Client }) {
  const body = (
    <>
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-background"
      >
        {c.logo ? (
          <Image src={c.logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
        ) : (
          <span className="font-mono text-xs font-semibold text-muted">{c.name.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-foreground">{c.name}</span>
          {c.url && (
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="mt-0.5 block text-xs text-subtle">{c.domain}</span>
        <span className="mt-2 block text-sm leading-relaxed text-muted">{c.built}</span>
        {c.url && <span className="sr-only"> (opens {c.name} in a new tab)</span>}
      </span>
    </>
  );

  const base = "flex h-full gap-4 rounded-xl border border-border bg-surface p-4";
  return c.url ? (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${base} transition-colors hover:border-border-strong hover:bg-surface-2`}
    >
      {body}
    </a>
  ) : (
    <div className={base}>{body}</div>
  );
}

export function Clients() {
  return (
    <Section
      id="clients"
      label="Client work"
      title="Products I built for startups as a consultant."
      intro="Mostly fintech and payments, where a bug moves real money. 20+ products shipped in total, across AI, fintech, Web3, consumer apps and clean energy."
    >
      <ul className="grid gap-3 md:grid-cols-3">
        {FEATURED.map((c) => (
          <li key={c.name}>
            <ClientCard c={c} />
          </li>
        ))}
      </ul>

      <details className="mt-3 rounded-xl border border-border bg-surface">
        <summary className="flex min-h-12 items-center justify-between gap-4 rounded-xl px-5 text-sm font-medium text-foreground hover:bg-surface-2">
          {MORE.length} more client projects
          <ChevronDown className="chevron h-4 w-4 text-muted transition-transform" aria-hidden="true" />
        </summary>
        <ul className="grid gap-3 border-t border-border p-3 sm:grid-cols-2">
          {MORE.map((c) => (
            <li key={c.name}>
              <ClientCard c={c} />
            </li>
          ))}
        </ul>
      </details>
    </Section>
  );
}
