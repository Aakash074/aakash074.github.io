import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared section shell. Editorial layout: a small numbered rail on the left
 * (sticky on wide screens), a serif headline and the content on the right.
 */
export function Section({ id, index, label, title, intro, children, className }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("relative", className)}>
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-4 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="border-t border-foreground/80 pt-5" data-reveal>
          <p className="label flex items-center gap-3 text-subtle">
            <span className="num text-accent">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
            {label}
          </p>
        </div>
        <header className="mt-8 max-w-3xl sm:mt-10" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <h2
            id={headingId}
            className="font-serif text-[2.1rem] leading-[1.08] font-normal tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.4rem]"
          >
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
        </header>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li
      className={cn(
        "inline-flex items-center rounded-full border border-border-strong px-3 py-1 text-[13px] text-muted",
        className
      )}
    >
      {children}
    </li>
  );
}

/** Button-style link variants. Every variant is at least 44px tall for touch. */
export const buttonStyles = {
  base: "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,color,border-color,opacity,transform] duration-300 active:scale-[0.98]",
  primary: "bg-foreground text-background hover:bg-accent hover:text-accent-ink",
  secondary: "border border-border-strong text-foreground hover:border-foreground hover:bg-surface",
};

/** Small helper so stagger delays read clearly in JSX. */
export function delay(d: number, extra?: React.CSSProperties): React.CSSProperties {
  return { "--d": d, ...extra } as React.CSSProperties;
}
