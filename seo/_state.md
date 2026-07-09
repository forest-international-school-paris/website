# SEO Loop State — forest-international.com

> Memory of the autonomous loop (`/school-seo-loop`). Every iteration reads this first
> and updates it last. Rules live in root `CLAUDE.md`; thresholds in `seo/_registry.json`.

## North star (latest measurement)

**2026-07-09** — GSC 2026-06-09..07-07 (`seo/metrics/gsc-2026-07-09.json`). **27 clicks /
616 imp / 102 queries** — big growth vs the 44-imp June baseline (site now indexed &
shown widely). **The whole story is a click gap, and it splits in two:**
- **Position problem (slow fix):** the high-volume generic terms are on page 3–4, so no
  snippet edit earns a click yet. `choose-school` ("international school paris",
  "international schools in paris", "…paris fees") = **204 imp / 0 clicks / pos 31.3**;
  `camps` 44 imp / pos 29.1; `local` 10 imp / pos 25.1. These need ranking gains
  (content depth + internal links + authority) — a months-long job, not a quick win.
- **Snippet problem (fast fix, actioned this iter):** near-brand terms are already on
  page 1 but barely clicked — "international forest school" pos 7.5 (59 imp, 1 clk),
  "ecole forest" pos 6.4 (12 imp, **0 clk**), "forest school paris" pos 6.3 (22 imp,
  2 clk), "forest school" pos 11.4. Homepage (1119 imp, pos 13.4) titled itself
  "International **Nature** School in Paris West" — niche framing that buries recognition.
- Brand cluster healthy: 23 clk / pos 4.3. Page-level: `/` 49clk/1119imp/pos13.4,
  `/holiday-camps` 10clk/313imp/pos13.4, `/admissions` **0clk/200imp/pos16.2** (visible
  but no clicks — next snippet target), `/tuition` 2clk/65imp/pos18.
- Striking-distance (4) → backlog `source: striking-distance`.

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

- **Modern image delivery (re-measured 2026-07-03 — now LOW priority):** after the
  07-02 JPEG recompression the remaining WebP win is modest (hero-banner −36% 198→129KB,
  gallery-2 −18%, campus −21%; children-diversity is −4% i.e. WebP is LARGER, skip it).
  Not worth bolting `<picture>` onto the homepage the user is actively redesigning —
  best done via Astro's `<Image>`/`<Picture>` component as part of their UI work (auto
  WebP+srcset). ~~`activities.png`~~ DONE 2026-07-03: 550KB PNG → 86KB optimized JPEG
  (−84%) + `loading="lazy"`, PNG removed. Remaining PNGs (logos, inst_savio) are small
  and correctly PNG.
- ~~First camp-focused post~~ DONE by user + REVIEWED 2026-07-03: `summer-school-paris-
  2026-english-camp.md` live, lint-clean, differentiated (experiential day-in-the-life,
  links back to `/holiday-camps` hub — not cannibalizing). A real-photo recap after the
  July sessions remains the strongest NEXT camp angle.
