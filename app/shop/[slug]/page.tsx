/**
 * Product Detail Page — Individual product view
 *
 * Shows the full product with image gallery, description,
 * materials, price, and Add to Cart button.
 *
 * In production, this page is statically generated with ISR
 * (revalidates every 60 seconds) so it's fast but stays fresh.
 */

import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCart from "@/components/shop/AddToCart";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";

// Placeholder product data — replace with Sanity fetch in production
// TODO: Replace with actual Sanity data once connected
const placeholderProducts: Record<string, {
  _id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  materials: string;
  inStock: boolean;
  quantity: number;
  oneOfAKind: boolean;
}> = {
  "heinz-full-set-magnets": {
    _id: "1",
    title: "Heinz Full Set Magnets",
    slug: "heinz-full-set-magnets",
    category: "sauce_packet_magnets",
    price: 85,
    images: [
      "/images/projects/sauce-packet-magnets/sauce-packet-magnets_01.jpg",
      "/images/projects/sauce-packet-magnets/sauce-packet-magnets_02.jpg",
      "/images/projects/sauce-packet-magnets/sauce-packet-magnets_06.jpg",
    ],
    description:
      "The complete Heinz lineup. Ketchup through horseradish. All oozing. All permanent. All on your fridge forever. Made with real Heinz packets and a concerning amount of resin. Comes as a set of 10.",
    materials: "Heinz condiment packets, resin, neodymium magnets",
    inStock: true,
    quantity: 5,
    oneOfAKind: false,
  },
  "prebiotic-broth-lava-lamp": {
    _id: "2",
    title: "Prebiotic Broth — Iridescent Lava Lamp",
    slug: "prebiotic-broth-lava-lamp",
    category: "lava_lamps",
    price: 450,
    images: [
      "/images/projects/prebiotic-broth/prebiotic-broth_01.jpg",
      "/images/projects/prebiotic-broth/prebiotic-broth_02.jpg",
      "/images/projects/prebiotic-broth/prebiotic-broth_03.jpg",
    ],
    description:
      "Standard lava lamp. Nonstandard everything else. Base and cap are hand-built iridescent mosaic — broken holographic tiles set in dark clay, oil-slick rainbow shift depending on the light. The lava is not broth. Probably.",
    materials: "Lava lamp, holographic tile shards, polymer clay, resin",
    inStock: true,
    quantity: 1,
    oneOfAKind: true,
  },
  "1993-crystal-pepsi-sculpture": {
    _id: "3",
    title: '"1993" — Crystal Pepsi Sculpture',
    slug: "1993-crystal-pepsi-sculpture",
    category: "resin_sculptures",
    price: 275,
    images: [
      "/images/projects/1993/1993_01.jpg",
      "/images/projects/1993/1993_02.jpg",
      "/images/projects/1993/1993_03.jpg",
    ],
    description:
      'Crystal Pepsi, mid-pour. Suspended in time above an AOL free trial floppy disk. Two things that were definitely going to work out. Gravity-defying chrome resin. Fully functional as a conversation piece. Not as a beverage.',
    materials: "Crystal Pepsi can (vintage), AOL floppy disk (vintage), chrome resin",
    inStock: true,
    quantity: 1,
    oneOfAKind: true,
  },
  "shit-fried-rice-sculpture": {
    _id: "sfr-1",
    title: '"Shit Fried Rice" — The Namesake',
    slug: "shit-fried-rice-sculpture",
    category: "resin_sculptures",
    price: 350,
    images: [
      "/images/projects/shit-fried-rice/shit-fried-rice_01.jpg",
      "/images/projects/shit-fried-rice/shit-fried-rice_02.jpg",
      "/images/projects/shit-fried-rice/shit-fried-rice_03.jpg",
    ],
    description:
      "The one that started the name. A hyperrealistic fake fried rice bowl — pink ceramic bowl filled with sculpted orzo-style rice, glossy dark sausage pieces, corn, peas, carrots, herbs, and a real wooden spoon. Wall-mounted. This is the piece the entire business is named after. It is what it is.",
    materials: "Ceramic bowl, resin, acrylic paint, real wooden spoon, wall mount hardware",
    inStock: true,
    quantity: 1,
    oneOfAKind: true,
  },
  "time-tellers-oyster-clock": {
    _id: "tt-1",
    title: "Time Tellers — Oyster Shell Clock",
    slug: "time-tellers-oyster-clock",
    category: "jewelry",
    price: 380,
    images: [
      "/images/projects/time-tellers/time-tellers_01.jpg",
      "/images/projects/time-tellers/time-tellers_02.jpg",
      "/images/projects/time-tellers/time-tellers_03.jpg",
    ],
    description:
      "A functioning wall clock built on a circular platter base. Real oyster shells arranged like clock positions on crushed ice resin, lemon wedge sculptures, herb sprigs, and a mignonette sauce cup in the center housing the clock mechanism. Available with blue LED underlighting or natural lavender/iridescent shell interiors. Yes, it tells time. Yes, it looks like the raw bar at a nice restaurant.",
    materials: "Oyster shells, resin, clock mechanism, platter base, LED lighting (optional), lemon wedge sculptures, herb sprigs",
    inStock: true,
    quantity: 1,
    oneOfAKind: true,
  },
};

