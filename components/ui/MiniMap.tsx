"use client";

import { useEffect, useRef } from "react";
import { islands } from "@/game/data/islands";
import { getTelemetry, subscribeTelemetry } from "@/game/core/telemetry";
import type { SectionId } from "@/game/types";
import { useGameStore } from "@/store/useGameStore";

const SIZE = 174;
const WORLD_SPAN = 900;

function cssColor(value: number): string {
  return `#${value.toString(16).padStart(6, "0")}`;
}

/**
 * A small inked chart. It renders from telemetry at 12Hz rather than 60fps and
 * lives outside React state, so the HUD never re-renders while sailing.
 */
export function MiniMap({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const openSection = useGameStore((state) => state.openSection);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * ratio;
    canvas.height = SIZE * ratio;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);

    const scale = (SIZE / 2 - 24) / WORLD_SPAN;
    const center = SIZE / 2;

    const draw = () => {
      const telemetry = getTelemetry();
      context.clearRect(0, 0, SIZE, SIZE);

      context.save();
      context.beginPath();
      context.arc(center, center, center - 4, 0, Math.PI * 2);
      context.clip();

      const bg = context.createRadialGradient(center, center, 10, center, center, center);
      bg.addColorStop(0, "#f1e1ba");
      bg.addColorStop(1, "#dcc494");
      context.fillStyle = bg;
      context.fillRect(0, 0, SIZE, SIZE);

      // Faint chart rings and graticule.
      context.strokeStyle = "rgba(94, 68, 32, 0.16)";
      context.lineWidth = 1;
      for (let ring = 1; ring <= 3; ring += 1) {
        context.beginPath();
        context.arc(center, center, (center - 16) * (ring / 3), 0, Math.PI * 2);
        context.stroke();
      }
      context.setLineDash([2, 5]);
      context.beginPath();
      context.moveTo(center, 8);
      context.lineTo(center, SIZE - 8);
      context.moveTo(8, center);
      context.lineTo(SIZE - 8, center);
      context.stroke();
      context.setLineDash([]);

      // Course lines between neighbouring islands.
      context.strokeStyle = "rgba(120, 79, 38, 0.22)";
      context.setLineDash([2, 4]);
      for (let index = 0; index < islands.length - 1; index += 1) {
        const from = islands[index];
        const to = islands[index + 1];
        context.beginPath();
        context.moveTo(center + from.x * scale, center + from.y * scale);
        context.lineTo(center + to.x * scale, center + to.y * scale);
        context.stroke();
      }
      context.setLineDash([]);

      for (const island of islands) {
        const x = center + island.x * scale;
        const y = center + island.y * scale;
        const radius = Math.max(4, island.visualRadius * scale);
        const active =
          telemetry.nearby === island.id || telemetry.docked === island.id;

        context.beginPath();
        context.arc(x, y, radius + 3.5, 0, Math.PI * 2);
        context.fillStyle = cssColor(island.palette.water);
        context.globalAlpha = 0.5;
        context.fill();
        context.globalAlpha = 1;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = cssColor(island.palette.grass);
        context.fill();
        context.strokeStyle = active ? "#8c3a21" : "rgba(72, 48, 22, 0.45)";
        context.lineWidth = active ? 1.8 : 1;
        context.stroke();

        context.fillStyle = "rgba(48, 32, 14, 0.75)";
        context.font = "600 7px Georgia, serif";
        context.textAlign = "center";
        context.fillText(island.name.slice(0, 1), x, y + 2.5);
      }

      // Boat arrow.
      const boatX = center + telemetry.x * scale;
      const boatY = center + telemetry.y * scale;
      context.save();
      context.translate(boatX, boatY);
      context.rotate(telemetry.heading);
      context.beginPath();
      context.moveTo(0, -7);
      context.lineTo(4.5, 5);
      context.lineTo(0, 2.5);
      context.lineTo(-4.5, 5);
      context.closePath();
      context.fillStyle = "#8d3a21";
      context.fill();
      context.strokeStyle = "#f6e7c8";
      context.lineWidth = 1;
      context.stroke();
      context.restore();

      context.restore();

      // Ring frame.
      context.beginPath();
      context.arc(center, center, center - 4, 0, Math.PI * 2);
      context.strokeStyle = "rgba(52, 35, 14, 0.55)";
      context.lineWidth = 2;
      context.stroke();
      context.beginPath();
      context.arc(center, center, center - 8, 0, Math.PI * 2);
      context.strokeStyle = "rgba(52, 35, 14, 0.18)";
      context.lineWidth = 1;
      context.stroke();
    };

    draw();
    const unsubscribe = subscribeTelemetry(draw);

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * SIZE;
      const clickY = ((event.clientY - rect.top) / rect.height) * SIZE;
      let nearest: SectionId | null = null;
      let nearestDistance = 18;
      for (const island of islands) {
        const x = center + island.x * scale;
        const y = center + island.y * scale;
        const distance = Math.hypot(clickX - x, clickY - y);
        if (distance < nearestDistance) {
          nearest = island.id;
          nearestDistance = distance;
        }
      }
      if (nearest) openSection(nearest);
    };

    canvas.addEventListener("click", handleClick);
    return () => {
      unsubscribe();
      canvas.removeEventListener("click", handleClick);
    };
  }, [openSection]);

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div className="relative rounded-full border border-[#c9a86a]/40 bg-[#08363e]/90 p-1.5 shadow-[0_18px_34px_-18px_rgba(0,0,0,0.9)]">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="h-[146px] w-[146px] cursor-pointer rounded-full"
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#c9a86a]"
        />
      </div>
      <p aria-hidden="true" className="font-hand text-base leading-none text-foam/80">
        Peta Perjalanan
      </p>
    </div>
  );
}
