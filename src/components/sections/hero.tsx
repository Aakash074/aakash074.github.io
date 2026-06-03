"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Briefcase, ChevronDown, User } from "lucide-react";
import Image from "next/image";

const HERO_STATS = [
  { label: "Years Building", value: "4+" },
  { label: "Products Shipped", value: "20+" },
  { label: "Industries", value: "6" },
];

export function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Purple glow orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-[#7c3aed]/[0.04] blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Avatar with glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-[#8b5cf6]/20 ring-offset-4 ring-offset-[#06080d]">
            {imgError ? (
              <div className="flex h-full w-full items-center justify-center bg-white/5">
                <User className="h-12 w-12 text-foreground/30" />
              </div>
            ) : (
              <Image
                src="/profile.png" alt="Aakash Kumar" fill
                className="object-cover" priority sizes="112px"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 px-4 py-1.5 text-sm text-foreground/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8b5cf6]" />
            </span>
            Available for consulting & AI engagements
          </span>
        </motion.div>

        {/* Name with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Aakash Kumar
          </span>
        </motion.h1>

        {/* Positioning */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60 sm:text-xl"
        >
          AI Product Engineer, Startup Operator, and Full Stack Architect.{" "}
          <span className="text-foreground/80">
            Building AI systems, fintech infrastructure, and internet products — from zero to scale.
          </span>
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex items-center gap-8 sm:gap-12"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold tracking-tight text-[#a78bfa]">{stat.value}</p>
              <p className="mt-1 text-xs text-foreground/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#7c3aed] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] active:scale-[0.98]"
          >
            <Briefcase className="h-4 w-4" /> View Work
          </a>
          <a
            href="https://calendly.com/aakashkumaar074/30min" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-white/5 px-6 py-3 text-sm font-medium text-foreground/80 backdrop-blur-sm transition-all hover:border-[#8b5cf6]/40 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Call <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground/50 transition-all hover:text-foreground/80 hover:bg-white/5"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <a
            href="https://t.me/aakash074" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground/50 transition-all hover:text-foreground/80 hover:bg-white/5"
          >
            Connect <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#work"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-xs text-foreground/20 transition-colors hover:text-foreground/40"
        >
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
