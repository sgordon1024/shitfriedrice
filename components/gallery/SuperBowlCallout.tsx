/**
 * SuperBowlCallout — Hero featured piece at top of gallery
 *
 * The Super Bowl tacos get their own big callout at the top
 * of the gallery page. Full-width, context copy, the works.
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/prefix";

export default function SuperBowlCallout() {
  return (
    <motion.section
      className="relative mb-16 overflow-hidden border-dashed-sfr"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[16/10] lg:aspect-auto">
          {/* TODO: Replace with actual photo of Super Bowl taco props */}
          <Image
            src={asset("/images/projects/villas-tacos/villas-tacos_01.jpg")}
            alt="Fake taco props made by Shitfriedrice for Villa's Tacos at Bad Bunny's Super Bowl LX halftime show"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Text */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-sfr-black">
          <p className="font-[family-name:var(--font-syne-mono)] text-sfr-red text-xs uppercase tracking-widest mb-3">
            Featured Work — Super Bowl LX, 2026 — The Big One
          </p>
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl sm:text-4xl md:text-5xl text-sfr-cream mb-4">
            THE TACOS THAT BROKE THE INTERNET
          </h2>
          <p className="text-sfr-cream/60 leading-relaxed mb-4">
            So Villa&apos;s Tacos needed a taco stand for Bad Bunny&apos;s Super Bowl LX halftime
            show and Lydia was like &quot;say less.&quot; Blue corn tortillas with char marks so real
            you can almost smell them, birria tacos with shredded filling, consomm&eacute; cups,
            salsa cups, radish slices, lime wedges, scallions — the whole spread. All fake. All
            sculpted by hand in a Florida garage. 4.157 billion people watched these in 24 hours
            and not a single one of them got to take a bite. Devastating honestly.
          </p>
          <p className="font-[family-name:var(--font-syne-mono)] text-sfr-silver text-xs">
            Materials: Foam, resin, acrylic paint, pigment, clear coat
          </p>
        </div>
      </div>
    </motion.section>
  );
}
