export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "portfolio"
  | "contact";

export type LandmarkKind =
  | "lighthouse"
  | "cottage"
  | "library"
  | "castle"
  | "cave"
  | "harbor";

export interface IslandPalette {
  sand: number;
  sandDark: number;
  grass: number;
  grassLight: number;
  grassDark: number;
  accent: number;
  accentLight: number;
  water: number;
}

export interface IslandDefinition {
  id: SectionId;
  name: string;
  tagline: string;
  landmark: LandmarkKind;
  x: number;
  y: number;
  /** Radius at which the boat drops anchor. */
  interactionRadius: number;
  visualRadius: number;
  seed: number;
  palette: IslandPalette;
}

export interface WorldTelemetry {
  x: number;
  y: number;
  heading: number;
  speed: number;
  docked: SectionId | null;
  nearby: SectionId | null;
}

export interface GameCallbacks {
  onReady: () => void;
  onIslandNear: (id: SectionId | null) => void;
  onArrive: (id: SectionId) => void;
}

export interface GameEngineOptions {
  container: HTMLDivElement;
  reducedMotion: boolean;
  callbacks: GameCallbacks;
}
