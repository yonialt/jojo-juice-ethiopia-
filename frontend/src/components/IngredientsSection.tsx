"use client";

const FEATURES = [
  {
    title: "Blood Oranges",
    tag: "Naturally pressed, nothing added",
    body: "Hand-picked at dawn from volcanic Sicilian groves. Pressed whole—rind, pith, and all—for bitter-free depth and a slow-release sugar curve.",
  },
  {
    title: "Botanical Extracts",
    tag: "Ginger, turmeric & elderflower",
    body: "Cold-macerated rather than cooked, so curcumin and gingerols stay live and potent—quieting inflammation and sharpening focus all day.",
  },
  {
    title: "Essential Vitamins",
    tag: "Bioavailable B-complex, D3 & zinc",
    body: "A micronutrient matrix engineered for rapid cellular absorption. No pills, no fillers—just nutrition your body can actually use.",
  },
];

const PROCESS = [
  {
    title: "Pure Hydration",
    tag: "Electrolytes · Naturally isotonic",
    body: "Naturally isotonic and rich in electrolytes, so every sip rehydrates faster than water alone—and tastes like a slow afternoon.",
  },
  {
    title: "Cold-Pressed Process",
    tag: "14,000 PSI · 0° heat",
    body: "A hydraulic press extracts every drop without thermal oxidation. Live enzymes and phytonutrients survive intact—nothing cooked, nothing lost.",
  },
  {
    title: "Organic Sourcing",
    tag: "Regenerative · 72h farm-to-bottle",
    body: "Grown by partner farms across the Mediterranean, picked at peak, pressed within 72 hours, and sealed in small batches by hand.",
  },
];

const PILLS = [
  "Vitamin C · 120% DV",
  "0g added sugar",
  "Anti-inflammatory",
  "Cold-extracted",
  "B-complex",
  "Bioavailable",
];

const BADGES = [
  "Young coconut water base",
  "14,000 PSI, zero heat",
  "Regenerative partner farms",
];

const BOTTOM_PILLS = [
  "0g added sugar",
  "No preservatives",
  "No concentrates",
  "Certified organic",
];

export default function IngredientsSection() {
  return (
    <section
      id="ingredients"
      className="relative bg-primary-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Left-aligned heading block (reference video composition) */}
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">01 · Ingredients</p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-primary-text md:text-5xl">
            Nothing but what nature grew.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-primary-text/65">
            Six obsessions in one bottle. Every ingredient is chosen for what it
            does—and what it refuses to be: processed, added, or unnecessary.
          </p>
        </div>

        {/* First row of three cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FEATURES.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-primary-text/8 bg-white p-7 shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(229,169,60,0.12)]"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-deep">
                {card.tag}
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-primary-text">
                {card.title}
              </h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-primary-text/65">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Feature pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5 md:justify-start">
          {PILLS.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-deep"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Badges */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {BADGES.map((badge) => (
            <div
              key={badge}
              className="rounded-2xl border border-primary-text/8 bg-secondary-bg px-6 py-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-text/70"
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Second row of three cards */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {PROCESS.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-primary-text/8 bg-white p-7 shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(229,169,60,0.12)]"
            >
              <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-deep" />
              <h3 className="mt-4 text-xl font-bold tracking-tight text-primary-text">
                {card.title}
              </h3>
              <p className="mt-2 text-pretty text-[15px] leading-relaxed text-primary-text/65">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom stats + pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-primary-text/8 pt-8">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary-text">Electrolytes</span>
            <span className="text-sm text-primary-text/50">Naturally isotonic</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary-text">14,000 PSI</span>
            <span className="text-sm text-primary-text/50">0° heat</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary-text">72h farm-to-bottle</span>
            <span className="text-sm text-primary-text/50">Regenerative</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {BOTTOM_PILLS.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-deep"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
