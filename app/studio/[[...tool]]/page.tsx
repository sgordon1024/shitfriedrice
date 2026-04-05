/**
 * Sanity Studio Page
 *
 * This embeds the full Sanity Studio at /studio on the website.
 * Lydia uses this to manage products, portfolio items, and settings.
 *
 * You need to be logged into your Sanity account to use it.
 */

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
