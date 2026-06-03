"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa]">
        {label}
      </span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 max-w-2xl text-base leading-relaxed text-foreground/50",
          align === "center" && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
