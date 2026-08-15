"use client";

const FEATURES = [
  {
    title: "Organic Farming",
    body: "Regenerative partner farms across the Mediterranean—no synthetic pesticides, ever.",
  },
  {
    title: "Cold-Pressed Extraction",
    body: "14,000 PSI hydraulic pressing that keeps enzymes alive and flavor untouched by heat.",
  },
  {
    title: "Sustainability",
    body: "Returnable glass bottles, compostable pulp, and a carbon-neutral cold chain.",
  },
  {
    title: "Radical Transparency",
    body: "Every batch labeled with harvest date, PSI, and pH—trust you can taste.",
  },
];

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-primary-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left: floating bottle */}
        <div className="relative mx-auto w-full max-w-[380px]">
          {/* Same ambient-glow spec as the hero canvas, so the bottle's
              background treatment is consistent across every section that
              reuses the artwork. */}
          <div
            aria-hidden
            className="absolute -inset-8 rounded-full bg-[radial-gradient(65%_55%_at_50%_42%,rgba(229,169,60,0.10),transparent_72%)]"
          />
          <div className="animate-float relative overflow-hidden rounded-3xl border border-primary-text/8 bg-white shadow-[0_24px_60px_rgba(26,26,26,0.10)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/yellow-sequence/ezgif-frame-001.jpg"
              alt="JoJo Juice bottle floating on a warm cream backdrop"
              className="aspect-[3/4] h-full w-full scale-[1.8] object-cover object-[50%_63%]"
              loading="lazy"
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-primary-text/50">
              The bottle · 2026 batch
            </span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
        </div>

        {/* Right: narrative + feature cards */}
        <div>
          <p className="eyebrow mb-6">03 · Our Story</p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-primary-text md:text-5xl">
            Six years, one obsession: the perfect pour.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-primary-text/65">
            JoJo Juice started in a two-person kitchen with a second-hand
            hydraulic press and a stubborn idea: that the way we drink nutrition
            could be as considered as the way we cook it. No concentrates. No
            shortcuts. Just fruit and botanicals at their absolute peak, pressed
            cold and sealed fast.
          </p>
          <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-primary-text/65">
            Today we still press in small batches, still taste every run, and
            still refuse to add a single gram of sugar. The craft never scaled
            down—only the reach did.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-primary-text/8 bg-white p-6 shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(229,169,60,0.10)]"
              >
                <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-deep" />
                <h3 className="mt-4 text-base font-bold tracking-tight text-primary-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-text/65">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
