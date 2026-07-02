---
name: school-seo-content
description: Plan, write, optimize, and publish SEO content for the Forest International
  School Paris website (forest-international.com) so that parents of children aged 2-14
  in west Paris find the school for head terms like "international school paris",
  "english school saint-germain-en-laye", "english preschool paris", "summer camp paris
  english", and "forest school paris". Covers four surfaces - (1) blog/news articles
  (src/content/blog/en -> /news/<slug>, guide + news profiles, fact verification against
  canonical pages, English lint); (2) money-page on-page SEO (the .astro program pages:
  early-years, primary, middle-school, holiday-camps, admissions, tuition - titles,
  descriptions, headings, schema, internal links); (3) local SEO + AI-search GEO
  (Google Business Profile checklist, NAP consistency, llms.txt, being cited by
  ChatGPT/AI Overviews); (4) measurement (PostHog conversion events + Google Search
  Console). Use this skill for ANY content, SEO, keyword, blog, news, admissions-funnel,
  camp-promotion, or analytics-review work in this repo, even when the user doesn't say
  "SEO" - triggers include writing a post, school news, open day, holiday camp content,
  enrollment/admissions content, meta descriptions, structured data, keyword research,
  search rankings, PostHog or Search Console questions. Prefer this over generic
  content-strategy/copywriting/seo-audit skills here.
---

# Forest International School SEO Engine

End-to-end system for making forest-international.com the answer when west-Paris parents
search for English-language schooling (ages 2–14) or English holiday camps. Built on the
school's un-fakeable moat: **it is a real school** — real campus, teachers, fees, dates,
photos, and first-hand knowledge of schooling expat and bilingual children in France.
Generic AI education prose is commoditized; only ship pages that say something **only this
school can say**.

The project-root `CLAUDE.md` (the SEO Bible) is the single source of rules; this skill is
the operational workflow. Read it first. Mutable facts (hub routes, thresholds, PostHog
event names, rate caps) live only in `seo/_registry.json` — never copy them into prose.

## Pick the mode

| Task | Go to |
|---|---|
| Find topics / what to write next | **A. Discover** |
| Write a new article (guide or news) | **B. Produce** |
| Improve / refresh an existing post or page | **C. Optimize** |
| QA + ship | **D. Publish** |
| On-page SEO of the `.astro` money pages | **E** — read `references/site-pages-engine.md` |
| Local SEO / Google Business Profile / AI-search (GEO) | **F** — read `references/local-seo-geo.md` |
| Analytics review (PostHog / GSC) | **G** — read `references/measurement.md` |
| Plan strategy / personas / seasonal calendar | Read `references/seo-strategy.md`, then propose |

## A. Discover (flywheel ① → ②)

Run the keyword-gap miner — free Google autocomplete (English + French, gl=fr) crossed
against existing pages and posts, prioritized into a backlog:

```bash
python3 .claude/skills/school-seo-content/scripts/discover_keywords.py
# → writes seo/_backlog.json (uncovered intents, by pillar × intent layer)
```

Highest-ROI layers: **decision** ("international school paris west", "how to choose",
"fees") where inquiries happen, and **seasonal** (camps: content must be live 2–3 months
before each holiday — see the calendar in `references/seo-strategy.md`). Add GSC
position-5–20 queries when credentials are available (small push → page 1). French-language
queries go to the backlog tagged `fr` but are **user-decision only** (site is currently
English-only; see Bible §7).

## B. Produce an article (flywheel ③ → ④ → ⑤)

