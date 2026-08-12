#!/usr/bin/env node
/**
 * Kiểm định OUTPUT BUILD (dist/) — chạy sau `npm run build`:
 *   1. Mọi href/src nội bộ trong HTML của SITE MỚI trỏ tới file tồn tại trong dist.
 *   2. Trang site mới có <title>, lang, charset, canonical.
 *   3. Không có nội dung draft lọt ra (quét chuỗi frontmatter draft:true đã biết).
 *   4. search-index.json tồn tại và mọi đường dẫn `p` trong đó trỏ tới file có thật.
 *   5. sitemap-index.xml, rss.xml, robots.txt, 404.html tồn tại.
 * Cây legacy đã có validator riêng (npm run check → tools/validate-legacy.mjs)
 * nên ở đây chỉ kiểm các liên kết TỪ site mới VÀO legacy.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(ROOT, "dist");
const errors = [];
const warns = [];

if (!fs.existsSync(DIST)) {
  console.error("dist/ chưa tồn tại — chạy `npm run build` trước.");
  process.exit(1);
}

/* thu thập HTML của site mới (bỏ cây legacy + trang stub chuyển hướng versions/) */
const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    const rel = path.relative(DIST, p).replace(/\\/g, "/");
    if (e.isDirectory()) {
      if (rel === "legacy" || rel === "versions") continue;
      walk(p);
    } else if (e.name.endsWith(".html")) {
      if (rel === "evolution.html" || rel === "about.html") continue; // stub chuyển hướng
      htmlFiles.push(p);
    }
  }
})(DIST);

/* Tự phát hiện base path từ canonical của trang chủ (khớp đúng base lúc build) */
let BASE = (process.env.ASTRO_BASE || "").replace(/\/$/, "");
try {
  const home = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  const m = home.match(/rel="canonical"\s+href="([^"]+)"/);
  if (m) BASE = new URL(m[1]).pathname.replace(/\/$/, "");
} catch { /* giữ giá trị từ env */ }
console.log(`validate-dist: base = "${BASE || "/"}"`);

const LINK_RE = /(?:href|src)\s*=\s*"([^"]+)"/g;
for (const f of htmlFiles) {
  const rel = path.relative(DIST, f).replace(/\\/g, "/");
  const s = fs.readFileSync(f, "utf8");

  if (!/<title>/i.test(s)) errors.push(`${rel}: thiếu <title>`);
  if (!/<html[^>]+lang=/i.test(s)) errors.push(`${rel}: thiếu lang`);
  if (!/<meta[^>]+charset/i.test(s)) errors.push(`${rel}: thiếu charset`);
  if (!/rel="canonical"/.test(s) && rel !== "404.html" && !/noindex/.test(s))
    warns.push(`${rel}: thiếu canonical`);

  let m;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(s))) {
    const raw = m[1];
    if (/^(#|mailto:|data:|javascript:|https?:\/\/)/.test(raw)) continue;
    if (raw.startsWith("//")) { errors.push(`${rel}: link protocol-relative: ${raw}`); continue; }
    const clean = raw.split("#")[0].split("?")[0];
    if (!clean) continue;
    let target;
    if (clean.startsWith("/")) {
      // đường dẫn tuyệt đối: hợp lệ chỉ khi nằm trong base — quy về dist theo base đã build
      if (BASE && !clean.startsWith(BASE + "/") && clean !== BASE) {
        errors.push(`${rel}: link tuyệt đối ngoài base (${BASE}): ${raw}`);
        continue;
      }
      target = path.join(DIST, decodeURIComponent(clean.slice(BASE.length).replace(/^\//, "")));
    } else {
      target = path.resolve(path.dirname(f), decodeURIComponent(clean));
    }
    if (fs.existsSync(target)) continue;
    // thư mục có index.html?
    if (fs.existsSync(path.join(target, "index.html"))) continue;
    // dạng /path không có đuôi → thử path.html (trailingSlash ignore)
    if (fs.existsSync(target + ".html")) continue;
    if (fs.existsSync(target + "/index.html")) continue;
    errors.push(`${rel}: link chết → ${raw}`);
  }
}

/* draft không được lọt ra dist */
function walkMd(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkMd(p, out);
    else if (/\.(md|mdx)$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of walkMd(path.join(ROOT, "src/content"))) {
  const src = fs.readFileSync(f, "utf8");
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const isDraft = /^draft:\s*true\s*$/m.test(fm[1]) || /^status:\s*["']?draft["']?\s*$/m.test(fm[1]);
  if (!isDraft) continue;
  const title = (fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m) || [])[1];
  if (!title) continue;
  for (const h of htmlFiles) {
    if (fs.readFileSync(h, "utf8").includes(title)) {
      errors.push(`DRAFT LỌT RA: "${title}" xuất hiện trong ${path.relative(DIST, h)}`);
      break;
    }
  }
}

/* search index */
const idxFile = path.join(DIST, "search-index.json");
if (!fs.existsSync(idxFile)) errors.push("thiếu search-index.json trong dist");
else {
  const idx = JSON.parse(fs.readFileSync(idxFile, "utf8"));
  let dead = 0;
  for (const e of idx) {
    const t = path.join(DIST, e.p);
    if (!(fs.existsSync(t) || fs.existsSync(path.join(t, "index.html")) || fs.existsSync(t.replace(/\/$/, "") + "/index.html")))
      { errors.push(`search-index: đường dẫn chết → ${e.p}`); dead++; }
    if (dead > 5) break;
  }
  console.log(`search-index.json: ${idx.length} mục`);
}

/* các file hạ tầng */
for (const f of ["sitemap-index.xml", "rss.xml", "robots.txt", "404.html", ".nojekyll", "legacy/index.html", "legacy/_source/version3.zip"]) {
  if (!fs.existsSync(path.join(DIST, f))) errors.push(`thiếu ${f} trong dist`);
}

console.log(`validate-dist: kiểm ${htmlFiles.length} trang HTML của site mới`);
for (const e of errors) console.log("  ERR  " + e);
for (const w of warns.slice(0, 20)) console.log("  warn " + w);
console.log(`KẾT QUẢ: ${errors.length} lỗi, ${warns.length} cảnh báo — ${errors.length ? "FAIL" : "PASS"}`);
process.exit(errors.length ? 1 : 0);
