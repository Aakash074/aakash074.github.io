import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/site";
import { buttonStyles, delay } from "@/components/ui/section";
import { GitHubIcon, LinkedInIcon, TelegramIcon, XIcon } from "@/components/ui/brand-icons";
import { CopyEmail } from "@/components/sections/copy-email";

const SOCIALS = [
  { label: "LinkedIn", href: LINKS.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: LINKS.github, Icon: GitHubIcon },
  { label: "Telegram", href: LINKS.telegram, Icon: TelegramIcon },
  { label: "X", href: LINKS.x, Icon: XIcon },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8 lg:pt-28">
        <div className="border-t border-foreground/80 pt-5" data-reveal>
          <p className="label flex items-center gap-3 text-subtle">
            <span className="num text-accent">05</span>
            <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
            Contact
          </p>
        </div>

        <h2
          id="contact-heading"
          data-reveal
          style={delay(1)}
          className="mt-10 max-w-4xl font-serif text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-[5.25rem]"
        >
          Hiring for a senior AI role? <em className="text-accent">Let&apos;s talk.</em>
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" data-reveal style={delay(2)}>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m open to remote AI engineering roles, full-time or contract: founding, senior, applied AI or AI
              lead. I&apos;m in New Delhi (IST), happy to work US hours, and can start right away.
            </p>
            <p className="label mt-10 text-subtle">Email</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={LINKS.mailto}
                className="link-u inline-flex min-h-11 items-center font-serif text-2xl break-all text-foreground sm:text-[2rem]"
              >
                {LINKS.email}
              </a>
              <CopyEmail email={LINKS.email} />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:max-w-md lg:col-span-5 lg:max-w-none lg:pt-2" data-reveal style={delay(3)}>
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonStyles.base, buttonStyles.primary, "w-full justify-between")}
            >
              Book a 30 min call
              <ArrowUpRight className="nudge h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={LINKS.resume} className={cn(buttonStyles.base, buttonStyles.secondary, "w-full justify-between")}>
              Download resume (PDF)
              <ArrowDown className="nudge nudge-down h-4 w-4" aria-hidden="true" />
            </a>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Profiles">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid h-12 w-12 place-items-center rounded-full border border-border-strong text-muted transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground hover:text-foreground"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
