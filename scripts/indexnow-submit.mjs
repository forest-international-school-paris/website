#!/usr/bin/env node
/**
 * indexnow-submit.mjs — ping IndexNow (Bing/Yandex; Bing index = ChatGPT retrieval
 * prerequisite — Bible #6b). This does NOT affect Google.
 *
 * Usage: node scripts/indexnow-submit.mjs <url> [url...]
 * Key: seo/_registry.json → indexnow (key file must stay deployed in public/).
 * The IndexNow key is public by protocol design (it lives at a public URL) — not a secret.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { indexnow, site } = JSON.parse(readFileSync(join(ROOT, 'seo/_registry.json'), 'utf8'));

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('usage: node scripts/indexnow-submit.mjs <url> [url...]');
  process.exit(2);
}
const host = new URL(site).host;
for (const u of urls) {
  if (new URL(u).host !== host) {
    console.error(`refusing non-${host} URL: ${u}`);
    process.exit(2);
  }
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key: indexnow.key,
    keyLocation: `${site}/${indexnow.key}.txt`,
    urlList: urls,
  }),
});
console.log(`[indexnow] HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
