/**
 * SauceDrip — SVG section divider
 *
 * Looks like sauce (or resin) dripping down from one section to the next.
 * Pure CSS/SVG — no images needed.
 */

interface SauceDripProps {
  color?: string;
  className?: string;
  flip?: boolean;
}

export default function SauceDrip({
  color = "#1a1a1a",
  className = "",
  flip = false,
}: SauceDripProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[60px] lg:h-[80px]"
      >
        <path
          d={`M0,0 L1440,0 L1440,20
              Q1380,20 1360,35 Q1340,50 1320,50 Q1300,50 1300,35 Q1300,20 1260,20
              Q1200,20 1180,40 Q1160,60 1140,60 Q1120,60 1110,45 Q1100,30 1080,20
              Q1020,20 1000,30 Q980,40 960,40 Q940,40 930,30 Q920,20 880,20
              Q840,20 820,50 Q800,80 780,80 Q760,80 750,55 Q740,30 720,20
              Q660,20 640,35 Q620,50 600,50 Q580,50 570,35 Q560,20 520,20
              Q480,20 460,45 Q440,70 420,70 Q400,70 390,50 Q380,30 360,20
              Q300,20 280,40 Q260,60 240,60 Q220,60 210,45 Q200,30 180,20
              Q120,20 100,35 Q80,50 60,50 Q40,50 30,35 Q20,20 0,20 Z`}
          fill={color}
        />
      </svg>
    </div>
  );
}
