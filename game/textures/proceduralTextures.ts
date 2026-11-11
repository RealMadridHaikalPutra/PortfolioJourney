import { Texture } from "pixi.js";
import { mulberry32, TAU } from "@/game/utils/math";

export interface GameTextures {
  waterA: Texture;
  waterB: Texture;
  foam: Texture;
  cloud: Texture;
  mote: Texture;
  coin: Texture;
}

function makeCanvas(width: number, height = width): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function seamlessTile(
  size: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
): HTMLCanvasElement {
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  // Draw each stroke nine times so the tile repeats without hard seams.
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      ctx.save();
      ctx.translate(dx * size, dy * size);
      draw(ctx);
      ctx.restore();
    }
  }
  return canvas;
}

function waterTile(size: number, seed: number, strength: number): HTMLCanvasElement {
  const rng = mulberry32(seed);
  return seamlessTile(size, (ctx) => {
    for (let i = 0; i < 22; i += 1) {
      const x = rng() * size;
      const y = rng() * size;
      const length = 24 + rng() * 74;
      const bend = (rng() - 0.5) * 26;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + length * 0.5, y + bend, x + length, y + bend * 0.2);
      ctx.strokeStyle = `rgba(232, 250, 243, ${0.025 + rng() * strength})`;
      ctx.lineWidth = 0.7 + rng() * 1.4;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    for (let i = 0; i < 90; i += 1) {
      const x = rng() * size;
      const y = rng() * size;
      ctx.beginPath();
      ctx.arc(x, y, 0.4 + rng() * 1.2, 0, TAU);
      ctx.fillStyle = `rgba(240, 255, 250, ${0.015 + rng() * 0.05})`;
      ctx.fill();
    }
  });
}

function foamTexture(size = 160): HTMLCanvasElement {
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 2, half, half, half);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.62)");
  gradient.addColorStop(0.72, "rgba(255, 255, 255, 0.16)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const rng = mulberry32(77);
  for (let i = 0; i < 34; i += 1) {
    const angle = rng() * TAU;
    const radius = rng() * half * 0.8;
    ctx.beginPath();
    ctx.arc(half + Math.cos(angle) * radius, half + Math.sin(angle) * radius, 0.5 + rng() * 2.2, 0, TAU);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + rng() * 0.5})`;
    ctx.fill();
  }
  return canvas;
}

function cloudTexture(width = 320, height = 160): HTMLCanvasElement {
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const rng = mulberry32(202);
  const blobs = 9;
  for (let i = 0; i < blobs; i += 1) {
    const x = width * (0.18 + (i / blobs) * 0.64) + (rng() - 0.5) * 22;
    const y = height * (0.5 + (rng() - 0.5) * 0.26);
    const radius = 22 + rng() * 30;
    const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    gradient.addColorStop(0.55, "rgba(255, 255, 255, 0.55)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TAU);
    ctx.fill();
  }
  return canvas;
}

function moteTexture(size = 64): HTMLCanvasElement {
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, "rgba(255, 244, 203, 0.95)");
  gradient.addColorStop(0.3, "rgba(255, 226, 150, 0.5)");
  gradient.addColorStop(1, "rgba(255, 214, 120, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

function coinTexture(size = 64): HTMLCanvasElement {
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half * 0.85, half * 0.8, 2, half, half, half * 0.9);
  gradient.addColorStop(0, "#fff2b5");
  gradient.addColorStop(0.55, "#e6b44a");
  gradient.addColorStop(1, "#9b6a1d");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(half, half, half * 0.72, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(92, 60, 14, 0.65)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(half, half, half * 0.55, 0, TAU);
  ctx.stroke();
  return canvas;
}

let cached: GameTextures | null = null;

/**
 * Textures are generated in a canvas once per page — no network requests, no
 * sprite atlas needed, and everything stays crisp at any resolution.
 */
export function getGameTextures(): GameTextures {
  if (cached) return cached;
  cached = {
    waterA: Texture.from(waterTile(256, 19, 0.11)),
    waterB: Texture.from(waterTile(256, 41, 0.06)),
    foam: Texture.from(foamTexture()),
    cloud: Texture.from(cloudTexture()),
    mote: Texture.from(moteTexture()),
    coin: Texture.from(coinTexture()),
  };
  return cached;
}

export function destroyGameTextures(): void {
  if (!cached) return;
  Object.values(cached).forEach((texture) => texture.destroy(true));
  cached = null;
}