// Generate static params for all known products
export async function generateStaticParams() {
  // TODO: In production, fetch from Sanity:
  // const slugs = await sanityClient.fetch(allProductSlugsQuery);
  // return slugs.map((s) => ({ slug: s.slug }));
  return Object.keys(placeholderProducts).map((slug) => ({ slug }));
}

// Generate metadata for each product (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = placeholderProducts[slug];
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} — Shitfriedrice`,
    description: product.description,
    openGraph: {
      title: `${product.title} — Shitfriedrice`,
      description: product.description,
      type: "website",
      images: [{ url: product.images[0] }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
    },
  };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // TODO: In production, fetch from Sanity:
  // const product = await sanityClient.fetch(productBySlugQuery, { slug });
  const product = placeholderProducts[slug];

  if (!product) {
    notFound();
  }

  // JSON-LD Product structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images[0],
    description: product.description,
    brand: { "@type": "Brand", name: "Shitfriedrice" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main id="main-content" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image gallery */}
        <div className="space-y-4">
          {product.images.map((img, i) => (
            <div key={i} className="relative aspect-square border-dashed-sfr overflow-hidden bg-sfr-black">
              <Image
                src={img}
                alt={`${product.title} — photo ${i + 1}, handmade by Shitfriedrice`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Product info */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
          {/* Category tag */}
          <p className="font-[family-name:var(--font-syne-mono)] text-sfr-silver text-xs uppercase tracking-widest">
            {product.category.replace(/_/g, " ")}
          </p>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl text-sfr-cream leading-[0.95]">
            {product.title}
          </h1>

          {/* Price */}
          <p className="font-[family-name:var(--font-syne-mono)] text-sfr-green text-2xl">
            ${product.price.toFixed(2)}
          </p>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {!product.inStock && <Badge variant="red">Sold Out</Badge>}
            {product.inStock && product.oneOfAKind && (
              <Badge variant="yellow">One of a kind</Badge>
            )}
            {product.inStock && product.quantity > 1 && (
              <Badge variant="silver">{product.quantity} available</Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sfr-cream/70 leading-relaxed text-base">
            {product.description}
          </p>

          {/* Materials */}
          {product.materials && (
            <div>
              <p className="font-[family-name:var(--font-syne)] text-sfr-cream/40 text-xs uppercase tracking-wider mb-1">
                Materials
              </p>
              <p className="font-[family-name:var(--font-syne-mono)] text-sfr-silver text-sm">
                {product.materials}
              </p>
            </div>
          )}

          {/* Add to Cart */}
          <AddToCart
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.images[0]}
            inStock={product.inStock}
            maxQuantity={product.quantity}
          />

          {/* Commission note for one-of-a-kind pieces */}
          {product.oneOfAKind && (
            <p className="text-sfr-cream/40 text-sm border-t border-white/10 pt-4">
              This is a one-of-a-kind piece. Want something similar made custom?{" "}
              <a
                href="/commissions"
                className="text-sfr-green hover:text-sfr-green-dark transition-colors underline"
              >
                Request a commission
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
