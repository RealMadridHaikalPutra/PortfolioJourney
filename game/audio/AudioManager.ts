import type { Howl } from "howler";

export type SfxName = "hover" | "click" | "paper" | "splash" | "bird";

const SAMPLE_RATE = 22050;

function encodeWav(samples: Float32Array, sampleRate = SAMPLE_RATE): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeText = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i += 1) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  };

  writeText(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, samples.length * 2, true);

  for (let i = 0; i < samples.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

function makeOceanLoop(seconds = 7): Float32Array {
  const length = Math.floor(seconds * SAMPLE_RATE);
  const samples = new Float32Array(length);
  let low = 0;
  let low2 = 0;
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const white = Math.random() * 2 - 1;
    low += (white - low) * 0.035;
    low2 += (low - low2) * 0.16;
    const swell =
      0.45 +
      Math.sin((t / seconds) * Math.PI * 2 * 2) * 0.24 +
      Math.sin((t / seconds) * Math.PI * 2 * 5 + 1.2) * 0.1;
    // Gentle fade at both ends keeps the loop seam soft.
    const edge = Math.min(1, t / 0.65, (seconds - t) / 0.65);
    samples[i] = low2 * swell * edge * 0.72;
  }
  return samples;
}

function makeMusicLoop(seconds = 12): Float32Array {
  const length = Math.floor(seconds * SAMPLE_RATE);
  const samples = new Float32Array(length);
  const chords = [
    [174.61, 220.0, 261.63],
    [146.83, 196.0, 246.94],
    [164.81, 207.65, 261.63],
    [130.81, 164.81, 196.0],
  ];
  const segment = seconds / chords.length;
  const melody = [0, 2, 1, 2, 3, 2, 1, 0];

  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const chordIndex = Math.min(chords.length - 1, Math.floor(t / segment));
    const local = t - chordIndex * segment;
    const attack = Math.min(1, local / 1.1);
    const release = Math.min(1, (segment - local) / 1.3);
    const envelope = Math.min(attack, release);
    const globalEdge = Math.min(1, t / 0.4, (seconds - t) / 0.4);

    let pad = 0;
    for (let n = 0; n < 3; n += 1) {
      const freq = chords[chordIndex][n];
      pad += Math.sin(t * freq * Math.PI * 2) * (0.05 - n * 0.008);
      pad += Math.sin(t * freq * 2 * Math.PI * 2) * 0.008;
    }

    const step = Math.floor(t / 1.5);
    const noteT = t % 1.5;
    const noteIndex = melody[step % melody.length];
    const note = chords[chordIndex][noteIndex % 3] * 2;
    const bell = Math.sin(noteT * note * Math.PI * 2) * Math.exp(-noteT * 3.2) * 0.026;

    samples[i] = (pad * envelope + bell) * globalEdge;
  }
  return samples;
}

function makeClick(): Float32Array {
  const length = Math.floor(SAMPLE_RATE * 0.1);
  const samples = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 42);
    samples[i] =
      (Math.sin(t * 2 * Math.PI * 760) * 0.5 + Math.sin(t * 2 * Math.PI * 1210) * 0.2) *
      env *
      0.35;
  }
  return samples;
}

function makeHover(): Float32Array {
  const length = Math.floor(SAMPLE_RATE * 0.06);
  const samples = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    samples[i] = Math.sin(t * 2 * Math.PI * 1320) * Math.exp(-t * 60) * 0.16;
  }
  return samples;
}

function makePaper(seconds = 0.55): Float32Array {
  const length = Math.floor(SAMPLE_RATE * seconds);
  const samples = new Float32Array(length);
  let low = 0;
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const white = Math.random() * 2 - 1;
    low += (white - low) * 0.28;
    const crackle = Math.random() > 0.985 ? (Math.random() * 2 - 1) * 1.4 : 0;
    const env = Math.min(1, t / 0.03) * Math.exp(-t * 4.2);
    samples[i] = (low * 0.25 + crackle * 0.25) * env * 0.8;
  }
  return samples;
}

function makeSplash(seconds = 0.45): Float32Array {
  const length = Math.floor(SAMPLE_RATE * seconds);
  const samples = new Float32Array(length);
  let low = 0;
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const white = Math.random() * 2 - 1;
    low += (white - low) * 0.12;
    const env = Math.exp(-t * 8) * Math.min(1, t / 0.02);
    samples[i] = low * env * 0.5;
  }
  return samples;
}

