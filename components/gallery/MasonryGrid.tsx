/**
 * MasonryGrid — CSS-only masonry layout for the gallery
 *
 * Uses CSS columns (no JS masonry library needed).
 * Each piece shows an image with a hover overlay
 * displaying the title and artist note.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { asset } from "@/lib/prefix";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  artistNote?: string;
  materials?: string;
  year?: number;
}

// Placeholder gallery items
// TODO: Replace with actual Sanity data once connected
const placeholderItems: GalleryItem[] = [
  {
    _id: "g1",
    title: "Heinz Ketchup — Mid-Squeeze",
    category: "magnets",
    image: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_02.jpg"),
    artistNote: "The one that started it all. I squeezed a real ketchup packet onto wax paper and cast it in resin. People lost their minds.",
    materials: "Heinz ketchup packet, resin, neodymium magnet",
    year: 2024,
  },
  {
    _id: "g2",
    title: "Prebiotic Broth — Amethyst Edition",
    category: "lamps",
    image: asset("/images/projects/prebiotic-broth/prebiotic-broth_02.jpg"),
    artistNote: "Lava lamp with a hand-built mosaic base. Broken holographic tiles in dark clay. It looks like a galaxy threw up on a lamp and I mean that as a compliment.",
    materials: "Lava lamp, holographic tile shards, polymer clay, resin",
    year: 2025,
  },
  {
    _id: "g3",
    title: '"1993" — Crystal Pepsi Pour',
    category: "sculptures",
    image: asset("/images/projects/1993/1993_02.jpg"),
    artistNote: "Crystal Pepsi, mid-pour, suspended above an AOL floppy disk. Two things from the 90s that were definitely going to work out.",
    materials: "Crystal Pepsi can, AOL floppy disk, chrome resin",
    year: 2025,
  },
  {
    _id: "g4",
    title: "Villa's Tacos — Super Bowl LX Props",
    category: "prop_food",
    image: asset("/images/projects/villas-tacos/villas-tacos_02.jpg"),
    artistNote: "Hyperrealistic blue corn tortillas with char marks and black spots, birria-style tacos with shredded filling, broth/consommé cups, salsa cups, radish slices, lime wedges, and scallions — all sculpted fake food, indistinguishable from real at broadcast distance. Bad Bunny's halftime show. 4.157 billion views. Nobody ate them.",
    materials: "Foam, resin, acrylic paint, clear coat, pigment",
    year: 2026,
  },
  {
    _id: "g5",
    title: "Custom Settlers of Catan Board",
    category: "game_art",
    image: asset("/images/projects/catan/catan_01.jpg"),
    artistNote: "Full custom 3D Catan board. Real moss, tiny sheep, picket fences, glossy blue dome tokens. Took three months. Worth it.",
    materials: "Foam board, resin, moss, model railroad supplies, polymer clay",
    year: 2025,
  },
  {
    _id: "g6",
    title: '"Christmas Gave Me Gas"',
    category: "sculptures",
    image: asset("/images/projects/christmas-gave-me-gas/christmas-gave-me-gas_01.jpg"),
    artistNote: "Hyperrealistic cafeteria tray with a Chicago dog, deviled eggs, blue Jell-O, and a real Heinz packet. Wall-mounted. Your kitchen will never be the same.",
    materials: "Cafeteria tray, resin, acrylic, real condiment packet",
    year: 2024,
  },
  {
    _id: "g7",
    title: "Oyster Shell Bolo Tie — Gulf Coast",
    category: "jewelry",
    image: asset("/images/projects/florida-grapefruit-bolo/florida-grapefruit-bolo_02.jpg"),
    artistNote: "Bolo tie from an oyster shell I found on the beach. Polished it up, added some cord, and now it's fashion.",
    materials: "Oyster shell, leather cord, silver tips",
    year: 2025,
  },
  {
    _id: "g8",
    title: "Taco Bell Fire Sauce — Dripping",
    category: "magnets",
    image: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_04.jpg"),
    artistNote: "Fire sauce, mid-squeeze. The sauce drip took six pours to get right. Non-negotiable favorite.",
    materials: "Taco Bell sauce packet, resin, neodymium magnet",
    year: 2024,
  },
  {
    _id: "g9",
    title: '"Shit Fried Rice" — The Namesake',
    category: "sculptures",
    image: asset("/images/projects/shit-fried-rice/shit-fried-rice_02.jpg"),
    artistNote: "The piece the whole business is named after. Hyperrealistic fake fried rice in a pink ceramic bowl — sculpted orzo-style rice, glossy dark sausage, corn, peas, carrots, herbs, and a real wooden spoon. Mounted on the wall. It is what it is.",
    materials: "Ceramic bowl, resin, acrylic paint, real wooden spoon, wall mount hardware",
    year: 2023,
  },
  {
    _id: "g10",
    title: "Time Tellers — Oyster Shell Clock (Blue LED)",
    category: "jewelry",
    image: asset("/images/projects/time-tellers/time-tellers_01.jpg"),
    artistNote: "Functioning wall clock on a circular platter. Real oyster shells arranged like clock positions on crushed ice resin, lemon wedge sculptures, herb sprigs, mignonette sauce cup housing the mechanism. This one has blue LED underlighting — glowing ice effect. Yes, it tells time.",
    materials: "Oyster shells, resin, clock mechanism, platter base, blue LED strip, lemon wedge sculptures",
    year: 2025,
  },
  {
    _id: "g11",
    title: "Time Tellers — Oyster Shell Clock (Natural)",
    category: "jewelry",
    image: asset("/images/projects/time-tellers/time-tellers_02.jpg"),
    artistNote: "Same concept, natural light. The lavender and iridescent shell interiors really come through without the LEDs. This one feels more like a dinner party, less like a nightclub. Both are correct.",
    materials: "Oyster shells, resin, clock mechanism, platter base, lemon wedge sculptures, herb sprigs",
    year: 2025,
  },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Magnets & Condiments", value: "magnets" },
  { label: "Lamps", value: "lamps" },
  { label: "Sculptures", value: "sculptures" },
  { label: "Prop Food & Set Work", value: "prop_food" },
  { label: "Game Art", value: "game_art" },
  { label: "Jewelry", value: "jewelry" },
];

interface MasonryGridProps {
  items?: GalleryItem[];
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const allItems = items && items.length > 0 ? items : placeholderItems;

  const filtered =
    activeCategory === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2 justify-center mb-10"
        role="tablist"
        aria-label="Filter gallery by category"
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            role="tab"
            aria-selected={activeCategory === cat.value}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all duration-200 min-h-[44px] font-[family-name:var(--font-syne-mono)] ${
              activeCategory === cat.value
                ? "bg-sfr-green text-sfr-black"
                : "border border-white/20 text-sfr-cream/60 hover:border-sfr-green hover:text-sfr-green"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry grid using CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, index) => (
          <motion.article
            key={item._id}
            className="break-inside-avoid group relative overflow-hidden border-dashed-sfr"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={`${item.title} — handmade art by Shitfriedrice`}
                width={400}
                height={500}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-sfr-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <h3 className="font-[family-name:var(--font-syne)] text-sfr-cream font-bold text-lg mb-2">
                  {item.title}
                </h3>
                {item.artistNote && (
                  <p className="text-sfr-cream/70 text-sm leading-relaxed mb-2">
                    {item.artistNote}
                  </p>
                )}
                {item.materials && (
                  <p className="font-[family-name:var(--font-syne-mono)] text-sfr-silver text-xs">
                    {item.materials}
                  </p>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
