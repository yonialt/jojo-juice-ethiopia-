"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import MagneticButton from "@/components/MagneticButton";

const LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

function ShoppingBagIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 7h12l1 13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);

  const opacity = useTransform(scrollY, [0, 160], [0, 1]);
  // Liquid-glass material: a translucent cream frosted panel with blur +
  // saturation, an inset top highlight and a soft drop shadow, so content
  // never ghosts through the header once scrolled.
  const bgOpacity = useTransform(scrollY, [0, 160], [0, 0.68]);
  const blur = useTransform(scrollY, [0, 160], [
    "blur(0px) saturate(100%)",
    "blur(16px) saturate(160%)",
  ]);
  const borderOpacity = useTransform(scrollY, [0, 160], [0, 0.08]);
  const shadow = useTransform(scrollY, [0, 160], [
    "0 0 0 rgba(26, 26, 26, 0)",
    "0 10px 32px rgba(26, 26, 26, 0.08)",
  ]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-4 px-6 md:px-10"
        style={{
          opacity,
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(247, 245, 240, ${v})`),
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(26, 26, 26, ${v})`
          ),
          boxShadow: useTransform(
            shadow,
            (v) => `${v}, inset 0 1px 0 rgba(255, 255, 255, 0.6)`
          ),
        }}
      >
        <a
          href="#overview"
          onClick={() => setOpen(false)}
          className="shrink-0 text-left text-sm font-semibold tracking-[0.22em] text-primary-text"
        >
          JOJO&nbsp;JUICE
        </a>

        {/* flex-1 + min-w-0 lets the links center in the space between the
            wordmark and the actions; without the rigid thirds the last link
            can never collide with the cart/Order cluster on tablet widths. */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex md:gap-4 lg:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link whitespace-nowrap text-[13px] font-medium tracking-wide text-primary-text/60 transition-colors hover:text-primary-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-3">
          <a
            href="#pricing"
            aria-label="Cart"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary-text/10 text-primary-text/70 transition-colors hover:border-accent/40 hover:text-accent sm:flex"
          >
            <ShoppingBagIcon className="h-[18px] w-[18px]" />
          </a>
          <MagneticButton className="hidden sm:inline-block">
            <a
              href="#pricing"
              className="rounded-full bg-gradient-to-r from-accent to-accent-deep px-5 py-2 text-[13px] font-semibold text-white shadow-[0_0_15px_rgba(232,122,30,0.25)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,122,30,0.45)]"
            >
              Order JoJo Juice
            </a>
          </MagneticButton>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-5 bg-primary-text transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""
                }`}
            />
            <span
              className={`h-px w-5 bg-primary-text transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-primary-bg/95 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
                className="text-3xl font-semibold tracking-tight text-primary-text"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#pricing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * LINKS.length, duration: 0.35 }}
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-gradient-to-r from-accent to-accent-deep px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_24px_rgba(232,122,30,0.35)]"
            >
              Order JoJo Juice
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
