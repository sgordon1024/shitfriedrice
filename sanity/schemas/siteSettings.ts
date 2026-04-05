/**
 * Site Settings Schema for Sanity CMS
 *
 * Global settings that Lydia can change without touching code.
 * Right now it's just commission status, but we can add more later.
 *
 * Lydia: go to /studio → Site Settings to toggle commissions on/off.
 */

import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "commissionStatus",
      title: "Commission Status",
      type: "string",
      description:
        "Are you taking commissions right now? This controls the badge on the commissions page.",
      options: {
        list: [
          { title: "✦ Open — Taking commissions", value: "open" },
          { title: "⧖ Waitlist — Join the waitlist", value: "waitlist" },
          { title: "✕ Closed — Not taking commissions", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "open",
    }),
    defineField({
      name: "commissionNote",
      title: "Commission Note",
      type: "text",
      description:
        "Optional note that shows on the commissions page. e.g., 'Back from vacation in March!' or 'Booked through February.'",
    }),
  ],
  // Only allow one of these — it's a singleton
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
