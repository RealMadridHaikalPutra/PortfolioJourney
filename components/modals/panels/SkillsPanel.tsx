"use client";

import {
  Boxes,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Globe2,
  Layers3,
  LockKeyhole,
  PenTool,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  TestTube2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import type { SkillIcon } from "@/lib/content/skills";
import { PaperHeading, PaperNote, RopeDivider, Tag } from "@/components/ui/ParchmentBits";

const ICONS: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  layers: Layers3,
  wind: Globe2,
  boxes: Boxes,
  server: Server,
  database: Database,
  cloud: Cloud,
  container: Container,
  git: GitBranch,
  terminal: Terminal,
  pen: PenTool,
  gauge: Gauge,
  globe: Globe2,
  cpu: Cpu,
  lock: LockKeyhole,
  chart: ChartNoAxesCombined,
  workflow: Workflow,
  sparkles: Sparkles,
  test: TestTube2,
  smartphone: Smartphone,
};

function fluency(level: number): string {
if(level>=92) return "Sangat Mahir";
if(level>=84) return "Mahir";
if(level>=70) return "Menengah";
return "Dasar";
}

export function SkillsPanel() {
  const { skillGroups } = useContent();
  return (
    <div className="pb-8">
      <p className="max-w-2xl text-[15px] leading-relaxed text-ink sm:text-base">
        Seluruh teknologi berikut merupakan bagian dari perjalanan saya sebagai
        Software Engineer. Saya menggunakannya dalam proyek akademik, pengalaman
        profesional, maupun pengembangan produk pribadi.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Tag>Web Development</Tag>
        <Tag>Frontend Development</Tag>
        <Tag>Backend Development</Tag>
        <Tag>Full Stack Development</Tag>
        <Tag>Enterprise System</Tag>
        <Tag>API Integration</Tag>
        <Tag>Artificial Intelligence</Tag>
      </div>

      <div className="mt-7 space-y-8">
        {skillGroups.map((group, groupIndex) => (
          <section key={group.id} aria-labelledby={`skill-${group.id}`}>
            {groupIndex > 0 ? <RopeDivider className="mb-7" /> : null}
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <PaperHeading id={`skill-${group.id}`}>{group.label}</PaperHeading>
                <p className="mt-1 text-sm text-ink-muted">{group.blurb}</p>
              </div>
              <span className="font-hand text-lg text-ink-muted/80">
                {group.skills.length} Keahlian
              </span>
            </div>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.skills.map((skill) => {
                const Icon = ICONS[skill.icon];
                return (
                  <li
                    key={skill.name}
                    className="rounded-[3px] border border-ink/12 bg-parchment/35 p-3.5 shadow-[inset_0_0_18px_rgba(120,85,38,0.06)]"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-parchment-aged/45"
                        style={{ color: group.accent }}
                      >
                        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                          <h4 className="font-display text-[1.05rem] leading-tight text-ink">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                            {skill.years} Tahun
                          </span>
                        </div>
                        <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                          {skill.description}
                        </p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <div
                            className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10"
                            role="progressbar"
                            aria-label={`Tingkat kemampuan ${skill.name}`}
                            aria-valuenow={skill.level}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuetext={`${fluency(skill.level)}, ${skill.years} Tahun Pengalaman`}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: group.accent,
                                opacity: 0.82,
                              }}
                            />
                          </div>
                          <span className="w-[82px] text-right text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                            {fluency(skill.level)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8">
        <PaperNote>
  Tingkat kemampuan di bawah merupakan penilaian berdasarkan pengalaman saya
  dalam mengembangkan proyek nyata, baik untuk kebutuhan akademik, profesional,
  maupun pengembangan produk pribadi.
</PaperNote>
      </div>
    </div>
  );
}
