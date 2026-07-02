# Article SEO + Quality SOP (every post must pass; the ONLY full writing spec)

> This file is the **single full text** of the writing spec (Bible §3). Other files link
> here; spec changes happen here only. Before writing, re-read this table; before
> publishing, run `scripts/lint_article.py` + an independent sub-agent review scoring §E.
>
> **Qualitative judgment overrides every numeric quota (anti-Goodhart):** every number
> below (word counts, link counts, FAQ counts) is a floor, not a target. **Padding to hit
> a number = Helpful-Content-System demotion risk — shorter beats watered-down.** Test:
> if deleting a paragraph loses no information, that paragraph is padding (§E
> `no_quota_padding` catches it).

Posts live at `src/content/blog/en/<slug>.md`, render at `/news/<slug>`. Slug: lowercase
english + digits + `-`. Frontmatter `type` selects the profile: `guide` (evergreen SEO
piece) or `news` (event/announcement). Default when absent: `news`.

## A. Guide profile (evergreen posts that target a search intent)

| # | Requirement | Why (what loses without it) | lint |
|---|---|---|---|
| 1 | **≥ 1,000 words** (head-term guides aim 1,500–2,500; anti-padding rule above governs) | Thin guides can't beat established parenting/education sites; but a padded 2,000-worder loses to a tight 1,200 | **hard** <1,000 |
| 2 | **Every school fact traceable** to a canonical page (`tuition.astro`, `holiday-camps.astro`, `admissions.astro`, `team.astro`, `about.astro`) or explicit user confirmation. No invented fees, dates, ages, hours, staff, policies. Cite the section when referencing (e.g. link `/tuition`) | Bible #2 — a wrong fee or date misleads a real parent; this is the school's equivalent of fabricated data | heuristic (flags €/dates/times for verification) |
| 3 | **≥ 1 real-school proof block**: an actual schedule, a real photo from `public/images/` with descriptive alt text, a real fee table linked to `/tuition`, or a concrete campus/curriculum detail competitors can't state | This IS the information gain — without it the post is generic AI prose (Bible #1) | warn (no image) |
| 4 | **First-hand perspective**: at least one passage only this school could write ("In our forest mornings at Mareil-Marly…", what teachers actually observe at each age). Write as the school ("we"), not as a neutral encyclopedia | E-E-A-T "Experience" signal; also what parents actually want to read | §E judgment |
| 5 | **FAQ section, 4–8 questions** parents actually ask (autocomplete/PAA-sourced), each answered concretely. Only real questions — no quota-filling | Long-tail + People-Also-Ask coverage; schools win on specific answers ("Do children need French?") | warn |
| 6 | **Named author + date** in frontmatter (`author:` a real staff member the user has confirmed, or "Forest International School"); `updated:` only when substance changes | E-E-A-T for a topic about children = author accountability | hard (frontmatter) |
| 7 | **Search-intent coverage**: answer the query fully enough that the parent doesn't need to click back — definition/answer up front, then depth. Include a comparison table where the intent implies comparison (school systems, age groups, camp options) | Featured snippet / AI Overview extraction favors direct answers + tables | §E judgment |
| 8 | **CTA that fits the funnel stage**: decision-stage → visit/apply (`/admissions`, `/contact`); awareness-stage → soft (visit a program page, see camp dates). One clear CTA, not five | The KPI is inquiries, not pageviews (Bible §1) | warn |

## B. News profile (announcements, event recaps, camp updates)

News posts are for parents who already know the school AND for freshness/local signals.
They are exempt from §A#1/#5/#7 but NOT from facts, tone, links, or privacy rules:

