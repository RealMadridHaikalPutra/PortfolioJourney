/**
 * Generates the small set of static brand assets:
 *   public/portrait.png   illustrated portrait used on the Home island
 *   public/og.jpg         Open Graph / Twitter card
 *   app/icon.png          favicon and app icon
 *   public/resume.pdf     a real one-page resume for the Download CTA
 *
 * Run with: npm run assets
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
await mkdir(path.join(root, "public"), { recursive: true });
await mkdir(path.join(root, "app"), { recursive: true });

const portraitSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <defs>
    <clipPath id="portraitClip"><circle cx="320" cy="320" r="292"/></clipPath>
    <linearGradient id="portraitSea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bfe5da"/>
      <stop offset="0.52" stop-color="#6fb6b2"/>
      <stop offset="1" stop-color="#1f6f78"/>
    </linearGradient>
    <radialGradient id="portraitSun" cx="0.72" cy="0.2" r="0.55">
      <stop offset="0" stop-color="#fff1c6" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#ffe8ad" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="portraitSkin" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#f0c49a"/>
      <stop offset="0.6" stop-color="#dda97f"/>
      <stop offset="1" stop-color="#c58c63"/>
    </linearGradient>
    <linearGradient id="portraitSweater" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0" stop-color="#2d5260"/>
      <stop offset="1" stop-color="#163541"/>
    </linearGradient>
    <linearGradient id="portraitRing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e5c98f"/>
      <stop offset="0.5" stop-color="#a8783b"/>
      <stop offset="1" stop-color="#7a5323"/>
    </linearGradient>
  </defs>

  <g clip-path="url(#portraitClip)">
    <rect width="640" height="640" fill="url(#portraitSea)"/>
    <rect width="640" height="640" fill="url(#portraitSun)"/>

    <circle cx="462" cy="128" r="58" fill="#ffeab3" opacity="0.72"/>
    <circle cx="462" cy="128" r="84" fill="#ffeab3" opacity="0.13"/>

    <path d="M30 318 C 94 286, 156 302, 202 334 C 156 352, 78 352, 30 318 Z" fill="#4c8374" opacity="0.5"/>
    <path d="M112 318 C 150 297, 188 304, 216 322 L 216 352 L 112 352 Z" fill="#3f7063" opacity="0.6"/>
    <path d="M444 312 C 502 286, 574 296, 622 326 C 566 348, 500 344, 444 312 Z" fill="#4c8374" opacity="0.45"/>
    <path d="M516 316 C 548 300, 586 304, 614 320 L 614 350 L 516 350 Z" fill="#3c6d61" opacity="0.55"/>

    <g opacity="0.45" stroke="#e6f6ee" stroke-width="2" fill="none">
      <path d="M22 402 C 90 386, 138 414, 206 398 S 320 386, 392 404 S 528 412, 622 392"/>
      <path d="M-10 444 C 68 426, 128 454, 208 438 S 338 426, 412 446 S 552 452, 660 432"/>
      <path d="M16 488 C 96 470, 158 496, 244 480 S 376 470, 452 488 S 566 490, 654 474"/>
      <path d="M-8 532 C 74 514, 134 540, 218 524 S 348 514, 426 532 S 548 538, 648 520"/>
      <path d="M34 576 C 108 560, 168 584, 246 568 S 372 558, 446 576 S 566 582, 630 566"/>
    </g>

    <g opacity="0.5">
      <path d="M64 306 C 70 292, 82 288, 88 298" stroke="#2d5c54" stroke-width="2" fill="none"/>
      <path d="M96 300 C 100 288, 110 284, 115 292" stroke="#2d5c54" stroke-width="2" fill="none"/>
      <circle cx="78" cy="314" r="2" fill="#2d5c54"/>
    </g>

    <path d="M112 640 C 122 520, 202 456, 320 456 C 438 456, 518 520, 528 640 Z" fill="url(#portraitSweater)"/>
    <path d="M112 640 C 122 556, 170 510, 238 484 C 206 530, 188 578, 188 640 Z" fill="#3c6572" opacity="0.5"/>
    <path d="M268 452 L320 520 L372 452 C 354 440, 334 434, 320 434 C 306 434, 286 440, 268 452 Z" fill="#f1e2c0"/>
    <path d="M276 456 L320 512 L364 456 L342 446 L320 470 L298 446 Z" fill="#e4d0a5"/>

    <path d="M286 400 L286 464 C 296 478, 344 478, 354 464 L 354 400 Z" fill="url(#portraitSkin)"/>
    <path d="M286 412 C 300 428, 340 428, 354 412 L 354 400 L 286 398 Z" fill="#b9805e" opacity="0.35"/>

    <ellipse cx="196" cy="306" rx="22" ry="34" fill="#d9a37a"/>
    <ellipse cx="444" cy="306" rx="22" ry="34" fill="#d9a37a"/>
    <ellipse cx="198" cy="307" rx="10" ry="18" fill="#c18a64" opacity="0.6"/>
    <ellipse cx="442" cy="307" rx="10" ry="18" fill="#b47d5a" opacity="0.55"/>

    <path d="M320 148 C 404 148, 450 210, 444 294 C 438 372, 400 434, 320 446 C 240 434, 202 372, 196 294 C 190 210, 236 148, 320 148 Z" fill="url(#portraitSkin)"/>
    <path d="M200 294 C 200 226, 238 188, 286 174 C 250 208, 234 252, 232 316 C 226 348, 214 360, 206 348 C 200 334, 199 314, 200 294 Z" fill="#f6d3b1" opacity="0.32"/>

    <path d="M196 288 C 188 188, 248 132, 322 132 C 396 132, 452 188, 444 288 C 436 244, 408 216, 368 204 C 322 190, 272 204, 238 236 C 218 254, 204 268, 196 288 Z" fill="#3a2a22"/>
    <path d="M204 278 C 210 208, 258 162, 320 158 C 382 162, 430 208, 438 278 C 418 236, 380 216, 330 214 C 286 212, 246 232, 222 264 Z" fill="#4b372b"/>
    <path d="M216 238 C 246 196, 300 180, 352 194" stroke="#7a5b45" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.35"/>

    <path d="M226 348 C 232 400, 252 428, 286 440 C 302 445, 338 445, 354 440 C 388 428, 408 400, 414 348 C 404 392, 376 418, 320 422 C 264 418, 236 392, 226 348 Z" fill="#4a3629"/>
    <path d="M258 400 C 278 420, 302 428, 320 428 C 338 428, 362 420, 382 400 C 368 434, 344 446, 320 446 C 296 446, 272 434, 258 400 Z" fill="#3a291f" opacity="0.75"/>
    <path d="M284 380 C 298 394, 312 396, 320 396 C 330 396, 340 392, 348 384" stroke="#6d4a36" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>

    <path d="M250 292 C 260 282, 278 282, 286 288" stroke="#4b3527" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M354 288 C 362 282, 380 282, 390 292" stroke="#4b3527" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="270" cy="308" rx="6" ry="7" fill="#2c211a"/>
    <ellipse cx="370" cy="308" rx="6" ry="7" fill="#2c211a"/>
    <circle cx="272" cy="306" r="1.8" fill="#f7ecdc" opacity="0.8"/>
    <circle cx="372" cy="306" r="1.8" fill="#f7ecdc" opacity="0.8"/>

    <path d="M318 314 C 311 338, 306 350, 316 356 C 324 360, 334 356, 338 352" stroke="#b17754" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M298 380 C 310 393, 334 393, 346 378" stroke="#8a533d" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="256" cy="352" rx="17" ry="9" fill="#e39e7b" opacity="0.25"/>
    <ellipse cx="384" cy="352" rx="17" ry="9" fill="#e39e7b" opacity="0.22"/>

    <g fill="none" stroke="#7c5a35" stroke-width="3.2" opacity="0.9">
      <circle cx="272" cy="307" r="42"/>
      <circle cx="368" cy="307" r="42"/>
      <path d="M314 307 C 320 300, 326 300, 330 307"/>
      <path d="M230 302 C 218 298, 214 306, 216 316"/>
      <path d="M410 302 C 422 298, 426 306, 424 316"/>
    </g>
    <g fill="#dff0ea" opacity="0.1">
      <circle cx="272" cy="307" r="38"/>
      <circle cx="368" cy="307" r="38"/>
    </g>

    <g transform="translate(472 470) rotate(-10)">
      <rect width="44" height="54" rx="3" fill="#d9bd8a" opacity="0.9"/>
      <path d="M4 4 H 40 V 50 H 4 Z" fill="none" stroke="#7f5c31" stroke-width="1" opacity="0.5"/>
      <path d="M12 38 L 22 26 L 30 34 L 36 22" stroke="#8b3f27" stroke-width="2" fill="none"/>
      <circle cx="34" cy="42" r="2.4" fill="#8b3f27"/>
    </g>

    <path d="M148 640 C 164 588, 196 556, 232 540" stroke="#e2c791" stroke-width="2" fill="none" opacity="0.25"/>
    <path d="M492 640 C 476 588, 444 556, 408 540" stroke="#e2c791" stroke-width="2" fill="none" opacity="0.25"/>
  </g>

  <circle cx="320" cy="320" r="300" fill="none" stroke="#5e3f1d" stroke-width="14" opacity="0.35"/>
  <circle cx="320" cy="320" r="300" fill="none" stroke="url(#portraitRing)" stroke-width="8"/>
  <circle cx="320" cy="320" r="288" fill="none" stroke="#f4e3bb" stroke-width="2" opacity="0.5"/>
  <circle cx="320" cy="320" r="307" fill="none" stroke="#d9b87a" stroke-width="2" stroke-dasharray="12 8" opacity="0.75"/>
  <g transform="translate(320 20)">
    <circle r="15" fill="#7c3a22" stroke="#e2c58e" stroke-width="2"/>
    <path d="M0 -8 L3 0 L0 8 L-3 0 Z" fill="#f5dfb2"/>
  </g>
</svg>`;

const rose = (cx, cy, r, color, opacity) => `
  <g transform="translate(${cx} ${cy})" opacity="${opacity}" fill="none" stroke="${color}">
    <circle r="${r}" stroke-width="1.4"/>
    <circle r="${r * 0.72}" stroke-width="0.7" opacity="0.5"/>
    ${Array.from({ length: 8 }, (_, index) => {
      const angle = (index * 45 * Math.PI) / 180;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const inner = r * 0.82;
      return `<line x1="${Math.cos(angle) * inner}" y1="${Math.sin(angle) * inner}" x2="${x}" y2="${y}" stroke-width="1.2"/>`;
    }).join("")}
    <path d="M0 ${-r * 0.62} L${r * 0.12} 0 L0 ${r * 0.62} L${-r * 0.12} 0 Z" fill="${color}" opacity="0.35" stroke="none"/>
    <path d="M0 ${-r * 0.62} L${r * 0.08} 0 L0 0 Z" fill="${color}" opacity="0.8" stroke="none"/>
  </g>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="ogSea" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="#0b4b57"/>
      <stop offset="0.55" stop-color="#073a44"/>
      <stop offset="1" stop-color="#04262d"/>
    </linearGradient>
    <radialGradient id="ogSun" cx="0.78" cy="0.18" r="0.7">
      <stop offset="0" stop-color="#ffeab8" stop-opacity="0.5"/>
      <stop offset="0.45" stop-color="#e7c47e" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#e7c47e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ogGold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f7e8c2"/>
      <stop offset="1" stop-color="#d9b876"/>
    </linearGradient>
    <linearGradient id="ogSand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f0dda9"/>
      <stop offset="1" stop-color="#cdb177"/>
    </linearGradient>
    <filter id="ogGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.08"/></feComponentTransfer>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#ogSea)"/>
  <rect width="1200" height="630" fill="url(#ogSun)"/>
  <rect width="1200" height="630" filter="url(#ogGrain)" opacity="0.6"/>

  <g stroke="#dff4e9" fill="none" opacity="0.12">
    <path d="M-20 470 C 160 430, 300 490, 470 448 S 760 430, 940 474 S 1120 486, 1240 450" stroke-width="2"/>
    <path d="M-20 512 C 150 478, 320 526, 500 486 S 780 470, 960 512 S 1130 522, 1240 488" stroke-width="1.5"/>
    <path d="M-20 556 C 140 526, 330 566, 520 532 S 800 516, 980 556 S 1140 566, 1240 532" stroke-width="1.2"/>
    <path d="M-20 598 C 170 570, 340 606, 540 578 S 820 562, 1000 598 S 1150 604, 1240 580" stroke-width="1"/>
  </g>

  ${rose(1085, 520, 74, "#d9b876", 0.32)}

  <g transform="translate(878 300)">
    <ellipse cx="0" cy="198" rx="178" ry="42" fill="#04262d" opacity="0.45"/>
    <path d="M-160 196 C -140 150, -84 128, -30 136 C 18 112, 92 126, 126 152 C 168 166, 184 184, 178 202 C 138 226, -88 236, -160 196 Z" fill="url(#ogSand)"/>
    <path d="M-144 188 C -120 164, -78 154, -42 162 C 4 146, 64 154, 94 174 C 128 184, 140 194, 136 202 C 92 216, -84 218, -144 188 Z" fill="#5d8258"/>
    <path d="M58 150 C 74 132, 112 128, 126 146 C 138 162, 118 178, 92 178 C 74 176, 60 166, 58 150 Z" fill="#4c6f48"/>
    <g transform="translate(-36 56)">
      <path d="M-22 128 C -30 76, 16 34, 10 0" stroke="#7d5532" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M-22 128 C -30 76, 16 34, 10 0" stroke="#a87b4c" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g transform="translate(10 0)">
        ${Array.from({ length: 7 }, (_, index) => {
          const angle = (index * 360) / 7;
          return `<ellipse cx="34" cy="0" rx="36" ry="9" fill="${index % 2 ? "#4e7549" : "#6f9a5b"}" transform="rotate(${angle})"/>`;
        }).join("")}
        <circle r="7" fill="#5b4227"/>
      </g>
    </g>
  </g>

  <g transform="translate(980 336)">
    <path d="M-20 168 L -12 42 L 12 42 L 20 168 Z" fill="#f0e2c2"/>
    <path d="M-12 118 L 15 118 L 17 140 L -14 140 Z" fill="#b9563d"/>
    <path d="M-10 72 L 14 72 L 15 94 L -11 94 Z" fill="#b9563d"/>
    <rect x="-18" y="28" width="36" height="16" fill="#3f3a32"/>
    <rect x="-12" y="6" width="24" height="22" fill="#ffe6a3"/>
    <path d="M-18 6 L 18 6 L 0 -14 Z" fill="#47534d"/>
    <rect x="-1" y="-40" width="2.4" height="28" fill="#d8c69a"/>
    <path d="M1 -40 L 28 -32 L 1 -24 Z" fill="#e8a84c"/>
    <path d="M0 20 L 150 -10 L 150 34 Z" fill="#ffe6a3" opacity="0.14"/>
    <path d="M0 20 L -150 -10 L -150 34 Z" fill="#ffe6a3" opacity="0.1"/>
    <circle cx="0" cy="18" r="26" fill="#ffe6a3" opacity="0.12"/>
    <ellipse cx="0" cy="172" rx="72" ry="14" fill="#04262d" opacity="0.25"/>
  </g>

  <g transform="translate(80 118)">
    <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="23" letter-spacing="7" fill="#e8cf9b">Real Madrid Haikal Putra</text>
    <text x="0" y="102" font-family="Georgia, 'Times New Roman', serif" font-size="96" letter-spacing="1" fill="url(#ogGold)">ISLAND</text>
    <text x="0" y="196" font-family="Georgia, 'Times New Roman', serif" font-size="96" letter-spacing="1" fill="url(#ogGold)">JOURNEY</text>
    <path d="M4 232 L 486 232" stroke="#d9b876" stroke-width="1.5" opacity="0.5"/>
    <text x="4" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="27" fill="#e8dcc0">A portfolio you can sail.</text>
    <text x="4" y="306" font-family="Georgia, 'Times New Roman', serif" font-size="19" fill="#cfe3d8" opacity="0.8">Creative frontend engineer · six islands · 60fps</text>
    <g transform="translate(4 354)">
      <rect width="212" height="47" rx="3" fill="#8f3a22" stroke="#e4c78e" stroke-opacity="0.4"/>
      <text x="24" y="30" font-family="Georgia, 'Times New Roman', serif" font-size="17" letter-spacing="3" fill="#fff1d2">SET SAIL</text>
    </g>
  </g>

  <g fill="none" stroke="#d9b876" stroke-opacity="0.35">
    <rect x="26" y="26" width="1148" height="578" rx="6" stroke-width="2"/>
    <rect x="36" y="36" width="1128" height="558" rx="4" stroke-width="0.8"/>
  </g>
  <g transform="translate(600 604)" fill="#d9b876" opacity="0.55">
    <circle r="3.4"/>
    <path d="M-16 0 H -5 M 5 0 H 16" stroke="#d9b876" stroke-width="0.9"/>
  </g>
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="iconBg" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#0d5561"/>
      <stop offset="1" stop-color="#042a32"/>
    </linearGradient>
    <linearGradient id="iconGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f5e4b8"/>
      <stop offset="1" stop-color="#c49a54"/>
    </linearGradient>
    <radialGradient id="iconGlow" cx="0.5" cy="0.35" r="0.6">
      <stop offset="0" stop-color="#ffe9b0" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="104" fill="url(#iconBg)"/>
  <rect width="512" height="512" rx="104" fill="url(#iconGlow)"/>
  <circle cx="256" cy="256" r="198" fill="none" stroke="#d9b876" stroke-width="6" opacity="0.5"/>
  <circle cx="256" cy="256" r="184" fill="none" stroke="#f4e3bb" stroke-width="2" stroke-dasharray="10 8" opacity="0.5"/>
  <g transform="translate(256 400)">
    <ellipse rx="130" ry="34" fill="#03252b" opacity="0.5"/>
    <path d="M-52 20 L -38 -190 L 38 -190 L 52 20 Z" fill="#f0e2c2"/>
    <path d="M-40 -36 L 40 -36 L 45 10 L -45 10 Z" fill="#b9563d"/>
    <path d="M-35 -112 L 35 -112 L 39 -66 L -39 -66 Z" fill="#b9563d"/>
    <rect x="-52" y="-218" width="104" height="34" fill="#39392f"/>
    <rect x="-34" y="-272" width="68" height="58" fill="#ffe3a0"/>
    <path d="M-52 -272 L 52 -272 L 0 -318 Z" fill="#47534d"/>
    <path d="M0 -314 L 0 -360" stroke="#d8c69a" stroke-width="6"/>
    <path d="M2 -356 L 60 -338 L 2 -320 Z" fill="#e8a84c"/>
    <path d="M0 -262 L 180 -300 L 180 -230 Z" fill="#ffe6a3" opacity="0.22"/>
    <path d="M0 -262 L -180 -300 L -180 -230 Z" fill="#ffe6a3" opacity="0.16"/>
    <circle cx="0" cy="-262" r="34" fill="#ffe6a3" opacity="0.2"/>
    <path d="M-124 28 C -96 4, -42 -2, 0 8 C 48 0, 98 8, 126 30 C 72 46, -70 46, -124 28 Z" fill="#6f9a5a" opacity="0.55"/>
  </g>
  <path d="M-20 462 C 80 438, 168 472, 264 450 S 438 438, 532 462" stroke="#d8ecdf" stroke-width="4" fill="none" opacity="0.3"/>
  <path d="M-10 486 C 92 462, 178 494, 276 474 S 450 462, 522 486" stroke="#d8ecdf" stroke-width="3" fill="none" opacity="0.2"/>
</svg>`;

await Promise.all([
  sharp(Buffer.from(portraitSvg)).png({ compressionLevel: 9 }).toFile(path.join(root, "public", "portrait.png")),
  sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 87, mozjpeg: true })
    .toFile(path.join(root, "public", "og.jpg")),
  sharp(Buffer.from(iconSvg)).png({ compressionLevel: 9 }).toFile(path.join(root, "app", "icon.png")),
]);

/* ——— One-page PDF resume, written by hand so there are no build deps ——— */

