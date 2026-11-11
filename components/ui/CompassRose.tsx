import type { RefObject } from "react";

interface CompassRoseProps {
  className?: string;
  /** Rotation in radians for the needle; omit for a static decorative rose. */
  heading?: number;
  /** Optional live handle for the needle group, used by the HUD compass. */
  needleRef?: RefObject<SVGGElement | null>;
}

/**
 * A hand-inked compass rose. The static version is used as a watermark; the
 * HUD passes a heading and rotates only the needle group.
 */
export function CompassRose({ className, heading, needleRef }: CompassRoseProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path d="M50 10 L52 22 L50 25 L48 22 Z" fill="currentColor" opacity={angle % 90 === 0 ? 0.7 : 0.3} />
          <line x1="50" y1="9" x2="50" y2="4" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
        </g>
      ))}
      <g
        ref={needleRef}
        transform={heading === undefined ? undefined : `rotate(${(heading * 180) / Math.PI} 50 50)`}
      >
        <path d="M50 24 L56 50 L50 76 L44 50 Z" fill="currentColor" opacity="0.18" />
        <path d="M50 24 L54 50 L50 50 Z" fill="currentColor" opacity="0.9" />
        <path d="M50 24 L46 50 L50 50 Z" fill="currentColor" opacity="0.45" />
      </g>
      <g fontSize="8" fontFamily="Georgia, serif" fill="currentColor" textAnchor="middle" opacity="0.65">
        <text x="50" y="17">N</text>
        <text x="50" y="91">S</text>
        <text x="88" y="53">E</text>
        <text x="12" y="53">W</text>
      </g>
    </svg>
  );
}
