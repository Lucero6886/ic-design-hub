#!/usr/bin/env node
/* Learning Hub validator — run from repo root: node tools/validate.mjs
   Checks (no dependencies, no network):
   1. every internal href/src resolves to an existing file
   2. no absolute-path links (would break under /REPOSITORY/ on GitHub Pages)
   3. no page links accidentally into another version's week pages
      (allowed cross-version links: version homes, V3 docs, and the two
       explicitly intended Week5 references from V1's notice/index pages)
   4. required meta: <title>, lang attribute, charset
   5. duplicate element ids introduced per page (baseline-aware for archives)
   6. external domains restricted to the known historical allowlist
   Exit code 0 = PASS. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const errors = [];
const warns = [];

const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '_source' || e.name === 'node_modules' || e.name.startsWith('.git')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(ROOT);

const EXT_ALLOW = new Set([
  'cdn.tailwindcss.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com',
  'fonts.gstatic.com', 'forms.gle', 'www.edaplayground.com', 'edaplayground.com',
  'www.w3.org', 'github.com',
]);
const LINK_RE = /(?:href|src)\s*=\s*"([^"]+)"/g;

// intended cross-version links (hub navigation & documented references)
function crossAllowed(fromRel, target) {
  if (/versions\/v[123]\/index\.html$/.test(target)) return true;      // version homes
  if (/versions\/v\d+\/VERSION_NOTES\.html$/.test(target)) return true; // hub-created notes pages
  if (/^versions\/v3\//.test(target) && !/Week\d/.test(target)) return true; // v3 docs from hub pages
  const intended = new Set([
    'versions/v1/index.html->versions/v2/Week5.html',
    'versions/v1/Week5.html->versions/v2/Week5.html',
    'versions/v1/Week5.html->versions/v3/Week05.html',
  ]);
  return intended.has(fromRel + '->' + target);
}

for (const f of htmlFiles) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const s = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const inVersion = (rel.match(/^versions\/(v\d+)\//) || [])[1] || null;

  if (!/<title>/i.test(s)) errors.push(`${rel}: missing <title>`);
  if (!/<html[^>]+lang=/i.test(s)) warns.push(`${rel}: missing lang attribute`);
  if (!/<meta[^>]+charset/i.test(s)) errors.push(`${rel}: missing charset`);

  // duplicate ids
  const ids = [...s.matchAll(/\bid\s*=\s*"([^"]+)"/g)].map(m => m[1]);
  const seen = new Set(), dup = new Set();
  for (const id of ids) { if (seen.has(id)) dup.add(id); seen.add(id); }
  if (dup.size) {
    const isArchive = /^versions\/v[12]\/Week/.test(rel);
    const msg = `${rel}: duplicate id(s): ${[...dup].slice(0, 5).join(', ')}`;
    (isArchive ? warns : errors).push(msg + (isArchive ? ' (historical, pre-existing)' : ''));
  }

  let m;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(s))) {
    const raw = m[1];
    if (raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('data:') || raw.startsWith('javascript:')) continue;
    if (/^https?:\/\//.test(raw)) {
      const host = raw.replace(/^https?:\/\//, '').split(/[/?#]/)[0];
      if (!EXT_ALLOW.has(host)) warns.push(`${rel}: external domain not in allowlist: ${host}`);
      continue;
    }
    if (raw.startsWith('//')) { errors.push(`${rel}: protocol-relative link: ${raw}`); continue; }
    if (raw.startsWith('/')) { errors.push(`${rel}: ABSOLUTE path link (breaks under /REPO/): ${raw}`); continue; }
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.resolve(path.dirname(f), decodeURIComponent(clean));
    if (!fs.existsSync(target)) { errors.push(`${rel}: dead link -> ${raw}`); continue; }
    const tRel = path.relative(ROOT, target).replace(/\\/g, '/');
    const tVersion = (tRel.match(/^versions\/(v\d+)\//) || [])[1] || null;
    if (inVersion && tVersion && tVersion !== inVersion && !crossAllowed(rel, tRel)) {
      errors.push(`${rel}: unexpected cross-version link -> ${tRel}`);
    }
  }
}

console.log(`checked ${htmlFiles.length} HTML files`);
for (const e of errors) console.log('  ERR  ' + e);
for (const w of warns.slice(0, 30)) console.log('  warn ' + w);
if (warns.length > 30) console.log(`  ... ${warns.length - 30} more warnings`);
console.log(`RESULT: ${errors.length} error(s), ${warns.length} warning(s) — ${errors.length ? 'FAIL' : 'PASS'}`);
process.exit(errors.length ? 1 : 0);
