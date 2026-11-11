export interface TimelineEntry {
  year: string;
  title: string;
  detail: string;
}

export interface EducationEntry {
  period: string;
  title: string;
  place: string;
  detail: string;
}

export interface Achievement {
  title: string;
  detail: string;
  year: string;
}

export interface Stat {
  label: string;
  value: string;
}

export type SocialIcon = "github" | "linkedin" | "dribbble" | "x";

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: SocialIcon;
}

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  availability: string;
  tagline: string;
  intro: string;
  longStory: string[];
  stats: Stat[];
  education: EducationEntry[];
  achievements: Achievement[];
  timeline: TimelineEntry[];
  facts: string[];
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Alex Rivers",
  firstName: "Alex",
  role: "Creative Frontend Engineer",
  location: "Lisbon, Portugal",
  timezone: "WEST · UTC+1",
  email: "hello@alexrivers.dev",
  availability: "Open to select product work",
  tagline: "I build small worlds that make software feel like play.",
  intro:
    "Eight years of shipping fast, accessible interfaces — from realtime trading desks to browser photobooths. I care about the millisecond between intent and response, and the thousand small details that make a product feel alive.",
  longStory: [
    "I grew up on the Atlantic coast, taking apart radios and drawing maps of places that did not exist yet. That combination never really left me: today I build interfaces that behave like little worlds, with clear rules and room to wander.",
    "My work sits where product engineering meets craft. I lead frontend architecture for teams that care about performance budgets as much as motion curves, and I still write the shaders, the state machines, and the tests myself.",
    "When I am not shipping, I am sailing a very slow 1979 sloop, restoring mechanical keyboards, or teaching a small weekly class on creative coding in Lisbon.",
  ],
  stats: [
    { label: "Years shipping", value: "8" },
    { label: "Products launched", value: "24" },
    { label: "Lighthouse score kept", value: "98+" },
    { label: "Countries sailed", value: "17" },
  ],
  education: [
    {
      period: "2013 — 2017",
      title: "BSc Computer Science",
      place: "University of Porto",
      detail:
        "Human–computer interaction focus. Thesis on spatial interfaces for small screens.",
    },
    {
      period: "2018",
      title: "Interaction Design Certificate",
      place: "Interaction Design Foundation",
      detail:
        "Motion, information design, and accessible interaction patterns for the web.",
    },
  ],
  achievements: [
    {
      year: "2025",
      title: "Awwwards Honorable Mention",
      detail: "For an interactive climate data story built with WebGL and SVG.",
    },
    {
      year: "2024",
      title: "Google Dev Library contributor",
      detail: "Open-source Next.js patterns for progressive canvas experiences.",
    },
    {
      year: "2023",
      title: "Speaker · RenderATL",
      detail: "\"Games as documentation\" — narrative interfaces for complex products.",
    },
    {
      year: "2021",
      title: "Internal design-system award",
      detail: "Shipped a 70-component system adopted by five product teams.",
    },
  ],
  timeline: [
    {
      year: "2016",
      title: "First line of production code",
      detail: "A tiny booking site for my hometown sailing club.",
    },
    {
      year: "2017",
      title: "Computer Science degree",
      detail: "Graduated, packed one bag, moved to Berlin for a six-month contract.",
    },
    {
      year: "2019",
      title: "First zero-to-one product",
      detail: "Took a fintech onboarding flow from whiteboard to 40k monthly users.",
    },
    {
      year: "2021",
      title: "Design systems, properly",
      detail: "Led the frontend platform group at Driftline.",
    },
    {
      year: "2023",
      title: "Senior engineer, Northwind",
      detail: "Now building realtime, data-dense products with a small senior team.",
    },
    {
      year: "2026",
      title: "This little ocean",
      detail: "A portfolio you can sail. Built as a deliberate exercise in craft.",
    },
  ],
  facts: [
    "I read the whole Aubrey–Maturin series twice.",
    "My first website is still online, and still uses a marquee.",
    "I can tie six useful knots without looking. Seven if you count the bad one.",
    "Coffee order: espresso, one sugar, always at the same little kiosk in Alfama.",
    "I keep a notebook of interface sounds I like — doors, switches, rain on canvas.",
    "Current obsession: tiny physics simulations that run at 60fps on a phone.",
  ],
  socials: [
    {
      label: "GitHub",
      handle: "github.com/alexrivers",
      href: "https://github.com/alexrivers",
      icon: "github",
    },
    {
      label: "LinkedIn",
      handle: "in/alexrivers",
      href: "https://www.linkedin.com/in/alexrivers",
      icon: "linkedin",
    },
    {
      label: "Dribbble",
      handle: "dribbble.com/alexrivers",
      href: "https://dribbble.com/alexrivers",
      icon: "dribbble",
    },
    {
      label: "X / Twitter",
      handle: "@alexrivers",
      href: "https://x.com/alexrivers",
      icon: "x",
    },
  ],
};
