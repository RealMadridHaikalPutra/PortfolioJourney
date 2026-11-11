import { Container, Graphics, Sprite } from "pixi.js";
import type { GameTextures } from "@/game/textures/proceduralTextures";
import type { IslandPalette, LandmarkKind } from "@/game/types";
import { mulberry32, randomRange, TAU } from "@/game/utils/math";

export interface LandmarkView {
  view: Container;
  update: (time: number) => void;
}

function ellipse(
  g: Graphics,
  x: number,
  y: number,
  rx: number,
  ry: number,
  color: number,
  alpha = 1,
): void {
  g.ellipse(x, y, rx, ry).fill({ color, alpha });
}

function groundShadow(view: Container, rx = 58, ry = 17): void {
  const g = new Graphics();
  ellipse(g, 0, 26, rx, ry, 0x163d34, 0.2);
  ellipse(g, 0, 24, rx * 0.72, ry * 0.54, 0x0d2c26, 0.16);
  view.addChild(g);
}

function flowerPatch(g: Graphics, rng: () => number, palette: IslandPalette): void {
  for (let i = 0; i < 9; i += 1) {
    const x = randomRange(rng, -62, 62);
    const y = randomRange(rng, 8, 34);
    g.circle(x, y, 1.8 + rng() * 1.2).fill({
      color: rng() > 0.5 ? palette.accentLight : 0xf7efe0,
      alpha: 0.85,
    });
  }
}

function lighthouse(palette: IslandPalette, textures: GameTextures): LandmarkView {
  const view = new Container();
  groundShadow(view, 54, 15);

  const base = new Graphics();
  ellipse(base, 0, 22, 48, 19, 0x8d927d, 0.85);
  ellipse(base, 0, 18, 40, 15, 0xb3ad91, 0.9);
  // Rocks around the footing.
  [
    [-40, 20, 9],
    [34, 24, 7],
    [-22, 28, 6],
    [22, 26, 8],
  ].forEach(([x, y, r]) => {
    base.circle(x, y, r).fill({ color: 0x7f8472, alpha: 0.9 });
    base.circle(x - 2, y - 2, r * 0.55).fill({ color: 0xa9ad96, alpha: 0.6 });
  });
  base.poly([-21, 24, 21, 24, 14, -58, -14, -58]).fill(0xf0e2c2);
  base.poly([-17, 24, -13, -58, -20.6, -58, -21, 24]).fill(0xd8c6a1);

  // Painted bands are trapezoids following the taper.
  const bands: Array<[number, number]> = [
    [-46, -32],
    [-20, -8],
    [4, 18],
  ];
  for (const [top, bottom] of bands) {
    const topHalf = 14 - ((top + 58) / 82) * 7;
    const bottomHalf = 14 - ((bottom + 58) / 82) * 7;
    base
      .poly([-topHalf, top, topHalf, top, bottomHalf, bottom, -bottomHalf, bottom])
      .fill(0xb9563d);
  }

  base.rect(-22, -66, 44, 9).fill(0x3f3a32);
  base.rect(-22, -66, 44, 2).fill(0x6f6557);
  base.rect(-13, -86, 26, 20).fill(0xffe6a3);
  base.rect(-13, -86, 26, 5).fill(0xf6cf7a);
  base.poly([-16, -86, 16, -86, 0, -101]).fill(0x47534d);
  base.rect(-2, -101, 4, 5).fill(0x47534d);
  base.rect(-1, -118, 2, 18).fill(0x3f3a32);
  base.poly([1, -117, 17, -111, 1, -107]).fill(palette.accent);
  base.rect(-8, 6, 16, 18).fill(0x604c33);
  base.rect(-4, 12, 8, 12).fill({ color: 0xf7dd9f, alpha: 0.55 });

  // A little keeper's hut.
  base.rect(28, 2, 34, 24).fill(0xefe0be);
  base.poly([24, 2, 66, 2, 45, -14]).fill(0x8a5b3d);
  base.rect(42, 10, 7, 8).fill(0xf6d58a);

  view.addChild(base);

  const lampGlow = new Sprite(textures.mote);
  lampGlow.anchor.set(0.5);
  lampGlow.position.set(0, -78);
  lampGlow.scale.set(1.15, 1.15);
  lampGlow.tint = 0xffdd92;
  lampGlow.alpha = 0.6;
  view.addChild(lampGlow);

  const beams = new Container();
  beams.position.set(0, -77);
  const beamShape = new Graphics();
  beamShape.poly([0, -4, 190, -30, 190, 12]).fill({ color: 0xffe6a3, alpha: 0.12 });
  beamShape.poly([0, -4, 190, 9, 190, 30]).fill({ color: 0xffe6a3, alpha: 0.06 });
  const second = new Graphics();
  second.poly([0, -4, -190, -30, -190, 12]).fill({ color: 0xffe6a3, alpha: 0.12 });
  second.poly([0, -4, -190, 9, -190, 30]).fill({ color: 0xffe6a3, alpha: 0.06 });
  beams.addChild(beamShape, second);
  view.addChild(beams);

  return {
    view,
    update: (time) => {
      beams.rotation = time * 0.22;
      lampGlow.alpha = 0.5 + (Math.sin(time * 2.1) + 1) * 0.14;
      lampGlow.scale.set(1.05 + Math.sin(time * 2.1) * 0.06, 1.05 + Math.sin(time * 2.1) * 0.06);
    },
  };
}

