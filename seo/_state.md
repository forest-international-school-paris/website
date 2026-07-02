# SEO Loop State — forest-international.com

> Memory of the autonomous loop (`/school-seo-loop`). Every iteration reads this first
> and updates it last. Rules live in root `CLAUDE.md`; thresholds in `seo/_registry.json`.

## North star (latest measurement)

- **PostHog**: data since 2026-07-01 (2 days — too young to trend). Baseline snapshot
  pending first weekly measure run. Conversion events wired: see `seo/_registry.json`.
- **GSC**: API not yet credentialed (`gsc.api_ready=false`); UI viewable as
  koreal6803@gmail.com. No baseline pulled yet.
- **AI citations**: not yet spot-checked.

## Needs fixing (P1)

- **Summer 2026 camp season is NOW** — verify `/holiday-camps` current-session info is
  live-accurate and write the first camp-focused post (backlog has camp gaps). Seasonal
  deadline logic: `seo-strategy.md` calendar.
- Money pages have thin/missing per-page descriptions in places — run mode E audit on
  one pillar (start with camps, it's in season).
- `welcome-new-school-year.md` (Sept 2024) fails lint: 124 words, 0 internal links,
  stale year. Decide per Bible #9: refresh into an evergreen "school year at Forest"
  piece, or accept as archived news (then teach lint an `archive` allowance) — don't
  leave it as the only post shaping the blog's quality profile.

## In progress (WIP)

(empty)

## Scheduled

- 2026-07-09: first weekly measurement run (PostHog baseline snapshot).

## User actions (agent cannot do these)

1. **GSC API unlock (1 min):** Search Console → property forest-international.com →
   Settings → Users and permissions → Add user
   `firebase-adminsdk-tjtuk@fdata-299302.iam.gserviceaccount.com` (Full permission).
   Then flip `gsc.api_ready` to `true` in `seo/_registry.json`.
2. **Google Business Profile:** confirm claimed status + category/hours/NAP match
   `seo/_registry.json` `nap`. Agent will maintain a GBP post draft list here once
   confirmed.
3. **Bing Webmaster Tools** (optional but feeds ChatGPT retrieval): add site, verify,
   submit sitemap.

## User decisions (open strategy questions — do not act without answer)

- **French-language pages**: FR queries (école internationale yvelines…) are a real
  demand pool (see `seo/_backlog.json` fr-tagged rows); site is EN-only today. Relaunch
  French = significant commitment (every page bilingual, ongoing sync). Recommendation
  when asked: start with 1–2 FR landing pages for camps + admissions rather than full
  bilingual site.

## Periodic last-run

| Task | Cycle | Last run |
|---|---|---|
| Measure (PostHog/GSC) | 7d | never |
| Site health sweep | 7d | never |
| Keyword mining | 7d | 2026-07-02 (initial seed) |
| Local/GEO sweep | 30d | never |
| Pillar deep-audit | 30d | never |
| Freshness sweep | term boundaries | never |

## Iteration log

- 2026-07-02 | Engine installed (skill + loop + registry + backlog + measurement scripts;
  adapted from the FinLab SEO engine). PostHog verified live (project 493129, events
  since 07-01). Deploy path confirmed: push to origin/main auto-deploys. | Next: first
  loop iteration should tackle P1 camp-season item.

## Lessons

- Deploy runs on the school's Cloudflare account (git-connected). No local wrangler
  deploy — the "website" worker doesn't exist on koreal6803's account; publish = push.
- Local node_modules had been installed inside a Linux Cowork container; after machine
  switches, `rm -rf node_modules && npm install` before building.
