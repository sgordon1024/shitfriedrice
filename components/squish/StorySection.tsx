/**
 * StorySection — A single chapter of Squish's fairy tale
 *
 * Renders a chapter number, title, and paragraphs with
 * old-book typography. First paragraph gets a drop cap.
 * Fades in on scroll.
 */

"use client";

import { motion } from "framer-motion";

interface StorySectionProps {
  chapter: string; // "I", "II", "III", "IV"
  title: string;
  paragraphs: string[];
  className?: string;
}

export default function StorySection({
  chapter,
  title,
  paragraphs,
  className = "",
}: StorySectionProps) {
  return (
    <motion.section
      className={`mb-2 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Chapter heading */}
      <div className="text-center mb-8">
        <p className="storybook-chapter-num text-sm mb-2">
          Chapter {chapter}
        </p>
        <h2 className="storybook-chapter-title text-2xl sm:text-3xl">
          {title}
        </h2>
      </div>

      {/* Story paragraphs */}
      <div className="storybook-text space-y-5">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className={i === 0 ? "storybook-drop-cap" : ""}
          >
            {para}
          </p>
        ))}
      </div>
    </motion.section>
  );
}
