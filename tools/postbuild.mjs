#!/usr/bin/env node
/**
 * Hậu build (chạy tự động trong `npm run build` sau `astro build`):
 *
 * 1. Copy `_source/` (provenance bất biến) vào dist/legacy/_source/ — giữ hành vi của
 *    Learning Hub cũ: bản gốc nguyên trạng được PHỤC VỤ công khai trên site.
 * 2. Sinh trang chuyển hướng tương thích tại các URL CŨ của Learning Hub
 *    (/versions/..., /evolution.html, /about.html) → vị trí mới dưới /legacy/.
 *    GitHub Pages không có server-side redirect nên dùng meta-refresh + canonical.
 * 3. Đảm bảo .nojekyll tồn tại trong dist (bắt buộc nếu deploy dạng branch).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(ROOT, "dist");
const LEGACY_PUB = path.join(ROOT, "public/legacy");

if (!fs.existsSync(DIST)) {
  console.error("dist/ chưa tồn tại — chạy `astro build` trước.");
  process.exit(1);
}

/* 1. _source → dist/legacy/_source */
const SRC = path.join(ROOT, "_source");
const DST = path.join(DIST, "legacy/_source");
fs.cpSync(SRC, DST, { recursive: true });
console.log(`postbuild: copy _source/ → dist/legacy/_source (${fs.readdirSync(DST).length} file)`);

/* 2. Trang chuyển hướng tương thích URL cũ */
function redirectHtml(rel, target) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Đã chuyển — ${rel}</title>
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
<meta name="robots" content="noindex">
</head>
<body>
<p>Trang này đã chuyển vào khu lưu trữ: <a href="${target}">${target}</a></p>
</body>
</html>
`;
}

let count = 0;
function stub(oldRel, newRelFromOld) {
  const out = path.join(DIST, oldRel);
  if (fs.existsSync(out)) return; // không đè trang thật của site mới
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, redirectHtml(oldRel, newRelFromOld), "utf8");
  count++;
}

// mọi trang HTML trong cây versions cũ
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) {
      const rel = path.relative(LEGACY_PUB, p).replace(/\\/g, "/"); // versions/v3/Week05.html
      const depth = rel.split("/").length - 1;
      const target = "../".repeat(depth) + "legacy/" + rel;
      stub(rel, target);
    }
  }
})(path.join(LEGACY_PUB, "versions"));
// hai trang gốc cũ (index.html cũ do trang chủ mới thay — không stub)
stub("evolution.html", "legacy/evolution.html");
stub("about.html", "legacy/about.html");
console.log(`postbuild: ${count} trang chuyển hướng tương thích URL cũ`);

/* 3. .nojekyll */
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
console.log("postbuild: .nojekyll OK");
