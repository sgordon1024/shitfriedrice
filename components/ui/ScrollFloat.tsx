/**
 * ScrollFloat — Parallax-drifting decorative objects (DIZZY MODE)
 *
 * Transparent PNGs that spin, pulse, orbit, hue-shift, and parallax
 * at different speeds as you scroll. Layered CSS animations for
 * continuous motion + Framer Motion for scroll-driven transforms.
 *
 * Makes you dizzy. That's the point.
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// CSS animation classes assigned per-item for variety
const animClasses = [
  "decor-spin-hue",
  "decor-chaos-hue",
  "decor-orbit-breathe",
  "decor-eight-twinkle",
  "decor-spin",
  "decor-chaos",
  "decor-spin-reverse",
  "decor-orbit",
];

export interface FloatingItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  x: string;
  y: string;
  speed: number;
  rotate?: number;
  opacity?: number;
  scale?: number;
  hideBelow?: "sm" | "md" | "lg";
  // Optional: override the auto-assigned animation class
  anim?: string;
}

interface ScrollFloatProps {
  items: FloatingItem[];
  height?: string;
  className?: string;
}

export default function ScrollFloat({
  items,
  height = "600px",
  className = "",
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {items.map((item, i) => (
        <FloatingObject
          key={i}
          item={item}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function FloatingObject({
  item,
  index,
  scrollYProgress,
}: {
  item: FloatingItem;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Strong parallax — 3x the original range
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [item.speed * 250, item.speed * -250]
  );

  // Horizontal drift on scroll
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [item.speed * 60, item.speed * -60]
  );

  // Scroll-driven rotation — big range for dizziness
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [(item.rotate || 0) - 40, (item.rotate || 0) + 40]
  );

  // Scale breathe on scroll
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      (item.scale ?? 1) * 0.85,
      (item.scale ?? 1) * 1.2,
      (item.scale ?? 1) * 0.85,
    ]
  );

  const hideClass =
    item.hideBelow === "sm"
      ? "hidden sm:block"
      : item.hideBelow === "md"
        ? "hidden md:block"
        : item.hideBelow === "lg"
          ? "hidden lg:block"
          : "hidden md:block";

  // Each item gets a different CSS animation for variety
  const cssAnim = item.anim || animClasses[index % animClasses.length];

  return (
    <motion.div
      className={`absolute ${hideClass}`}
      style={{
        left: item.x,
        top: item.y,
        y,
        x,
        rotate,
        scale,
        opacity: item.opacity ?? 0.5,
      }}
    >
      <div className={cssAnim}>
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="object-contain"
          sizes={`${Math.max(item.width, item.height)}px`}
        />
      </div>
    </motion.div>
  );
}
