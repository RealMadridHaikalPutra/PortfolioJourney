import { Container, Graphics, Sprite } from "pixi.js";
import type { Camera } from "@/game/core/Camera";
import type { GameTextures } from "@/game/textures/proceduralTextures";
import { clamp, mulberry32, randomRange, TAU } from "@/game/utils/math";

interface CloudEntity {
  container: Container;
  drift: number;
  bobPhase: number;
}

interface BirdEntity {
  view: Container;
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  phase: number;
  flapPhase: number;
}

interface FishEntity {
  view: Container;
  splash: Sprite;
  active: boolean;
  t: number;
  duration: number;
  startX: number;
  startY: number;
  dirX: number;
  dirY: number;
  arc: number;
  wait: number;
}

interface Mote {
  sprite: Sprite;
  vx: number;
  vy: number;
  phase: number;
  baseAlpha: number;
}

function makeCloud(textures: GameTextures, rng: () => number): Container {
  const container = new Container();
  const shadow = new Sprite(textures.cloud);
  shadow.anchor.set(0.5);
  shadow.y = 64;
  shadow.scale.set(randomRange(rng, 0.9, 1.5));
  shadow.tint = 0x042c33;
  shadow.alpha = 0.08;
  container.addChild(shadow);

  const cloud = new Sprite(textures.cloud);
  cloud.anchor.set(0.5);
  cloud.scale.set(randomRange(rng, 0.9, 1.6));
  cloud.tint = 0xfff9ea;
  cloud.alpha = randomRange(rng, 0.3, 0.52);
  cloud.rotation = randomRange(rng, -0.08, 0.08);
  container.addChild(cloud);
  return container;
}

function makeBird(rng: () => number): Container {
  const bird = new Container();
  const g = new Graphics();
  g.moveTo(-11, 0)
    .quadraticCurveTo(-5, -7, 0, 0)
    .quadraticCurveTo(5, -7, 11, 0)
    .stroke({ width: 2, color: 0x123f45, alpha: 0.7, cap: "round" });
  g.circle(0, 0, 1.2).fill({ color: 0x123f45, alpha: 0.7 });
  bird.addChild(g);
  bird.scale.set(randomRange(rng, 0.55, 0.9));
  return bird;
}

function makeFish(textures: GameTextures): { view: Container; splash: Sprite } {
  const view = new Container();
  const shadow = new Graphics();
  shadow.ellipse(0, 6, 9, 3).fill({ color: 0x06363c, alpha: 0.15 });
  view.addChild(shadow);

  const fish = new Graphics();
  fish.ellipse(0, 0, 7, 3).fill({ color: 0x2e6f6c, alpha: 0.9 });
  fish.poly([-7, 0, -13, -4, -13, 4]).fill({ color: 0x275e5b, alpha: 0.9 });
  fish.circle(3, -1, 0.8).fill({ color: 0xd7f2e8, alpha: 0.9 });
  view.addChild(fish);

  const splash = new Sprite(textures.foam);
  splash.anchor.set(0.5);
  splash.tint = 0xe6fbf3;
  splash.scale.set(0.28);
  splash.alpha = 0;
  view.addChild(splash);
  return { view, splash };
}

/**
 * Everything that makes the sea feel inhabited: drifting clouds with soft
 * shadows, circling birds, the occasional jumping fish, and warm light motes.
 */
export class AmbientWorld {
  readonly seaLayer = new Container();
  readonly skyLayer = new Container();
  readonly screenLayer = new Container();

  private readonly clouds: CloudEntity[] = [];
  private readonly birds: BirdEntity[] = [];
  private readonly fish: FishEntity[] = [];
  private readonly motes: Mote[] = [];
  private readonly rng = mulberry32(5150);
  private readonly reducedMotion: boolean;

