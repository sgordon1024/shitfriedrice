/**
 * SuperBowlBanner — The big credibility flex
 *
 * Lydia made the fake tacos for Villa's Tacos' taco stand,
 * which appeared in Bad Bunny's Super Bowl LX halftime show.
 * This is a major credibility signal — make it loud.
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function SuperBowlBanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-sfr-cream text-sfr-black">
      {/* Subtle diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, #1a1a1a 10px, #1a1a1a 11px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-[family-name:var(--font-syne-mono)] text-sfr-red text-xs uppercase tracking-widest mb-4">
              February 2026 — Super Bowl LX
            </p>
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-6">
              Bad Bunny performed the most-watched halftime show in history.
              <span className="text-sfr-red"> The tacos on that stage? Lydia made those.</span>
            </h2>
            <p className="font-[family-name:var(--font-syne)] text-sfr-black/70 text-lg mb-4 leading-relaxed">
              The fake tacos and tortillas for Villa&apos;s Tacos&apos; taco stand were
              sculpted by hand right here. You couldn&apos;t eat them. 4.157 billion
              people watched them anyway.
            </p>

            {/* Big stat callout */}
            <div className="border-dashed-sfr !border-sfr-black/20 inline-block px-6 py-4 my-6">
              <p className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl text-sfr-red">
                4.157B
              </p>
              <p className="font-[family-name:var(--font-syne-mono)] text-xs text-sfr-black/60 uppercase tracking-wider">
                Views in 24 hours. Our fake food was there.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                href="/gallery"
                variant="primary"
                className="!bg-sfr-red !text-sfr-cream hover:!bg-sfr-red/80"
              >
                See the work
              </Button>
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] border-dashed-sfr !border-sfr-black/20 overflow-hidden">
              {/* TODO: INSERT photo of fake taco props / Villa's Tacos stand */}
              <Image
                src="/images/projects/villas-tacos/villas-tacos_01.jpg"
                alt="Fake taco props made by Shitfriedrice for Villa's Tacos at Super Bowl LX halftime show"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-sfr-black/80 text-sfr-cream px-3 py-1.5 font-[family-name:var(--font-syne-mono)] text-xs uppercase tracking-wider">
                Super Bowl LX — Villa&apos;s Tacos
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
