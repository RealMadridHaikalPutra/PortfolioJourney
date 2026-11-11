export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experience: Experience[] = [
  {
    company: "Northwind Studio",
    role: "Senior Frontend Engineer",
    period: "2023 — Present",
    location: "Lisbon · Hybrid",
    summary:
      "Technical lead for a realtime market-intelligence product used by 30k analysts. I own frontend architecture, performance, and the design-system contract with product design.",
    highlights: [
      "Cut the main dashboard's interaction latency from 340ms to 48ms by moving derived state into a worker and virtualising the tape.",
      "Designed the streaming data layer that keeps 60 charts in sync without a single rerender storm.",
      "Mentor three engineers; run a fortnightly craft review with live profiling.",
    ],
    technologies: ["Next.js", "TypeScript", "PixiJS", "WebSockets", "PostgreSQL", "Playwright"],
  },
  {
    company: "Driftline",
    role: "Frontend Engineer → Platform Lead",
    period: "2021 — 2023",
    location: "Berlin · Remote-first",
    summary:
      "Built the frontend platform for a logistics scale-up, from design tokens to release automation, while shipping customer-facing tracking experiences.",
    highlights: [
      "Shipped a 70-component design system adopted by five product teams.",
      "Rebuilt the tracking map to stay under a 180KB JS budget and 60fps on mid-range Android.",
      "Introduced preview environments and visual regression, reducing UI regressions by 70%.",
    ],
    technologies: ["React", "TypeScript", "MapLibre", "Node.js", "Storybook", "Docker"],
  },
  {
    company: "Harbor Labs",
    role: "Full-stack Developer",
    period: "2019 — 2021",
    location: "Porto",
    summary:
      "Second engineer on a fintech onboarding product. I worked across the stack, but lived in the browser — forms, state, and the little moments between steps.",
    highlights: [
      "Took onboarding from whiteboard to 40k monthly users in eleven months.",
      "Reduced drop-off at identity verification by 31% through progressive disclosure.",
      "Built the internal admin console still used by the operations team today.",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS"],
  },
  {
    company: "Independent",
    role: "Freelance Developer & Designer",
    period: "2017 — 2019",
    location: "Porto · Remote",
    summary:
      "Small, deliberate projects for studios, museums, and one very patient bakery. Learned to scope, price, and say no.",
    highlights: [
      "Built interactive exhibits for two regional science museums.",
      "Designed and shipped eleven marketing sites, all above 95 Lighthouse.",
      "Created the first version of the ocean renderer later used in this portfolio.",
    ],
    technologies: ["JavaScript", "GSAP", "WebGL", "Figma", "Eleventy"],
  },
];
