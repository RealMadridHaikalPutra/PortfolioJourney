import { Container, Sprite } from "pixi.js";
import type { GameTextures } from "@/game/textures/proceduralTextures";
import { clamp, mulberry32, randomRange } from "@/game/utils/math";

interface WakeParticle {
  sprite: Sprite;
  life: number;
  maxLife: number;
  growth: number;
  driftX: number;
  driftY: number;
  spin: number;
  baseAlpha: number;
}

interface Ripple {
  sprite: Sprite;
  life: number;
  maxLife: number;
  growth: number;
  baseAlpha: number;
}

export interface WakeSource {
  x: number;
  y: number;
  heading: number;
  speed: number;
}

const WAKE_POOL_SIZE = 48;
const RIPPLE_POOL_SIZE = 5;

/**
 * Object-pooled boat wake: two diverging foam trails plus slow ripples.
 * No allocations per frame after construction.
 */
export class BoatWake {
  readonly container = new Container();
  private readonly particles: WakeParticle[] = [];
  private readonly ripples: Ripple[] = [];
  private readonly rng = mulberry32(8181);
  private spawnTimer = 0;
  private rippleTimer = 0;
  private cursor = 0;
  private rippleCursor = 0;

  constructor(textures: GameTextures, private readonly reducedMotion: boolean) {
    for (let i = 0; i < WAKE_POOL_SIZE; i += 1) {
      const sprite = new Sprite(textures.foam);
      sprite.anchor.set(0.5);
      sprite.visible = false;
      sprite.tint = 0xe7fbf4;
      this.container.addChild(sprite);
      this.particles.push({
        sprite,
        life: 0,
        maxLife: 1,
        growth: 0,
        driftX: 0,
        driftY: 0,
        spin: 0,
        baseAlpha: 0,
      });
    }

    for (let i = 0; i < RIPPLE_POOL_SIZE; i += 1) {
      const sprite = new Sprite(textures.foam);
      sprite.anchor.set(0.5);
      sprite.visible = false;
      sprite.tint = 0xd9f7ef;
      this.container.addChildAt(sprite, 0);
      this.ripples.push({ sprite, life: 0, maxLife: 1, growth: 0, baseAlpha: 0 });
    }
  }

  update(dt: number, boat: WakeSource, docked: boolean): void {
    const speedRatio = clamp(boat.speed / 220, 0, 1);
    this.spawnTimer += dt;
    this.rippleTimer += dt;

    if (!docked && speedRatio > 0.12) {
      const interval = this.reducedMotion ? 0.16 : 0.055 - speedRatio * 0.02;
      if (this.spawnTimer >= interval) {
        this.spawnTimer = 0;
        const sternX = boat.x - Math.cos(boat.heading - Math.PI / 2) * 38;
        const sternY = boat.y - Math.sin(boat.heading - Math.PI / 2) * 38;
        const spread = 11 + speedRatio * 8;
        const perpX = Math.cos(boat.heading);
        const perpY = Math.sin(boat.heading);
        this.spawn(sternX + perpX * spread, sternY + perpY * spread, speedRatio, 1);
        this.spawn(sternX - perpX * spread, sternY - perpY * spread, speedRatio, -1);
      }
    }

    if (this.rippleTimer >= (this.reducedMotion ? 3.2 : 1.8)) {
      this.rippleTimer = 0;
      this.spawnRipple(boat.x, boat.y, docked);
    }

    for (const particle of this.particles) {
      if (particle.life <= 0) continue;
      particle.life -= dt;
      if (particle.life <= 0) {
        particle.sprite.visible = false;
        continue;
      }
      const progress = 1 - particle.life / particle.maxLife;
      particle.sprite.x += particle.driftX * dt;
      particle.sprite.y += particle.driftY * dt;
      particle.sprite.rotation += particle.spin * dt;
      particle.sprite.scale.set(
        particle.sprite.scale.x + particle.growth * dt,
        particle.sprite.scale.y + particle.growth * dt * 0.82,
      );
      particle.sprite.alpha = particle.baseAlpha * Math.sin(progress * Math.PI) * 1.2;
    }

    for (const ripple of this.ripples) {
      if (ripple.life <= 0) continue;
      ripple.life -= dt;
      if (ripple.life <= 0) {
        ripple.sprite.visible = false;
        continue;
      }
      const progress = 1 - ripple.life / ripple.maxLife;
      const scale = 0.18 + progress * ripple.growth;
      ripple.sprite.scale.set(scale, scale * 0.72);
      ripple.sprite.alpha = ripple.baseAlpha * (1 - progress) ** 1.7;
    }
  }

  clear(): void {
    for (const particle of this.particles) {
      particle.life = 0;
      particle.sprite.visible = false;
    }
    for (const ripple of this.ripples) {
      ripple.life = 0;
      ripple.sprite.visible = false;
    }
  }

  private spawn(x: number, y: number, speedRatio: number, side: number): void {
    const particle = this.particles[this.cursor];
    this.cursor = (this.cursor + 1) % this.particles.length;
    const maxLife = randomRange(this.rng, 0.8, 1.55);
    particle.life = maxLife;
    particle.maxLife = maxLife;
    particle.growth = randomRange(this.rng, 0.13, 0.26);
    particle.driftX = randomRange(this.rng, -9, 9) - side * 8;
    particle.driftY = randomRange(this.rng, -9, 9) + 4;
    particle.spin = randomRange(this.rng, -0.5, 0.5);
    particle.baseAlpha = 0.16 + speedRatio * 0.3;
    const startScale = randomRange(this.rng, 0.1, 0.2);
    particle.sprite.visible = true;
    particle.sprite.position.set(x, y);
    particle.sprite.scale.set(startScale, startScale * 0.8);
    particle.sprite.alpha = 0;
    particle.sprite.rotation = randomRange(this.rng, 0, Math.PI);
  }

  private spawnRipple(x: number, y: number, docked: boolean): void {
    const ripple = this.ripples[this.rippleCursor];
    this.rippleCursor = (this.rippleCursor + 1) % this.ripples.length;
    ripple.maxLife = 2.4;
    ripple.life = 2.4;
    ripple.growth = docked ? 2.4 : 1.9;
    ripple.baseAlpha = docked ? 0.18 : 0.12;
    ripple.sprite.visible = true;
    ripple.sprite.position.set(x, y);
    ripple.sprite.scale.set(0.18, 0.13);
    ripple.sprite.alpha = 0;
  }
}
