"use client";

import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Venture {
  name: string;
  url: string;
  description: string;
  contribution: string;
  tech: string[];
  industry: string;
  initials: string;
  logo?: string;
}

const VENTURES: Venture[] = [
  {
    name: "Frontline",
    url: "https://getfrontline.xyz",
    description:
      "Token-backed liquidity layer for Buy Now, Pay Later. Instant merchant settlement with on-chain credit history and 7-day interest-free window for shoppers.",
    contribution:
      "Built the BNPL gateway architecture with tokenized credit lines, immutable repayment logs, and the FLT settlement rail. Designed for a three-sided marketplace: merchants, shoppers, and liquidity providers.",
    tech: ["Smart Contracts", "Tokenized Credit", "Consensus Logs", "Mirror Node Analytics", "FLT Token"],
    industry: "Fintech / BNPL",
    initials: "FL",
  },
  {
    name: "PayoutRails",
    url: "https://payoutrails.xyz",
    description:
      "Stablecoin payroll platform for global freelancers. Batch payouts with sub-cent fees, instant settlement, and audit-ready receipts for emerging markets.",
    contribution:
      "Built the batch payroll infrastructure with atomic multi-party transfers, non-custodial contractor wallets, consensus-timestamped receipts, and local off-ramp integrations for Argentina, Nigeria, Vietnam, and the Philippines.",
    tech: ["Batch Payroll", "Atomic Transfers", "Non-Custodial", "Consensus Receipts", "Governance Token"],
    industry: "Payroll / Fintech",
    initials: "PR",
  },
  {
    name: "HashFast",
    logo: "/logos/hashfast.png",
    url: "https://hashfast.xyz",
    description:
      "Fast payment link generation supporting multi-token transactions. Create and send payment requests in seconds for person-to-person and merchant use.",
    contribution:
      "Architected the payment link infrastructure with real-time settlement tracking, multi-token support, and instant payment confirmation flows. Designed for speed and reliability.",
    tech: ["Payment Links", "Multi-Token Support", "Real-time Settlement", "Wallet Integration"],
    industry: "Payments / Crypto",
    initials: "HF",
  },
  {
    name: "NanoBond",
    url: "https://nanobond.xyz",
    description:
      "Token bond launchpad. Launch, manage, and earn yield from token bond sales with auto-staking and epoch-based yield distribution.",
    contribution:
      "Built the bond marketplace with wallet integration, epoch-based staking system, portfolio tracking, and professional analytics tools. Full dApp with bonds, trading, and yield management flows.",
    tech: ["Smart Contracts", "DeFi", "Staking", "Portfolio Analytics", "Bond Marketplace"],
    industry: "DeFi / Bond Markets",
    initials: "NB",
  },
  {
    name: "Strawbee",
    logo: "/logos/strawbee.png",
    url: "https://www.strawbee.xyz",
    description:
      "Browser-based shopping companion that auto-applies coupons and rewards users with crypto cashback. Every purchase earns Berry rewards.",
    contribution:
      "Built the coupon detection engine and rewards settlement system. Integrated automatic coupon application at checkout with Berry rewards tracking and crypto cashout flows.",
    tech: ["Browser Extension", "Coupon Engine", "Rewards System", "Crypto Payouts", "Dashboard"],
    industry: "Consumer / Rewards",
    initials: "SB",
  },
  {
    name: "LetsPay",
    logo: "/logos/letspay.png",
    url: "https://useletspay.com",
    description:
      "Instant bill splitting that eliminates the friction of collecting money from groups after shared expenses. Built for friends, roommates, and events.",
    contribution:
      "Designed the bill-splitting protocol with instant settlement, group expense tracking, and real-time reconciliation. Focused on zero-chase payment flows and clean UX.",
    tech: ["Payment Protocol", "Real-time Settlement", "Group Management", "Multi-Currency"],
    industry: "Consumer Fintech",
    initials: "LP",
  },
  {
    name: "Nihaan Energy",
    url: "https://www.nihaanenergy.com",
    description:
      "Full-service EV charging infrastructure provider. Integrated stack of AC/DC hardware, mobile app, charger management software, and installation services across India.",
    contribution:
      "Consulted on technical architecture and digital platform development. Built the NEO mobile app and web-based charging platform with real-time monitoring, charger management system, and EV charging calculator for residential and commercial properties.",
    tech: ["Mobile App", "Web Platform", "IoT Integration", "Charger Management", "OCPP Compliance"],
    industry: "Clean Energy / EV",
    initials: "NE",
    logo: "/logos/nihaanenergy.png",
  },
  {
    name: "Seerum AI",
    url: "https://github.com/seerum-org",
    description:
      "AI consulting and development venture. Building AI-native products and providing technical advisory for startups. Backed by Shifu Ventures, the VC arm of Almabase's founding team.",
    contribution:
      "AI consulting and product development across LLM applications, agent systems, and automation. Working with the Shifu Ventures ecosystem — founded by Kalyan Varma and Sri Maneru (NIT Warangal alumni who built Almabase, the leading alumni engagement SaaS platform serving 250+ institutions).",
    tech: ["AI Consulting", "LLM Applications", "Agent Systems", "Product Strategy", "Technical Advisory"],
    industry: "AI / Consulting",
    initials: "SR",
  },
];

const ADDITIONAL_COUNT = 12;

export function Ventures() {
  return (
    <section id="ventures" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading
          label="Selected Ventures & Client Work"
          title="Products shipped for startups and ventures."
          description="Engineering partnerships across fintech, Web3, DeFi, payroll, and consumer products. Architecture, development, and product strategy for every engagement."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {VENTURES.map((venture, i) => (
            <Card key={venture.name} delay={i * 0.08}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Logo or initials */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                    {venture.logo ? (
                      <Image src={venture.logo} alt={venture.name} width={28} height={28} className="object-contain" />
                    ) : (
                      <span className="text-xs font-bold tracking-tight text-foreground/30">{venture.initials}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{venture.name}</h3>
                    <p className="text-xs text-muted-foreground">{venture.industry}</p>
                  </div>
                </div>
                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-white/50 text-muted-foreground transition-all hover:bg-foreground hover:text-background hover:border-foreground shadow-sm"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {venture.description}
              </p>

              <div className="mt-3 rounded-xl border border-border/40 bg-gradient-to-br from-secondary/40 to-background p-3.5">
                <p className="text-xs font-semibold text-foreground/70">Technical Contribution</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {venture.contribution}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {venture.tech.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}

          {/* +N More card */}
          <Card delay={0.5} hover={false} className="flex flex-col items-center justify-center border-dashed border-border/40 bg-card/50 py-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 ring-1 ring-border/30">
              <Plus className="h-7 w-7 text-muted-foreground/50" />
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight">+{ADDITIONAL_COUNT}</p>
            <p className="mt-1 text-sm text-muted-foreground">more client projects</p>
            <p className="mt-3 max-w-xs text-center text-xs leading-relaxed text-muted-foreground/60">
              Additional projects across AI, fintech, Web3, consumer apps, infrastructure, and consulting.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Interested in working together?{" "}
            <a
              href="https://calendly.com/aakashkumaar074/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Book a consultation
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
