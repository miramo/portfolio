"use client";

import { domAnimation, LazyMotion, MotionConfig, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig skipAnimations={reducedMotion}>{children}</MotionConfig>
    </LazyMotion>
  );
}
