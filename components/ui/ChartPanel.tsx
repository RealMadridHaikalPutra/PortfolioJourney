"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  Anchor,
  ArrowRight,
  Castle,
  Check,
  Compass,
  Gem,
  House,
  LibraryBig,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { islands } from "@/game/data/islands";
import type { SectionId } from "@/game/types";
import { useGameStore } from "@/store/useGameStore";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { audioManager } from "@/game/audio/AudioManager";
import { CompassRose } from "@/components/ui/CompassRose";
import { RopeDivider } from "@/components/ui/ParchmentBits";

const ICONS: Record<SectionId, LucideIcon> = {
  home: House,
  about: UserRound,
  skills: LibraryBig,
  experience: Castle,
  portfolio: Gem,
  contact: Anchor,
};

/**
 * The accessible island index. Sailors get the made world; keyboard and
 * screen-reader visitors get every destination in a predictable dialog.
 */
export function ChartPanel() {
  const open = useGameStore((state) => state.chartOpen);
  const setChartOpen = useGameStore((state) => state.setChartOpen);
  const openSection = useGameStore((state) => state.openSection);
  const visited = useGameStore((state) => state.visited);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setChartOpen(false), [setChartOpen]);

  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    if (!open) return;
    audioManager.play("paper");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 cursor-default bg-[#021b20]/60"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chart-title"
        tabIndex={-1}
        className="chart-in paper scroll-paper absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col overflow-y-auto border-l border-[#5c3c1f]/40 shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.8)] outline-none"
      >
        <div className="relative border-b border-ink/15 px-5 pb-4 pt-6 sm:px-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-hand text-xl leading-none text-ember">The chart</p>
              <h2
                id="chart-title"
                className="mt-0.5 font-display text-3xl leading-none text-ink"
              >
                Choose an island
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close the chart"
              className="ghost-button flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/25 bg-parchment/60 text-ink hover:bg-parchment-aged"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Every island is a section of the portfolio. Open one directly, or close
            this chart and sail there yourself.
          </p>
          <CompassRose className="pointer-events-none absolute -right-3 bottom-1 h-24 w-24 text-brass/20" />
        </div>

        <div className="flex-1 px-5 py-5 sm:px-7">
          <ul className="space-y-2.5">
            {islands.map((island) => {
              const Icon = ICONS[island.id];
              const hasVisited = visited.includes(island.id);
              return (
                <li key={island.id}>
                  <button
                    type="button"
                    onClick={() => {
                      audioManager.play("click");
                      openSection(island.id);
                    }}
                    className="group flex w-full items-center gap-3 rounded-[3px] border border-ink/15 bg-parchment/40 p-3 text-left transition-all duration-200 hover:translate-x-1 hover:border-ink/30 hover:bg-parchment-aged/60"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15"
                      style={{
                        backgroundColor: `#${island.palette.grass.toString(16).padStart(6, "0")}`,
                        color: "#f8eccd",
                      }}
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-lg leading-none text-ink">
                          {island.name}
                        </span>
                        {hasVisited ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] uppercase tracking-[0.08em] text-moss">
                            <Check aria-hidden="true" className="h-3 w-3" />
                            visited
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        {island.tagline}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-ink-muted/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ember"
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <RopeDivider className="my-5" />

          <div className="rounded-[3px] border border-ink/12 bg-parchment/30 p-3">
            <p className="flex items-center gap-2 font-display text-base text-ink">
              <Compass aria-hidden="true" className="h-4 w-4 text-brass" />
              Sailing notes
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              <kbd className="rounded border border-ink/20 bg-parchment px-1 py-0.5 font-mono text-[10px]">WASD</kbd>{" "}
              or arrow keys to sail. Touch screens get a joystick. Sail inside an
              island&apos;s ring and the logbook opens on its own. Esc closes any open
              parchment.
            </p>
          </div>
        </div>

        <div className="border-t border-ink/15 px-5 py-4 sm:px-7">
          <p className="font-hand text-lg leading-none text-ink-muted">
            {visited.length} of {islands.length} islands explored
          </p>
        </div>
      </div>
    </div>
  );
}
