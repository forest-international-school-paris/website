# Publishing pipeline: content model → build → deploy → dual-engine indexing

## 1. Content model

```
src/content/blog/en/<slug>.md      # posts (schema: src/content.config.ts) → /news/<slug>
src/pages/*.astro                  # money pages (mode E)
public/images/                     # ALL images (existing only; new child photos = user approval)
seo/                               # registry, backlog, state, metrics (committed; no secrets)
.env                               # secrets (gitignored — repo is PUBLIC; never commit keys)
```

Frontmatter (required by `src/content.config.ts` + lint):

```yaml
---
title: "English Summer Camp in Paris West — July 2026 Dates & Fees"   # ≤60 chars ideal
description: "Two-week English immersion camps for ages 2–12 at our forest campus near Saint-Germain-en-Laye. Dates, daily schedule and fees."  # 110–160 chars
date: 2026-07-02
author: "Forest International School"     # or a user-confirmed staff name
image: "/images/forest-walk.jpg"          # existing file in public/images/
lang: "en"
type: "guide"                             # "guide" | "news" (selects lint profile)
tags: ["camps"]
---
```

## 2. Local preview & QA

```bash
npm run dev        # http://localhost:4321/news/<slug>
npm run build      # MUST pass 0 errors before any push; output in dist/
```

Verify in the built output, not just dev: `grep -l "<title fragment>" dist/news/<slug>/index.html`.
There is no draft flag in this repo — **anything merged to main goes live**. Drafts stay
uncommitted (or on a branch) until the quality gate passes.

## 3. Deploy = push to main (auto-deploy)

The site auto-deploys from GitHub `origin/main` via the school's Cloudflare account
(verified 2026-07-02: pushed commits go live; no deploy runs from this machine —
`wrangler deploy` is NOT part of the SOP and the local wrangler account has no such
worker). Therefore:

1. `git add <files> && git commit` (message states slug/mode) → `git push origin main`.
2. Poll the live URL until the change appears (~2–5 min typical):
   `curl -s https://forest-international.com/news/<slug>/ | grep -c "<title fragment>"` —
   give up after ~15 min and record a "deploy pipeline" item in `seo/_state.md` for the
   user (the pipeline lives on the school's Cloudflare account, we can't fix it here).
3. `git pull --rebase` before starting any iteration — the school's staff also edits this
   repo (Cowork sessions); conflicts are resolved, never force-pushed.

## 4. Dual-engine indexing (Bible #6 — publish isn't done without this)

- **(a) Google:** `@astrojs/sitemap` regenerates `sitemap-index.xml` on every build
  automatically — verify the new URL appears:
  `curl -s https://forest-international.com/sitemap-0.xml | grep <slug>`.
  GSC verification at T+7 (URL Inspection via `scripts/measure-gsc.mjs --inspect <url>`
  once credentials exist; until then the state file keeps a "verify in GSC UI" user item).
- **(b) AI-retrieval:** `node scripts/indexnow-submit.mjs <url...>` — pings IndexNow
  (Bing/Yandex; Bing index = ChatGPT retrieval prerequisite). The IndexNow key file lives
  at `public/<key>.txt` and must stay deployed; key value mirrored in `seo/_registry.json`
  (it is public by protocol design — not a secret).

## 5. Pre-publish checklist (lint automates most)

- [ ] `python3 .claude/skills/school-seo-content/scripts/lint_article.py <file>` green
- [ ] Independent §E review sub-agent: all items true
- [ ] Publish-rate cap respected (`seo/_registry.json` → `publish_caps`)
- [ ] `npm run build` passes; built HTML contains title/description
- [ ] All internal links resolve in `dist/`
- [ ] Image exists in `public/images/` (no new child photos without approval)
- [ ] After push: live URL 200 + content present; sitemap contains URL; IndexNow pinged
- [ ] `seo/_state.md` updated (iteration log + T+7 GSC check scheduled)