function cottage(palette: IslandPalette, textures: GameTextures): LandmarkView {
  const view = new Container();
  groundShadow(view, 62, 18);
  const rng = mulberry32(912);
  const g = new Graphics();

  // Garden mound and path stones.
  ellipse(g, 0, 22, 58, 20, palette.grassDark, 0.55);
  g.roundRect(-12, 8, 24, 30, 5).fill({ color: 0xd9c294, alpha: 0.8 });
  for (let i = 0; i < 5; i += 1) {
    ellipse(g, -7 + i * 4, 14 + i * 5, 4, 2.3, 0xc5ab7c, 0.8);
  }

  // Cottage body.
  g.rect(-36, -8, 72, 34).fill(0xf0e2c2);
  g.rect(-36, -8, 10, 34).fill(0xd9c9a6);
  g.poly([-46, -8, 46, -8, 0, -46]).fill(palette.accent);
  g.poly([-46, -8, 0, -46, 0, -4]).fill({ color: 0x000000, alpha: 0.07 });
  g.poly([-46, -8, 46, -8, 46, -11, -46, -11]).fill(0x7d4b33);
  g.rect(-7, 4, 14, 22).fill(0x744b2d);
  g.circle(4, 15, 1.3).fill(0xd3a75c);
  g.rect(-28, 0, 11, 10).fill(0xffe1a1);
  g.rect(19, 0, 11, 10).fill(0xffe1a1);
  g.rect(-28, 0, 11, 10).stroke({ width: 2, color: 0x6d4a2e, alpha: 1 });
  g.rect(19, 0, 11, 10).stroke({ width: 2, color: 0x6d4a2e, alpha: 1 });
  g.rect(-27, 0, 4, 10).stroke({ width: 1.2, color: 0x6d4a2e });
  g.rect(24, 0, 1.5, 10).fill(0x6d4a2e);

  // Chimney and fence.
  g.rect(20, -38, 11, 24).fill(0xa87956);
  g.rect(18, -40, 15, 5).fill(0x8a5e3e);
  for (let i = 0; i < 10; i += 1) {
    g.rect(-62 + i * 13, 24, 2.4, 12).fill({ color: 0x9a7a52, alpha: 0.8 });
  }
  g.rect(-62, 26, 120, 2).fill({ color: 0x9a7a52, alpha: 0.85 });
  flowerPatch(g, rng, palette);
  view.addChild(g);

  const smoke = new Container();
  smoke.position.set(26, -42);
  const puffs: Sprite[] = [];
  for (let i = 0; i < 4; i += 1) {
    const puff = new Sprite(textures.cloud);
    puff.anchor.set(0.5);
    puff.scale.set(0.012 + i * 0.006);
    puff.alpha = 0.22 - i * 0.035;
    puff.position.set(0, -i * 12);
    puff.tint = 0xf4f1e4;
    smoke.addChild(puff);
    puffs.push(puff);
  }
  view.addChild(smoke);

  return {
    view,
    update: (time) => {
      puffs.forEach((puff, index) => {
        const drift = (time * 5 + index * 4) % 30;
        puff.y = -drift;
        puff.x = Math.sin(time * 0.8 + index) * 4 + drift * 0.18;
        puff.alpha = (0.2 - drift * 0.005) * (1 - index * 0.08);
      });
    },
  };
}

