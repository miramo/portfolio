"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const GRID_SPACING = 28;
const DOT_RADIUS = 1;
const REPULSION_RADIUS = 110;
const MAX_DISPLACEMENT = 22;
const LERP_FACTOR = 0.1;
const BREATH_PERIOD_MS = 14000;

const EDGE_MASK = [
  "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
  "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
].join(", ");

export function InteractiveGrid() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pointer = { x: 0, y: 0, easedX: 0, easedY: 0, active: false };
    let width = 0;
    let height = 0;
    let dotColor = "";
    let frame = 0;

    const paint = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      if (pointer.active) {
        pointer.easedX += (pointer.x - pointer.easedX) * LERP_FACTOR;
        pointer.easedY += (pointer.y - pointer.easedY) * LERP_FACTOR;
      }

      let breathX = 0;
      let breathY = 0;
      if (!reducedMotion) {
        const t = (now % BREATH_PERIOD_MS) / BREATH_PERIOD_MS;
        const ping = t < 0.5 ? t * 2 : 2 - t * 2;
        const eased = ping < 0.5 ? 2 * ping * ping : -1 + (4 - 2 * ping) * ping;
        breathX = eased * 16;
        breathY = eased * 10;
      }

      ctx.fillStyle = dotColor;

      const cols = Math.ceil(width / GRID_SPACING) + 3;
      const rows = Math.ceil(height / GRID_SPACING) + 3;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = (i - 1) * GRID_SPACING + breathX;
          let y = (j - 1) * GRID_SPACING + breathY;

          if (pointer.active) {
            const dx = x - pointer.easedX;
            const dy = y - pointer.easedY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < REPULSION_RADIUS && dist > 0.1) {
              const force = (1 - dist / REPULSION_RADIUS) ** 2;
              x += (dx / dist) * force * MAX_DISPLACEMENT;
              y += (dy / dist) * force * MAX_DISPLACEMENT;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      paint(now);
      frame = requestAnimationFrame(loop);
    };

    const repaintIfStill = () => {
      if (reducedMotion) paint(0);
    };

    const readDotColor = () => {
      dotColor = getComputedStyle(document.documentElement).getPropertyValue("--grid-dot").trim();
      repaintIfStill();
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
      repaintIfStill();
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (!pointer.active) {
        pointer.easedX = pointer.x;
        pointer.easedY = pointer.y;
        pointer.active = true;
      }
    };

    const onMouseLeave = () => {
      pointer.active = false;
    };

    readDotColor();
    resize();

    const themeObserver = new MutationObserver(readDotColor);
    themeObserver.observe(document.documentElement, { attributeFilter: ["class"] });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (reducedMotion) {
      return () => {
        themeObserver.disconnect();
        resizeObserver.disconnect();
      };
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting) frame = requestAnimationFrame(loop);
    });
    visibilityObserver.observe(canvas);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
        style={{
          maskImage: EDGE_MASK,
          maskComposite: "intersect",
          WebkitMaskImage: EDGE_MASK,
          WebkitMaskComposite: "source-in",
        }}
      />
    </div>
  );
}
