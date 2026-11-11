-- Island Journey · generated seed data
-- Regenerate with `npm run supabase:seed` after editing lib/content.
-- Safe to run repeatedly: every insert upserts on its primary key.

insert into public.site_profile (
  id, name, first_name, role, location, timezone, email, availability, tagline, intro,
  long_story, stats, education, achievements, timeline, facts, socials
) values (
  'main',
  'Alex Rivers',
  'Alex',
  'Creative Frontend Engineer',
  'Lisbon, Portugal',
  'WEST · UTC+1',
  'hello@alexrivers.dev',
  'Open to select product work',
  'I build small worlds that make software feel like play.',
  'Eight years of shipping fast, accessible interfaces — from realtime trading desks to browser photobooths. I care about the millisecond between intent and response, and the thousand small details that make a product feel alive.',
  array['I grew up on the Atlantic coast, taking apart radios and drawing maps of places that did not exist yet. That combination never really left me: today I build interfaces that behave like little worlds, with clear rules and room to wander.', 'My work sits where product engineering meets craft. I lead frontend architecture for teams that care about performance budgets as much as motion curves, and I still write the shaders, the state machines, and the tests myself.', 'When I am not shipping, I am sailing a very slow 1979 sloop, restoring mechanical keyboards, or teaching a small weekly class on creative coding in Lisbon.'],
  '[{"label":"Years shipping","value":"8"},{"label":"Products launched","value":"24"},{"label":"Lighthouse score kept","value":"98+"},{"label":"Countries sailed","value":"17"}]'::jsonb,
  '[{"period":"2013 — 2017","title":"BSc Computer Science","place":"University of Porto","detail":"Human–computer interaction focus. Thesis on spatial interfaces for small screens."},{"period":"2018","title":"Interaction Design Certificate","place":"Interaction Design Foundation","detail":"Motion, information design, and accessible interaction patterns for the web."}]'::jsonb,
  '[{"year":"2025","title":"Awwwards Honorable Mention","detail":"For an interactive climate data story built with WebGL and SVG."},{"year":"2024","title":"Google Dev Library contributor","detail":"Open-source Next.js patterns for progressive canvas experiences."},{"year":"2023","title":"Speaker · RenderATL","detail":"\"Games as documentation\" — narrative interfaces for complex products."},{"year":"2021","title":"Internal design-system award","detail":"Shipped a 70-component system adopted by five product teams."}]'::jsonb,
  '[{"year":"2016","title":"First line of production code","detail":"A tiny booking site for my hometown sailing club."},{"year":"2017","title":"Computer Science degree","detail":"Graduated, packed one bag, moved to Berlin for a six-month contract."},{"year":"2019","title":"First zero-to-one product","detail":"Took a fintech onboarding flow from whiteboard to 40k monthly users."},{"year":"2021","title":"Design systems, properly","detail":"Led the frontend platform group at Driftline."},{"year":"2023","title":"Senior engineer, Northwind","detail":"Now building realtime, data-dense products with a small senior team."},{"year":"2026","title":"This little ocean","detail":"A portfolio you can sail. Built as a deliberate exercise in craft."}]'::jsonb,
  array['I read the whole Aubrey–Maturin series twice.', 'My first website is still online, and still uses a marquee.', 'I can tie six useful knots without looking. Seven if you count the bad one.', 'Coffee order: espresso, one sugar, always at the same little kiosk in Alfama.', 'I keep a notebook of interface sounds I like — doors, switches, rain on canvas.', 'Current obsession: tiny physics simulations that run at 60fps on a phone.'],
  '[{"label":"GitHub","handle":"github.com/alexrivers","href":"https://github.com/alexrivers","icon":"github"},{"label":"LinkedIn","handle":"in/alexrivers","href":"https://www.linkedin.com/in/alexrivers","icon":"linkedin"},{"label":"Dribbble","handle":"dribbble.com/alexrivers","href":"https://dribbble.com/alexrivers","icon":"dribbble"},{"label":"X / Twitter","handle":"@alexrivers","href":"https://x.com/alexrivers","icon":"x"}]'::jsonb
) on conflict (id) do update set
  name = excluded.name,
  first_name = excluded.first_name,
  role = excluded.role,
  location = excluded.location,
  timezone = excluded.timezone,
  email = excluded.email,
  availability = excluded.availability,
  tagline = excluded.tagline,
  intro = excluded.intro,
  long_story = excluded.long_story,
  stats = excluded.stats,
  education = excluded.education,
  achievements = excluded.achievements,
  timeline = excluded.timeline,
  facts = excluded.facts,
  socials = excluded.socials;

