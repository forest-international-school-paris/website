# Mode F: Local SEO + AI-search (GEO)

> A school is a local business: for "international school near me / saint-germain-en-laye /
> yvelines" queries, the Map Pack and Google Business Profile matter as much as the site.
> Split: **on-site work = autonomous; external consoles/profiles = user-action list**
> (written into `seo/_state.md` under "User actions").

## 1. On-site local signals (autonomous)

- **NAP consistency (Bible #8):** name, address, phone identical on every page, in the
  `EducationalOrganization` JSON-LD (`Layout.astro`), and in the footer. Periodic check:
  grep the phone/address across `src/` — one mismatch = a task.
- **Location-intent content:** pages/posts naturally naming the catchment (Mareil-Marly,
  Saint-Germain-en-Laye, Le Vésinet, Marly-le-Roi, Versailles, "20 minutes from Paris",
  RER A / Tram 13 access). A "Getting here / our area" section on `/contact` or `/about`
  with real commute details serves parents AND local relevance. Never fake locality
  ("serving all of Paris" dilutes; the real catchment is the strength).
- **`geo` + `areaServed`** already in the JSON-LD — keep accurate; extend `sameAs` with
  real profiles (Instagram known; others user-confirmed).
- **Embedded map** on contact/about (exists on about — keep it).

## 2. Google Business Profile (user actions — agent prepares, user executes)

The GBP is likely the single highest-ROI local asset. The loop maintains, in
`seo/_state.md`, a ready-to-paste GBP action list:

- Verify/claim status, correct category ("International school" primary; "Preschool",
  "Summer camp organizer" secondary where true), hours, NAP = site exactly.
- **GBP Posts:** every camp announcement and open day published on the site gets a
  matching GBP post (agent drafts text + suggests an existing site photo; user pastes).
- **Reviews:** the honest flywheel — after events/camps, ask satisfied parents for a
  Google review (agent drafts the ask; NEVER incentivized/fake reviews).
- **Q&A section:** seed with the real FAQ answers from the site.

## 3. Local citations & directories (user actions)

International-school directories often outrank individual schools ("international
schools database", expatica, angloinfo, Message Paris…). Being listed = citation + NAP
signal + referral traffic. Agent maintains a target list with the exact NAP/description
text to submit; user does the submissions. Consistency rule: the description text comes
from one canonical blurb kept in `seo/_registry.json` (`canonical_blurb`).

## 4. AI-search / GEO (being the cited answer)

When parents ask ChatGPT/Perplexity/AI Overviews "international schools west of Paris
for a 4-year-old", the goal is Forest named + linked:

1. **Be extractable:** every key page carries a direct answer block (who/ages/where/
   what makes it different) in the first screen; comparison facts in real `<table>`/list
   markup; fees public (AI engines strongly prefer sources that state numbers).
2. **`public/llms.txt`:** maintained summary of the school (name, ages, location,
   curriculum, fees page URL, contact) — clean English, zero marketing fluff, no internal
   jargon. Update when facts change.
3. **Bing channel:** Bing index feeds ChatGPT retrieval. Every publish pings IndexNow
   (`scripts/indexnow-submit.mjs`); if the user sets up Bing Webmaster Tools (user
   action), verify sitemap there too.
4. **Consistency across the entity graph** (Bible #8): the same founding year, ages,
   and address everywhere — AI engines cross-check sources and drop inconsistent ones.

## 5. Measurement hooks

- GBP insights (calls, direction requests) — user exports monthly, agent logs into
  `seo/metrics/`.
- "near me"-style query growth in GSC once credentials exist (`measure-gsc.mjs` tags
  queries containing local names via `seo/_registry.json` cluster regexes).
- AI citation spot-check (monthly): ask the major assistants the persona questions,
  record whether Forest is named, into `seo/_state.md`.
