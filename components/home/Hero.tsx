/**
 * Hero — The first thing you see on the homepage
 *
 * Big bold headline, sub-headline about the Super Bowl,
 * two CTAs, and real product photos drifting in zero gravity
 * with decorative objects (gems, shells) parallaxing behind them.
 * Floating images are hidden on mobile (too chaotic).
 */

"use client";

import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity, animate } from "framer-motion";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { playBoingDown, playBoingUp } from "@/lib/sounds";
import { asset } from "@/lib/prefix";

// Real product photos floating around the hero — TRIPLED
const floatingImages = [
  // --- Original 6, bigger and wilder ---
  { src: asset("/images/projects/shit-fried-rice/shit-fried-rice_01.jpg"), alt: "Shit Fried Rice — the namesake sculpture", className: "top-[8%] left-[2%] w-40 h-40 float-slow", rotate: "-4deg" },
  { src: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_01.jpg"), alt: "Sauce packet magnets on the lab fridge", className: "top-[12%] right-[4%] w-32 h-32 float-medium", rotate: "5deg" },
  { src: asset("/images/projects/time-tellers/time-tellers_01.jpg"), alt: "Time Tellers oyster shell clock", className: "bottom-[20%] left-[8%] w-32 h-32 float-fast", rotate: "8deg" },
  { src: asset("/images/projects/prebiotic-broth/prebiotic-broth_01.jpg"), alt: "Prebiotic Broth lava lamp", className: "top-[48%] right-[10%] w-28 h-36 float-slow", rotate: "-3deg" },
  { src: asset("/images/projects/1993/1993_01.jpg"), alt: "1993 Crystal Pepsi sculpture", className: "top-[4%] right-[28%] w-26 h-32 float-medium", rotate: "10deg" },
  { src: asset("/images/projects/villas-tacos/villas-tacos_01.jpg"), alt: "Villa's Tacos Super Bowl props", className: "bottom-[10%] right-[22%] w-32 h-26 float-fast", rotate: "-7deg" },

  // --- Second wave: different shots of same projects ---
  { src: asset("/images/projects/shit-fried-rice/shit-fried-rice_03.jpg"), alt: "Shit Fried Rice detail", className: "top-[35%] left-[1%] w-28 h-28 float-wild", rotate: "12deg" },
  { src: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_04.jpg"), alt: "Sauce packet magnet detail", className: "bottom-[35%] right-[2%] w-24 h-24 float-drift", rotate: "-9deg" },
  { src: asset("/images/projects/catan/catan_01.jpg"), alt: "Custom Settlers of Catan board", className: "top-[65%] left-[22%] w-30 h-30 float-wild", rotate: "6deg" },
  { src: asset("/images/projects/christmas-gave-me-gas/christmas-gave-me-gas_01.jpg"), alt: "Christmas Gave Me Gas sculpture", className: "top-[3%] left-[18%] w-26 h-26 float-medium", rotate: "-11deg" },
  { src: asset("/images/projects/prebiotic-broth/prebiotic-broth_03.jpg"), alt: "Prebiotic Broth detail", className: "bottom-[5%] left-[42%] w-24 h-30 float-drift", rotate: "7deg" },
  { src: asset("/images/projects/1993/1993_03.jpg"), alt: "1993 sculpture detail", className: "top-[28%] right-[38%] w-22 h-28 float-fast", rotate: "-5deg" },

  // --- Third wave: even more scattered ---
  { src: asset("/images/projects/villas-tacos/villas-tacos_03.jpg"), alt: "Villa's Tacos prop detail", className: "top-[70%] right-[5%] w-26 h-22 float-wild", rotate: "14deg" },
  { src: asset("/images/projects/florida-grapefruit-bolo/florida-grapefruit-bolo_01.jpg"), alt: "Florida Grapefruit Bolo Tie", className: "top-[22%] left-[38%] w-22 h-22 float-slow", rotate: "-8deg" },
  { src: asset("/images/projects/time-tellers/time-tellers_02.jpg"), alt: "Time Tellers natural light", className: "top-[55%] left-[48%] w-24 h-24 float-drift", rotate: "9deg" },
  { src: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_07.jpg"), alt: "Sauce packet magnet", className: "bottom-[28%] right-[42%] w-20 h-20 float-fast", rotate: "-13deg" },
  { src: asset("/images/projects/catan/catan_03.jpg"), alt: "Catan board detail", className: "top-[82%] left-[15%] w-22 h-22 float-medium", rotate: "4deg" },
  { src: asset("/images/projects/shit-fried-rice/shit-fried-rice_05.jpg"), alt: "Shit Fried Rice detail", className: "top-[42%] right-[32%] w-20 h-20 float-wild", rotate: "-6deg" },
];

// Decorative objects that parallax + spin + pulse + shift colors — TRIPLED
const decorObjects = [
  // --- Original 12, cranked up ---
  { src: asset("/images/decor/gem1.png"), className: "top-[5%] left-[25%] w-16 h-16", speed: -0.8, opacity: 0.4, anim: "decor-spin-hue" },
  { src: asset("/images/decor/shell1.png"), className: "top-[70%] left-[5%] w-20 h-20", speed: 0.9, opacity: 0.35, anim: "decor-orbit-breathe" },
  { src: asset("/images/decor/iridescent1.png"), className: "top-[30%] right-[3%] w-28 h-28", speed: -1.0, opacity: 0.25, anim: "decor-chaos-hue" },
  { src: asset("/images/decor/butterfly1.png"), className: "bottom-[30%] right-[40%] w-18 h-18", speed: 0.7, opacity: 0.35, anim: "decor-eight-twinkle" },
  { src: asset("/images/decor/star1.png"), className: "top-[80%] right-[8%] w-14 h-14", speed: -0.6, opacity: 0.45, anim: "decor-spin" },
  { src: asset("/images/decor/pearl1.png"), className: "top-[45%] left-[20%] w-12 h-12", speed: 1.1, opacity: 0.35, anim: "decor-chaos-hue" },
  { src: asset("/images/decor/flower1.png"), className: "top-[8%] left-[45%] w-18 h-18", speed: -0.9, opacity: 0.3, anim: "decor-chaos" },
  { src: asset("/images/decor/moon1.png"), className: "bottom-[5%] left-[35%] w-22 h-22", speed: 0.5, opacity: 0.2, anim: "decor-spin-reverse" },
  { src: asset("/images/decor/spiral1.png"), className: "top-[20%] left-[60%] w-16 h-16", speed: -1.1, opacity: 0.25, anim: "decor-spin-hue" },
  { src: asset("/images/decor/skull1.png"), className: "top-[60%] left-[40%] w-14 h-14", speed: 0.8, opacity: 0.25, anim: "decor-orbit" },
  { src: asset("/images/decor/gem2.png"), className: "bottom-[10%] right-[15%] w-12 h-12", speed: -0.7, opacity: 0.4, anim: "decor-eight-twinkle" },
  { src: asset("/images/decor/crystal2.png"), className: "top-[40%] right-[25%] w-14 h-14", speed: 1.0, opacity: 0.25, anim: "decor-chaos-hue" },

  // --- Second wave ---
  { src: asset("/images/decor/gem3.png"), className: "top-[15%] left-[10%] w-12 h-12", speed: 0.9, opacity: 0.35, anim: "decor-spin" },
  { src: asset("/images/decor/shell2.png"), className: "top-[50%] right-[45%] w-14 h-14", speed: -0.7, opacity: 0.3, anim: "decor-chaos" },
  { src: asset("/images/decor/shell3.png"), className: "bottom-[15%] left-[55%] w-16 h-16", speed: 0.6, opacity: 0.3, anim: "decor-orbit-breathe" },
  { src: asset("/images/decor/star2.png"), className: "top-[35%] left-[50%] w-10 h-10", speed: -1.2, opacity: 0.45, anim: "decor-spin-hue" },
  { src: asset("/images/decor/star3.png"), className: "bottom-[40%] right-[8%] w-11 h-11", speed: 0.8, opacity: 0.4, anim: "decor-eight-twinkle" },
  { src: asset("/images/decor/heart1.png"), className: "top-[75%] left-[28%] w-12 h-12", speed: -0.5, opacity: 0.3, anim: "decor-orbit" },
  { src: asset("/images/decor/heart2.png"), className: "top-[18%] right-[18%] w-10 h-10", speed: 1.0, opacity: 0.3, anim: "decor-chaos-hue" },
  { src: asset("/images/decor/iridescent2.png"), className: "top-[62%] right-[30%] w-22 h-22", speed: -0.8, opacity: 0.2, anim: "decor-spin-reverse" },
  { src: asset("/images/decor/iridescent3.png"), className: "bottom-[22%] left-[18%] w-20 h-20", speed: 0.7, opacity: 0.2, anim: "decor-chaos" },
  { src: asset("/images/decor/gold1.png"), className: "top-[25%] right-[50%] w-12 h-12", speed: -0.9, opacity: 0.35, anim: "decor-spin-hue" },
  { src: asset("/images/decor/flower2.png"), className: "top-[85%] right-[35%] w-14 h-14", speed: 0.6, opacity: 0.3, anim: "decor-eight-twinkle" },
  { src: asset("/images/decor/pearl2.png"), className: "bottom-[8%] right-[48%] w-10 h-10", speed: -0.6, opacity: 0.35, anim: "decor-orbit-breathe" },

  // --- Third wave ---
  { src: asset("/images/decor/moth1.png"), className: "top-[12%] left-[55%] w-16 h-16", speed: 1.2, opacity: 0.25, anim: "decor-chaos-hue" },
  { src: asset("/images/decor/cube1.png"), className: "top-[55%] left-[8%] w-14 h-14", speed: -0.8, opacity: 0.2, anim: "decor-spin" },
  { src: asset("/images/decor/key1.png"), className: "bottom-[18%] right-[55%] w-12 h-12", speed: 0.9, opacity: 0.25, anim: "decor-orbit" },
  { src: asset("/images/decor/cloud1.png"), className: "top-[2%] right-[12%] w-24 h-24", speed: -0.4, opacity: 0.15, anim: "decor-spin-reverse" },
  { src: asset("/images/decor/eyes1.png"), className: "top-[68%] right-[18%] w-14 h-14", speed: 0.7, opacity: 0.3, anim: "decor-eight-twinkle" },
  { src: asset("/images/decor/skull2.png"), className: "top-[38%] left-[3%] w-14 h-14", speed: -1.0, opacity: 0.25, anim: "decor-chaos" },
  { src: asset("/images/decor/purple1.png"), className: "bottom-[35%] left-[45%] w-16 h-16", speed: 0.8, opacity: 0.2, anim: "decor-spin-hue" },
  { src: asset("/images/decor/pink1.png"), className: "top-[78%] right-[42%] w-12 h-12", speed: -0.7, opacity: 0.3, anim: "decor-orbit-breathe" },
  { src: asset("/images/decor/orange1.png"), className: "top-[48%] left-[32%] w-14 h-14", speed: 1.1, opacity: 0.25, anim: "decor-chaos-hue" },
  { src: asset("/images/decor/silver1.png"), className: "top-[8%] left-[70%] w-10 h-10", speed: -0.5, opacity: 0.35, anim: "decor-spin" },
  { src: asset("/images/decor/blue1.png"), className: "bottom-[42%] left-[62%] w-16 h-16", speed: 0.6, opacity: 0.2, anim: "decor-eight-twinkle" },
  { src: asset("/images/decor/figurine1.png"), className: "top-[90%] left-[50%] w-14 h-14", speed: -0.9, opacity: 0.2, anim: "decor-orbit" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax the headline up as you scroll
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // --- Mouse proximity → font weight ---
  // Weight ranges from 100 (far) to 900 (close/on top of text)
  const fontWeight = useMotionValue(100);
  const springWeight = useSpring(fontWeight, { stiffness: 150, damping: 20, mass: 0.5 });

  // Track whether we have a hover-capable device
  const [hasHover, setHasHover] = useState(false);
  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  // On mount, animate weight from 100 to 400 as a landing effect
  useEffect(() => {
    if (hasHover) {
      animate(fontWeight, 300, { duration: 1.2, ease: "easeOut" });
    } else {
      // On touch devices, just set a nice static weight
      fontWeight.set(500);
    }
  }, [hasHover, fontWeight]);

  // Track whether we've already boinged at each threshold to avoid spamming
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

      // Boing when crossing the heavy threshold (weight > 700)
      if (weight > 700 && boingThresholdRef.current !== "heavy") {
        boingThresholdRef.current = "heavy";
        playBoingDown();
      }
      // Boing when dropping back below light threshold (weight < 250)
      else if (weight < 250 && boingThresholdRef.current !== "light") {
        boingThresholdRef.current = "light";
        playBoingUp();
      }
      // Reset threshold when in the middle zone
      else if (weight >= 250 && weight <= 700) {
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

  // Decor images fade in after the text has appeared
  const [decorReady, setDecorReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setDecorReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative parallax objects — fade in after text loads */}
      <motion.div
        className="hidden md:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: decorReady ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {decorObjects.map((obj, i) => (
          <DecorObject key={`decor-${i}`} obj={obj} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>

      {/* Main hero content — shows FIRST, no delay on headline */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        style={{ y: headlineY, opacity: headlineOpacity }}
      >
        <motion.h1
          ref={headlineRef}
          className="font-[family-name:var(--font-big-shoulders)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-sfr-cream leading-[0.9] mb-6 uppercase select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontWeight: springWeight }}
        >
          <RainbowText text="Art made from stuff." />
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
      </motion.div>

      {/* Gradient fade at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sfr-black to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

/**
 * FloatingProductImage — Product photo with rubber-band scroll physics
 * and rainbow void gradient on hover.
 *
 * The rubber-band effect: we read scroll velocity, multiply it by the
 * item's speed factor, then pipe it through a spring. The spring's
 * bounciness makes it overshoot and oscillate — like it's on a rubber band.
 * Heavier items (bigger speed) lag more and bounce more.
 */
function FloatingProductImage({
  img,
  index,
  scrollYProgress,
}: {
  img: (typeof floatingImages)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Stable random angle for this image's rainbow gradient
  const rainbowAngle = useMemo(() => Math.floor(Math.random() * 360), []);

  // Scroll velocity → rubber-band spring
  const scrollVelocity = useVelocity(scrollYProgress);
  // Speed factor varies per image based on index — creates depth
  const speedFactor = 0.6 + (index % 7) * 0.15;

  // Raw displacement driven by velocity
  const rawY = useTransform(scrollVelocity, (v) => v * speedFactor * 800);
  // Spring makes it bounce like a rubber band
  const springY = useSpring(rawY, { stiffness: 80, damping: 8, mass: 0.6 });

  // Horizontal wobble from velocity
  const rawX = useTransform(scrollVelocity, (v) => v * speedFactor * 200 * (index % 2 === 0 ? 1 : -1));
  const springX = useSpring(rawX, { stiffness: 60, damping: 10, mass: 0.8 });

  // Rotation from velocity
  const rawRotate = useTransform(scrollVelocity, (v) => v * speedFactor * 80);
  const springRotate = useSpring(rawRotate, { stiffness: 50, damping: 6, mass: 0.5 });

  // Scale bounce from velocity
  const rawScale = useTransform(scrollVelocity, (v) => 1 + Math.abs(v) * speedFactor * 0.4);
  const springScale = useSpring(rawScale, { stiffness: 100, damping: 12, mass: 0.4 });

  return (
    <motion.div
      className={`absolute opacity-50 hover:opacity-90 transition-opacity duration-300 ${img.className}`}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "--float-rotate": img.rotate,
        y: springY,
        x: springX,
        rotate: springRotate,
        scale: springScale,
      } as any}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm">
        <Image
          src={img.src}
          alt={img.alt}
          width={200}
          height={200}
          sizes="200px"
          className="object-cover shadow-lg shadow-black/30"
        />
        {/* Rainbow void overlay on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rainbow-void-overlay"
            style={{
              "--rainbow-angle": `${rainbowAngle}deg`,
            } as React.CSSProperties}
          />
        )}
      </div>
    </motion.div>
  );
}

/**
 * DecorObject — Decorative PNG with rubber-band scroll physics
 * layered with CSS continuous animations.
 */
function DecorObject({
  obj,
  scrollYProgress,
}: {
  obj: (typeof decorObjects)[number];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Scroll velocity → rubber-band spring
  const scrollVelocity = useVelocity(scrollYProgress);

  // Subtle velocity-driven displacement — 90% dialed back from previous
  const rawY = useTransform(scrollVelocity, (v) => v * obj.speed * 120);
  const springY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.5 });

  const rawX = useTransform(scrollVelocity, (v) => v * obj.speed * 35);
  const springX = useSpring(rawX, { stiffness: 100, damping: 18, mass: 0.6 });

  const rawScale = useTransform(scrollVelocity, (v) => 1 + Math.abs(v) * Math.abs(obj.speed) * 0.05);
  const springScale = useSpring(rawScale, { stiffness: 150, damping: 20, mass: 0.4 });

  const rawRotate = useTransform(scrollVelocity, (v) => v * obj.speed * 15);
  const springRotate = useSpring(rawRotate, { stiffness: 100, damping: 15, mass: 0.3 });

  return (
    <motion.div
      className={`absolute ${obj.className}`}
      style={{
        y: springY,
        x: springX,
        scale: springScale,
        rotate: springRotate,
        opacity: obj.opacity,
      }}
    >
      <div className={obj.anim}>
        <Image
          src={obj.src}
          alt=""
          width={80}
          height={80}
          sizes="80px"
          className="object-contain"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

/**
 * RainbowText — Every letter is a different color.
 * Colors cycle through a vivid spectrum. Spaces are preserved.
 */
const RAINBOW_COLORS = [
  "#ff2d8a", // hot pink
  "#ff0000", // red
  "#e8630a", // lava orange
  "#FFD700", // gold
  "#7ec84c", // chartreuse
  "#00ff88", // mint
  "#4db8d4", // sky blue
  "#0066ff", // electric blue
  "#8800ff", // purple
  "#ff00ff", // magenta
  "#ff6ec4", // bubblegum
  "#c5371a", // Heinz red
  "#00ffff", // cyan
  "#c0c0c0", // silver
];

function RainbowText({ text }: { text: string }) {
  let colorIndex = 0;
  return (
    <>
      {text.split("").map((char, i) => {
        if (char === " ") {
          return <span key={i}> </span>;
        }
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
