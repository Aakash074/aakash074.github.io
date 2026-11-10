"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS, NAV_LINKS } from "@/lib/site";
import { buttonStyles } from "@/components/ui/section";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Highlight the section currently in view.
  useEffect(() => {
    // The hero ("intro") is observed too, so scrolling back to the top clears the highlight.
    const sections = ["intro", ...NAV_LINKS.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "intro" ? "" : entry.target.id);
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="flex min-h-11 items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md bg-accent-soft font-mono text-[11px] font-bold text-accent"
          >
            AK
          </span>
          Aakash Kumar
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-md px-3 text-sm transition-colors",
                  active === link.id ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={LINKS.resume} className={cn(buttonStyles.base, buttonStyles.primary, "px-3.5")}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-border bg-background lg:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="border-b border-border last:border-b-0">
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? "location" : undefined}
                className={cn(
                  "flex min-h-12 items-center text-base",
                  active === link.id ? "text-foreground" : "text-muted"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
