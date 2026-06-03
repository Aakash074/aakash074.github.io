import { ArrowUpRight } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface FooterGroup {
  label: string;
  links: FooterLink[];
}

const FOOTER_LINKS: FooterGroup[] = [
  {
    label: "Connect",
    links: [
      { href: "https://calendly.com/aakashkumaar074/30min", label: "Book a Call", external: true },
      { href: "mailto:aakashkumaar074@gmail.com", label: "Email", external: true },
      { href: "https://t.me/aakash074", label: "Telegram", external: true },
    ],
  },
  {
    label: "Profiles",
    links: [
      { href: "https://github.com/aakash074", label: "GitHub", external: true },
      { href: "https://www.linkedin.com/in/aakash074", label: "LinkedIn", external: true },
      { href: "https://www.producthunt.com/@aakash074", label: "Product Hunt", external: true },
    ],
  },
  {
    label: "Projects",
    links: [
      { href: "#projects", label: "Featured Work" },
      { href: "#ventures", label: "Client Work" },
      { href: "#experience", label: "Experience" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#8b5cf6]/10 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-lg font-semibold tracking-tight">Aakash Kumar</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI Product Engineer, Startup Operator, and Full Stack Architect based in New Delhi.
            </p>
          </div>

          {/* Link groups */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.label}>
              <p className="text-sm font-medium text-muted-foreground">{group.label}</p>
              <ul className="mt-3 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                      {link.external && <ArrowUpRight className="h-3 w-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Aakash Kumar. Built with precision.
          </p>
          <p className="text-xs text-muted-foreground">
            New Delhi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
