/**
 * Footer — Bottom of every page
 *
 * Links, Instagram, and a squiggly line divider.
 */

import Link from "next/link";

// Hand-drawn squiggle SVG divider
function Squiggle() {
  return (
    <svg
      viewBox="0 0 1200 12"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-3 text-sfr-green/30"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0,6 Q25,0 50,6 T100,6 T150,6 T200,6 T250,6 T300,6 T350,6 T400,6 T450,6 T500,6 T550,6 T600,6 T650,6 T700,6 T750,6 T800,6 T850,6 T900,6 T950,6 T1000,6 T1050,6 T1100,6 T1150,6 T1200,6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-sfr-black border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Squiggle />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-3">
              SHITFRIEDRICE
            </p>
            <p className="text-sfr-cream/50 text-sm leading-relaxed">
              Art made from garbage, treasures, and the stuff in between.
              Based in Florida. Fueled by resin fumes and audacity.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-[family-name:var(--font-syne)] text-sm uppercase tracking-wider text-sfr-cream/40 mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {[
                { label: "Shop", href: "/shop" },
                { label: "Gallery", href: "/gallery" },
                { label: "Commissions", href: "/commissions" },
                { label: "About", href: "/about" },
                { label: "Squish", href: "/squish" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sfr-cream/60 hover:text-sfr-green transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <p className="font-[family-name:var(--font-syne)] text-sm uppercase tracking-wider text-sfr-cream/40 mb-4">
              Find Me
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/shitfriedrice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sfr-cream/60 hover:text-sfr-green transition-colors text-sm"
                >
                  Instagram @shitfriedrice
                </a>
              </li>
              <li>
                <Link
                  href="/commissions"
                  className="text-sfr-cream/60 hover:text-sfr-green transition-colors text-sm"
                >
                  Make me make you something weird
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Squiggle />

        <div className="mt-10 text-center">
          <p className="text-sfr-cream/30 text-xs font-[family-name:var(--font-syne-mono)]">
            &copy; {new Date().getFullYear()} Shitfriedrice. Everything is handmade.
            Nothing is edible. Squish runs the company. Lydia just works here.
          </p>
        </div>
      </div>
    </footer>
  );
}
