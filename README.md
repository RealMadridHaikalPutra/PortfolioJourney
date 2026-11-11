# Island Journey

An interactive portfolio built as a tiny 2D sailing game. You control a wooden
boat, cross a hand-painted ocean, and sail close to six islands. Each island is
a section of the portfolio, and entering its quiet circle opens a parchment
logbook with no page transition and no scroll.

Built with Next.js (App Router), TypeScript, PixiJS v8, GSAP, Zustand,
Tailwind CSS, Howler.js, and Lucide.

## Run it

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

The repository ships with an npm lockfile. If you prefer pnpm, `pnpm install`
will produce an equivalent tree.

## Content in Supabase

All portfolio copy is loaded from Supabase at request time. Editing a row in the
Supabase table editor updates the live site within about five seconds — no
redeploy, no rebuild. If Supabase is not configured (or temporarily unreachable),
the site falls back to the bundled content in `lib/content/`, so it never breaks.

### One-time setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql` (tables, indexes, RLS policies).
3. Run `supabase/seed.sql` to import the current sample portfolio. Regenerate it
   any time with `npm run supabase:seed`.
4. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and
   `SUPABASE_ANON_KEY` from **Project Settings → API**.
5. Restart `npm run dev` (or redeploy). The footer of the start screen should now
   show your Supabase content.

### What lives where

| Table | What you edit |
| --- | --- |
| `site_profile` | Name, role, intro, story, stats, education, achievements, timeline, facts, socials (single row, id `main`) |
| `skill_groups` | Frontend / Backend / Database / Cloud / DevOps / Tools headings |
| `skills` | Individual skills; `group_id` links to a group, `sort_order` controls order |
| `experience` | Roles, periods, highlights, technologies |
| `projects` | Treasure maps and full case studies; set `published = false` to hide one |

Adding a project or skill is just a new row: use a unique text `id` and a
`sort_order`, and it appears automatically. Rows and empty arrays in Supabase
are authoritative, so deleting or unpublishing all projects will not restore
the bundled examples. Bundled content is used only when Supabase is not
configured or cannot be reached. The six island landmarks themselves are part
of the game world and remain in `game/data/islands.ts`.

### Instant updates (optional)

Cached content revalidates within five seconds. To make edits appear instantly,
add a **Database Webhook** in Supabase (Database → Webhooks) for `INSERT`,
`UPDATE`, and `DELETE` on the content tables, pointing at:

```
https://your-domain.example/api/revalidate?secret=YOUR_REVALIDATE_SECRET
```

Set the same `REVALIDATE_SECRET` in your environment. The endpoint accepts `GET`
or `POST` and also reads an `x-revalidate-secret` header.

Reads use the public anon key behind read-only RLS policies; the server never
ships a service-role key to the browser.

## Controls

- **Sail:** `WASD` / arrow keys, or the on-screen joystick on touch devices.
- **Explore:** sail inside an island's ring. The boat eases to a stop, the camera
  drifts in, and the logbook opens.
- **Close:** `Esc`, the close seal, or the backdrop.
- **Island index:** the **Chart** button in the top right opens every section as
  an accessible list. This is the keyboard and screen-reader path through the
  whole portfolio.
- **Sound:** starts on the first gesture; toggle it any time in the HUD.

## Architecture

```
app/                     route, metadata, robots, sitemap, design tokens
components/content/      content provider feeding the client game shell
components/game/         React boundary around the Pixi engine
components/ui/           HUD, chart, compass, minimap, joystick, start screen
components/modals/       parchment dialog shell, frame, panel system
components/modals/panels  the six logbooks and project detail view
game/core/               engine loop, camera, input, telemetry
game/entities/            boat physics and rendering
game/world/               ocean, islands, landmarks, ambient wildlife
game/fx/                  pooled wake and ripples
game/textures/            procedural canvas textures (no downloads)
game/audio/               Howler.js + synthesised soundscape
game/data/                island layout and palettes
lib/content/              types + bundled fallback profile, skills, projects
lib/content/server.ts     cached Supabase loader (falls back when unset)
supabase/                 schema.sql, seed.sql, public-read RLS policies
store/                    Zustand UI state (modal, visited, sound, chart)
hooks/                    reduced motion, coarse pointer, focus trap
public/                   portrait, OG image, résumé PDF
scripts/                  brand assets and Supabase seed generation
```

### Why the canvas is behind a dynamic import

`GameStage` is the only React component that knows about Pixi. It dynamically
imports `GameEngine`, so the initial document contains the start screen and
metadata only; the renderer, textures, and sound engine load in parallel behind
the title. The engine owns its own ticker and publishes position/heading through
a tiny telemetry channel, so the 12Hz compass and minimap never re-render React
while you sail.

### Performance notes

- Procedural textures are painted once into canvases: zero image requests.
- Wake, ripples, sparkles, fish, birds, clouds, and motes use fixed pools.
- One normalised loop drives movement, camera damping, docking, and ambience.
- Canvas resolution is capped at 2x DPR; on lower-end devices the world is
  smaller and particles are reduced.
- Canvas `aria-hidden`; all content remains available as semantic HTML plus a
  focus-trapped, keyboard-navigable chart.
- Content is read once per request on the server and cached for five seconds;
  the browser never talks to Supabase directly.

### Accessibility

- The chart is a focus-trapped dialog with every section listed.
- The parchment dialogs trap focus, restore it on close, close on `Esc`, and
  label themselves with their visible titles.
- `prefers-reduced-motion` removes camera easing, boat bobbing, ambient
  animation, and the parchment drop/unroll sequence.
- Touch targets are at least 44px; contrast is checked against the parchment
  and deep-sea surfaces.
- A `<noscript>` fallback summarises the portfolio for crawlers and no-JS users.

## Making it yours

The live copy lives in Supabase (see above). `lib/content/` keeps the TypeScript
types and the bundled fallback used when Supabase is unavailable:

- `profile.ts` — name, intro, education, achievements, facts, socials.
- `skills.ts` — grouped skills with levels and descriptions.
- `experience.ts` — roles, highlights, technologies.
- `projects.ts` — the treasure maps and their full case studies.
- `../lib/site.ts` — canonical URL for metadata and structured data.

Edit Supabase rows for day-to-day changes. Edit the bundled files only if you
want to change the fallback, then run `npm run supabase:seed` to regenerate the
seed file.

Island positions, colours, and landmarks are in `game/data/islands.ts`.
Replace `public/portrait.png`, `public/og.jpg`, and `public/resume.pdf` with your
own assets, or edit `scripts/generate-assets.mjs` and run `npm run assets`.

Set `NEXT_PUBLIC_SITE_URL` to the real domain before deploying so canonical
links, Open Graph URLs, and the sitemap resolve correctly.
