"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; t: number };

const TRAIL_MS = 260;
const MAX_POINTS = 24;

/**
 * A Tron-style glowing light trail that follows the cursor — a full-window
 * canvas overlay, pointer-events: none so it never blocks clicks. Skipped
 * entirely on touch devices and when prefers-reduced-motion is set.
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const accentColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent-text").trim() ||
      "#db4d4d";

    let points: Point[] = [];
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    function handleMove(e: MouseEvent) {
      lastX = e.clientX;
      lastY = e.clientY;
      hasMoved = true;
      points.push({ x: lastX, y: lastY, t: performance.now() });
      if (points.length > MAX_POINTS) points.shift();
    }
    window.addEventListener("mousemove", handleMove, { passive: true });

    let raf = 0;
    function draw() {
      const now = performance.now();
      points = points.filter((p) => now - p.t < TRAIL_MS);

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      if (hasMoved && points.length > 1) {
        const accent = accentColor();

        for (let i = 1; i < points.length; i++) {
          const a = points[i - 1];
          const b = points[i];
          const age = (now - b.t) / TRAIL_MS; // 0 = fresh, 1 = expired
          const alpha = Math.max(0, 1 - age);

          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.lineCap = "round";
          ctx!.lineJoin = "round";
          ctx!.strokeStyle = accent;
          ctx!.globalAlpha = alpha * 0.85;
          ctx!.lineWidth = 2.5 * alpha + 0.5;
          ctx!.shadowBlur = 14 * alpha;
          ctx!.shadowColor = accent;
          ctx!.stroke();
        }

        // Bright core at the current position
        const head = points[points.length - 1];
        ctx!.globalAlpha = 1;
        ctx!.shadowBlur = 18;
        ctx!.shadowColor = accent;
        ctx!.fillStyle = accent;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.globalAlpha = 1;
        ctx!.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 999,
        mixBlendMode: "screen",
      }}
    />
  );
}