- **Watch (07-09 measurement):** `english-school-paris-pre-elementary-primary` has a
  head-term-y title ("English School Paris: Pre-Elementary & Primary"). Reviewed as OK
  now (it's a comparison/choose-school guide, heavy hub linking to /early-years,
  /primary, /admissions, /tuition — supports, doesn't compete). But if GSC shows it
  splitting impressions with `/early-years` or `/primary` on transactional queries,
  differentiate its title.
- ~~Thin descriptions~~ DONE 2026-07-03: `/contact` (70→157), `/news` (63→147),
  `/about` (101→159) rewritten to 110-160 with canonical positioning. (`/team` was
  already fine at 136 — earlier note was wrong.) All money/program page descriptions
  now within range.

## In progress (WIP)

(empty — user's content session settled 2026-07-03; all committed to origin `d4c2d82`,
reviewed below. FR-relaunch confirmation still pending — see User decisions.)

## Scheduled

- ~~2026-07-03 verify-live~~ DONE EARLY 2026-07-02 ~18:00: deploy landed same evening;
  all pages verified live, sitemap = 15 URLs (survey excluded), IndexNow 202 for 11
  URLs, homepage Lighthouse live: perf 84 / LCP 3.7s (was 66 / 14.9s).
- ~~ASAP after next deploy: verify FR link live + IndexNow~~ DONE 2026-07-03 ~01:00:
  both `/admissions` + `/holiday-camps` show the "Voir cette page en français" link
  live; IndexNow HTTP 200 for both.
- ~~verify + IndexNow `/contact`, `/news`, `/about` descriptions~~ DONE 2026-07-03
  ~03:50: all 3 live, IndexNow HTTP 200.
- 2026-07-09: weekly measurement run (PostHog + GSC; first deltas vs the 2026-07-02
  baseline). Watch `/holiday-camps` position (16.2 at baseline) after the mode E
  upgrade. Also T+7 GSC URL inspection (Bible #6) for the changed pages:
  `measure-gsc.mjs --inspect` on `/`, `/holiday-camps`, `/fr/admissions`,
  `/fr/stages-vacances`.
- **ASAP after next deploy: verify homepage + /admissions snippets live + IndexNow.**
  New titles: `/` = "English-Language School in West Paris, Ages 2–14"; `/admissions` =
  "Admissions — Apply to an English School in West Paris". Confirm live, then
  `node scripts/indexnow-submit.mjs https://forest-international.com/ https://forest-international.com/admissions/`.
  T+7 (2026-07-16) GSC re-check: did near-brand CTR (international forest school, forest
  school paris, ecole forest) lift on `/`, and did `/admissions` (pos 16.2) draw any clicks?
- 2026-07-11: Summer 2026 camp week 1 (6–10 Jul) is over → freshness check on
  `/holiday-camps` + `/fr/stages-vacances` (expired week still shown as upcoming?
  fact change = user confirmation). Camp-recap post (P1) unblocks — ask user for real
  photos/anecdotes from week 1 (child-photo rules Bible #3).

## User actions (agent cannot do these)

1. **Deploy pipeline** — a deploy LANDED 2026-07-02 ~18:00 (all 12 pushed commits live,
   IndexNow key file serving). Open question for user: was this a manual school-side
   deploy or is git-connected auto-deploy now enabled? Determines whether the loop can
   verify-live in the same iteration or must keep scheduling follow-ups.
2. **Charset header (found 2026-07-02, verified live):** server sends `Content-Type:
   text/html` without `charset=utf-8`, so default-decoding AI/scraper pipelines corrupt
   `€` prices and dashes (e.g. "450â¬/week" on `/holiday-camps`). One-line fix in the
   school's Cloudflare config: always send `text/html; charset=utf-8`.
3. **Google Business Profile:** confirm claimed status + category ("International
   school" primary; "Preschool", "Summer camp organizer" secondary) + hours + NAP =
   `seo/_registry.json` `nap`. Ready-to-paste GBP post (facts from `/holiday-camps`):
   "Summer Camp 2026 at Forest International School Paris — English-language camp for
   children aged 2-12 on our forest campus in Mareil-Marly. Weekly sessions: 6-10 July,
   13-17 July (excl. 14th), 20-24 July. Daily 10am-5pm, 425 €/week.
   https://forest-international.com/holiday-camps/"
4. **Social profiles for `sameAs` + entity graph:** Instagram added (site's own
   published handle). Provide real URLs if they exist: LinkedIn, Facebook, YouTube —
   and where the homepage video is hosted (if YouTube, exposing that link is a strong
   AI-citation signal).
5. **Directory citations** (submission text = `canonical_blurb` in `seo/_registry.json`):
   international-schools-database.com, expatica.com, angloinfo.com (Paris/IdF), Message
   Paris. NAP exactly as registry.
6. **Bing Webmaster Tools** (optional but feeds ChatGPT retrieval): add site, verify,
   submit sitemap.
7. **Submit sitemap in GSC (2026-07-09):** GSC "Sitemaps" report shows none submitted.
   robots.txt already advertises it and it serves 200, so Google can discover it — but
   submitting explicitly speeds discovery + unlocks coverage reporting. GSC → Sitemaps →
   add `sitemap-index.xml` → Submit. (Console action = user; loop can also push via the
   GSC Sitemaps API on request since OAuth is set up.)
8. **Cloudflare redirect hygiene (2026-07-09, diagnosed from GSC "Page with redirect"):**
   the "Page with redirect" entries are EXPECTED — non-canonical variants (`http://`,
   no-trailing-slash, `/index.html`) correctly redirect to the canonical `https://` +
   trailing-slash pages (which serve 200 and carry `<link rel=canonical>` to themselves).
   Not a bug; don't try to index those. TWO optional edge improvements on the school's
   Cloudflare account: (a) the normalization redirects are **307 (temporary)** — canonical
   redirects should be **301/308 (permanent)** so Google consolidates signals faster;
   (b) `http://…/admissions` redirects to `http://…/admissions/` (stays HTTP) → enable
   **"Always Use HTTPS"** for a clean single-hop http→https 301. Both LOW priority (Google
   already follows 307s); can't be fixed in-repo (no `_redirects`; it's edge behavior).

(Done 2026-07-02: GSC API unlock — OAuth login completed as koreal6803@gmail.com;
`gsc.api_ready=true`.)

## User confirmations (site fact inconsistencies found 2026-07-02 — Bible #2/#8)

- **Camp ages:** resolved — `/holiday-camps`, FR camp pages, `llms.txt`, and the
  homepage camp promo now all use the canonical camp range: children aged 2-12.
- **Admissions age ceiling:** `/admissions` Key Information says "up to 15 years";
  `/about` and homepage say ages 2-14. Which is the real ceiling?
- **Phone NAP mismatch:** footer + README show +33 1 39 16 87 35; JSON-LD + WhatsApp
  button use +33 6 32 72 51 45. Both may be real (landline vs mobile) but the JSON-LD
  and GBP should use one consistent primary number.
- **Third phone variant (found 2026-07-02):** `campus-rental.astro` uses
  +33 6 32 72 71 45 twice (WhatsApp link + display) — one digit off the canonical
  mobile. Separate rentals line, or a typo that loses rental inquiries? If typo, fix to
  +33 6 32 72 51 45.

## User decisions (open strategy questions — do not act without answer)

- **Deploy pipeline (BLOCKS full loop autonomy):** pushes to origin/main do NOT go live
  automatically (tested 2026-07-02: IndexNow key file pushed, still 404 after 25 min,
  while June/July commits are live — school side likely deploys manually). Until
  resolved, the loop pushes content and schedules "verify live" follow-ups. Options:
  (a) school enables git-connected auto-deploy on their Cloudflare account,
  (b) user gets deploy access (added to the school's CF account / API token),
  (c) status quo: school deploys on their rhythm, loop verifies afterwards.

- **French section — EXPANDING (user-driven, 2026-07-03).** Beyond the two FR landing
  pages, the user has committed a FR blog guide (`blog/fr/ecole-anglaise-paris-maternelle-
  primaire.md`), a FR news route (`/fr/news/[...slug]`), and aligned `/fr/stages-vacances`
  (commits `706e1bd`, `d4c2d82`). All live, hreflang-paired with EN twins, in sitemap.
  This is a de-facto French relaunch by the user's own hand. **PENDING: explicit confirm**
  (asked 2026-07-03) that the loop should treat FR as an approved ACTIVE pillar —
  i.e. IndexNow FR pages, measure FR queries, keep FR facts in sync. Until confirmed:
  loop indexes EN only (FR still gets organic crawl since live + in sitemap), and never
  AUTHORS new FR pages autonomously. Note: FR fee/date facts must mirror the canonical
  EN pages exactly (Bible #8) — verify on next FR touch.

## Periodic last-run

| Task | Cycle | Last run |
|---|---|---|
| Measure (PostHog/GSC) | 7d | 2026-07-09 (GSC done; PostHog pending) |
| Site health sweep | 7d | 2026-07-02 |
| Keyword mining | 7d | 2026-07-02 (initial seed) |
| Local/GEO sweep | 30d | 2026-07-02 |
| Pillar deep-audit | 30d | never |
| Core Web Vitals (local Lighthouse; PSI keyless = quota-flaky) | 30d | 2026-07-02 |
| Freshness sweep | term boundaries | never |

## Iteration log

- 2026-07-09 (21) | Second snippet fix (user: "please do it"): `/admissions`
  (200imp/0clk/pos16.2). Title "Admissions" → "Admissions — Apply to an English School
  in West Paris"; description now leads with apply + english-language + Mareil-Marly/west
  Paris + real on-page differentiators (year-round admissions, no birthday cut-off, book
  a visit). Deliberately NO age number — admissions page says "2 to 15" (unresolved vs
  homepage/about "2–14", see User confirmations) so kept it out to avoid riding a
  conflicting fact. Metadata-only, facts all on-page. Build 21pp green, verified in dist.
  | Verify-live + IndexNow `/admissions` folded into the next-deploy scheduled item.
- 2026-07-09 (20) | Weekly measurement (due today) + acted on the finding. GSC 27clk/
  616imp/102q — click gap diagnosed as position-problem (generic terms pos ~31, page 3-4,
  no snippet fix helps) vs snippet-problem (near-brand terms page-1 but ~0 CTR). Fixed the
  highest-leverage snippet: homepage `<title>` "International **Nature** School in Paris
  West" → "English-Language School in West Paris, Ages 2–14" + rewrote meta description
  (concrete: english-language, Mareil-Marly/west Paris, ages 2–14, nature-based,
  transparent fees, forest campus since 2003). Metadata-only, non-money page, facts all
  canonical. Build 21pp green, rendered snippet verified in dist. 4 striking-distance
  queries → backlog. | Verify-live + IndexNow homepage after deploy (Scheduled).
  Next snippet target: `/admissions` (200imp/0clk/pos16.2). Position-problem clusters need
  a content/authority plan (not a one-iteration fix). Optimized `activities.png` on `/about`: 550KB→86KB JPEG (−84%,
  RGB no-alpha so JPEG is safe), added `loading=lazy`, removed the PNG, single ref
  updated. Build 21pp green, no dangling refs. Last standing image-payload monster gone.
  | Verify-live DONE ~05:26: activities.jpg 200, old .png 404, IndexNow 200. Autonomous
  queue now EMPTY (all image + description P1s cleared). Next work is user-gated (FR) or
  dated (07-09 measure, 07-11 camps). Loop stopping frequent polling per pacing rule.
- 2026-07-03 (18) | Scheduled verify-live: deploy landed, `/contact` `/news` `/about`
  new descriptions live → IndexNow 200. Publish loop closed. Remaining autonomous queue
  is low-value only (activities.png WebP; general WebP downgraded) — holding to avoid
  over-churning the user's active design project. | Next: FR decision (user), 07-09
  measurement, 07-11 camps. Idling.
- 2026-07-03 (17) | Idle queue (FR pending user, nothing due till 07-09) → took two P1
  items. (a) Re-measured the WebP P1: post-recompression win is modest (hero −36%, others
  18-21%, children-diversity worse) → downgraded to LOW, best via Astro <Image> in the
  user's UI work; cleaned up test files. (b) Fixed thin descriptions: `/contact` 70→157,
  `/news` 63→147, `/about` 101→159 (canonical positioning, no facts, descriptions-only
  diff, build 21pp green). | Next: verify live + IndexNow the 3 pages after deploy; FR
  still pending; 07-09 measurement.
- 2026-07-03 (16) | User's content wave settled (committed `706e1bd`+`d4c2d82`, tree
  clean, live). REVIEWED it: all 4 EN posts lint-clean (0/0), build 21 pages, all in
  sitemap, hreflang correct (new EN pre-elementary post ↔ FR twin reciprocal), none
  orphaned (2-3 inbound links each). Anti-cannibalization (Bible #4): both risk posts OK
  — summer-camp post is experiential + links to hub; pre-elementary is a comparison guide
  with heavy hub linking. Ran EN publish loop: IndexNow 200 for the 3 new posts + changed
  `/admissions`, `/holiday-camps`, `/news`. Held FR IndexNow pending explicit relaunch
  confirm (asked). | Next: on user's FR answer, flip the decision + IndexNow FR; else
  07-09 measurement.
- 2026-07-03 (15) | Loop woke to a busy tree: user shipped nav redesign (`292a9bc`),
  SEO articles (`222d876`), MasterClass buttons (`c8ec8f7`) — all on origin, in sync.
  Large uncommitted user WIP in flight (new EN article, FR blog + FR news routes,
  ArticleTableEnhancer, lint/config edits). HELD all autonomous work to avoid colliding
  with the active session; recorded WIP + 🚩FR-relaunch red-line flag; committed only
  this state file. Nothing due today (next: 07-09 measure, 07-11 camps). | Next: once
  user's WIP is committed/settled, review new articles (Bible #4 anti-cannibalization +
  §E + lint) and confirm FR-relaunch direction before any FR indexing.
- 2026-07-03 (14) | FR-link deploy landed → verified live on both counterparts +
  IndexNow 200. Found user's uncommitted local work: shipped the confirmed camp-age fix
  (homepage promo 2-14→2-12, matching canonical `/holiday-camps`; live still showed the
  wrong 2-14) + state note. LEFT the nav redesign uncommitted (WIP; asked user, no reply
  in 60s → conservative: don't auto-ship substantial UI). | Next: user to confirm nav;
  queue date-gated (07-09 measurement, 07-11 camps).
- 2026-07-03 (13) | FR discoverability (user picked option A): added visible
  "🇫🇷 Voir cette page en français" hero button on the 2 EN counterparts →
  `/admissions`→`/fr/admissions`, `/holiday-camps`→`/fr/stages-vacances`. Closes the
  EN→FR gap (previously only footer + machine hreflang; header nav stays EN-only by
  design — full bilingual relaunch still NOT approved). Link-only, money-page facts
  untouched (QA diff). | Next: verify live + IndexNow the 2 pages; queue still date-gated
  (07-09 measurement, 07-11 camps).
- 2026-07-02 (12) | Deploy landed (~18:00) → verify-live executed early: all changed
  pages + FR pages serve new content, sitemap 15 URLs (survey excluded ✓), IndexNow
  HTTP 202 for 11 URLs (key file now serving), live homepage Lighthouse **84 perf /
  3.7s LCP** (from 66 / 14.9s pre-fix — CDN beats the local 5.8s estimate). Publish
  loop (Bible #6) fully closed for all 2026-07-02 work. | Next: date-gated (07-09
  measurement + T+7 inspections, 07-11 camps freshness/recap); WebP/srcset + pillar
  deep-audit for a fresh session. Loop idles.
- 2026-07-02 (11) | CWV baseline (first run; keyless PSI 429'd → local Lighthouse via
  system Chrome). Live mobile: homepage perf 66 / **LCP 14.9s** (gallery-2.jpg was
  7.2MB!), programs ~89 / ~3.1s, camps 79 / 4.3s. Fixed same-iteration: Pillow
  recompression (gallery-2 −96%, hero −25%, 4 more), homepage below-fold `loading=lazy`,
  hero `fetchpriority=high` → local build perf 74 / LCP 5.8s. WebP/srcset follow-up →
  Needs fixing. Snapshot: `seo/metrics/cwv-2026-07-02.json`. | Next: queue is
  deploy-gated (07-03 verify) + date-gated (07-11 camps); pillar deep-audit is the only
  free P3 — defer to a fresh session, idle down.
- 2026-07-02 (10) | GEO answer blocks shipped (P1 from audit): homepage welcome ¶ now a
  direct answer block (English-language, ages 2-14, Mareil-Marly near
  Saint-Germain-en-Laye, west of Paris, ENC); vague hero "heart of Paris west" →
  "Mareil-Marly, west of Paris"; admissions hero + process intro gained location + a
  year-round/fees pointer linking `/tuition`; early-years hero now names
  Saint-Germain-en-Laye. Main-content mentions of Saint-Germain-en-Laye: 1→4 pages.
  Facts untouched (QA diff). | Next: CWV periodic (30d, never) or pillar deep-audit.
- 2026-07-02 (9) | Local/GEO sweep (mode F, first run; live-site audit via seo-geo
  toolbelt agent). Shipped: `public/llms.txt` created (was 404 live; facts from
  registry/canonical pages only), Instagram added to empty JSON-LD `sameAs`. Found →
  state: GEO answer-block gap on homepage/admissions + zero "Saint-Germain-en-Laye" in
  main copy outside /holiday-camps (Needs fixing P1); charset-header corruption of €
  prices, GBP post draft, directory list, social-profile URLs (User actions); third
  phone variant on campus-rental (User confirmations). Robots.txt: all AI crawlers
  allowed ✓; JSON-LD NAP consistent ✓ (foundingDate 2003). REJECTED from audit: Review
  schema on own testimonials (self-serving review markup violates Google guidelines).
  | Next: GEO answer blocks (new P1 top) or CWV periodic.
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
