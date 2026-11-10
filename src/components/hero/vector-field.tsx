"use client";

import { useEffect, useRef } from "react";

/**
 * A small, live picture of vector search. Each dot is a document placed by
 * meaning, tinted by topic. The marker is a query: the nearest dots light up
 * and the top 3 show as ranked results with a similarity score.
 * The data is illustrative; the caption says so. Canvas is aria-hidden.
 */

const K = 5;
const TOP = 3;

type Cluster = { x: number; y: number; s: number; n: number; label: string; tint: string; a: string[]; b: string[] };

const CLUSTERS: Cluster[] = [
  {
    x: 0.25, y: 0.33, s: 0.075, n: 28, label: "batteries", tint: "--blue",
    a: ["Solid-state", "Fast-charge", "Low-cost", "Recyclable", "Thin-film", "High-density"],
    b: ["battery cell", "anode coating", "cooling pad", "charge controller", "cathode mix"],
  },
  {
    x: 0.73, y: 0.3, s: 0.07, n: 24, label: "drones", tint: "--ochre",
    a: ["Foldable", "Quiet", "Autonomous", "Heavy-lift", "Compact", "Long-range"],
    b: ["drone arm", "drone rotor", "landing gear", "delivery winch", "flight planner"],
  },
  {
    x: 0.75, y: 0.72, s: 0.075, n: 28, label: "medical devices", tint: "--green",
    a: ["Wearable", "Implanted", "Handheld", "Disposable", "Smart", "Wireless"],
    b: ["glucose sensor", "insulin pump", "pulse monitor", "inhaler counter", "hearing filter"],
  },
  {
    x: 0.27, y: 0.75, s: 0.07, n: 24, label: "solar", tint: "--muted",
    a: ["Bifacial", "Self-cleaning", "Lightweight", "Tracking", "Flexible", "Anti-glare"],
    b: ["solar panel", "solar roof tile", "panel mount", "solar inverter", "cell coating"],
  },
  {
    x: 0.5, y: 0.53, s: 0.13, n: 22, label: "", tint: "--subtle",
    a: ["Low-power", "Smart", "Wireless", "Compact", "Modular", "Sealed"],
    b: ["energy meter", "radio tag", "sensor chip", "heat exchanger", "charging pad"],
  },
];

type Pt = { x: number; y: number; c: number; title: string };

/** Approximate label boxes in normalized units, so dots stay clear of the text. */
function labelBox(cl: Cluster) {
  return { x: cl.x, y: cl.y - cl.s - 0.05, hw: 0.03 + cl.label.length * 0.0095, hh: 0.035 };
}

function makePoints(): Pt[] {
  let seed = 11;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const gauss = () => {
    const u = Math.max(rand(), 1e-6);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
  };
  const boxes = CLUSTERS.filter((c) => c.label).map(labelBox);
  const pts: Pt[] = [];
  CLUSTERS.forEach((cl, ci) => {
    let made = 0;
    let guard = 0;
    while (made < cl.n && guard++ < 2000) {
      const x = Math.min(0.95, Math.max(0.05, cl.x + gauss() * cl.s));
      const y = Math.min(0.94, Math.max(0.16, cl.y + gauss() * cl.s * 0.9));
      if (boxes.some((b) => Math.abs(x - b.x) < b.hw && Math.abs(y - b.y) < b.hh)) continue;
      pts.push({ x, y, c: ci, title: `${cl.a[made % cl.a.length]} ${cl.b[Math.floor(made / cl.a.length) % cl.b.length]}` });
      made++;
    }
  });
  return pts;
}

