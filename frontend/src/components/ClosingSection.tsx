"use client";

import { useState } from "react";
import MagneticButton from "@/components/MagneticButton";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8 0-3.2 0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 3.7a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2Zm0 10a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8Zm6.4-11.4a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9Z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.2 3h3.1l-6.8 7.8L21.4 21h-6.3l-4.9-6.4L4.6 21H1.5l7.3-8.3L1.6 3h6.4l4.4 5.9L17.2 3Zm-1.1 16.1h1.7L6.9 4.8H5.1l11 14.3Z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.4Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.2 12 10 15.2Z",
  },
];

const PRODUCT_LINKS = [
  { label: "Ingredients", href: "#ingredients" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Story", href: "#story" },
  { label: "Specs", href: "#specs" },
];

const COMPANY_LINKS = [
  { label: "FAQ", href: "#contact" },
  { label: "Contact", href: "#contact" },
  { label: "Shipping & Returns", href: "#contact" },
  { label: "Wholesale", href: "#contact" },
];

export default function ClosingSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section id="contact" className="relative bg-primary-bg px-6 pb-10 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Final CTA banner */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary-text/8 bg-secondary-bg px-8 py-20 text-center md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(229,169,60,0.14),transparent_70%)]"
          />
          <div className="relative">
            <p className="eyebrow mb-6">The final pour</p>
            <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-primary-text md:text-6xl">
              Ready to taste what six years of obsession feels like?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-primary-text/65">
              Ships chilled, pressed in small batches, and only when the
              botanicals are at their absolute peak.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton>
                <a
                  href="#pricing"
                  className="rounded-full bg-gradient-to-r from-accent to-accent-deep px-9 py-4 text-base font-semibold text-white shadow-[0_0_34px_rgba(229,169,60,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(229,169,60,0.5)]"
                >
                  Order JoJo Juice →
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-primary-text/10 pt-14">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <a
                href="#overview"
                className="text-sm font-semibold tracking-[0.22em] text-primary-text"
              >
                JOJO&nbsp;JUICE
              </a>
              <p className="mt-4 text-xl font-bold tracking-tight text-primary-text">
                Purity, perfected.
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-text/55">
                Organic cold-pressed liquid nutrition, pressed at 14,000 PSI and
                sealed within 72 hours of harvest.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-text/10 text-primary-text/60 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]" aria-hidden>
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-text/45">
                Product
              </p>
              <ul className="mt-4 space-y-3">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-text/65 transition-colors hover:text-accent-deep"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-text/45">
                Company
              </p>
              <ul className="mt-4 space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-text/65 transition-colors hover:text-accent-deep"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-text/45">
                Newsletter
              </p>
              <p className="mt-4 text-lg font-semibold text-primary-text">
                Get 10% off your first order
              </p>
              <p className="mt-1.5 text-sm text-primary-text/55">
                Fresh batches, seasonal botanicals, and subscriber-only drops.
                No spam, ever.
              </p>
              {subscribed ? (
                <p className="mt-5 rounded-2xl border border-accent/30 bg-accent/8 px-5 py-3.5 text-sm font-medium text-accent-deep">
                  You&apos;re in — welcome to the first pour.
                </p>
              ) : (
                <form
                  className="mt-5 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setSubscribed(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="w-full min-w-0 flex-1 rounded-full border border-primary-text/12 bg-white px-5 py-3 text-sm text-primary-text placeholder:text-primary-text/35 focus:border-accent/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-deep px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-primary-text/10 pt-7 md:flex-row">
            <span className="text-sm text-primary-text/45">
              © 2026 JoJo Juice. All rights reserved.
            </span>
            <span className="flex items-center gap-5 text-sm text-primary-text/45">
              <a href="#contact" className="transition-colors hover:text-primary-text">
                Terms of Service
              </a>
              <a href="#contact" className="transition-colors hover:text-primary-text">
                Privacy Policy
              </a>
            </span>
            <span className="text-sm text-primary-text/45">Organic-Raw-Unfiltered</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
