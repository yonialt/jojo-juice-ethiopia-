"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/* Demo data                                                           */
/* ------------------------------------------------------------------ */

type Category = "Featured" | "Food" | "Drinks";

type Product = {
  id: string;
  name: string;
  price: string;
  categories: Category[];
  /** Transparent bottle render (crops live in public/images/). */
  image?: string;
  /** Fallback visual for demo SKUs without a render. */
  emoji?: string;
  tile?: string; // gradient utility classes for the emoji tile
  tag?: string;
};

const CATEGORIES: Category[] = ["Featured", "Food", "Drinks"];

const PRODUCTS: Product[] = [
  {
    id: "flavor-trio",
    name: "JoJo Flavor Trio",
    price: "From R5.44",
    categories: ["Featured"],
    image: "/images/trio.png",
    tag: "Bestseller",
  },
  {
    id: "yellow-mango",
    name: "Yellow Mango Juice",
    price: "From R0.81",
    categories: ["Featured", "Drinks"],
    image: "/images/yellow-bottle.png",
  },
  {
    id: "green-citrus",
    name: "Green Citrus Juice",
    price: "From R2.07",
    categories: ["Drinks"],
    image: "/images/green-bottle.png",
  },
  {
    id: "red-strawberry",
    name: "Red Strawberry Juice",
    price: "From R2.30",
    categories: ["Drinks"],
    image: "/images/red-bottle.png",
  },
  {
    id: "fruit-pops",
    name: "Cold-Press Fruit Pops",
    price: "From R1.25",
    categories: ["Food"],
    emoji: "🍓",
    tile: "from-rose-100 to-rose-50",
  },
  {
    id: "snack-bar",
    name: "Pressed Mango Snack Bar",
    price: "From R1.10",
    categories: ["Food"],
    emoji: "🥭",
    tile: "from-amber-100 to-amber-50",
  },
];

/** Faded JOJO brand wordmarks floating in the depth behind the stage. */
const BRANDS: { name: string; color: string }[] = [
  { name: "JOJO", color: "#1a1a1a" },
  { name: "JOJO JUICE", color: "#e5a93c" },
  { name: "JOJO MANGO", color: "#e8a33c" },
  { name: "JOJO CITRUS", color: "#7a9b3a" },
  { name: "JOJO STRAWBERRY", color: "#d65a4a" },
  { name: "JOJO", color: "#d48216" },
  { name: "JOJO JUICE", color: "#5f8f2f" },
];

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

const CARD_W = 224; // w-56
const CARD_H = 416;
const STAGE_H = 460;

type Pose = {
  x: number;
  scale: number;
  opacity: number;
  rotateY: number;
  z: number;
  zIndex: number;
};

/**
 * Map a circular offset from the active item (0 = center) to a 3D pose.
 * Center item: full size, full color, facing forward. Side items slide
 * out in a depth arc: smaller, dimmed, rotated away, pushed back in Z.
 */
function poseFor(offset: number): Pose {
  const abs = Math.abs(offset);
  if (abs === 0) {
    return { x: 0, scale: 1, opacity: 1, rotateY: 0, z: 0, zIndex: 40 };
  }
  const sign = offset > 0 ? 1 : -1;
  return {
    x: sign * (130 + abs * 170),
    scale: Math.max(0.55, 1 - abs * 0.22),
    opacity: Math.max(0, 1 - abs * 0.4),
    rotateY: -sign * 16 * abs,
    z: -abs * 180,
    zIndex: Math.max(0, 40 - abs * 10),
  };
}

