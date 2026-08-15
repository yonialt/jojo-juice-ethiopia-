"use client";

import { useState } from "react";

const TIERS = [
  {
    name: "Single Pack",
    badge: "Try JoJo",
    price: 9.0,
    unit: "per bottle",
    bullets: [
      "One 330ml bottle, chilled",
      "Cold-pressed to order",
      "Free shipping over $25",
    ],
    cta: "Add to cart",
    popular: false,
  },
  {
    name: "6-Pack Bundle",
    badge: "Most popular",
    price: 48.0,
    unit: "per 6-pack",
    bullets: [
      "Six 330ml bottles",
      "Save $6 vs. singles",
      "Chilled box, 48h delivery",
      "Mix any flavors",
    ],
    cta: "Order JoJo Juice",
    popular: true,
  },
  {
    name: "Monthly Subscription",
    badge: "Save 15% + free shipping",
    price: 96.0,
    unit: "per month · 12 bottles",
    bullets: [
      "12 bottles every month",
      "15% off every delivery",
      "Free shipping, always",
      "Pause or cancel anytime",
    ],
    cta: "Add to cart",
    popular: false,
  },
];

function formatPrice(v: number) {
  return `$${v.toFixed(2)}`;
}

export default function PricingSection() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section
      id="pricing"
      className="relative bg-secondary-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-6 text-center">02 · Pricing</p>
        <h2 className="text-balance text-center text-4xl font-bold tracking-tight text-primary-text md:text-5xl">
          Simple pricing, serious nutrition.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-lg text-primary-text/65">
          One bottle or a standing ritual—pick your pour. Every order ships
          chilled, pressed, and sealed within 72 hours of harvest.
        </p>

        {/* One-time vs Subscribe toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-primary-text/10 bg-white p-1">
            <button
              type="button"
              onClick={() => setSubscribed(false)}
              aria-pressed={!subscribed}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                !subscribed
                  ? "bg-gradient-to-r from-accent to-accent-deep text-white shadow-[0_4px_14px_rgba(229,169,60,0.35)]"
                  : "text-primary-text/60 hover:text-primary-text"
              }`}
            >
              One-Time Purchase
            </button>
            <button
              type="button"
              onClick={() => setSubscribed(true)}
              aria-pressed={subscribed}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                subscribed
                  ? "bg-gradient-to-r from-accent to-accent-deep text-white shadow-[0_4px_14px_rgba(229,169,60,0.35)]"
                  : "text-primary-text/60 hover:text-primary-text"
              }`}
            >
              Subscribe &amp; Save 15%
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => {
            const price = subscribed ? tier.price * 0.85 : tier.price;
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border bg-white p-7 transition-all duration-300 ${
                  tier.popular
                    ? "border-accent/40 shadow-[0_18px_50px_rgba(229,169,60,0.14)] md:-translate-y-2"
                    : "border-primary-text/8 shadow-[0_1px_3px_rgba(26,26,26,0.05)] hover:-translate-y-1"
                }`}
              >
                <span
                  className={`inline-block self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                    tier.popular
                      ? "bg-gradient-to-r from-accent to-accent-deep text-white shadow-[0_4px_16px_rgba(229,169,60,0.4)]"
                      : "border border-accent/30 bg-accent/8 text-accent-deep"
                  }`}
                >
                  {tier.badge}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-primary-text">
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-5xl font-bold tracking-tight text-primary-text">
                    {formatPrice(price)}
                  </span>
                  <span className="pb-1.5 text-sm text-primary-text/50">{tier.unit}</span>
                  {subscribed && (
                    <span className="pb-1.5 text-sm text-primary-text/40 line-through">
                      {formatPrice(tier.price)}
                    </span>
                  )}
                </div>

                <ul className="mt-5 space-y-2.5">
                  {tier.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-primary-text/65"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="#pricing"
                  className={`mt-auto pt-7 text-center text-sm font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "mt-7 rounded-full bg-gradient-to-r from-accent to-accent-deep px-6 py-3.5 text-white shadow-[0_0_24px_rgba(229,169,60,0.3)] hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(229,169,60,0.45)]"
                      : "rounded-full border border-primary-text/12 px-6 py-3.5 text-primary-text hover:border-accent/50 hover:text-accent-deep"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-primary-text/45">
          All bottles 330ml · Cold-pressed, organic, zero added sugar · Ships
          chilled nationwide
        </p>
      </div>
    </section>
  );
}
