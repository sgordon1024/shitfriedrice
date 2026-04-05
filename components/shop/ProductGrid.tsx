/**
 * ProductGrid — The main product grid for the shop page
 *
 * Handles filtering by category and displays product cards.
 * Falls back to placeholder products when Sanity isn't connected.
 */

"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FilterTabs from "./FilterTabs";
import { asset } from "@/lib/prefix";

// Placeholder products for when Sanity isn't set up yet
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
    title: "Taco Bell Fire Sauce Magnet",
    slug: { current: "taco-bell-fire-sauce-magnet" },
    price: 18,
    category: "sauce_packet_magnets",
    image: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_03.jpg"),
    inStock: true,
    oneOfAKind: false,
  },
  {
    _id: "3",
    title: "McDonald's Szechuan Magnet",
    slug: { current: "mcdonalds-szechuan-magnet" },
    price: 22,
    category: "sauce_packet_magnets",
    image: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_05.jpg"),
    inStock: false,
    oneOfAKind: true,
  },
  {
    _id: "4",
    title: "Prebiotic Broth — Iridescent Lava Lamp",
    slug: { current: "prebiotic-broth-lava-lamp" },
    price: 450,
    category: "lava_lamps",
    image: asset("/images/projects/prebiotic-broth/prebiotic-broth_01.jpg"),
    inStock: true,
    oneOfAKind: true,
  },
  {
    _id: "5",
    title: '"1993" — Crystal Pepsi Sculpture',
    slug: { current: "1993-crystal-pepsi-sculpture" },
    price: 275,
    category: "resin_sculptures",
    image: asset("/images/projects/1993/1993_01.jpg"),
    inStock: true,
    oneOfAKind: true,
  },
  {
    _id: "6",
    title: "Grey Poupon Magnet",
    slug: { current: "grey-poupon-magnet" },
    price: 20,
    category: "sauce_packet_magnets",
    image: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_07.jpg"),
    inStock: true,
    oneOfAKind: false,
  },
  {
    _id: "7",
    title: "Popeyes Cajun Sparkle Magnet",
    slug: { current: "popeyes-cajun-sparkle-magnet" },
    price: 18,
    category: "sauce_packet_magnets",
    image: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_09.jpg"),
    inStock: true,
    oneOfAKind: false,
  },
  {
    _id: "8",
    title: "Oyster Shell Bolo Tie",
    slug: { current: "oyster-shell-bolo-tie" },
    price: 120,
    category: "jewelry",
    image: asset("/images/projects/florida-grapefruit-bolo/florida-grapefruit-bolo_01.jpg"),
    inStock: true,
    oneOfAKind: true,
  },
  {
    _id: "sfr-1",
    title: '"Shit Fried Rice" — The Namesake',
    slug: { current: "shit-fried-rice-sculpture" },
    price: 350,
    category: "resin_sculptures",
    image: asset("/images/projects/shit-fried-rice/shit-fried-rice_01.jpg"),
    inStock: true,
    oneOfAKind: true,
  },
  {
    _id: "tt-1",
    title: "Time Tellers — Oyster Shell Clock",
    slug: { current: "time-tellers-oyster-clock" },
    price: 380,
    category: "jewelry",
    image: asset("/images/projects/time-tellers/time-tellers_01.jpg"),
    inStock: true,
    oneOfAKind: true,
  },
];

interface ProductGridProps {
  products?: typeof placeholderProducts;
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const items = products && products.length > 0 ? products : placeholderProducts;

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((p) => p.category === activeCategory);

  return (
    <div>
      <FilterTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-sfr-cream/50 py-20 font-[family-name:var(--font-syne)]">
          Nothing in this category yet. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
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
      )}
    </div>
  );
}
