/**
 * ProductCard — The tilted, animated product card
 *
 * Each card has a slight random rotation at rest,
 * straightens + scales up on hover, and shows the product info.
 * The tilt effect only works on devices with a mouse (not touch).
 *
 * Sauce packet magnets get a special "squeeze" animation on hover.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "./Badge";
import { playBoingSmall, playBoingMedium } from "@/lib/sounds";

interface ProductCardProps {
  title: string;
  slug: string;
  price: number;
  image: string;
  category?: string;
  inStock?: boolean;
  oneOfAKind?: boolean;
  index?: number;
}

export default function ProductCard({
  title,
  slug,
  price,
  image,
  category,
  inStock = true,
  oneOfAKind = true,
  index = 0,
}: ProductCardProps) {
  // Each card gets a slightly different random rotation
  // based on its index so they look hand-placed
  const rotations = [-2, 1.5, -1, 2.5, -1.5, 2, -0.5, 3];
  const rotation = rotations[index % rotations.length];

  const isSaucePacket = category === "sauce_packet_magnets";

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/shop/${slug}`} className="block">
        <motion.article
          className="border-dashed-sfr rounded-sm bg-sfr-black/50 overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(126,200,76,0.15)]"
          style={{ rotate: `${rotation}deg` }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            transition: { duration: 0.25, ease: "easeOut" },
          }}
          onHoverStart={() => isSaucePacket ? playBoingMedium() : playBoingSmall()}
        >
          {/* Product image */}
          <div className="relative aspect-square overflow-hidden bg-sfr-black">
            <Image
              src={image}
              alt={`${title} — handmade art by Shitfriedrice`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                isSaucePacket ? "sauce-squeeze" : ""
              }`}
            />

            {/* Stock badge */}
            {!inStock && (
              <div className="absolute inset-0 bg-sfr-black/60 flex items-center justify-center">
                <Badge variant="red">Gone 😔</Badge>
              </div>
            )}
            {inStock && oneOfAKind && (
              <div className="absolute top-2 right-2">
                <Badge variant="yellow">One left</Badge>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="p-4">
            <h3 className="font-[family-name:var(--font-syne)] font-bold text-sfr-cream text-sm leading-tight mb-1">
              {title}
            </h3>
            <p className="font-[family-name:var(--font-syne-mono)] text-sfr-green text-sm">
              ${price.toFixed(2)}
            </p>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
