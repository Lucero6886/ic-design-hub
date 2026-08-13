#!/usr/bin/env node
/**
 * fetch-news.mjs — lấy tin từ danh sách nguồn uy tín (src/data/news-sources.json)
 * và ghi ra src/data/news-items.json cho trang /news/.
 *
 * Chạy Ở ĐÂU: trong GitHub Actions trước bước build (theo lịch hằng ngày + mỗi lần push).
 * Nguyên tắc:
 *   - KHÔNG BAO GIỜ làm fail build: nguồn nào lỗi thì bỏ qua (giữ dữ liệu cũ nếu tất cả lỗi).
 *   - Chỉ lưu: tiêu đề + link + nguồn + ngày (metadata dẫn nguồn) — KHÔNG sao chép nội dung
 *     bài báo; bản quyền tin thuộc về nguồn tương ứng.
 *   - Nguồn tiếng Việt tổng hợp: lọc theo keywords (so khớp không dấu).
 *
 * Self-test KHÔNG CẦN MẠNG (chạy trong npm run check):
 *   node tools/fetch-news.mjs --selftest
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/news-sources.json"), "utf8"));
const OUT = path.join(ROOT, "src/data/news-items.json");

const MAX_PER_SOURCE = 12;
const MAX_TOTAL = 36;
const MAX_AGE_DAYS = 60;

const fold = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");

const unesc = (s) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
   .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
   .replace(/<[^>]+>/g, "").trim();

/** Parser RSS 2.0 + Atom tối giản, không dependency. Trả [{title,url,date}] */
export function parseFeed(xml) {
  const items = [];
  // RSS 2.0: <item>…</item>
  for (const m of xml.matchAll(/<item[\s>][\s\S]*?<\/item>/g)) {
    const it = m[0];
    const title = (it.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1];
    const link = (it.match(/<link[^>]*>([\s\S]*?)<\/link>/) || [])[1];
    const date = (it.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1];
    if (title && link) items.push({ title: unesc(title), url: unesc(link), date: date ? new Date(date.trim()).toISOString() : null });
  }
  if (items.length) return items;
  // Atom: <entry>…</entry>
  for (const m of xml.matchAll(/<entry[\s>][\s\S]*?<\/entry>/g)) {
    const it = m[0];
    const title = (it.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1];
    const link = (it.match(/<link[^>]*href="([^"]+)"/) || [])[1];
    const date = (it.match(/<(?:updated|published)>([\s\S]*?)<\/(?:updated|published)>/) || [])[1];
    if (title && link) items.push({ title: unesc(title), url: link.trim(), date: date ? new Date(date.trim()).toISOString() : null });
  }
  return items;
}

export function filterByKeywords(items, keywords) {
  if (!keywords || !keywords.length) return items;
  const kws = keywords.map(fold);
  return items.filter((it) => {
    const t = " " + fold(it.title) + " ";
    return kws.some((k) => t.includes(k));
  });
}

async function fetchSource(src) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(src.feedUrl, {
      signal: ctrl.signal,
      headers: { "User-Agent": "ic-design-hub-news/1.0 (+github pages site; RSS reader)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    let items = parseFeed(xml);
    items = filterByKeywords(items, src.keywords);
    const cutoff = Date.now() - MAX_AGE_DAYS * 864e5;
    items = items
      .filter((it) => !it.date || new Date(it.date).valueOf() > cutoff)
      .slice(0, MAX_PER_SOURCE)
      .map((it) => ({ ...it, source: src.name, sourceId: src.id, lang: src.lang, group: src.group }));
    console.log(`ok    ${src.id}: ${items.length} tin`);
    return items;
  } catch (e) {
    console.warn(`SKIP  ${src.id}: ${e.message}`);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/* ---------------- self-test (không mạng) ---------------- */
function selftest() {
  const rss = `<?xml version="1.0"?><rss><channel>
    <item><title><![CDATA[Tin A &amp; B]]></title><link>https://x.vn/a</link><pubDate>Wed, 12 Aug 2026 07:00:00 +0700</pubDate></item>
    <item><title>Việt Nam cần có phòng thí nghiệm phát triển chip dùng chung</title><link>https://x.vn/chip</link><pubDate>Thu, 13 Aug 2026 07:00:00 +0700</pubDate></item>
  </channel></rss>`;
  const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
    <entry><title>Exotic Quasiparticles</title><link href="https://s.org/q"/><updated>2026-07-27T00:00:00Z</updated></entry>
  </feed>`;
  const a = parseFeed(rss);
  const b = parseFeed(atom);
  const f = filterByKeywords(a, ["vi mach", "chip"]);
  const checks = [
    [a.length === 2, "RSS: parse đủ 2 item"],
    [a[0].title === "Tin A & B", "RSS: CDATA + entity"],
    [a[0].url === "https://x.vn/a", "RSS: link"],
    [!!a[0].date, "RSS: pubDate → ISO"],
    [b.length === 1 && b[0].url === "https://s.org/q", "Atom: entry + href"],
    [f.length === 1 && f[0].url === "https://x.vn/chip", "Lọc từ khóa KHÔNG DẤU ('chip' khớp tiêu đề có dấu)"],
  ];
  let fail = 0;
  for (const [ok, name] of checks) { console.log(`${ok ? "PASS" : "FAIL"}  ${name}`); if (!ok) fail++; }
  process.exit(fail ? 1 : 0);
}

if (process.argv.includes("--selftest")) selftest();
else {
  const all = (await Promise.all(SRC.sources.map(fetchSource))).flat();
  if (!all.length) {
    console.warn("Không lấy được tin từ nguồn nào — GIỮ NGUYÊN dữ liệu hiện có, không ghi đè.");
    process.exit(0);
  }
  all.sort((x, y) => new Date(y.date ?? 0).valueOf() - new Date(x.date ?? 0).valueOf());
  const out = { fetchedAt: new Date().toISOString(), seed: false, items: all.slice(0, MAX_TOTAL) };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1), "utf8");
  console.log(`news-items.json: ${out.items.length} tin từ ${new Set(all.map(i => i.sourceId)).size} nguồn`);
}
