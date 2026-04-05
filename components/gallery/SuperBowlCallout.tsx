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
            Featured Work — Super Bowl LX, 2026
          </p>
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl sm:text-4xl md:text-5xl text-sfr-cream mb-4">
            THE SUPER BOWL TACOS
          </h2>
          <p className="text-sfr-cream/60 leading-relaxed mb-4">
            Hyperrealistic prop food for Villa&apos;s Tacos&apos; taco stand at Bad Bunny&apos;s
            Super Bowl LX halftime show — blue corn tortillas with authentic char marks and
            black spots, birria-style tacos with shredded filling, broth/consomm&eacute; cups,
            salsa cups, radish slices, lime wedges, and scallions. All sculpted fake food,
            indistinguishable from real at broadcast distance. 4.157 billion people watched
            them in the first 24 hours. Nobody ate them.
          </p>
          <p className="font-[family-name:var(--font-syne-mono)] text-sfr-silver text-xs">
            Materials: Foam, resin, acrylic paint, pigment, clear coat
          </p>
        </div>
      </div>
    </motion.section>
  );
}
