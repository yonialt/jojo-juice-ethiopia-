"use client";

const FEATURES = [
  {
    title: "Raw Milk & Water Base",
    tag: "Real Dairy · 1.0g Protein / 100ml",
    body: "Formulated with a liquid base of water and real raw milk, delivering 1.0g of protein per 100ml (2% daily requirement) for a smooth, milky beverage texture.",
  },
  {
    title: "Sweetened & Balanced",
    tag: "42.5 kcal · 11.5g Carbohydrates",
    body: "Blended with white sugar and balanced low-calorie sweeteners (sodium cyclamate, acesulfame K, aspartame) to deliver signature flavor at 42.5 kcal / 178 kJ per 100ml.",
  },
  {
    title: "Smooth Texture Matrix",
    tag: "Stabilizers & Acidity Regulators",
    body: "Enhanced with pectin, sodium carboxymethyl cellulose, gellan gum, and polyglycerin fatty acid ester alongside citric acid and lactic acid for perfect consistency.",
  },
];

const PROCESS = [
  {
    title: "Designated Fruit Flavors",
    tag: "Apple · Strawberry · Mango · Milk",
    body: "Infused with designated food aromas to craft refreshing, distinct flavor profiles anchored by a rich milk base.",
  },
  {
    title: "Quality Preservation",
    tag: "Potassium Sorbate · Sodium Citrate",
    body: "Balanced with acidity regulators and potassium sorbate to guarantee product safety and shelf-stable freshness.",
  },
  {
    title: "Allergen & Health Info",
    tag: "Phenylalanine & Dairy Notice",
    body: "Contains aspartame (unsafe for PKU) and real raw milk base. Not suitable for severe lactose intolerance or milk allergies.",
  },
];

const PILLS = [
  "42.5 kcal / 100ml",
  "1.0g Milk Protein",
  "Apple, Mango & Strawberry",
  "Raw Milk Base",
  "42.5 kcal (2% DV)",
  "Pectin Stabilized",
];

const BADGES = [
  "Water & Raw Milk Base",
  "Sweetened with Sugar & Aspartame",
  "Contains Real Dairy",
];

const BOTTOM_PILLS = [
  "42.5 kcal / 100ml",
  "178 kJ Energy",
  "1.0g Protein",
  "~11.5g Carbohydrates",
];

export default function IngredientsSection() {
  return (
    <section
      id="ingredients"
      className="relative bg-primary-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Left-aligned heading block */}
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">01 · Ingredients & Nutrition</p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-primary-text md:text-5xl">
            JoJo Flavored Milk & Juice Drinks
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-primary-text/65">
            Full nutritional profile, ingredient breakdown, and allergen information sourced directly from manufacturer specifications.
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
            <span className="text-xl font-bold text-primary-text">42.5 kcal</span>
            <span className="text-sm text-primary-text/50">Per 100ml (178 kJ)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary-text">1.0g Protein</span>
            <span className="text-sm text-primary-text/50">Raw milk base</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary-text">~11.5g Carbs</span>
            <span className="text-sm text-primary-text/50">Sugar & Flavors</span>
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