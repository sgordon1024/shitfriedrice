/**
 * Home Page — The front door to Shitfriedrice
 *
 * Hero with real photos + parallax decorations, marquee ticker,
 * featured products, parallax decoration strip, the Super Bowl callout,
 * a scrolling photo break, and an Instagram grid with real project photos.
 */

import Hero from "@/components/home/Hero";
import Marquee from "@/components/layout/Marquee";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SuperBowlBanner from "@/components/home/SuperBowlBanner";
import SauceDrip from "@/components/ui/SauceDrip";
import ScrollFloat from "@/components/ui/ScrollFloat";
import ParallaxStrip from "@/components/ui/ParallaxStrip";
import PhotoBreak from "@/components/ui/PhotoBreak";
import Image from "next/image";
import type { Metadata } from "next";
import { asset } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Shitfriedrice — Art Made from Stuff Nobody Wanted",
  description:
    "Handmade art sculptures and objects from found, discarded, and unexpected materials. Sauce packet magnets, lava lamps, resin sculptures, and the fake tacos from Bad Bunny's Super Bowl halftime show.",
  openGraph: {
    title: "Shitfriedrice — Art Made from Stuff Nobody Wanted",
    description:
      "Handmade art from found materials. Sauce packet magnets, custom lava lamps, resin sculptures, and prop food for film/TV.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shitfriedrice — Art Made from Stuff Nobody Wanted",
    description:
      "Handmade art from found materials. Yes, we made the tacos for Bad Bunny's Super Bowl halftime show.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shitfriedrice",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shitfriedrice.com",
  description:
    "Handmade art sculptures and objects from found, discarded, and unexpected materials.",
  sameAs: ["https://instagram.com/shitfriedrice"],
};

// Decorative objects floating between featured products and Super Bowl banner
// MORE of them, BIGGER, FASTER, DIZZIER
const midPageDecor = [
  { src: asset("/images/decor/gem2.png"), alt: "", width: 70, height: 70, x: "3%", y: "5%", speed: -0.7, opacity: 0.4, rotate: 15 },
  { src: asset("/images/decor/shell2.png"), alt: "", width: 80, height: 80, x: "88%", y: "15%", speed: 0.8, opacity: 0.35, rotate: -10 },
  { src: asset("/images/decor/spiral1.png"), alt: "", width: 90, height: 90, x: "12%", y: "55%", speed: -0.6, opacity: 0.3, rotate: 20 },
  { src: asset("/images/decor/butterfly2.png"), alt: "", width: 60, height: 60, x: "78%", y: "65%", speed: 0.7, opacity: 0.35, rotate: -5 },
  { src: asset("/images/decor/star2.png"), alt: "", width: 50, height: 50, x: "50%", y: "25%", speed: -0.9, opacity: 0.35, rotate: 30 },
  { src: asset("/images/decor/pearl2.png"), alt: "", width: 45, height: 45, x: "28%", y: "78%", speed: 0.5, opacity: 0.3, rotate: 0 },
  { src: asset("/images/decor/iridescent2.png"), alt: "", width: 100, height: 100, x: "92%", y: "45%", speed: -0.4, opacity: 0.2, rotate: -15 },
  { src: asset("/images/decor/skull1.png"), alt: "", width: 65, height: 65, x: "62%", y: "10%", speed: 0.6, opacity: 0.3, rotate: 8 },
  { src: asset("/images/decor/gold1.png"), alt: "", width: 55, height: 55, x: "40%", y: "85%", speed: -0.8, opacity: 0.3, rotate: -20 },
  { src: asset("/images/decor/moon1.png"), alt: "", width: 75, height: 75, x: "20%", y: "35%", speed: 0.9, opacity: 0.2, rotate: 12 },
  { src: asset("/images/decor/flower2.png"), alt: "", width: 55, height: 55, x: "70%", y: "40%", speed: -0.5, opacity: 0.3, rotate: -30 },
  { src: asset("/images/decor/crystal2.png"), alt: "", width: 60, height: 60, x: "8%", y: "90%", speed: 0.7, opacity: 0.25, rotate: 45 },
  { src: asset("/images/decor/gem1.png"), alt: "", width: 40, height: 40, x: "55%", y: "70%", speed: -0.6, opacity: 0.35, rotate: -40 },
  { src: asset("/images/decor/shell3.png"), alt: "", width: 50, height: 50, x: "35%", y: "5%", speed: 0.8, opacity: 0.3, rotate: 25 },
];

