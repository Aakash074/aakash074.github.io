"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading
          label="Testimonials"
          title="Trusted by builders."
          description="Feedback from founders, clients, and collaborators."
        />

        <div className="mx-auto max-w-3xl">
          <Card delay={0.1} hover={false} className="text-center p-8 sm:p-12">
            <Quote className="mx-auto h-8 w-8 text-muted-foreground/30" />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground italic">
              &ldquo;Testimonials from clients, founders, and collaborators will appear here.
              If you&apos;ve worked with Aakash and would like to share your experience,
              please reach out.&rdquo;
            </p>
            <p className="mt-4 text-sm text-muted-foreground/60">
              — This section is a placeholder. No testimonials have been fabricated.
            </p>
          </Card>

          <p className="mt-8 text-center text-xs text-muted-foreground/50">
            Authentic testimonials only. This section will be populated with real feedback
            from verified collaborators and clients.
          </p>
        </div>
      </div>
    </section>
  );
}
