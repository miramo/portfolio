"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false;

  return <MotionConfig skipAnimations={reducedMotion}>{children}</MotionConfig>;
}