const escapePdf = (value) =>
  value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const ops = [];
const text = (x, y, size, font, color, value) => {
  ops.push(
    `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm (${escapePdf(value)}) Tj ET`,
  );
};
const rule = (y, color = "0.72 0.59 0.38", width = 0.7) => {
  ops.push(`${color} RG ${width} w 48 ${y} m 547 ${y} l S`);
};

text(48, 790, 27, "F1", "0.20 0.14 0.09", "Real Madrid Haikal Putra");
text(48, 770, 12, "F2", "0.45 0.31 0.16", "Creative Frontend Engineer  ·  Lisbon, Portugal");
text(48, 752, 9.5, "F2", "0.30 0.24 0.16", "hello@alexrivers.dev  ·  alexrivers.dev  ·  github.com/alexrivers  ·  linkedin.com/in/alexrivers");
rule(738);

let y = 716;
text(48, y, 9, "F1", "0.45 0.31 0.16", "PROFILE");
y -= 15;
const summary =
  "Product-minded frontend engineer with eight years building fast, accessible, " +
  "high-craft interfaces. I lead frontend architecture, care deeply about performance " +
  "budgets and motion, and still write the shaders and tests myself.";
for (const line of wrap(summary, 102)) {
  text(48, y, 9.5, "F2", "0.22 0.17 0.11", line);
  y -= 12.5;
}

