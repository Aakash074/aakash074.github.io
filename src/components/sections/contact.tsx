import { Calendar, Download, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/site";
import { buttonStyles } from "@/components/ui/section";
import { GitHubIcon, LinkedInIcon, TelegramIcon, XIcon } from "@/components/ui/brand-icons";

const SOCIALS = [
  { label: "LinkedIn", href: LINKS.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: LINKS.github, Icon: GitHubIcon },
  { label: "Telegram", href: LINKS.telegram, Icon: TelegramIcon },
  { label: "X", href: LINKS.x, Icon: XIcon },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">Contact</p>
              <h2 id="contact-heading" className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
                Hiring for a senior AI role? Let&apos;s talk.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                I&apos;m open to remote AI engineering roles: founding, senior, applied AI or AI lead. I&apos;m
                based in New Delhi (IST), can overlap with US hours, and can start right away.
              </p>
              <p className="mt-6 text-sm text-subtle">Email</p>
              <a
                href={LINKS.mailto}
                className="mt-1 inline-flex min-h-11 items-center break-all text-lg font-medium text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-accent sm:text-xl"
              >
                {LINKS.email}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a href={LINKS.mailto} className={cn(buttonStyles.base, buttonStyles.primary, "w-full")}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email me
              </a>
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonStyles.base, buttonStyles.secondary, "w-full")}
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book a 30 min call
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href={LINKS.resume} className={cn(buttonStyles.base, buttonStyles.secondary, "w-full")}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download resume (PDF)
              </a>
              <ul className="mt-1 flex flex-wrap justify-center gap-1 lg:justify-start" aria-label="Profiles">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="grid h-11 w-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
