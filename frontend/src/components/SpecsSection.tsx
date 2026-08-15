"use client";

const STATS = [
  {
    value: "14,000",
    unit: "PSI",
    label: "Hydraulic cold-press force",
    desc: "Every botanical unit pressed at maximum pressure, preserving live enzymes.",
  },
  {
    value: "0°",
    unit: "heat",
    label: "Zero thermal oxidation",
    desc: "No heat, no oxidation—studio-grade clarity and flavor, sip after sip.",
  },
  {
    value: "72",
    unit: "hours",
    label: "Farm-to-bottle window",
    desc: "Harvested, pressed, and sealed at the peak of freshness.",
  },
  {
    value: "12+",
    unit: "enzymes",
    label: "Bio-active enzyme families",
    desc: "A bioavailable matrix engineered for rapid cellular absorption.",
  },
];

const TAGS = ["0g added sugar", "Vegan", "Gluten-free", "Non-GMO", "Raw & unfiltered"];

const FACTS: { label: string; value: string; strong?: boolean }[] = [
  { label: "Energy", value: "45 kcal", strong: true },
  { label: "Total Sugars (naturally occurring)", value: "9g · 0g added", strong: true },
  { label: "Vitamin C", value: "120% DV", strong: true },
  { label: "Potassium", value: "10% DV" },
  { label: "Magnesium", value: "6% DV" },
  { label: "Zinc", value: "8% DV" },
  { label: "B-Complex", value: "25% DV" },
  { label: "pH level", value: "4.2 · naturally acidic" },
  { label: "Cold-press force", value: "14,000 PSI" },
];

export default function SpecsSection() {
  return (
    <section
      id="specs"
      className="relative bg-secondary-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Left-aligned heading block (reference video composition) */}
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">04 · Specs</p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-primary-text md:text-5xl">
            Engineered to the micron.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-primary-text/65">
            Every specification exists to protect one thing: the raw, living
            nutrition inside the bottle.
          </p>
        </div>

        {/* Stat blocks */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-3xl border border-primary-text/8 bg-white p-7 shadow-[0_1px_3px_rgba(26,26,26,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(229,169,60,0.10)]"
            >
              <div className="h-px w-10 bg-gradient-to-r from-accent to-accent-deep transition-all duration-300 group-hover:w-full" />
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="bg-gradient-to-br from-primary-text to-accent-deep bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                  {stat.value}
                </span>
                <span className="text-base font-semibold text-accent-deep">{stat.unit}</span>
              </div>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-text">
                {stat.label}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-primary-text/65">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Narrative + nutrition facts */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-balance text-3xl font-bold tracking-tight text-primary-text md:text-4xl">
              What&apos;s inside, down to the micronutrient.
            </h3>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-primary-text/65">
              Per 330ml bottle. Nothing fortified, nothing stripped—this is what
              the botanicals bring on their own, and it&apos;s more than enough.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-deep"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Nutrition facts label */}
          <div className="rounded-3xl border border-primary-text/15 bg-white p-7 md:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-2xl font-extrabold tracking-tight text-primary-text">
                JoJo Juice · Nutrition
              </p>
              <p className="text-sm font-semibold text-primary-text/60">PER 330ML</p>
            </div>
            <p className="mt-1 border-b-4 border-primary-text pb-2 text-sm text-primary-text/70">
              Nutrition Facts
            </p>
            <ul className="mt-2 divide-y divide-primary-text/10">
              {FACTS.map((fact, i) => (
                <li
                  key={fact.label}
                  className={`flex items-baseline justify-between gap-4 py-2.5 text-[15px] ${
                    i === 0 || i === 1
                      ? "border-t-4 border-primary-text pt-3"
                      : ""
                  } ${fact.strong ? "font-bold text-primary-text" : "text-primary-text/75"}`}
                >
                  <span className="text-pretty">{fact.label}</span>
                  <span className="whitespace-nowrap">{fact.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-primary-text/10 pt-4 text-xs leading-relaxed text-primary-text/50">
              Values reflect the average of the current batch. Full grove-level
              data is printed on every batch code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