/** Smallest circular offset from `active` to item `i` (wraps around). */
function cyclicOffset(i: number, active: number, count: number): number {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

// Own prefers-reduced-motion hook (same SSR-safe pattern as the hero:
// starts false so server and client renders agree, applies after mount).
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={dir === "left" ? "translate-x-[-1px]" : "translate-x-[1px]"}
      aria-hidden
    >
      {dir === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ProductCarousel() {
  const [category, setCategory] = useState<Category>("Featured");
  const [active, setActive] = useState(0);
  const reduce = usePrefersReducedMotion();

  const items = useMemo(
    () => PRODUCTS.filter((p) => p.categories.includes(category)),
    [category]
  );

  // Reset to the first item whenever the filter changes.
  useEffect(() => {
    setActive(0);
  }, [category]);

  const count = items.length;
  const activeClamped = Math.min(active, Math.max(0, count - 1));
  const go = (dir: 1 | -1) => {
    if (count === 0) return;
    setActive((a) => (a + dir + count) % count);
  };

  const spring = { type: "spring" as const, stiffness: 240, damping: 30 };

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header / filter bar */}
        <div className="flex flex-col items-center gap-7 text-center">
          <div>
            <p className="eyebrow mb-3">The Collection</p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-primary-text md:text-5xl">
              Pick your obsession.
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  category === c
                    ? "bg-primary-text text-white shadow-[0_10px_24px_-8px_rgba(26,26,26,0.35)]"
                    : "border border-primary-text/15 text-primary-text/55 hover:border-primary-text/40 hover:text-primary-text"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 3D carousel stage */}
        <div
          className="relative mt-14 w-full"
          style={{ height: STAGE_H, perspective: 1300 }}
        >
          {/* Floating brand wordmarks in the background depth */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
            {BRANDS.map((b, i) => {
              const left = `${12 + ((i * 17) % 62)}%`;
              const top = `${6 + ((i * 23) % 58)}%`;
              const baseRotate = (i % 2 === 0 ? -1 : 1) * (4 + (i % 3) * 4);
              const size = i % 2 === 0 ? "text-7xl md:text-8xl" : "text-6xl md:text-7xl";
              return (
                <motion.span
                  key={b.name}
                  className={`absolute select-none whitespace-nowrap font-black italic tracking-tighter opacity-[0.07] ${size}`}
                  style={{ left, top, color: b.color }}
                  animate={
                    reduce
                      ? undefined
                      : { y: [0, -12, 0], rotate: [baseRotate, baseRotate + 2.5, baseRotate] }
                  }
                  transition={{
                    duration: 9 + (i % 5) * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }}
                >
                  {b.name}
                </motion.span>
              );
            })}
          </div>

          {/* Carousel items */}
          {items.map((p, i) => {
            const offset = cyclicOffset(i, activeClamped, count);
            const pose = poseFor(offset);
            const isActive = offset === 0;
            return (
              <motion.div
                key={p.id}
                initial={false}
                animate={{
                  x: pose.x,
                  scale: pose.scale,
                  opacity: pose.opacity,
                  rotateY: pose.rotateY,
                  z: pose.z,
                }}
                transition={spring}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  zIndex: pose.zIndex,
                  transformPerspective: 1300,
                  cursor: "pointer",
                }}
                onClick={() => setActive(i)}
                className="w-56"
              >
                <div
                  className={`flex h-[416px] flex-col overflow-hidden rounded-3xl border p-4 transition-colors duration-300 ${
                    isActive
                      ? "border-primary-text/10 bg-white shadow-[0_30px_70px_-24px_rgba(26,26,26,0.35)]"
                      : "border-primary-text/5 bg-white/70 shadow-[0_16px_40px_-24px_rgba(26,26,26,0.18)]"
                  }`}
                >
                  <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-secondary-bg">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="224px"
                        className="object-contain"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${p.tile ?? ""}`}
                      >
                        <span className="text-7xl drop-shadow-sm">{p.emoji}</span>
                      </div>
                    )}
                    {p.tag && isActive && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-primary-text">{p.name}</p>
                      <p className="mt-0.5 text-xs text-primary-text/55">{p.price}</p>
                    </div>
                    <button
                      aria-label={`Add ${p.name} to cart`}
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-text text-white shadow-sm transition-transform duration-300 hover:scale-110"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation controls */}
        <div className="relative mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous product"
            className="grid size-12 place-items-center rounded-full border border-primary-text/10 bg-white text-primary-text shadow-[0_10px_28px_-10px_rgba(26,26,26,0.25)] transition-transform duration-300 hover:scale-110 hover:text-accent-deep"
          >
            <Chevron dir="left" />
          </button>
          <div className="flex items-center gap-1.5">
            {items.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                aria-label={`Go to ${p.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeClamped
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-primary-text/20 hover:bg-primary-text/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next product"
            className="grid size-12 place-items-center rounded-full border border-primary-text/10 bg-white text-primary-text shadow-[0_10px_28px_-10px_rgba(26,26,26,0.25)] transition-transform duration-300 hover:scale-110 hover:text-accent-deep"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