function library(palette: IslandPalette, textures: GameTextures): LandmarkView {
  const view = new Container();
  groundShadow(view, 66, 18);
  const g = new Graphics();

  ellipse(g, 0, 24, 66, 21, palette.grassDark, 0.5);
  // Stone base and steps.
  g.roundRect(-46, 2, 92, 28, 7).fill(0xd6c9a9);
  g.roundRect(-52, 22, 104, 12, 4).fill(0xc4b592);
  g.rect(-46, 3, 92, 4).fill(0xe6dcc2);

  // Columns.
  for (let i = 0; i < 5; i += 1) {
    const x = -32 + i * 16;
    g.rect(x, -31, 8, 34).fill(0xf1e8d2);
    g.rect(x + 6, -31, 2, 34).fill(0xcec0a3);
    g.rect(x - 2, -35, 12, 5).fill(0xe4d8bb);
  }
  g.rect(-44, -39, 88, 7).fill(0xe9ddc0);
  // Dome with ribs and finial.
  g.ellipse(0, -39, 33, 28).fill(0x3f746a);
  g.ellipse(-8, -46, 17, 14).fill({ color: 0x5a8f80, alpha: 0.7 });
  g.moveTo(-33, -39).lineTo(0, -67).lineTo(33, -39).stroke({ width: 2, color: 0x2d5a52, alpha: 0.5 });
  for (const rib of [-22, -11, 11, 22]) {
    g.moveTo(rib, -39).quadraticCurveTo(rib * 0.6, -62, 0, -67).stroke({ width: 1.4, color: 0x2d5a52, alpha: 0.45 });
  }
  g.rect(-1.4, -78, 2.8, 12).fill(0xb8893f);
  g.circle(0, -79, 3.4).fill(0xd7b468);

  // Lanterns and books by the entrance.
  g.rect(-3, 2, 6, 16).fill(0x8e6a3d);
  g.circle(0, 18, 5).fill({ color: 0xffdd9b, alpha: 0.8 });
  g.rect(-16, 26, 11, 5).fill(0x9a4b3a);
  g.rect(-14, 22, 10, 4).fill(0x517188);
  g.rect(-17, 20, 9, 3).fill(0xb8893f);
  g.rect(10, 27, 12, 5).fill(0x64794a);
  g.rect(12, 23, 11, 4).fill(0xa34a2a);
  view.addChild(g);

  const glow = new Sprite(textures.mote);
  glow.anchor.set(0.5);
  glow.position.set(0, 18);
  glow.scale.set(0.6);
  glow.tint = 0xffda92;
  view.addChild(glow);

  const flag = new Container();
  flag.position.set(0, -79);
  const flagShape = new Graphics();
  flagShape.poly([0, 0, 24, 4, 0, 10]).fill(palette.accent);
  flag.addChild(flagShape);
  view.addChild(flag);

  return {
    view,
    update: (time) => {
      flag.rotation = Math.sin(time * 1.4) * 0.12;
      glow.alpha = 0.45 + Math.sin(time * 2.2) * 0.14;
    },
  };
}

function castle(palette: IslandPalette, textures: GameTextures): LandmarkView {
  const view = new Container();
  groundShadow(view, 72, 19);
  const g = new Graphics();

  ellipse(g, 0, 26, 72, 22, palette.grassDark, 0.45);
  // Curtain wall.
  g.rect(-50, -2, 100, 34).fill(0xcdbfa1);
  g.rect(-50, 22, 100, 10).fill(0xafa084);
  for (let i = 0; i < 11; i += 1) {
    g.rect(-50 + i * 9.4, -9, 5.5, 9).fill(0xcdbfa1);
  }
  // Towers.
  const tower = (x: number, height: number, width: number) => {
    g.rect(x - width / 2, -height, width, height + 30).fill(0xd8caac);
    g.rect(x + width * 0.18, -height, width * 0.32, height + 30).fill({ color: 0xbaaa8b, alpha: 0.7 });
    g.rect(x - width / 2 - 3, -height - 5, width + 6, 8).fill(0xb4a384);
    for (let c = 0; c < 3; c += 1) {
      g.rect(x - width / 2 + c * (width / 3) + 1, -height - 12, width / 5, 8).fill(0xd8caac);
    }
    g.rect(x - 3, -height + 22, 6, 10).fill(0x574634);
  };
  tower(-44, 66, 22);
  tower(44, 55, 20);
  tower(0, 88, 26);

  // Gate and warm windows.
  g.roundRect(-12, 10, 24, 24, 9).fill(0x5e4631);
  g.rect(-7, 16, 3, 18).fill(0x8a6a4a);
  g.rect(5, 16, 3, 18).fill(0x8a6a4a);
  g.rect(-3, -28, 6, 11).fill({ color: 0xffdf9f, alpha: 0.85 });
  g.rect(-49, -30, 5, 9).fill({ color: 0xffdf9f, alpha: 0.8 });
  g.rect(39, -18, 5, 9).fill({ color: 0xffdf9f, alpha: 0.8 });

  // Path.
  for (let i = 0; i < 5; i += 1) {
    ellipse(g, 0, 33 + i * 5, 9 - i, 2.6, 0xc9b489, 0.7);
  }
  view.addChild(g);

  const flags: Container[] = [];
  const poles = [
    [-44, -79],
    [44, -69],
    [0, -101],
  ];
  for (const [x, y] of poles) {
    const flag = new Container();
    flag.position.set(x, y);
    const shape = new Graphics();
    shape.rect(-0.8, -6, 1.6, 10).fill(0x514538);
    shape.poly([0, -6, 22, -1, 0, 6]).fill(palette.accentLight);
    flag.addChild(shape);
    view.addChild(flag);
    flags.push(flag);
  }

  const torch = new Sprite(textures.mote);
  torch.anchor.set(0.5);
  torch.position.set(0, -76);
  torch.scale.set(0.5);
  torch.tint = 0xffd792;
  view.addChild(torch);

  return {
    view,
    update: (time) => {
      flags.forEach((flag, index) => {
        flag.rotation = Math.sin(time * 1.6 + index * 1.4) * 0.18;
      });
      torch.alpha = 0.4 + Math.sin(time * 3 + 1) * 0.16;
    },
  };
}

