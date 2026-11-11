import { Application, Container, Ticker } from "pixi.js";
import { Camera } from "@/game/core/Camera";
import { KeyboardInput, combineInput } from "@/game/core/InputController";
import { joystickState, resetJoystick } from "@/game/core/inputState";
import { publishTelemetry, resetTelemetry } from "@/game/core/telemetry";
import { islands, WORLD_RADIUS } from "@/game/data/islands";
import { Boat } from "@/game/entities/Boat";
import { BoatWake } from "@/game/fx/BoatWake";
import { AmbientWorld } from "@/game/world/Ambient";
import { Island } from "@/game/world/Island";
import { Ocean } from "@/game/world/Ocean";
import {
  destroyGameTextures,
  getGameTextures,
  type GameTextures,
} from "@/game/textures/proceduralTextures";
import type {
  GameEngineOptions,
  IslandDefinition,
  SectionId,
} from "@/game/types";
import { clamp, distanceSquared } from "@/game/utils/math";

const ARRIVAL_DELAY_MS = 640;

/**
 * Owns the Pixi application and the game loop. React never touches the canvas
 * directly; it only receives arrival/nearby events and toggles paused state.
 */
export class GameEngine {
  private readonly app: Application;
  private readonly opts: GameEngineOptions;
  private readonly camera = new Camera();
  private readonly keyboard = new KeyboardInput();
  private readonly world = new Container();
  private readonly textures: GameTextures;
  private readonly ocean: Ocean;
  private readonly ambient: AmbientWorld;
  private readonly boat: Boat;
  private readonly wake: BoatWake;
  private readonly islandViews = new Map<SectionId, Island>();
  private readonly islandDefs = new Map<SectionId, IslandDefinition>();

  private active = false;
  private modalOpen = false;
  private dockedIsland: IslandDefinition | null = null;
  private nearbyId: SectionId | null = null;
  private blockedId: SectionId | null = null;
  private arrivalTimer: number | null = null;
  private readyNotified = false;
  private destroyed = false;
  private elapsed = 0;
  private baseZoom = 1;

  private constructor(app: Application, opts: GameEngineOptions) {
    this.app = app;
    this.opts = opts;
    this.textures = getGameTextures();
    this.ocean = new Ocean(this.textures, opts.reducedMotion);
    this.ambient = new AmbientWorld(this.textures, opts.reducedMotion);
    this.wake = new BoatWake(this.textures, opts.reducedMotion);
    this.boat = new Boat(this.textures);

    for (const def of islands) {
      this.islandDefs.set(def.id, def);
      const island = new Island(def, this.textures);
      this.islandViews.set(def.id, island);
    }
  }

  static async create(opts: GameEngineOptions): Promise<GameEngine> {
    const app = new Application();
    await app.init({
      resizeTo: opts.container,
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      powerPreference: "high-performance",
    });
    const engine = new GameEngine(app, opts);
    engine.build(opts.container);
    return engine;
  }

  setActive(active: boolean): void {
    if (this.active === active) return;
    this.active = active;
    this.keyboard.setEnabled(active && !this.modalOpen);
    if (!active) resetJoystick();
  }

  setModalOpen(open: boolean): void {
    if (this.modalOpen === open) return;
    this.modalOpen = open;
    resetJoystick();
    this.keyboard.setEnabled(this.active && !open);
    if (open) {
      this.boat.brake(0.35);
    } else if (this.dockedIsland) {
      this.releaseIsland();
    }
  }

