"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  GitBranch,
  Layers3,
  Play,
  Sparkles,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import type { Project } from "@/lib/content/projects";
import { useGameStore } from "@/store/useGameStore";
import { audioManager } from "@/game/audio/AudioManager";
import { ProjectArtwork } from "@/components/ui/ProjectArtwork";
import {
  ActionLink,
  PaperHeading,
  RopeDivider,
  Stat,
  Tag,
} from "@/components/ui/ParchmentBits";

export function ProjectPanel({ project }: { project: Project }) {
  const backToPortfolio = useGameStore((state) => state.backToPortfolio);

  return (
    <div className="pb-10">
      <button
        type="button"
        onClick={() => {
          audioManager.play("paper");
          backToPortfolio();
        }}
        className="ghost-button mb-4 inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-ink/20 bg-parchment/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted hover:bg-parchment-aged/50 hover:text-ink"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Kembali ke Peta Petualangan
      </button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <p className="font-hand text-xl leading-none text-ember">
            {project.kicker} · {project.epoch}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink sm:text-base">
            {project.summary}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-ink/12 py-4 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">Peran</dt>
              <dd className="mt-0.5 font-medium text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">Periode</dt>
              <dd className="mt-0.5 font-medium text-ink">{project.timeline}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">Team</dt>
              <dd className="mt-0.5 font-medium text-ink">{project.team}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">Status</dt>
              <dd className="mt-0.5 font-medium text-ink">{project.status}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.live ? (
              <ActionLink href={project.links.live} external icon={ExternalLink}>
                Lihat Demo
              </ActionLink>
            ) : null}
            {project.links.github ? (
              <ActionLink href={project.links.github} external icon={GitBranch} variant="outline">
                Source
              </ActionLink>
            ) : null}
            {project.links.video ? (
              <ActionLink href={project.links.video} external icon={Play} variant="outline">
                Video Demo
              </ActionLink>
            ) : null}
          </div>
        </div>

        <div className="overflow-hidden rounded-[3px] border border-ink/25 shadow-[0_16px_30px_-22px_rgba(40,25,8,0.8)]">
          <ProjectArtwork project={project} variant={0} className="h-full w-full" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 rounded-[3px] border border-ink/12 bg-parchment/25 px-4 py-3">
        {project.metrics.map((metric) => (
          <Stat key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </div>

      <section className="mt-8" aria-labelledby="project-story">
        <PaperHeading id="project-story" icon={Sparkles}>
          Cerita di Balik Proyek
        </PaperHeading>
        <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-ink sm:text-base">
          {project.description.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <RopeDivider className="my-7" />

      <section aria-labelledby="project-gallery">
        <PaperHeading id="project-gallery" icon={Layers3}>
          Galeri Proyek
        </PaperHeading>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {project.gallery.map((image, index) => (
            <li
              key={image.caption}
              className="overflow-hidden rounded-[3px] border border-ink/20 bg-parchment/30 p-1.5"
            >
              <div className="overflow-hidden rounded-[2px]">
                <ProjectArtwork
                  project={project}
                  variant={index}
                  className="aspect-[4/3] w-full"
                />
              </div>
              <p className="px-1 pb-1 pt-2 text-[11px] leading-snug text-ink-muted">
                {String(index + 1).padStart(2, "0")} · {image.caption}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <RopeDivider className="my-7" />

      <div className="grid gap-7 lg:grid-cols-2">
        <section aria-labelledby="project-tech">
          <PaperHeading id="project-tech" icon={Wrench}>
            Teknologi & Arsitektur
          </PaperHeading>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => (
              <Tag key={technology}>{technology}</Tag>
            ))}
          </div>
          <ol className="mt-4 space-y-2.5">
            {project.architecture.map((item, index) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brass/40 font-hand text-xs leading-none text-ember"
                >
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="project-storms">
          <PaperHeading id="project-storms" icon={TriangleAlert}>
            Tantangan & Solusi
          </PaperHeading>
          <div className="mt-3 space-y-3">
            {project.challenges.map((challenge) => (
              <div
                key={challenge.title}
                className="rounded-[3px] border border-ink/12 bg-parchment/30 p-3"
              >
                <h4 className="font-display text-[1.02rem] leading-tight text-ink">
                  {challenge.title}
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                  {challenge.solution}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <RopeDivider className="my-7" />

      <div className="grid gap-7 lg:grid-cols-2">
        <section aria-labelledby="project-features">
          <PaperHeading id="project-features" icon={Check}>
            Fitur Utama
          </PaperHeading>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm leading-snug text-ink-muted">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-moss"
                  strokeWidth={2.2}
                />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="project-responsibilities">
          <PaperHeading id="project-responsibilities" icon={Layers3}>
            Tanggung Jawab Saya
          </PaperHeading>
          <ul className="mt-3 space-y-2">
            {project.responsibilities.map((responsibility) => (
              <li
                key={responsibility}
                className="flex gap-2 border-b border-ink/10 pb-2 text-sm leading-snug text-ink-muted last:border-0"
              >
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass"
                />
                {responsibility}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-ink/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-hand text-xl text-ink-muted">
          {project.epoch} · {project.team}
        </p>
        <button
          type="button"
          onClick={backToPortfolio}
          className="ghost-button inline-flex min-h-11 items-center gap-2 self-start rounded-[3px] border border-ink/25 bg-parchment/40 px-4 py-2 text-sm font-semibold text-ink hover:bg-parchment-aged/60"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          	Lihat Proyek Lain
        </button>
      </div>
    </div>
  );
}
