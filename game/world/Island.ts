import { Container, Graphics, Sprite, Text } from "pixi.js";
import type { GameTextures } from "@/game/textures/proceduralTextures";
import type { IslandDefinition } from "@/game/types";
import { blobPoints, clamp, mulberry32, randomRange, TAU } from "@/game/utils/math";
import { createLandmark, type LandmarkView } from "@/game/world/landmarks";

interface Swayer {
  node: Container;
  baseRotation: number;
  amplitude: number;
  phase: number;
}

function displayFontFamily(): string {
  if (typeof window === "undefined") return "Georgia, serif";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-fell")
    .trim();
  return value ? `${value}, Georgia, serif` : "Georgia, serif";
}

function traceBlob(g: Graphics, points: Array<{ x: number; y: number }>): void {
  const last = points[points.length - 1];
  const first = points[0];
  g.moveTo((last.x + first.x) / 2, (last.y + first.y) / 2);
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const next = points[(i + 1) % points.length];
    g.quadraticCurveTo(
      point.x,
      point.y,
      (point.x + next.x) / 2,
      (point.y + next.y) / 2,
    );
  }
  g.closePath();
}

function fillBlob(
  g: Graphics,
  radius: number,
  seed: number,
  color: number,
  alpha = 1,
  irregularity = 0.09,
): void {
  traceBlob(g, blobPoints(radius, seed, 16, irregularity));
  g.fill({ color, alpha });
}

function makePalm(
  palette: IslandDefinition["palette"],
  rng: () => number,
  scale: number,
): { view: Container; crown: Container } {
  const view = new Container();
  const trunk = new Graphics();
  trunk
    .moveTo(0, 0)
    .quadraticCurveTo(6, -20, 2, -38)
    .stroke({ width: 5.4, color: 0x7b5433, cap: "round" });
  trunk
    .moveTo(0, 0)
    .quadraticCurveTo(6, -20, 2, -38)
    .stroke({ width: 2, color: 0xa87c52, alpha: 0.7, cap: "round" });
  trunk.ellipse(0, 1, 8, 3).fill({ color: 0x8a6742, alpha: 0.65 });
  view.addChild(trunk);

  const crown = new Container();
  crown.position.set(2, -38);
  const leafCount = 7;
  for (let i = 0; i < leafCount; i += 1) {
    const leaf = new Graphics();
    const light = i % 2 === 0;
    leaf.ellipse(17, 0, 18, 5.2).fill(light ? palette.grassLight : palette.grassDark);
    leaf.ellipse(16, -1, 14, 1.6).fill({ color: 0xffffff, alpha: 0.09 });
    leaf.rotation = (i / leafCount) * TAU + randomRange(rng, -0.1, 0.1);
    leaf.scale.set(1, randomRange(rng, 0.75, 1.15));
    crown.addChild(leaf);
  }
  const coconuts = new Graphics();
  coconuts.circle(0, 1, 3.4).fill(0x6b4a2b);
  coconuts.circle(4, 3, 2.2).fill(0x886035);
  crown.addChild(coconuts);
  view.addChild(crown);
  view.scale.set(scale);
  return { view, crown };
}

/**
 * A single island: painterly shoreline layers, a unique landmark, local
 * decorations, and a carved name plaque. All motion is cosmetic and cheap.
 */
export class Island {
  readonly view = new Container();
  private readonly halo: Sprite;
  private readonly swayers: Swayer[] = [];
  private readonly landmark: LandmarkView;
  private readonly sign: Container;
  private near = false;
  private phase: number;
  private readonly seedRng: () => number;

