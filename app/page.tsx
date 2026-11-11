import { Suspense } from "react";
import { Anchor } from "lucide-react";
import { connection } from "next/server";
import { GameStage } from "@/components/game/GameStage";
import { getPortfolioContent } from "@/lib/content/server";
import { structuredData } from "@/lib/seo";

export default function HomePage() {
  return (
    <main id="main-content" className="relative h-dvh w-full overflow-hidden">
      <Suspense fallback={<PortfolioLoading />}>
        <PortfolioExperience />
      </Suspense>
    </main>
  );
}

/**
 * `connection()` keeps the content out of the static shell so edits made in
 * Supabase are picked up by the next request instead of the next build.
 */
async function PortfolioExperience() {
  await connection();
  const content = await getPortfolioContent();
  const { profile, skillGroups, projects } = content;
  const jsonLd = JSON.stringify(structuredData(content)).replace(/</g, "\\u003c");

  return (
    <>
      <h1 className="sr-only">
        {profile.name} — {profile.role} · Island Journey interactive portfolio
      </h1>
      <GameStage content={content} />

      <noscript>
        <div className="paper absolute inset-0 z-[100] overflow-y-auto p-6 text-ink">
          <div className="mx-auto max-w-2xl">
            <p className="font-hand text-2xl text-ember">A note from the harbourmaster</p>
            <h2 className="mt-1 font-display text-4xl">
              This portfolio is a little sailing game.
            </h2>
            <p className="mt-3 text-lg">
              JavaScript is switched off, so the boat is still tied to the dock. Here is the
              logbook in plain text instead.
            </p>
            <p className="mt-3 text-lg">
              {profile.intro} Based in {profile.location}. Reach me at{" "}
              <a className="underline decoration-brass underline-offset-4" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              .
            </p>

            <h3 className="mt-8 font-display text-2xl">Sections</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Home — lighthouse: introduction and résumé.</li>
              <li>About — cottage: story, education, achievements, timeline.</li>
              <li>Skills — library: {skillGroups.map((group) => group.label).join(", ")}.</li>
              <li>Experience — castle: roles and the stack behind them.</li>
              <li>Portfolio — treasure cave: {projects.map((project) => project.title).join(", ")}.</li>
              <li>Contact — harbour: email, socials, and CV.</li>
            </ul>

            <h3 className="mt-8 font-display text-2xl">Elsewhere</h3>
            <ul className="mt-2 space-y-1">
              {profile.socials.map((social) => (
                <li key={social.href}>
                  <a className="underline decoration-brass underline-offset-4" href={social.href}>
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="underline decoration-brass underline-offset-4" href="/resume.pdf">
                  Download résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </noscript>

      <script
        type="application/ld+json"
        // JSON-LD is generated from loaded content only; `<` is escaped above.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </>
  );
}

function PortfolioLoading() {
  return (
    <div className="sea-backdrop relative flex h-dvh w-full items-center justify-center overflow-hidden">
      <div aria-hidden="true" className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.16]" />
      <div className="relative mx-5 max-w-sm rounded-[3px] border border-[#c9a86a]/35 bg-[#0b3037]/80 px-6 py-5 text-center shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a86a]/40">
          <Anchor className="h-4 w-4 animate-pulse text-[#e7d0a0] motion-reduce:animate-none" strokeWidth={1.6} />
        </span>
        <p className="mt-3 font-display text-sm uppercase tracking-[0.18em] text-[#f3e3bc]">
          Island Journey
        </p>
        <p className="mt-1 font-hand text-lg leading-snug text-foam/70">
          Charting the waters…
        </p>
      </div>
    </div>
  );
}