insert into public.skill_groups (id, label, blurb, accent, sort_order) values (
  'frontend', 'Frontend', 'The layer people touch. Fast, tactile, and accessible by default.', '#2f7f74', 0
) on conflict (id) do update set
  label = excluded.label, blurb = excluded.blurb, accent = excluded.accent, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'frontend-typescript', 'frontend', 'TypeScript', 'code', 96, 8, 'Strict types, discriminated unions, zero-any policy.', 0
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'frontend-react-next-js', 'frontend', 'React & Next.js', 'layers', 95, 8, 'App Router, server components, streaming, RSC boundaries.', 1
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'frontend-pixijs-webgl', 'frontend', 'PixiJS & WebGL', 'sparkles', 88, 5, 'Batched 2D rendering, custom shaders, texture atlases.', 2
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'frontend-css-motion', 'frontend', 'CSS & Motion', 'pen', 94, 8, 'Design tokens, container queries, GSAP choreography.', 3
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'frontend-performance', 'frontend', 'Performance', 'gauge', 91, 6, 'Budgets, profiling, INP work, 60fps interaction design.', 4
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'frontend-accessibility', 'frontend', 'Accessibility', 'globe', 90, 7, 'WCAG 2.2, keyboard flows, assistive-tech testing.', 5
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skill_groups (id, label, blurb, accent, sort_order) values (
  'backend', 'Backend', 'APIs that stay boring under load — in the best way.', '#9a6a2f', 1
) on conflict (id) do update set
  label = excluded.label, blurb = excluded.blurb, accent = excluded.accent, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'backend-node-js', 'backend', 'Node.js', 'server', 89, 8, 'Fastify, streaming responses, background workers.', 0
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'backend-python', 'backend', 'Python', 'cpu', 82, 6, 'FastAPI services, data pipelines, ML glue code.', 1
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'backend-trpc-graphql', 'backend', 'tRPC & GraphQL', 'workflow', 86, 5, 'End-to-end types and schema-first API design.', 2
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'backend-realtime', 'backend', 'Realtime', 'chart', 84, 5, 'WebSockets, SSE, presence, conflict-free updates.', 3
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skill_groups (id, label, blurb, accent, sort_order) values (
  'database', 'Database', 'Modelling first, indexes second, caches last.', '#7b5a8c', 2
) on conflict (id) do update set
  label = excluded.label, blurb = excluded.blurb, accent = excluded.accent, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'database-postgresql', 'database', 'PostgreSQL', 'database', 88, 7, 'Relational modelling, CTEs, window functions, tuning.', 0
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'database-prisma-drizzle', 'database', 'Prisma & Drizzle', 'layers', 90, 5, 'Type-safe schemas, safe migrations, query planning.', 1
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'database-redis', 'database', 'Redis', 'boxes', 82, 5, 'Caching, rate limits, queues, ephemeral game state.', 2
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'database-supabase', 'database', 'Supabase', 'cloud', 86, 4, 'Row-level security, realtime channels, storage policies.', 3
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skill_groups (id, label, blurb, accent, sort_order) values (
  'cloud', 'Cloud', 'Small surface area, predictable bills, boring deploys.', '#3b6f9c', 3
) on conflict (id) do update set
  label = excluded.label, blurb = excluded.blurb, accent = excluded.accent, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'cloud-vercel', 'cloud', 'Vercel', 'cloud', 93, 6, 'Edge caching, previews, ISR, runtime budgeting.', 0
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'cloud-aws', 'cloud', 'AWS', 'server', 78, 5, 'S3, Lambda, CloudFront, IAM with least privilege.', 1
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'cloud-cloudflare', 'cloud', 'Cloudflare', 'lock', 84, 4, 'Workers, R2, Turnstile, cache and bot rules.', 2
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'cloud-serverless-edge', 'cloud', 'Serverless & Edge', 'globe', 87, 5, 'Streaming runtimes, cold-start budgets, geo routing.', 3
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skill_groups (id, label, blurb, accent, sort_order) values (
  'devops', 'DevOps', 'If it is not measured and automated, it is not done.', '#8a4b3a', 4
) on conflict (id) do update set
  label = excluded.label, blurb = excluded.blurb, accent = excluded.accent, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'devops-docker', 'devops', 'Docker', 'container', 85, 6, 'Multi-stage images, reproducible local environments.', 0
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'devops-ci-cd', 'devops', 'CI/CD', 'workflow', 89, 7, 'GitHub Actions, preview stacks, safe release trains.', 1
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'devops-observability', 'devops', 'Observability', 'chart', 83, 5, 'Sentry, OpenTelemetry, real-user performance budgets.', 2
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'devops-testing', 'devops', 'Testing', 'test', 86, 7, 'Vitest, Playwright, visual regression, contract tests.', 3
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skill_groups (id, label, blurb, accent, sort_order) values (
  'tools', 'Tools', 'The workshop: where ideas get sketched, cut, and sanded.', '#5d7a3f', 5
) on conflict (id) do update set
  label = excluded.label, blurb = excluded.blurb, accent = excluded.accent, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'tools-git', 'tools', 'Git', 'git', 94, 9, 'Trunk-based flow, surgical rebases, clear history.', 0
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'tools-figma', 'tools', 'Figma', 'pen', 87, 7, 'Design tokens, prototypes, and pair design sessions.', 1
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'tools-gsap', 'tools', 'GSAP', 'sparkles', 90, 6, 'Timeline choreography, scroll work, game juice.', 2
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'tools-terminal', 'tools', 'Terminal', 'terminal', 88, 10, 'Fish, tmux, ripgrep, and a suspicious number of aliases.', 3
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.skills (id, group_id, name, icon, level, years, description, sort_order) values (
  'tools-mobile-web', 'tools', 'Mobile web', 'smartphone', 85, 6, 'Touch input, safe areas, responsive canvas.', 4
) on conflict (id) do update set
  group_id = excluded.group_id, name = excluded.name, icon = excluded.icon, level = excluded.level, years = excluded.years, description = excluded.description, sort_order = excluded.sort_order;

