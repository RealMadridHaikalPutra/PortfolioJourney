export type SkillGroupId =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "devops"
  | "tools";

export type SkillIcon =
  | "code"
  | "layers"
  | "wind"
  | "boxes"
  | "server"
  | "database"
  | "cloud"
  | "container"
  | "git"
  | "terminal"
  | "pen"
  | "gauge"
  | "globe"
  | "cpu"
  | "lock"
  | "chart"
  | "workflow"
  | "sparkles"
  | "test"
  | "smartphone";

export interface Skill {
  name: string;
  icon: SkillIcon;
  /** Self-assessed fluency, used to draw the level meter. */
  level: number;
  years: number;
  description: string;
}

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  blurb: string;
  accent: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "The layer people touch. Fast, tactile, and accessible by default.",
    accent: "#2f7f74",
    skills: [
      {
        name: "TypeScript",
        icon: "code",
        level: 96,
        years: 8,
        description: "Strict types, discriminated unions, zero-any policy.",
      },
      {
        name: "React & Next.js",
        icon: "layers",
        level: 95,
        years: 8,
        description: "App Router, server components, streaming, RSC boundaries.",
      },
      {
        name: "PixiJS & WebGL",
        icon: "sparkles",
        level: 88,
        years: 5,
        description: "Batched 2D rendering, custom shaders, texture atlases.",
      },
      {
        name: "CSS & Motion",
        icon: "pen",
        level: 94,
        years: 8,
        description: "Design tokens, container queries, GSAP choreography.",
      },
      {
        name: "Performance",
        icon: "gauge",
        level: 91,
        years: 6,
        description: "Budgets, profiling, INP work, 60fps interaction design.",
      },
      {
        name: "Accessibility",
        icon: "globe",
        level: 90,
        years: 7,
        description: "WCAG 2.2, keyboard flows, assistive-tech testing.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "APIs that stay boring under load — in the best way.",
    accent: "#9a6a2f",
    skills: [
      {
        name: "Node.js",
        icon: "server",
        level: 89,
        years: 8,
        description: "Fastify, streaming responses, background workers.",
      },
      {
        name: "Python",
        icon: "cpu",
        level: 82,
        years: 6,
        description: "FastAPI services, data pipelines, ML glue code.",
      },
      {
        name: "tRPC & GraphQL",
        icon: "workflow",
        level: 86,
        years: 5,
        description: "End-to-end types and schema-first API design.",
      },
      {
        name: "Realtime",
        icon: "chart",
        level: 84,
        years: 5,
        description: "WebSockets, SSE, presence, conflict-free updates.",
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    blurb: "Modelling first, indexes second, caches last.",
    accent: "#7b5a8c",
    skills: [
      {
        name: "PostgreSQL",
        icon: "database",
        level: 88,
        years: 7,
        description: "Relational modelling, CTEs, window functions, tuning.",
      },
      {
        name: "Prisma & Drizzle",
        icon: "layers",
        level: 90,
        years: 5,
        description: "Type-safe schemas, safe migrations, query planning.",
      },
      {
        name: "Redis",
        icon: "boxes",
        level: 82,
        years: 5,
        description: "Caching, rate limits, queues, ephemeral game state.",
      },
      {
        name: "Supabase",
        icon: "cloud",
        level: 86,
        years: 4,
        description: "Row-level security, realtime channels, storage policies.",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    blurb: "Small surface area, predictable bills, boring deploys.",
    accent: "#3b6f9c",
    skills: [
      {
        name: "Vercel",
        icon: "cloud",
        level: 93,
        years: 6,
        description: "Edge caching, previews, ISR, runtime budgeting.",
      },
      {
        name: "AWS",
        icon: "server",
        level: 78,
        years: 5,
        description: "S3, Lambda, CloudFront, IAM with least privilege.",
      },
      {
        name: "Cloudflare",
        icon: "lock",
        level: 84,
        years: 4,
        description: "Workers, R2, Turnstile, cache and bot rules.",
      },
      {
        name: "Serverless & Edge",
        icon: "globe",
        level: 87,
        years: 5,
        description: "Streaming runtimes, cold-start budgets, geo routing.",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    blurb: "If it is not measured and automated, it is not done.",
    accent: "#8a4b3a",
    skills: [
      {
        name: "Docker",
        icon: "container",
        level: 85,
        years: 6,
        description: "Multi-stage images, reproducible local environments.",
      },
      {
        name: "CI/CD",
        icon: "workflow",
        level: 89,
        years: 7,
        description: "GitHub Actions, preview stacks, safe release trains.",
      },
      {
        name: "Observability",
        icon: "chart",
        level: 83,
        years: 5,
        description: "Sentry, OpenTelemetry, real-user performance budgets.",
      },
      {
        name: "Testing",
        icon: "test",
        level: 86,
        years: 7,
        description: "Vitest, Playwright, visual regression, contract tests.",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "The workshop: where ideas get sketched, cut, and sanded.",
    accent: "#5d7a3f",
    skills: [
      {
        name: "Git",
        icon: "git",
        level: 94,
        years: 9,
        description: "Trunk-based flow, surgical rebases, clear history.",
      },
      {
        name: "Figma",
        icon: "pen",
        level: 87,
        years: 7,
        description: "Design tokens, prototypes, and pair design sessions.",
      },
      {
        name: "GSAP",
        icon: "sparkles",
        level: 90,
        years: 6,
        description: "Timeline choreography, scroll work, game juice.",
      },
      {
        name: "Terminal",
        icon: "terminal",
        level: 88,
        years: 10,
        description: "Fish, tmux, ripgrep, and a suspicious number of aliases.",
      },
      {
        name: "Mobile web",
        icon: "smartphone",
        level: 85,
        years: 6,
        description: "Touch input, safe areas, responsive canvas.",
      },
    ],
  },
];
