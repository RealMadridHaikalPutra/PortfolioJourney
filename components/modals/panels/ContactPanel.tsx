"use client";

import {
  ArrowRight,
  AtSign,
  Briefcase,
  Download,
  GitBranch,
  Globe2,
  Mail,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import type { SocialIcon } from "@/lib/content";
import { audioManager } from "@/game/audio/AudioManager";
import {
  ActionLink,
  PaperHeading,
  PaperNote,
  RopeDivider,
  Tag,
} from "@/components/ui/ParchmentBits";

interface ContactRow {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  download?: boolean;
}

const SOCIAL_ICONS: Record<SocialIcon, LucideIcon> = {
  github: GitBranch,
  linkedin: Briefcase,
  dribbble: Globe2,
  x: AtSign,
};

export function ContactPanel() {
  const { profile } = useContent();
  const rows: ContactRow[] = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    ...profile.socials.map((social) => ({
      label: social.label,
      value: social.handle,
      href: social.href,
      icon: SOCIAL_ICONS[social.icon],
      external: true,
    })),
    {
      label: "Résumé",
      value: "PDF · one page",
      href: "/resume.pdf",
      icon: Download,
      download: true,
    },
  ];

  return (
    <div className="pb-8">
      <p className="max-w-2xl text-[15px] leading-relaxed text-ink sm:text-base">
        Pelabuhan ini selalu terbuka.
        Jika Anda memiliki ide, proyek, peluang kerja, atau sekadar ingin berdiskusi tentang teknologi, saya akan dengan senang hati mendengarkan. Mari berlayar bersama untuk membangun sesuatu yang bermanfaat.
      </p>

      <div className="mt-6 rounded-[3px] border border-ink/15 bg-parchment/35 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              Hubungi Saya
            </p>
            <a
              href={`mailto:${profile.email}`}
              onMouseEnter={() => audioManager.play("hover")}
              onClick={() => audioManager.play("click")}
              className="mt-1 inline-flex items-baseline gap-2 font-display text-2xl leading-tight text-ink underline decoration-brass/50 decoration-1 underline-offset-4 transition-colors hover:text-ember sm:text-3xl"
            >
              {profile.email}
              <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-brass" />
            </a>
          </div>
          <p className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
            <MapPin aria-hidden="true" className="h-4 w-4 text-brass" />
            {profile.location} · {profile.timezone}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-moss/35 bg-moss/10 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-moss">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden="true" />
            {profile.availability}
          </span>
          <Tag>Respon dalam 1-2 hari kerja</Tag>
          <Tag>Remote or Jakarta</Tag>
        </div>
      </div>

      <div className="mt-7">
        <PaperHeading icon={Mail}>Cara Menghubungi Saya</PaperHeading>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <li key={row.label}>
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noreferrer noopener" : undefined}
                  download={row.download || undefined}
                  onMouseEnter={() => audioManager.play("hover")}
                  onClick={() => audioManager.play("click")}
                  className="group flex min-h-12 items-center gap-3 rounded-[3px] border border-ink/12 bg-parchment/30 px-3 py-2.5 transition-all duration-200 hover:translate-x-1 hover:border-ink/25 hover:bg-parchment-aged/45"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-parchment-aged/40 text-ink-muted transition-colors group-hover:text-ember">
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                      {row.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-ink">
                      {row.value}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-ink-muted/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ember"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <RopeDivider className="my-7" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PaperNote>
          Terima kasih telah mengunjungi portfolio saya.
          Semoga perjalanan singkat ini dapat memberikan gambaran mengenai pengalaman, proyek, dan semangat saya dalam membangun perangkat lunak.
        </PaperNote>
        <ActionLink href="/resume.pdf" download icon={Download} className="shrink-0">
          Download Resume
        </ActionLink>
      </div>
    </div>
  );
}
