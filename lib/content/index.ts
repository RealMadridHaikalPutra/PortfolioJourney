import { profile, type Profile } from "./profile";
import { skillGroups, type SkillGroup } from "./skills";
import { experience, type Experience } from "./experience";
import { projects, projectById, getProject, type Project, type ProjectId } from "./projects";

export { profile, skillGroups, experience, projects, projectById, getProject };
export type {
  Profile,
  SkillGroup,
  Experience,
  Project,
  ProjectId,
};
export type {
  TimelineEntry,
  EducationEntry,
  Achievement,
  Stat,
  SocialIcon,
  SocialLink,
} from "./profile";
export type { Skill, SkillGroupId, SkillIcon } from "./skills";
export type { ProjectChallenge, ProjectMetric } from "./projects";

/** Everything the portfolio renders, however it was loaded. */
export interface PortfolioContent {
  profile: Profile;
  skillGroups: SkillGroup[];
  experience: Experience[];
  projects: Project[];
}

/**
 * Bundled content. Used when Supabase credentials are absent and as the seed
 * source for `supabase/seed.sql`, so the site always works out of the box.
 */
export const staticContent: PortfolioContent = {
  profile,
  skillGroups,
  experience,
  projects,
};
