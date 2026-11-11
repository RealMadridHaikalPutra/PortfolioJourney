"use client";

import { useEffect, useRef } from "react";
import { getTelemetry, subscribeTelemetry } from "@/game/core/telemetry";
import { CompassRose } from "@/components/ui/CompassRose";

const BEARINGS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export function CompassHud({ className = "" }: { className?: string }) {
  const needleRef = useRef<SVGGElement>(null);
  const bearingRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      const telemetry = getTelemetry();
      const angle = (telemetry.heading * 180) / Math.PI;
      needleRef.current?.setAttribute("transform", `rotate(${angle} 50 50)`);
      const bearing =
        BEARINGS[
          ((Math.round(telemetry.heading / (Math.PI / 4)) % 8) + 8) % 8
        ];
      if (bearingRef.current) bearingRef.current.textContent = bearing;
      if (speedRef.current) {
        speedRef.current.textContent = `${Math.round(telemetry.speed / 12)} kn`;
      }
    };

    update();
    return subscribeTelemetry(update);
  }, []);

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div className="relative flex h-[86px] w-[86px] items-center justify-center rounded-full border border-[#c9a86a]/45 bg-[#08363e]/90 shadow-[0_14px_28px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(239,215,160,0.18)]">
        <span className="absolute inset-[5px] rounded-full border border-[#c9a86a]/25" />
        <CompassRose
          needleRef={needleRef}
          className="h-[68px] w-[68px] text-[#ecd9aa]/80"
        />
        <span className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#c9a86a]" aria-hidden="true" />
      </div>
      <p aria-hidden="true" className="font-hand text-base leading-none text-foam/85">
        <span ref={bearingRef}>N</span>
        <span className="mx-1.5 text-foam/40">·</span>
        <span ref={speedRef}>0 kn</span>
      </p>
      <span className="sr-only">Compass and current speed</span>
    </div>
  );
}