insert into public.experience (
  id, company, role, period, location, summary, highlights, technologies, sort_order
) values (
  'northwind-studio-senior-frontend-engineer',
  'Northwind Studio', 'Senior Frontend Engineer', '2023 — Present', 'Lisbon · Hybrid',
  'Technical lead for a realtime market-intelligence product used by 30k analysts. I own frontend architecture, performance, and the design-system contract with product design.',
  array['Cut the main dashboard''s interaction latency from 340ms to 48ms by moving derived state into a worker and virtualising the tape.', 'Designed the streaming data layer that keeps 60 charts in sync without a single rerender storm.', 'Mentor three engineers; run a fortnightly craft review with live profiling.'],
  array['Next.js', 'TypeScript', 'PixiJS', 'WebSockets', 'PostgreSQL', 'Playwright'],
  0
) on conflict (id) do update set
  company = excluded.company, role = excluded.role, period = excluded.period,
  location = excluded.location, summary = excluded.summary,
  highlights = excluded.highlights, technologies = excluded.technologies, sort_order = excluded.sort_order;

insert into public.experience (
  id, company, role, period, location, summary, highlights, technologies, sort_order
) values (
  'driftline-frontend-engineer-platform-lead',
  'Driftline', 'Frontend Engineer → Platform Lead', '2021 — 2023', 'Berlin · Remote-first',
  'Built the frontend platform for a logistics scale-up, from design tokens to release automation, while shipping customer-facing tracking experiences.',
  array['Shipped a 70-component design system adopted by five product teams.', 'Rebuilt the tracking map to stay under a 180KB JS budget and 60fps on mid-range Android.', 'Introduced preview environments and visual regression, reducing UI regressions by 70%.'],
  array['React', 'TypeScript', 'MapLibre', 'Node.js', 'Storybook', 'Docker'],
  1
) on conflict (id) do update set
  company = excluded.company, role = excluded.role, period = excluded.period,
  location = excluded.location, summary = excluded.summary,
  highlights = excluded.highlights, technologies = excluded.technologies, sort_order = excluded.sort_order;

