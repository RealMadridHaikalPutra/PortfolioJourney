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
  name: "Real Madrid Haikal Putra",
  firstName: "Real Madrid",

  role: "Software Engineer",

  location: "Jakarta, Indonesia",
  timezone: "WIB · UTC+7",

  email: "realmadrid300504@gmail.com",

  availability:
    "Terbuka untuk peluang Remote, Freelance, Magang, maupun Full-time.",

  tagline:
    "Mengubah proses bisnis yang kompleks menjadi solusi perangkat lunak yang efisien, terintegrasi, dan mudah dikembangkan.",

  intro:
    "Saya adalah Software Engineer yang memiliki pengalaman dalam membangun aplikasi web modern, sistem backend berskala besar, integrasi API, workflow automation, serta perancangan arsitektur sistem. Saya menikmati proses mengembangkan sebuah produk secara end-to-end, mulai dari analisis kebutuhan, perancangan sistem, pengembangan frontend dan backend, hingga deployment dan optimasi performa aplikasi.",

  longStory: [
    "Perjalanan saya dimulai dari rasa penasaran tentang bagaimana sebuah website dan sistem bekerja di balik layar. Sejak saat itu saya terus belajar mengembangkan perangkat lunak, bukan hanya dari sisi frontend, tetapi juga backend, database, API, workflow automation, hingga perancangan arsitektur sistem yang dapat menangani kebutuhan bisnis yang terus berkembang.",

    "Selama lebih dari tiga tahun mengembangkan berbagai proyek, saya telah membangun beragam solusi seperti Inventory Management System, Human Resource Management System, Travel Management System, aplikasi kasir, sistem sinkronisasi stok multi-marketplace, hingga berbagai aplikasi berbasis Artificial Intelligence. Pengalaman tersebut membuat saya terbiasa bekerja mulai dari tahap analisis kebutuhan, perancangan database, implementasi REST API, pengembangan antarmuka pengguna, hingga deployment ke lingkungan produksi.",

    "Saya memiliki ketertarikan besar terhadap backend engineering, distributed system, API integration, workflow automation, dan pengembangan aplikasi enterprise. Bagi saya, perangkat lunak yang baik bukan hanya memiliki tampilan yang menarik, tetapi juga memiliki arsitektur yang kuat, mudah dipelihara, memiliki performa yang baik, dan mampu menyelesaikan permasalahan bisnis secara nyata.",

    "Saat ini saya terus mengembangkan kemampuan di bidang Software Engineering, Artificial Intelligence, Computer Vision, Graph Analytics, serta Workflow Automation. Saya percaya bahwa setiap proyek merupakan kesempatan untuk belajar teknologi baru, meningkatkan kualitas engineering, dan memberikan solusi yang berdampak bagi pengguna."
  ],

  stats: [
    {
      label: "Pengalaman",
      value: "3+ Tahun",
    },
    {
      label: "Project",
      value: "15+",
    },
    {
      label: "Teknologi",
      value: "30+",
    },
    {
      label: "Hackathon",
      value: "Top 15",
    },
  ],

  education: [
    {
      period: "2023 — Sekarang",
      title: "S1 Informatika",
      place: "Universitas Gunadarma",
      detail:
        "Mempelajari Software Engineering, Web Development, Database System, System Analysis, Distributed System, Artificial Intelligence, serta pengembangan perangkat lunak modern.",
    },
    {
      period: "2026",
      title: "Penulisan Ilmiah",
      place: "Universitas Gunadarma",
      detail:
        "Melakukan penelitian mengenai pengembangan sistem sinkronisasi stok multi-marketplace menggunakan Hybrid Synchronization untuk mengurangi overselling pada Shopee dan TikTok Shop.",
    },
  ],

  achievements: [
    {
      year: "2025",
      title: "Top 15 Finalist Amartha x GDG Jakarta Hackathon",
      detail:
        "Bersama tim mengembangkan SocialCollateral AI, sebuah platform berbasis Artificial Intelligence yang memanfaatkan Graph Analytics, Natural Language Processing, Computer Vision, React, FastAPI, dan Google Cloud untuk membantu proses analisis kredit berbasis Social Trust Score.",
    }
  ],

  timeline: [
    {
      year: "2022",
      title: "Memulai Karier sebagai Full Stack Developer",
      detail:
        "Bergabung dengan Mirorim Jaya dan mulai mengembangkan berbagai sistem internal perusahaan seperti Inventory Management System, Human Resource Management System, aplikasi absensi, aplikasi kasir, serta workflow berbasis BPMN.",
    },
    {
      year: "2023",
      title: "Menempuh Pendidikan S1 Informatika",
      detail:
        "Melanjutkan pendidikan di Universitas Gunadarma sekaligus terus mengembangkan kemampuan sebagai Software Engineer melalui berbagai proyek nyata.",
    },
    {
      year: "2024",
      title: "Mengembangkan Berbagai Enterprise Application",
      detail:
        "Mengembangkan berbagai aplikasi menggunakan React, Next.js, FastAPI, Fastify, Express.js, PostgreSQL, Firebase, Supabase, serta berbagai layanan API pihak ketiga.",
    },
    {
      year: "2025",
      title: "Travel Management System",
      detail:
        "Mengembangkan sistem manajemen perjalanan berbasis web menggunakan Next.js, PostgreSQL, dan Camunda BPMN untuk mendukung proses bisnis perusahaan.",
    },
    {
      year: "2025",
      title: "Top 15 Amartha x GDG Jakarta Hackathon",
      detail:
        "Bersama tim mengembangkan SocialCollateral AI yang memanfaatkan Artificial Intelligence, Graph Analytics, NLP, dan Computer Vision sebagai solusi analisis sosial untuk pembiayaan kelompok.",
    },
    {
      year: "2026",
      title: "Penelitian Sistem Sinkronisasi Multi Marketplace",
      detail:
        "Mengembangkan middleware sinkronisasi stok menggunakan Apache APISIX, Redis, PostgreSQL, FastAPI, dan workflow automation sebagai bagian dari penelitian akademik.",
    },
    {
      year: "2026",
      title: "Membangun Portfolio Interaktif",
      detail:
        "Mengembangkan website portfolio berbasis game 2D menggunakan Next.js dan PixiJS untuk menghadirkan pengalaman yang lebih menarik dalam memperkenalkan karya dan pengalaman sebagai Software Engineer.",
    },
  ],

  facts: [
    "Berpengalaman membangun aplikasi web secara end-to-end mulai dari analisis kebutuhan hingga deployment.",
    "Menyukai pengembangan backend menggunakan FastAPI, Fastify, Express.js, serta integrasi REST API.",
    "Memiliki pengalaman mengembangkan workflow automation menggunakan Camunda BPMN.",
    "Berpengalaman membangun sistem sinkronisasi data antar platform menggunakan API Gateway dan arsitektur middleware.",
    "Tertarik pada Distributed System, Artificial Intelligence, Computer Vision, Graph Analytics, dan Workflow Automation.",
    "Menyukai tantangan dalam merancang arsitektur sistem yang scalable, mudah dipelihara, dan memiliki performa tinggi.",
    "Percaya bahwa perangkat lunak terbaik adalah perangkat lunak yang mampu menyelesaikan permasalahan bisnis sekaligus memberikan pengalaman pengguna yang baik.",
  ],

  socials: [
    {
      label: "GitHub",
      handle: "github.com/RealMadridHaikalPutra",
      href: "https://github.com/RealMadridHaikalPutra",
      icon: "github",
    },
    {
      label: "LinkedIn",
      handle: "linkedin.com/in/real-madrid-haikal-putra",
      href: "https://www.linkedin.com/in/real-madrid-haikal-putra/",
      icon: "linkedin",
    },
  ],
};