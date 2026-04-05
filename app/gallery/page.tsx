/**
 * Gallery Page — "Weird things I've made"
 *
 * Masonry grid of portfolio pieces with the Super Bowl tacos
 * featured prominently at the top.
 */

import MasonryGrid from "@/components/gallery/MasonryGrid";
import SuperBowlCallout from "@/components/gallery/SuperBowlCallout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Shitfriedrice",
  description:
    "Portfolio of handmade art: sauce packet magnets, lava lamps, resin sculptures, fake food props from Bad Bunny's Super Bowl halftime show, custom game boards, and oyster shell clocks.",
  openGraph: {
    title: "Gallery — Shitfriedrice",
    description:
      "Weird things Lydia has made. Sauce packets, lava lamps, fake tacos, and more.",
  },
};

export default function GalleryPage() {
  // TODO: Fetch portfolio items from Sanity when connected:
  // const items = await sanityClient.fetch(allPortfolioQuery);
  // Then pass: <MasonryGrid items={items} />

  return (
    <main id="main-content" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl text-sfr-cream mb-3">
          WEIRD THINGS I&apos;VE MADE
        </h1>
        <p className="font-[family-name:var(--font-syne)] text-sfr-cream/50 text-lg">
          Sculptures, magnets, lamps, fake food, and at least one thing that ended up on national television.
        </p>
      </div>

      {/* The Super Bowl tacos get their own hero callout */}
      <SuperBowlCallout />

      {/* Everything else in a masonry grid */}
      <MasonryGrid />
    </main>
  );
}