function makeBird(seconds = 0.7): Float32Array {
  const length = Math.floor(SAMPLE_RATE * seconds);
  const samples = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const chirpPhase = t < 0.26 ? t : t - 0.36;
    const active = t < 0.26 || (t > 0.36 && t < 0.62);
    if (!active) continue;
    const local = chirpPhase;
    const freq = 2100 + Math.sin(local * 95) * 900 + local * 1300;
    const env = Math.sin((local / 0.26) * Math.PI) ** 2;
    samples[i] = Math.sin(local * freq * Math.PI * 2) * env * 0.13;
  }
  return samples;
}

/**
 * Procedurally synthesised soundscape — no media downloads, no licensing, and
 * a tiny initial payload. Howler.js is loaded lazily on the first gesture.
 */
class AudioManager {
  private module: typeof import("howler") | null = null;
  private ambient: Howl | null = null;
  private music: Howl | null = null;
  private readonly sfx = new Map<SfxName, Howl>();
  private initializing: Promise<void> | null = null;
  private birdTimer: number | null = null;
  private enabled = false;
  private muted = false;
  private ducked = false;

  get isEnabled(): boolean {
    return this.enabled;
  }

  get isMuted(): boolean {
    return this.muted;
  }

  async enable(): Promise<void> {
    if (this.enabled) {
      this.ambient?.play();
      this.music?.play();
      return;
    }
    if (this.initializing) return this.initializing;
    this.initializing = this.init();
    return this.initializing;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.module?.Howler.mute(muted);
    if (!muted && this.enabled) {
      this.ambient?.play();
      this.music?.play();
    }
  }

  /** Lower the bed while a parchment is open, so UI clicks stay readable. */
  setDucked(ducked: boolean): void {
    this.ducked = ducked;
    this.ambient?.volume(ducked ? 0.1 : 0.22);
    this.music?.volume(ducked ? 0.055 : 0.12);
  }

  play(name: SfxName): void {
    if (!this.enabled || this.muted) return;
    const sound = this.sfx.get(name);
    if (!sound) return;
    if (name === "hover" && sound.playing()) return;
    sound.play();
  }

  dispose(): void {
    if (this.birdTimer !== null) {
      window.clearInterval(this.birdTimer);
      this.birdTimer = null;
    }
    this.ambient?.unload();
    this.music?.unload();
    this.sfx.forEach((sound) => sound.unload());
    this.sfx.clear();
    this.ambient = null;
    this.music = null;
    this.enabled = false;
    this.initializing = null;
  }

  private async init(): Promise<void> {
    try {
      const mod = await import("howler");
      this.module = mod;
      const { Howl } = mod;

      this.ambient = new Howl({
        src: [encodeWav(makeOceanLoop())],
        format: ["wav"],
        loop: true,
        volume: 0.22,
        preload: true,
      });

      this.music = new Howl({
        src: [encodeWav(makeMusicLoop())],
        format: ["wav"],
        loop: true,
        volume: 0.12,
        preload: true,
      });

      const clips: Array<[SfxName, Float32Array, number]> = [
        ["hover", makeHover(), 0.5],
        ["click", makeClick(), 0.7],
        ["paper", makePaper(), 0.7],
        ["splash", makeSplash(), 0.5],
        ["bird", makeBird(), 0.5],
      ];

      for (const [name, samples, volume] of clips) {
        this.sfx.set(
          name,
          new Howl({
            src: [encodeWav(samples)],
            format: ["wav"],
            volume,
            preload: true,
          }),
        );
      }

      this.ambient.play();
      this.music.play();
      this.enabled = true;
      this.setDucked(this.ducked);
      this.module.Howler.mute(this.muted);

      this.birdTimer = window.setInterval(() => {
        if (!this.muted && this.enabled && Math.random() > 0.35) {
          this.play("bird");
        }
      }, 15000);
    } catch (error) {
      // Audio is an enhancement; a blocked AudioContext must never break the sea.
      console.warn("[island-journey] audio unavailable", error);
      this.enabled = false;
    }
  }
}

export const audioManager = new AudioManager();
