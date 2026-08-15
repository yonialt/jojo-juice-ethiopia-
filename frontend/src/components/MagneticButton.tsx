"use client";

import { useRef, type ReactNode } from "react";

/**
 * Subtle magnetic attraction: the wrapped element drifts toward the cursor
 * (capped, so it never breaks the layout) and springs back on leave.
 * Mouse-only — touch input is unaffected.
 */
export default function MagneticButton({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    // Cap the pull so the element stays near its slot.
    const max = 10;
    const x = Math.max(-max, Math.min(max, dx * strength));
    const y = Math.max(-max, Math.min(max, dy * strength));
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block will-change-transform transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
