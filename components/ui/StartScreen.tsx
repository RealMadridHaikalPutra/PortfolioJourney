"use client";

import { Anchor, ArrowRight, BookOpenText, LoaderCircle, Volume2 } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import { useGameStore } from "@/store/useGameStore";
import { audioManager } from "@/game/audio/AudioManager";
import { CompassRose } from "@/components/ui/CompassRose";

interface StartScreenProps {
  coarse: boolean;
  engineError: boolean;
}

export function StartScreen({ coarse, engineError }: StartScreenProps) {
  const { profile } = useContent();
  const started = useGameStore((state) => state.started);
  const engineReady = useGameStore((state) => state.engineReady);
  const start = useGameStore((state) => state.start);
  const setChartOpen = useGameStore((state) => state.setChartOpen);

  const begin = () => {
    audioManager.play("click");
    start();
  };

  const openIndex = () => {
    audioManager.play("click");
    start();
    setChartOpen(true);
  };

  return (
    <div
      aria-hidden={started}
      inert={started || undefined}
      style={{
        transitionProperty: "opacity, visibility",
        transitionDuration: "500ms, 0ms",
        transitionDelay: started ? "0ms, 500ms" : "0ms",
        visibility: started ? "hidden" : "visible",
      }}
      className={`absolute inset-0 z-[60] flex flex-col overflow-y-auto ${
        started ? "pointer-events-none scale-[1.015] opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_20%,rgba(2,20,24,0.58)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-5 safe-top safe-left safe-right sm:px-8 sm:py-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a86a]/40 bg-[#08363e]/80"
            >
              <Anchor className="h-4 w-4 text-[#e7d0a0]" strokeWidth={1.6} />
            </span>
            <p className="font-display text-sm uppercase tracking-[0.18em] text-foam/85">
              A portfolio you can sail
            </p>
          </div>
          <p className="hidden items-center gap-2 font-hand text-lg leading-none text-foam/65 sm:flex">
            <Volume2 aria-hidden="true" className="h-4 w-4" />
            sound begins with the wind
          </p>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-10 sm:py-6">
          <CompassRose
            className="pointer-events-none absolute -left-12 top-1/2 hidden h-[340px] w-[340px] -translate-y-1/2 text-[#e9d5a3]/[0.1] xl:block"
          />
          <CompassRose
            className="pointer-events-none absolute -right-16 bottom-0 hidden h-[260px] w-[260px] text-[#e9d5a3]/[0.08] xl:block"
          />

          <div className="relative max-w-3xl text-center">
            <p className="font-hand text-2xl leading-none text-[#eac98e] sm:text-3xl">
              {profile.name} presents
            </p>
            <h1 className="mt-2 font-display text-[3.6rem] leading-[0.88] tracking-tight text-[#faf0d4] drop-shadow-[0_4px_22px_rgba(0,0,0,0.45)] sm:text-[5.7rem] md:text-[7rem]">
              Island
              <span className="block text-[#e7c783]">Journey</span>
            </h1>

            <div className="mx-auto mt-4 flex max-w-md items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8bc80]/50" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#d8bc80]/70" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8bc80]/50" />
            </div>

            <p className="mx-auto mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-foam/85 sm:text-lg">
              Six islands. One small wooden boat. A portfolio told through the water
              instead of a scroll bar.
            </p>
            <p className="mx-auto mt-2 max-w-lg font-hand text-xl leading-snug text-[#ead7a8] sm:text-2xl">
              {profile.tagline}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={begin}
                disabled={!engineReady || engineError}
                className="ghost-button inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[3px] border border-[#e4c78e]/50 bg-[#8f3a22] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#fff2d3] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.9)] hover:bg-[#a3482b] disabled:cursor-wait disabled:opacity-65 sm:w-auto"
              >
                {engineReady ? (
                  <Anchor aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <LoaderCircle
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin motion-reduce:animate-none"
                  />
                )}
                {engineError
                  ? "The sea is unavailable"
                  : engineReady
                    ? "Set sail"
                    : "Charting the waters"}
              </button>

              <button
                type="button"
                onClick={openIndex}
                className="ghost-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] border border-[#c9a86a]/35 bg-[#08363e]/75 px-5 py-3 text-sm font-semibold text-[#f1e0b9] hover:bg-[#0d4a52] sm:w-auto"
              >
                <BookOpenText aria-hidden="true" className="h-4 w-4 text-[#dcbf85]" />
                Open the island index
                <ArrowRight aria-hidden="true" className="h-4 w-4 opacity-70" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.12em] text-foam/55">
              <span>
                {coarse ? "Joystick" : "WASD / arrows"} to sail
              </span>
              <span className="h-3 w-px bg-foam/20" aria-hidden="true" />
              <span>Sail close to open an island</span>
              <span className="h-3 w-px bg-foam/20" aria-hidden="true" />
              <span>Esc to close</span>
            </div>

            <p className="mt-5 font-hand text-lg leading-none text-foam/55">
              Best with sound · no downloads · six islands
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#c9a86a]/20 pt-4 text-center sm:flex-row sm:text-left">
          <p className="font-display text-sm tracking-wide text-foam/65">
            {profile.role} · {profile.location}
          </p>
          <p className="font-hand text-lg leading-none text-foam/50">
            built with patience, salt, and 60 frames per second
          </p>
        </div>
      </div>
    </div>
  );
}
