"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from 0 to `to` the first time it scrolls into view.
 * The final value is rendered on the server and also reserves the width,
 * so there is no layout shift and nothing is lost without JS.
 */
export function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = `${Math.round(to * eased)}${suffix}`;
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, suffix, duration]);

  return (
    <span className="relative inline-grid num">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {to}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true" className="col-start-1 row-start-1 text-left">
        {to}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
}
