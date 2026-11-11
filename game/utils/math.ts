export const TAU = Math.PI * 2;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

/**
 * Frame-rate independent exponential smoothing.
 * `lambda` is roughly "how fast", higher is snappier (4–12 feels natural).
 */
export function damp(from: number, to: number, lambda: number, dt: number): number {
  return lerp(from, to, 1 - Math.exp(-lambda * dt));
}

export function normalizeAngle(angle: number): number {
  const wrapped = angle % TAU;
  return wrapped < -Math.PI ? wrapped + TAU : wrapped > Math.PI ? wrapped - TAU : wrapped;
}

/** Shortest-path angular smoothing — avoids the 359°→1° spin. */
export function dampAngle(from: number, to: number, lambda: number, dt: number): number {
  const delta = normalizeAngle(to - from);
  return normalizeAngle(from + delta * (1 - Math.exp(-lambda * dt)));
}

export function distanceSquared(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

/** Deterministic PRNG so every reload paints the same archipelago. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomRange(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

export function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length) % items.length];
}

/** Points around a circle with seeded radius jitter, for organic island shapes. */
export function blobPoints(
  radius: number,
  seed: number,
  count = 14,
  irregularity = 0.16,
): Array<{ x: number; y: number }> {
  const rng = mulberry32(seed);
  const points: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * TAU;
    const wobble = 1 + (rng() - 0.5) * irregularity * 2;
    points.push({
      x: Math.cos(angle) * radius * wobble,
      y: Math.sin(angle) * radius * wobble * 0.92,
    });
  }
  return points;
}
