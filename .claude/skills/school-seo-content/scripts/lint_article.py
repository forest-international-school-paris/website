#!/usr/bin/env python3
"""Pre-publish hard-rule linter for Forest International School blog posts.

Enforces the machine-checkable rules of references/article-checklist.md
(the checklist is the spec; this linter is the gate). Judgment items
(padding, first-hand voice, fact verification) belong to the independent
§E review — this script flags candidates but cannot clear them.

Usage:
    python3 lint_article.py src/content/blog/en/<slug>.md [more.md ...]

Exit 0 = all files pass (warnings allowed). Exit 1 = any hard error.

False positives: add to frontmatter
    lint_allow:
      - "rule_id: one-line reason"
"""
import os
import re
import sys
import glob
import datetime

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))

# --- checklist §F hard-banned language -------------------------------------
JARGON = [
    r"\bpillar\b", r"\bhub\b", r"\bspoke\b", r"\bcluster\b", r"cannibali[sz]",
    r"information gain", r"striking.distance", r"quality gate", r"\bbacklog\b",
    r"\bSEO\b", r"\bCTA\b", r"\bfunnel\b", r"meta description", r"search ranking",
]
BRIEF_RESIDUE = [
    r"as per the brief", r"be sure to mention", r"note to editor", r"\[insert",
    r"\bTODO\b", r"\bTBD\b", r"lorem ipsum", r"as an AI",
]
AI_TONE_HARD = [
    r"let'?s dive", r"\bdive in\b", r"\bdelve\b", r"look no further",
    r"game.changer", r"\bunlock\b", r"\bunleash\b", r"nestled in the heart",
    r"hidden gem", r"buckle up", r"rest assured", r"embark on a journey",
    r"elevate your", r"TL;?DR", r"in this article", r"in today'?s fast.paced",
]
AI_TONE_WARN = [r"it'?s worth noting", r"in conclusion", r"world.class"]
OVERCLAIM = [
    r"\bguarantee[ds]?\b", r"#1\b", r"the best school", r"risk.free",
    r"best.in.class",
]

WORD_FLOORS = {"guide": 1000, "news": 150}
LINK_FLOORS = {"guide": 3, "news": 1}


def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        return None, text
    fm, body = {}, m.group(2)
    current_list = None
    for line in m.group(1).splitlines():
        lm = re.match(r"^(\w+):\s*(.*)$", line)
        if lm:
            key, val = lm.group(1), lm.group(2).strip()
            if val in ("", "|", ">"):
                fm[key] = []
                current_list = key
            else:
                fm[key] = val.strip("\"'")
                current_list = None
        elif current_list is not None and re.match(r"^\s*-\s+", line):
            fm[current_list].append(re.sub(r"^\s*-\s+", "", line).strip("\"'"))
    return fm, body


def site_routes():
    routes = {"/"}
    for f in glob.glob(os.path.join(REPO, "src/pages/**/*.astro"), recursive=True):
        rel = os.path.relpath(f, os.path.join(REPO, "src/pages"))
        if "[" in rel:  # dynamic routes handled via content collection below
            continue
        route = "/" + rel[:-len(".astro")]
        route = re.sub(r"/index$", "", route) or "/"
        routes.add(route)
    for f in glob.glob(os.path.join(REPO, "src/content/blog/en/*.md")):
        routes.add("/news/" + os.path.basename(f)[:-3])
    return routes


def strip_code(body):
    return re.sub(r"```.*?```", "", body, flags=re.S)


class Lint:
    def __init__(self, allow):
        self.errors, self.warns, self.notes = [], [], []
        self.allow = {a.split(":")[0].strip(): a for a in allow}

    def err(self, rule, msg):
        if rule in self.allow:
            self.notes.append(f"allowed [{rule}] ({self.allow[rule]})")
        else:
            self.errors.append(f"[{rule}] {msg}")

    def warn(self, rule, msg):
        if rule not in self.allow:
            self.warns.append(f"[{rule}] {msg}")


