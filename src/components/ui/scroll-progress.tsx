"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const update = () => {
      if (!barRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const ratio = max > 0 ? scrollTop / max : 0;
      barRef.current.style.transform = `scaleX(${ratio})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed top-0 left-0 right-0 z-60 h-0.5 origin-left bg-primary"
      style={{ transform: "scaleX(0)", willChange: "transform" }}
    />
  );
}
