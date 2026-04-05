/**
 * Portfolio Item Schema for Sanity CMS
 *
 * These are the pieces in the gallery — things Lydia has made
 * that may or may not be for sale. This is the "look what I did" section.
 */

import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'What do you call this piece? e.g., "1993" or "Christmas Gave Me Gas"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Magnets & Condiments", value: "magnets" },
          { title: "Lamps", value: "lamps" },
          { title: "Sculptures", value: "sculptures" },
          { title: "Prop Food & Set Work", value: "prop_food" },
          { title: "Game Art", value: "game_art" },
          { title: "Jewelry", value: "jewelry" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "Upload your best photos of this piece.",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "artistNote",
      title: "Artist Note",
      type: "text",
      description:
        "A short note about this piece in your voice. What's the story? Keep it fun.",
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "string",
      description: "What's it made of?",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "When did you make this?",
    }),
    defineField({
      name: "featured",
      title: "Featured?",
      type: "boolean",
      description: "Show this near the top of the gallery.",
      initialValue: false,
    }),
    defineField({
      name: "isSuperBowlWork",
      title: "Super Bowl Work?",
      type: "boolean",
      description:
        "Is this the work from the Bad Bunny Super Bowl halftime show? (There should only be one of these.)",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      year: "year",
      isSuperBowlWork: "isSuperBowlWork",
    },
    prepare({ title, media, year, isSuperBowlWork }) {
      return {
        title: `${title}${isSuperBowlWork ? " 🏈" : ""}`,
        subtitle: year ? `${year}` : "",
        media,
      };
    },
  },
});
