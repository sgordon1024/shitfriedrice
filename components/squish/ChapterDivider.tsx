/**
 * ChapterDivider — Ornamental divider between story chapters
 *
 * SVG horizontal rule with a decorative fleuron in the center.
 * Three variants: default (simple ornament), game-intro, game-outro.
 */

interface ChapterDividerProps {
  variant?: "default" | "game-intro" | "game-outro";
  className?: string;
}

export default function ChapterDivider({
  variant = "default",
  className = "",
}: ChapterDividerProps) {
  if (variant === "game-intro") {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex-1 h-px bg-[#c5371a40]" />
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#c5371a80]" aria-hidden="true">
            <path d="M8 0L10 6H16L11 9.5L13 16L8 12L3 16L5 9.5L0 6H6Z" fill="currentColor" />
          </svg>
          <div className="flex-1 h-px bg-[#c5371a40]" />
        </div>
        <p className="storybook-chapter-num text-xs mt-4 tracking-[0.3em]">
          Whereupon the Adventure Begins
        </p>
        <div className="flex items-center gap-4 max-w-md mx-auto mt-4">
          <div className="flex-1 h-px bg-[#c5371a40]" />
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#c5371a80]" aria-hidden="true">
            <path d="M8 0L10 6H16L11 9.5L13 16L8 12L3 16L5 9.5L0 6H6Z" fill="currentColor" />
          </svg>
          <div className="flex-1 h-px bg-[#c5371a40]" />
        </div>
      </div>
    );
  }

  if (variant === "game-outro") {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex-1 h-px bg-[#c5371a40]" />
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#c5371a80]" aria-hidden="true">
            <path d="M8 0L10 6H16L11 9.5L13 16L8 12L3 16L5 9.5L0 6H6Z" fill="currentColor" />
          </svg>
          <div className="flex-1 h-px bg-[#c5371a40]" />
        </div>
        <p className="storybook-chapter-num text-xs mt-4 tracking-[0.3em]">
          And So It Was
        </p>
        <div className="flex items-center gap-4 max-w-md mx-auto mt-4">
          <div className="flex-1 h-px bg-[#c5371a40]" />
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#c5371a80]" aria-hidden="true">
            <path d="M8 0L10 6H16L11 9.5L13 16L8 12L3 16L5 9.5L0 6H6Z" fill="currentColor" />
          </svg>
          <div className="flex-1 h-px bg-[#c5371a40]" />
        </div>
      </div>
    );
  }

  // Default — simple ornamental divider
  return (
    <div className={`flex items-center gap-4 py-8 max-w-xs mx-auto ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-[#c5371a40]" />
      <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#c5371a60]">
        <circle cx="10" cy="10" r="2" fill="currentColor" />
        <circle cx="3" cy="10" r="1" fill="currentColor" />
        <circle cx="17" cy="10" r="1" fill="currentColor" />
      </svg>
      <div className="flex-1 h-px bg-[#c5371a40]" />
    </div>
  );
}
