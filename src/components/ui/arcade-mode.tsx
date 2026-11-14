"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  type ActionDispatch,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { arcadeModeContent } from "@/data/arcade";
import { KonamiCode, TapStreak } from "@/packages/secret-gestures";

const BANNER_DURATION_MS = 5000;

const flickerTransition = {
  duration: 2.4,
  ease: "easeInOut" as const,
  repeat: Number.POSITIVE_INFINITY,
};

type Mode = "off" | "announcing" | "on";

interface ArcadeState {
  mode: Mode;
  code: KonamiCode;
  streak: TapStreak;
}

type ArcadeAction =
  { type: "key"; key: string } | { type: "tap"; at: number } | { type: "announced" };

const initialState: ArcadeState = {
  mode: "off",
  code: KonamiCode.idle(),
  streak: TapStreak.idle(),
};

const toggled = (mode: Mode): Mode => (mode === "off" ? "announcing" : "off");

function arcadeReducer(state: ArcadeState, action: ArcadeAction): ArcadeState {
  switch (action.type) {
    case "key": {
      if (action.key === "Escape") return { ...state, mode: "off" };

      const code = state.code.press(action.key);
      return code.unlocked
        ? { ...state, mode: toggled(state.mode), code: KonamiCode.idle() }
        : { ...state, code };
    }
    case "tap": {
      const streak = state.streak.tap(action.at);
      return streak.unlocked
        ? { ...state, mode: toggled(state.mode), streak: TapStreak.idle() }
        : { ...state, streak };
    }
    case "announced":
      return state.mode === "announcing" ? { ...state, mode: "on" } : state;
  }
}

const ignoredOutsideTheArcade: ActionDispatch<[ArcadeAction]> = () => undefined;

const ArcadeCtx = createContext(ignoredOutsideTheArcade);

export function useArcade() {
  const dispatch = useContext(ArcadeCtx);
  return { tap: (at: number) => dispatch({ type: "tap", at }) };
}

export function ArcadeMode({ children }: { children: ReactNode }) {
  const [{ mode }, dispatch] = useReducer(arcadeReducer, initialState);
  const enabled = mode !== "off";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => dispatch({ type: "key", key: event.key });

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("arcade", enabled);
  }, [enabled]);

  useEffect(() => {
    if (mode !== "announcing") return;

    const id = setTimeout(() => dispatch({ type: "announced" }), BANNER_DURATION_MS);
    return () => clearTimeout(id);
  }, [mode]);

  return (
    <ArcadeCtx value={dispatch}>
      {children}

      {enabled && (
        <m.div
          aria-hidden="true"
          className="arcade-scanlines arcade-scanlines--rolling"
          initial={{ opacity: 0.78 }}
          animate={{ opacity: [0.78, 0.94, 0.82, 0.9, 0.78] }}
          transition={flickerTransition}
        />
      )}

      <div role="status" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {mode === "announcing" && (
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
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
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </ArcadeCtx>
  );
}
