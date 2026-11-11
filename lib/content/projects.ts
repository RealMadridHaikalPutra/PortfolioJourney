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
    id: "unified-marketplace-gateway",
    title: "Unified Marketplace Gateway",
    kicker: "One API for every marketplace",
    epoch: "2025",
    summary:
      "An Apache APISIX middleware that exposes a single unified API over Shopee, TikTok Shop and Lazada, hiding authentication, signatures, token lifecycle and response differences.",
    description: [
      "Every marketplace has its own auth flow, HMAC signature scheme, pagination style and error format. This gateway puts one consistent API in front of all of them, so a backend application integrates once instead of three times.",
      "I designed the plugin chain, the credential and token handling, and the response normalisation. The whole stack is bootstrapped with Docker Compose, which registers upstreams, routes and plugins automatically.",
    ],
    role: "Backend Engineer",
    timeline: "2025",
    team: "Solo",
    status: "Working system · open on GitHub",
    metrics: [
      { label: "Marketplaces unified", value: "3" },
      { label: "Routes auto-registered", value: "17" },
      { label: "Plugins in the chain", value: "6" },
    ],
    technologies: [
      "Apache APISIX",
      "Lua",
      "Docker",
      "Docker Compose",
      "OpenAPI",
      "HMAC-SHA256",
      "Camunda",
    ],
    architecture: [
      "Plugin chain: token-manager, credential-loader, marketplace-router, request-transformer, webhook-receiver and webhook-registrar.",
      "Per-marketplace adapters transform the unified request, sign it, call the upstream API and normalise the response inline.",
      "Fan-out mode queries every marketplace in one request (marketplace=all), with auto-enrichment of product details.",
      "Hot-reloadable JSON config for webhook forwarding, including starting Camunda process instances from marketplace signals.",
    ],
    challenges: [
      {
        title: "Expiring tokens",
        solution:
          "Automatic access-token refresh persisted to the credential store, plus a force-refresh and retry when a marketplace answers 401.",
      },
      {
        title: "Three pagination models",
        solution:
          "Page/offset (Shopee) and cursor/page_token (TikTok) are both returned through one pagination object: page, page_size, total, has_next, next_page_token.",
      },
      {
        title: "Errors hidden inside HTTP 200",
        solution:
          "Business errors are detected and mapped to explicit HTTP errors with per-item failures, so a 200 from the gateway is always clean.",
      },
    ],
    features: [
      "Unified product list, detail, create, stock and status endpoints",
      "Order list and shipping label / AWB document download",
      "Shipping channel and provider sync",
      "Webhook receiver with configurable forwarding",
      "Structured JSON logging with request IDs",
      "OpenAPI specification and full documentation",
    ],
    responsibilities: [
      "Gateway architecture and plugin design",
      "Marketplace adapters and signature handling",
      "Unified response and error contract",
      "Docker-based bootstrap and test scripts",
    ],
    gallery: [
      { caption: "Plugin chain from unified request to marketplace call", variant: 0 },
      { caption: "Unified pagination across offset and cursor APIs", variant: 1 },
      { caption: "Webhook forwarding into Camunda processes", variant: 2 },
    ],
    links: {
      github: "https://github.com/RealMadridHaikalPutra/apisix",
    },
    artwork: {
      from: "#082c36",
      to: "#14545a",
      accent: "#e7b566",
      motif: "chart",
    },
  },
  {
    id: "socialcollateral-ai",
    title: "SocialCollateral AI",
    kicker: "Quantifying trust between borrowers",
    epoch: "2025",
    summary:
      "A social graph engine for Amartha that turns the idea of joint liability (tanggung renteng) into a measurable AI-driven Group Trust Score for group lending decisions.",
    description: [
      "Built at the Amartha x GDG Jakarta Hackathon 2025, where our team reached the finals. The goal was to make group lending decisions more objective, precise and traceable.",
      "I built the application end to end as the team's hacker: an interactive network map on the frontend and a FastAPI backend that orchestrates graph analytics, NLP and computer vision into one score.",
    ],
    role: "Hacker (Full Stack)",
    timeline: "Nov 2025",
    team: "Hackathon team",
    status: "Finalist · Amartha x GDG Jakarta Hackathon 2025",
    metrics: [
      { label: "Hackathon result", value: "Finalist" },
      { label: "AI modules combined", value: "3" },
      { label: "Output", value: "Group Trust Score" },
    ],
    technologies: [
      "React",
      "Vite",
      "Sigma.js",
      "Python",
      "FastAPI",
      "NLP",
      "Computer Vision",
    ],
    architecture: [
      "React (Vite) frontend with Sigma.js rendering an interactive network map of borrower groups.",
      "FastAPI backend exposing REST APIs and orchestrating the analysis modules.",
      "Graph analytics using clustering coefficient and centrality to describe group structure.",
      "NLP over field agent reports and computer vision over asset images, merged into a single Group Trust Score.",
    ],
    challenges: [
      {
        title: "Making tanggung renteng measurable",
        solution:
          "Modelled borrowers as a social graph and scored group cohesion with clustering coefficient and centrality.",
      },
      {
        title: "Mixed evidence sources",
        solution:
          "Combined network metrics, NLP on field agent reports and computer vision on asset images into one integrated score.",
      },
      {
        title: "Explaining a score to credit staff",
        solution:
          "The interactive network map shows the structure behind each group, so a decision can be traced to its evidence.",
      },
    ],
    features: [
      "Interactive network map of borrower groups",
      "Graph metrics: clustering coefficient and centrality",
      "NLP analysis of field agent reports",
      "Computer vision indicators from asset images",
      "AI-based Group Trust Score for lending decisions",
    ],
    responsibilities: [
      "End-to-end application development",
      "System architecture design",
      "Network analysis and graph visualisation",
      "Integration of NLP and computer vision modules",
    ],
    gallery: [
      { caption: "Interactive network map of a borrower group", variant: 0 },
      { caption: "Graph metrics behind the trust score", variant: 1 },
      { caption: "Group Trust Score with supporting evidence", variant: 2 },
    ],
    links: {
      github: "https://github.com/RealMadridHaikalPutra",
    },
    artwork: {
      from: "#1f3a2f",
      to: "#426b4f",
      accent: "#e3c98b",
      motif: "map",
    },
  },
  {
    id: "kharisma-travel-system",
    title: "Kharisma Travel System",
    kicker: "Travel operations, digitised end to end",
    epoch: "2025",
    summary:
      "A Travel Management System for PT Kharisma Project Travel, built from flowchart and requirements analysis through to full implementation, with BPMN workflow automation.",
    description: [
      "The project covered the whole cycle: system analysis and flowcharts, UI/UX design in Figma, then a full-stack implementation that supports travel operations digitally.",
      "I built the frontend and backend in Next.js, including server-side logic and API routes, and automated business processes with BPMN workflows on Camunda.",
    ],
    role: "Full Stack Developer",
    timeline: "Jun 2025 – Dec 2025",
    team: "PT Kharisma Project Travel",
    status: "Developed for PT Kharisma Project Travel",
    metrics: [
      { label: "Delivery scope", value: "End-to-end" },
      { label: "Workflow engine", value: "Camunda" },
      { label: "Primary database", value: "PostgreSQL" },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Camunda",
      "BPMN",
      "Figma",
    ],
    architecture: [
      "Next.js application with server-side logic and API routes for both frontend and backend.",
      "PostgreSQL as the primary database for structured, secure data.",
      "BPMN processes on Camunda to standardise business workflows.",
      "System integrations and performance optimisation to support daily operations.",
    ],
    challenges: [
      {
        title: "Turning operations into software",
        solution:
          "Started with flowcharts and requirements analysis so the data model and screens followed the real travel process.",
      },
      {
        title: "Consistent business processes",
        solution:
          "Modelled workflows in BPMN and ran them on Camunda so each process runs the same way every time.",
      },
      {
        title: "One person across design and code",
        solution:
          "Designed the UI in Figma first, then implemented it in Next.js so design and build stayed aligned.",
      },
    ],
    features: [
      "Travel management workflows",
      "BPMN-based workflow automation",
      "Server-side logic and API routes",
      "Structured PostgreSQL data management",
      "Integration with other systems",
    ],
    responsibilities: [
      "Flowcharts and system requirement analysis",
      "UI/UX design in Figma",
      "Frontend and backend development",
      "Database design and workflow automation",
      "Performance optimisation",
    ],
    gallery: [
      { caption: "Travel management dashboard", variant: 0 },
      { caption: "BPMN workflow for a travel process", variant: 1 },
      { caption: "Figma design to implemented screen", variant: 2 },
    ],
    links: {
      github: "https://github.com/RealMadridHaikalPutra/kharismaprojects",
    },
    artwork: {
      from: "#1c2238",
      to: "#43355c",
      accent: "#8fd6c2",
      motif: "map",
    },
  },
  {
    id: "mirorim-internal-systems",
    title: "Mirorim Jaya Internal Systems",
    kicker: "The tools a company runs on",
    epoch: "2022",
    summary:
      "A suite of internal systems for Mirorim Jaya: inventory management, human resources, web-based office attendance and a BPMN process automation app.",
    description: [
      "Since August 2022 I have been responsible for building the company's internal software, covering the full cycle from requirements analysis and database design to frontend, backend and deployment.",
      "Working across several integrated systems taught me to build solutions that are scalable and fit real business needs.",
    ],
    role: "Full Stack Developer",
    timeline: "Aug 2022 – Present",
    team: "Mirorim Jaya",
    status: "In use · ongoing development",
    metrics: [
      { label: "Systems built", value: "4" },
      { label: "Tenure", value: "Since Aug 2022" },
      { label: "Lifecycle covered", value: "Analysis to deploy" },
    ],
    technologies: [
      "React",
      "Next.js",
      "PHP",
      "Express.js",
      "PostgreSQL",
      "MySQL",
      "BPMN",
    ],
    architecture: [
      "Inventory Management System for stock and item tracking.",
      "Human Resource Management System for staff data.",
      "Web-based office attendance application.",
      "BPMN-based application automating business processes.",
    ],
    challenges: [
      {
        title: "Many systems, one business",
        solution:
          "Designed each database around shared business entities so the systems fit together instead of living in silos.",
      },
      {
        title: "Requirements from non-technical users",
        solution:
          "Began every system with requirements analysis, then built and deployed it end to end.",
      },
      {
        title: "Repeatable processes",
        solution:
          "Used BPMN to automate recurring business processes and make them consistent.",
      },
    ],
    features: [
      "Inventory management",
      "HR management",
      "Web-based attendance",
      "BPMN process automation",
    ],
    responsibilities: [
      "Requirements analysis",
      "Database design",
      "Frontend and backend development",
      "Deployment and maintenance",
    ],
    gallery: [
      { caption: "Inventory management overview", variant: 0 },
      { caption: "HR and attendance records", variant: 1 },
      { caption: "BPMN-automated business process", variant: 2 },
    ],
    links: {
      github: "https://github.com/RealMadridHaikalPutra",
    },
    artwork: {
      from: "#2c2a1e",
      to: "#5c5636",
      accent: "#d7b56d",
      motif: "ledger",
    },
  },
  {
    id: "artaka",
    title: "Artaka",
    kicker: "A shop in your pocket",
    epoch: "2023",
    summary:
      "A mobile Cashier and Shop Management System that supports day-to-day sales and store operations.",
    description: [
      "Artaka is a mobile application I built at Mirorim Jaya to support selling and managing a store: the cashier flow and the shop management behind it.",
      "It sits alongside the company's other internal systems and was built with React Native.",
    ],
    role: "Full Stack Developer",
    timeline: "Aug 2022 – Present",
    team: "Mirorim Jaya",
    status: "Developed at Mirorim Jaya",
    metrics: [
      { label: "Platform", value: "Mobile" },
      { label: "Framework", value: "React Native" },
      { label: "Scope", value: "Cashier + Shop" },
    ],
    technologies: ["React Native", "REST API", "PostgreSQL", "MySQL"],
    architecture: [
      "React Native mobile client for cashier and store management.",
      "REST API backend for sales and store data.",
      "Relational database for products, sales and shop records.",
    ],
    challenges: [
      {
        title: "Speed at the counter",
        solution:
          "Kept the cashier flow focused on the few actions a sale actually needs.",
      },
      {
        title: "Selling and managing in one app",
        solution:
          "Combined the cashier and shop management sides on a shared data model.",
      },
      {
        title: "Fitting the business",
        solution:
          "Shaped features around how the store really operates rather than a generic POS template.",
      },
    ],
    features: [
      "Cashier and sales flow",
      "Shop management",
      "Mobile-first interface",
      "Integration with company systems",
    ],
    responsibilities: [
      "Mobile app development",
      "Backend and API development",
      "Database design",
    ],
    gallery: [
      { caption: "Cashier screen", variant: 0 },
      { caption: "Shop management view", variant: 1 },
      { caption: "Sales overview", variant: 2 },
    ],
    links: {
      github: "https://github.com/RealMadridHaikalPutra",
    },
    artwork: {
      from: "#3b1f2b",
      to: "#7a3a3f",
      accent: "#f2c9a0",
      motif: "ledger",
    },
  },
];

export const projectById = new Map(projects.map((project) => [project.id, project]));

export function getProject(id: string): Project | undefined {
  return projectById.get(id as ProjectId);
}
