/**
 * Shop Page — Where you buy the weird stuff
 *
 * Product grid with category filters.
 * Products come from Sanity CMS (or placeholders if not connected).
 */

import ProductGrid from "@/components/shop/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Shitfriedrice",
  description:
    "Handmade sauce packet magnets, lava lamps, resin sculptures, and more. One-of-a-kind art from found materials.",
  openGraph: {
    title: "Shop — Shitfriedrice",
    description:
      "Handmade sauce packet magnets, lava lamps, resin sculptures, and more.",
  },
};

export default function ShopPage() {
  // TODO: Fetch products from Sanity when connected:
  // const products = await sanityClient.fetch(allProductsQuery);
  // Then pass them: <ProductGrid products={products} />

  return (
    <main id="main-content" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl text-sfr-cream mb-3">
          THE GOOD STUFF
        </h1>
        <p className="font-[family-name:var(--font-syne)] text-sfr-cream/50 text-lg">
          Handmade. One of a kind. Probably resin.
        </p>
      </div>

      <ProductGrid />
    </main>
  );
}
