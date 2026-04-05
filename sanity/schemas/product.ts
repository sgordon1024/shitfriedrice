/**
 * Product Schema for Sanity CMS
 *
 * This is how products show up in the Sanity Studio.
 * Lydia: when you go to /studio and click "Product",
 * these are the fields you'll see and fill out.
 */

import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      description: 'What is this thing called? e.g., "Heinz Full Set Magnets"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description:
        "This becomes the URL. Click Generate to create it from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "What kind of thing is this?",
      options: {
        list: [
          { title: "Sauce Packet Magnets", value: "sauce_packet_magnets" },
          { title: "Lava Lamps", value: "lava_lamps" },
          { title: "Resin Sculptures", value: "resin_sculptures" },
          { title: "Prop Food", value: "prop_food" },
          { title: "Game Art", value: "game_art" },
          { title: "Clocks", value: "clocks" },
          { title: "Jewelry", value: "jewelry" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price ($)",
      type: "number",
      description: "How much does this cost? In dollars.",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "images",
      title: "Product Photos",
      type: "array",
      description:
        "Upload photos of the product. First one is the main image. Drag to reorder.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description:
        "Tell people about this thing. Be yourself. Use your voice.",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "string",
      description:
        'What did you make this out of? e.g., "Heinz condiment packets, resin, neodymium magnets"',
    }),
    defineField({
      name: "inStock",
      title: "In Stock?",
      type: "boolean",
      description: "Turn this off when it sells out.",
      initialValue: true,
    }),
    defineField({
      name: "quantity",
      title: "Quantity Available",
      type: "number",
      description:
        "How many do you have? For one-of-a-kind pieces, this is 1.",
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage?",
      type: "boolean",
      description:
        "Turn this on to show this product on the homepage. Keep it to 3 max.",
      initialValue: false,
    }),
    defineField({
      name: "oneOfAKind",
      title: "One of a Kind?",
      type: "boolean",
      description: 'Is this unique? Shows a special "One left" badge.',
      initialValue: true,
    }),
  ],
  // Show a preview in the Sanity Studio list
  preview: {
    select: {
      title: "title",
      media: "images.0",
      price: "price",
      inStock: "inStock",
    },
    prepare({ title, media, price, inStock }) {
      return {
        title,
        subtitle: `$${price || "?"} ${inStock ? "✓" : "SOLD OUT"}`,
        media,
      };
    },
  },
});
