/**
 * Marquee — Continuously scrolling ticker strip
 *
 * Endlessly scrolling text about Lydia's work.
 * Pure CSS animation — no JS library needed.
 * Duplicated content ensures seamless loop.
 */

export default function Marquee() {
  const text =
    "handmade \u2022 one of a kind \u2022 probably resin \u2022 lava lamps that slap \u2022 sauce packet connoisseur \u2022 bad bunny knows \u2022 made with love and weird energy \u2022 your fridge deserves this \u2022 condiments are art \u2022 ";

  return (
    <div
      className="bg-sfr-black border-y border-sfr-green/20 py-3 overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap marquee-track">
        {/* Duplicate the text so it loops seamlessly */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-syne-mono)] text-sfr-green text-sm tracking-widest uppercase px-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