  /** Called by React after a parchment closes; re-arms the same island. */
  releaseIsland(): void {
    const island = this.dockedIsland;
    if (!island) return;
    this.dockedIsland = null;
    this.blockedId = island.id;
    this.islandViews.get(island.id)?.setNearby(false);
    this.boat.releaseDock();
    if (this.arrivalTimer !== null) {
      window.clearTimeout(this.arrivalTimer);
      this.arrivalTimer = null;
    }
    publishTelemetry({ docked: null });
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.arrivalTimer !== null) window.clearTimeout(this.arrivalTimer);
    this.keyboard.dispose();
    this.app.ticker.remove(this.tick);
    this.app.destroy({ removeView: true }, { children: true, texture: false, textureSource: false });
    destroyGameTextures();
    resetTelemetry();
    resetJoystick();
  }

  private build(container: HTMLElement): void {
    this.app.canvas.setAttribute("aria-hidden", "true");
    this.app.canvas.setAttribute("role", "presentation");
    container.appendChild(this.app.canvas);

    this.world.addChild(...[...this.islandViews.values()].map((island) => island.view));
    this.world.addChild(this.wake.container);
    this.world.addChild(this.ambient.seaLayer);
    this.world.addChild(this.boat.view);
    this.world.addChild(this.ambient.skyLayer);

    this.app.stage.addChild(this.ocean.container);
    this.app.stage.addChild(this.world);
    this.app.stage.addChild(this.ambient.screenLayer);

    const width = this.app.screen.width;
    const height = this.app.screen.height;
    this.camera.setViewport(width, height);
    this.baseZoom = this.zoomForViewport(width);
    this.camera.snapTo(this.boat.x, this.boat.y, this.baseZoom);
    this.camera.apply(this.world);
    this.ocean.resize(width, height);
    this.app.ticker.add(this.tick);
  }

  private readonly tick = (ticker: Ticker): void => {
    if (this.destroyed) return;
    const dt = Math.min(ticker.deltaMS / 1000, 1 / 20);
    this.elapsed += dt;

    const width = this.app.screen.width;
    const height = this.app.screen.height;
    if (
      width !== this.camera.width ||
      height !== this.camera.height ||
      width !== this.ocean.size.width ||
      height !== this.ocean.size.height
    ) {
      this.camera.setViewport(width, height);
      this.ocean.resize(width, height);
      this.baseZoom = this.zoomForViewport(width);
    }

    const canSail = this.active && !this.modalOpen && !this.dockedIsland;
    const keyboard = this.keyboard.getVector();
    const joystick = joystickState.active ? joystickState : { x: 0, y: 0 };
    const input = canSail ? combineInput(keyboard, joystick) : { x: 0, y: 0 };

    this.boat.update(
      dt,
      input,
      canSail,
      Boolean(this.dockedIsland),
      this.elapsed,
      this.opts.reducedMotion,
    );
    this.boat.constrain(WORLD_RADIUS, dt);

    this.updateInteraction();

    const docked = this.dockedIsland;
    const targetZoom = docked ? this.baseZoom * 1.62 : this.baseZoom;
    this.camera.follow(
      docked ? docked.x : this.boat.x,
      docked ? docked.y : this.boat.y,
      targetZoom,
    );
    this.camera.update(dt, this.opts.reducedMotion);
    this.camera.apply(this.world);

    this.ocean.update(dt, this.camera, this.elapsed);
    this.wake.update(dt, this.boat, Boolean(docked));
    this.ambient.update(dt, this.elapsed, this.camera);
    for (const island of this.islandViews.values()) island.update(this.elapsed);

    publishTelemetry(
      {
        x: this.boat.x,
        y: this.boat.y,
        heading: this.boat.heading,
        speed: this.boat.speed,
        docked: this.dockedIsland?.id ?? null,
        nearby: this.nearbyId,
      },
      performance.now(),
    );

    if (!this.readyNotified) {
      this.readyNotified = true;
      this.opts.callbacks.onReady();
    }
  };

  private updateInteraction(): void {
    if (this.blockedId) {
      const blocked = this.islandDefs.get(this.blockedId);
      if (
        blocked &&
        Math.sqrt(distanceSquared(this.boat.x, this.boat.y, blocked.x, blocked.y)) >
          blocked.interactionRadius * 1.22
      ) {
        this.blockedId = null;
      }
    }

    if (this.dockedIsland || this.modalOpen || !this.active) return;

    let nearest: IslandDefinition | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const island of islands) {
      const distance = Math.sqrt(
        distanceSquared(this.boat.x, this.boat.y, island.x, island.y),
      );
      if (distance < island.interactionRadius && distance < nearestDistance) {
        nearest = island;
        nearestDistance = distance;
      }
    }

    const nextId = nearest?.id ?? null;
    if (nextId !== this.nearbyId) {
      if (this.nearbyId) this.islandViews.get(this.nearbyId)?.setNearby(false);
      this.nearbyId = nextId;
      if (nextId) this.islandViews.get(nextId)?.setNearby(true);
      this.opts.callbacks.onIslandNear(nextId);
    }

    if (nearest && nearest.id !== this.blockedId) {
      this.beginDock(nearest);
    }
  }

  private beginDock(island: IslandDefinition): void {
    this.dockedIsland = island;
    this.nearbyId = island.id;
    this.islandViews.get(island.id)?.setNearby(true);
    this.boat.faceToward(island.x, island.y);
    this.boat.brake(0.2);
    publishTelemetry({ docked: island.id, nearby: island.id });

    this.arrivalTimer = window.setTimeout(() => {
      this.arrivalTimer = null;
      if (this.destroyed || this.dockedIsland?.id !== island.id) return;
      this.modalOpen = true;
      this.keyboard.setEnabled(false);
      this.opts.callbacks.onArrive(island.id);
    }, this.opts.reducedMotion ? 0 : ARRIVAL_DELAY_MS);
  }

  private zoomForViewport(width: number): number {
    return clamp(width / 1180, 0.74, 1.04);
  }
}
