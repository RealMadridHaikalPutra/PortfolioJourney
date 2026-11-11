"use client";

import Image from "next/image";
import { Anchor, ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import { useGameStore } from "@/store/useGameStore";
import {
  ActionLink,
  Kicker,
  PaperHeading,
  PaperNote,
  RopeDivider,
  Stat,
  Tag,
} from "@/components/ui/ParchmentBits";

export function HomePanel() {
  const { profile } = useContent();
  const yearsShipping = profile.stats.find((stat) => stat.label === "Years shipping")?.value;
  const closeModal = useGameStore((state) => state.closeModal);

  return (
    <div className="pb-6">
      <div className="grid gap-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] sm:gap-8">
        <div className="mx-auto w-full max-w-[280px] sm:max-w-none">
          <div className="relative mx-auto aspect-square w-full max-w-[270px]">
            <div className="absolute inset-0 rounded-full border border-[#7a5426]/40 p-2">
              <div className="relative h-full w-full overflow-hidden rounded-full border border-[#7a5426]/40 shadow-[0_16px_30px_-18px_rgba(50,30,8,0.8)]">
                <Image
                  src="/portrait.png"
                  alt={`Illustrated portrait of ${profile.name}`}
                  width={560}
                  height={560}
                  sizes="(max-width: 640px) 70vw, 270px"
                  className="h-full w-full object-cover"
                  priority={false}
                />
              </div>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-ink/20 bg-parchment px-3 py-1 font-hand text-lg leading-none text-ember shadow-sm">
              your skipper
            </span>
          </div>

          <div className="mt-7 text-center sm:text-left">
            <p className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <MapPin aria-hidden="true" className="h-4 w-4 text-brass" />
              {profile.location}
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-moss" aria-hidden="true" />
              {profile.availability}
            </p>
          </div>
        </div>

        <div>
          <Kicker>Hello, traveller</Kicker>
          <h3 className="mt-1 font-display text-3xl leading-[1.05] text-ink sm:text-[2.6rem]">
            I&apos;m {profile.name}.
            <span className="block text-ink-muted">I build small worlds.</span>
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-ink sm:text-base">
            {profile.intro}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Tag>{profile.role}</Tag>
            {yearsShipping ? <Tag>{yearsShipping} years</Tag> : null}
            <Tag>{profile.location} · {profile.timezone}</Tag>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ActionLink href="/resume.pdf" download icon={Download}>
              Download résumé
            </ActionLink>
            <button
              type="button"
              onClick={closeModal}
              className="ghost-button inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-ink/30 bg-parchment/50 px-4 py-2 text-sm font-semibold text-ink hover:border-ink/50 hover:bg-parchment-aged/70"
            >
              <Anchor aria-hidden="true" className="h-4 w-4 text-brass" />
              Back to the boat
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 border-y border-ink/12 py-4">
            {profile.stats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div className="mt-5">
            <PaperHeading icon={Sparkles} className="text-lg sm:text-xl">
              Chart a course
            </PaperHeading>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Six islands, one logbook each. The lighthouse is home; the treasure cave
              holds the work. Sail close and the map opens itself.
            </p>
          </div>
        </div>
      </div>

      <RopeDivider className="mt-8" />

      <PopoverNote />
    </div>
  );
}

function PopoverNote() {
  const { profile } = useContent();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <PaperNote>
        &ldquo;{profile.tagline}&rdquo; That is the whole job description, really.
      </PaperNote>
      <p className="text-xs leading-relaxed text-ink-muted">
        Tip: every island is a section of this portfolio. If you would rather read
        than sail, open the chart from the top-right of the screen.
      </p>
    </div>
  );
}
