/**
 * Generates supabase/seed.sql from the bundled content in lib/content.
 *
 * Run with: npm run supabase:seed
 * (Uses Node's TypeScript type stripping, so no build step is required.)
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const load = async (relative) =>
  import(pathToFileURL(path.join(root, relative)).href);

const { profile } = await load("lib/content/profile.ts");
const { skillGroups } = await load("lib/content/skills.ts");
const { experience } = await load("lib/content/experience.ts");
const { projects } = await load("lib/content/projects.ts");

const quote = (value) => `'${String(value ?? "").replace(/'/g, "''")}'`;
const nullable = (value) => (value === undefined || value === null ? "null" : quote(value));
const textArray = (values) =>
  Array.isArray(values) && values.length > 0
    ? `array[${values.map(quote).join(", ")}]`
    : "array[]::text[]";
const json = (value) => `${quote(JSON.stringify(value ?? []))}::jsonb`;
const slugify = (value) =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const lines = [];
lines.push("-- Island Journey · generated seed data");
lines.push("-- Regenerate with `npm run supabase:seed` after editing lib/content.");
lines.push("-- Safe to run repeatedly: every insert upserts on its primary key.");
lines.push("");

lines.push("insert into public.site_profile (");
lines.push("  id, name, first_name, role, location, timezone, email, availability, tagline, intro,");
lines.push("  long_story, stats, education, achievements, timeline, facts, socials");
lines.push(") values (");
lines.push("  'main',");
lines.push(`  ${quote(profile.name)},`);
lines.push(`  ${quote(profile.firstName)},`);
lines.push(`  ${quote(profile.role)},`);
lines.push(`  ${quote(profile.location)},`);
lines.push(`  ${quote(profile.timezone)},`);
lines.push(`  ${quote(profile.email)},`);
lines.push(`  ${quote(profile.availability)},`);
lines.push(`  ${quote(profile.tagline)},`);
lines.push(`  ${quote(profile.intro)},`);
lines.push(`  ${textArray(profile.longStory)},`);
lines.push(`  ${json(profile.stats)},`);
lines.push(`  ${json(profile.education)},`);
lines.push(`  ${json(profile.achievements)},`);
lines.push(`  ${json(profile.timeline)},`);
lines.push(`  ${textArray(profile.facts)},`);
lines.push(`  ${json(profile.socials)}`);
lines.push(") on conflict (id) do update set");
lines.push("  name = excluded.name,");
lines.push("  first_name = excluded.first_name,");
lines.push("  role = excluded.role,");
lines.push("  location = excluded.location,");
lines.push("  timezone = excluded.timezone,");
lines.push("  email = excluded.email,");
lines.push("  availability = excluded.availability,");
lines.push("  tagline = excluded.tagline,");
lines.push("  intro = excluded.intro,");
lines.push("  long_story = excluded.long_story,");
lines.push("  stats = excluded.stats,");
lines.push("  education = excluded.education,");
lines.push("  achievements = excluded.achievements,");
lines.push("  timeline = excluded.timeline,");
lines.push("  facts = excluded.facts,");
lines.push("  socials = excluded.socials;");
lines.push("");

skillGroups.forEach((group, groupIndex) => {
  lines.push("insert into public.skill_groups (id, label, blurb, accent, sort_order) values (");
  lines.push(`  ${quote(group.id)}, ${quote(group.label)}, ${quote(group.blurb)}, ${quote(group.accent)}, ${groupIndex}`);
  lines.push(") on conflict (id) do update set");
  lines.push("  label = excluded.label, blurb = excluded.blurb, accent = excluded.accent, sort_order = excluded.sort_order;");
  lines.push("");

  group.skills.forEach((skill, skillIndex) => {
    lines.push(
      "insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (",
    );
    lines.push(
      `  ${quote(`${group.id}-${slugify(skill.name)}`)}, ${quote(group.id)}, ${quote(skill.name)}, ${quote(skill.icon)}, ${skill.level}, ${skill.years}, ${quote(skill.description)}, ${skillIndex}`,
    );
    lines.push(") on conflict (id) do update set");
    lines.push(
      "  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;",
    );
    lines.push("");
  });
});

experience.forEach((job, index) => {
  lines.push("insert into public.experience (");
  lines.push("  id, company, role, period, location, summary, highlights, technologies, sort_order");
  lines.push(") values (");
  lines.push(`  ${quote(`${slugify(job.company)}-${slugify(job.role)}`)},`);
  lines.push(`  ${quote(job.company)}, ${quote(job.role)}, ${quote(job.period)}, ${quote(job.location)},`);
  lines.push(`  ${quote(job.summary)},`);
  lines.push(`  ${textArray(job.highlights)},`);
  lines.push(`  ${textArray(job.technologies)},`);
  lines.push(`  ${index}`);
  lines.push(") on conflict (id) do update set");
  lines.push("  company = excluded.company, role = excluded.role, period = excluded.period,");
  lines.push("  location = excluded.location, summary = excluded.summary,");
  lines.push("  highlights = excluded.highlights, technologies = excluded.technologies, sort_order = excluded.sort_order;");
  lines.push("");
});

projects.forEach((project, index) => {
  lines.push("insert into public.projects (");
  lines.push("  id, title, kicker, epoch, summary, description, role, timeline, team, status,");
  lines.push("  metrics, technologies, architecture, challenges, features, responsibilities,");
  lines.push("  gallery, links, artwork, sort_order, published");
  lines.push(") values (");
  lines.push(`  ${quote(project.id)}, ${quote(project.title)}, ${quote(project.kicker)}, ${quote(project.epoch)},`);
  lines.push(`  ${quote(project.summary)},`);
  lines.push(`  ${textArray(project.description)},`);
  lines.push(`  ${quote(project.role)}, ${quote(project.timeline)}, ${quote(project.team)}, ${quote(project.status)},`);
  lines.push(`  ${json(project.metrics)},`);
  lines.push(`  ${textArray(project.technologies)},`);
  lines.push(`  ${textArray(project.architecture)},`);
  lines.push(`  ${json(project.challenges)},`);
  lines.push(`  ${textArray(project.features)},`);
  lines.push(`  ${textArray(project.responsibilities)},`);
  lines.push(`  ${json(project.gallery)},`);
  lines.push(`  ${json(project.links)},`);
  lines.push(`  ${json(project.artwork)},`);
  lines.push(`  ${index}, true`);
  lines.push(") on conflict (id) do update set");
  lines.push("  title = excluded.title, kicker = excluded.kicker, epoch = excluded.epoch,");
  lines.push("  summary = excluded.summary, description = excluded.description, role = excluded.role,");
  lines.push("  timeline = excluded.timeline, team = excluded.team, status = excluded.status,");
  lines.push("  metrics = excluded.metrics, technologies = excluded.technologies,");
  lines.push("  architecture = excluded.architecture, challenges = excluded.challenges,");
  lines.push("  features = excluded.features, responsibilities = excluded.responsibilities,");
  lines.push("  gallery = excluded.gallery, links = excluded.links, artwork = excluded.artwork,");
  lines.push("  sort_order = excluded.sort_order, published = excluded.published;");
  lines.push("");
});

await writeFile(path.join(root, "supabase", "seed.sql"), `${lines.join("\n")}\n`, "utf8");
console.log(
  `Generated supabase/seed.sql (${projects.length} projects, ${skillGroups.length} skill groups, ${experience.length} roles)`,
);
