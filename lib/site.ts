/**
 * Single source of truth for anything that needs an absolute URL or
 * identity-level metadata. Update NEXT_PUBLIC_SITE_URL in production.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://island-journey.example.com";

export const siteConfig = {
  url: rawUrl.replace(/\/$/, ""),
  name: "Island Journey",
  title: "Alex Rivers · Island Journey — Interactive Portfolio",
  description:
    "Sail a hand-painted ocean, drop anchor at six islands, and explore the work of Alex Rivers — creative frontend engineer building fast, playful products.",
  author: {
    name: "Alex Rivers",
    role: "Creative Frontend Engineer",
    location: "Lisbon, Portugal",
    email: "hello@alexrivers.dev",
  },
  social: {
    github: "https://github.com/alexrivers",
    linkedin: "https://www.linkedin.com/in/alexrivers",
    dribbble: "https://dribbble.com/alexrivers",
    x: "https://x.com/alexrivers",
  },
  keywords: [
    "Alex Rivers",
    "creative frontend engineer",
    "interactive portfolio",
    "PixiJS developer",
    "Next.js portfolio",
    "web game developer",
    "product engineer",
    "Lisbon frontend developer",
  ],
} as const;