  constructor(textures: GameTextures, reducedMotion: boolean) {
    this.reducedMotion = reducedMotion;
    const rng = this.rng;

    const cloudCount = reducedMotion ? 3 : 6;
    for (let i = 0; i < cloudCount; i += 1) {
      const container = makeCloud(textures, rng);
      container.position.set(randomRange(rng, -1600, 1600), randomRange(rng, -1500, 1400));
      container.scale.set(randomRange(rng, 0.85, 1.35));
      this.skyLayer.addChild(container);
      this.clouds.push({
        container,
        drift: randomRange(rng, 5, 12),
        bobPhase: randomRange(rng, 0, TAU),
      });
    }

    const birdCount = reducedMotion ? 2 : 5;
    for (let i = 0; i < birdCount; i += 1) {
      const view = makeBird(rng);
      this.skyLayer.addChild(view);
      this.birds.push({
        view,
        centerX: randomRange(rng, -700, 700),
        centerY: randomRange(rng, -600, 600),
        radiusX: randomRange(rng, 130, 320),
        radiusY: randomRange(rng, 90, 220),
        speed: randomRange(rng, 0.06, 0.14) * (rng() > 0.5 ? 1 : -1),
        phase: randomRange(rng, 0, TAU),
        flapPhase: randomRange(rng, 0, TAU),
      });
    }

    const fishCount = reducedMotion ? 1 : 3;
    for (let i = 0; i < fishCount; i += 1) {
      const { view, splash } = makeFish(textures);
      view.visible = false;
      this.seaLayer.addChild(view);
      this.fish.push({
        view,
        splash,
        active: false,
        t: 0,
        duration: 1,
        startX: 0,
        startY: 0,
        dirX: 0,
        dirY: 0,
        arc: 0,
        wait: randomRange(rng, 1, 6) + i * 2,
      });
    }

    const moteCount = reducedMotion ? 7 : 22;
    for (let i = 0; i < moteCount; i += 1) {
      const sprite = new Sprite(textures.mote);
      sprite.anchor.set(0.5);
      sprite.scale.set(randomRange(rng, 0.07, 0.2));
      sprite.alpha = 0;
      this.screenLayer.addChild(sprite);
      this.motes.push({
        sprite,
        vx: randomRange(rng, -6, 6),
        vy: randomRange(rng, -4, -1),
        phase: randomRange(rng, 0, TAU),
        baseAlpha: randomRange(rng, 0.15, 0.4),
      });
      // Seed an initial screen position; update() keeps it wrapped.
      sprite.position.set(randomRange(rng, 0, 1600), randomRange(rng, 0, 900));
    }
  }

  update(dt: number, time: number, camera: Camera): void {
    const width = camera.width;
    const height = camera.height;

    for (const cloud of this.clouds) {
      cloud.container.x += cloud.drift * dt;
      if (cloud.container.x > 1850) cloud.container.x = -1850;
      cloud.container.y += Math.sin(time * 0.08 + cloud.bobPhase) * 0.015;
    }

    for (const bird of this.birds) {
      const angle = time * bird.speed + bird.phase;
      bird.view.x = bird.centerX + Math.cos(angle) * bird.radiusX;
      bird.view.y = bird.centerY + Math.sin(angle) * bird.radiusY;
      bird.view.rotation = -angle - Math.PI / 2;
      bird.view.scale.y =
        Math.abs(Math.sin(time * 7 + bird.flapPhase)) * 0.7 + 0.4;
      const depth = clamp((bird.view.y + 800) / 1600, 0.6, 1.25);
      bird.view.scale.x = depth * 0.8;
    }

    for (const fish of this.fish) {
      if (!fish.active) {
        fish.wait -= dt;
        if (fish.wait <= 0 && !this.reducedMotion) this.spawnFish(fish, camera);
        continue;
      }
      fish.t += dt;
      const progress = clamp(fish.t / fish.duration, 0, 1);
      fish.view.x = fish.startX + fish.dirX * progress * 150;
      fish.view.y = fish.startY + fish.dirY * progress * 150;
      fish.view.rotation = Math.atan2(fish.dirY, fish.dirX);
      const arc = Math.sin(progress * Math.PI) * fish.arc;
      fish.view.scale.set(0.6 + arc / 40);
      fish.splash.alpha = Math.max(0, 1 - progress * 4) * 0.5;
      fish.splash.scale.set(0.2 + progress * 0.5);
      if (progress >= 1) {
        fish.active = false;
        fish.view.visible = false;
        fish.wait = randomRange(this.rng, 4, 12);
      }
    }

    for (const mote of this.motes) {
      const sprite = mote.sprite;
      sprite.x += mote.vx * dt;
      sprite.y += mote.vy * dt;
      if (sprite.x < -30) sprite.x = width + 30;
      if (sprite.x > width + 30) sprite.x = -30;
      if (sprite.y < -30) sprite.y = height + 30;
      if (sprite.y > height + 30) sprite.y = -30;
      sprite.alpha =
        (0.5 + Math.sin(time * 0.8 + mote.phase) * 0.5) * mote.baseAlpha;
    }
  }

  private spawnFish(fish: FishEntity, camera: Camera): void {
    const bounds = camera.getViewBounds(80);
    fish.startX = randomRange(
      this.rng,
      bounds.left + 60,
      bounds.right - 60,
    );
    fish.startY = randomRange(this.rng, bounds.top + 80, bounds.bottom - 80);
    const angle = randomRange(this.rng, 0, TAU);
    fish.dirX = Math.cos(angle);
    fish.dirY = Math.sin(angle);
    fish.arc = randomRange(this.rng, 10, 24);
    fish.duration = randomRange(this.rng, 0.8, 1.4);
    fish.t = 0;
    fish.active = true;
    fish.view.visible = true;
    fish.view.position.set(fish.startX, fish.startY);
    fish.view.scale.set(0.6);
    fish.splash.alpha = 0.45;
    fish.splash.scale.set(0.2);
  }
}
