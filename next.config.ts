/**
 * Next.js Configuration
 *
 * Lydia: you probably don't need to touch this file.
 * It tells Next.js how to build the site, where images can
 * come from, and how to handle the Sanity Studio.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from these domains (Sanity CDN + placeholder images)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        // Placeholder images — remove this once you have real product photos
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
