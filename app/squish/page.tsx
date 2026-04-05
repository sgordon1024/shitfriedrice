/**
 * Squish Page — The Tale of Squish
 *
 * A dedicated page for Lydia's corgi, Squish.
 * Features a fairy tale story in old book typography,
 * an arcade game where Squish jumps over sauce packets,
 * and lots of photos of the best dog in the world.
 */

import SquishStorybook from "@/components/squish/SquishStorybook";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Tale of Squish — Shitfriedrice",
  description:
    "The fairy tale of Squish, the corgi who guards Lydia's studio from rogue sauce packets and falling lava lamps. Play the arcade game. Read the story. Pet the dog (mentally).",
  openGraph: {
    title: "The Tale of Squish — Shitfriedrice",
    description:
      "A corgi. A studio full of lava lamps. An uprising of sentient sauce packets. This is Squish's story.",
  },
};

export default function SquishPage() {
  return (
    <main id="main-content" className="pt-16">
      <SquishStorybook />
    </main>
  );
}
