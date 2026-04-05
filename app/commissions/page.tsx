/**
 * Commissions Page — "Let's make something dumb together"
 *
 * Shows commission availability (from Sanity), what Lydia makes,
 * the process, and the commission request form.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

// Commission types Lydia offers
const commissionTypes = [
  {
    title: "Custom Lava Lamps",
    description:
      "Prebiotic Broth vibes — hand-built iridescent mosaic base and cap, whatever colors make your brain happy. Your lava lamp will not look like anyone else's lava lamp and that's the whole point.",
  },
  {
    title: "Custom Game Boards",
    description:
      "Full 3D diorama game boards that will absolutely ruin game night because everyone will be too busy staring at the board to actually play. Real moss, tiny buildings, the whole ridiculous thing.",
  },
  {
    title: "Prop Food / Event Pieces",
    description:
      "Fake food for film, TV, events, or that one dinner party where you want to gaslight your guests. I literally made tacos for Bad Bunny's Super Bowl halftime show so like, I'm qualified.",
  },
  {
    title: "Oyster Shell Clocks",
    description:
      "Time Tellers — functioning wall clocks that look like the raw bar at a restaurant you can't get a reservation at. Real oyster shells, crushed ice resin, lemon wedges, optional LED underlighting. It tells time AND it's a vibe.",
  },
  {
    title: "Bolo Ties & Found-Object Jewelry",
    description:
      "Oyster shells, beach debris, weird Florida findings — if Lydia found it on the ground and thought 'I could wear that,' it's probably already a bolo tie.",
  },
  {
    title: "Something Completely Unhinged",
    description:
      "If you have an idea that makes people go 'wait, what?' then congratulations, you found the right artist. The weirder the idea, the faster Lydia says yes.",
  },
];

// The process steps
const processSteps = [
  "You fill out the form below like the brave creative soul you are",
  "Lydia responds within 2\u20133 days (unless she\u2019s elbow-deep in resin, in which case give her a sec)",
  "50% deposit, timeline agreed, Squish supervises",
  "You receive something that makes everyone who sees it go \u2018wait, is that real?\u2019",
];

// Budget options
const budgetOptions = [
  "Under $100",
  "$100–$300",
  "$300–$600",
  "$600+",
  "Let's talk",
];

// Timeline options
const timelineOptions = [
  "No rush",
  "1–2 months",
  "I need it soon, send help",
];

export default function CommissionsPage() {
  // TODO: Fetch commission status from Sanity when connected:
  // const settings = await sanityClient.fetch(siteSettingsQuery);
  const commissionStatus = "open"; // placeholder — managed via Sanity in production
  const commissionNote = "";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    description: "",
    budget: "",
    timeline: "",
    howFound: "",
    anythingElse: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Something went wrong");
      setIsSubmitted(true);
    } catch {
      setError("Okay something broke and it wasn't the resin this time. Try again or DM @shitfriedrice on Instagram.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Status badge based on commission availability
  const statusBadge = {
    open: <Badge variant="green">&#10022; Taking commissions</Badge>,
    waitlist: <Badge variant="yellow">&#10694; Join the waitlist</Badge>,
    closed: <Badge variant="red">&#10005; Commissions closed</Badge>,
  };

  return (
    <main id="main-content" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl text-sfr-cream mb-4">
          LET&apos;S MAKE SOMETHING ABSURD TOGETHER
        </h1>
        <div className="flex justify-center mb-4">
          {statusBadge[commissionStatus as keyof typeof statusBadge]}
        </div>
        {commissionNote && (
          <p className="font-[family-name:var(--font-syne)] text-sfr-cream/50 text-base">
            {commissionNote}
          </p>
        )}
      </div>

      {/* What she makes */}
      <section className="mb-16">
        <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-8 text-center">
          THINGS LYDIA WILL MAKE FOR YOU
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commissionTypes.map((type, i) => (
            <motion.div
              key={type.title}
              className="border-dashed-sfr p-5 bg-sfr-black/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="font-[family-name:var(--font-syne)] text-sfr-green font-bold text-sm mb-2">
                {type.title}
              </h3>
              <p className="text-sfr-cream/60 text-sm leading-relaxed">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The process */}
      <section className="mb-16">
        <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-8 text-center">
          THE PROCESS (IT&apos;S CHILL)
        </h2>
        <ol className="max-w-xl mx-auto space-y-4">
          {processSteps.map((step, i) => (
            <motion.li
              key={i}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-sfr-green text-sfr-black font-bold text-sm rounded-full">
                {i + 1}
              </span>
              <p className="text-sfr-cream/70 pt-1">{step}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Commission form */}
      <section>
        <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-sfr-cream mb-8 text-center">
          OKAY LET&apos;S DO THIS
        </h2>

        {isSubmitted ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="font-[family-name:var(--font-bebas)] text-4xl text-sfr-green mb-4">
              OH IT&apos;S HAPPENING.
            </p>
            <p className="font-[family-name:var(--font-syne)] text-sfr-cream/60 text-lg">
              Lydia&apos;s on it. Don&apos;t eat anything she makes in the meantime.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm mb-2"
              >
                What should I call you? *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-sfr-black border border-white/20 text-sfr-cream px-4 py-3 focus:border-sfr-green focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm mb-2"
              >
                Your email (for the important stuff) *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-sfr-black border border-white/20 text-sfr-cream px-4 py-3 focus:border-sfr-green focus:outline-none transition-colors"
              />
            </div>

            {/* What do you want made? */}
            <div>
              <label
                htmlFor="description"
                className="block font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm mb-2"
              >
                Okay so what am I making you? *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formState.description}
                onChange={handleChange}
                className="w-full bg-sfr-black border border-white/20 text-sfr-cream px-4 py-3 focus:border-sfr-green focus:outline-none transition-colors resize-y"
                placeholder="Go off. Be specific, be vague, send a mood board, describe a dream you had. The weirder the better."
              />
            </div>

            {/* Budget */}
            <div>
              <label
                htmlFor="budget"
                className="block font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm mb-2"
              >
                What&apos;s the budget situation?
              </label>
              <select
                id="budget"
                name="budget"
                value={formState.budget}
                onChange={handleChange}
                className="w-full bg-sfr-black border border-white/20 text-sfr-cream px-4 py-3 focus:border-sfr-green focus:outline-none transition-colors"
              >
                <option value="">Select one...</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="timeline"
                className="block font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm mb-2"
              >
                How soon do you need this in your life?
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formState.timeline}
                onChange={handleChange}
                className="w-full bg-sfr-black border border-white/20 text-sfr-cream px-4 py-3 focus:border-sfr-green focus:outline-none transition-colors"
              >
                <option value="">Select one...</option>
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* How did you find us? */}
            <div>
              <label
                htmlFor="howFound"
                className="block font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm mb-2"
              >
                How did you even find this place?
              </label>
              <input
                type="text"
                id="howFound"
                name="howFound"
                value={formState.howFound}
                onChange={handleChange}
                className="w-full bg-sfr-black border border-white/20 text-sfr-cream px-4 py-3 focus:border-sfr-green focus:outline-none transition-colors"
                placeholder="Instagram, the Super Bowl, a corgi, a friend with taste, a fever dream..."
              />
            </div>

            {/* Anything else */}
            <div>
              <label
                htmlFor="anythingElse"
                className="block font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm mb-2"
              >
                Anything else Lydia should know?
              </label>
              <textarea
                id="anythingElse"
                name="anythingElse"
                rows={3}
                value={formState.anythingElse}
                onChange={handleChange}
                className="w-full bg-sfr-black border border-white/20 text-sfr-cream px-4 py-3 focus:border-sfr-green focus:outline-none transition-colors resize-y"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sfr-red text-sm" role="alert">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Sending your vision into the void..." : "Send it to Lydia"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
