/**
 * SquishStorybook — The full fairy tale experience
 *
 * Squish's photo at top, 4-chapter story in old book typography,
 * an arcade game between chapters 3 and 4, and "The End." flourish.
 * Chapter 4 only reveals after the game has been played.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import StorySection from "./StorySection";
import ChapterDivider from "./ChapterDivider";
import CorgiRunner from "./CorgiRunner";
import { asset } from "@/lib/prefix";

// --- The complete fairy tale ---

const chapter1 = {
  chapter: "I",
  title: "The Studio at the Edge of the Swamp",
  paragraphs: [
    "Once upon a time, in a small house at the edge of a Florida swamp where the air smelled of orange blossoms and uncured resin, there lived a short, stumpy, magnificently round corgi named Squish.",
    "Squish was not an ordinary dog. She was thirteen years old, which in corgi years made her an ancient and venerable queen — though she carried her age the way she carried everything else: with immense dignity and a faint air of theatrical suffering. She was, by all accounts, the sweetest and gentlest creature to ever walk the earth on four absurdly short legs. She would rest her head on your knee and look up at you with eyes so soft they could dissolve resin. But touch her paws — even accidentally, even gently, even with the best of intentions — and she would snatch them away with the wounded outrage of a duchess who has been asked to do her own laundry.",
    "She lived in the most extraordinary studio in all the land — a place where lava lamps bubbled in every color the sun had ever considered, where sauce packets from every kingdom in the realm were pinned to a great iron fridge like medals of honor, and where things that looked exactly like food were not, under any circumstances, food. This last point was a source of ongoing personal anguish for Squish, who spent a considerable portion of her waking hours stationed beneath the workbench, watching for any morsel that might fall from above. Preferably cheese. Always, always cheese.",
    "Her owner, the great Artisan Lydia, spent her days hunched over tables covered in resin and glitter and polymer clay, conjuring objects of such bewildering beauty that visitors often forgot to breathe. Squish spent her days lying directly in the path of maximum inconvenience, which she considered her sacred duty. Occasionally she would bark — sudden, sharp, at absolutely nothing — and then look around the room with fierce satisfaction, as though she had just repelled an invisible invader. She was protecting the house. From what, no one knew. But she was certain the threat was real.",
    "Every morning was the same. Lydia would enter the studio. Squish would be asleep on the one clear spot on the floor. Lydia would step over her. Squish would not move. Sometimes Lydia would eat a sandwich at the workbench, and Squish would materialize beside her with a silence and speed that defied physics, her brown eyes enormous, her body vibrating with hope. If a shred of cheese fell, Squish would catch it before it touched the ground. If no cheese fell, she would sigh — a great, heaving, operatic sigh that suggested she had never been fed, not once, in all her thirteen years. This was, of course, a lie. But she committed to it fully.",
    "This was the natural order. This was the way of things.",
  ],
};

const chapter2 = {
  chapter: "II",
  title: "A Catalogue of the Studio\u2019s Treasures",
  paragraphs: [
    "Now, you must understand the studio to understand what happened next. It was not a tidy place. It was not meant to be. Great art, Lydia often said, requires great mess.",
    "Along the eastern wall stood the Lava Lamp Armada \u2014 seventeen handmade lamps with bases of iridescent mosaic tile, each one bubbling away in its own hypnotic rhythm. Squish liked to press her nose against the warm glass and watch the blobs rise and fall. She had opinions about each one. The red one was her favorite. She would growl softly at the green one, for reasons she kept to herself.",
    "The western wall was home to the Fridge of a Thousand Sauces \u2014 a vintage laboratory refrigerator covered, every square inch of it, in handmade sauce packet magnets. Taco Bell Fire. Chick-fil-A Polynesian. McDonald\u2019s Szechuan (the rare one). Each packet had been sculpted by Lydia\u2019s own hands, cast in resin, fitted with magnets, and placed with the reverence of a museum curator hanging a Vermeer. Squish respected the fridge, primarily because it contained cheese. Real cheese. The kind that sometimes appeared in Lydia\u2019s hand at the end of a long day, broken into small pieces as a reward for being, in Squish\u2019s opinion, the best dog who had ever lived.",
    "In the center of it all sat The Workbench \u2014 a great oak table piled high with molds, pigments, UV lamps, silicone, and at least three projects in various states of becoming. On this particular morning, Lydia was finishing a set of fake blue corn tortillas for a client in Los Angeles. They looked so real that Squish had attempted to eat one twice already. She had not learned her lesson. She had no plans to. She had, however, learned that if she sat very still beneath the workbench and stared upward with the full force of her enormous brown eyes, there was a thirty percent chance that Lydia would feel guilty and retrieve an actual piece of cheese from the fridge. These were acceptable odds.",
    "And so beneath the workbench, in her favorite spot where the resin fumes were warmest, Squish dozed. Her ears twitched. Her stubby legs paddled in some dream about an infinite meadow of falling cheese. Every few minutes she would bark once \u2014 a sharp, declarative bark at nothing whatsoever \u2014 then settle back to sleep, satisfied that whatever phantom threat she had detected was now thoroughly vanquished. All was well.",
    "Until it wasn\u2019t.",
  ],
};

const chapter3 = {
  chapter: "III",
  title: "The Great Sauce Packet Uprising",
  paragraphs: [
    "It began with a rattle.",
    "Squish\u2019s left ear rotated like a satellite dish. Then the right. She opened one eye. The Fridge of a Thousand Sauces was trembling.",
    "At first it was subtle — a gentle vibration, as if the fridge were clearing its throat. Then a single sauce packet magnet detached from the door and plopped onto the floor. Then another. Then seven at once. They didn\u2019t just fall. They bounced. They rolled. They scurried.",
    "The sauce packets were alive.",
    "A Taco Bell Diablo packet sprouted tiny legs and skittered across the concrete floor. A Chick-fil-A Honey Mustard wobbled upright and began waddling toward the door. A whole platoon of McDonald\u2019s ketchups formed a conga line and marched directly toward the Lava Lamp Armada.",
    "Lydia lunged for the nearest lamp as it wobbled. She caught it. But there were sixteen more, and the sauce packets were closing in on all of them.",
    "That was when Squish stood up.",
    "She did not stand up quickly, because she was thirteen years old and a corgi, and corgis do not do anything quickly except eat cheese. But she stood up with purpose. Her ears were forward. Her stumpy tail was straight. Her eyes, usually half-closed in a state of permanent drowsiness, were wide open and locked on the advancing sauce packets. She barked \u2014 not the usual bark-at-nothing bark, but a real bark, a bark with weight and meaning and righteous fury. The drama queen had found her stage.",
    "A Diablo packet skittered toward her paws. She recoiled \u2014 nobody touches the paws \u2014 then lunged forward with a snarl so disproportionate to her size that three ketchup packets froze mid-scurry.",
    "The studio needed a hero. The lava lamps needed a guardian. And Squish \u2014 short, round, magnificently stubborn, sweet, gentle, cheese-obsessed, paw-sensitive, thirteen-year-old Squish \u2014 was the only one low enough to the ground to intercept them.",
    "She took a deep breath. And she ran.",
  ],
};

const chapter4 = {
  chapter: "IV",
  title: "The Aftermath",
  paragraphs: [
    "When the last sauce packet had been corralled and the final lava lamp steadied on its base, Squish collapsed in the middle of the studio floor, panting. She let out a long, shuddering sigh \u2014 the most dramatic sigh in the history of sighs \u2014 as though she had single-handedly fought off a dragon and not a collection of condiments with legs.",
    "The scene around her was magnificent in its chaos. Resin puddles shimmered in seventeen different colors on the concrete. Sauce packets lay scattered like fallen soldiers after a very small, very condiment-based war. One of the fake tortillas had somehow ended up on Squish\u2019s head, sitting there like a flat, blue corn beret. She did not seem to mind. She looked, if anything, rather distinguished.",
    "Lydia surveyed the damage. Then she looked at Squish. Then back at the damage. Then back at Squish, who was now trying to eat the tortilla off her own head.",
    "\u201CYou,\u201D Lydia said, kneeling down to scratch behind those enormous ears \u2014 carefully avoiding the paws, because she knew better \u2014 \u201Care the weirdest dog alive.\u201D",
    "Squish wagged her stumpy tail. She leaned into the scratch with the full weight of her round body, nearly toppling Lydia over. She did not disagree.",
    "That evening, Lydia opened the fridge \u2014 the real part of the fridge, not the door of magnets \u2014 and retrieved the fancy cheese. The good cheese. The cheese that was technically for guests. She broke it into small pieces and fed them to Squish one by one, and Squish accepted each piece with the gentle, trembling reverence of someone receiving a knighthood. This was, Squish felt, only appropriate. She had saved the studio. She deserved the fancy cheese.",
    "Then Lydia added one more magnet to the Fridge of a Thousand Sauces \u2014 a tiny one, shaped like a corgi, placed right in the center where everyone could see it. It was, she decided, the most important piece in the entire collection.",
    "And Squish, exhausted from her great adventure and full of fancy cheese, fell asleep under the workbench in her favorite warm spot. Her ears twitched. Her stubby legs paddled. And in her dreams, the sauce packets ran, and she chased them across that infinite tile floor \u2014 and at the end of every chase, there was cheese. There was always cheese.",
  ],
};

// Squish photos sprinkled through the story
const squishPhotos = [
  asset("/images/squish/img_1012.jpg"), // loaf pose — hero
  asset("/images/squish/img_3064.jpg"), // happy in van
  asset("/images/squish/img_2912.jpg"), // sleepy on bed
  asset("/images/squish/img_4438.jpg"), // in the garden
  asset("/images/squish/img_5921.jpg"), // looking out car window
  asset("/images/squish/img_1757.jpg"), // close-up portrait
];

export default function SquishStorybook() {
  const [gamePlayed, setGamePlayed] = useState(false);

  return (
    <div className="storybook-page relative z-0">
      {/* Hero photo of Squish */}
      <div className="max-w-2xl mx-auto pt-8 px-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm" style={{ border: "3px double #c5371a40" }}>
          <Image
            src={squishPhotos[0]}
            alt="Squish the corgi — short, round, magnificently stubborn studio guardian"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-cover"
            style={{ filter: "sepia(0.15)" }}
            priority
          />
        </div>

        {/* Title */}
        <div className="text-center mt-8 mb-4">
          <h1 className="storybook-chapter-title text-4xl sm:text-5xl md:text-6xl mb-3" style={{ color: "#2a2118" }}>
            The Tale of Squish
          </h1>
          <p className="storybook-chapter-num text-sm tracking-[0.2em]">
            Guardian of the Studio, Defender of Lava Lamps
          </p>
        </div>
      </div>

      {/* Parchment story container */}
      <div className="max-w-3xl mx-auto px-4 pb-16 mt-8">
        <div className="storybook-border relative z-10">

          {/* Chapter I */}
          <StorySection {...chapter1} />

          {/* Squish photo between chapters */}
          <motion.div
            className="my-8 max-w-xs mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={squishPhotos[1]}
              alt="Squish relaxing in her favorite spot"
              width={400}
              height={300}
              sizes="300px"
              className="rounded-sm object-cover w-full"
              style={{ border: "2px double #c5371a30", filter: "sepia(0.1)" }}
            />
          </motion.div>

          <ChapterDivider />

          {/* Chapter II */}
          <StorySection {...chapter2} />

          {/* Another Squish photo */}
          <motion.div
            className="my-8 max-w-xs mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={squishPhotos[2]}
              alt="Squish asleep under the workbench in her favorite warm spot"
              width={400}
              height={300}
              sizes="300px"
              className="rounded-sm object-cover w-full"
              style={{ border: "2px double #c5371a30", filter: "sepia(0.1)" }}
            />
          </motion.div>

          <ChapterDivider />

          {/* Chapter III — builds to the game */}
          <StorySection {...chapter3} />

          <ChapterDivider variant="game-intro" />

          {/* THE GAME */}
          <CorgiRunner onGameComplete={() => setGamePlayed(true)} />

          {/* Chapter IV — revealed after the game */}
          <AnimatePresence>
            {gamePlayed && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                <ChapterDivider variant="game-outro" />

                <StorySection {...chapter4} />

                {/* Final Squish photo */}
                <motion.div
                  className="my-8 max-w-xs mx-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={squishPhotos[5]}
                    alt="Squish, the weirdest dog alive, at peace"
                    width={400}
                    height={400}
                    sizes="300px"
                    className="rounded-sm object-cover w-full"
                    style={{ border: "2px double #c5371a30", filter: "sepia(0.15)" }}
                  />
                </motion.div>

                {/* The End */}
                <div className="text-center mt-12 mb-4">
                  <p className="storybook-the-end text-4xl sm:text-5xl mb-6">
                    The End.
                  </p>
                  {/* Flourish */}
                  <svg
                    width="60"
                    height="20"
                    viewBox="0 0 60 20"
                    className="mx-auto"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,10 Q15,0 30,10 Q45,20 60,10"
                      fill="none"
                      stroke="#c5371a40"
                      strokeWidth="1.5"
                    />
                    <circle cx="30" cy="10" r="2" fill="#c5371a60" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
