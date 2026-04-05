/**
 * FeaturedProducts — Shows 3 featured products on the homepage
 *
 * These come from Sanity CMS (products tagged featured: true).
 * Falls back to placeholder data if Sanity isn't connected yet.
 */

"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { asset } from "@/lib/prefix";

// Placeholder data for when Sanity isn't set up yet
// TODO: Replace with actual Sanity data once connected
const placeholderProducts = [
  {
    _id: "1",
    title: "Heinz Full Set Magnets",
    slug: { current: "heinz-full-set-magnets" },
    price: 85,
    category: "sauce_packet_magnets",
    image: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_01.jpg"),
    inStock: true,
    oneOfAKind: false,
  },
  {
    _id: "2",
    title: 'Prebiotic Broth — Iridescent Lava Lamp',
    slug: { current: "prebiotic-broth-lava-lamp" },
    price: 450,
    category: "lava_lamps",
    image: asset("/images/projects/prebiotic-broth/prebiotic-broth_01.jpg"),
    inStock: true,
    oneOfAKind: true,
  },
  {
    _id: "3",
    title: '"1993" — Crystal Pepsi Sculpture',
    slug: { current: "1993-crystal-pepsi-sculpture" },
    price: 275,
    category: "resin_sculptures",
    image: asset("/images/projects/1993/1993_01.jpg"),
    inStock: true,
    oneOfAKind: true,
  },
];

interface FeaturedProductsProps {
  products?: typeof placeholderProducts;
}

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  const items = products && products.length > 0 ? products : placeholderProducts;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2
        className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl text-sfr-cream text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        THINGS YOU DIDN&apos;T KNOW YOU NEEDED
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((product, index) => (
          <ProductCard
            key={product._id}
            title={product.title}
            slug={product.slug.current}
            price={product.price}
            image={product.image}
            category={product.category}
            inStock={product.inStock}
            oneOfAKind={product.oneOfAKind}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
