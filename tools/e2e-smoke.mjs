#!/usr/bin/env node
/**
 * Smoke test trình duyệt thật (Chromium headless) trên bản build dist/ phục vụ dưới
 * đường dẫn con — mô phỏng GitHub Pages project site. KHÔNG chạy trong CI mặc định
 * (cần playwright); dùng cho kiểm định thủ công: node tools/e2e-smoke.mjs
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const BASE = "/ic-design-hub";
const PORT = 8377;

const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".zip": "application/zip", ".md": "text/plain" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!p.startsWith(BASE + "/") && p !== BASE) { res.writeHead(404); res.end("outside base"); return; }
  p = p.slice(BASE.length) || "/";
  let f = path.join(DIST, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!existsSync(f)) f = path.join(DIST, "404.html");
  res.writeHead(existsSync(f) ? 200 : 404, { "Content-Type": MIME[path.extname(f)] ?? "application/octet-stream" });
  res.end(readFileSync(f));
});

const results = [];
function check(name, ok, extra = "") {
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
  if (!ok) process.exitCode = 1;
}

await new Promise((r) => server.listen(PORT, r));
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_BROWSERS_PATH
    ? { executablePath: process.env.PLAYWRIGHT_BROWSERS_PATH + "/chromium" }
    : {},
);
try {
  const consoleErrors = [];
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  // bỏ qua favicon.ico: trang legacy (nguyên trạng lịch sử) không khai báo favicon nên
  // trình duyệt tự xin /favicon.ico — 404 này có sẵn từ hub cũ, không phải lỗi của site mới
  page.on("request", (r) => { if (r.url().endsWith("favicon.ico")) return; });
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().endsWith("favicon.ico")) consoleErrors.push(`${r.status()} ${r.url()}`);
  });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  const U = (p) => `http://localhost:${PORT}${BASE}/${p}`;

  // 1. Trang chủ
  await page.goto(U(""), { waitUntil: "load" });
  check("Trang chủ tải", (await page.title()).includes("IC Design"));
  check("Trang chủ: có lối vào theo mục tiêu", (await page.locator(".goal-tiles a").count()) >= 6);

  // 2. Điều hướng: trang chủ → Học → giáo trình V3 (legacy)
  await page.click('a[href$="/learn/"]');
  await page.waitForLoadState("load");
  check("Learn mở được", (await page.title()).includes("Học"));
  await page.click('a.btn.primary[href*="legacy/versions/v3"]');
  await page.waitForLoadState("load");
  check("V3 legacy mở từ Learn", (await page.title()).includes("IC Design Mentoring"));
  const chip = page.locator('a.chip[href="../../index.html"]').first();
  check("Chip ⌂ Hub trong V3 còn nguyên", (await chip.count()) > 0);

  // 3. Tìm kiếm: từ khóa có dấu, không dấu, phạm vi legacy
  await page.goto(U("search/"), { waitUntil: "load" });
  await page.fill("#search-input", "uart");
  await page.waitForTimeout(500);
  const uartCount = await page.locator("#search-results li").count();
  check("Search 'uart' ra kết quả", uartCount >= 3, `${uartCount} kết quả`);
  await page.fill("#search-input", "mach tuan tu");
  await page.waitForTimeout(500);
  const noDiacritics = await page.locator("#search-results li").count();
  check("Search KHÔNG DẤU 'mach tuan tu' ra kết quả", noDiacritics >= 1, `${noDiacritics} kết quả`);
  const firstHref = await page.locator("#search-results a").first().getAttribute("href");
  check("Kết quả search có base path đúng", firstHref?.startsWith(BASE + "/") ?? false, firstHref ?? "");

  // 4. Bài viết: render markdown + code + attribution
  await page.goto(U("articles/reset-va-trang-thai-khoi-dong-flip-flop/"), { waitUntil: "load" });
  check("Bài viết render", (await page.locator("article h2").count()) >= 3);
  check("Khung attribution hiển thị", (await page.locator(".co.warn").count()) >= 1);

  // 5. Trang chuyển hướng URL cũ
  await page.goto(U("versions/v3/Week05.html"), { waitUntil: "load" });
  await page.waitForURL("**/legacy/versions/v3/Week05.html", { timeout: 5000 });
  check("URL cũ /versions/... tự chuyển về /legacy/", true);

  // 6. Responsive 390px: không tràn ngang trên các trang chính
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const p of ["", "learn/", "articles/", "projects/smart-traffic-controller-fpga/", "search/"]) {
    await mob.goto(U(p), { waitUntil: "load" });
    const overflow = await mob.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(`Mobile 390px không tràn ngang: /${p}`, overflow <= 1, `chênh ${overflow}px`);
  }
  await mob.close();

  // 7. Dark mode toggle
  await page.goto(U(""), { waitUntil: "load" });
  await page.click("#theme-toggle");
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  check("Dark mode toggle hoạt động", theme === "dark", `theme=${theme}`);

  // 8. Console sạch
  check("0 lỗi console/page trên các trang hub mới đã duyệt", consoleErrors.length === 0,
    consoleErrors.slice(0, 3).join(" | "));
} finally {
  await browser.close();
  server.close();
}
console.log(results.join("\n"));
console.log(`\n${results.filter((r) => r.startsWith("PASS")).length}/${results.length} PASS`);
