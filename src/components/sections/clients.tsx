import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";

interface Client {
  name: string;
  domain: string;
  built: string;
  url: string;
  logo?: string;
}

const CLIENTS: Client[] = [
  {
    name: "Frontline",
    domain: "Fintech, BNPL",
    built: "Buy now, pay later gateway with tokenized credit lines and on-chain repayment logs.",
    url: "https://getfrontline.xyz",
    logo: "/logos/frontline.png",
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
  {
    name: "HashFast",
    domain: "Payments",
    built: "Payment links that take many tokens and confirm in real time.",
    url: "https://hashfast.xyz",
    logo: "/logos/hashfast.png",
  },
  {
    name: "NanoBond",
    domain: "DeFi",
    built: "A launchpad for token bonds, with staking and portfolio tracking.",
    url: "https://nanobond.xyz",
  },
  {
    name: "Strawbee",
    domain: "Consumer",
    built: "Browser extension that applies coupons at checkout and pays crypto cashback.",
    url: "https://www.strawbee.xyz",
    logo: "/logos/strawbee.png",
  },
  {
    name: "LetsPay",
    domain: "Consumer fintech",
    built: "Bill splitting for groups, with instant settlement and expense tracking.",
    url: "https://useletspay.com",
    logo: "/logos/letspay.png",
  },
];

export function Clients() {
  return (
    <Section
      id="clients"
      label="Client work"
      title="Products I built for startups as a consultant."
      intro="Mostly fintech and payments, where a bug costs real money."
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CLIENTS.map((c) => (
          <li key={c.name}>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
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
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-0.5 block text-xs text-subtle">{c.domain}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{c.built}</span>
                <span className="sr-only"> (opens {c.name} in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
        <li className="flex flex-col justify-center rounded-xl border border-dashed border-border-strong p-4">
          <p className="text-2xl font-semibold tracking-tight text-accent">20+</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            products shipped in total, across AI, fintech, Web3, consumer apps and clean energy.
          </p>
        </li>
      </ul>
    </Section>
  );
}
