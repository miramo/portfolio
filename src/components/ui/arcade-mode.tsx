"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { arcadeModeContent } from "@/data/arcade";
import { KonamiCode } from "@/packages/secret-gestures";

const BANNER_DURATION_MS = 5000;

const flickerTransition = {
  duration: 2.4,
  ease: "easeInOut" as const,
  repeat: Number.POSITIVE_INFINITY,
};

export function ArcadeMode() {
  const [enabled, setEnabled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const enabledRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let code = KonamiCode.idle();

    const switchTo = (next: boolean) => {
      enabledRef.current = next;
      setEnabled(next);
      setShowBanner(next);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        switchTo(false);
        return;
      }

      code = code.press(event.key);
      if (!code.unlocked) return;

      code = KonamiCode.idle();
      switchTo(!enabledRef.current);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("arcade", enabled);
    if (!enabled) return;

    const id = setTimeout(() => setShowBanner(false), BANNER_DURATION_MS);
    return () => clearTimeout(id);
  }, [enabled]);

  return (
    <>
      {enabled && (
        <motion.div
          aria-hidden="true"
          className={
            reducedMotion ? "arcade-scanlines" : "arcade-scanlines arcade-scanlines--rolling"
          }
          initial={reducedMotion ? false : { opacity: 0.78 }}
          animate={reducedMotion ? false : { opacity: [0.78, 0.94, 0.82, 0.9, 0.78] }}
          transition={flickerTransition}
        />
      )}

      <div role="status" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {showBanner && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={reducedMotion ? false : { opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 px-5 py-3 rounded-full glass font-mono text-xs"
            >
              <span className="text-primary font-bold tracking-[0.2em] uppercase">
                {arcadeModeContent.scoreLabel}
              </span>
              <span className="text-foreground font-semibold tracking-wider uppercase">
                {arcadeModeContent.bannerTitle}
              </span>
              <span className="hidden sm:inline text-muted-foreground">
                {arcadeModeContent.bannerHint}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
