"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { arcadeModeContent } from "@/data/arcade";
import { KonamiCode, TapStreak } from "@/packages/secret-gestures";

const BANNER_DURATION_MS = 5000;

const flickerTransition = {
  duration: 2.4,
  ease: "easeInOut" as const,
  repeat: Number.POSITIVE_INFINITY,
};

interface ArcadeContextValue {
  tap: (at: number) => void;
}

const ArcadeCtx = createContext<ArcadeContextValue>({ tap: () => {} });

export function useArcade(): ArcadeContextValue {
  return useContext(ArcadeCtx);
}

export function ArcadeMode({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const enabledRef = useRef(false);
  const streakRef = useRef(TapStreak.idle());
  const reducedMotion = useReducedMotion();

  const switchTo = useCallback((next: boolean) => {
    enabledRef.current = next;
    setEnabled(next);
    setShowBanner(next);
  }, []);

  const tap = useCallback(
    (at: number) => {
      streakRef.current = streakRef.current.tap(at);
      if (!streakRef.current.unlocked) return;

      streakRef.current = TapStreak.idle();
      switchTo(!enabledRef.current);
    },
    [switchTo]
  );

  useEffect(() => {
    let code = KonamiCode.idle();

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
  }, [switchTo]);

  useEffect(() => {
    document.documentElement.classList.toggle("arcade", enabled);
    if (!enabled) return;

    const id = setTimeout(() => setShowBanner(false), BANNER_DURATION_MS);
    return () => clearTimeout(id);
  }, [enabled]);

  return (
    <ArcadeCtx.Provider value={{ tap }}>
      {children}

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
    </ArcadeCtx.Provider>
  );
}