function cave(palette: IslandPalette, textures: GameTextures): LandmarkView {
  const view = new Container();
  groundShadow(view, 70, 20);
  const rng = mulberry32(4411);
  const g = new Graphics();

  ellipse(g, 0, 20, 70, 26, palette.grassDark, 0.5);
  // Rock mound built from overlapping boulders.
  const rocks: Array<[number, number, number, number]> = [
    [-48, 8, 30, 24],
    [-22, -14, 36, 32],
    [14, -18, 40, 34],
    [46, 4, 28, 26],
    [-2, 12, 44, 22],
    [28, 22, 28, 16],
  ];
  for (const [x, y, rx, ry] of rocks) {
    g.ellipse(x, y, rx, ry).fill(0x6f6a57);
    g.ellipse(x - rx * 0.18, y - ry * 0.24, rx * 0.62, ry * 0.5).fill({ color: 0x8b846c, alpha: 0.75 });
  }
  // Dark mouth and warm inner glow.
  g.ellipse(0, 8, 24, 20).fill(0x1d2320);
  g.ellipse(0, 13, 16, 12).fill(0x2d2a20);
  g.ellipse(0, 19, 11, 5).fill({ color: 0xf0c062, alpha: 0.3 });
  // Moss and a small path.
  g.circle(-46, 30, 8).fill({ color: 0x5d7a4c, alpha: 0.7 });
  g.circle(38, 34, 7).fill({ color: 0x5d7a4c, alpha: 0.7 });
  for (let i = 0; i < 6; i += 1) {
    ellipse(g, 0, 32 + i * 5, 12 - i, 2.4, 0xc4ab7f, 0.75);
  }
  view.addChild(g);

  const coins: Sprite[] = [];
  const coinPositions: Array<[number, number, number]> = [
    [-34, 30, 0.22],
    [-25, 34, 0.17],
    [-40, 37, 0.14],
    [30, 35, 0.18],
    [37, 32, 0.13],
  ];
  for (const [x, y, scale] of coinPositions) {
    const coin = new Sprite(textures.coin);
    coin.anchor.set(0.5);
    coin.position.set(x, y);
    coin.scale.set(scale);
    view.addChild(coin);
    coins.push(coin);
  }

  const glow = new Sprite(textures.mote);
  glow.anchor.set(0.5);
  glow.position.set(0, 18);
  glow.scale.set(1.1, 0.8);
  glow.tint = 0xffd37a;
  glow.alpha = 0.25;
  view.addChild(glow);

  const sparkles: Array<{ sprite: Sprite; phase: number; radius: number }> = [];
  for (let i = 0; i < 4; i += 1) {
    const sparkle = new Sprite(textures.mote);
    sparkle.anchor.set(0.5);
    sparkle.scale.set(0.18);
    sparkle.alpha = 0;
    view.addChild(sparkle);
    sparkles.push({
      sprite: sparkle,
      phase: randomRange(rng, 0, TAU),
      radius: randomRange(rng, 16, 42),
    });
  }

  return {
    view,
    update: (time) => {
      glow.alpha = 0.2 + (Math.sin(time * 1.1) + 1) * 0.08;
      coins.forEach((coin, index) => {
        coin.alpha = 0.8 + Math.sin(time * 2 + index) * 0.14;
      });
      sparkles.forEach((sparkle, index) => {
        const cycle = (time * 0.5 + sparkle.phase) % TAU;
        sparkle.sprite.x = Math.cos(cycle * 1.3) * sparkle.radius;
        sparkle.sprite.y = 4 + Math.sin(cycle) * 12 - index * 2;
        sparkle.sprite.alpha = Math.max(0, Math.sin(cycle)) * 0.6;
      });
    },
  };
}

