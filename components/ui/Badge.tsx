/**
 * Badge Component
 *
 * Small status badges used around the site.
 * - Stock badges on product cards ("One left", "Gone")
 * - Commission status badge ("Taking commissions", "Waitlist", "Closed")
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "yellow" | "red" | "silver";
  className?: string;
}

export default function Badge({
  children,
  variant = "green",
  className = "",
}: BadgeProps) {
  const variants = {
    green: "bg-sfr-green/20 text-sfr-green border-sfr-green/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    red: "bg-sfr-red/20 text-red-400 border-sfr-red/30",
    silver: "bg-sfr-silver/20 text-sfr-silver border-sfr-silver/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded-full font-[family-name:var(--font-syne-mono)] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
