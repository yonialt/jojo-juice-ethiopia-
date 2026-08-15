"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Our own prefers-reduced-motion hook (framer's useReducedMotion caches the
// media query at first module init, so SSR locks it to false). Starts from
// `false` so server and client renders agree, then applies the real
// preference after mount — same pattern as the hero.
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

// Tight spring for the peek-out pop.
const springConfig = {
  type: "spring" as const,
  stiffness: 140,
  damping: 16,
};

/**
 * Peek-a-boo flavor lineup: the Yellow bottle stands front and center,
 * always visible and strictly upright, while the Green and Red bottles are
 * tucked almost completely behind it and peek out slightly on scroll — a
 * subtle fan shape behind the hero bottle. Fully static under
 * prefers-reduced-motion.
 */
export default function FlavorTrioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const reduce = usePrefersReducedMotion();
  const shown = reduce || isInView;

  return (
    <section className="relative overflow-hidden bg-primary-bg px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-12">
        {/* Left column — editorial copy + CTA */}
        <div className="space-y-6">
          <p className="eyebrow">01 — Our Flavors</p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-primary-text md:text-5xl">
            Three obsessions.
            <br />
            One perfect pour.
          </h2>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-primary-text/65">
            Classic Yellow Mango upfront, backed by Energizing Green Citrus and
            Vibrant Red Strawberry peeking right behind.
          </p>
          <a
            href="#ingredients"
            className="inline-block rounded-full bg-gradient-to-r from-accent to-accent-deep px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(229,169,60,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_36px_rgba(229,169,60,0.5)]"
          >
            Explore Flavors
          </a>
        </div>

        {/* Right column — peek-a-boo bottle trio. The Yellow bottle is always
            visible and centered; Green/Red start tucked behind it (opacity 0)
            and fan out slightly on scroll. */}
        <div
          ref={containerRef}
          className="relative flex h-[460px] items-center justify-center sm:h-[500px]"
        >
          {/* Green JoJo (left, tucked behind yellow) */}
          <motion.div
            initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.85 }}
            animate={
              shown ? { opacity: 1, x: -35, rotate: -8, scale: 0.95 } : { opacity: 0 }
            }
            transition={{ ...springConfig, delay: 0.1 }}
            className="absolute left-1/2 top-1/2 z-20 h-[360px] w-44 -translate-x-1/2 -translate-y-1/2 sm:h-[400px] sm:w-48"
          >
            <Image
              src="/images/bottle-green.png"
              alt="JoJo Green Citrus flavor"
              fill
              className="object-contain drop-shadow-md"
            />
          </motion.div>

          {/* Yellow JoJo (center foreground — always visible, strictly upright) */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-30 h-[420px] w-52 -translate-x-1/2 -translate-y-1/2 sm:h-[460px] sm:w-56"
          >
            <Image
              src="/images/bottle-yellow.png"
              alt="JoJo Yellow Mango flavor"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Red JoJo (right, tucked behind yellow) */}
          <motion.div
            initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.85 }}
            animate={
              shown ? { opacity: 1, x: 35, rotate: 8, scale: 0.95 } : { opacity: 0 }
            }
            transition={{ ...springConfig, delay: 0.15 }}
            className="absolute left-1/2 top-1/2 z-20 h-[360px] w-44 -translate-x-1/2 -translate-y-1/2 sm:h-[400px] sm:w-48"
          >
            <Image
              src="/images/bottle-red.png"
              alt="JoJo Red Strawberry flavor"
              fill
              className="object-contain drop-shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
