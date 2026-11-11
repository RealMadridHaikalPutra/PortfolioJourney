import type { WorldTelemetry } from "@/game/types";

/**
 * A tiny, render-free pub/sub channel for navigation gizmos. Keeping this out
 * of React state means the boat can move at 60fps without re-rendering the HUD.
 */
const state: WorldTelemetry = {
  x: 0,
  y: 0,
  heading: 0,
  speed: 0,
  docked: null,
  nearby: null,
};

const listeners = new Set<() => void>();

let lastPublish = 0;

export function publishTelemetry(patch: Partial<WorldTelemetry>, now = performance.now()): void {
  Object.assign(state, patch);
  // 12Hz is plenty for a compass and minimap, and saves wakeups.
  if (now - lastPublish < 80) return;
  lastPublish = now;
  listeners.forEach((listener) => listener());
}

export function getTelemetry(): Readonly<WorldTelemetry> {
  return state;
}

export function subscribeTelemetry(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetTelemetry(): void {
  Object.assign(state, {
    x: 0,
    y: 0,
    heading: 0,
    speed: 0,
    docked: null,
    nearby: null,
  });
  lastPublish = 0;
}
