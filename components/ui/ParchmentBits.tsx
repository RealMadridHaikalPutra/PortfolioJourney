import type { ReactNode } from "react";
import { ArrowUpRight, Download, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CompassRose } from "@/components/ui/CompassRose";

export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`font-hand text-xl leading-none text-ember ${className}`}>{children}</p>
  );
}

export function PaperHeading({
  children,
  icon: Icon,
  id,
  className = "",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  id?: string;
  className?: string;
}) {
  return (
    <h3
      id={id}
      className={`flex items-center gap-2.5 font-display text-[1.45rem] leading-tight text-ink sm:text-2xl ${className}`}
    >
      {Icon ? <Icon aria-hidden="true" className="h-5 w-5 text-brass" strokeWidth={1.6} /> : null}
      {children}
    </h3>
  );
}

export function RopeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-ink/20 to-ink/25" />
      <CompassRose className="h-5 w-5 text-brass/80" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-ink/20 to-ink/25" />
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[2px] border border-ink/20 bg-parchment-aged/55 px-2 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.1em] text-ink-muted">
      {children}
    </span>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-ink/15 pl-3">
      <p className="font-display text-2xl leading-none text-ink">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-muted">{label}</p>
    </div>
  );
}

export function ActionLink({
  href,
  children,
  icon: Icon,
  external,
  download,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  external?: boolean;
  download?: boolean;
  variant?: "solid" | "outline" | "quiet";
  className?: string;
}) {
  const styles = {
    solid:
      "border-[#6e2a17]/50 bg-[#8f3a22] text-[#fff4d8] shadow-[0_8px_16px_-10px_rgba(60,20,8,0.8)] hover:bg-[#a3482b]",
    outline:
      "border-ink/30 bg-parchment/50 text-ink hover:border-ink/50 hover:bg-parchment-aged/70",
    quiet: "border-transparent text-ink hover:bg-parchment-aged/60",
  }[variant];

  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={`ghost-button inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border px-4 py-2 text-sm font-semibold tracking-wide ${styles} ${className}`}
    >
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} /> : null}
      <span>{children}</span>
      {external ? (
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />
      ) : download ? (
        <Download aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />
      ) : null}
    </a>
  );
}

export function WaxSeal({ label = "Island Journey" }: { label?: string }) {
  return (
    <div
      className="wax-seal relative flex h-14 w-14 items-center justify-center rounded-full"
      title={label}
      aria-hidden="true"
    >
      <span className="absolute inset-[3px] rounded-full border border-[#e8a282]/35" />
      <Compass className="h-6 w-6 text-[#f6d3b8]" strokeWidth={1.4} />
    </div>
  );
}

export function PaperNote({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-brass/50 pl-3 font-hand text-xl leading-snug text-ink-muted">
      {children}
    </p>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-sm border border-dashed border-ink/25 p-6 text-center text-sm italic text-ink-muted">
      {children}
    </p>
  );
}
