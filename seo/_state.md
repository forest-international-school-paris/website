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

1. **GSC API unlock (one-time, ~1 min; adding users to the property is NOT possible,
   so this is the OAuth route as koreal6803@gmail.com).** Run in a terminal (or with
   `!` prefix in a Claude Code session) and choose koreal6803@gmail.com in the browser:
   ```bash
   CLOUDSDK_CONFIG=$HOME/.config/gcloud-school gcloud auth application-default login \
     --scopes='openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/webmasters.readonly'
   ```
   Then flip `gsc.api_ready` to `true` in `seo/_registry.json`. Details: skill
   `references/measurement.md` §2.
2. **Deploy pipeline** — user said 2026-07-02 they will handle it "tomorrow" (2026-07-03).
   Until live-verified, pushed changes (incl. the FR pages + IndexNow key file) wait.
3. **Google Business Profile:** confirm claimed status + category/hours/NAP match
   `seo/_registry.json` `nap`. Agent will maintain a GBP post draft list here once
   confirmed.
4. **Bing Webmaster Tools** (optional but feeds ChatGPT retrieval): add site, verify,
   submit sitemap.

## User confirmations (site fact inconsistencies found 2026-07-02 — Bible #2/#8)

- **Camp ages:** `/holiday-camps` says "ages 2-12" (canonical, per 2026-06 commit), but
  homepage `index.astro` line ~627 still says camps "open to all children aged 2-14" —
  which is right? (FR pages follow the canonical 2-12.)
- **Admissions age ceiling:** `/admissions` Key Information says "up to 15 years";
  `/about` and homepage say ages 2-14. Which is the real ceiling?
- **Phone NAP mismatch:** footer + README show +33 1 39 16 87 35; JSON-LD + WhatsApp
  button use +33 6 32 72 51 45. Both may be real (landline vs mobile) but the JSON-LD
  and GBP should use one consistent primary number.

## User decisions (open strategy questions — do not act without answer)

- **Deploy pipeline (BLOCKS full loop autonomy):** pushes to origin/main do NOT go live
  automatically (tested 2026-07-02: IndexNow key file pushed, still 404 after 25 min,
  while June/July commits are live — school side likely deploys manually). Until
  resolved, the loop pushes content and schedules "verify live" follow-ups. Options:
  (a) school enables git-connected auto-deploy on their Cloudflare account,
  (b) user gets deploy access (added to the school's CF account / API token),
  (c) status quo: school deploys on their rhythm, loop verifies afterwards.

- ~~French-language pages~~ **DECIDED 2026-07-02** (user: "do the recommendation"):
  two FR landing pages built — `/fr/admissions` + `/fr/stages-vacances`, with hreflang
  pairing to `/admissions` and `/holiday-camps`, footer links, popup suppressed on FR
  pages. Full bilingual relaunch remains NOT approved; further FR pages only on new
  user decision.

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

- 2026-07-02 (2) | FR landing pages built (`/fr/admissions`, `/fr/stages-vacances`;
  facts sourced from admissions/holiday-camps/about/contact pages; hreflang via new
  Layout `alternates`/`lang` props; footer links added). GSC auth switched to OAuth-user
  route (no property permission needed) — awaiting one-time login. Found 3 site fact
  inconsistencies → "User confirmations". Local build verified; deploy waits on user
  (tomorrow). | Next: after deploy, verify FR pages live + IndexNow them; first
  measurement run 07-09.
- 2026-07-02 | Engine installed (skill + loop + registry + backlog + measurement scripts;
  adapted from the FinLab SEO engine). PostHog verified live (project 493129, events
  since 07-01). Deploy path confirmed: push to origin/main auto-deploys. | Next: first
  loop iteration should tackle P1 camp-season item.

## Lessons

- Deploy runs on the school's Cloudflare account and is NOT triggered by push (tested
  2026-07-02). No local wrangler deploy possible — the "website" worker doesn't exist
  on koreal6803's account. Publish = push + verify-live follow-up (publishing.md §3).
- Local node_modules had been installed inside a Linux Cowork container; after machine
  switches, `rm -rf node_modules && npm install` before building.