insert into public.experience (
  id, company, role, period, location, summary, highlights, technologies, sort_order
) values (
  'harbor-labs-full-stack-developer',
  'Harbor Labs', 'Full-stack Developer', '2019 — 2021', 'Porto',
  'Second engineer on a fintech onboarding product. I worked across the stack, but lived in the browser — forms, state, and the little moments between steps.',
  array['Took onboarding from whiteboard to 40k monthly users in eleven months.', 'Reduced drop-off at identity verification by 31% through progressive disclosure.', 'Built the internal admin console still used by the operations team today.'],
  array['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
  2
) on conflict (id) do update set
  company = excluded.company, role = excluded.role, period = excluded.period,
  location = excluded.location, summary = excluded.summary,
  highlights = excluded.highlights, technologies = excluded.technologies, sort_order = excluded.sort_order;

insert into public.experience (
  id, company, role, period, location, summary, highlights, technologies, sort_order
) values (
  'independent-freelance-developer-designer',
  'Independent', 'Freelance Developer & Designer', '2017 — 2019', 'Porto · Remote',
  'Small, deliberate projects for studios, museums, and one very patient bakery. Learned to scope, price, and say no.',
  array['Built interactive exhibits for two regional science museums.', 'Designed and shipped eleven marketing sites, all above 95 Lighthouse.', 'Created the first version of the ocean renderer later used in this portfolio.'],
  array['JavaScript', 'GSAP', 'WebGL', 'Figma', 'Eleventy'],
  3
) on conflict (id) do update set
  company = excluded.company, role = excluded.role, period = excluded.period,
  location = excluded.location, summary = excluded.summary,
  highlights = excluded.highlights, technologies = excluded.technologies, sort_order = excluded.sort_order;

insert into public.projects (
  id, title, kicker, epoch, summary, description, role, timeline, team, status,
  metrics, technologies, architecture, challenges, features, responsibilities,
  gallery, links, artwork, sort_order, published
) values (
  'ai-stock-sync', 'AI Stock Synchronization', 'Realtime market intelligence', '2025',
  'A multi-source market dashboard that synchronises live price feeds with AI-written briefings, without ever letting a chart fall out of step.',
  array['Analysts were juggling six terminals, a spreadsheet, and a chat window. AI Stock Synchronization brings the tape, news, and model-generated context into one deterministic view — every panel driven from a single normalized event stream.', 'I led the frontend architecture and built the streaming layer used by 60 synchronized widgets. The AI summariser runs server-side; on the client, briefings arrive as structured annotations pinned to the candles they describe.'],
  'Lead Frontend Engineer', '5 months · 2025', '2 frontend, 1 backend, 1 ML engineer, 1 designer', 'Live · internal + 30k analysts',
  '[{"label":"Interaction latency","value":"48ms"},{"label":"Charts in sync","value":"60"},{"label":"Feed uptime","value":"99.98%"}]'::jsonb,
  array['Next.js', 'TypeScript', 'PixiJS', 'WebSockets', 'FastAPI', 'PostgreSQL', 'Redis', 'OpenAI', 'Docker'],
  array['Normalised event bus in a Web Worker; one reducer, one clock, zero duplicated chart state.', 'Virtualised tape and canvas charts with batched PixiJS draw calls at a fixed 30Hz render cadence.', 'Server-side summarisation pipeline writes structured annotations keyed to a price/time index.', 'Optimistic watchlists with last-write-wins reconciliation and offline queue.'],
  '[{"title":"Six feeds, six clocks","solution":"Introduced a monotonic sequence per instrument plus a watermark. Late events are dropped or replayed at the next tick, so every chart shows the same truth."},{"title":"Rerender storms","solution":"Moved derived aggregates into a worker and subscribed charts to narrow selectors. React renders dropped from 1,400/min to under 40/min."},{"title":"AI text that lies","solution":"Briefings are rendered with explicit source chips and a confidence label; unsupported claims are visually de-emphasised and never fed back into the model."}]'::jsonb,
  array['60 synchronized, canvas-rendered widgets', 'AI briefings pinned to chart events', 'Keyboard-first command palette', 'Offline watchlists with conflict resolution', 'Configurable alert rules with debounce preview', 'Full dark/light contrast-tested themes'],
  array['Frontend architecture and performance budget', 'Streaming protocol design with backend', 'Canvas chart library and interaction model', 'Accessibility review and keyboard flows', 'Mentoring, code review, release management'],
  '[{"caption":"The live tape, briefings, and synchronized candles","variant":0},{"caption":"Alert builder with debounce preview","variant":1},{"caption":"Instrument deep-dive and source provenance","variant":2}]'::jsonb,
  '{"live":"https://example.com/ai-stock-sync","github":"https://github.com/alexrivers","video":"https://example.com/ai-stock-sync/demo"}'::jsonb,
  '{"from":"#082c36","to":"#14545a","accent":"#e7b566","motif":"chart"}'::jsonb,
  0, true
) on conflict (id) do update set
  title = excluded.title, kicker = excluded.kicker, epoch = excluded.epoch,
  summary = excluded.summary, description = excluded.description, role = excluded.role,
  timeline = excluded.timeline, team = excluded.team, status = excluded.status,
  metrics = excluded.metrics, technologies = excluded.technologies,
  architecture = excluded.architecture, challenges = excluded.challenges,
  features = excluded.features, responsibilities = excluded.responsibilities,
  gallery = excluded.gallery, links = excluded.links, artwork = excluded.artwork,
  sort_order = excluded.sort_order, published = excluded.published;

insert into public.projects (
  id, title, kicker, epoch, summary, description, role, timeline, team, status,
  metrics, technologies, architecture, challenges, features, responsibilities,
  gallery, links, artwork, sort_order, published
) values (
  'photobooth', 'Photobooth', 'A browser that takes pictures', '2024',
  'A privacy-first photobooth in the browser: filters, strips, and instant sharing with a fully offline PWA mode.',
  array['Built for a design conference photo wall, then released publicly. All capture and compositing happens on-device; images never leave the browser unless the guest scans the QR code.', 'The tricky part was making a heavy media pipeline feel instant on low-end phones. Frames are processed in a worker, previews use an offscreen canvas, and the final strip is encoded lazily.'],
  'Creator & Engineer', '3 months · 2024', 'Solo, with a designer friend for the brand', 'Live · 12k strips captured',
  '[{"label":"TTI on mid Android","value":"1.8s"},{"label":"On-device processing","value":"100%"},{"label":"Strips captured","value":"12,400"}]'::jsonb,
  array['React', 'TypeScript', 'MediaPipe', 'Canvas API', 'Web Workers', 'Cloudflare R2', 'Zustand', 'Vite'],
  array['Camera frames stream into an OffscreenCanvas owned by a worker; UI thread only receives ready previews.', 'Filter graph is a list of composable shaders, previewed at 480px and rendered full-size on capture.', 'Offline-first PWA with IndexedDB queue; sharing uploads asynchronously when connectivity returns.', 'Signed short-lived R2 URLs for share links; no account, no tracking.'],
  '[{"title":"Camera permission drop-off","solution":"Introduced a pre-permission tutorial with a live one-frame demo and a fallback upload path. Completion rose from 54% to 86%."},{"title":"Filter jank at 4K","solution":"Downscaled previews plus a worker pipeline; sustained 60fps preview and 1.2s final render on a Pixel 4a."},{"title":"Sharing privacy","solution":"Opt-in uploads only, signed URLs expire in 24 hours, and an explicit delete action removes the object immediately."}]'::jsonb,
  array['Hand-designed film-strip frames', 'Gestural countdown with sound cues', 'Six realtime filters and light leaks', 'QR hand-off to phone', 'Installable, fully offline PWA', 'Keyboard and screen-reader capture flow'],
  array['Product design and technical direction', 'Media pipeline and worker architecture', 'Brand illustration and frame artwork', 'Deployment, storage, and privacy policy'],
  '[{"caption":"Capture view with film-strip frames","variant":0},{"caption":"Filter tray, previewed in real time","variant":1},{"caption":"The shared strip page","variant":2}]'::jsonb,
  '{"live":"https://example.com/photobooth","github":"https://github.com/alexrivers"}'::jsonb,
  '{"from":"#3b1f2b","to":"#7a3a3f","accent":"#f2c9a0","motif":"camera"}'::jsonb,
  1, true
) on conflict (id) do update set
  title = excluded.title, kicker = excluded.kicker, epoch = excluded.epoch,
  summary = excluded.summary, description = excluded.description, role = excluded.role,
  timeline = excluded.timeline, team = excluded.team, status = excluded.status,
  metrics = excluded.metrics, technologies = excluded.technologies,
  architecture = excluded.architecture, challenges = excluded.challenges,
  features = excluded.features, responsibilities = excluded.responsibilities,
  gallery = excluded.gallery, links = excluded.links, artwork = excluded.artwork,
  sort_order = excluded.sort_order, published = excluded.published;

insert into public.projects (
  id, title, kicker, epoch, summary, description, role, timeline, team, status,
  metrics, technologies, architecture, challenges, features, responsibilities,
  gallery, links, artwork, sort_order, published
) values (
  'finance-tracker', 'Finance Tracker', 'Calm money, clearly seen', '2023',
  'A personal finance companion that turns messy bank exports into a clear monthly story, with budgets that adapt instead of nag.',
  array['Most finance apps show you a wall of numbers and call it insight. This one leads with a single sentence — what changed, and why — then lets you unfold the detail.', 'I built the import pipeline, categorisation model, and the calm, document-like interface. It runs entirely on a single Postgres instance and a very small serverless surface.'],
  'Full-stack Engineer', '4 months · 2023', 'Solo · 400 beta users', 'Private beta',
  '[{"label":"Import accuracy","value":"97.4%"},{"label":"Monthly active","value":"68%"},{"label":"Median import time","value":"2.1s"}]'::jsonb,
  array['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'PostgreSQL', 'Plaid', 'Recharts', 'Tailwind CSS'],
  array['Idempotent import pipeline keyed on a hash of date, amount, and merchant.', 'Rule engine with user overrides; classification is deterministic and fully inspectable.', 'Server components render the monthly narrative; interactive charts are the only client islands.', 'Row-level security with encrypted Plaid tokens at rest.'],
  '[{"title":"Dirty bank data","solution":"Built a normalisation layer with merchant fingerprinting, duplicate detection, and a one-click \"fix this\" flow that feeds back into the rule engine."},{"title":"Budget guilt","solution":"Replaced red overspend alerts with rolling envelopes and plain-language forecasts. Beta retention improved by 22%."},{"title":"Sensitive data","solution":"No third-party analytics on money views, encrypted tokens, scoped sessions, and a documented data-deletion path."}]'::jsonb,
  array['Bank imports with duplicate protection', 'Adaptive monthly envelopes', 'A one-sentence monthly story', 'Merchant rules you can read and edit', 'CSV export and full data deletion', 'Responsive, print-friendly reports'],
  array['Product definition and research', 'Data model and import pipeline', 'UI design and implementation', 'Privacy and security review'],
  '[{"caption":"The monthly story and envelope health","variant":0},{"caption":"Transaction review with rule suggestions","variant":1},{"caption":"Cashflow detail, unfolded","variant":2}]'::jsonb,
  '{"live":"https://example.com/finance-tracker","github":"https://github.com/alexrivers"}'::jsonb,
  '{"from":"#2c2a1e","to":"#5c5636","accent":"#d7b56d","motif":"ledger"}'::jsonb,
  2, true
) on conflict (id) do update set
  title = excluded.title, kicker = excluded.kicker, epoch = excluded.epoch,
  summary = excluded.summary, description = excluded.description, role = excluded.role,
  timeline = excluded.timeline, team = excluded.team, status = excluded.status,
  metrics = excluded.metrics, technologies = excluded.technologies,
  architecture = excluded.architecture, challenges = excluded.challenges,
  features = excluded.features, responsibilities = excluded.responsibilities,
  gallery = excluded.gallery, links = excluded.links, artwork = excluded.artwork,
  sort_order = excluded.sort_order, published = excluded.published;

insert into public.projects (
  id, title, kicker, epoch, summary, description, role, timeline, team, status,
  metrics, technologies, architecture, challenges, features, responsibilities,
  gallery, links, artwork, sort_order, published
) values (
  'ai-music-analyzer', 'AI Music Analyzer', 'Hearing what a track is made of', '2024',
  'Drop in a track and see its key, tempo, mood, and structure — then build a playlist from the parts you actually liked.',
  array['An experiment in making audio ML understandable. Instead of a black-box label, the interface shows the evidence: the waveform, the beat grid, the spectral fingerprint, and the confidence of each prediction.', 'The analyzer is a Python service using librosa and a small fine-tuned model. The web app streams analysis progress and lets you audition any detected section in context.'],
  'Frontend Lead & Product Designer', '6 months · 2024', '2 engineers, 1 ML researcher', 'Live · 9k analyses',
  '[{"label":"Tempo accuracy","value":"96%"},{"label":"Analysis time","value":"8s / track"},{"label":"Tracks analysed","value":"9,300"}]'::jsonb,
  array['Next.js', 'TypeScript', 'Python', 'Librosa', 'PyTorch', 'Supabase', 'Web Audio API', 'Wavesurfer.js'],
  array['Chunked upload to object storage; worker pool runs analysis and writes structured results.', 'Progress streamed over SSE with resumable jobs and deterministic cache keys.', 'Web Audio graph for section auditioning, with shared transport state across views.', 'Supabase row-level security and signed media URLs for private tracks.'],
  '[{"title":"Explaining a model","solution":"Every prediction carries a visual explanation — beat grid, chroma, confidence spread — plus a \"why this\" tooltip written for musicians, not ML engineers."},{"title":"Long-running jobs","solution":"Resumable SSE progress with a job ledger; users can close the tab and return to the same analysis state."},{"title":"Browser audio limits","solution":"A single AudioContext, decoded buffers cached per track, and gapless section transitions via scheduled source nodes."}]'::jsonb,
  array['Key, tempo, and energy detection', 'Structural section map', 'Playlist from selected sections', 'Chord and mood explanations', 'Private library with signed links', 'Exportable analysis report'],
  array['Interface architecture and motion design', 'Audio playback and auditioning model', 'Analysis result schema with ML team', 'Design of the explanation layer'],
  '[{"caption":"Waveform, beats, and structural sections","variant":0},{"caption":"Mood and key evidence","variant":1},{"caption":"Building a playlist from sections","variant":2}]'::jsonb,
  '{"live":"https://example.com/music-analyzer","github":"https://github.com/alexrivers","video":"https://example.com/music-analyzer/walkthrough"}'::jsonb,
  '{"from":"#1c2238","to":"#43355c","accent":"#8fd6c2","motif":"waveform"}'::jsonb,
  3, true
) on conflict (id) do update set
  title = excluded.title, kicker = excluded.kicker, epoch = excluded.epoch,
  summary = excluded.summary, description = excluded.description, role = excluded.role,
  timeline = excluded.timeline, team = excluded.team, status = excluded.status,
  metrics = excluded.metrics, technologies = excluded.technologies,
  architecture = excluded.architecture, challenges = excluded.challenges,
  features = excluded.features, responsibilities = excluded.responsibilities,
  gallery = excluded.gallery, links = excluded.links, artwork = excluded.artwork,
  sort_order = excluded.sort_order, published = excluded.published;

insert into public.projects (
  id, title, kicker, epoch, summary, description, role, timeline, team, status,
  metrics, technologies, architecture, challenges, features, responsibilities,
  gallery, links, artwork, sort_order, published
) values (
  'travel-system', 'Travel System', 'Plans that survive real life', '2022',
  'A collaborative itinerary planner that treats a trip as a living map, not a spreadsheet of timestamps.',
  array['Built for groups who plan across time zones. Every stop is a card on a map, with travel time, opening hours, and budget folded into the route itself. When plans change, the itinerary redraws instead of breaking.', 'I designed and built the entire product with one backend engineer, from data model to map interactions to the printable day sheet.'],
  'Founding Engineer', '7 months · 2022', '1 frontend, 1 backend, freelance illustration', 'Shipped · acquired 2023',
  '[{"label":"Trips planned","value":"4,100"},{"label":"Concurrent editors","value":"24"},{"label":"Route recalc","value":"120ms"}]'::jsonb,
  array['Next.js', 'TypeScript', 'Mapbox GL', 'Supabase', 'TanStack Query', 'Zustand', 'Stripe', 'PostGIS'],
  array['Map and itinerary share one normalized trip store; edits are applied as commands, not patches.', 'Presence and live cursors via Supabase realtime channels with per-field conflict handling.', 'PostGIS-backed travel-time matrix cached per trip and invalidated by mode or date changes.', 'Printable day sheets generated from the same store as the UI.'],
  '[{"title":"Concurrent planning","solution":"Command-based editing with field-level last-write-wins and visible presence; no lost stops when two people drag at once."},{"title":"Map performance","solution":"Clustered layers, viewport-only route computation, and an LRU travel-time cache kept panning at 60fps on an iPad."},{"title":"Plans change","solution":"Every itinerary keeps an immutable \"as planned\" timeline while the working map can be rearranged freely — one click restores the original."}]'::jsonb,
  array['Drag-to-plan collaborative map', 'Live presence and cursors', 'Travel-time-aware day routes', 'Budget roll-ups per day', 'Offline day sheets', 'Shareable, no-login trip links'],
  array['Product design and frontend architecture', 'Map interaction model and route engine', 'Realtime collaboration protocol', 'Billing and account flows'],
  '[{"caption":"Trip map with live collaborators","variant":0},{"caption":"Day plan and travel time budget","variant":1},{"caption":"The printable day sheet","variant":2}]'::jsonb,
  '{"live":"https://example.com/travel-system","github":"https://github.com/alexrivers"}'::jsonb,
  '{"from":"#1f3a2f","to":"#426b4f","accent":"#e3c98b","motif":"map"}'::jsonb,
  4, true
) on conflict (id) do update set
  title = excluded.title, kicker = excluded.kicker, epoch = excluded.epoch,
  summary = excluded.summary, description = excluded.description, role = excluded.role,
  timeline = excluded.timeline, team = excluded.team, status = excluded.status,
  metrics = excluded.metrics, technologies = excluded.technologies,
  architecture = excluded.architecture, challenges = excluded.challenges,
  features = excluded.features, responsibilities = excluded.responsibilities,
  gallery = excluded.gallery, links = excluded.links, artwork = excluded.artwork,
  sort_order = excluded.sort_order, published = excluded.published;

