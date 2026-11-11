"use client";

import { useId } from "react";
import type { Project } from "@/lib/content/projects";

interface ProjectArtworkProps {
  project: Project;
  variant?: number;
  className?: string;
}

/**
 * Vector cover art for each project. Keeping these as inline SVG means no
 * image requests, no layout shift, and crisp art at every size.
 */
export function ProjectArtwork({ project, variant = 0, className }: ProjectArtworkProps) {
  const uid = useId().replace(/[:]/g, "");
  const { from, to, accent, motif } = project.artwork;
  const gradientId = `bg-${uid}`;
  const glowId = `glow-${uid}`;
  const cardId = `card-${uid}`;
  const grainId = `grain-${uid}`;

  const offsets = [
    { x: 34, y: 44, rotate: -3 },
    { x: 58, y: 30, rotate: 2.5 },
    { x: 22, y: 58, rotate: -1.5 },
  ];
  const offset = offsets[variant % offsets.length];

  return (
    <svg
      viewBox="0 0 640 360"
      role="img"
      aria-label={`${project.title} — ${project.kicker} illustration`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <radialGradient id={glowId} cx="78%" cy="18%" r="72%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.06" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={cardId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8ecd0" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#e9d3a5" stopOpacity="0.92" />
        </linearGradient>
        <pattern id={grainId} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#fff" opacity="0.07" />
        </pattern>
      </defs>

      <rect width="640" height="360" fill={`url(#${gradientId})`} />
      <rect width="640" height="360" fill={`url(#${glowId})`} />
      <rect width="640" height="360" fill={`url(#${grainId})`} />

      {/* Chart lines and a distant route */}
      <g stroke={accent} strokeOpacity="0.14" strokeWidth="1" fill="none">
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            key={index}
            d={`M0 ${70 + index * 54} C 120 ${40 + index * 50}, 220 ${110 + index * 45}, 360 ${68 + index * 50} S 560 ${30 + index * 52}, 640 ${76 + index * 50}`}
          />
        ))}
      </g>

      <g opacity="0.5" fill="none" stroke={accent}>
        <circle cx="556" cy="62" r="27" strokeWidth="1" />
        <circle cx="556" cy="62" r="19" strokeWidth="0.5" />
        <path d="M556 40 L560 60 L556 84 L552 60 Z" fill={accent} fillOpacity="0.5" stroke="none" />
        <path d="M534 62 L556 58 L578 62 L556 66 Z" fill={accent} fillOpacity="0.25" stroke="none" />
      </g>

      {/* The little paper screen holding the product art */}
      <g transform={`translate(${offset.x} ${offset.y}) rotate(${offset.rotate} 260 150)`}>
        <rect
          x="34"
          y="6"
          width="476"
          height="268"
          rx="8"
          fill={`url(#${cardId})`}
          stroke="#6d4b24"
          strokeOpacity="0.35"
        />
        <rect x="34" y="6" width="476" height="32" rx="8" fill="#3a2a1c" opacity="0.88" />
        <rect x="34" y="30" width="476" height="8" fill="#3a2a1c" opacity="0.88" />
        <circle cx="54" cy="22" r="4" fill={accent} opacity="0.85" />
        <circle cx="68" cy="22" r="4" fill="#f1dfb9" opacity="0.4" />
        <circle cx="82" cy="22" r="4" fill="#f1dfb9" opacity="0.25" />

        <g transform="translate(56 58)">
          <Motif motif={motif} accent={accent} variant={variant} />
        </g>

        <g opacity="0.5">
          {[0, 1, 2].map((index) => (
            <rect
              key={index}
              x={352}
              y={70 + index * 24}
              width={index === 0 ? 110 : 84 - index * 14}
              height="5"
              rx="2.5"
              fill="#5a4228"
            />
          ))}
        </g>
        <g opacity="0.4">
          {[0, 1, 2, 3].map((index) => (
            <circle key={index} cx={360 + index * 22} cy={164} r="5" fill={accent} />
          ))}
        </g>
        <rect x="352" y="186" width="132" height="70" rx="4" fill="#6b4b28" opacity="0.1" />
        <path
          d="M362 236 L386 214 L408 224 L436 200 L468 208"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          opacity="0.7"
        />
      </g>

      {/* Corner marks and a small wax seal */}
      <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.2" fill="none">
        <path d="M26 30 L26 18 L38 18" />
        <path d="M614 30 L614 18 L602 18" />
        <path d="M26 330 L26 342 L38 342" />
        <path d="M614 330 L614 342 L602 342" />
      </g>
      <g transform="translate(580 306)">
        <circle r="17" fill="#7d2c18" opacity="0.9" />
        <circle r="13" fill="none" stroke="#e6b19b" strokeOpacity="0.5" />
        <path d="M0 -7 L2 0 L0 7 L-2 0 Z" fill="#f0d4bd" opacity="0.8" />
      </g>
    </svg>
  );
}

