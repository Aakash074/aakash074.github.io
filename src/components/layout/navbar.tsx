"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#ventures", label: "Client Work" },
  { href: "#skills", label: "Skills" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#06080d]/80 backdrop-blur-xl border-b border-[#8b5cf6]/10"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70">
            Aakash Kumar
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://calendly.com/aakashkumaar074/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#8b5cf6] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#7c3aed] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-[0.98]"
            >
              Book a Call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#06080d]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href} href={link.href} onClick={closeMobile}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="text-3xl font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://calendly.com/aakashkumaar074/30min" target="_blank"
                rel="noopener noreferrer" onClick={closeMobile}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-3 text-base font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                Book a Call <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
