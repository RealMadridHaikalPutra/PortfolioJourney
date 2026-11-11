"use client";

import { Briefcase, MapPin, Sparkles } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import { PaperHeading, PaperNote, Tag } from "@/components/ui/ParchmentBits";

export function ExperiencePanel() {
  const { experience } = useContent();
  return (
    <div className="pb-8">
      <p className="max-w-2xl text-[15px] leading-relaxed text-ink sm:text-base">
        Ten years of shipping, condensed to four ports. Each card is a role, the
        problems worth remembering, and the stack that carried it.
      </p>

      <ol className="relative mt-7 space-y-5 border-l border-ink/20 pl-5 sm:pl-7">
        {experience.map((job, index) => (
          <li
            key={job.company}
            className="rise-in relative"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span
              aria-hidden="true"
              className="absolute -left-[1.68rem] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-brass/60 bg-parchment shadow-sm sm:-left-[2.18rem]"
            >
              <span className="h-1.5 w-1.5 rotate-45 bg-ember/80" />
            </span>

            <article className="rounded-[3px] border border-ink/15 bg-parchment/35 p-4 shadow-[0_10px_22px_-20px_rgba(50,30,8,0.7)] sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="font-hand text-lg leading-none text-ember">{job.period}</p>
                  <h4 className="mt-1 font-display text-[1.3rem] leading-tight text-ink">
                    {job.role}
                  </h4>
                  <p className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted">
                    <Briefcase aria-hidden="true" className="h-3.5 w-3.5" />
                    {job.company}
                  </p>
                </div>
                <p className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {job.location}
                </p>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink">{job.summary}</p>

              <ul className="mt-3 space-y-1.5">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                    <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-brass" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.technologies.map((technology) => (
                  <Tag key={technology}>{technology}</Tag>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-7 flex items-start gap-3">
        <PaperHeading icon={Sparkles} className="sr-only">
          A note
        </PaperHeading>
        <PaperNote>
          The full, unedited career history lives in the résumé. These are the parts
          I would tell you about over coffee.
        </PaperNote>
      </div>
    </div>
  );
}
