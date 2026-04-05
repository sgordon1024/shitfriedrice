/**
 * Button Component
 *
 * The main button used throughout the site.
 * Two variants: "primary" (solid chartreuse) and "secondary" (outlined).
 * Both have the subtle CTA pulse animation.
 */

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 font-bold text-sm tracking-wide uppercase transition-all duration-200 min-h-[44px] min-w-[44px] cta-pulse";

  const variants = {
    primary:
      "bg-sfr-green text-sfr-black hover:bg-sfr-green-dark focus-visible:bg-sfr-green-dark",
    secondary:
      "border-2 border-sfr-cream text-sfr-cream hover:bg-sfr-cream hover:text-sfr-black focus-visible:bg-sfr-cream focus-visible:text-sfr-black",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  const combined = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`;

  // If there's an href, render as a link
  if (href) {
    return (
      <Link href={href} className={combined} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
