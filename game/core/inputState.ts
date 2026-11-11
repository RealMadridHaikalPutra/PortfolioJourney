/**
 * Shared joystick channel. The DOM joystick writes here; the engine reads it
 * every tick. Vectors are normalised to roughly -1..1.
 */
export const joystickState = {
  x: 0,
  y: 0,
  active: false,
};

export function setJoystick(x: number, y: number): void {
  joystickState.x = x;
  joystickState.y = y;
  joystickState.active = Math.hypot(x, y) > 0.08;
}

export function resetJoystick(): void {
  joystickState.x = 0;
  joystickState.y = 0;
  joystickState.active = false;
}