  constructor(
    readonly def: IslandDefinition,
    textures: GameTextures,
  ) {
    this.view.position.set(def.x, def.y);
    this.phase = def.seed * 0.013;
    this.seedRng = mulberry32(def.seed);
    const r = def.visualRadius;
    const palette = def.palette;

    this.halo = new Sprite(textures.foam);
    this.halo.anchor.set(0.5);
    this.halo.width = r * 3.4;
    this.halo.height = r * 3.4;
    this.halo.tint = palette.water;
    this.halo.alpha = 0.12;
    this.view.addChild(this.halo);

    const layers = new Graphics();
    fillBlob(layers, r * 1.22, def.seed + 1, palette.water, 0.2, 0.11);
    fillBlob(layers, r * 1.12, def.seed + 2, palette.water, 0.22, 0.08);
    fillBlob(layers, r, def.seed + 3, palette.sandDark, 0.95, 0.08);
    fillBlob(layers, r * 0.94, def.seed + 4, palette.sand, 1, 0.07);
    fillBlob(layers, r * 0.77, def.seed + 5, palette.grassDark, 0.95, 0.09);
    fillBlob(layers, r * 0.72, def.seed + 6, palette.grass, 1, 0.08);
    fillBlob(layers, r * 0.56, def.seed + 7, palette.grassLight, 0.42, 0.14);
    fillBlob(layers, r * 0.3, def.seed + 8, palette.grassLight, 0.24, 0.2);

    // A pale surf line where sand meets water.
    traceBlob(layers, blobPoints(r * 0.965, def.seed + 9, 18, 0.06));
    layers.stroke({ width: 2.4, color: 0xf7f2d9, alpha: 0.4 });

    const rng = this.seedRng;
    for (let i = 0; i < 26; i += 1) {
      const angle = rng() * TAU;
      const distance = randomRange(rng, r * 0.8, r * 0.97);
      layers.circle(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance * 0.92,
        randomRange(rng, 0.8, 2.2),
      ).fill({ color: 0xfff3ce, alpha: 0.35 });
    }
    for (let i = 0; i < 34; i += 1) {
      const angle = rng() * TAU;
      const distance = randomRange(rng, 0, r * 0.66);
      layers.circle(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance * 0.9,
        randomRange(rng, 0.8, 1.8),
      ).fill({ color: rng() > 0.5 ? palette.grassDark : 0x9ec07f, alpha: 0.4 });
    }
    this.view.addChild(layers);

    this.addDecorations(textures);
    this.landmark = createLandmark(def.landmark, palette, textures);
    this.landmark.view.position.set(0, -8);
    this.landmark.view.scale.set(clamp(r / 175, 0.82, 1.1));
    this.view.addChild(this.landmark.view);

    this.sign = this.createSign();
    this.view.addChild(this.sign);
  }

  /** Called by the engine when the boat is within the interaction radius. */
  setNearby(value: boolean): void {
    this.near = value;
  }

  update(time: number): void {
    const pulse = (Math.sin(time * 0.7 + this.phase) + 1) / 2;
    this.halo.alpha = 0.1 + pulse * 0.045 + (this.near ? 0.07 : 0);
    const haloScale = 1 + Math.sin(time * 0.5 + this.phase) * 0.012;
    this.halo.scale.set((this.def.visualRadius * 3.4) / 160 * haloScale);

    this.landmark.update(time);

    for (const swayer of this.swayers) {
      swayer.node.rotation =
        swayer.baseRotation + Math.sin(time * 0.9 + swayer.phase) * swayer.amplitude;
    }

    // The sign hangs from two ropes; it breathes very slightly.
    this.sign.rotation = Math.sin(time * 0.8 + this.phase) * 0.006;
  }

