/**
 * About Page — "Who even is Shitfriedrice?"
 *
 * Lydia's bio in her voice, materials she works with,
 * fun facts, and the story behind the name.
 */

import Image from "next/image";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Shitfriedrice",
  description:
    "Meet Lydia, the artist behind Shitfriedrice. Handmade art from found materials, made in Florida with too many lava lamps and a lab fridge covered in fake condiment magnets.",
  openGraph: {
    title: "About — Shitfriedrice",
    description:
      "Meet Lydia. She made fake tacos for the Super Bowl and calls her business Shitfriedrice. It is what it is.",
  },
};

const materials = [
  "Resin",
  "Found objects",
  "Oyster shells",
  "Floppy disks",
  "Soda cans",
  "Condiment packets",
  "Moss",
  "Model railroad supplies",
  "Lava lamp internals",
  "Matchbooks",
  "Holographic tiles",
  "Polymer clay",
  "Foam",
  "Acrylic paint",
  "Clock mechanisms",
  "Ceramic bowls",
  "Wooden spoons",
];

const funFacts = [
  {
    label: "The namesake piece",
    value:
      'A hyperrealistic fake fried rice bowl — pink ceramic, sculpted rice, sausage, peas, and a real wooden spoon. Wall-mounted. The piece is called "Shit Fried Rice" and it\'s how the whole business got its name.',
  },
  {
    label: "Most-watched work",
    value:
      "Fake blue corn tortillas, birria tacos, consommé cups, and all the fixings for Villa's Tacos at Bad Bunny's Super Bowl LX halftime show. 4.157 billion views.",
  },
  {
    label: "Favorite sauce packet",
    value: "Taco Bell Fire. Non-negotiable.",
  },
  {
    label: "Weirdest commission",
    value: "TBD — placeholder for when Lydia picks one.",
  },
  {
    label: "Studio soundtrack",
    value: "Also TBD.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <h1 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl text-sfr-cream text-center mb-12">
        WHO EVEN IS SHITFRIEDRICE?
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
        {/* Photo */}
        <div className="relative aspect-[3/4] border-dashed-sfr overflow-hidden">
          {/* TODO: Drop in photo of Lydia here */}
          <Image
            src="/images/projects/shit-fried-rice/shit-fried-rice_04.jpg"
            alt="Lydia, the artist behind Shitfriedrice, in her studio"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col justify-center space-y-6">
          <p className="text-sfr-cream/80 text-lg leading-relaxed">
            I&apos;m Lydia. I live in Florida with too many lava lamps and a lab fridge
            covered in fake condiment magnets. I started making things for friends, then
            made fake tacos for a taco stand, and somehow that taco stand ended up in the
            Bad Bunny Super Bowl halftime show.
          </p>
          <p className="text-sfr-cream/80 text-lg leading-relaxed">
            Shitfriedrice is what I call my business. It&apos;s named after a sculpture I
            made — a hyperrealistic fake bowl of fried rice, wall-mounted, pink ceramic
            bowl with a wooden spoon sticking out of it. That piece is the mascot. It is
            what it is.
          </p>
          <p className="text-sfr-cream/80 text-lg leading-relaxed">
            I make art out of stuff nobody wanted — fast food trash, floppy disks, broken
            tiles, oyster shells, soda cans, matchbooks. Everything gets elevated. The
            resin work is flawless. The concept is unhinged. That&apos;s the point.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/shop" variant="primary">
              Shop the weird stuff
            </Button>
            <Button href="/commissions" variant="secondary">
              Commission something
            </Button>
          </div>
        </div>
      </div>

      {/* Materials */}
      <section className="mb-20">
        <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-8 text-center">
          MATERIALS I&apos;VE WORKED WITH
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {materials.map((material) => (
            <span
              key={material}
              className="px-3 py-1.5 text-xs border border-white/15 text-sfr-cream/60 font-[family-name:var(--font-syne-mono)] uppercase tracking-wider"
            >
              {material}
            </span>
          ))}
        </div>
      </section>

      {/* Fun facts */}
      <section className="mb-20">
        <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-8 text-center">
          FUN FACTS
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {funFacts.map((fact) => (
            <div key={fact.label} className="border-dashed-sfr p-5">
              <p className="font-[family-name:var(--font-syne)] text-sfr-green font-bold text-sm mb-1">
                {fact.label}
              </p>
              <p className="text-sfr-cream/70 text-sm leading-relaxed">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="text-center">
        <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-6">
          FIND ME
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://instagram.com/shitfriedrice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-sfr-green text-sfr-green font-bold text-sm uppercase tracking-wider hover:bg-sfr-green hover:text-sfr-black transition-colors min-h-[44px]"
          >
            Instagram @shitfriedrice
          </a>
          <Button href="/commissions" variant="secondary">
            Commission something weird
          </Button>
        </div>
      </section>
    </main>
  );
}
