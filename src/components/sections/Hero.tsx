"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/constants";
import { heroCyclingWords, heroSectionContent } from "@/data/hero";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const btnHover = {
  y: -4,
  scale: 1.018,
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
};
const ghostBtnHover = {
  y: -3,
  scale: 1.02,
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};
const btnTap = { scale: 0.98 };
const btnBoxShadow =
  "0 10px 32px -8px oklch(from var(--primary) l c h / 0.4), inset 0 1px 2px rgba(255,255,255,0.2)";
const sheenTransition = {
  duration: 2.2,
  ease: [0.22, 1, 0.36, 1] as const,
  repeat: Number.POSITIVE_INFINITY,
  repeatDelay: 2.2,
};
const glowTransition = {
  duration: 2,
  ease: "easeInOut" as const,
  repeat: Number.POSITIVE_INFINITY,
};
const chevronHover = { y: 2, x: 1 };

export function Hero() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroCyclingWords.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      <InteractiveGrid />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 sm:pt-24 pb-10 sm:pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 sm:gap-8 lg:gap-20">
          <motion.div
            variants={reducedMotion ? undefined : container}
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? false : "show"}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.p
              variants={item}
              className="text-[10px] sm:text-xs font-mono text-primary/70 mb-3 sm:mb-6 tracking-wider sm:tracking-[0.2em] uppercase"
            >
              {heroSectionContent.section.roleLine}
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4"
            >
              <span className="text-gradient">{heroSectionContent.section.firstName}</span>
              <br />
              <span className="text-foreground/90">{heroSectionContent.section.lastName}</span>
            </motion.h1>

            <motion.div
              variants={item}
              className="h-8 mb-5 sm:mb-8 flex items-center justify-center lg:justify-start"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-lg text-muted-foreground font-light italic"
                >
                  {heroCyclingWords[index]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#experience"
                whileHover={reducedMotion ? undefined : btnHover}
                whileFocus={reducedMotion ? undefined : btnHover}
                whileTap={reducedMotion ? undefined : btnTap}
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-opacity shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto"
                style={!reducedMotion ? { boxShadow: btnBoxShadow } : undefined}
              >
                {!reducedMotion && (
                  <>
                    <motion.span
                      aria-hidden="true"
                      initial={{ x: "-140%" }}
                      animate={{ x: "260%" }}
                      transition={sheenTransition}
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/40 blur-lg"
                    />
                    <motion.span
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={glowTransition}
                      className="pointer-events-none absolute inset-0 rounded-full bg-white/20 blur-sm"
                    />
                  </>
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  {heroSectionContent.journeyCtaLabel}
                  <motion.span
                    whileHover={reducedMotion ? undefined : chevronHover}
                    whileFocus={reducedMotion ? undefined : chevronHover}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </span>
              </motion.a>
              <motion.a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reducedMotion ? undefined : ghostBtnHover}
                whileFocus={reducedMotion ? undefined : ghostBtnHover}
                whileTap={reducedMotion ? undefined : btnTap}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-foreground font-semibold text-sm hover:[--glass-border-color:var(--color-primary)] hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {heroSectionContent.githubLabel}
              </motion.a>
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reducedMotion ? undefined : ghostBtnHover}
                whileFocus={reducedMotion ? undefined : ghostBtnHover}
                whileTap={reducedMotion ? undefined : btnTap}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-foreground font-semibold text-sm hover:[--glass-border-color:var(--color-primary)] hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {heroSectionContent.linkedInLabel}
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={reducedMotion ? false : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative shrink-0 order-1 lg:order-2"
          >
            <div className="relative w-28 h-28 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl scale-110 dark:bg-primary/15" />
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-primary/35 dark:ring-primary/25">
                <Image
                  src="/avatar.webp"
                  alt={heroSectionContent.avatarAlt}
                  fill
                  sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 112px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
