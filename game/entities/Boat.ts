import { Container, Graphics, Sprite } from "pixi.js";
import type { GameTextures } from "@/game/textures/proceduralTextures";
import { clamp, dampAngle, lerp } from "@/game/utils/math";

const MAX_SPEED = 225;
const ACCELERATION = 470;
const DRAG_SAILING = 0.85;
const DRAG_COASTING = 2.4;

export interface Direction {
  x: number;
  y: number;
}

/**
 * The boat is a small physics toy: accelerate, coast, turn with a little
 * inertia. Its visual bob and heel are deliberately separate from movement.
 */
export class Boat {
  readonly view = new Container();
  x = 0;
  y = 68;
  vx = 0;
  vy = 0;
  heading = 0;
  speed = 0;

  private readonly body = new Container();
  private readonly lantern = new Sprite();
  private dockHeading: number | null = null;
  private previousHeading = 0;
  private heel = 0;

  constructor(textures: GameTextures) {
    const shadow = new Graphics();
    shadow.ellipse(0, 6, 32, 15).fill({ color: 0x04282d, alpha: 0.28 });
    shadow.ellipse(2, 5, 22, 9).fill({ color: 0x04282d, alpha: 0.18 });
    this.view.addChild(shadow);

    const hull = new Graphics();
    hull.poly([0, -50, 18, -30, 25, 4, 19, 32, 0, 43, -19, 32, -25, 4, -18, -30])
      .fill(0x7a4f2e);
    hull.poly([0, -43, 13, -27, 19, 3, 14, 28, 0, 36, -14, 28, -19, 3, -13, -27])
      .fill(0xa87445);
    hull.ellipse(0, 3, 15, 25).fill(0xce9c62);
    hull.ellipse(-4, -4, 9, 15).fill({ color: 0xddb07a, alpha: 0.7 });
    // Plank lines in the hull.
    hull
      .moveTo(-17, 14)
      .quadraticCurveTo(0, 20, 17, 14)
      .stroke({ width: 1.2, color: 0x6b4225, alpha: 0.5 });
    hull
      .moveTo(-19, 22)
      .quadraticCurveTo(0, 29, 19, 22)
      .stroke({ width: 1, color: 0x6b4225, alpha: 0.35 });
    hull.rect(-4, 22, 8, 6).fill(0x7f5533);
    hull.rect(-2, 26, 4, 3).fill(0x6d4529);

    // Mast, sail, pennant.
    hull.rect(-1.6, -62, 3.2, 58).fill(0x54371f);
    const sail = new Graphics();
    sail
      .poly([3, -59, 30, -36, 33, -12, 3, -15])
      .fill(0xf4e7c5);
    sail.poly([4, -56, 25, -38, 27, -19, 4, -20]).fill({ color: 0xfbf2da, alpha: 0.7 });
    sail
      .moveTo(3, -59)
      .lineTo(3, -15)
      .stroke({ width: 1.4, color: 0xcbb385, alpha: 0.65 });
    sail.poly([-3, -58, -20, -46, -3, -44]).fill(0xe9ddbd);
    hull.addChild(sail);
    hull.poly([1.6, -62, 20, -58, 1.6, -52]).fill(0xb2543c);

    // A tiny stern lantern.
    hull.circle(-14, 26, 3.4).fill({ color: 0xffdc96, alpha: 0.9 });
    hull.circle(-14, 26, 5.4).stroke({ width: 1, color: 0x5f4327, alpha: 0.8 });

    this.body.addChild(hull);
    this.view.addChild(this.body);

    this.lantern.texture = textures.mote;
    this.lantern.anchor.set(0.5);
    this.lantern.position.set(-14, 26);
    this.lantern.scale.set(0.5);
    this.lantern.tint = 0xffd88d;
    this.lantern.alpha = 0.65;
    this.body.addChild(this.lantern);

    this.view.position.set(this.x, this.y);
    this.view.scale.set(0.92);
  }

  update(
    dt: number,
    input: Direction,
    canSail: boolean,
    docked: boolean,
    time: number,
    reducedMotion: boolean,
  ): void {
    const inputMagnitude = Math.hypot(input.x, input.y);

    if (canSail && inputMagnitude > 0.06) {
      const nx = input.x / inputMagnitude;
      const ny = input.y / inputMagnitude;
      this.vx += nx * ACCELERATION * dt;
      this.vy += ny * ACCELERATION * dt;
    }

    const drag = canSail ? (inputMagnitude > 0.06 ? DRAG_SAILING : DRAG_COASTING) : 3.1;
    const damping = Math.exp(-drag * dt);
    this.vx *= damping;
    this.vy *= damping;

    const rawSpeed = Math.hypot(this.vx, this.vy);
    if (rawSpeed > MAX_SPEED) {
      const ratio = MAX_SPEED / rawSpeed;
      this.vx *= ratio;
      this.vy *= ratio;
    }
    this.speed = Math.hypot(this.vx, this.vy);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.previousHeading = this.heading;
    if (this.dockHeading !== null) {
      this.heading = dampAngle(this.heading, this.dockHeading, 3.4, dt);
    } else if (this.speed > 7) {
      const desired = Math.atan2(this.vy, this.vx) + Math.PI / 2;
      this.heading = dampAngle(this.heading, desired, 5.2, dt);
    }

    const turnRate = Math.abs(this.heading - this.previousHeading) / Math.max(dt, 0.001);
    const targetHeel = clamp(-turnRate * 0.05, -0.12, 0.12) * clamp(this.speed / 120, 0, 1);
    this.heel = lerp(this.heel, targetHeel, reducedMotion ? 1 : 1 - Math.exp(-7 * dt));

    this.view.position.set(this.x, this.y);
    this.view.rotation = this.heading;
    this.body.y = reducedMotion ? 0 : Math.sin(time * 1.55) * 1.7 + Math.sin(time * 0.7) * 0.7;
    this.body.rotation = reducedMotion ? 0 : this.heel + Math.sin(time * 1.1) * 0.015;
    this.lantern.alpha = 0.5 + (Math.sin(time * 2.4) + 1) * 0.12;

    // When docked the boat should settle quickly, not drift off.
    if (docked) {
      this.vx *= Math.exp(-4.5 * dt);
      this.vy *= Math.exp(-4.5 * dt);
      this.speed = Math.hypot(this.vx, this.vy);
    }
  }

  faceToward(x: number, y: number): void {
    if (Math.hypot(x - this.x, y - this.y) < 1) return;
    this.dockHeading = Math.atan2(y - this.y, x - this.x) + Math.PI / 2;
  }

  releaseDock(): void {
    this.dockHeading = null;
  }

  brake(factor = 0.5): void {
    this.vx *= factor;
    this.vy *= factor;
    this.speed = Math.hypot(this.vx, this.vy);
  }

  /** Gently turns the boat back if it wanders past the charted sea. */
  constrain(radius: number, dt: number): void {
    const distance = Math.hypot(this.x, this.y);
    if (distance <= radius) return;
    const nx = this.x / distance;
    const ny = this.y / distance;
    const overshoot = distance - radius;
    this.vx -= nx * overshoot * 2.2 * dt;
    this.vy -= ny * overshoot * 2.2 * dt;
    if (distance > radius + 420) {
      this.x = nx * (radius + 420);
      this.y = ny * (radius + 420);
      this.vx *= 0.4;
      this.vy *= 0.4;
    }
  }
}
