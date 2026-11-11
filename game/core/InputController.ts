const KEY_AXES: Record<string, readonly [number, number]> = {
  ArrowUp: [0, -1],
  KeyW: [0, -1],
  ArrowDown: [0, 1],
  KeyS: [0, 1],
  ArrowLeft: [-1, 0],
  KeyA: [-1, 0],
  ArrowRight: [1, 0],
  KeyD: [1, 0],
};

const PREVENT_DEFAULT = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]);

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

/**
 * Keyboard-only sailing input. Returns a normalised direction each tick.
 * Pointer controls are handled by the DOM joystick via `inputState`.
 */
export class KeyboardInput {
  private readonly pressed = new Set<string>();
  private enabled = true;

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown, { passive: false });
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("blur", this.handleBlur);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) this.pressed.clear();
  }

  getVector(): { x: number; y: number } {
    if (!this.enabled) return { x: 0, y: 0 };
    let x = 0;
    let y = 0;
    for (const code of this.pressed) {
      const axis = KEY_AXES[code];
      if (!axis) continue;
      x += axis[0];
      y += axis[1];
    }
    return clampVector(x, y);
  }

  dispose(): void {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("blur", this.handleBlur);
    this.pressed.clear();
  }

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (isEditable(event.target)) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (!(event.code in KEY_AXES)) return;
    if (PREVENT_DEFAULT.has(event.code)) event.preventDefault();
    this.pressed.add(event.code);
  };

  private readonly handleKeyUp = (event: KeyboardEvent): void => {
    this.pressed.delete(event.code);
  };

  private readonly handleBlur = (): void => {
    this.pressed.clear();
  };
}

export function clampVector(x: number, y: number): { x: number; y: number } {
  const length = Math.hypot(x, y);
  if (length <= 1e-4) return { x: 0, y: 0 };
  if (length <= 1) return { x, y };
  return { x: x / length, y: y / length };
}

export function combineInput(
  keyboard: { x: number; y: number },
  joystick: { x: number; y: number },
): { x: number; y: number } {
  return clampVector(keyboard.x + joystick.x, keyboard.y + joystick.y);
}
