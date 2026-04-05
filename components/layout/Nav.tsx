/**
 * Navigation — The main site nav
 *
 * Desktop: full horizontal nav with all links.
 * Mobile: hamburger menu that slides down.
 * Cart icon shows item count badge.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { playDoubleBoing } from "@/lib/sounds";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "Commissions", href: "/commissions" },
  { label: "About", href: "/about" },
  { label: "Squish", href: "/squish" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-sfr-black/90 backdrop-blur-sm border-b border-white/5"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="logo-jiggle font-[family-name:var(--font-bebas)] text-2xl md:text-3xl text-sfr-cream tracking-wide hover:text-sfr-green transition-colors"
            onMouseEnter={playDoubleBoing}
          >
            SHITFRIEDRICE
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-syne)] text-sm text-sfr-cream/70 hover:text-sfr-green transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2 text-sfr-cream/70 hover:text-sfr-green transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              {/* Cart SVG icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-sfr-green text-sfr-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openCart}
              className="relative p-2 text-sfr-cream/70 hover:text-sfr-green transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-sfr-green text-sfr-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-sfr-cream/70 hover:text-sfr-green transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-sfr-black/95 border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 font-[family-name:var(--font-syne)] text-lg text-sfr-cream/70 hover:text-sfr-green transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
