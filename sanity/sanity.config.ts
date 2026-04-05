/**
 * Sanity Studio Configuration
 *
 * This configures the Sanity Studio that lives at /studio on the website.
 * Lydia uses this to add/edit products, portfolio items, and site settings.
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  // These come from your .env.local file
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  name: "shitfriedrice-studio",
  title: "Shitfriedrice Studio",

  plugins: [
    // The main editing interface
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Products section
            S.listItem()
              .title("Products")
              .schemaType("product")
              .child(S.documentTypeList("product").title("Products")),

            // Portfolio section
            S.listItem()
              .title("Portfolio")
              .schemaType("portfolioItem")
              .child(S.documentTypeList("portfolioItem").title("Portfolio")),

            // Divider
            S.divider(),

            // Site Settings (singleton — only one document)
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
    // Vision tool for testing GROQ queries (developer tool)
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
