"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Compass } from "lucide-react";
import { resetJoystick, setJoystick } from "@/game/core/inputState";

const MAX_TRAVEL = 34;

/**
 * Touch steering. Pointer capture keeps the thumb glued to the pad even when it
 * wanders outside; the engine reads the shared vector, so no React re-renders
 * are involved in steering.
 */
export function Joystick() {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const pointerId = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  const update = (event: ReactPointerEvent<HTMLDivElement>) => {
    const base = baseRef.current;
    const knob = knobRef.current;
    if (!base || !knob) return;
    const rect = base.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const length = Math.hypot(dx, dy);
    const clamped = Math.min(length, MAX_TRAVEL);
    const nx = length > 0 ? (dx / length) * (clamped / MAX_TRAVEL) : 0;
    const ny = length > 0 ? (dy / length) * (clamped / MAX_TRAVEL) : 0;
    setJoystick(nx, ny);
    knob.style.transform = `translate(${dx * (clamped / Math.max(length, 0.001))}px, ${
      dy * (clamped / Math.max(length, 0.001))
    }px)`;
    knob.style.transition = "none";
  };

  const handleDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== null) return;
    event.preventDefault();
    pointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setActive(true);
    update(event);
  };

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) return;
    event.preventDefault();
    update(event);
  };

  const release = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) return;
    pointerId.current = null;
    setActive(false);
    resetJoystick();
    const knob = knobRef.current;
    if (knob) {
      knob.style.transition = "transform 220ms cubic-bezier(0.22,1,0.36,1)";
      knob.style.transform = "translate(0px, 0px)";
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-20 flex flex-col items-center gap-1 p-4 safe-bottom safe-left">
      <div
        ref={baseRef}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        aria-hidden="true"
        className={`pointer-events-auto relative flex h-[118px] w-[118px] touch-none select-none items-center justify-center rounded-full border transition-colors duration-200 ${
          active
            ? "border-[#e0c184]/70 bg-[#0a3a42]/95"
            : "border-[#c9a86a]/40 bg-[#08343c]/85"
        } shadow-[0_16px_32px_-14px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(240,216,160,0.15)]`}
      >
        <span className="absolute inset-[9px] rounded-full border border-[#c9a86a]/20" />
        <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#c9a86a]/50" />
        <span className="absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#c9a86a]/50" />
        <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#c9a86a]/50" />
        <span className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#c9a86a]/50" />

        <div
          ref={knobRef}
          className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#e8c987]/45 bg-gradient-to-br from-[#9a3f24] to-[#672813] shadow-[0_6px_12px_-4px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,215,170,0.4)]"
        >
          <span className="absolute inset-1 rounded-full border border-[#f0c6a8]/30" />
          <Compass aria-hidden="true" className="h-5 w-5 text-[#f3d5b8]" strokeWidth={1.5} />
        </div>
      </div>
      <p aria-hidden="true" className="font-hand text-base leading-none text-foam/70">
        steer
      </p>
    </div>
  );
}
