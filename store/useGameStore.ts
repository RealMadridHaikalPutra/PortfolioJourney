"use client";

import { create } from "zustand";
import { audioManager } from "@/game/audio/AudioManager";
import type { SectionId } from "@/game/types";
import type { ProjectId } from "@/lib/content/projects";

export type ModalState =
  | { kind: "section"; section: SectionId }
  | { kind: "project"; project: ProjectId };

interface GameStore {
  engineReady: boolean;
  started: boolean;
  modal: ModalState | null;
  nearby: SectionId | null;
  visited: SectionId[];
  soundOn: boolean;
  chartOpen: boolean;

  setEngineReady: (ready: boolean) => void;
  start: () => void;
  openSection: (section: SectionId) => void;
  openProject: (project: ProjectId) => void;
  backToPortfolio: () => void;
  closeModal: () => void;
  setNearby: (section: SectionId | null) => void;
  toggleSound: () => void;
  setChartOpen: (open: boolean) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  engineReady: false,
  started: false,
  modal: null,
  nearby: null,
  visited: [],
  soundOn: false,
  chartOpen: false,

  setEngineReady: (ready) => set({ engineReady: ready }),

  start: () => {
    if (get().started) return;
    set({ started: true, chartOpen: false, soundOn: true });
    void audioManager.enable();
    audioManager.setDucked(false);
  },

  openSection: (section) =>
    set((state) => ({
      modal: { kind: "section", section },
      chartOpen: false,
      visited: state.visited.includes(section)
        ? state.visited
        : [...state.visited, section],
    })),

  openProject: (project) =>
    set({
      modal: { kind: "project", project },
      chartOpen: false,
    }),

  backToPortfolio: () =>
    set({
      modal: { kind: "section", section: "portfolio" },
    }),

  closeModal: () => set({ modal: null }),

  setNearby: (nearby) => {
    if (get().nearby === nearby) return;
    set({ nearby });
  },

  toggleSound: () => {
    const next = !get().soundOn;
    set({ soundOn: next });
    if (next) {
      void audioManager.enable();
      audioManager.setMuted(false);
      audioManager.play("click");
    } else {
      audioManager.setMuted(true);
    }
  },

  setChartOpen: (open) => set({ chartOpen: open }),
}));
