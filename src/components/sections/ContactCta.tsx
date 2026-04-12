"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { EMAIL } from "@/data/constants";

export function ContactCta() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={`mailto:${EMAIL}`}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -2, scale: 1.01, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }
      }
      whileTap={reducedMotion ? undefined : { scale: 0.99 }}
      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      Get in touch
      <ArrowRight className="w-4 h-4" />
    </motion.a>
  );
}
