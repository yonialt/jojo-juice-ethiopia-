"use client";

import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// Yellow-bottle sequence (241 frames). The studio white/gray backdrops were
// keyed to the page cream #f7f5f0 (see tools/key_backdrop.py) so the bottle
// floats seamlessly on the site background.
const FRAME_COUNT = 241;
const BG = "#f7f5f0";
// The source animation only explodes; play it forward, hold the peak, then
// reverse so the hero reads: bottle → ingredients build → full composition →
// ingredients exit → bottle alone.
const DEFAULT_ZOOM = 1.28;

function getFrameUrl(index: number) {
  return `/yellow-sequence/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;
}

// Scroll progress (0..1) → sequence frame (1..FRAME_COUNT).
// 0.00–0.30 the bottle idles alone (the hero lets the product breathe),
// 0.30–0.66 ingredients build around it, 0.66–0.80 the full composition
// holds, 0.80–0.90 ingredients exit, 0.90–1.00 the bottle is alone again,
// ready for the next section. Fully reversible: p maps to exactly one frame
// and every intermediate state is reachable in both directions.
function progressToFrame(p: number) {
  let t: number;
  if (p < 0.3) t = 0;
  else if (p < 0.66) t = (p - 0.3) / 0.36;
  else if (p < 0.8) t = 1;
  else if (p < 0.9) t = 1 - (p - 0.8) / 0.1;
  else t = 0;
  return Math.max(1, Math.min(FRAME_COUNT, Math.round(t * (FRAME_COUNT - 1)) + 1));
}

export default function CanvasSequence({
  progress,
  zoom = DEFAULT_ZOOM,
  shiftUpVh = 0,
}: {
  progress: MotionValue<number>;
  zoom?: number;
  shiftUpVh?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ambient glow gently breathes with the scrubbed timeline (subtle zoom as
  // the composition explodes, settling back for the final bottle pose). It
  // stays at rest while the bottle idles — no ambient motion competes with
  // the product.
  const glowScale = useTransform(progress, [0, 0.3, 0.66, 0.8, 1], [1, 1, 1.16, 1.16, 1]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const pendingFrameRef = useRef(1);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const [ready, setReady] = useState(false);

  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imagesRef.current[frame - 1];
    if (!canvas || !container || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, cw, ch);

    // "Contain" fit scaled by ZOOM: the frame fills the viewport, then zooms
    // toward its center so the bottle reads larger while the crop stays
    // centered (the bottle is framed at the image center in every frame).
    // shiftUpVh lifts the frame so the bottle sits in the upper half of the
    // viewport, leaving the lower void for the hero text + card.
    const canvasRatio = cw / ch;
    const imgRatio = img.width / img.height;
    let renderWidth: number, renderHeight: number, x: number, y: number;
    if (canvasRatio > imgRatio) {
      renderHeight = ch * zoom;
      renderWidth = ch * imgRatio * zoom;
      x = (cw - renderWidth) / 2;
      y = (ch - renderHeight) / 2 - (ch * shiftUpVh) / 100;
    } else {
      renderWidth = cw * zoom;
      renderHeight = (cw / imgRatio) * zoom;
      x = (cw - renderWidth) / 2;
      y = (ch - renderHeight) / 2 - (ch * shiftUpVh) / 100;
    }

    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  }, [zoom, shiftUpVh]);

  const scheduleDraw = useCallback(
    (frame: number) => {
      pendingFrameRef.current = Math.max(1, Math.min(FRAME_COUNT, frame));
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        drawFrame(pendingFrameRef.current);
      });
    },
    [drawFrame]
  );

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(i);
      if (i === 1) {
        img.onload = () => {
          setReady(true);
          scheduleDraw(1);
        };
      }
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      imagesRef.current = [];
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [scheduleDraw]);

  // Reduced motion: show the assembled bottle statically and don't drive the
  // frame sequence from scroll — the page still scrolls and reads normally.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      scheduleDraw(1);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [scheduleDraw]);

  useMotionValueEvent(progress, "change", (latest) => {
    scheduleDraw(reducedMotionRef.current ? 1 : progressToFrame(latest));
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => scheduleDraw(pendingFrameRef.current));
    ro.observe(container);
    return () => ro.disconnect();
  }, [scheduleDraw]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-primary-bg"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Warm ambient glow, above the canvas so it tints the cream void; its
          scale is scrubbed by the same master scroll timeline. Shared gradient
          spec with the Story section so the bottle's background treatment is
          consistent wherever the artwork is reused. */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(65%_55%_at_50%_50%,rgba(229,169,60,0.12),transparent_72%)]"
        style={{ scale: glowScale }}
      />

      {/* Minimal loading indicator */}
      {!ready && (
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent/70" />
        </div>
      )}
    </div>
  );
}