y -= 12;
text(48, y, 9, "F1", "0.45 0.31 0.16", "EXPERIENCE");
y -= 16;

const jobs = [
  {
    role: "Senior Frontend Engineer",
    company: "Northwind Studio — Lisbon (Hybrid)",
    period: "2023 — Present",
    bullets: [
      "Technical lead for a realtime market-intelligence product used by 30k analysts.",
      "Cut dashboard interaction latency from 340ms to 48ms with worker-owned derived state.",
      "Designed a streaming layer keeping 60 charts in sync; mentor three engineers.",
    ],
  },
  {
    role: "Frontend Engineer to Platform Lead",
    company: "Driftline — Berlin (Remote)",
    period: "2021 — 2023",
    bullets: [
      "Shipped a 70-component design system adopted by five product teams.",
      "Rebuilt the tracking map under a 180KB JS budget at 60fps on mid-range Android.",
      "Introduced preview environments and visual regression; UI regressions down 70%.",
    ],
  },
  {
    role: "Full-stack Developer",
    company: "Harbor Labs — Porto",
    period: "2019 — 2021",
    bullets: [
      "Second engineer on a fintech onboarding product, from whiteboard to 40k monthly users.",
      "Reduced identity-verification drop-off by 31% through progressive disclosure.",
      "Built the internal operations console still in daily use.",
    ],
  },
  {
    role: "Freelance Developer & Designer",
    company: "Independent — Porto / Remote",
    period: "2017 — 2019",
    bullets: [
      "Interactive exhibits for two regional science museums and eleven marketing sites.",
      "Every site shipped above 95 Lighthouse performance.",
    ],
  },
];

