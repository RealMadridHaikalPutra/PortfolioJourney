"use client";

import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { ParchmentFrame } from "@/components/modals/ParchmentFrame";
import { Kicker, WaxSeal } from "@/components/ui/ParchmentBits";

interface ParchmentDialogProps {
  title: string;
  kicker: string;
  closing: boolean;
  wide?: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * The treasure-map surface. Drops in, unrolls its contents, and reverses the
 * whole performance on close. Focus is trapped while it is open.
 */
export function ParchmentDialog({
  title,
  kicker,
  closing,
  wide = false,
  onClose,
  children,
}: ParchmentDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const handleClose = useCallback(() => onClose(), [onClose]);

  useFocusTrap(panelRef, !closing, handleClose);

  useEffect(() => {
    let cancelled = false;
    let timeline: { kill: () => void } | null = null;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      const content = contentRef.current;
      if (!panel || !backdrop) return;

      const { gsap } = await import("gsap");
      if (cancelled) return;

      if (prefersReduced) {
        gsap.set(backdrop, { opacity: closing ? 0 : 1 });
        gsap.set(panel, { opacity: closing ? 0 : 1, y: 0, scale: 1, rotation: 0 });
        gsap.set(content, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      if (closing) {
        const tl = gsap.timeline();
        tl.to(panel, {
          y: 34,
          scale: 0.965,
          rotation: 0.7,
          opacity: 0,
          duration: 0.36,
          ease: "power2.in",
        }).to(backdrop, { opacity: 0, duration: 0.3 }, 0.02);
        timeline = tl;
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.32 }, 0)
        .fromTo(
          panel,
          { y: -86, scale: 0.93, rotation: -1.7, opacity: 0 },
          {
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.72,
            ease: "back.out(1.18)",
          },
          0,
        )
        .fromTo(
          panel,
          { boxShadow: "0 10px 20px rgba(0,0,0,0.25)" },
          { boxShadow: "0 36px 70px -24px rgba(2,18,22,0.8)", duration: 0.6 },
          0.08,
        )
        .fromTo(
          content,
          { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.5 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.62,
            ease: "power2.inOut",
          },
          0.2,
        );
      timeline = tl;
    };

    void run();
    return () => {
      cancelled = true;
      timeline?.kill();
    };
  }, [closing]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div
        ref={backdropRef}
        aria-hidden="true"
        onClick={handleClose}
        className="absolute inset-0 bg-[#021b20]/75"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`parchment-surface relative flex max-h-[93dvh] w-full flex-col overflow-hidden rounded-[5px] outline-none ${
          wide ? "max-w-5xl" : "max-w-3xl"
        }`}
      >
        <ParchmentFrame />

        <header className="relative z-[2] shrink-0 px-5 pb-2 pt-6 sm:px-9 sm:pt-8">
          <div className="pr-12">
            <Kicker>{kicker}</Kicker>
            <h2
              id={titleId}
              className="mt-0.5 font-display text-[2rem] leading-[1.05] text-ink sm:text-[2.6rem]"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="ghost-button absolute right-4 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 bg-parchment/55 text-ink hover:bg-parchment-aged/80 sm:right-8 sm:top-7"
            aria-label="Close the logbook"
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
          </button>

          <div className="mt-4 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-ink/15" />
            <span className="h-1.5 w-1.5 rotate-45 bg-brass/70" />
            <span className="h-px w-16 bg-ink/15" />
          </div>
        </header>

        <div className="scroll-paper relative z-[2] min-h-0 flex-1 overflow-y-auto px-5 pb-10 pt-3 sm:px-9 sm:pb-12">
          <div ref={contentRef}>{children}</div>
        </div>

        <div className="pointer-events-none absolute -bottom-2 right-6 z-[3] sm:right-10">
          <WaxSeal />
        </div>
      </div>
    </div>
  );
}
