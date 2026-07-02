# Forest International School — SEO Bible (read before touching any content)

> **Single mission:** when a parent in west Paris searches for an English-language education for a child aged 2–14 — "international school paris", "english school near saint-germain-en-laye", "summer camp paris english" — Google and AI assistants should surface Forest International School Paris (forest-international.com).
>
> **One-line doctrine:** the moat is that this is a REAL school. Generic AI prose about education is worthless (anyone can generate it). What competitors and content farms cannot fake: our real campus in Mareil-Marly, real teachers, real term dates, real transparent fees, real photos, real events, first-hand knowledge of raising and schooling children in west Paris. Every content decision asks: **"does this page contain something only this school can say?"** If no → don't ship it.

Anything that adds, edits, restructures, or deletes content in this repo (`src/content/blog/`, `src/pages/*.astro`, schema, internal links) must follow these rules. This file overrides personal preference; if a user instruction conflicts with it, stop and confirm. Mutable facts (hub routes, thresholds, event names) live only in `seo/_registry.json` — never re-copy them into prose.

> **🔒 Delegation rule (applies equally to sub-agents/workflows):** this bible binds every sub-agent you spawn. When delegating writing, the brief must require reading `.claude/skills/school-seo-content/references/article-checklist.md` and meeting every item. After delivery YOU run `lint_article.py` + an independent §E review; never trust a sub-agent's self-report.

---

## 0. The Ten Commandments (violating any = direct SEO or real-world harm)

