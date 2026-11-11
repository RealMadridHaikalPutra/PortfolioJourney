import type { Container } from "pixi.js";
import { damp } from "@/game/utils/math";

/**
 * Owns the transform between world space and the viewport. The camera never
 * snaps: every target is approached with frame-rate independent smoothing.
 */
export class Camera {
  x = 0;
  y = 0;
  zoom = 1;

  private targetX = 0;
  private targetY = 0;
  private targetZoom = 1;
  private viewWidth = 1;
  private viewHeight = 1;

  setViewport(width: number, height: number): void {
    this.viewWidth = Math.max(1, width);
    this.viewHeight = Math.max(1, height);
  }

  get width(): number {
    return this.viewWidth;
  }

  get height(): number {
    return this.viewHeight;
  }

  follow(x: number, y: number, zoom: number): void {
    this.targetX = x;
    this.targetY = y;
    this.targetZoom = zoom;
  }

  snapTo(x: number, y: number, zoom: number): void {
    this.follow(x, y, zoom);
    this.x = x;
    this.y = y;
    this.zoom = zoom;
  }

  update(dt: number, reducedMotion: boolean): void {
    if (reducedMotion) {
      this.x = this.targetX;
      this.y = this.targetY;
      this.zoom = this.targetZoom;
      return;
    }
    this.x = damp(this.x, this.targetX, 3.4, dt);
    this.y = damp(this.y, this.targetY, 3.4, dt);
    this.zoom = damp(this.zoom, this.targetZoom, 2.6, dt);
  }

  apply(world: Container): void {
    world.scale.set(this.zoom);
    world.position.set(
      this.viewWidth / 2 - this.x * this.zoom,
      this.viewHeight / 2 - this.y * this.zoom,
    );
  }

  screenToWorld(sx: number, sy: number): { x: number; y: number } {
    return {
      x: (sx - this.viewWidth / 2) / this.zoom + this.x,
      y: (sy - this.viewHeight / 2) / this.zoom + this.y,
    };
  }

  getViewBounds(padding = 0): { left: number; right: number; top: number; bottom: number } {
    const halfW = this.viewWidth / (2 * this.zoom) + padding;
    const halfH = this.viewHeight / (2 * this.zoom) + padding;
    return {
      left: this.x - halfW,
      right: this.x + halfW,
      top: this.y - halfH,
      bottom: this.y + halfH,
    };
  }
}
