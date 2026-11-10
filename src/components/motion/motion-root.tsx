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
          if (el.hasAttribute("data-replay")) el.dataset.run = "";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));

    // Diagrams marked data-replay play their run again on hover or focus of the figure.
    const replayers = Array.from(document.querySelectorAll<HTMLElement>("[data-replay]"));
    const cleanups = replayers.map((el) => {
      const fig = el.closest("figure") ?? el;
      let last = 0;
      const replay = () => {
        const now = performance.now();
        if (el.dataset.shown === undefined || now - last < 2600) return;
        last = now;
        delete el.dataset.run;
        el.style.setProperty("--t0", "0ms");
        void el.offsetWidth; // restart the CSS animations
        el.dataset.run = "";
      };
      fig.addEventListener("pointerenter", replay);
      fig.addEventListener("focusin", replay);
      return () => {
        fig.removeEventListener("pointerenter", replay);
        fig.removeEventListener("focusin", replay);
      };
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
