/**
 * ParallaxStrip — Horizontal band of floating objects
 *
 * A horizontal strip of decorative PNGs that scroll at different
 * speeds, creating a layered "treasure shelf" effect between
 * major sections. Think: the top of Lydia's lab fridge, but
 * it scrolls.
 *
 * Items in the back row move slower (parallax depth), items
 * in the front move faster. All wrapped in prefers-reduced-motion.
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface StripItem {
  src: string;
  alt: string;
  size: number; // width/height in px
  speed: number; // parallax multiplier (-1 to 1)
  offsetY?: number; // vertical offset in px
}

interface ParallaxStripProps {
  items: StripItem[];
  className?: string;
  bgColor?: string;
}

export default function ParallaxStrip({
  items,
  className = "",
  bgColor = "transparent",
}: ParallaxStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className={`relative h-32 sm:h-40 md:h-48 overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-around px-8 gap-4">
        {items.map((item, i) => (
          <StripObject
            key={i}
            item={item}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

// CSS animation classes — each strip item gets a different one
const stripAnimClasses = [
  "decor-spin-hue",
  "decor-orbit-breathe",
  "decor-chaos",
  "decor-eight-twinkle",
  "decor-spin-reverse",
  "decor-chaos-hue",
  "decor-spin",
  "decor-orbit",
  "decor-breathe",
  "decor-eight-twinkle",
];

function StripObject({
  item,
  index,
  scrollYProgress,
}: {
  item: StripItem;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Stronger horizontal parallax
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [item.speed * 120, item.speed * -120]
  );
  // Vertical bob
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [(item.offsetY || 0) + 20, (item.offsetY || 0) - 20, (item.offsetY || 0) + 20]
  );
  // Scroll-driven rotation
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-15, 15]
  );

  const cssAnim = stripAnimClasses[index % stripAnimClasses.length];

  return (
    <motion.div
      className="flex-shrink-0 hidden sm:block"
      style={{ x, y, rotate }}
    >
      <div className={cssAnim}>
        <Image
          src={item.src}
          alt={item.alt}
          width={item.size}
          height={item.size}
          className="object-contain opacity-60 hover:opacity-90 transition-opacity duration-500"
          sizes={`${item.size}px`}
        />
      </div>
    </motion.div>
  );
}
