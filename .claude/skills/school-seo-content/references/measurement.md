# Mode G: Measurement — PostHog + Google Search Console

> KPI order (Bible §1): organic-attributed inquiries > SERP share > AI citations.
> Snapshots are committed to `seo/metrics/` (JSON, dated) so deltas survive across
> sessions/machines. Never fabricate a metric; a script that can't authenticate prints
> setup instructions and exits — it never invents numbers.

## 1. PostHog (works today — key already configured)

- Project: **493129** (US cloud, `us.posthog.com`), site key baked into
  `src/components/Analytics.astro`. Personal API key for reading: `.env` →
  `POSTHOG_PERSONAL_API_KEY` (gitignored; repo is public).
- Conversion events (defined in `Analytics.astro`; list mirrored in `seo/_registry.json`):
  `apply_click`, `contact_form_click`, `masterclass_register_click`, `whatsapp_click`,
  `email_click`, `phone_click`, `popup_shown`, `popup_cta_click`, plus autocaptured
  `$pageview`/`$pageleave`.

Weekly snapshot:

```bash
node scripts/measure-posthog.mjs          # → seo/metrics/posthog-YYYY-MM-DD.json
```

What it computes (28-day window, HogQL over `/api/environments/493129/query/`):
sessions and pageviews split by channel (organic search / direct / referral / social),
top landing pages for organic, conversion-event counts split by channel, and
organic-attributed conversions per page. **Ranking rule:** a page with organic
conversions > a page with organic traffic only > everything else. That ordering decides
which content gets optimization time.

Data started 2026-07-01 — early numbers are small; judge trends after 4+ weeks, don't
over-react to single-day noise.

## 2. Google Search Console (needs one-time user action)

Property: `forest-international.com`, viewable ONLY with Google account
koreal6803@gmail.com (no permission to add users — the service-account route is
unavailable for this site).

**To unlock automated pulls — one-time OAuth login as koreal6803@gmail.com** (the user
runs this interactively, e.g. by typing it with a `!` prefix in a Claude Code session;
pick koreal6803@gmail.com in the browser):

```bash
CLOUDSDK_CONFIG=$HOME/.config/gcloud-school gcloud auth application-default login \
  --scopes='openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform'
```

(`cloud-platform` must be in the list — gcloud rejects any custom `--scopes` without it.)

The separate `gcloud-school` config dir is deliberate: the default ADC belongs to
finlab.company@gmail.com and is used for Cloud SQL — never overwrite it. After login,
`node scripts/measure-gsc.mjs` works (reads the refresh token from that file, sends
`x-goog-user-project: fdata-299302`; defaults `GSC_SITE_URL=sc-domain:forest-international.com`,
override if the property is URL-prefix type). Then flip `gsc.api_ready` to `true` in
`seo/_registry.json`.

What it computes: 28-day query+page performance bucketed into the clusters defined in
`seo/_registry.json` (`clusters` regexes: brand / choose-school / programs / camps /
local), striking-distance list (position 5–20 → highest-ROI push targets → feed
`seo/_backlog.json`), and per-hub-page position tracking.

**Manual fallback (no credentials):** during a measurement iteration, either use Chrome
automation (the browser is signed in as koreal6803@gmail.com) to read the Performance
report, or record "GSC manual export requested" in `seo/_state.md` user actions. Do not
skip measurement silently.

## 3. Weekly measurement SOP (loop task)

1. `node scripts/measure-posthog.mjs` → compare with previous snapshot → write deltas
   into `seo/_state.md` (north-star block): organic sessions, organic conversions by
   event, top mover pages.
2. GSC (API or manual): cluster clicks/impressions/position deltas; striking-distance
   queries → backlog candidates (mark `source: striking-distance`); position drops >5 on
   a hub → incident check (Bible §5).
3. Cross-check: pages with impressions but zero organic conversions get maintenance
   priority only; pages driving `apply_click`/`contact_form_click`/`whatsapp_click` get
   optimization priority.
4. Monthly extras: GBP insights (user export), AI-citation spot-check
   (`local-seo-geo.md` §5).

## 4. Incident thresholds (feed the Bible §5 brake)

- PostHog: organic sessions −40% day-over-day (after data matures; ignore while <4 weeks
  of history).
- GSC: clicks −30% day-over-day, or a hub page −5 positions on its head term.
- Response: freeze publishing, write diagnosis into `seo/_state.md`, check GSC manual
  actions + indexing report + core-update calendar BEFORE shipping anything new.