for (const job of jobs) {
  text(48, y, 10.5, "F1", "0.20 0.14 0.09", job.role);
  text(390, y, 8.5, "F2", "0.45 0.38 0.28", job.period);
  y -= 12;
  text(48, y, 9, "F2", "0.45 0.31 0.16", job.company);
  y -= 13;
  for (const bullet of job.bullets) {
    for (const [index, line] of wrap(bullet, 96).entries()) {
      text(58, y, 9, "F2", "0.22 0.17 0.11", index === 0 ? `- ${line}` : `  ${line}`);
      y -= 11.5;
    }
  }
  y -= 7;
}

y -= 2;
text(48, y, 9, "F1", "0.45 0.31 0.16", "SKILLS");
y -= 15;
const skills = [
  "Frontend: TypeScript, React, Next.js, PixiJS/WebGL, CSS & motion, performance, accessibility",
  "Backend: Node.js, Python/FastAPI, tRPC & GraphQL, WebSockets/SSE",
  "Data: PostgreSQL, Prisma/Drizzle, Redis, Supabase",
  "Cloud & DevOps: Vercel, AWS, Cloudflare, Docker, GitHub Actions, observability",
];
for (const line of skills) {
  text(48, y, 9, "F2", "0.22 0.17 0.11", line);
  y -= 12;
}

