/** English ↔ French blog post pairs, by slug. The single source for hreflang on both post routes. */
const pairs: ReadonlyArray<{ en: string; fr: string }> = [
  { en: 'english-school-paris-pre-elementary-primary', fr: 'ecole-anglaise-paris-maternelle-primaire' },
  { en: 'changing-school-mid-year-paris', fr: 'changer-ecole-cours-annee' },
];

export function postAlternates(lang: 'en' | 'fr', slug: string) {
  const pair = pairs.find((p) => p[lang] === slug);
  if (!pair) return [];
  const en = `/news/${pair.en}/`;
  return [
    { hreflang: 'en', href: en },
    { hreflang: 'fr', href: `/fr/news/${pair.fr}/` },
    { hreflang: 'x-default', href: en },
  ];
}
