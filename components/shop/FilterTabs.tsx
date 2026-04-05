/**
 * FilterTabs — Category filter for the shop page
 *
 * Lets you filter products by type.
 * "All" shows everything, other tabs filter by category.
 */

"use client";

const categories = [
  { label: "All", value: "all" },
  { label: "Magnets", value: "sauce_packet_magnets" },
  { label: "Lamps", value: "lava_lamps" },
  { label: "Sculptures", value: "resin_sculptures" },
  { label: "Prop Food", value: "prop_food" },
  { label: "Game Art", value: "game_art" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Other", value: "other" },
];

interface FilterTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterTabs({
  activeCategory,
  onCategoryChange,
}: FilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2 justify-center mb-10"
      role="tablist"
      aria-label="Filter products by category"
    >
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
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
  );
}