function harbor(palette: IslandPalette, textures: GameTextures): LandmarkView {
  const view = new Container();
  groundShadow(view, 68, 18);
  const g = new Graphics();

  ellipse(g, 0, 24, 68, 22, palette.grassDark, 0.45);
  // Stone quay.
  g.roundRect(-42, 4, 66, 30, 5).fill(0xcbb890);
  g.roundRect(-42, 4, 66, 5, 3).fill(0xded0ae);
  // Pier leading out to the water.
  g.rect(16, 12, 106, 22).fill(0x7b5534);
  for (let i = 0; i < 7; i += 1) {
    g.rect(20 + i * 15, 13, 3, 20).fill({ color: 0x5d3f27, alpha: 0.8 });
  }
  g.rect(16, 12, 106, 4).fill(0x966a44);
  // Posts.
  for (const x of [20, 58, 96, 118]) {
    g.rect(x, 6, 5, 32).fill(0x5d3f27);
    g.circle(x + 2.5, 7, 3.4).fill(0x89613f);
  }
  // Crates and barrels.
  g.rect(-30, 12, 18, 17).fill(0xa5764a);
  g.rect(-30, 12, 18, 3).fill(0xc39059);
  g.rect(-30, 18, 18, 2).fill(0x7a5232);
  g.rect(-9, 16, 13, 13).fill(0x8f653f);
  g.ellipse(-51, 24, 8, 9).fill(0x8c5a33);
  g.ellipse(-51, 22, 8, 4).fill(0xb47c4a);
  g.rect(-54, 22, 6, 2).fill(0x5e3d22);
  // Mooring rope.
  g.moveTo(18, 30).quadraticCurveTo(44, 42, 62, 37).stroke({ width: 2, color: 0xc9ab77, alpha: 0.85 });

  // Moored rowboat.
  g.poly([60, 27, 88, 27, 82, 38, 66, 38]).fill(0xd0a267);
  g.poly([62, 28, 86, 28, 81, 35, 67, 35]).fill(0xa87a48);
  g.rect(72, 30, 3, 6).fill(0x6b4a2c);
  view.addChild(g);

  const lantern = new Sprite(textures.mote);
  lantern.anchor.set(0.5);
  lantern.position.set(116, 4);
  lantern.scale.set(0.62);
  lantern.tint = 0xffd88d;
  view.addChild(lantern);

  const bobbingBoat = new Container();
  const boatShape = new Graphics();
  boatShape.ellipse(90, 42, 16, 6).fill({ color: 0x2b6f70, alpha: 0.22 });
  boatShape.poly([74, 42, 106, 42, 100, 50, 80, 50]).fill(0x9c6b3d);
  boatShape.rect(88, 33, 2.4, 18).fill(0x5f3f26);
  boatShape.poly([90, 34, 105, 41, 90, 41]).fill(0xf1e3c1);
  bobbingBoat.addChild(boatShape);
  view.addChild(bobbingBoat);

  return {
    view,
    update: (time) => {
      bobbingBoat.y = Math.sin(time * 1.4) * 1.6;
      lantern.alpha = 0.5 + Math.sin(time * 2.6) * 0.2;
    },
  };
}

export function createLandmark(
  kind: LandmarkKind,
  palette: IslandPalette,
  textures: GameTextures,
): LandmarkView {
  switch (kind) {
    case "lighthouse":
      return lighthouse(palette, textures);
    case "cottage":
      return cottage(palette, textures);
    case "library":
      return library(palette, textures);
    case "castle":
      return castle(palette, textures);
    case "cave":
      return cave(palette, textures);
    case "harbor":
      return harbor(palette, textures);
  }
}
