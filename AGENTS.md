## Imported Claude Cowork project instructions

# Forest International School — agent instructions

**Single source of truth for all content/SEO work in this repo: [`CLAUDE.md`](./CLAUDE.md)
(the SEO Bible).** Read it before adding, editing, or deleting any content. Operational
workflows live in `.claude/skills/school-seo-content/`; the autonomous loop is
`.claude/commands/school-seo-loop.md`; mutable facts in `seo/_registry.json`.

Hard rails for any agent (full text in CLAUDE.md):
- School facts (fees, dates, ages, hours, staff, policies) only from the canonical pages
  or explicit user confirmation — never invented.
- Child safety & privacy beat SEO: no new photos of children, no pupil personal data.
- This repo is PUBLIC: secrets only in `.env` (gitignored).
- Push to origin/main deploys to production.
