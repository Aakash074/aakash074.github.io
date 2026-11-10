import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Shared section shell: one spacing scale and one heading style for the whole page. */
export function Section({ id, label, title, intro, children, className }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("border-t border-border", className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <header className="mb-10 max-w-2xl sm:mb-12">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">{label}</p>
          <h2 id={headingId} className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          {intro && <p className="mt-3 text-base leading-relaxed text-muted text-pretty">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-1 text-xs font-medium text-muted",
        className
      )}
    >
      {children}
    </li>
  );
}

/** Button-style link variants. Every variant is at least 44px tall for touch. */
export const buttonStyles = {
  base: "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-150",
  primary: "bg-foreground text-background hover:bg-white",
  secondary: "border border-border-strong bg-surface text-foreground hover:border-subtle hover:bg-surface-2",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
};