1. **Information-gain mandate:** no page ships without something Google's page 1 doesn't have — real school specifics (a real week's schedule, real photos, actual fees, staff voices) or genuine first-hand local knowledge (navigating French school systems as an expat family). Generic "benefits of bilingual education" filler is a liability, not an asset.
2. **Facts must trace to a canonical source (the school's "no fabricated numbers"):** fees, dates, ages, hours, staff names, policies come ONLY from the live canonical pages (`tuition.astro`, `holiday-camps.astro`, `admissions.astro`, `team.astro`) or explicit user confirmation. Never invent, extrapolate, or "reasonably assume" a fact about the school. Wrong fee/date = a misled parent = trust destroyed. When a needed fact isn't on the site, ask the user; do not publish around it.
3. **Child safety & privacy (non-negotiable):** no children's names paired with photos, no personal data of pupils or families, only images already published under `public/images/`. Introducing a NEW photo of children requires explicit user approval (parental-consent status is not knowable from the repo). GDPR + safeguarding beat every SEO consideration.
4. **No cannibalization — but an upgrade is not cannibalization:** the program pages (`/early-years`, `/primary`, `/middle-school`, `/holiday-camps`, `/admissions`) are the canonical pages for their intents. Blog posts support them, never compete (a post targeting "english preschool paris" head-on fights `/early-years` — differentiate onto a long-tail intent or improve the program page instead). Before creating any page, grep existing pages + posts for the same intent; if a clash exists: merge, differentiate, or upgrade-and-redirect. One live page per intent, always.
5. **No orphan content:** every post links to its hub page (program page or `/admissions`), and hubs link back to their best supporting posts. Unlinked content = no SEO value.
6. **Publish = full indexing loop, or it doesn't count:** build passes → push (auto-deploys) → poll live URL 200 → sitemap contains it → IndexNow ping (Bing = ChatGPT retrieval) → GSC inspection at T+7. Details: skill `references/publishing.md`.
7. **Freshness is seasonal and real:** camp dates, term dates, fees change every season — refresh them the moment the user confirms new values, and mark "as of <month year>". Never fake freshness (date bumps without real change) and never let a stale date sit (an expired camp date on page 1 loses the family AND the ranking).
8. **Entity consistency:** name ("Forest International School Paris"), address (28 Rue de Tour d'Echelle, 78750 Mareil-Marly), phone (+33 6 32 72 51 45), email — identical across every page, the JSON-LD in `Layout.astro`, and Google Business Profile. NAP mismatch quietly kills local rankings.
9. **Quality over volume + prune bravely:** a small school site with 25 excellent pages beats 200 thin ones. Publish-rate cap lives in `seo/_registry.json`. Merge/delete thin posts (with redirects) as part of normal hygiene.
10. **Content is for parents, not for agents:** no internal jargon in copy (pillar/hub/SEO/keyword/conversion), no AI-tone phrases ("Let's dive in", "nestled in the heart of", "look no further"), no brief residue, no superlative claims without a source ("the best school in Paris"). Warm, concrete, British English (the site's register), written like the head of school talking to one parent. `lint_article.py` hard-blocks the worst offenders.

---

## 1. North-star KPI (what "winning" means)

Not raw traffic. **(a)** Organic-attributed inquiries: PostHog conversion events (`apply_click`, `contact_form_click`, `whatsapp_click`, `email_click`, `phone_click` — full list in `seo/_registry.json`) from search-engine referrers; **(b)** share of SERP page 1 for the head terms across the three clusters; **(c)** AI-assistant citation: when ChatGPT/Perplexity/AI Overviews answer "international schools west of Paris", Forest is named.

## 2. Three pillars (hub-and-spoke)

| Pillar | Head intents | Hub page(s) | Spokes (blog posts under `/news/`) |
|---|---|---|---|
| **Choosing a school in Paris West** | international school paris (west) / english school yvelines / admissions | `/admissions` (+ homepage) | school-choice guides, French vs international systems, relocation-with-kids guides, open-day posts |
| **Programs by age (2–14)** | english preschool paris (2–5) / english primary school paris (6–11) / middle school (11–14) / forest school & nature-based learning | `/early-years`, `/primary`, `/middle-school` | curriculum explainers, nature-pedagogy posts, a-day-in-the-life posts |
| **Camps & activities** | summer camp paris english / holiday camp kids paris / wednesday activities english | `/holiday-camps` | seasonal camp posts (each season), MasterClasses posts, camp-recap posts (real photos = proof) |

Seasonality is strategy: admissions content peaks Sep–Mar, camp content must be live 2–3 months before each holiday, relocation queries peak Apr–Aug. The loop's calendar lives in skill `references/seo-strategy.md`.

## 3. Standard operating procedure for any article

The ONLY full writing spec is `.claude/skills/school-seo-content/references/article-checklist.md` (guide profile §A, news profile §B, review rubric §E). Re-read it before writing; no file re-copies its numbers. Non-skippable steps: pick intent from `seo/_backlog.json` → anti-cannibalization grep → verify every fact against canonical pages (#2) → write → `lint_article.py` green → independent §E sub-agent review → publish loop (#6).

## 4. The engine (flywheel)

```
① demand mining → ② backlog → ③ fact pack → ④ write → ⑤ quality gate → ⑥ publish+index
 (autocomplete/GSC/    (seo/_backlog     (real facts from     (skill      (lint + §E       (build/push/verify/
  seasonal calendar)      .json)          canonical pages)     brief)      review)          IndexNow)
        ▲                                                                                        │
        └────────── ⑧ maintain/refresh/prune ◀── ⑦ measure (PostHog + GSC weekly) ◀─────────────┘
```

## 5. Cadence & incident brake

| Cycle | Action |
|---|---|
| **Weekly** | measure (`scripts/measure-posthog.mjs`, `scripts/measure-gsc.mjs` when credentialed) → deltas into `seo/_state.md`; mine keywords → backlog; produce the week's content (cap in `seo/_registry.json`) |
| **Monthly** | one pillar deep-audit: internal links, cannibalization, on-page SEO of the hub `.astro` page; local-SEO checklist (GBP items → user-action list) |
| **Seasonal (term boundaries)** | freshness sweep: camp/term dates, fees, popup config in `Layout.astro`; prune/merge thin posts |
| **Incident (any time)** | organic clicks −30% day-over-day, or a hub page drops >5 positions on a head term → FREEZE publishing, diagnose (GSC manual actions, indexing report, core-update calendar) before any new content ships |

## 6. File & tool map

| Need | Use |
|---|---|
| Mutable facts (hubs, thresholds, event names) | `seo/_registry.json` (single source) |
| Topic queue | `seo/_backlog.json` |
| Loop memory | `seo/_state.md` |
| Writing spec (only full text) | `.claude/skills/school-seo-content/references/article-checklist.md` |
| Strategy / personas / seasonal calendar | skill `references/seo-strategy.md` |
| Money-page (.astro) on-page work | skill `references/site-pages-engine.md` |
| Local SEO + AI search (GEO) | skill `references/local-seo-geo.md` |
| Publish SOP | skill `references/publishing.md` |
| Measurement (PostHog/GSC) | skill `references/measurement.md` + `scripts/measure-*.mjs` |
| Keyword mining | `.claude/skills/school-seo-content/scripts/discover_keywords.py` |
| Pre-publish lint | `.claude/skills/school-seo-content/scripts/lint_article.py` |
| IndexNow ping | `scripts/indexnow-submit.mjs` |
| Blog content | `src/content/blog/en/<slug>.md` → renders at `/news/<slug>` |

## 7. Autonomy grant & boundaries (set up 2026-07-02 at user request; user: koreal6803@gmail.com)

The SEO loop (`/school-seo-loop`) runs autonomously in THIS repo: once the quality gate fully passes it may commit, push origin main (= production deploy), ping IndexNow, and update state files without per-action approval. In exchange:

- **The quality gate is the only key:** lint green + independent §E review + publish-rate cap (`seo/_registry.json`) + `npm run build` passes. Any failure → stays draft, no exceptions.
- **Brake beats throttle:** incident signals (§5) freeze publishing automatically; 2 consecutive failures on one item → mark blocked, switch work.
- **Money-page guard:** changing FACTS on `tuition.astro`, `admissions.astro`, `holiday-camps.astro`, `team.astro`, or the popup (fees, dates, staff, policies) ALWAYS requires user confirmation first. SEO metadata (title/description/schema/internal links/alt text) on those pages is autonomous.
- **Never autonomous:** new photos of children (#3), GBP/GSC console UI actions, new credentials, deleting live pages, French-language relaunch (strategic decision, see state file).
- Secrets stay in `.env` (gitignored; this repo is PUBLIC on GitHub). Never write keys into committed files.

## 📝 Maintenance

Rules are defined once: mutable facts only in `seo/_registry.json`; writing spec only in `article-checklist.md`; this file stays ≤140 lines and holds rules + pointers only. Changing any referenced value: `grep -rn '<old>'` across the repo and fix all hits in the same commit. `AGENTS.md` points here — keep it that way.
