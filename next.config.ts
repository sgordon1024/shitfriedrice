/**
 * Next.js Configuration
 *
 * Lydia: you probably don't need to touch this file.
 * It tells Next.js how to build the site, where images can
 * come from, and how to handle the Sanity Studio.
 */

import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves from /shitfriedrice/ subdirectory
  basePath: isGitHubPages ? "/shitfriedrice" : "",
  assetPrefix: isGitHubPages ? "/shitfriedrice/" : "",

  // Allow images from these domains (Sanity CDN + placeholder images)
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
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