  private addDecorations(textures: GameTextures): void {
    const palette = this.def.palette;
    const r = this.def.visualRadius;
    const rng = this.seedRng;
    const decor = new Container();
    this.view.addChild(decor);

    const palmAngles =
      this.def.landmark === "harbor" ? [3.5, 4.6, 2.7] : [2.4, 3.8, 5.5, 0.9];
    palmAngles.forEach((angle, index) => {
      const distance = r * (0.5 + (index % 2) * 0.14);
      const palm = makePalm(palette, rng, randomRange(rng, 0.72, 1.02));
      palm.view.position.set(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance * 0.86,
      );
      palm.view.rotation = randomRange(rng, -0.12, 0.12);
      decor.addChild(palm.view);
      this.swayers.push({
        node: palm.crown,
        baseRotation: randomRange(rng, -0.1, 0.1),
        amplitude: randomRange(rng, 0.05, 0.11),
        phase: randomRange(rng, 0, TAU) + index,
      });
    });

    switch (this.def.id) {
      case "about": {
        const flowers = new Graphics();
        for (let i = 0; i < 24; i += 1) {
          const angle = rng() * TAU;
          const distance = randomRange(rng, r * 0.3, r * 0.66);
          flowers
            .circle(
              Math.cos(angle) * distance,
              Math.sin(angle) * distance * 0.86,
              randomRange(rng, 1.4, 2.6),
            )
            .fill({
              color: rng() > 0.45 ? palette.accentLight : 0xfff1d2,
              alpha: 0.85,
            });
        }
        decor.addChild(flowers);
        break;
      }
      case "skills": {
        const books = new Graphics();
        for (let i = 0; i < 4; i += 1) {
          const x = -r * 0.55 + i * 13;
          const y = r * 0.34 + (i % 2) * 4;
          books.rect(x, y, 10, 4).fill(i % 2 === 0 ? 0x9a4b3a : 0x4f6b7a);
          books.rect(x + 1, y - 3, 8, 3).fill(0xb8893f);
        }
        decor.addChild(books);
        break;
      }
      case "experience": {
        const banners = new Graphics();
        [-1, 1].forEach((side) => {
          banners.rect(side * r * 0.5, r * 0.28, 2.4, 22).fill(0x6b5335);
          banners
            .poly([
              side * r * 0.5,
              r * 0.3,
              side * r * 0.5 + side * 16,
              r * 0.33,
              side * r * 0.5,
              r * 0.37,
            ])
            .fill(palette.accent);
        });
        decor.addChild(banners);
        break;
      }
      case "portfolio": {
        const crystals = new Graphics();
        for (let i = 0; i < 5; i += 1) {
          const x = randomRange(rng, -r * 0.5, r * 0.5);
          const y = randomRange(rng, -r * 0.1, r * 0.45);
          const size = randomRange(rng, 3, 6);
          crystals
            .poly([x, y - size * 1.8, x + size, y, x, y + size, x - size, y])
            .fill({ color: palette.accentLight, alpha: 0.8 });
        }
        decor.addChild(crystals);
        break;
      }
      case "contact": {
        const crates = new Graphics();
        crates.rect(-r * 0.5, r * 0.34, 16, 13).fill(0xa5774c);
        crates.rect(-r * 0.5, r * 0.34, 16, 3).fill(0xc39260);
        crates.rect(-r * 0.5 + 18, r * 0.38, 11, 10).fill(0x8f653f);
        decor.addChild(crates);
        break;
      }
      case "home": {
        const lantern = new Sprite(textures.mote);
        lantern.anchor.set(0.5);
        lantern.position.set(r * 0.36, r * 0.3);
        lantern.scale.set(0.35);
        lantern.tint = 0xffdd95;
        lantern.alpha = 0.5;
        decor.addChild(lantern);
        break;
      }
    }
  }

  private createSign(): Container {
    const sign = new Container();
    const r = this.def.visualRadius;
    sign.position.set(0, r * 0.92 + 42);

    const ropes = new Graphics();
    ropes
      .moveTo(-30, -24)
      .lineTo(-18, 2)
      .moveTo(30, -24)
      .lineTo(18, 2)
      .stroke({ width: 1.6, color: 0xcdb47e, alpha: 0.85 });
    sign.addChild(ropes);

    const plank = new Graphics();
    plank.roundRect(-62, 0, 124, 31, 3).fill(0x6e4a2c);
    plank.roundRect(-60, 2, 120, 27, 2).fill(0x8a6039);
    plank.rect(-56, 6, 112, 2).fill({ color: 0xa87c4d, alpha: 0.7 });
    plank.rect(-56, 23, 112, 1.5).fill({ color: 0x5a3a20, alpha: 0.55 });
    sign.addChild(plank);

    const label = new Text({
      text: this.def.name.toUpperCase(),
      style: {
        fontFamily: displayFontFamily(),
        fontSize: 17,
        fill: 0xf6e7c2,
        letterSpacing: 3.2,
        align: "center",
      },
    });
    label.anchor.set(0.5);
    label.position.set(0, 16.5);
    label.resolution = 2;
    sign.addChild(label);

    const nail = new Graphics();
    nail.circle(-52, 9, 1.8).fill(0x3f2a17);
    nail.circle(52, 9, 1.8).fill(0x3f2a17);
    sign.addChild(nail);

    return sign;
  }
}