export function VectorField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const list = listRef.current;
    if (!wrap || !canvas || !list) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = makePoints();
    const labelled = CLUSTERS.filter((c) => c.label);
    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-row]"));

    let colors: Record<string, string> = {};
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const names = ["--foreground", "--muted", "--subtle", "--accent", "--surface", "--blue", "--ochre", "--green"];
      colors = Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(n).trim()]));
    };
    readColors();

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
    let running = false;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;
    let lastInput = performance.now();
    const query = { x: 0.46, y: 0.58 };
    const t0 = performance.now();
    // Fixed-size buffers for the nearest-neighbour scan: no allocation per frame.
    const nearIdx = new Int32Array(K);
    const nearD = new Float64Array(K);
    let shownKey = "";

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateList = () => {
      const key = `${nearIdx[0]},${nearIdx[1]},${nearIdx[2]}`;
      if (key === shownKey) return;
      shownKey = key;
      const far = Math.hypot(w, h) * 0.5;
      for (let r = 0; r < TOP; r++) {
        const p = points[nearIdx[r]];
        const sim = Math.max(0.5, 0.99 - (Math.sqrt(nearD[r]) / far) * 0.6);
        const row = rows[r];
        row.querySelector("[data-title]")!.textContent = p.title;
        row.querySelector("[data-score]")!.textContent = sim.toFixed(2);
        (row.querySelector("[data-dot]") as HTMLElement).style.background = colors[CLUSTERS[p.c].tint];
      }
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;

      let tx = query.x;
      let ty = query.y;
      if (pointer) {
        tx = pointer.x;
        ty = pointer.y;
      } else if (!reduce) {
        tx = 0.5 + Math.sin(t * 0.23) * 0.3;
        ty = 0.56 + Math.sin(t * 0.31 + 1.2) * 0.26;
      }
      const ease = reduce ? 1 : pointer ? 0.2 : 0.05;
      query.x += (tx - query.x) * ease;
      query.y += (ty - query.y) * ease;
      const qx = query.x * w;
      const qy = query.y * h;

      // Top-K scan with an insertion into a fixed array.
      nearD.fill(Infinity);
      nearIdx.fill(-1);
      for (let i = 0; i < points.length; i++) {
        const dx = points[i].x * w - qx;
        const dy = points[i].y * h - qy;
        const d = dx * dx + dy * dy;
        if (d >= nearD[K - 1]) continue;
        let j = K - 1;
        while (j > 0 && nearD[j - 1] > d) {
          nearD[j] = nearD[j - 1];
          nearIdx[j] = nearIdx[j - 1];
          j--;
        }
        nearD[j] = d;
        nearIdx[j] = i;
      }
      const radius = Math.sqrt(nearD[K - 1]) + 10;

      ctx.clearRect(0, 0, w, h);

      // Topic labels, with a halo so dots never muddy them.
      const fade = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.9) * 2));
      ctx.font = monoFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 4;
      ctx.lineJoin = "round";
      for (const cl of labelled) {
        const b = labelBox(cl);
        ctx.globalAlpha = fade;
        ctx.strokeStyle = colors["--surface"];
        ctx.strokeText(cl.label.toUpperCase(), b.x * w, b.y * h);
        ctx.fillStyle = colors["--subtle"];
        ctx.fillText(cl.label.toUpperCase(), b.x * w, b.y * h);
      }
      ctx.globalAlpha = 1;

      // Search radius
      ctx.beginPath();
      ctx.arc(qx, qy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = colors["--accent"];
      ctx.globalAlpha = 0.4;
      ctx.setLineDash([3, 4]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Lines to the nearest neighbours
      for (let n = 0; n < K; n++) {
        const p = points[nearIdx[n]];
        ctx.globalAlpha = 0.85 - n * 0.12;
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(p.x * w, p.y * h);
        ctx.stroke();
      }

      // Documents, tinted by topic, fading in one by one on load
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const a = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.3 - i * 0.005) * 3));
        if (a <= 0) continue;
        let rank = -1;
        for (let n = 0; n < K; n++) if (nearIdx[n] === i) rank = n;
        const near = rank >= 0;
        ctx.globalAlpha = a * (near ? 1 : 0.7);
        ctx.fillStyle = near ? colors["--accent"] : colors[CLUSTERS[p.c].tint];
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, near ? (rank < TOP ? 4.4 : 3.6) : 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Query marker
      ctx.fillStyle = colors["--surface"];
      ctx.strokeStyle = colors["--accent"];
      ctx.lineWidth = 1.75;
      ctx.beginPath();
      ctx.arc(qx, qy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = colors["--accent"];
      ctx.beginPath();
      ctx.arc(qx, qy, 2.6, 0, Math.PI * 2);
      ctx.fill();

      // "your idea" goes on whichever side is clear of topic labels and edges.
      ctx.font = serifFont;
      ctx.textBaseline = "alphabetic";
      const tw = ctx.measureText("your idea").width;
      const spots = [
        { x: qx + 12, y: qy - 10, align: "left" as const },
        { x: qx - 12, y: qy - 10, align: "right" as const },
        { x: qx + 12, y: qy + 20, align: "left" as const },
        { x: qx - 12, y: qy + 20, align: "right" as const },
      ];
      const clear = (s: (typeof spots)[number]) => {
        const left = s.align === "left" ? s.x : s.x - tw;
        if (left < 6 || left + tw > w - 6) return false;
        return labelled.every((cl) => {
          const b = labelBox(cl);
          const bw = (b.hw + 0.02) * w;
          return Math.abs(left + tw / 2 - b.x * w) > bw + tw / 2 || Math.abs(s.y - 5 - b.y * h) > 18;
        });
      };
      const spot = spots.find(clear) ?? spots[0];
      ctx.textAlign = spot.align;
      ctx.strokeStyle = colors["--surface"];
      ctx.lineWidth = 5;
      ctx.strokeText("your idea", spot.x, spot.y);
      ctx.fillStyle = colors["--foreground"];
      ctx.fillText("your idea", spot.x, spot.y);

      updateList();
    };

    const loop = (now: number) => {
      draw(now);
      // Keep drifting for a while, then rest until the visitor interacts again.
      const idle = !pointer && now - lastInput > 20000 && now - t0 > 20000;
      if (!reduce && visible && !idle) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    resize();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
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
        x: Math.min(0.97, Math.max(0.03, (e.clientX - rect.left) / rect.width)),
        y: Math.min(0.97, Math.max(0.12, (e.clientY - rect.top) / rect.height)),
      };
    };
    const onMove = (e: PointerEvent) => {
      pointer = toLocal(e);
      lastInput = performance.now();
      if (reduce) draw(lastInput);
      else start();
    };
    const onLeave = () => {
      pointer = null;
      lastInput = performance.now();
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const mo = new MutationObserver(() => {
      readColors();
      shownKey = "";
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
    <div className="overflow-hidden rounded-[1.75rem] border border-border-strong bg-surface">
      <div ref={wrapRef} className="relative aspect-[6/5] touch-pan-y sm:aspect-[16/9] lg:aspect-square">
        <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full font-mono" />
        <p className="label pointer-events-none absolute top-4 left-5 text-subtle">Fig. 0 / Vector search</p>
      </div>
      <div aria-hidden="true" className="border-t border-border px-5 py-3.5">
        <p className="label flex justify-between text-subtle">
          <span>Top results</span>
          <span>Similarity</span>
        </p>
        <ol ref={listRef} className="mt-2 space-y-1">
          {[0, 1, 2].map((r) => (
            <li key={r} data-row className="flex h-6 items-center gap-2.5 text-sm">
              <span className="num w-4 text-subtle">{r + 1}</span>
              <span data-dot className="h-2 w-2 shrink-0 rounded-full bg-border-strong" />
              <span data-title className="min-w-0 flex-1 truncate text-foreground" />
              <span data-score className="num font-mono text-[13px] text-accent" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
