"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-sm sm:p-12 md:p-16"
      >
        {/* Background accents */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--foreground) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--accent-blue, #4f6ef7) 0%, transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something ambitious.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Available for AI consulting, startup engineering leadership, and
            high-impact product development. If you&apos;re building at the
            intersection of AI, Web3, and product — let&apos;s talk.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://calendly.com/aakashkumaar074/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              <Calendar className="h-4 w-4" />
              Book a Call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:aakashkumaar074@gmail.com"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-all hover:bg-foreground hover:text-background hover:border-foreground hover:scale-[1.05] active:scale-[0.95]"
              aria-label="Email Aakash"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-4 text-xs text-muted-foreground/60">
            Also on{" "}
            <a
              href="https://t.me/aakash074"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Telegram @aakash074
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
