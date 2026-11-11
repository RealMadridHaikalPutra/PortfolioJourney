import type { PortfolioContent } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

export function structuredData(content: PortfolioContent) {
  const { profile, skillGroups, projects } = content;
  const knowsAbout = Array.from(
    new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.name))),
  ).slice(0, 12);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.intro,
        email: `mailto:${profile.email}`,
        url: siteConfig.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location,
        },
        sameAs: profile.socials.map((social) => social.href),
        knowsAbout,
        award: profile.achievements.map((item) => item.title),
        alumniOf: profile.education.map((item) => ({
          "@type": "EducationalOrganization",
          name: item.place,
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        author: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "CollectionPage",
        name: `${profile.name} — Portfolio`,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        hasPart: projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          creator: { "@id": personId },
          dateCreated: project.epoch,
          keywords: project.technologies.join(", "),
        })),
      },
    ],
  };
}
