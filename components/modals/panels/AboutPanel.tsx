  "use client";

  import {
    BookOpen,
    Compass,
    GraduationCap,
    Medal,
    Sailboat,
    Sparkles,
  } from "lucide-react";
  import { useContent } from "@/components/content/ContentProvider";
  import {
    PaperHeading,
    PaperNote,
    RopeDivider,
    Stat,
    Tag,
  } from "@/components/ui/ParchmentBits";

  export function AboutPanel() {
    const { profile } = useContent();
    return (
      <div className="space-y-8 pb-8">
        <section aria-labelledby="story-heading">
          <PaperHeading id="story-heading" icon={Compass}>
            Perjalanan Saya
          </PaperHeading>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink sm:text-base">
            {profile.longStory.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-y border-ink/12 py-4 sm:grid-cols-4">
            {profile.stats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </section>

        <RopeDivider />

        <section aria-labelledby="timeline-heading">
          <PaperHeading id="timeline-heading" icon={Sailboat}>
            Perjalanan Karier
          </PaperHeading>
          <ol className="relative mt-5 space-y-5 border-l border-ink/20 pl-6">
            {profile.timeline.map((entry, index) => (
              <li key={entry.year} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[1.93rem] top-1 flex h-3 w-3 items-center justify-center rounded-full border ${
                    index === profile.timeline.length - 1
                      ? "border-ember bg-ember"
                      : "border-brass/70 bg-parchment"
                  }`}
                />
                <p className="font-hand text-xl leading-none text-ember">{entry.year}</p>
                <h4 className="mt-0.5 font-display text-lg leading-tight text-ink">
                  {entry.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <RopeDivider />

        <div className="grid gap-7 sm:grid-cols-2">
          <section aria-labelledby="education-heading">
            <PaperHeading id="education-heading" icon={GraduationCap}>
              Pendidikan
            </PaperHeading>
            <ul className="mt-3 space-y-4">
              {profile.education.map((item) => (
                <li key={item.title} className="border-l-2 border-brass/45 pl-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    {item.period}
                  </p>
                  <h4 className="font-display text-lg leading-tight">{item.title}</h4>
                  <p className="text-sm font-medium text-ink-muted">{item.place}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="achievements-heading">
            <PaperHeading id="achievements-heading" icon={Medal}>
              Pencapaian
            </PaperHeading>
            <ul className="mt-3 space-y-3">
              {profile.achievements.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 font-hand text-lg leading-none text-brass">
                    {item.year}
                  </span>
                  <div>
                    <h4 className="font-display text-base leading-tight">{item.title}</h4>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <RopeDivider />

        <section aria-labelledby="facts-heading">
          <PaperHeading id="facts-heading" icon={Sparkles}>
            Sedikit Tentang Saya
          </PaperHeading>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {profile.facts.map((fact) => (
              <p
                key={fact}
                className="border-l-2 border-brass/40 pl-3 font-hand text-xl leading-snug text-ink-muted"
              >
                {fact}
              </p>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-2 pt-1">
          <Tag>Web Development</Tag>
        <Tag>Frontend Development</Tag>
        <Tag>Backend Development</Tag>
        <Tag>Full Stack Development</Tag>
        <Tag>Enterprise System</Tag>
        <Tag>API Integration</Tag>
        <Tag>Artificial Intelligence</Tag>
        </div>

        <PaperNote>
          <BookOpen aria-hidden="true" className="mr-2 inline h-4 w-4 text-brass" />
           Perjalanan saya sebagai Software Engineer masih terus berlanjut. Saya selalu
  terbuka untuk mempelajari teknologi baru, membangun solusi yang lebih baik,
  dan berkontribusi pada proyek yang memberikan dampak nyata.
        </PaperNote>
      </div>
    );
  }