def lint_file(path, routes):
    text = open(path, encoding="utf-8").read()
    fm, body = parse_frontmatter(text)
    slug = os.path.basename(path)[:-3]
    L = Lint(fm.get("lint_allow", []) if fm else [])

    if fm is None:
        L.err("fm_missing", "no frontmatter block")
        return L

    # --- frontmatter ---------------------------------------------------------
    for key in ("title", "description", "date", "lang"):
        if not fm.get(key):
            L.err("fm_required", f"missing frontmatter field '{key}'")
    if fm.get("lang") and fm["lang"] != "en":
        L.err("fm_lang", f"lang must be 'en' (got {fm['lang']!r})")
    ptype = fm.get("type", "news")
    if ptype not in WORD_FLOORS:
        L.err("fm_type", f"type must be guide|news (got {ptype!r})")
        ptype = "news"
    title = fm.get("title", "")
    desc = fm.get("description", "")
    if len(title) > 60:
        L.warn("title_length", f"title {len(title)} chars (>60 truncates in SERP)")
    if desc and not 90 <= len(desc) <= 180:
        L.err("desc_length", f"description {len(desc)} chars (hard bounds 90-180; aim 110-160)")
    elif desc and not 110 <= len(desc) <= 160:
        L.warn("desc_length", f"description {len(desc)} chars (aim 110-160)")
    if fm.get("image"):
        img = os.path.join(REPO, "public", fm["image"].lstrip("/"))
        if not fm["image"].startswith("/images/"):
            L.err("image_path", "image must live under /images/ (existing site assets only — Bible #3)")
        elif not os.path.exists(img):
            L.err("image_exists", f"image file not found: public{fm['image']}")
    if fm.get("date"):
        try:
            d = datetime.date.fromisoformat(str(fm["date"])[:10])
            if d > datetime.date.today():
                L.warn("future_date", f"date {d} is in the future")
        except ValueError:
            L.err("fm_date", f"unparseable date {fm['date']!r}")

    # --- body ----------------------------------------------------------------
    prose = strip_code(body)
    words = len(re.findall(r"[A-Za-zÀ-ÿ'’-]+", prose))
    if words < WORD_FLOORS[ptype]:
        L.err("word_count", f"{words} words < {WORD_FLOORS[ptype]} floor for type={ptype}")
    if re.search(r"^# ", body, re.M):
        L.err("h1_in_body", "body contains an H1 (# ...); the title renders as H1 already")

    searchable = title + "\n" + desc + "\n" + prose
    for rules, sink, label in (
        (JARGON, L.err, "jargon_leak"),
        (BRIEF_RESIDUE, L.err, "brief_residue"),
        (AI_TONE_HARD, L.err, "ai_tone"),
        (OVERCLAIM, L.err, "overclaim"),
        (AI_TONE_WARN, L.warn, "ai_tone_soft"),
    ):
        for pat in rules:
            m = re.search(pat, searchable, re.I)
            if m:
                sink(label, f"banned phrase {m.group(0)!r} (checklist §F)")

    nb = len(re.findall(r"\bnot (?:just|only|merely)\b.{0,80}\bbut\b", prose, re.I | re.S))
    if nb > 1:
        L.warn("not_but_template", f"{nb} 'not X, but Y' constructions (≤1; checklist §F5)")
    dashes = len(re.findall(r"—", prose))
    if words and dashes / words * 1000 > 5:
        L.warn("em_dash_density", f"{dashes} em-dashes in {words} words (AI-tone rhythm)")

    # --- links ---------------------------------------------------------------
    links = re.findall(r"\[([^\]]*)\]\(([^)\s]+)\)", prose)
    internal = [(t, u) for t, u in links if u.startswith("/")]
    for _, u in links:
        if u in ("#", ""):
            L.err("placeholder_link", "placeholder link '(#)'")
    for _, u in internal:
        target = u.split("#")[0].split("?")[0].rstrip("/") or "/"
        if target not in routes:
            L.err("dead_internal_link", f"{u} does not resolve to an existing route")
    if len(internal) < LINK_FLOORS[ptype]:
        L.warn("internal_links", f"{len(internal)} internal links < {LINK_FLOORS[ptype]} floor for type={ptype} (checklist §D)")
    anchors = {}
    for t, _ in internal:
        anchors[t.lower()] = anchors.get(t.lower(), 0) + 1
    for a, n in anchors.items():
        if n > 2:
            L.warn("anchor_repeat", f"anchor {a!r} used {n}× (≤2; checklist §D)")

    # --- fact-verification flags (judgment items for the §E review) -----------
    for pat, what in ((r"€\s?\d[\d,.]*", "fee"), (r"\b\d{1,2}[:h]\d{2}\b", "time"),
                      (r"\b20\d{2}\b", "year"), (r"free of charge", "pricing claim"),
                      (r"\+33[\s\d]{9,}", "phone")):
        hits = re.findall(pat, prose)
        if hits:
            L.notes.append(f"VERIFY {what}: {sorted(set(hits))[:6]} — must match canonical pages (Bible #2)")

    return L


def main():
    files = sys.argv[1:]
    if not files:
        print(__doc__)
        sys.exit(2)
    routes = site_routes()
    failed = False
    for path in files:
        L = lint_file(path, routes)
        status = "FAIL" if L.errors else "PASS"
        print(f"\n=== {path}: {status} ({len(L.errors)} errors, {len(L.warns)} warnings)")
        for e in L.errors:
            print(f"  ERROR {e}")
        for w in L.warns:
            print(f"  warn  {w}")
        for n in L.notes:
            print(f"  note  {n}")
        failed |= bool(L.errors)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
