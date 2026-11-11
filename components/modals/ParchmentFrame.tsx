import { CompassRose } from "@/components/ui/CompassRose";

function Corner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute h-9 w-9 text-[#8a6331] opacity-55 sm:h-11 sm:w-11 ${className}`}
    >
      <path d="M4 26C4 13 13 4 26 4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 26C9 16 16 9 26 9" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
      <circle cx="6" cy="6" r="2.2" fill="currentColor" opacity="0.5" />
      <path d="M17 20C20 15 15 10 10 13" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
    </svg>
  );
}

/**
 * Non-interactive layer: burnt-looking rule lines, inked corners, fold marks,
 * a faint compass watermark, and the rope that holds the parchment up.
 */
export function ParchmentFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[5px]">
      <span className="absolute inset-[7px] rounded-[3px] border border-[#795226]/25" />
      <span className="absolute inset-[12px] rounded-[2px] border border-[#795226]/15" />

      <Corner className="left-1 top-1" />
      <Corner className="right-1 top-1 -scale-x-100" />
      <Corner className="bottom-1 left-1 -scale-y-100" />
      <Corner className="bottom-1 right-1 -scale-100" />

      <div className="parchment-folds absolute inset-0" />
      <CompassRose className="absolute -bottom-5 -left-5 h-32 w-32 text-[#765022] opacity-[0.08]" />

      <div className="absolute -top-px left-8 right-8">
        <div className="rope-line h-[5px]" />
      </div>
      <span className="absolute -top-1 left-7 h-3 w-3 rounded-full border border-[#6e4d25]/40 bg-[#b08a4e] shadow-sm" />
      <span className="absolute -top-1 right-7 h-3 w-3 rounded-full border border-[#6e4d25]/40 bg-[#b08a4e] shadow-sm" />

      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#8a5a26]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#7f5322]/15 to-transparent" />
    </div>
  );
}
