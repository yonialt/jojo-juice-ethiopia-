"use client";

import { useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, useSyncExternalStore, type Ref } from "react";
import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";
import FlavorTrioSection from "@/components/FlavorTrioSection";
import ProductCarousel from "@/components/ProductCarousel";
//import IngredientsSection from "@/components/IngredientsSection";
import PricingSection from "@/components/PricingSection";
import StorySection from "@/components/StorySection";
import SpecsSection from "@/components/SpecsSection";
import NewProductsSection from "@/components/NewProductsSection";
import ClosingSection from "@/components/ClosingSection";

gsap.registerPlugin(ScrollTrigger);

const RUNWAY_HEIGHT = 500;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

// Our own prefers-reduced-motion hook. framer-motion's useReducedMotion caches
// the media-query result at first module init (SSR has no matchMedia, so it
// locks in `false`); useSyncExternalStore reads the query directly and is
// SSR-safe (the server snapshot is `false`, so the server render and first
// client render agree — React 19 refuses to patch mismatched attributes).
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

// Hero statement — minimal editorial typography set directly in the
// composition (upper-left on desktop, above the bottle on small screens).
// Never a card: large, short, confident. On desktop it stacks four short
// lines in the side void beside the bottle; on small screens it becomes two
// lines so it always clears the product's safe zone.
//
// It is part of the opening composition: the GSAP entrance timeline reveals
// it and it stays visible while the bottle idles, then the scrubbed scroll
// timeline dissolves it before the ingredients begin their build.
function HeroStatement({ entranceRef }: { entranceRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={entranceRef}
      style={{ opacity: 0 }}
      className="pointer-events-none fixed inset-x-0 top-[14vh] z-10 flex flex-col items-center px-6 text-center lg:top-[17vh] lg:items-start lg:px-[6vw] lg:text-left"
    >
    </div>
  );
}

// Subtle scroll indicator pinned at the foot of the viewport — the only
// ambient motion in the hero is the small accent dot easing down the hairline
// (see .cue-dot in globals.css). Revealed by the entrance timeline, visible
// while the bottle idles, and fades out as the ingredients start their build.
function ScrollCue({ entranceRef }: { entranceRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={entranceRef}
      style={{ opacity: 0 }}
      className="pointer-events-none fixed inset-x-0 bottom-[6.5vh] z-10 flex flex-col items-center gap-3"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-primary-text/40">
        Scroll
      </span>
      <span className="relative block h-9 w-px bg-primary-text/12">
        <span className="cue-dot absolute left-1/2 top-0 h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
    </div>
  );
}