y -= 6;
text(48, y, 9, "F1", "0.45 0.31 0.16", "EDUCATION");
y -= 15;
text(48, y, 9.5, "F2", "0.22 0.17 0.11", "BSc Computer Science, University of Porto — 2013 to 2017  ·  HCI focus");
y -= 12;
text(48, y, 9.5, "F2", "0.22 0.17 0.11", "Interaction Design Certificate, Interaction Design Foundation — 2018");

y -= 18;
text(48, y, 9, "F1", "0.45 0.31 0.16", "SELECTED WORK");
y -= 15;
text(48, y, 9, "F2", "0.22 0.17 0.11", "AI Stock Synchronization  ·  Photobooth  ·  Finance Tracker  ·  AI Music Analyzer  ·  Travel System");
y -= 12;
text(48, y, 9, "F2", "0.22 0.17 0.11", "Detailed case studies and live links: alexrivers.dev");

rule(58, "0.72 0.59 0.38", 0.7);
text(48, 44, 8, "F2", "0.50 0.44 0.34", "Sail the portfolio at alexrivers.dev — generated from the Island Journey project.");

function wrap(value, maxLength) {
  const words = value.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxLength && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

const content = ops.join("\n");
const contentLength = Buffer.byteLength(content, "latin1");
const objects = [
  null,
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${contentLength} >>\nstream\n${content}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (let index = 1; index < objects.length; index += 1) {
  offsets[index] = Buffer.byteLength(pdf, "latin1");
  pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
}
const xrefOffset = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
for (let index = 1; index < objects.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
await writeFile(path.join(root, "public", "resume.pdf"), pdf, "latin1");

console.log("Generated public/portrait.png, public/og.jpg, app/icon.png, public/resume.pdf");
