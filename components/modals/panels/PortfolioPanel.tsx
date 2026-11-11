"use client";

import { ArrowUpRight, Compass, X } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import { useGameStore } from "@/store/useGameStore";
import { audioManager } from "@/game/audio/AudioManager";
import { ProjectArtwork } from "@/components/ui/ProjectArtwork";
import { PaperNote, Tag } from "@/components/ui/ParchmentBits";

export function PortfolioPanel() {
  const { projects } = useContent();
  const openProject = useGameStore((state) => state.openProject);

  return (
    <div className="pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink sm:text-base">
            Five treasure maps, five finished voyages. Lift one to read the full chart:
            the brief, the architecture, the storms, and what shipped.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tag>Realtime</Tag>
            <Tag>Creative tooling</Tag>
            <Tag>Fintech</Tag>
            <Tag>Audio ML</Tag>
            <Tag>Collaboration</Tag>
          </div>
        </div>
        <p className="shrink-0 font-hand text-xl text-ink-muted/80">
          pick a map to unfold
        </p>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.id} className={index === 0 ? "sm:col-span-2" : ""}>
            <button
              type="button"
              onClick={() => {
                audioManager.play("paper");
                openProject(project.id);
              }}
              onMouseEnter={() => audioManager.play("hover")}
              className={`map-card group block w-full overflow-hidden rounded-[3px] border border-ink/25 bg-[#efdfb7] text-left ${
                index === 0 ? "sm:flex sm:items-stretch" : ""
              }`}
              aria-label={`Open the project chart for ${project.title}`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-[16/8] sm:aspect-auto sm:w-1/2" : "aspect-[16/8]"
                }`}
              >
                <ProjectArtwork
                  project={project}
                  variant={index % 3}
                  className="h-full w-full"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[2px] border border-[#f1e0b7]/25 bg-[#0b3037]/80 px-2 py-1 font-hand text-sm leading-none text-[#f3e3bc]">
                  <Compass aria-hidden="true" className="h-3 w-3" />
                  chart {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`relative p-4 ${index === 0 ? "sm:flex sm:flex-1 sm:flex-col sm:justify-center sm:p-6" : ""}`}>
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {project.epoch} · {project.kicker}
                </p>
                <h3 className="mt-1 font-display text-[1.35rem] leading-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                  {project.summary}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {project.technologies.slice(0, 3).map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-ember">
                    unfold
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 bottom-2 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent"
                />
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PaperNote>
          <X aria-hidden="true" className="mr-2 inline h-4 w-4 text-brass" />
          Nothing here is a mockup. Every chart links to something that ran in the
          wild.
        </PaperNote>
        <p className="shrink-0 font-hand text-xl text-ember">— five of many</p>
      </div>
    </div>
  );
}