function Motif({
  motif,
  accent,
  variant,
}: {
  motif: Project["artwork"]["motif"];
  accent: string;
  variant: number;
}) {
  switch (motif) {
    case "chart":
      return (
        <g>
          <rect width="268" height="172" rx="4" fill="#123c40" />
          <g stroke="#d7eee3" strokeOpacity="0.12">
            {[0, 1, 2, 3, 4].map((index) => (
              <line key={index} x1="14" x2="254" y1={20 + index * 30} y2={20 + index * 30} />
            ))}
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <line key={index} y1="12" y2="160" x1={18 + index * 42} x2={18 + index * 42} />
            ))}
          </g>
          <g>
            {Array.from({ length: 13 }).map((_, index) => {
              const x = 26 + index * 18;
              const body = 12 + ((index * 17 + variant * 7) % 38);
              const y = 54 + ((index * 29) % 60);
              const up = index % 3 !== 0;
              return (
                <g key={index}>
                  <line x1={x + 3} x2={x + 3} y1={y - 12} y2={y + body + 10} stroke={up ? "#8fd8bd" : "#d98d76"} strokeWidth="1" opacity="0.7" />
                  <rect
                    x={x}
                    y={y}
                    width="7"
                    height={body}
                    rx="1"
                    fill={up ? "#8fd8bd" : "#d98d76"}
                    opacity="0.85"
                  />
                </g>
              );
            })}
          </g>
          <path
            d="M24 132 C 58 120, 74 94, 104 108 S 156 76, 188 82 S 222 44, 254 56"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="254" cy="56" r="4" fill={accent} />
          <rect x="18" y="14" width="52" height="8" rx="4" fill="#e9f5ed" opacity="0.55" />
          <rect x="204" y="14" width="48" height="8" rx="4" fill={accent} opacity="0.8" />
        </g>
      );
    case "camera":
      return (
        <g>
          <rect width="268" height="172" rx="4" fill="#24161d" />
          <rect x="12" y="12" width="244" height="148" rx="3" fill="#5a3340" opacity="0.75" />
          <g stroke={accent} strokeOpacity="0.65" fill="none" strokeWidth="2">
            <path d="M24 34 L24 22 L38 22" />
            <path d="M244 34 L244 22 L230 22" />
            <path d="M24 138 L24 150 L38 150" />
            <path d="M244 138 L244 150 L230 150" />
          </g>
          <circle cx="134" cy="86" r="42" fill="#171015" stroke={accent} strokeOpacity="0.55" strokeWidth="2" />
          <circle cx="134" cy="86" r="30" fill="#2f2028" />
          <circle cx="134" cy="86" r="20" fill="#0e2830" />
          <circle cx="127" cy="79" r="7" fill="#b9eddf" opacity="0.35" />
          <circle cx="134" cy="86" r="30" fill="none" stroke={accent} strokeOpacity="0.2" />
          <rect x="40" y="142" width="188" height="8" rx="4" fill={accent} opacity="0.18" />
          <g fill={accent} opacity="0.7">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <rect key={index} x={48 + index * 28} y="26" width="14" height="5" rx="1.5" />
            ))}
          </g>
          <path d="M196 52 L216 36 L216 68 Z" fill="#fff3cf" opacity="0.75" />
        </g>
      );
    case "ledger":
      return (
        <g>
          <rect width="268" height="172" rx="4" fill="#f0dfbb" />
          <rect x="14" y="14" width="240" height="30" rx="3" fill="#2f2b1d" opacity="0.85" />
          <rect x="22" y="24" width="66" height="8" rx="4" fill="#e8d6ad" opacity="0.7" />
          <rect x="196" y="24" width="48" height="8" rx="4" fill={accent} />
          {[0, 1, 2].map((index) => (
            <g key={index} transform={`translate(16 ${56 + index * 33})`}>
              <rect width="150" height="24" rx="3" fill="#ffffff" opacity="0.5" />
              <circle cx="15" cy="12" r="6" fill={accent} opacity={0.8 - index * 0.2} />
              <rect x="28" y="8" width={50 + index * 12} height="4" rx="2" fill="#5a462c" opacity="0.7" />
              <rect x="28" y="16" width="34" height="3" rx="1.5" fill="#5a462c" opacity="0.4" />
              <rect x="108" y="9" width="32" height="6" rx="3" fill="#4b6d4a" opacity="0.5" />
            </g>
          ))}
          <g transform="translate(184 56)">
            <rect width="62" height="98" rx="4" fill="#e3caa0" />
            <circle cx="31" cy="30" r="18" fill={accent} opacity="0.85" />
            <circle cx="31" cy="30" r="14" fill="none" stroke="#7a5322" strokeOpacity="0.5" />
            <path d="M31 19 L33 28 L31 41 L29 28 Z" fill="#6f4b20" opacity="0.7" />
            <rect x="12" y="58" width="38" height="5" rx="2.5" fill="#6f4b20" opacity="0.5" />
            <rect x="12" y="68" width="26" height="4" rx="2" fill="#6f4b20" opacity="0.35" />
            <rect x="12" y="78" width="32" height="4" rx="2" fill="#6f4b20" opacity="0.3" />
          </g>
          <rect x="14" y="152" width="240" height="6" rx="3" fill="#6c5030" opacity="0.35" />
        </g>
      );
    case "waveform":
      return (
        <g>
          <rect width="268" height="172" rx="4" fill="#14172a" />
          <circle cx="134" cy="86" r="54" fill="none" stroke={accent} strokeOpacity="0.18" />
          <circle cx="134" cy="86" r="44" fill="none" stroke={accent} strokeOpacity="0.1" />
          <g>
            {Array.from({ length: 31 }).map((_, index) => {
              const height = 8 + Math.abs(Math.sin(index * 1.7 + variant)) * 46;
              return (
                <rect
                  key={index}
                  x={24 + index * 7}
                  y={(86 - height) / 2 + 10}
                  width="3.5"
                  height={height}
                  rx="1.7"
                  fill={accent}
                  opacity={0.2 + (index % 7) * 0.09}
                />
              );
            })}
          </g>
          <circle cx="134" cy="86" r="20" fill={accent} opacity="0.9" />
          <circle cx="134" cy="86" r="13" fill="#14172a" />
          <circle cx="134" cy="86" r="4" fill={accent} />
          <path d="M24 144 C 64 132, 84 154, 124 142 S 202 152, 244 134" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1.5" />
        </g>
      );
    case "map":
      return (
        <g>
          <rect width="268" height="172" rx="4" fill="#e6d6ac" />
          <g stroke="#6d7c53" strokeOpacity="0.28" fill="none" strokeWidth="1">
            <path d="M18 42 C 52 18, 92 34, 118 20 S 186 30, 248 16" />
            <path d="M14 72 C 60 44, 88 64, 120 52 S 200 64, 252 42" />
            <path d="M14 128 C 54 108, 96 132, 132 118 S 204 132, 254 112" />
            <path d="M32 154 C 74 132, 118 158, 158 142 S 220 152, 246 140" />
          </g>
          <path
            d="M44 132 C 68 76, 112 116, 130 78 S 190 66, 212 44"
            fill="none"
            stroke="#8c4a2f"
            strokeWidth="2.2"
            strokeDasharray="5 5"
          />
          <g fill="#8c4a2f">
            <circle cx="44" cy="132" r="5" />
            <circle cx="212" cy="44" r="5" />
          </g>
          <g transform="translate(130 78)">
            <circle r="12" fill="#8c4a2f" opacity="0.18" />
            <path d="M0 -10 C 7 -10, 10 -4, 6 1 L0 10 L-6 1 C -10 -4, -7 -10, 0 -10 Z" fill="#8c4a2f" />
            <circle cy="-3" r="3" fill="#f0dfb7" />
          </g>
          <g transform="translate(214 114) rotate(-12)">
            <path d="M-16 0 L14 -10 L6 0 L14 10 Z" fill="#5d6b47" opacity="0.8" />
            <path d="M-16 0 L14 0" stroke="#5d6b47" strokeWidth="1.2" />
          </g>
          <g opacity="0.4" fill="none" stroke="#6d7c53">
            <circle cx="238" cy="146" r="12" />
            <path d="M238 130 L242 146 L238 162 L234 146 Z" fill="#6d7c53" opacity="0.5" stroke="none" />
          </g>
        </g>
      );
  }
}