| Requirement | Notes |
|---|---|
| ≥ 150 words | below that, it's a social post — put it on Instagram instead |
| All §A#2 fact rules apply | dates/times/prices in news posts mislead just as much |
| ≥ 1 internal link to the relevant hub (`/holiday-camps`, `/admissions`, a program page) | the reason a news post helps SEO at all (Bible #5) |
| Real photos only from `public/images/`; NEW child photos = user approval first | Bible #3 — safeguarding beats SEO, always |
| Event recaps: what actually happened, specifics (activity names, weather, what children made) | recaps with real detail are proof-of-life for E-E-A-T and GBP posts fodder |

## C. Titles / meta / freshness

| Item | Rule |
|---|---|
| `title` | Main keyword phrase early, ≤ 60 chars where possible; no clickbait, no superlatives ("best", "#1") without a citable source; British English |
| `description` | 110–160 chars; contains the query phrase; a concrete fact beats an adjective ("Ages 2–14, English curriculum, forest campus 20 min from Paris" beats "an amazing learning journey") |
| Opening | First paragraph answers the query directly (parents skim; AI Overviews extract). No throat-clearing ("Choosing a school is one of the most important decisions…" is banned throat-clearing) |
| Freshness | Facts that expire (fees, dates) carry "as of <Month Year>" inline; `updated:` frontmatter only on real changes; expired event/camp posts get an update note or a redirect to the current season's post |
| Schema | Site-wide `EducationalOrganization` JSON-LD lives in `Layout.astro` (don't duplicate per-post). Blog posts need no extra schema by default; FAQPage/Event schema only via mode E decisions in `site-pages-engine.md` |

## D. Links

- **Guides: 3–10 internal links; news: ≥ 1.** Every target must resolve — check the route
  exists (`src/pages/*.astro` or `src/content/blog/en/<slug>.md`). Dead internal link =
  hard lint fail.
- **Hub rule (Bible #5):** every post links its owning hub; when a guide becomes the best
  content on a subtopic, add a link from the hub `.astro` page back to it (mode E edit).
- Anchor text natural and varied; same anchor ≤ 2 uses per post.
- External links: only to authoritative, parent-useful sources (French ministry pages,
  curriculum bodies, service-public.fr). Never to competitor schools' commercial pages.

## E. Independent review rubric (sub-agent scores each item true/false before publish)

`facts_traceable` (every fee/date/age/hour/staff claim matches a canonical page or user
confirmation) · `no_invented_details` (no imagined events, testimonials, quotes, photos) ·
`child_privacy_ok` (no child names+photos pairing; images all pre-existing in
`public/images/`) · `sufficient_depth` (profile floor met WITHOUT padding) ·
`no_quota_padding` (deleting any paragraph would lose information) · `real_school_proof`
(≥1 block only this school could publish) · `first_person_experience` (§A4) ·
`internal_links_resolve` (all targets exist) · `hub_linked` (owning hub linked) ·
`lint_pass` (reviewer re-runs lint, doesn't trust the writer) · `intent_answered_up_front`
(first paragraph answers the query) · `cta_present_and_single` · `tone_school_voice` (§F:
warm, concrete, British English, no AI-tone phrases, no jargon leak) ·
`no_overclaiming` (no guarantees/superlatives without source) · `facts_dated` (expiring
facts carry "as of") · `no_cannibalization` (doesn't target a money page's head intent).

→ Any false = `needs_more_work`, back to the writer. The reviewer must independently
re-read the article + re-run lint; never accept the writer's self-report.

## F. Tone & banned language (content is for parents, not for agents — Bible #10)

**Voice:** the head of school writing to one parent. Warm, specific, unhurried, honest
about what the school is and isn't. British English spelling where natural (the site's
register); "children", not "kids", in formal copy.

**Hard-banned (lint blocks; `lint_allow:` in frontmatter with a reason for true false-positives):**

1. **Internal jargon leak:** pillar, hub, spoke, cluster, cannibalization, information
   gain, striking distance, backlog, quality gate, SEO/keyword/meta description/search
   ranking *as topics in copy*, conversion/CTA/funnel. Parents never see our strategy
   vocabulary.
2. **Brief residue:** imperatives addressed to the writer ("be sure to mention", "as per
   the brief"), editor notes, "[insert", "TODO", "TBD", "lorem".
3. **AI-tone fingerprints:** "Let's dive in", "delve", "In today's fast-paced world",
   "look no further", "game-changer", "unlock", "unleash", "nestled in the heart of",
   "hidden gem", "It's worth noting", "In conclusion", "buckle up", "rest assured",
   "elevate", "embark on a journey", "TL;DR", "In this article we". Write the content,
   not the announcement of the content.
4. **Overclaiming / trust-killers:** "guarantee", "guaranteed fluency", "the best school
   in Paris", "#1", "world-class" (unless quoting a citable source), "risk-free".
5. **The "not X, but Y" contrast template** as a crutch (≤1 per post, only when genuinely
   needed).

**Style rules:** no em-dash chains as rhythm; vary sentence openings; short paragraphs
(parents read on phones); every bolded phrase must earn it (bold density is an AI tell);
numbers concrete ("8:45–15:45", "ages 2–5") not vague ("flexible hours", "young learners"
everywhere).

**Photos:** descriptive alt text with the subject and place ("Children building shelters
in the forest at Mareil-Marly campus"), never keyword-stuffed alt text.
