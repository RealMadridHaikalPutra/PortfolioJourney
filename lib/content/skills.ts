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
    label: "Frontend Development",

    blurb:
      "Mengembangkan antarmuka web modern yang responsif, interaktif, dan berorientasi pada pengalaman pengguna.",

    accent: "#2563EB",

    skills: [
      {
        name: "React",
        icon: "layers",
        level: 92,
        years: 3,
        description:
          "Mengembangkan Single Page Application, reusable component, custom hooks, state management, serta integrasi REST API.",
      },
      {
        name: "Next.js",
        icon: "layers",
        level: 94,
        years: 3,
        description:
          "Membangun aplikasi menggunakan App Router, Server Component, API Routes, Middleware, Authentication, dan Deployment.",
      },
      {
        name: "TypeScript",
        icon: "code",
        level: 88,
        years: 2,
        description:
          "Mengembangkan aplikasi yang lebih aman menggunakan static typing dan reusable type.",
      },
      {
        name: "Tailwind CSS",
        icon: "wind",
        level: 92,
        years: 3,
        description:
          "Membangun antarmuka modern, responsive, dark mode, dan reusable design system.",
      },
      {
        name: "React Native",
        icon: "smartphone",
        level: 75,
        years: 1,
        description:
          "Mengembangkan aplikasi mobile multiplatform berbasis React Native.",
      },
      {
        name: "PixiJS",
        icon: "sparkles",
        level: 70,
        years: 1,
        description:
          "Membangun pengalaman interaktif berbasis Canvas dan WebGL untuk portfolio.",
      },
    ],
  },
  {
    id:"backend",

    label:"Backend Engineering",

    blurb:
    "Merancang backend yang scalable melalui REST API, middleware, workflow automation, dan integrasi berbagai layanan.",

    accent:"#DC2626",

    skills:[

    {
    name:"FastAPI",
    icon:"server",
    level:94,
    years:3,
    description:"REST API, Scheduler, Background Task, Middleware, AI Service, dan Enterprise Integration."
    },

    {
    name:"Fastify",
    icon:"server",
    level:92,
    years:2,
    description:"Backend berperforma tinggi menggunakan Fastify, PostgreSQL, Redis, dan Authentication."
    },

    {
    name:"Express.js",
    icon:"server",
    level:88,
    years:3,
    description:"REST API, JWT Authentication, Middleware, Upload File, dan API Integration."
    },

    {
    name:"PHP",
    icon:"code",
    level:82,
    years:2,
    description:"Backend development untuk berbagai aplikasi internal perusahaan."
    },

    {
    name:"REST API",
    icon:"workflow",
    level:96,
    years:3,
    description:"Merancang dan mengintegrasikan REST API antar sistem enterprise dan marketplace."
    },

    {
    name:"GraphQL",
    icon:"workflow",
    level:70,
    years:1,
    description:"Pengalaman menggunakan GraphQL pada beberapa project dan eksplorasi API modern."
    }

    ]
    },
    {
      id:"database",

      label:"Database",

      blurb:
      "Merancang struktur database yang efisien untuk aplikasi enterprise dan sistem terdistribusi.",

      accent:"#7C3AED",

      skills:[

      {
      name:"PostgreSQL",
      icon:"database",
      level:94,
      years:3,
      description:"Database utama pada berbagai project enterprise, workflow, dan sinkronisasi marketplace."
      },

      {
      name:"MySQL",
      icon:"database",
      level:86,
      years:3,
      description:"Perancangan relational database untuk aplikasi web."
      },

      {
      name:"Redis",
      icon:"boxes",
      level:90,
      years:2,
      description:"Caching, Queue, Pub/Sub, Scheduler, Distributed Lock, Background Job."
      },

      {
      name:"Supabase",
      icon:"cloud",
      level:88,
      years:2,
      description:"Authentication, Database, Storage, Realtime, dan Edge Function."
      },

      {
      name:"Firebase",
      icon:"cloud",
      level:84,
      years:2,
      description:"Authentication, Firestore, Cloud Messaging, dan Storage."
      }

      ]
    },
    {
    id:"cloud",

    label:"Enterprise & Integration",

    blurb:
    "Membangun solusi enterprise melalui API Gateway, workflow automation, middleware, dan integrasi berbagai platform.",

    accent:"#0EA5E9",

    skills:[

    {
    name:"Apache APISIX",
    icon:"globe",
    level:90,
    years:1,
    description:"API Gateway, Routing, Authentication, Upstream Management, Plugin, Reverse Proxy."
    },

    {
    name:"Camunda BPMN",
    icon:"workflow",
    level:90,
    years:2,
    description:"Workflow Automation, Business Process Management, External Task, Process Orchestration."
    },

    {
    name:"API Integration",
    icon:"workflow",
    level:96,
    years:3,
    description:"Integrasi Shopee, TikTok Shop, LDAP, InvenTree, Payment Gateway, dan REST API."
    },

    {
    name:"System Design",
    icon:"chart",
    level:88,
    years:2,
    description:"Merancang arsitektur backend, middleware, workflow, database, queue, dan distributed system."
    },

    {
    name:"Artificial Intelligence",
    icon:"cpu",
    level:82,
    years:2,
    description:"Gemini AI, NLP, Computer Vision, Prompt Engineering, Graph Analytics."
    }

    ]
  },
  {
    id:"devops",

    label:"DevOps",

    blurb:
    "Mengelola lingkungan pengembangan, deployment, monitoring, dan otomasi proses pengembangan.",

    accent:"#EA580C",

    skills:[

    {
    name:"Docker",
    icon:"container",
    level:90,
    years:2,
    description:"Docker Compose, Multi Container, Volume, Network, Deployment."
    },

    {
    name:"Git",
    icon:"git",
    level:92,
    years:3,
    description:"Git Flow, Branch Strategy, Code Review, Repository Management."
    },

    {
    name:"Linux",
    icon:"terminal",
    level:84,
    years:2,
    description:"Ubuntu Server, VPS, SSH, Service Management, Cron Job."
    },

    {
    name:"Deployment",
    icon:"cloud",
    level:84,
    years:2,
    description:"Deployment menggunakan Docker, VPS, Vercel, dan layanan cloud."
    },

    {
    name:"Testing",
    icon:"test",
    level:82,
    years:2,
    description:"API Testing, Integration Testing, Black Box Testing, dan Debugging."
    }

    ]
  },
  {
id:"tools",

label:"Tools & Design",

blurb:
"Tools yang digunakan dalam proses analisis, desain, kolaborasi, dan pengembangan perangkat lunak.",

accent:"#16A34A",

skills:[

{
name:"Figma",
icon:"pen",
level:88,
years:2,
description:"Wireframe, UI Design, Prototype, dan Design Collaboration."
},

{
name:"Postman",
icon:"workflow",
level:92,
years:3,
description:"API Development, Testing, Documentation, dan Collection Management."
},

{
name:"GitHub",
icon:"git",
level:92,
years:3,
description:"Version Control, Collaboration, Issue Tracking, dan CI Workflow."
},

{
name:"VS Code",
icon:"code",
level:95,
years:4,
description:"Editor utama untuk pengembangan frontend, backend, AI, dan enterprise system."
},

{
name:"Photoshop",
icon:"pen",
level:78,
years:4,
description:"Editing asset, UI mockup, dan kebutuhan desain visual."
}

]
},
];
