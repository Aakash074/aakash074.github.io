"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-steps], [data-chat], [data-timeline]";

/**
 * One observer for the whole page. Server components opt in with data
 * attributes; this marks each one as shown the first time it enters view.
 * CSS does the actual animation, so this file stays tiny.
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("mo");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => (n.dataset.shown = ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.shown = "";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
