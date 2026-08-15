"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the app in Lenis inertia smooth scrolling, synced with GSAP
 * ScrollTrigger so scrubbed animations follow the smoothed scroll position.
 * Respects prefers-reduced-motion (native scrolling, no smoothing) and
 * smooth-scrolls anchor links (nav + CTA buttons) through Lenis.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });

    // Keep GSAP ScrollTrigger in sync with the Lenis-driven scroll position.
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
