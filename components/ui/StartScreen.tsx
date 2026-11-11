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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#021418]/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_20%,rgba(2,20,24,0.58)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-3 safe-top safe-left safe-right sm:px-8 sm:py-4">

        {/* Top bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c9a86a]/40 bg-[#08363e]/80 sm:h-8 sm:w-8"
            >
              <Anchor className="h-3 w-3 text-[#e7d0a0] sm:h-3.5 sm:w-3.5" strokeWidth={1.6} />
            </span>
            <p className="truncate font-display text-[10px] uppercase tracking-[0.15em] text-foam/85 sm:text-xs sm:tracking-[0.18em]">
              Petualangan Portfolio
            </p>
          </div>
          <p className="hidden shrink-0 items-center gap-2 font-hand text-sm leading-none text-foam/65 sm:flex sm:text-base">
            <Volume2 aria-hidden="true" className="h-3.5 w-3.5" />
            Gunakan Suara Untuk Pengalaman Terbaik
          </p>
        </div>

        {/* Main content — vertically centered, scrollable on very small screens */}
        <div className="relative flex flex-1 items-center justify-center py-2 sm:py-3">
          {/* Decorative compass roses — desktop only */}
          <CompassRose
            className="pointer-events-none absolute -left-12 top-1/2 hidden h-[260px] w-[260px] -translate-y-1/2 text-[#e9d5a3]/[0.1] xl:block"
          />
          <CompassRose
            className="pointer-events-none absolute -right-16 bottom-0 hidden h-[200px] w-[200px] text-[#e9d5a3]/[0.08] xl:block"
          />

          <div className="relative w-full max-w-3xl text-center">
            {/* Tagline */}
            <p className="font-hand text-base leading-tight text-[#eac98e] sm:text-xl sm:leading-none">
              Selamat datang di dunia portfolio saya
            </p>

            {/* Title */}
            <h1 className="mt-1 font-display text-[clamp(2rem,10vw,5.2rem)] leading-[0.88] tracking-tight text-[#faf0d4] drop-shadow-[0_4px_22px_rgba(0,0,0,0.45)] sm:mt-1.5">
              Island
              <span className="block text-[#e7c783]">Journey</span>
            </h1>

            {/* Divider */}
            <div className="mx-auto mt-2 flex max-w-[14rem] items-center gap-3 sm:mt-3 sm:max-w-sm" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8bc80]/50" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#d8bc80]/70" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8bc80]/50" />
            </div>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-xs text-balance text-xs leading-relaxed text-foam/85 sm:mt-3 sm:max-w-lg sm:text-sm md:text-base">
              Enam pulau. Satu perahu kecil. Jelajahi cerita saya sebagai Full Stack Developer melalui pengalaman, proyek, dan teknologi.
            </p>

            {/* Tagline from profile */}
            <p className="mx-auto mt-1.5 max-w-xs font-hand text-base leading-snug text-[#ead7a8] sm:max-w-md sm:text-lg md:text-xl">
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="mt-4 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-center">
              <button
                type="button"
                onClick={begin}
                disabled={!engineReady || engineError}
                className="ghost-button inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[3px] border border-[#e4c78e]/50 bg-[#8f3a22] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#fff2d3] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.9)] hover:bg-[#a3482b] disabled:cursor-wait disabled:opacity-65 sm:w-auto sm:py-2"
              >
                {engineReady ? (
                  <Anchor aria-hidden="true" className="h-3.5 w-3.5" />
                ) : (
                  <LoaderCircle
                    aria-hidden="true"
                    className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
                  />
                )}
                {engineError
                  ? "Cuaca Sedang Buruk"
                  : engineReady
                    ? "Mulai Berlayar"
                    : "Memuat Mesin"}
              </button>

              <button
                type="button"
                onClick={openIndex}
                className="ghost-button inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[3px] border border-[#c9a86a]/35 bg-[#08363e]/75 px-4 py-2.5 text-xs font-semibold text-[#f1e0b9] hover:bg-[#0d4a52] sm:w-auto sm:py-2"
              >
                <BookOpenText aria-hidden="true" className="h-3.5 w-3.5 text-[#dcbf85]" />
                Lihat Peta Pulau
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />
              </button>
            </div>

            {/* Controls hint — hidden on small mobile, shown on sm+ */}
            <div className="mt-3 hidden flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[10px] uppercase tracking-[0.1em] text-foam/55 sm:flex">
              <span>Gunakan WASD atau Tombol Panah untuk menggerakkan perahu</span>
              <span className="h-3 w-px bg-foam/20" aria-hidden="true" />
              <span>Dekati pulau untuk memasukinya</span>
              <span className="h-3 w-px bg-foam/20" aria-hidden="true" />
              <span>Tekan ESC untuk keluar</span>
            </div>

            {/* Controls hint — compact, mobile-only */}
            <p className="mt-3 text-[10px] uppercase tracking-[0.09em] text-foam/45 sm:hidden">
              WASD / Tombol Panah · Dekati pulau untuk masuk
            </p>

            {/* Footer note */}
            <p className="mt-2.5 font-hand text-sm leading-none text-foam/50 sm:mt-3 sm:text-base">
              Nikmati dengan suara · Dibuat dengan Next.js & PixiJS
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-1 border-t border-[#c9a86a]/20 pt-2 text-center sm:flex-row sm:justify-between sm:gap-1.5 sm:pt-2.5 sm:text-left">
          <p className="font-display text-[10px] tracking-wide text-foam/65 sm:text-xs">
            {profile.role} · {profile.location}
          </p>
          <p className="font-hand text-sm leading-none text-foam/50 sm:text-base">
            Dibangun dengan kreativitas, secangkir kopi, dan ribuan baris kode.
          </p>
        </div>
      </div>
    </div>
  );
}