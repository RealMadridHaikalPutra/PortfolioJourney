"use client";

import { useEffect, useRef, useState } from "react";
import type { GameEngine } from "@/game/core/GameEngine";
import { audioManager } from "@/game/audio/AudioManager";
import { useCoarsePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useGameStore } from "@/store/useGameStore";
import { StartScreen } from "@/components/ui/StartScreen";
import { Hud } from "@/components/ui/Hud";
import { Joystick } from "@/components/ui/Joystick";
import { ChartPanel } from "@/components/ui/ChartPanel";
import { ModalLayer } from "@/components/modals/ModalLayer";
import { ContentProvider } from "@/components/content/ContentProvider";
import type { PortfolioContent } from "@/lib/content";

/**
 * Thin React boundary around the Pixi world. The engine is imported on demand
 * so Pixi and GSAP stay out of the initial document payload.
 */
export function GameStage({ content }: { content: PortfolioContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const started = useGameStore((state) => state.started);
  const modal = useGameStore((state) => state.modal);
  const chartOpen = useGameStore((state) => state.chartOpen);
  const [engineError, setEngineError] = useState(false);

  useEffect(() => {
    void audioManager.enable();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let engine: GameEngine | null = null;

    const boot = async () => {
      useGameStore.getState().setEngineReady(false);
      try {
        const { GameEngine: Engine } = await import("@/game/core/GameEngine");
        if (cancelled || !containerRef.current) return;
        engine = await Engine.create({
          container: containerRef.current,
          reducedMotion,
          callbacks: {
            onReady: () => {
              if (!cancelled) useGameStore.getState().setEngineReady(true);
            },
            onIslandNear: (id) => useGameStore.getState().setNearby(id),
            onArrive: (id) => {
              // A soft hull-in-water cue as the anchor drops.
              audioManager.play("splash");
              useGameStore.getState().openSection(id);
            },
          },
        });
        if (cancelled) {
          engine.destroy();
          engine = null;
          return;
        }
        engineRef.current = engine;
        const state = useGameStore.getState();
        engine.setActive(state.started);
        engine.setModalOpen(Boolean(state.modal) || state.chartOpen);
      } catch (error) {
        console.error("[island-journey] the sea could not be rendered", error);
        if (!cancelled) setEngineError(true);
      }
    };

    void boot();
    return () => {
      cancelled = true;
      engineRef.current = null;
      engine?.destroy();
      engine = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    return useGameStore.subscribe((state, previous) => {
      if (state.started !== previous.started) {
        engineRef.current?.setActive(state.started);
      }
    });
  }, []);

  useEffect(() => {
    const overlayOpen = Boolean(modal) || chartOpen;
    engineRef.current?.setModalOpen(overlayOpen);
    audioManager.setDucked(overlayOpen);
  }, [modal, chartOpen]);

  useEffect(() => {
    return () => {
      audioManager.setDucked(false);
    };
  }, []);

  return (
    <ContentProvider content={content}>
      <div className="sea-backdrop relative h-dvh w-full overflow-hidden">
        <div
          ref={containerRef}
          aria-hidden="true"
          className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,rgba(2,18,22,0.48)_100%)]"
        />
        <div
          aria-hidden="true"
          className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.16]"
        />

        <StartScreen coarse={coarsePointer} engineError={engineError} />

        {started && !modal ? <Hud /> : null}
        {started && !modal && !chartOpen && coarsePointer ? <Joystick /> : null}

        <ChartPanel />
        <ModalLayer />
      </div>
    </ContentProvider>
  );
}
