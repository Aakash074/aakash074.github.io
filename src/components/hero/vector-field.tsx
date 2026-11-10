"use client";

import { useEffect, useRef } from "react";

/**
 * A small, live picture of vector search. Each dot is a document placed by
 * meaning; the moving marker is a query, and the closest dots light up.
 * Purely decorative (the caption explains it), so the canvas is aria-hidden.
 */

const K = 6;
const CLUSTERS = [
  { x: 0.24, y: 0.33, s: 0.08, n: 30, label: "batteries" },
  { x: 0.72, y: 0.3, s: 0.075, n: 26, label: "drones" },
  { x: 0.76, y: 0.7, s: 0.08, n: 30, label: "medical devices" },
  { x: 0.28, y: 0.76, s: 0.075, n: 26, label: "solar" },
  { x: 0.5, y: 0.53, s: 0.15, n: 28, label: "" },
];

type Pt = { x: number; y: number; c: number };

function makePoints(): Pt[] {
  // Small seeded PRNG so the layout is the same on every visit.
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const gauss = () => {
    const u = Math.max(rand(), 1e-6);
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const pts: Pt[] = [];
  CLUSTERS.forEach((cl, ci) => {
    for (let i = 0; i < cl.n; i++) {
      const x = Math.min(0.96, Math.max(0.04, cl.x + gauss() * cl.s));
      const y = Math.min(0.95, Math.max(0.15, cl.y + gauss() * cl.s * 0.9));
      pts.push({ x, y, c: ci });
    }
  });
  return pts;
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string) => cs.getPropertyValue(name).trim();
  return {
    ink: v("--foreground"),
    subtle: v("--subtle"),
    border: v("--border-strong"),
    accent: v("--accent"),
    bg: v("--surface"),
  };
}

export function VectorField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = makePoints();
    let colors = readColors();
    let monoFont = "";
    let serifFont = "";
    const readFonts = () => {
      monoFont = `500 10px ${getComputedStyle(canvas).fontFamily}`;
      const display = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim();
      serifFont = `italic 500 14px ${display || "serif"}`;
    };
    readFonts();
    document.fonts?.ready.then(readFonts).catch(() => {});
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;
    const query = { x: 0.42, y: 0.5 };
    const t0 = performance.now();

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;

      // Where the query sits: follows the pointer, otherwise drifts on a slow loop.
      let tx = query.x;
      let ty = query.y;
      if (pointer) {
        tx = pointer.x;
        ty = pointer.y;
      } else if (!reduce) {
        tx = 0.5 + Math.sin(t * 0.23) * 0.3;
        ty = 0.55 + Math.sin(t * 0.31 + 1.2) * 0.27;
      }
      const ease = reduce ? 1 : pointer ? 0.18 : 0.05;
      query.x += (tx - query.x) * ease;
      query.y += (ty - query.y) * ease;

      const qx = query.x * w;
      const qy = query.y * h;

      // Rank by distance and keep the K nearest.
      const ranked = points
        .map((p, i) => ({ i, d: (p.x * w - qx) ** 2 + (p.y * h - qy) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(0, K);
      const near = new Set(ranked.map((r) => r.i));
      const radius = Math.sqrt(ranked[ranked.length - 1].d) + 10;

      ctx.clearRect(0, 0, w, h);

      // Cluster labels
      ctx.font = monoFont;
      ctx.fillStyle = colors.subtle;
      ctx.textAlign = "center";
      CLUSTERS.forEach((cl) => {
        if (!cl.label) return;
        ctx.globalAlpha = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.9) * 2));
        ctx.strokeStyle = colors.bg;
        ctx.lineWidth = 4;
        ctx.strokeText(cl.label.toUpperCase(), cl.x * w, cl.y * h - cl.s * h - 14);
        ctx.fillText(cl.label.toUpperCase(), cl.x * w, cl.y * h - cl.s * h - 14);
      });
      ctx.globalAlpha = 1;

      // Search radius
      ctx.beginPath();
      ctx.arc(qx, qy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.accent;
      ctx.globalAlpha = 0.35;
      ctx.setLineDash([3, 4]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Lines to the nearest neighbours
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;
      ranked.forEach((r, n) => {
        const p = points[r.i];
        ctx.globalAlpha = 0.75 - n * 0.08;
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(p.x * w, p.y * h);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Points, fading in one by one on load
      points.forEach((p, i) => {
        const a = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.3 - i * 0.006) * 3));
        if (a <= 0) return;
        const isNear = near.has(i);
        ctx.globalAlpha = a * (isNear ? 1 : 0.5);
        ctx.fillStyle = isNear ? colors.accent : colors.ink;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, isNear ? 3.4 : 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // The query marker
      ctx.fillStyle = colors.bg;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(qx, qy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(qx, qy, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = serifFont;
      ctx.fillStyle = colors.ink;
      ctx.textAlign = qx > w - 90 ? "right" : "left";
      const lx = qx + (qx > w - 90 ? -12 : 12);
      ctx.strokeStyle = colors.bg;
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.strokeText("your idea", lx, qy - 10);
      ctx.fillText("your idea", lx, qy - 10);
    };

    const loop = (now: number) => {
      draw(now);
      if (!reduce && visible) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    resize();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce || !visible) draw(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && document.visibilityState === "visible";
      if (visible) start();
    });
    io.observe(wrap);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const toLocal = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      return {
        x: Math.min(0.98, Math.max(0.02, (e.clientX - rect.left) / rect.width)),
        y: Math.min(0.98, Math.max(0.12, (e.clientY - rect.top) / rect.height)),
      };
    };
    const onMove = (e: PointerEvent) => {
      pointer = toLocal(e);
      if (reduce) draw(performance.now());
    };
    const onLeave = () => {
      pointer = null;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    // Repaint with the new palette when the theme changes.
    const mo = new MutationObserver(() => {
      colors = readColors();
      draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 touch-pan-y">
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full font-mono" />
    </div>
  );
}
