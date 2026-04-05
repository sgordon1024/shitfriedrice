/**
 * PhotoBreak — Full-bleed photo section between content areas
 *
 * Shows a row of product/studio photos in a horizontal scroll
 * with a parallax zoom effect on scroll. Makes the site feel
 * like you're flipping through Lydia's studio photos.
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface PhotoBreakProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

export default function PhotoBreak({ images, className = "" }: PhotoBreakProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      ref={ref}
      className={`relative overflow-hidden py-4 ${className}`}
      style={{ opacity }}
      aria-label="Photo gallery strip"
    >
      <motion.div
        className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8"
        style={{ scale }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[250px] sm:w-[300px] md:w-[380px] aspect-[4/3] rounded-sm overflow-hidden border-dashed-sfr"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 380px"
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
