"use client";

const TIERS = [
  {
    name: "Single Unit (200g)",
    badge: "Try JoJo",
    price: 17.0,
    unit: "per bottle",
    bullets: [
      "Available in Apple, Strawberry, Mango, & Natural Milk",
      "Cold-pressed organic ingredients",
      "Chilled delivery ready to enjoy",
    ],
    cta: "Add to cart",
    popular: false,
  },
  {
    name: "Carton / Pack (24 Pcs)",
    badge: "Best Value",
    price: 333.0,
    unit: "per pack",
    bullets: [
      "Full case of 24 (200g) bottles",
      "Mix and match your favorite flavors",
      "Ideal for events or weekly stock",
    ],
    cta: "Order JoJo Juice",
    popular: true,
  },
];

function formatPrice(v: number) {
  return `ETB ${v.toFixed(2)}`;
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative bg-secondary-bg px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-3 text-center text-xs font-semibold uppercase tracking-widest text-primary-text/60">
          02 · Pricing
        </p>
        <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-primary-text md:text-4xl">
          Simple pricing, serious nutrition.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty text-center text-base text-primary-text/65">
          One bottle or a full case—pick your order. Every purchase ships
          chilled, pressed, and sealed for peak freshness.
        </p>

        {/* Responsive Grid for 2 items */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-3xl border bg-white/60 p-8 backdrop-blur-md transition-all duration-300 hover:shadow-xl ${tier.popular
                  ? "border-accent/50 shadow-lg shadow-accent/10 md:-translate-y-2 ring-1 ring-accent/30"
                  : "border-primary-text/10 shadow-sm hover:-translate-y-1"
                }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${tier.popular
                        ? "bg-gradient-to-r from-accent to-accent-deep text-white shadow-sm"
                        : "border border-accent/30 bg-accent/10 text-accent-deep"
                      }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-primary-text">
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight text-primary-text">
                    {formatPrice(tier.price)}
                  </span>
                  <span className="text-xs text-primary-text/50">
                    {tier.unit}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {tier.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-xs font-medium text-primary-text/75"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#pricing"
                className={`mt-8 block w-full rounded-full text-center text-xs font-bold transition-all duration-300 py-3.5 ${tier.popular
                    ? "bg-gradient-to-r from-accent to-accent-deep text-white shadow-md shadow-accent/20 hover:scale-[1.02] hover:shadow-lg"
                    : "border border-primary-text/15 text-primary-text hover:border-accent hover:text-accent-deep"
                  }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-primary-text/50">
          All bottles 200g · Cold-pressed organic ingredients, zero added sugar · Delivered chilled
        </p>
      </div>
    </section>
  );
}