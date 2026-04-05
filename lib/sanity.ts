/**
 * Sanity CMS Client & Queries
 *
 * This is how the website talks to Sanity (the CMS where Lydia
 * manages her products, portfolio, and site settings).
 *
 * Lydia doesn't need to touch this file — she manages everything
 * through the Sanity Studio at /studio on the website.
 */

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// The Sanity client — connects to your Sanity project
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // useCdn: true for faster reads on the live site, false in dev
  useCdn: process.env.NODE_ENV === "production",
});

// Image URL builder — turns Sanity image references into actual URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// =============================================
// GROQ Queries — these fetch data from Sanity
// =============================================

// Get all products (for the shop page)
export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  price,
  images,
  description,
  materials,
  inStock,
  quantity,
  featured,
  oneOfAKind
}`;

// Get products by category
export const productsByCategoryQuery = `*[_type == "product" && category == $category] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  price,
  images,
  description,
  materials,
  inStock,
  quantity,
  featured,
  oneOfAKind
}`;

// Get a single product by its slug (for product detail pages)
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  price,
  images,
  description,
  materials,
  inStock,
  quantity,
  featured,
  oneOfAKind
}`;

// Get featured products (for the home page)
export const featuredProductsQuery = `*[_type == "product" && featured == true][0...3] {
  _id,
  title,
  slug,
  category,
  price,
  images,
  inStock,
  oneOfAKind
}`;

// Get all portfolio items (for the gallery page)
export const allPortfolioQuery = `*[_type == "portfolioItem"] | order(year desc) {
  _id,
  title,
  slug,
  category,
  images,
  artistNote,
  materials,
  year,
  featured,
  isSuperBowlWork
}`;

// Get the Super Bowl featured piece
export const superBowlPieceQuery = `*[_type == "portfolioItem" && isSuperBowlWork == true][0] {
  _id,
  title,
  slug,
  images,
  artistNote,
  materials,
  year
}`;

// Get site settings (commission status, etc.)
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  commissionStatus,
  commissionNote
}`;

// Get all product slugs (for generating static pages)
export const allProductSlugsQuery = `*[_type == "product"] { "slug": slug.current }`;

// =============================================
// TypeScript Types
// =============================================

export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  price: number;
  images: SanityImageSource[];
  description: unknown[];
  materials: string;
  inStock: boolean;
  quantity: number;
  featured: boolean;
  oneOfAKind: boolean;
}

export interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  images: SanityImageSource[];
  artistNote: string;
  materials: string;
  year: number;
  featured: boolean;
  isSuperBowlWork: boolean;
}

export interface SiteSettings {
  commissionStatus: "open" | "waitlist" | "closed";
  commissionNote: string;
}
