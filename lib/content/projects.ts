/** Project ids are slugs, so new rows can be added straight in Supabase. */
export type ProjectId = string;

export interface ProjectChallenge {
  title: string;
  solution: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: ProjectId;
  title: string;
  kicker: string;
  epoch: string;
  summary: string;
  description: string[];
  role: string;
  timeline: string;
  team: string;
  status: string;
  metrics: ProjectMetric[];
  technologies: string[];
  architecture: string[];
  challenges: ProjectChallenge[];
  features: string[];
  responsibilities: string[];
  gallery: { caption: string; variant: number }[];
  links: { live?: string; github?: string; video?: string };
  artwork: {
    /** Two-stop gradient used by the illustrated project artwork. */
    from: string;
    to: string;
    accent: string;
    motif: "chart" | "camera" | "ledger" | "waveform" | "map";
  };
}

export const projects: Project[] = [
  {
    id: "ai-stock-sync",
    title: "AI Stock Synchronization",
    kicker: "Realtime market intelligence",
    epoch: "2025",
    summary:
      "A multi-source market dashboard that synchronises live price feeds with AI-written briefings, without ever letting a chart fall out of step.",
    description: [
      "Analysts were juggling six terminals, a spreadsheet, and a chat window. AI Stock Synchronization brings the tape, news, and model-generated context into one deterministic view — every panel driven from a single normalized event stream.",
      "I led the frontend architecture and built the streaming layer used by 60 synchronized widgets. The AI summariser runs server-side; on the client, briefings arrive as structured annotations pinned to the candles they describe.",
    ],
    role: "Lead Frontend Engineer",
    timeline: "5 months · 2025",
    team: "2 frontend, 1 backend, 1 ML engineer, 1 designer",
    status: "Live · internal + 30k analysts",
    metrics: [
      { label: "Interaction latency", value: "48ms" },
      { label: "Charts in sync", value: "60" },
      { label: "Feed uptime", value: "99.98%" },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "PixiJS",
      "WebSockets",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "OpenAI",
      "Docker",
    ],
    architecture: [
      "Normalised event bus in a Web Worker; one reducer, one clock, zero duplicated chart state.",
      "Virtualised tape and canvas charts with batched PixiJS draw calls at a fixed 30Hz render cadence.",
      "Server-side summarisation pipeline writes structured annotations keyed to a price/time index.",
      "Optimistic watchlists with last-write-wins reconciliation and offline queue.",
    ],
    challenges: [
      {
        title: "Six feeds, six clocks",
        solution:
          "Introduced a monotonic sequence per instrument plus a watermark. Late events are dropped or replayed at the next tick, so every chart shows the same truth.",
      },
      {
        title: "Rerender storms",
        solution:
          "Moved derived aggregates into a worker and subscribed charts to narrow selectors. React renders dropped from 1,400/min to under 40/min.",
      },
      {
        title: "AI text that lies",
        solution:
          "Briefings are rendered with explicit source chips and a confidence label; unsupported claims are visually de-emphasised and never fed back into the model.",
      },
    ],
    features: [
      "60 synchronized, canvas-rendered widgets",
      "AI briefings pinned to chart events",
      "Keyboard-first command palette",
      "Offline watchlists with conflict resolution",
      "Configurable alert rules with debounce preview",
      "Full dark/light contrast-tested themes",
    ],
    responsibilities: [
      "Frontend architecture and performance budget",
      "Streaming protocol design with backend",
      "Canvas chart library and interaction model",
      "Accessibility review and keyboard flows",
      "Mentoring, code review, release management",
    ],
    gallery: [
      { caption: "The live tape, briefings, and synchronized candles", variant: 0 },
      { caption: "Alert builder with debounce preview", variant: 1 },
      { caption: "Instrument deep-dive and source provenance", variant: 2 },
    ],
    links: {
      live: "https://example.com/ai-stock-sync",
      github: "https://github.com/alexrivers",
      video: "https://example.com/ai-stock-sync/demo",
    },
    artwork: {
      from: "#082c36",
      to: "#14545a",
      accent: "#e7b566",
      motif: "chart",
    },
  },
  {
    id: "photobooth",
    title: "Photobooth",
    kicker: "A browser that takes pictures",
    epoch: "2024",
    summary:
      "A privacy-first photobooth in the browser: filters, strips, and instant sharing with a fully offline PWA mode.",
    description: [
      "Built for a design conference photo wall, then released publicly. All capture and compositing happens on-device; images never leave the browser unless the guest scans the QR code.",
      "The tricky part was making a heavy media pipeline feel instant on low-end phones. Frames are processed in a worker, previews use an offscreen canvas, and the final strip is encoded lazily.",
    ],
    role: "Creator & Engineer",
    timeline: "3 months · 2024",
    team: "Solo, with a designer friend for the brand",
    status: "Live · 12k strips captured",
    metrics: [
      { label: "TTI on mid Android", value: "1.8s" },
      { label: "On-device processing", value: "100%" },
      { label: "Strips captured", value: "12,400" },
    ],
    technologies: [
      "React",
      "TypeScript",
      "MediaPipe",
      "Canvas API",
      "Web Workers",
      "Cloudflare R2",
      "Zustand",
      "Vite",
    ],
    architecture: [
      "Camera frames stream into an OffscreenCanvas owned by a worker; UI thread only receives ready previews.",
      "Filter graph is a list of composable shaders, previewed at 480px and rendered full-size on capture.",
      "Offline-first PWA with IndexedDB queue; sharing uploads asynchronously when connectivity returns.",
      "Signed short-lived R2 URLs for share links; no account, no tracking.",
    ],
    challenges: [
      {
        title: "Camera permission drop-off",
        solution:
          "Introduced a pre-permission tutorial with a live one-frame demo and a fallback upload path. Completion rose from 54% to 86%.",
      },
      {
        title: "Filter jank at 4K",
        solution:
          "Downscaled previews plus a worker pipeline; sustained 60fps preview and 1.2s final render on a Pixel 4a.",
      },
      {
        title: "Sharing privacy",
        solution:
          "Opt-in uploads only, signed URLs expire in 24 hours, and an explicit delete action removes the object immediately.",
      },
    ],
    features: [
      "Hand-designed film-strip frames",
      "Gestural countdown with sound cues",
      "Six realtime filters and light leaks",
      "QR hand-off to phone",
      "Installable, fully offline PWA",
      "Keyboard and screen-reader capture flow",
    ],
    responsibilities: [
      "Product design and technical direction",
      "Media pipeline and worker architecture",
      "Brand illustration and frame artwork",
      "Deployment, storage, and privacy policy",
    ],
    gallery: [
      { caption: "Capture view with film-strip frames", variant: 0 },
      { caption: "Filter tray, previewed in real time", variant: 1 },
      { caption: "The shared strip page", variant: 2 },
    ],
    links: {
      live: "https://example.com/photobooth",
      github: "https://github.com/alexrivers",
    },
    artwork: {
      from: "#3b1f2b",
      to: "#7a3a3f",
      accent: "#f2c9a0",
      motif: "camera",
    },
  },
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    kicker: "Calm money, clearly seen",
    epoch: "2023",
    summary:
      "A personal finance companion that turns messy bank exports into a clear monthly story, with budgets that adapt instead of nag.",
    description: [
      "Most finance apps show you a wall of numbers and call it insight. This one leads with a single sentence — what changed, and why — then lets you unfold the detail.",
      "I built the import pipeline, categorisation model, and the calm, document-like interface. It runs entirely on a single Postgres instance and a very small serverless surface.",
    ],
    role: "Full-stack Engineer",
    timeline: "4 months · 2023",
    team: "Solo · 400 beta users",
    status: "Private beta",
    metrics: [
      { label: "Import accuracy", value: "97.4%" },
      { label: "Monthly active", value: "68%" },
      { label: "Median import time", value: "2.1s" },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Plaid",
      "Recharts",
      "Tailwind CSS",
    ],
    architecture: [
      "Idempotent import pipeline keyed on a hash of date, amount, and merchant.",
      "Rule engine with user overrides; classification is deterministic and fully inspectable.",
      "Server components render the monthly narrative; interactive charts are the only client islands.",
      "Row-level security with encrypted Plaid tokens at rest.",
    ],
    challenges: [
      {
        title: "Dirty bank data",
        solution:
          "Built a normalisation layer with merchant fingerprinting, duplicate detection, and a one-click \"fix this\" flow that feeds back into the rule engine.",
      },
      {
        title: "Budget guilt",
        solution:
          "Replaced red overspend alerts with rolling envelopes and plain-language forecasts. Beta retention improved by 22%.",
      },
      {
        title: "Sensitive data",
        solution:
          "No third-party analytics on money views, encrypted tokens, scoped sessions, and a documented data-deletion path.",
      },
    ],
    features: [
      "Bank imports with duplicate protection",
      "Adaptive monthly envelopes",
      "A one-sentence monthly story",
      "Merchant rules you can read and edit",
      "CSV export and full data deletion",
      "Responsive, print-friendly reports",
    ],
    responsibilities: [
      "Product definition and research",
      "Data model and import pipeline",
      "UI design and implementation",
      "Privacy and security review",
    ],
    gallery: [
      { caption: "The monthly story and envelope health", variant: 0 },
      { caption: "Transaction review with rule suggestions", variant: 1 },
      { caption: "Cashflow detail, unfolded", variant: 2 },
    ],
    links: {
      live: "https://example.com/finance-tracker",
      github: "https://github.com/alexrivers",
    },
    artwork: {
      from: "#2c2a1e",
      to: "#5c5636",
      accent: "#d7b56d",
      motif: "ledger",
    },
  },
  {
    id: "ai-music-analyzer",
    title: "AI Music Analyzer",
    kicker: "Hearing what a track is made of",
    epoch: "2024",
    summary:
      "Drop in a track and see its key, tempo, mood, and structure — then build a playlist from the parts you actually liked.",
    description: [
      "An experiment in making audio ML understandable. Instead of a black-box label, the interface shows the evidence: the waveform, the beat grid, the spectral fingerprint, and the confidence of each prediction.",
      "The analyzer is a Python service using librosa and a small fine-tuned model. The web app streams analysis progress and lets you audition any detected section in context.",
    ],
    role: "Frontend Lead & Product Designer",
    timeline: "6 months · 2024",
    team: "2 engineers, 1 ML researcher",
    status: "Live · 9k analyses",
    metrics: [
      { label: "Tempo accuracy", value: "96%" },
      { label: "Analysis time", value: "8s / track" },
      { label: "Tracks analysed", value: "9,300" },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "Librosa",
      "PyTorch",
      "Supabase",
      "Web Audio API",
      "Wavesurfer.js",
    ],
    architecture: [
      "Chunked upload to object storage; worker pool runs analysis and writes structured results.",
      "Progress streamed over SSE with resumable jobs and deterministic cache keys.",
      "Web Audio graph for section auditioning, with shared transport state across views.",
      "Supabase row-level security and signed media URLs for private tracks.",
    ],
    challenges: [
      {
        title: "Explaining a model",
        solution:
          "Every prediction carries a visual explanation — beat grid, chroma, confidence spread — plus a \"why this\" tooltip written for musicians, not ML engineers.",
      },
      {
        title: "Long-running jobs",
        solution:
          "Resumable SSE progress with a job ledger; users can close the tab and return to the same analysis state.",
      },
      {
        title: "Browser audio limits",
        solution:
          "A single AudioContext, decoded buffers cached per track, and gapless section transitions via scheduled source nodes.",
      },
    ],
    features: [
      "Key, tempo, and energy detection",
      "Structural section map",
      "Playlist from selected sections",
      "Chord and mood explanations",
      "Private library with signed links",
      "Exportable analysis report",
    ],
    responsibilities: [
      "Interface architecture and motion design",
      "Audio playback and auditioning model",
      "Analysis result schema with ML team",
      "Design of the explanation layer",
    ],
    gallery: [
      { caption: "Waveform, beats, and structural sections", variant: 0 },
      { caption: "Mood and key evidence", variant: 1 },
      { caption: "Building a playlist from sections", variant: 2 },
    ],
    links: {
      live: "https://example.com/music-analyzer",
      github: "https://github.com/alexrivers",
      video: "https://example.com/music-analyzer/walkthrough",
    },
    artwork: {
      from: "#1c2238",
      to: "#43355c",
      accent: "#8fd6c2",
      motif: "waveform",
    },
  },
  {
    id: "travel-system",
    title: "Travel System",
    kicker: "Plans that survive real life",
    epoch: "2022",
    summary:
      "A collaborative itinerary planner that treats a trip as a living map, not a spreadsheet of timestamps.",
    description: [
      "Built for groups who plan across time zones. Every stop is a card on a map, with travel time, opening hours, and budget folded into the route itself. When plans change, the itinerary redraws instead of breaking.",
      "I designed and built the entire product with one backend engineer, from data model to map interactions to the printable day sheet.",
    ],
    role: "Founding Engineer",
    timeline: "7 months · 2022",
    team: "1 frontend, 1 backend, freelance illustration",
    status: "Shipped · acquired 2023",
    metrics: [
      { label: "Trips planned", value: "4,100" },
      { label: "Concurrent editors", value: "24" },
      { label: "Route recalc", value: "120ms" },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Mapbox GL",
      "Supabase",
      "TanStack Query",
      "Zustand",
      "Stripe",
      "PostGIS",
    ],
    architecture: [
      "Map and itinerary share one normalized trip store; edits are applied as commands, not patches.",
      "Presence and live cursors via Supabase realtime channels with per-field conflict handling.",
      "PostGIS-backed travel-time matrix cached per trip and invalidated by mode or date changes.",
      "Printable day sheets generated from the same store as the UI.",
    ],
    challenges: [
      {
        title: "Concurrent planning",
        solution:
          "Command-based editing with field-level last-write-wins and visible presence; no lost stops when two people drag at once.",
      },
      {
        title: "Map performance",
        solution:
          "Clustered layers, viewport-only route computation, and an LRU travel-time cache kept panning at 60fps on an iPad.",
      },
      {
        title: "Plans change",
        solution:
          "Every itinerary keeps an immutable \"as planned\" timeline while the working map can be rearranged freely — one click restores the original.",
      },
    ],
    features: [
      "Drag-to-plan collaborative map",
      "Live presence and cursors",
      "Travel-time-aware day routes",
      "Budget roll-ups per day",
      "Offline day sheets",
      "Shareable, no-login trip links",
    ],
    responsibilities: [
      "Product design and frontend architecture",
      "Map interaction model and route engine",
      "Realtime collaboration protocol",
      "Billing and account flows",
    ],
    gallery: [
      { caption: "Trip map with live collaborators", variant: 0 },
      { caption: "Day plan and travel time budget", variant: 1 },
      { caption: "The printable day sheet", variant: 2 },
    ],
    links: {
      live: "https://example.com/travel-system",
      github: "https://github.com/alexrivers",
    },
    artwork: {
      from: "#1f3a2f",
      to: "#426b4f",
      accent: "#e3c98b",
      motif: "map",
    },
  },
];

export const projectById = new Map(projects.map((project) => [project.id, project]));

export function getProject(id: string): Project | undefined {
  return projectById.get(id as ProjectId);
}
