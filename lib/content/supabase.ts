import "server-only";

import { createClient } from "@supabase/supabase-js";
import { staticContent } from "@/lib/content";
import type {
  Achievement,
  EducationEntry,
  Experience,
  PortfolioContent,
  Profile,
  Project,
  Skill,
  SkillGroup,
  SocialIcon,
  SocialLink,
  Stat,
  TimelineEntry,
} from "@/lib/content";

const SKILL_ICONS = new Set<Skill["icon"]>([
  "code",
  "layers",
  "wind",
  "boxes",
  "server",
  "database",
  "cloud",
  "container",
  "git",
  "terminal",
  "pen",
  "gauge",
  "globe",
  "cpu",
  "lock",
  "chart",
  "workflow",
  "sparkles",
  "test",
  "smartphone",
]);

const MOTIFS = new Set<Project["artwork"]["motif"]>(["chart", "camera", "ledger", "waveform", "map"]);
const SOCIAL_ICONS = new Set<SocialIcon>(["github", "linkedin", "dribbble", "x"]);

type Row = Record<string, unknown>;

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function textArray(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) return fallback;
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function list(value: unknown): Row[] {
  return Array.isArray(value) ? value.filter((item): item is Row => typeof item === "object" && item !== null) : [];
}

function number(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function mapStats(value: unknown, fallback: Stat[]): Stat[] {
  const items = list(value)
    .map((item) => ({ label: text(item.label, ""), value: text(item.value, "") }))
    .filter((item) => item.label && item.value);
  return Array.isArray(value) ? items : fallback;
}

function mapEducation(value: unknown, fallback: EducationEntry[]): EducationEntry[] {
  const items = list(value)
    .map((item) => ({
      period: text(item.period, ""),
      title: text(item.title, ""),
      place: text(item.place, ""),
      detail: text(item.detail, ""),
    }))
    .filter((item) => item.title);
  return Array.isArray(value) ? items : fallback;
}

function mapAchievements(value: unknown, fallback: Achievement[]): Achievement[] {
  const items = list(value)
    .map((item) => ({
      year: text(item.year, ""),
      title: text(item.title, ""),
      detail: text(item.detail, ""),
    }))
    .filter((item) => item.title);
  return Array.isArray(value) ? items : fallback;
}

function mapTimeline(value: unknown, fallback: TimelineEntry[]): TimelineEntry[] {
  const items = list(value)
    .map((item) => ({
      year: text(item.year, ""),
      title: text(item.title, ""),
      detail: text(item.detail, ""),
    }))
    .filter((item) => item.title);
  return Array.isArray(value) ? items : fallback;
}

function mapSocials(value: unknown, fallback: SocialLink[]): SocialLink[] {
  const items = list(value)
    .map((item) => {
      const icon = text(item.icon, "github") as SocialIcon;
      return {
        label: text(item.label, ""),
        handle: text(item.handle, ""),
        href: text(item.href, ""),
        icon: SOCIAL_ICONS.has(icon) ? icon : ("github" as SocialIcon),
      };
    })
    .filter((item) => item.label && item.href);
  return Array.isArray(value) ? items : fallback;
}

function mapProfile(row: Row | undefined): Profile | null {
  if (!row) return null;
  const fallback = staticContent.profile;
  return {
    name: text(row.name, fallback.name),
    firstName: text(row.first_name, fallback.firstName),
    role: text(row.role, fallback.role),
    location: text(row.location, fallback.location),
    timezone: text(row.timezone, fallback.timezone),
    email: text(row.email, fallback.email),
    availability: text(row.availability, fallback.availability),
    tagline: text(row.tagline, fallback.tagline),
    intro: text(row.intro, fallback.intro),
    longStory: textArray(row.long_story, fallback.longStory),
    stats: mapStats(row.stats, fallback.stats),
    education: mapEducation(row.education, fallback.education),
    achievements: mapAchievements(row.achievements, fallback.achievements),
    timeline: mapTimeline(row.timeline, fallback.timeline),
    facts: textArray(row.facts, fallback.facts),
    socials: mapSocials(row.socials, fallback.socials),
  };
}

function mapSkillGroups(groupRows: Row[], skillRows: Row[]): SkillGroup[] {
  const groups = groupRows
    .map((row) => ({
      id: text(row.id, ""),
      label: text(row.label, ""),
      blurb: text(row.blurb, ""),
      accent: text(row.accent, "#2f7f74"),
      sortOrder: number(row.sort_order, 0),
    }))
    .filter((group) => group.id && group.label)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const mapped: SkillGroup[] = groups.map((group) => {
    const skills = skillRows
      .filter((row) => text(row.group_id, "") === group.id)
      .sort((a, b) => number(a.sort_order, 0) - number(b.sort_order, 0))
      .map<Skill>((row) => {
        const icon = text(row.icon, "code") as Skill["icon"];
        return {
          name: text(row.name, "Skill"),
          icon: SKILL_ICONS.has(icon) ? icon : "code",
          level: Math.min(100, Math.max(0, number(row.level, 70))),
          years: Math.max(0, number(row.years, 1)),
          description: text(row.description, ""),
        };
      });

    return {
      id: group.id as SkillGroup["id"],
      label: group.label,
      blurb: group.blurb,
      accent: group.accent,
      skills,
    };
  });

  return mapped;
}

function mapExperience(rows: Row[]): Experience[] {
  const items = rows
    .map((row) => ({
      company: text(row.company, ""),
      role: text(row.role, ""),
      period: text(row.period, ""),
      location: text(row.location, ""),
      summary: text(row.summary, ""),
      highlights: textArray(row.highlights),
      technologies: textArray(row.technologies),
      sortOrder: number(row.sort_order, 0),
    }))
    .filter((item) => item.company && item.role)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return items;
}

function mapProjects(rows: Row[]): Project[] {
  const items = rows
    .filter((row) => row.published !== false)
    .map((row) => {
      const artwork = (row.artwork ?? {}) as Row;
      const motif = text(artwork.motif, "chart") as Project["artwork"]["motif"];
      const links = (row.links ?? {}) as Row;
      return {
        id: text(row.id, ""),
        title: text(row.title, ""),
        kicker: text(row.kicker, ""),
        epoch: text(row.epoch, ""),
        summary: text(row.summary, ""),
        description: textArray(row.description),
        role: text(row.role, ""),
        timeline: text(row.timeline, ""),
        team: text(row.team, ""),
        status: text(row.status, ""),
        metrics: list(row.metrics)
          .map((metric) => ({ label: text(metric.label, ""), value: text(metric.value, "") }))
          .filter((metric) => metric.label && metric.value),
        technologies: textArray(row.technologies),
        architecture: textArray(row.architecture),
        challenges: list(row.challenges)
          .map((challenge) => ({
            title: text(challenge.title, ""),
            solution: text(challenge.solution, ""),
          }))
          .filter((challenge) => challenge.title),
        features: textArray(row.features),
        responsibilities: textArray(row.responsibilities),
        gallery: list(row.gallery).map((image, index) => ({
          caption: text(image.caption, ""),
          variant: number(image.variant, index),
        })),
        links: {
          live: typeof links.live === "string" ? links.live : undefined,
          github: typeof links.github === "string" ? links.github : undefined,
          video: typeof links.video === "string" ? links.video : undefined,
        },
        artwork: {
          from: text(artwork.from, "#082c36"),
          to: text(artwork.to, "#14545a"),
          accent: text(artwork.accent, "#e7b566"),
          motif: MOTIFS.has(motif) ? motif : "chart",
        },
        sortOrder: number(row.sort_order, 0),
      };
    })
    .filter((project) => project.id && project.title)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return items;
}

/**
 * Reads the whole portfolio from Supabase. Returns `null` when credentials are
 * missing so the caller can fall back to bundled content.
 */
export async function fetchSupabaseContent(): Promise<PortfolioContent | null> {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const [profileResult, groupsResult, skillsResult, experienceResult, projectsResult] =
    await Promise.all([
      client.from("site_profile").select("*").limit(1).maybeSingle(),
      client.from("skill_groups").select("*"),
      client.from("skills").select("*"),
      client.from("experience").select("*"),
      client.from("projects").select("*"),
    ]);

  const failure =
    profileResult.error ?? groupsResult.error ?? skillsResult.error ?? experienceResult.error ?? projectsResult.error;
  if (failure) throw new Error(`Supabase read failed: ${failure.message}`);

  return {
    profile: mapProfile(profileResult.data as Row | null ?? undefined) ?? staticContent.profile,
    skillGroups: mapSkillGroups(groupsResult.data ?? [], skillsResult.data ?? []),
    experience: mapExperience(experienceResult.data ?? []),
    projects: mapProjects(projectsResult.data ?? []),
  };
}
