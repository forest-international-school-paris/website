# SEO Loop State — forest-international.com

> Memory of the autonomous loop (`/school-seo-loop`). Every iteration reads this first
> and updates it last. Rules live in root `CLAUDE.md`; thresholds in `seo/_registry.json`.

## North star (latest measurement)

**Baseline 2026-07-02** — first credentialed pull (PostHog 28d; GSC 2026-06-02..06-30).
Snapshots: `seo/metrics/gsc-2026-07-02.json`, `seo/metrics/posthog-2026-07-02.json`.

- **PostHog**: organic sessions 21/28d (Direct 24, Referral 11, Social 1). Organic entry
  pages: `/` 18, `/holiday-camps/` 3. Organic-attributed conversions: 23× `popup_shown`
  only — ZERO hard conversions (apply/contact/whatsapp/email/phone) from organic yet.
  The few hard conversions are all Direct (whatsapp 3, masterclass 2, apply 1, email 1).
- **GSC**: 5 clicks / 44 impressions / 25 queries (site is tiny; treat as baseline, not
  trend). Brand pos 2.4 = all 5 clicks. Non-brand clusters far off page 1: choose-school
  pos 32.4 (11 imp), programs pos 26.0 (10 imp), camps pos 58.3 (4 imp). Page-level:
  `/` 8 clicks/77 imp/pos 11.7; `/holiday-camps/` 1 click/25 imp/**pos 16.2** — best
  non-brand opportunity, in season. `/admissions` pos 2.1 (7 imp), `/about` 3.4,
  `/tuition` 2.5: positions fine, impressions tiny → outside homepage+camps the
  constraint is VISIBILITY (queries covered), not position. Striking-distance query
  list: empty (nothing clears the ≥10-impression filter yet).
- **AI citations**: not yet spot-checked.

## Needs fixing (P1)

- **First camp-focused post** (rest of the P1 camp item; hub work done 2026-07-02 —
  live-accuracy verified + mode E upgrade shipped). Bible #4 note: the hub owns
  "summer camp paris english" head terms — the post must take a differentiated long-tail
  angle. Best candidate: a camp-recap post with real photos AFTER the July sessions run
  (weeks of 6/13/20 July) — real proof beats a generic pre-camp guide.
- Money pages: camps + programs + admissions/tuition descriptions done (2026-07-02).
  Remaining low-priority description candidates for the next pillar deep-audit:
  `about.astro`, `team.astro`, `contact.astro` (70 chars), `/news` index (62 chars).

## In progress (WIP)

(empty)

## Scheduled

- 2026-07-03 (after user deploys): verify live — `/holiday-camps` shows new title
  "Holiday Camps in English near Paris", program pages show new titles, FR pages
  resolve; then IndexNow ping `/holiday-camps`, `/early-years`, `/primary`,
  `/middle-school`, `/fr/admissions`, `/fr/stages-vacances` and confirm sitemap.
  Optionally run `seo-drift` toolbelt baseline right after.
- 2026-07-09: weekly measurement run (PostHog + GSC; first deltas vs the 2026-07-02
  baseline). Watch `/holiday-camps` position (16.2 at baseline) after the mode E upgrade.
- 2026-07-11: Summer 2026 camp week 1 (6–10 Jul) is over → freshness check on
  `/holiday-camps` + `/fr/stages-vacances` (expired week still shown as upcoming?
  fact change = user confirmation). Camp-recap post (P1) unblocks — ask user for real
  photos/anecdotes from week 1 (child-photo rules Bible #3).

## User actions (agent cannot do these)

1. **Deploy pipeline** — user said 2026-07-02 they will handle it "tomorrow" (2026-07-03).
   Until live-verified, pushed changes (incl. the FR pages + IndexNow key file) wait.
2. **Google Business Profile:** confirm claimed status + category/hours/NAP match
   `seo/_registry.json` `nap`. Agent will maintain a GBP post draft list here once
   confirmed.
3. **Bing Webmaster Tools** (optional but feeds ChatGPT retrieval): add site, verify,
   submit sitemap.

(Done 2026-07-02: GSC API unlock — OAuth login completed as koreal6803@gmail.com;
`gsc.api_ready=true`.)

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
| Measure (PostHog/GSC) | 7d | 2026-07-02 (baseline) |
| Site health sweep | 7d | 2026-07-02 |
| Keyword mining | 7d | 2026-07-02 (initial seed) |
| Local/GEO sweep | 30d | never |
| Pillar deep-audit | 30d | never |
| Core Web Vitals (toolbelt `seo-google`) | 30d | never |
| Freshness sweep | term boundaries | never |

## Iteration log

- 2026-07-02 (8) | Site-health sweep (first run, sub-agent over dist/): links/images/
  expired-dates/sitemap-coverage CLEAN. Fixed same-iteration: hreflang→canonical
  trailing-slash mismatch (normalized once in `Layout.astro`), thin descriptions on
  `/admissions` (80→151) + `/tuition` (76→153), campus-rental double-branded title +
  false "heart of Paris" → Mareil-Marly, `/survey/*` orphans noindexed + filtered from
  sitemap (new Layout `noindex` prop). Deferred: contact//news descriptions (low) →
  Needs fixing; late-July camp freshness → Scheduled 07-11. | Next: keyword mining is
  the most-overdue P3 not yet due; queue otherwise empty until 07-03 verify-live.
- 2026-07-02 (7) | P1 resolved: `welcome-new-school-year.md` ARCHIVED (decision: real
  dated school history stays; refresh would need unavailable 2026-27 facts and risk
  fake-freshness, delete is a user-only action). Implementation: `lint_allow`
  word_count with written reason (the existing mechanism IS the archive allowance — no
  lint code change), de-orphaned with an `/about` link. Lint PASS 0/0; build green.
  Policy note: §E review N/A when an archived post's prose is unchanged (nothing new to
  score); lint + build still mandatory. | Next: site-health sweep (P3, never run).
- 2026-07-02 (6) | claude-seo v2.2.0 suite (AgriciDaniel, 10.4k★, MIT) installed at user
  level after online comparison vs aaron-he-zhu/seo-geo-claude-skills + seranking (best
  fit: free-tier tooling, GSC/PSI integration, local+GEO skills). Loop skill tuned:
  toolbelt section, CWV periodic (30d), seo-drift post-deploy check, seo-sxo
  stalled-page rule; fixed stale "push = deploy" header. Old generic `seo-audit` skill
  backed up to `~/.claude/skills-backup/`. | Next: loop runs on schedule; site-health
  sweep (never run) is due.
- 2026-07-02 (5) | Programs pillar mode E: `early-years`/`primary`/`middle-school`
  keyworded titles + 124–156-char descriptions (location, curriculum), hero answer
  blocks, CTA interlinks (tuition + siblings + camps; pages previously linked only
  contact/admissions). Facts untouched (QA diff check). | Next: verify live after
  deploy, IndexNow with the 07-03 batch.
- 2026-07-02 (4) | P1 camps, phase 1: `/holiday-camps` live-accuracy verified (live =
  repo, Summer 2026 sessions current) + mode E upgrade shipped — keyworded title
  ("Holiday Camps in English near Paris"), 128-char description with location, answer
  block in hero (English / Mareil-Marly / open to all 2-12), H2 "Camp dates, hours and
  rates", new "Beyond the holidays" section linking all 3 program hubs + tuition +
  admissions (page had ZERO internal links before). All facts untouched (QA-gate diff
  check). Awaits user deploy → verify-live + IndexNow scheduled 07-03. | Next: mode E
  on programs pillar descriptions, or camp post per Needs-fixing note.
- 2026-07-02 (3) | GSC OAuth completed (user approved browser login; gotcha: gcloud
  rejects a custom `--scopes` list unless it also includes `cloud-platform` — the
  measurement.md command alone fails). First full baseline pulled (PostHog + GSC) →
  north-star block; `gsc.api_ready=true`. Data confirms P1: `/holiday-camps` pos 16.2 /
  25 imp is the only page-level striking-distance target. | Next: P1 camps — mode E
  audit of `/holiday-camps` + first camp post.
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
- System `python3` is 3.9; the claude-seo toolbelt venv uses Homebrew python3.11 at
  `~/.claude/skills/seo/.venv`. Toolbelt is machine-local (not in this repo) — loop
  falls back to manual procedures when absent.
