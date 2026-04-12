"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ContactCta } from "@/components/sections/ContactCta";

export function Contact() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="pt-10 sm:pt-14 pb-16 sm:pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">Next Step</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Let&apos;s build something great together.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Open to full-time roles, contracts, consulting, or just a conversation about backend
            systems, engineering culture, and clean code.
          </p>
          <ContactCta />
        </motion.div>
      </div>
    </section>
  );
}
