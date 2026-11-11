"use client";

import { Anchor, BookOpenText, Volume2, VolumeX } from "lucide-react";
import { islandById } from "@/game/data/islands";
import { useGameStore } from "@/store/useGameStore";
import { audioManager } from "@/game/audio/AudioManager";
import { CompassHud } from "@/components/ui/CompassHud";
import { MiniMap } from "@/components/ui/MiniMap";

export function Hud() {
  const nearby = useGameStore((state) => state.nearby);
  const visited = useGameStore((state) => state.visited);
  const soundOn = useGameStore((state) => state.soundOn);
  const chartOpen = useGameStore((state) => state.chartOpen);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const setChartOpen = useGameStore((state) => state.setChartOpen);
  const openSection = useGameStore((state) => state.openSection);

  const nearbyIsland = nearby ? islandById.get(nearby) : null;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20">
        <div className="flex items-start justify-between gap-3 p-3 safe-top safe-left safe-right sm:p-5">
          <div className="pointer-events-auto flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a86a]/40 bg-[#08363e]/85 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)]"
            >
              <Anchor className="h-4 w-4 text-[#e7d0a0]" strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-display text-[1.05rem] leading-none tracking-wide text-foam sm:text-xl">
                Island Journey
              </p>
              <p className="mt-0.5 font-hand text-sm leading-none text-foam/65 sm:text-base">
                Real Madrid Haikal Putra | Portfolio Interaktif
              </p>
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Matikan musik dan suara laut" : "Nyalakan musik dan suara laut"}
              title={soundOn ? "Musik & suasana laut aktif" : "Musik & suasana laut nonaktif"}
              className="ghost-button flex h-11 w-11 items-center justify-center rounded-[3px] border border-[#c9a86a]/35 bg-[#08363e]/90 text-[#f0ddb2] shadow-[0_10px_20px_-12px_rgba(0,0,0,0.8)] hover:bg-[#0c4a52]"
            >
              {soundOn ? (
                <Volume2 aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              ) : (
                <VolumeX aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                audioManager.play("click");
                setChartOpen(!chartOpen);
              }}
              aria-expanded={chartOpen}
              aria-haspopup="dialog"
              className="ghost-button flex h-11 items-center gap-2 rounded-[3px] border border-[#c9a86a]/35 bg-[#08363e]/90 px-2.5 text-[#f0ddb2] shadow-[0_10px_20px_-12px_rgba(0,0,0,0.8)] hover:bg-[#0c4a52] sm:px-3.5"
            >
              <BookOpenText aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] sm:inline">
                Peta Pulau
              </span>
              <span className="rounded-[2px] border border-[#c9a86a]/25 px-1 py-0.5 font-mono text-[10px] leading-none text-foam/75">
                {visited.length}/6
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 bottom-28 z-20 flex justify-center px-4 sm:bottom-24">
        {nearbyIsland ? (
          <button
            type="button"
            onClick={() => {
              audioManager.play("paper");
              openSection(nearbyIsland.id);
            }}
            aria-live="polite"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#c9a86a]/45 bg-[#092f36] px-4 py-2 text-[#f3e2b9] shadow-[0_16px_28px_-16px_rgba(0,0,0,0.9)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#e2c58e]/60"
          >
            <Anchor aria-hidden="true" className="h-4 w-4 text-[#d8b678]" />
            <span className="text-xs font-semibold uppercase tracking-[0.12em]">
              Menuju
            </span>
            <span className="h-3 w-px bg-[#c9a86a]/35" aria-hidden="true" />
            <span className="font-display text-base leading-none">
              {nearbyIsland.name}
            </span>
          </button>
        ) : null}
      </div>

      <CompassHud className="fixed bottom-5 left-5 z-20 hidden sm:flex" />
      <MiniMap className="fixed bottom-5 right-5 z-20 hidden lg:flex" />

      <p
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-10 hidden text-center font-hand text-lg text-foam/55 md:block"
      >
        WASD atau panah untuk bergerak.
      </p>
    </>
  );
}
