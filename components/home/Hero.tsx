/**
 * Hero — The first thing you see on the homepage
 *
 * Giant rainbow title text with mouse-proximity variable weight.
 * Objects continuously rain down with real bounce physics and pile up.
 */

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import Button from "@/components/ui/Button";
import { playBoingDown, playBoingUp } from "@/lib/sounds";
import ObjectRain from "./ObjectRain";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // --- Mouse proximity → font weight ---
  const fontWeight = useMotionValue(100);
  const springWeight = useSpring(fontWeight, { stiffness: 150, damping: 20, mass: 0.5 });

  const [hasHover, setHasHover] = useState(false);
  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (hasHover) {
      animate(fontWeight, 300, { duration: 1.2, ease: "easeOut" });
    } else {
      fontWeight.set(500);
    }
  }, [hasHover, fontWeight]);

  const boingThresholdRef = useRef<"none" | "heavy" | "light">("none");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!headlineRef.current || !hasHover) return;
      const rect = headlineRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 600;
      const normalized = Math.max(0, Math.min(1, 1 - distance / maxDist));
      const weight = 100 + normalized * 800;
      fontWeight.set(weight);

      if (weight > 700 && boingThresholdRef.current !== "heavy") {
        boingThresholdRef.current = "heavy";
        playBoingDown();
      } else if (weight < 250 && boingThresholdRef.current !== "light") {
        boingThresholdRef.current = "light";
        playBoingUp();
      } else if (weight >= 250 && weight <= 700) {
        boingThresholdRef.current = "none";
      }
    },
    [fontWeight, hasHover]
  );

  const handleMouseLeave = useCallback(() => {
    if (hasHover) {
      animate(fontWeight, 300, { duration: 0.6, ease: "easeOut" });
    }
  }, [fontWeight, hasHover]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Continuous raining objects with bounce physics */}
      <ObjectRain />

      {/* Main hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          ref={headlineRef}
          className="font-[family-name:var(--font-big-shoulders)] text-sfr-cream leading-[0.85] mb-6 uppercase select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontWeight: springWeight,
            fontSize: "clamp(4rem, 15vw, 14rem)",
          }}
        >
          <span className="block whitespace-nowrap">
            <RainbowText text="Art made" />
          </span>
          <span className="block whitespace-nowrap">
            <RainbowText text="from stuff." />
          </span>
        </motion.h1>

        <motion.p
          className="font-[family-name:var(--font-syne)] text-sfr-cream/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Yes, those were our tacos at the Bad Bunny Super Bowl halftime show.
          No, you can&apos;t eat them.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button href="/shop" variant="primary">
            Shop the weird stuff
          </Button>
          <Button href="/commissions" variant="secondary">
            Request a commission
          </Button>
        </motion.div>
      </div>

      {/* Gradient fade at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sfr-black to-transparent z-[5]"
        aria-hidden="true"
      />
    </section>
  );
}

/**
 * RainbowText — Every letter is a different color.
 */
const RAINBOW_COLORS = [
  "#ff2d8a", "#ff0000", "#e8630a", "#FFD700", "#7ec84c", "#00ff88",
  "#4db8d4", "#0066ff", "#8800ff", "#ff00ff", "#ff6ec4", "#c5371a",
  "#00ffff", "#c0c0c0",
];

function RainbowText({ text }: { text: string }) {
  let colorIndex = 0;
  return (
    <>
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i}>&nbsp;</span>;
        const color = RAINBOW_COLORS[colorIndex % RAINBOW_COLORS.length];
        colorIndex++;
        return (
          <span key={i} style={{ color }}>
            {char}
          </span>
        );
      })}
    </>
  );
}
