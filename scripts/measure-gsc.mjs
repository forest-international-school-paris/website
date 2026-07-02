#!/usr/bin/env node
/**
 * measure-gsc.mjs — Google Search Console pull for forest-international.com.
 *
 * 28-day query + page performance, bucketed into the clusters defined in
 * seo/_registry.json, plus a striking-distance list (position 5–20).
 * Output: seo/metrics/gsc-YYYY-MM-DD.json
 *
 * Also: `node scripts/measure-gsc.mjs --inspect <url>` → URL Inspection result.
 *
 * Auth (first match wins; no credentials → setup instructions + exit 1, never fake data):
 *   1. GSC_TOKEN_FILE=/path/to/token.json  with {"access_token":"ya29..."}
 *   2. OAuth user credentials (RECOMMENDED here — the GSC property is only viewable by
 *      koreal6803@gmail.com and no users can be added): an "authorized_user" ADC file at
 *      GSC_OAUTH_ADC_FILE or ~/.config/gcloud-school/application_default_credentials.json.
 *      One-time creation (choose koreal6803@gmail.com in the browser):
 *        CLOUDSDK_CONFIG=$HOME/.config/gcloud-school gcloud auth application-default login \
 *          --scopes='openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/webmasters.readonly'
 *      (Separate config dir on purpose — the default ADC belongs to finlab.company and
 *      is used for Cloud SQL; do not overwrite it.)
 *      User-credential calls send x-goog-user-project: GSC_QUOTA_PROJECT (default
 *      fdata-299302, where the Search Console API is enabled).
 *   3. GOOGLE_APPLICATION_CREDENTIALS service-account JSON (only works if the SA is a
 *      user on the property — not currently possible for this site).
 *
 * GSC_SITE_URL overrides the property id (default sc-domain:forest-international.com;
 * URL-prefix properties are written like https://forest-international.com/).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createSign, randomUUID } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = process.env.GSC_SITE_URL || 'sc-domain:forest-international.com';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

let usingUserCreds = false;

async function accessToken() {
  if (process.env.GSC_TOKEN_FILE) {
    return JSON.parse(readFileSync(process.env.GSC_TOKEN_FILE, 'utf8')).access_token;
  }

  // OAuth user credentials (authorized_user ADC file) — refresh-token grant.
  const adcPath = process.env.GSC_OAUTH_ADC_FILE
    || join(process.env.HOME, '.config/gcloud-school/application_default_credentials.json');
  let adc = null;
  try { adc = JSON.parse(readFileSync(adcPath, 'utf8')); } catch { /* fall through to SA */ }
  if (adc?.type === 'authorized_user') {
    usingUserCreds = true;
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: adc.refresh_token,
        client_id: adc.client_id,
        client_secret: adc.client_secret,
      }),
    });
    const data = await res.json();
    if (!data.access_token) throw new Error(`user-credential refresh failed: ${JSON.stringify(data).slice(0, 300)}`);
    return data.access_token;
  }

  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || join(process.env.HOME, 'Documents/fdata/fdata-299302-new-key.json');
  let sa;
  try {
    sa = JSON.parse(readFileSync(keyPath, 'utf8'));
  } catch {
    console.error('[measure-gsc] no credentials found. Recommended one-time setup');
    console.error('(OAuth as koreal6803@gmail.com — no GSC user changes needed):');
    console.error("  CLOUDSDK_CONFIG=$HOME/.config/gcloud-school gcloud auth application-default login \\");
    console.error("    --scopes='openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/webmasters.readonly'");
    console.error('then re-run this script. (Alternatives: GSC_TOKEN_FILE or a service-account');
    console.error('key that is a user on the property.)');
    process.exit(1);
  }
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email, scope: SCOPE, aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600, jti: randomUUID(),
  }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const jwt = `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`token exchange failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function gsc(token, path, body) {
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  if (usingUserCreds) {
    // user-OAuth calls need a quota project with the Search Console API enabled
    headers['x-goog-user-project'] = process.env.GSC_QUOTA_PROJECT || 'fdata-299302';
  }
  const res = await fetch(`https://searchconsole.googleapis.com/${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`GSC HTTP ${res.status}: ${JSON.stringify(data).slice(0, 400)}`);
  return data;
}

const token = await accessToken();

// --- URL inspection mode ----------------------------------------------------
const inspectIdx = process.argv.indexOf('--inspect');
if (inspectIdx !== -1) {
  const url = process.argv[inspectIdx + 1];
  if (!url) { console.error('usage: measure-gsc.mjs --inspect <url>'); process.exit(2); }
  const r = await gsc(token, 'v1/urlInspection/index:inspect', { inspectionUrl: url, siteUrl: SITE });
  console.log(JSON.stringify(r.inspectionResult?.indexStatusResult ?? r, null, 2));
  process.exit(0);
}

// --- performance pull ---------------------------------------------------------
const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10); // GSC lags ~2d
const start = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
console.log(`[measure-gsc] site=${SITE} window=${start}..${end}`);

const registry = JSON.parse(readFileSync(join(ROOT, 'seo/_registry.json'), 'utf8'));
const clusters = registry.clusters; // [{name, pattern}] first-match-wins
const matchers = clusters.map((c) => ({ name: c.name, re: new RegExp(c.pattern, 'i') }));
const bucket = (q) => matchers.find((m) => m.re.test(q))?.name || 'other';

async function pull(dimensions) {
  const rows = (await gsc(token, `webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    startDate: start, endDate: end, dimensions, rowLimit: 25000,
  })).rows || [];
  return rows;
}

