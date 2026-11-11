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
    company: "Mirorim Jaya",
    role: "Full Stack Developer",
    period: "Agustus 2022 — Sekarang",
    location: "Jakarta, Indonesia",

    summary:
      "Bertanggung jawab mengembangkan berbagai sistem internal perusahaan secara end-to-end, mulai dari analisis kebutuhan, perancangan database, pengembangan frontend dan backend, hingga deployment. Terlibat dalam pembangunan Inventory Management System, Human Resource Management System, aplikasi absensi, workflow automation berbasis BPMN, serta aplikasi mobile untuk mendukung operasional bisnis.",

    highlights: [
      "Mengembangkan Inventory Management System untuk membantu pengelolaan stok dan proses operasional perusahaan.",
      "Membangun Human Resource Management System dan aplikasi absensi berbasis web.",
      "Mengembangkan aplikasi kasir dan Shop Management System (Artaka) untuk mendukung operasional penjualan.",
      "Merancang REST API, struktur database, autentikasi, serta integrasi antar sistem internal.",
      "Mengembangkan workflow automation menggunakan BPMN untuk meningkatkan efisiensi proses bisnis.",
    ],

    technologies: [
      "React",
      "Next.js",
      "FastAPI",
      "PHP",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "Camunda BPMN",
      "Docker",
      "REST API",
    ],
  },

  {
    company: "PT Kharisma Project Travel",
    role: "Full Stack Developer",
    period: "Juni 2025 — Desember 2025",
    location: "Remote",

    summary:
      "Mengembangkan Travel Management System secara end-to-end mulai dari analisis kebutuhan, perancangan UI/UX, implementasi frontend dan backend, hingga workflow automation untuk mendukung proses bisnis perusahaan.",

    highlights: [
      "Merancang antarmuka pengguna menggunakan Figma sebelum proses implementasi.",
      "Mengembangkan frontend dan backend menggunakan Next.js.",
      "Membangun REST API dan server-side logic untuk mendukung operasional aplikasi.",
      "Mengintegrasikan PostgreSQL sebagai database utama.",
      "Mengimplementasikan workflow automation menggunakan Camunda BPMN.",
      "Berpartisipasi dalam optimalisasi performa dan integrasi antar layanan.",
    ],

    technologies: [
      "Next.js",
      "PostgreSQL",
      "Camunda BPMN",
      "REST API",
      "Figma",
      "Docker",
    ],
  },

  {
    company: "Amartha × GDG Jakarta Hackathon 2025",
    role: "Full Stack Developer (Hacker)",
    period: "November 2025",
    location: "Jakarta, Indonesia",

    summary:
      "Bersama tim mengembangkan SocialCollateral AI, sebuah platform berbasis Artificial Intelligence yang memanfaatkan Graph Analytics untuk membantu proses analisis social trust dalam sistem group lending.",

    highlights: [
      "Mengembangkan frontend menggunakan React (Vite).",
      "Membangun visualisasi graph interaktif menggunakan Sigma.js.",
      "Mengembangkan backend menggunakan FastAPI.",
      "Mengintegrasikan NLP dan Computer Vision sebagai bagian dari proses analisis.",
      "Berkontribusi dalam perancangan arsitektur sistem end-to-end.",
      "Berhasil masuk Top 15 Finalist Amartha × GDG Jakarta Hackathon.",
    ],

    technologies: [
      "React",
      "Vite",
      "FastAPI",
      "Python",
      "Sigma.js",
      "Google Cloud",
      "Gemini AI",
      "Vertex AI",
      "Graph Analytics",
    ],
  },
];