// Tiny editorial annotations that frame the product during the hero and the
// composition — not UI cards, just art-direction labels with thin rules.
// Desktop only: on small screens the bottle fills the width and there is no
// room. Revealed by the entrance timeline (each label is a [data-hero-label]
// target for the stagger), visible while the bottle idles and through the
// build, then dissolves before the next section.
function EditorialLabels({ entranceRef }: { entranceRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={entranceRef}
      aria-hidden
      style={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-10 hidden lg:block"
    >

    </div>

  );
}

// The shot settles on the bottle alone; the wordmark fades in below it, then
// the next section continues the scroll like one camera move.
function FinaleWordmark({ entranceRef }: { entranceRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={entranceRef}
      style={{ opacity: 0 }}
      className="pointer-events-none fixed inset-x-0 top-[78vh] z-10 flex flex-col items-center gap-2.5"
    >

      <span className="h-px w-8 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
    </div>
  );
}

export default function Page() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = usePrefersReducedMotion();

  // Entrance-timeline targets — the load-time composition the scroll sequence
  // hands off to. The product wrapper only carries the entrance opacity fade:
  // it spans the full runway height so the sticky canvas inside stays pinned
  // for the whole scroll (the entrance scale + ambient float live on the
  // canvas container itself, which the wrapper's height must never constrain).
  const productRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // Bottle scale and placement are responsive. Zoom crops into the portrait
  // 864x1056 frame (the bottle occupies ~50% of frame height), so 1.12 renders
  // the bottle at ~56% of viewport height on desktop and 1.6 at ~46% on small
  // screens — a big hero presence, with the ingredient composition still
  // mostly in frame at its peak. shiftUpVh re-centers the bottle vertically
  // once the cropped frame is taller than the viewport.
  const canvasZoom = isDesktop ? 1.12 : 1.6;
  const shiftUpVh = isDesktop ? 7 : 0;

  // Master scrubbed timeline for the product sequence: a GSAP ScrollTrigger
  // scrubs a proxy 0→1 across the runway, driving the canvas frame index (the
  // bottle's pose). Fully reversible — the progress is a pure function of
  // scroll position.
  const canvasProgress = useMotionValue(0);
  useEffect(() => {
    const el = runwayRef.current;
    if (!el) return;
    const proxy = { value: 0 };
    const tween = gsap.to(proxy, {
      value: 1,
      ease: "none",
      // Read the scrubbed value from the tween itself — the trigger's own
      // onUpdate fires before the tween renders, so it would lag one frame.
      onUpdate: () => canvasProgress.set(proxy.value),
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [canvasProgress]);

  // Load-time cinematic entrance + scroll-driven composition fades — one GSAP
  // master timeline choreographs the opening (product settles into focus,
  // headline reveals, editorial labels stagger in, scroll cue fades up, then
  // the bottle breathes with a gentle ambient float), and a second scrubbed
  // timeline dissolves the overlays as the ingredients build (cue → statement
  // → labels) and reveals the finale wordmark at the end of the runway.
  //
  // GSAP writes inline styles directly, so the scroll fade is plain JS-driven
  // and perfectly reversible — deliberately NOT framer-motion useTransform,
  // which compiles scroll-linked opacity into a CSS ViewTimeline animation
  // that reverts to its base value once its keyframe range ends (the statement
  // would "un-fade" and stay visible through the whole composition).
  //
  // All targets start hidden in the same composition the scroll sequence later
  // drives, so the two timelines hand off seamlessly (scroll values at
  // progress 0 = the entrance end state). Killed on unmount; skipped entirely
  // under prefers-reduced-motion (everything stays visible statically).
  useEffect(() => {
    const el = runwayRef.current;
    const product = productRef.current;
    // The canvas container (sticky, h-screen) lives inside the wrapper; find
    // it directly so the entrance scale + ambient float never constrain the
    // wrapper's height (which must span the whole runway for sticky pinning).
    const canvas = product?.querySelector(".sticky");
    const statement = statementRef.current;
    const labels = labelsRef.current;
    const cue = cueRef.current;
    const wordmark = wordmarkRef.current;
    if (!el || !product || !canvas || !statement || !labels || !cue || !wordmark) return;

    if (reduceMotion) {
      // Static composition: everything visible, no motion.
      gsap.set([product, canvas, statement, labels, cue, wordmark], { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // --- Load-time cinematic entrance ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // The wrapper fades in (opacity only — its height spans the whole
      // runway so the sticky canvas stays pinned), while the canvas container
      // settles into focus with a subtle scale.
      tl.fromTo(product, { opacity: 0 }, { opacity: 1, duration: 1.1 }, 0.1)
        .fromTo(
          canvas,
          { scale: 0.94 },
          { scale: 1, duration: 1.1 },
          0.1
        )
        .fromTo(
          statement,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.7
        )
        .fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9)
        .fromTo(
          labels.querySelectorAll("[data-hero-label]"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          0.9
        )
        .fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.1);

      // Ambient float — the bottle breathes in place, very subtly, while the
      // hero idles. Applied to the canvas container (not the wrapper, whose
      // height must stay the full runway for the sticky pinning). Starts after
      // the entrance settles.
      gsap.to(canvas, {
        y: -5,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2.2,
      });

      // --- Scroll-driven composition fades (scrubbed, reversible) ---
      const scrub = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
      scrub
        .to(cue, { opacity: 0, duration: 0.07 }, 0.15)
        .to(statement, { opacity: 0, y: -24, duration: 0.1 }, 0.18)
        .to(labels, { opacity: 0, duration: 0.12 }, 0.3)
        .to(wordmark, { opacity: 1, duration: 0.06 }, 0.9);
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <main className="relative w-full bg-primary-bg">
      <Navbar />

      {/* overflow-x: clip keeps the off-canvas slide-in text from expanding the
          scrollable area, without creating a scroll container (sticky canvas
          keeps sticking to the viewport) */}
      <div
        ref={runwayRef}
        className="relative w-full overflow-x-clip"
        style={{ height: `${RUNWAY_HEIGHT}vh` }}
      >
        {/* The product: bottle alone → ingredients build → full composition →
            ingredients exit → bottle alone, driven by the single scroll
            timeline. The wrapper spans the full runway height (h-full) so the
            sticky canvas inside stays pinned for the whole scroll; it only
            carries the entrance opacity fade. The entrance scale + ambient
            float live on the sticky canvas container itself. */}
        <div ref={productRef} style={{ opacity: 0 }} className="relative h-full">
          <CanvasSequence progress={canvasProgress} zoom={canvasZoom} shiftUpVh={shiftUpVh} />
        </div>

        {/* Anchor target for the nav “Overview” link — the hero text itself is
            a fixed overlay, so it can't be a scroll target. */}
        <div id="overview" aria-hidden className="absolute top-0 h-px w-full" />

        {/* The hero composition — text lives in the negative space around the
            bottle, never on top of it. The load-time entrance timeline reveals
            each element; the scrubbed scroll timeline then fades them away as
            the ingredients build, so the sequence is perfectly reversible. */}
        <HeroStatement entranceRef={statementRef} />
        <ScrollCue entranceRef={cueRef} />
        <EditorialLabels entranceRef={labelsRef} />
        <FinaleWordmark entranceRef={wordmarkRef} />
      </div>

      {/* Flavor lineup — the three bottles pop up on scroll, right after the
          hero shot settles on the bottle alone. */}
      <FlavorTrioSection />

      <PricingSection />
      <StorySection />
      <SpecsSection />
      <NewProductsSection />

      {/* The Collection — interactive 3D product carousel: filter pills,
          depth arc, and prev/next cycling. Sits after the shop grid as the
          final browse moment before the closing CTA. */}
      <ProductCarousel />

      <ClosingSection />
    </main>
  );
}
