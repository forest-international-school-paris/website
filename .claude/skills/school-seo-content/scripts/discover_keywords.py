#!/usr/bin/env python3
"""Demand discovery + coverage-gap backlog generator for Forest International School SEO.

Hits Google's public autocomplete endpoint (free, no API key) with parent-search seeds
in English (hl=en, gl=fr) and French (hl=fr, gl=fr), then cross-references against the
existing site (page titles + blog posts) to surface UNCOVERED, prioritized topics.

Usage:
    python3 discover_keywords.py                       # default seeds
    python3 discover_keywords.py --seeds "summer camp paris,english school versailles"
    python3 discover_keywords.py --out seo/_backlog.json

Output: seo/_backlog.json + printed summary. Re-run weekly (flywheel ①→②).
French-tagged gaps are logged but remain user-decision items (site is EN-only).
"""
import argparse
import glob
import json
import os
import re
import urllib.parse
import urllib.request

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))

# pillar → seeds. Broad on purpose; autocomplete fans each into ~10 real queries.
DEFAULT_SEEDS = {
    "choose-school": [
        ("en", "international school paris"), ("en", "international school paris west"),
        ("en", "english school paris"), ("en", "international school yvelines"),
        ("en", "international school saint germain en laye"),
        ("en", "moving to paris with kids school"),
        ("fr", "école internationale yvelines"), ("fr", "école anglaise 78"),
    ],
    "programs": [
        ("en", "english preschool paris"), ("en", "bilingual preschool paris"),
        ("en", "english primary school paris"), ("en", "middle school paris international"),
        ("en", "forest school paris"), ("en", "nature based learning school"),
        ("fr", "école maternelle anglophone"), ("fr", "forest school france"),
    ],
    "camps-activities": [
        ("en", "summer camp paris english"), ("en", "holiday camp paris kids"),
        ("en", "english activities for kids paris"), ("en", "wednesday activities kids paris"),
        ("fr", "stage anglais enfant paris"), ("fr", "camp été anglais enfant"),
    ],
    "brand": [("en", "forest international school")],
}


def autocomplete(query, hl, timeout=8):
    url = ("https://suggestqueries.google.com/complete/search"
           f"?client=firefox&hl={hl}&gl=fr&q=" + urllib.parse.quote(query))
    try:
        with urllib.request.urlopen(url, timeout=timeout) as r:
            return json.loads(r.read().decode("utf-8"))[1]
    except Exception:
        return []


def classify_intent(term):
    t = term.lower()
    if any(k in t for k in ("fee", "price", "cost", "tarif", "prix", "best", "vs",
                            "review", "avis", "compare", "ranking")):
        return "2-evaluation"
    if any(k in t for k in ("admission", "apply", "enroll", "inscription", "open day",
                            "visit", "waiting list")):
        return "3-decision"
    if any(k in t for k in ("camp", "stage", "holiday", "summer", "vacances",
                            "wednesday", "mercredi", "activit")):
        return "4-seasonal"
    return "1-awareness"


def coverage_blob():
    parts = []
    for f in glob.glob(os.path.join(REPO, "src/pages/**/*.astro"), recursive=True):
        txt = open(f, encoding="utf-8", errors="ignore").read()
        m = re.search(r'<Layout\s+title="([^"]*)"', txt)
        parts.append(os.path.basename(f) + " " + (m.group(1) if m else ""))
    for f in glob.glob(os.path.join(REPO, "src/content/blog/en/*.md")):
        txt = open(f, encoding="utf-8", errors="ignore").read()
        m = re.search(r'title:\s*"(.*?)"', txt)
        parts.append(os.path.basename(f) + " " + (m.group(1) if m else ""))
    return " ".join(parts).lower()


STOPWORDS = {"paris", "school", "the", "for", "and", "de", "en", "à", "a", "in", "of",
             "école", "enfant", "kids", "france", "french"}


def covered(term, blob):
    core = [w for w in re.split(r"\s+", term.lower()) if w and w not in STOPWORDS]
    return bool(core) and all(w in blob for w in core)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--seeds", help="comma-separated extra EN seeds")
    ap.add_argument("--out", default=os.path.join(REPO, "seo", "_backlog.json"))
    args = ap.parse_args()

    seeds = dict(DEFAULT_SEEDS)
    if args.seeds:
        seeds["custom"] = [("en", s.strip()) for s in args.seeds.split(",") if s.strip()]

    demand = {}  # term -> (pillar, lang)
    for pillar, group in seeds.items():
        for lang, s in group:
            for sug in autocomplete(s, hl=lang):
                demand.setdefault(sug, (pillar, lang))

    blob = coverage_blob()
    rows = [{"term": t, "pillar": p, "lang": lang, "intent": classify_intent(t),
             "covered": covered(t, blob)} for t, (p, lang) in demand.items()]

    order = {"3-decision": 0, "4-seasonal": 1, "2-evaluation": 2, "1-awareness": 3}
    backlog = sorted([r for r in rows if not r["covered"]],
                     key=lambda r: (r["lang"] != "en", r["pillar"],
                                    order[r["intent"]], r["term"]))

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    json.dump({"pillars": list(seeds), "demand_terms": len(demand),
               "covered": sum(r["covered"] for r in rows), "gaps": len(backlog),
               "note": "lang=fr rows are user-decision items (site is EN-only)",
               "backlog": backlog},
              open(args.out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    print(f"demand terms {len(demand)} | covered {sum(r['covered'] for r in rows)}"
          f" | gaps {len(backlog)}")
    cur = None
    for r in backlog:
        if (r["pillar"], r["lang"]) != cur:
            cur = (r["pillar"], r["lang"])
            print(f"\n■ {r['pillar']} [{r['lang']}]")
        print(f"  [{r['intent']}] {r['term']}")
    print(f"\n→ wrote {args.out}")


if __name__ == "__main__":
    main()
