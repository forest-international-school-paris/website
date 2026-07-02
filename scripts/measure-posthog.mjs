#!/usr/bin/env node
/**
 * measure-posthog.mjs — weekly organic + conversion snapshot (KPI: Bible §1).
 *
 * Pulls a 28-day window from PostHog (HogQL) and writes
 * seo/metrics/posthog-YYYY-MM-DD.json:
 *   - sessions by channel type (Organic Search / Direct / Referral / ...)
 *   - organic entry pages
 *   - conversion events by channel  ← the north-star slice
 *   - organic conversions per page
 *
 * Auth: POSTHOG_PERSONAL_API_KEY in .env (repo root, gitignored) or env.
 * Optional: POSTHOG_PROJECT_ID (default 493129), POSTHOG_HOST (default US cloud).
 * No credentials → prints setup instructions and exits 1. Never fabricates data.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  const f = join(ROOT, '.env');
  if (!existsSync(f)) return;
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv();

const KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const PROJECT = process.env.POSTHOG_PROJECT_ID || '493129';
const HOST = process.env.POSTHOG_HOST || 'https://us.posthog.com';
if (!KEY) {
  console.error('[measure-posthog] POSTHOG_PERSONAL_API_KEY missing.');
  console.error('Add it to .env (gitignored):  POSTHOG_PERSONAL_API_KEY=phx_...');
  process.exit(1);
}

const registry = JSON.parse(readFileSync(join(ROOT, 'seo/_registry.json'), 'utf8'));
const CONV = registry.posthog.conversion_events;
const DAYS = 28;
const convList = CONV.map((e) => `'${e}'`).join(',');

async function hogql(query) {
  const res = await fetch(`${HOST}/api/environments/${PROJECT}/query/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(`HTTP ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  return { columns: data.columns, results: data.results };
}

const QUERIES = {
  sessions_by_channel: `
    select $channel_type as channel, count() as sessions
    from sessions where $start_timestamp >= now() - interval ${DAYS} day
    group by channel order by sessions desc`,
  organic_entry_pages: `
    select $entry_pathname as path, count() as sessions
    from sessions
    where $start_timestamp >= now() - interval ${DAYS} day and $channel_type = 'Organic Search'
    group by path order by sessions desc limit 25`,
  conversions_by_channel: `
    select event, session.$channel_type as channel, count() as n
    from events
    where event in (${convList}) and timestamp >= now() - interval ${DAYS} day
    group by event, channel order by n desc`,
  organic_conversions_by_page: `
    select properties.$pathname as path, event, count() as n
    from events
    where event in (${convList}) and timestamp >= now() - interval ${DAYS} day
      and session.$channel_type = 'Organic Search'
    group by path, event order by n desc limit 50`,
};

const out = { generated_at: new Date().toISOString(), window_days: DAYS, project: PROJECT, data: {}, errors: {} };
for (const [name, q] of Object.entries(QUERIES)) {
  try {
    out.data[name] = await hogql(q);
    console.log(`[measure-posthog] ${name}: ${out.data[name].results.length} rows`);
  } catch (e) {
    out.errors[name] = String(e.message);
    console.error(`[measure-posthog] ${name} FAILED: ${e.message}`);
  }
}

const date = new Date().toISOString().slice(0, 10);
const file = join(ROOT, 'seo/metrics', `posthog-${date}.json`);
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, JSON.stringify(out, null, 2));
console.log(`\n→ wrote ${file}`);

const ch = out.data.sessions_by_channel?.results || [];
console.log('\nSessions by channel (28d):');
for (const [channel, n] of ch) console.log(`  ${String(channel).padEnd(18)} ${n}`);
const conv = out.data.conversions_by_channel?.results || [];
const organicConv = conv.filter(([, c]) => c === 'Organic Search');
console.log(`\nOrganic-attributed conversions (28d): ${organicConv.reduce((s, r) => s + r[2], 0)}`);
for (const [event, , n] of organicConv) console.log(`  ${String(event).padEnd(28)} ${n}`);
if (Object.keys(out.errors).length) process.exitCode = 1;
