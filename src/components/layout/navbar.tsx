"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS, NAV_LINKS } from "@/lib/site";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Highlight the section currently in view.
  useEffect(() => {
    // Every section is watched, so the highlight clears on sections that are not in the nav.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex min-h-11 items-center gap-2.5 font-serif text-lg tracking-tight text-foreground"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-foreground font-serif text-[13px] italic text-background"
          >
            ak
          </span>
          <span>Aakash Kumar</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex min-h-11 items-center px-3 text-[15px] transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-500",
                      isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <a
            href={LINKS.resume}
            className="hidden min-h-11 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Resume
            <ArrowDown className="nudge nudge-down h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(PDF)</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex min-h-11 items-center rounded-full border border-border-strong px-4 text-sm font-medium text-foreground md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-border bg-background md:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="border-b border-border">
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? "location" : undefined}
                className="flex min-h-14 items-center font-serif text-2xl text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={LINKS.resume}
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center gap-2 font-serif text-2xl text-accent"
            >
              Resume (PDF)
            </a>
          </li>
        </ul>
      </div>

      <span aria-hidden="true" className="progress absolute inset-x-0 -bottom-px hidden h-px bg-accent" />
    </header>
  );
}
