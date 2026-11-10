"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export function ThemeToggle() {
  // Light is the default for everyone; dark only when the visitor picked it (saved in localStorage).
  // Server snapshot is null: the icons are switched by CSS, so the first paint is right anyway.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#14110d" : "#f5f0e6");
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode: the choice just will not persist */
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !document.startViewTransition) {
      apply();
      return;
    }

    // Circle grows out of the button. Radius reaches the farthest corner.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const style = document.documentElement.style;
    style.setProperty("--vt-x", `${x}px`);
    style.setProperty("--vt-y", `${y}px`);
    style.setProperty("--vt-r", `${r}px`);
    document.startViewTransition(apply);
  };

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === null ? undefined : isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      <Sun
        className="theme-icon-sun h-[18px] w-[18px] transition-transform duration-500 ease-out group-hover:rotate-45"
        aria-hidden="true"
      />
      <Moon
        className="theme-icon-moon h-[18px] w-[18px] transition-transform duration-500 ease-out group-hover:-rotate-12"
        aria-hidden="true"
      />
    </button>
  );
}