let byQuery, byPage;
try {
  [byQuery, byPage] = await Promise.all([pull(['query']), pull(['page'])]);
} catch (e) {
  console.error(`[measure-gsc] ${e.message}`);
  if (String(e.message).includes('403')) {
    console.error('\n403 causes, in order of likelihood:');
    console.error('- credential account has no access to the property (the OAuth login must');
    console.error('  be done as koreal6803@gmail.com — redo the CLOUDSDK_CONFIG login above);');
    console.error('- quota project rejected (set GSC_QUOTA_PROJECT to a project you own with');
    console.error('  the Search Console API enabled; default fdata-299302);');
    console.error('- property id mismatch (domain vs URL-prefix: try');
    console.error('  GSC_SITE_URL=https://forest-international.com/).');
  }
  process.exit(1);
}

const clusterAgg = {};
for (const r of byQuery) {
  const c = bucket(r.keys[0]);
  const a = (clusterAgg[c] ||= { clicks: 0, impressions: 0, pos_weighted: 0 });
  a.clicks += r.clicks; a.impressions += r.impressions; a.pos_weighted += r.position * r.impressions;
}
for (const a of Object.values(clusterAgg)) {
  a.position = a.impressions ? +(a.pos_weighted / a.impressions).toFixed(1) : null;
  delete a.pos_weighted;
}

const striking = byQuery
  .filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 10)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 40)
  .map((r) => ({ query: r.keys[0], cluster: bucket(r.keys[0]), clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1) }));

const out = {
  generated_at: new Date().toISOString(), site: SITE, window: { start, end },
  clusters: clusterAgg, striking_distance: striking,
  top_pages: byPage.sort((a, b) => b.clicks - a.clicks).slice(0, 30)
    .map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1) })),
  totals: {
    clicks: byQuery.reduce((s, r) => s + r.clicks, 0),
    impressions: byQuery.reduce((s, r) => s + r.impressions, 0),
    queries: byQuery.length,
  },
};

const file = join(ROOT, 'seo/metrics', `gsc-${new Date().toISOString().slice(0, 10)}.json`);
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, JSON.stringify(out, null, 2));
console.log(`→ wrote ${file}`);
console.log(`totals: ${out.totals.clicks} clicks / ${out.totals.impressions} impressions / ${out.totals.queries} queries`);
console.log('clusters:', JSON.stringify(clusterAgg));
console.log(`striking-distance queries: ${striking.length}`);