1. **Pick from backlog** (`seo/_backlog.json`); confirm intent and owning pillar/hub.
2. **Anti-cannibalization** — grep `src/content/blog/` AND `src/pages/*.astro` for the same
   intent. Program pages are canonical for their head intents (Bible #4): a post may
   support them on long-tail intents, never compete head-on.
3. **Build the fact pack FIRST (the moat):** every school fact (fee, date, age range, hour,
   staff name, policy) extracted from the canonical `.astro` pages, with file:line noted.
   A fact you cannot source = a question for the user, not a sentence in the draft
   (Bible #2). Real photos: only paths already in `public/images/`.
4. **Re-read `references/article-checklist.md` immediately before writing and meet every
   item** (guides §A, news §B). That file is the ONLY full spec — never write from memory
   or a summarized brief. Word counts are floors with an anti-padding rule attached.
5. **Interlink** per checklist §D: post → hub page, hub gets a back-link where natural
   (hubs are `.astro` pages — mode E edit). Verify every internal link target exists.
6. **Lint + independent review** before anything ships (see D).

Delegation: writers may be sub-agents, but the brief must include the checklist path and
the fact pack; YOU run the lint and spawn a separate §E reviewer (Bible delegation rule).

## C. Optimize an existing post or page

Refresh beats duplicating (Bible #4, #7, #9). For posts: update facts from canonical pages,
add internal links, upgrade thin sections, re-lint, re-publish with real `updated` date only
when substance changed. For seasonal pages (camps): dates/fees refresh is a **money-page
fact change → user confirmation first**, then mode E. Prune: a post with no impressions
after 90+ days and no supporting role → merge or delete per Bible #9.

## D. Publish + QA (flywheel ⑥)

Always lint first:

```bash
python3 .claude/skills/school-seo-content/scripts/lint_article.py src/content/blog/en/<slug>.md
```

Then spawn an **independent review sub-agent** that re-reads the article, re-runs lint, and
scores every item in `references/article-checklist.md` §E true/false — any false =
needs_more_work; never accept the writer's self-report. Then follow
`references/publishing.md`: build → commit/push (auto-deploys) → poll live URL → sitemap
check → IndexNow → T+7 GSC verification. Respect the publish-rate cap in `seo/_registry.json`.

> ⚠️ Autonomy follows Bible §7: quality gate fully green → commit/push/IndexNow without
> asking. Money-page facts, new child photos, GBP/GSC console actions, French relaunch —
> always user-confirmed.

## E. Money pages (the .astro program/admissions pages)

The program pages carry the head terms — most SEO wins here are on-page fixes, not new
content. Full spec (per-page title/description targets, heading structure, schema,
internal-link map, fact-source table): **`references/site-pages-engine.md`**.

## F. Local SEO + AI search (GEO)

A school is a local business: Google Business Profile, NAP consistency, local citations,
"near me" queries — plus making the site the source AI assistants cite for west-Paris
school questions. On-site work is autonomous; anything touching external consoles/profiles
becomes a user-action list. Full playbook: **`references/local-seo-geo.md`**.

## G. Measurement

```bash
node scripts/measure-posthog.mjs        # organic sessions + conversion events (key in .env)
node scripts/measure-gsc.mjs            # GSC queries/pages (needs service-account setup, see reference)
```

Snapshots land in `seo/metrics/`. Read `references/measurement.md` for the KPI definitions
(organic-attributed inquiries first, rankings second), the PostHog HogQL recipes, and the
GSC credential setup. Opportunity ranking is conversion-weighted: pages that produce
`apply_click`/`contact_form_click` outrank pages that merely get traffic.

## Bundled resources

- `references/article-checklist.md` — **the ONLY full writing spec**: guide profile (§A), news profile (§B), titles/meta (§C), links (§D), independent-review rubric (§E), tone & banned phrases (§F). Re-read before writing AND use as the review rubric.
- `references/seo-strategy.md` — pillars, personas, competitor landscape, seasonal content calendar, intent layers.
- `references/site-pages-engine.md` — mode E: on-page SEO for the `.astro` money pages, schema, fact-source table.
- `references/local-seo-geo.md` — mode F: GBP checklist, NAP, local citations, llms.txt, AI-citation tactics.
- `references/publishing.md` — content model, frontmatter, images, build/deploy (push = deploy), IndexNow, GSC verify, publish checklist.
- `references/measurement.md` — mode G: KPI definitions, PostHog recipes, GSC setup, weekly measurement SOP.
- `scripts/discover_keywords.py` — EN/FR autocomplete keyword-gap miner → `seo/_backlog.json`.
- `scripts/lint_article.py` — pre-publish hard-rule linter (frontmatter, length, links, banned phrases, fact flags).
