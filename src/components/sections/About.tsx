"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, Film, type LucideIcon, Music2, Server, Tv2 } from "lucide-react";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { CardLabel, GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import {
  aboutCraftTags,
  aboutInterestSections,
  aboutSectionContent,
  aboutStack,
} from "@/data/about";

const ICONS: Record<string, LucideIcon> = { Server, Film, Tv2, Music2 };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cell: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [showInterests, setShowInterests] = useState(false);

  return (
    <section id="about" className="pt-16 sm:pt-24 pb-4 sm:pb-6 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeader
            eyebrow={aboutSectionContent.section.eyebrow}
            titleLead={aboutSectionContent.section.titleLead}
            titleHighlight={aboutSectionContent.section.titleHighlight}
          />
        </motion.div>

        <motion.div
          ref={ref}
          variants={reducedMotion ? undefined : container}
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? false : inView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <motion.div
            variants={cell}
            className="glass col-span-2 sm:col-span-2 sm:row-span-2 rounded-2xl p-6 flex flex-col"
          >
            <CardLabel className="mb-4">{aboutSectionContent.whoIAmLabel}</CardLabel>
            <p className="text-foreground leading-relaxed mb-3">
              {aboutSectionContent.whoIAmParagraph1}
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {aboutSectionContent.whoIAmParagraph2}
            </p>
            <p className="text-xs text-muted-foreground/50 font-mono mt-auto pt-4">
              {aboutSectionContent.education}
            </p>
          </motion.div>

          <motion.div
            variants={cell}
            className="glass-amber rounded-2xl p-4 sm:p-5 flex flex-col justify-between"
          >
            <CardLabel variant="primary" className="mb-3">
              {aboutSectionContent.mantraLabel}
            </CardLabel>
            <blockquote className="flex-1 flex flex-col justify-center text-foreground/90 leading-snug">
              <p className="text-sm italic mb-2">
                &ldquo;{aboutSectionContent.mantraLine1} <br className="hidden sm:block" />
                {aboutSectionContent.mantraLine2}&rdquo;
              </p>
              <footer className="text-xs text-muted-foreground font-mono">
                — {aboutSectionContent.mantraAuthor}
              </footer>
            </blockquote>
          </motion.div>

          <motion.div variants={cell} className="glass rounded-2xl p-4 sm:p-5">
            <CardLabel className="mb-3">{aboutSectionContent.craftLabel}</CardLabel>
            <div className="flex flex-col gap-1">
              {aboutCraftTags.map((tag) => (
                <span key={tag} className="text-sm text-foreground/80 font-mono">
                  · {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cell} className="glass col-span-2 sm:col-span-2 rounded-2xl p-6">
            <CardLabel className="mb-4">{aboutSectionContent.stackLabel}</CardLabel>
            <div className="flex flex-wrap gap-1.5">
              {aboutStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default text-xs"
                >
                  {tech}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="border-primary/20 text-primary/60 cursor-default text-xs"
                title={aboutSectionContent.aiToolsTitle}
              >
                {aboutSectionContent.aiToolsLabel}
              </Badge>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-2">
          <button
            onClick={() => setShowInterests((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
            aria-expanded={showInterests}
            aria-controls="fun-facts-panel"
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform ${showInterests ? "rotate-180" : "rotate-0"}`}
            />
            {showInterests
              ? aboutSectionContent.interestsToggleLabelHide
              : aboutSectionContent.interestsToggleLabelShow}
          </button>

          <AnimatePresence>
            {showInterests && (
              <motion.div
                id="fun-facts-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {aboutInterestSections.map(({ icon, label, items, numbered }) => {
                    const Icon = ICONS[icon];
                    return (
                      <GlassCard key={label} size="sm" className="p-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Icon className="w-3 h-3 text-muted-foreground/60" />
                          <p className="text-[10px] font-mono text-muted-foreground uppercase">
                            {label}
                          </p>
                        </div>
                        <ul className="space-y-0.5">
                          {items.map((item, i) => (
                            <li
                              key={item}
                              className="text-xs text-foreground/70 flex items-center gap-1.5"
                            >
                              {numbered ? (
                                <span className="text-[9px] text-muted-foreground/40 font-mono tabular-nums">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              ) : (
                                <span className="text-muted-foreground/40 text-[10px]">·</span>
                              )}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </GlassCard>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
