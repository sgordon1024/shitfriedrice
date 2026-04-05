/**
 * Marquee — Continuously scrolling ticker strip
 *
 * Endlessly scrolling text about Lydia's work.
 * Pure CSS animation — no JS library needed.
 * Duplicated content ensures seamless loop.
 */

export default function Marquee() {
  const text =
    "handmade by a woman in a garage \u2022 one of a kind like you babe \u2022 it\u2019s probably resin \u2022 lava lamps that have no business going that hard \u2022 sauce packet sommelier \u2022 bad bunny literally knows who i am \u2022 made with love and fumes \u2022 your fridge called and it\u2019s begging \u2022 condiments are a lifestyle \u2022 squish approved \u2022 ";

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
