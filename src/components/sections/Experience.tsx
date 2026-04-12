"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { experiences, experienceSectionContent } from "@/data/experience";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  const featured = experiences.find((e) => e.featured)!;
  const rest = experiences.filter((e) => !e.featured);

  return (
    <section id="experience" className="pt-10 sm:pt-16 pb-16 sm:pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionHeader
            eyebrow={experienceSectionContent.section.eyebrow}
            titleLead={experienceSectionContent.section.titleLead}
            titleHighlight={experienceSectionContent.section.titleHighlight}
          />
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass-amber rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex flex-col gap-0">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-2xl font-bold text-primary">{featured.company}</h3>
                <time
                  dateTime={featured.dateTime}
                  className="hidden sm:block text-sm font-mono text-muted-foreground shrink-0"
                >
                  {featured.period}
                </time>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-muted-foreground">{featured.role}</p>
                <p className="hidden sm:block text-xs text-muted-foreground/60 shrink-0">
                  {featured.location}
                </p>
              </div>
              <p className="sm:hidden text-xs font-mono text-muted-foreground/50">
                {featured.period} · {featured.location}
              </p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {featured.description}
          </p>

          {featured.achievements && (
            <ul className="space-y-2 mb-6">
              {featured.achievements.map((ach, i) => (
                <li key={i} className="flex items-baseline gap-3 text-sm text-foreground/80">
                  <span className="text-primary shrink-0">›</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5">
            {featured.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-primary/30 text-primary/70 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-border via-border to-transparent ml-1.75 hidden sm:block" />

          <motion.div
            ref={ref}
            variants={reducedMotion ? undefined : container}
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? false : inView ? "show" : "hidden"}
            className="space-y-4"
          >
            {rest.map((exp) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                variants={cardVariant}
                className="sm:pl-10 relative"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.75 h-3.75 rounded-full border-2 border-border bg-background hidden sm:block" />

                <div className="glass rounded-xl px-6 py-4 flex flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-medium text-foreground">{exp.company}</h3>
                      <time
                        dateTime={exp.dateTime}
                        className="hidden sm:block text-xs font-mono text-muted-foreground shrink-0"
                      >
                        {exp.period}
                      </time>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">{exp.role}</p>
                      <p className="hidden sm:block text-xs text-muted-foreground/50 shrink-0">
                        {exp.location}
                      </p>
                    </div>
                    <p className="sm:hidden text-xs font-mono text-muted-foreground/50">
                      {exp.period} · {exp.location}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-muted-foreground/60">{exp.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exp.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-border/40 text-muted-foreground/60 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/cv"
            className="group inline-flex items-center gap-1.5 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            View full résumé
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
