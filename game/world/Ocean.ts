import { Container, Sprite, TilingSprite } from "pixi.js";
import type { Camera } from "@/game/core/Camera";
import type { GameTextures } from "@/game/textures/proceduralTextures";
import { clamp, mulberry32, randomRange, TAU } from "@/game/utils/math";

interface WaterLayer {
  sprite: TilingSprite;
  parallax: number;
  driftX: number;
  driftY: number;
  alpha: number;
}

interface Sparkle {
  sprite: Sprite;
  worldX: number;
  worldY: number;
  drift: number;
  phase: number;
}

function wrap(value: number, min: number, max: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/**
 * The sea is a stack of seamlessly tiled, procedurally painted textures that
 * scroll at different rates, plus a small pool of drifting glints. It covers
 * the viewport at any size and costs two draw calls per layer.
 */
export class Ocean {
  readonly container = new Container();
  private readonly layers: WaterLayer[] = [];
  private readonly sparkles: Sparkle[] = [];
  private readonly rng = mulberry32(7331);
  private viewWidth = 1;
  private viewHeight = 1;

  constructor(textures: GameTextures, reducedMotion: boolean) {
    this.addLayer(textures.waterA, 0.52, 8, 3, 0.5, 1.35);
    this.addLayer(textures.waterB, 0.78, -6, 2, 0.4, 2.1);
    this.addLayer(textures.waterA, 0.34, 16, -4, 0.22, 3.4);

    const sparkleCount = reducedMotion ? 8 : 26;
    for (let i = 0; i < sparkleCount; i += 1) {
      const sprite = new Sprite(textures.foam);
      sprite.anchor.set(0.5);
      sprite.tint = 0xf1fffa;
      const scale = randomRange(this.rng, 0.04, 0.13);
      sprite.scale.set(scale, scale * 0.55);
      sprite.alpha = randomRange(this.rng, 0.05, 0.18);
      this.container.addChild(sprite);
      this.sparkles.push({
        sprite,
        worldX: randomRange(this.rng, -1400, 1400),
        worldY: randomRange(this.rng, -1000, 1000),
        drift: randomRange(this.rng, 2, 8),
        phase: randomRange(this.rng, 0, TAU),
      });
    }
  }

  get size(): { width: number; height: number } {
    return { width: this.viewWidth, height: this.viewHeight };
  }

  resize(width: number, height: number): void {
    this.viewWidth = Math.max(1, width);
    this.viewHeight = Math.max(1, height);
    for (const layer of this.layers) {
      layer.sprite.width = width + 160;
      layer.sprite.height = height + 160;
      layer.sprite.position.set(-80, -80);
    }
  }

  update(dt: number, camera: Camera, time: number): void {
    for (const layer of this.layers) {
      layer.sprite.tilePosition.x += (camera.x * layer.parallax + time * layer.driftX - layer.sprite.tilePosition.x) * 0.12;
      layer.sprite.tilePosition.y += (camera.y * layer.parallax + time * layer.driftY - layer.sprite.tilePosition.y) * 0.12;
      // Sway the glint layers gently so the surface never looks like wallpaper.
      layer.sprite.alpha = layer.alpha * (0.92 + Math.sin(time * 0.35 + layer.parallax * 10) * 0.08);
    }

    for (const sparkle of this.sparkles) {
      sparkle.worldX += sparkle.drift * dt;
      sparkle.worldY -= sparkle.drift * 0.35 * dt;
      const screenX = wrap(sparkle.worldX - camera.x * 0.72, -100, this.viewWidth + 100);
      const screenY = wrap(sparkle.worldY - camera.y * 0.72, -100, this.viewHeight + 100);
      sparkle.sprite.position.set(screenX, screenY);
      sparkle.sprite.alpha =
        (0.06 + (Math.sin(time * 1.3 + sparkle.phase) + 1) * 0.055) *
        (0.6 + Math.sin(time * 0.4 + sparkle.phase) * 0.4);
    }
  }

  private addLayer(
    texture: GameTextures["waterA"],
    parallax: number,
    driftX: number,
    driftY: number,
    alpha: number,
    scale: number,
  ): void {
    const sprite = new TilingSprite({
      texture,
      width: this.viewWidth + 160,
      height: this.viewHeight + 160,
    });
    sprite.position.set(-80, -80);
    sprite.tileScale.set(scale, scale);
    sprite.alpha = alpha;
    sprite.tint = 0xffffff;
    this.container.addChild(sprite);
    this.layers.push({ sprite, parallax, driftX, driftY, alpha });
  }

  /** Used by the HUD to keep the sea calm when the world is paused. */
  setMotionScale(scale: number): void {
    const clamped = clamp(scale, 0, 1);
    for (const layer of this.layers) layer.sprite.alpha = layer.alpha * clamped;
  }
}
