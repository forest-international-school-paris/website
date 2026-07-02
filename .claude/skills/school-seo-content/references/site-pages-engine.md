# Mode E: Money-page engine (on-page SEO for the .astro pages)

> The program/admissions pages carry the head terms; most ranking wins here are on-page
> fixes, not new content. These are REAL commitments to REAL parents — hence the split:
> **SEO surface = autonomous; facts = user-confirmed** (Bible §7 money-page guard).

## 1. Page map (route → head intent → canonical facts it owns)

| Page | Head intents | Owns these facts |
|---|---|---|
| `src/pages/index.astro` | international school paris west, forest school paris | positioning, hours summary |
| `src/pages/early-years.astro` | english preschool/nursery paris, maternelle anglophone | ages 2–5 program |
| `src/pages/primary.astro` | english primary school paris | ages 6–11 program |
| `src/pages/middle-school.astro` | international middle school paris | ages 11–14 program |
| `src/pages/holiday-camps.astro` | summer/holiday camp paris english | camp dates, hours, prices, eligibility |
| `src/pages/admissions.astro` | admissions, apply, visit | process steps, application link |
| `src/pages/tuition.astro` | international school paris fees | ALL fees |
| `src/pages/about.astro`, `team.astro`, `contact.astro` | brand, staff, NAP | founding year, staff names, address/phone |

`seo/_registry.json` holds this hub list as data; update both together.

## 2. What is autonomous vs user-confirmed on these pages

**Autonomous (after quality checks):** `<Layout title/description>` props, heading
hierarchy (one H1, keyworded H2s), internal links between hubs and posts, image `alt`
text, adding an FAQ section using facts already on the page, schema adjustments,
fixing broken links/typos.

**User-confirmed first:** any number or commitment a parent could rely on — fees, dates,
hours, ages, staff names/photos, policies, popup content in `Layout.astro`. Also anything
that changes what the school promises ("daily forest time" vs "weekly").

## 3. On-page standards

- **Title prop** (renders as `<title>{title} | Forest International School Paris</title>`):
  put the query phrase in the page-specific part, ≤ 35 chars ideally so the brand suffix
  survives truncation. One intent per page (Bible #4).
- **Description prop**: 110–160 chars, concrete facts (ages, location, one differentiator).
  Every page MUST pass its own description — pages inheriting the default layout
  description is a findable bug (grep for `<Layout title=` without `description`).
- **Headings:** exactly one H1 containing the head phrase naturally; H2s = the
  sub-questions parents ask (autocomplete-sourced), not marketing labels ("Our Approach"
  → "How children learn outdoors at ages 2–5" keeps the keyword AND the meaning).
- **Answer block up top:** first visible paragraph states what/who/where concretely
  (ages, curriculum language, location, distance from Paris) — this is what AI Overviews
  and parents skimming both extract.
- **Internal links:** every hub links its sibling hubs, its best 2–4 supporting posts,
  and the decision path (`/admissions`, `/tuition`, `/contact`). Every post links back
  (checklist §D). No orphans (Bible #5).
- **Images:** existing `public/images/` only; descriptive alt; `loading="lazy"` below
  the fold.

## 4. Schema (JSON-LD)

- Site-wide `EducationalOrganization` lives in `Layout.astro` — it is the single schema
  source of truth (keep NAP in sync with Bible #8; `sameAs` should list the school's
  real profiles — Instagram is known; others = ask user).
- Do NOT add per-page Organization duplicates. Worth adding when content justifies:
  `Event` schema for dated open days (in the page frontmatter section of that page),
  `FAQPage` ONLY if Google's current policy makes it useful for this site type — check
  current documentation before adding, default is visible FAQs without schema.
- After any schema change: validate with Google's Rich Results Test on the deployed URL
  (T+0 after deploy).

## 5. QA gate for money-page edits (all must pass before push)

1. `npm run build` — 0 errors, and the changed page's HTML in `dist/` contains the new
   title/description/links (grep it).
2. Facts diff review: `git diff` shows ONLY approved changes — no accidental fact edits
   riding along.
3. Every new internal link target exists in `dist/`.
4. Lighthouse-level sanity: no rendered layout breakage (spot-check `npm run preview`).
5. If schema touched: Rich Results Test on the live URL after deploy.
