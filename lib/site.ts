/**
 * Konfigurasi utama website.
 * Digunakan untuk SEO, Open Graph, metadata, sitemap, dan identitas website.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://your-domain.com";

export const siteConfig = {
  url: rawUrl.replace(/\/$/, ""),

  // Nama website
  name: "Real Madrid Haikal Putra",

  // Judul SEO
  title:
    "Real Madrid Haikal Putra | Full Stack Developer Portfolio",

  // Deskripsi SEO
  description:
    "Portfolio interaktif Real Madrid Haikal Putra, Full Stack Developer dari Indonesia yang berfokus pada pengembangan aplikasi web modern, sistem enterprise, integrasi API, AI, dan pengalaman pengguna yang menarik menggunakan React, Next.js, FastAPI, Node.js, PostgreSQL, serta berbagai teknologi modern lainnya.",

  author: {
    name: "Real Madrid Haikal Putra",
    role: "Full Stack Developer",
    email: "realmadrid300504@gmail.com",
  },

  social: {
    github: "https://github.com/RealMadridHaikalPutra",
    linkedin:
      "https://www.linkedin.com/in/real-madrid-haikal-putra-a01b21246",
  },

  keywords: [
    "Real Madrid Haikal Putra",
    "Haikal Putra",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "FastAPI",
    "Fastify",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "PostgreSQL",
    "Redis",
    "Supabase",
    "Firebase",
    "REST API",
    "GraphQL",
    "Docker",
    "PixiJS",
    "AI Developer",
    "Machine Learning",
    "Web Development",
    "Portfolio",
    "Interactive Portfolio",
    "Indonesia Developer",
    "Remote Developer",
  ],
} as const;