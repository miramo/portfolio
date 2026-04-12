"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const GRID_SPACING = 28;
const DOT_RADIUS = 1;
const REPULSION_RADIUS = 110;
const MAX_DISPLACEMENT = 22;
const LERP_FACTOR = 0.1;

const EDGE_MASK = [
  "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
  "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
].join(", ");

export function InteractiveGrid() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, cx: 0, cy: 0, active: false });
  const isDarkRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const maybeCanvas = canvasRef.current;
    const maybeCtx = maybeCanvas?.getContext("2d");
    if (!maybeCanvas || !maybeCtx) return;

    const canvas: HTMLCanvasElement = maybeCanvas;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    let width = 0;
    let height = 0;

    isDarkRef.current = document.documentElement.classList.contains("dark");
    const themeObserver = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ["class"] });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height);

      const m = mouseRef.current;
      if (m.active) {
        m.cx += (m.x - m.cx) * LERP_FACTOR;
        m.cy += (m.y - m.cy) * LERP_FACTOR;
      }

      let breathX = 0;
      let breathY = 0;
      if (!reducedMotion) {
        const t = (now % 14000) / 14000;
        const ping = t < 0.5 ? t * 2 : 2 - t * 2;
        const eased = ping < 0.5 ? 2 * ping * ping : -1 + (4 - 2 * ping) * ping;
        breathX = eased * 16;
        breathY = eased * 10;
      }

      ctx.fillStyle = isDarkRef.current ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.20)";

      const cols = Math.ceil(width / GRID_SPACING) + 3;
      const rows = Math.ceil(height / GRID_SPACING) + 3;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = (i - 1) * GRID_SPACING + breathX;
          let y = (j - 1) * GRID_SPACING + breathY;

          if (!reducedMotion && m.active) {
            const dx = x - m.cx;
            const dy = y - m.cy;
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

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    const onMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      if (!mouseRef.current.active) {
        mouseRef.current.cx = mouseRef.current.x;
        mouseRef.current.cy = mouseRef.current.y;
        mouseRef.current.active = true;
      }
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      themeObserver.disconnect();
      ro.disconnect();
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