// Decorative strip of objects between Super Bowl and Instagram sections
const decorStripItems = [
  { src: asset("/images/decor/gem1.png"), alt: "", size: 50, speed: -0.3, offsetY: -5 },
  { src: asset("/images/decor/shell3.png"), alt: "", size: 55, speed: 0.4, offsetY: 8 },
  { src: asset("/images/decor/flower1.png"), alt: "", size: 60, speed: -0.2, offsetY: -10 },
  { src: asset("/images/decor/moon1.png"), alt: "", size: 70, speed: 0.5, offsetY: 3 },
  { src: asset("/images/decor/star1.png"), alt: "", size: 40, speed: -0.4, offsetY: -8 },
  { src: asset("/images/decor/iridescent3.png"), alt: "", size: 65, speed: 0.3, offsetY: 5 },
  { src: asset("/images/decor/crystal2.png"), alt: "", size: 55, speed: -0.35, offsetY: -3 },
  { src: asset("/images/decor/gold1.png"), alt: "", size: 45, speed: 0.25, offsetY: 10 },
  { src: asset("/images/decor/butterfly1.png"), alt: "", size: 50, speed: -0.45, offsetY: -6 },
  { src: asset("/images/decor/pearl1.png"), alt: "", size: 35, speed: 0.35, offsetY: 4 },
];

// Photos for the scrolling photo break
const photoBreakImages = [
  { src: asset("/images/projects/shit-fried-rice/shit-fried-rice_01.jpg"), alt: "Shit Fried Rice — the namesake sculpture" },
  { src: asset("/images/projects/1993/1993_03.jpg"), alt: "1993 Crystal Pepsi sculpture detail" },
  { src: asset("/images/projects/prebiotic-broth/prebiotic-broth_03.jpg"), alt: "Prebiotic Broth lava lamp detail" },
  { src: asset("/images/projects/catan/catan_02.jpg"), alt: "Custom Catan board detail" },
  { src: asset("/images/projects/time-tellers/time-tellers_02.jpg"), alt: "Time Tellers oyster clock" },
  { src: asset("/images/projects/christmas-gave-me-gas/christmas-gave-me-gas_02.jpg"), alt: "Christmas Gave Me Gas detail" },
  { src: asset("/images/projects/villas-tacos/villas-tacos_03.jpg"), alt: "Villa's Tacos props detail" },
  { src: asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_08.jpg"), alt: "Sauce packet magnet detail" },
];

// Instagram grid — use a mix of real project photos
const instagramPhotos = [
  asset("/images/projects/shit-fried-rice/shit-fried-rice_05.jpg"),
  asset("/images/projects/sauce-packet-magnets/sauce-packet-magnets_04.jpg"),
  asset("/images/projects/prebiotic-broth/prebiotic-broth_04.jpg"),
  asset("/images/projects/1993/1993_04.jpg"),
  asset("/images/projects/time-tellers/time-tellers_03.jpg"),
  asset("/images/projects/villas-tacos/villas-tacos_04.jpg"),
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <Hero />
      <Marquee />
      <SauceDrip color="#1a1a1a" />
      <FeaturedProducts />

      {/* Floating decorative objects between featured products and Super Bowl — tall zone for maximum chaos */}
      <ScrollFloat items={midPageDecor} height="550px" />

      <SauceDrip color="#f5f0e8" />
      <SuperBowlBanner />
      <SauceDrip color="#1a1a1a" flip />

      {/* Scrolling photo break — horizontal strip of product photos */}
      <PhotoBreak images={photoBreakImages} className="py-8" />

      {/* Parallax decoration strip */}
      <ParallaxStrip items={decorStripItems} />

      {/* Instagram Grid with real photos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl text-sfr-cream mb-4">
          FOLLOW ALONG
        </h2>
        <a
          href="https://instagram.com/shitfriedrice"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-syne)] text-sfr-green hover:text-sfr-green-dark transition-colors text-lg"
        >
          @shitfriedrice
        </a>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
          {instagramPhotos.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden border-dashed-sfr group"
            >
              <Image
                src={src}
                alt={`Shitfriedrice studio work — Instagram post ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
