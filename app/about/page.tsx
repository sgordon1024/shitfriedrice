/**
 * About Page — "Who even is Shitfriedrice?"
 *
 * Lydia's bio in her voice, materials she works with,
 * fun facts, and the story behind the name.
 */

import Image from "next/image";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";
import { asset } from "@/lib/prefix";

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
    label: "The piece that started it all",
    value:
      'A hyperrealistic fake fried rice bowl — pink ceramic, sculpted rice, sausage, peas, and a real wooden spoon just vibing in there. Wall-mounted. The piece is called "Shit Fried Rice" and that\'s literally how this whole business got its name. You can\'t make this up. Well, Lydia can.',
  },
  {
    label: "Most-watched work (casual 4 billion views)",
    value:
      "Fake blue corn tortillas, birria tacos, consomm\u00e9 cups, and all the fixings for Villa's Tacos at Bad Bunny's Super Bowl LX halftime show. 4.157 billion views in 24 hours. From a garage in Florida. The math is mathing.",
  },
  {
    label: "Favorite sauce packet",
    value: "Taco Bell Fire. This is not up for debate. Do not come for her on this.",
  },
  {
    label: "Weirdest commission",
    value: "TBD \u2014 placeholder for when Lydia picks one.",
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
        WHO IS THIS PERSON AND WHY IS SHE LIKE THIS
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
        {/* Photo */}
        <div className="relative aspect-[3/4] border-dashed-sfr overflow-hidden">
          {/* TODO: Drop in photo of Lydia here */}
          <Image
            src={asset("/images/projects/shit-fried-rice/shit-fried-rice_04.jpg")}
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
            I&apos;m Lydia. I live in Florida with a corgi named Squish, way too many lava
            lamps, and a lab fridge that is absolutely covered in fake condiment magnets. I
            started making stuff for friends because I physically could not stop, then I made
            fake tacos for a taco stand, and then THAT TACO STAND ended up in Bad Bunny&apos;s
            Super Bowl halftime show. I don&apos;t know how I got here but I&apos;m not leaving.
          </p>
          <p className="text-sfr-cream/80 text-lg leading-relaxed">
            Shitfriedrice is the name of this whole operation and yes I know it&apos;s a lot.
            It&apos;s named after a sculpture I made — a hyperrealistic fake bowl of fried rice
            mounted on a wall in a pink ceramic bowl with a real wooden spoon sticking out
            of it. That piece IS the brand. I don&apos;t make the rules. Actually I do. It&apos;s
            my company.
          </p>
          <p className="text-sfr-cream/80 text-lg leading-relaxed">
            I make art out of stuff people throw away — fast food packaging, floppy disks,
            broken tiles, oyster shells, soda cans, matchbooks, whatever the ocean coughs
            up in Florida. Everything gets elevated. The resin work? Flawless. The concept?
            Completely bananas. That&apos;s the whole entire point and I will not apologize.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/shop" variant="primary">
              Go see the weird stuff
            </Button>
            <Button href="/commissions" variant="secondary">
              Make me make you something
            </Button>
          </div>
        </div>
      </div>

      {/* Materials */}
      <section className="mb-20">
        <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-8 text-center">
          STUFF LYDIA HAS GOTTEN HER HANDS ON
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
          LORE
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
          COME FIND ME
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
            Commission something ridiculous
          </Button>
        </div>
      </section>
    </main>
  );
}
