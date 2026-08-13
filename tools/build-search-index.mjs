#!/usr/bin/env node
/**
 * Sinh chỉ mục tìm kiếm TOÀN HUB → public/search-index.json
 *
 * Bao phủ:
 *   1. Nội dung mới (src/content/**): articles, research, projects, learning-paths,
 *      resources — đọc frontmatter + heading; BỎ QUA draft.
 *   2. Trang tĩnh chính của site mới (danh sách khai báo bên dưới).
 *   3. TOÀN BỘ giáo trình legacy V1/V2/V3 (public/legacy/versions/**) — tái sử dụng đúng
 *      logic quét heading của Learning Hub cũ (đã kiểm định).
 *
 * Tự chạy trong `npm run dev|build|check` — KHÔNG BAO GIỜ sửa file này theo từng bài viết.
 * Gập dấu tiếng Việt hai phía (index + truy vấn) để gõ không dấu vẫn tìm được.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "public/search-index.json");

const fold = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");

const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const IDX = [];
/** entry: s=section, l=label hiển thị, t=title, p=path (tương đối gốc site), h=headings, ft/fh=folded */
function push(s, l, t, p, heads, extra = "") {
  IDX.push({
    s, l, t, p,
    h: heads.slice(0, 40),
    ft: fold(t),
    fh: fold(heads.join(" § ") + " " + extra),
  });
}

/* ---------- 1. Nội dung collections (Markdown frontmatter, không dependency) ---------- */
function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: {}, body: src };
  const fm = {};
  // parser tối giản: chỉ cần title/summary/tags/draft/status ở mức chuỗi
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"')) {
      // giá trị trong nháy: lấy phần trong nháy (comment sau nháy bị bỏ)
      const q = v.match(/^"((?:[^"\\]|\\.)*)"/);
      if (q) v = q[1].replace(/\\"/g, '"');
    } else {
      // giá trị trần: cắt comment YAML (khoảng trắng + #)
      v = v.replace(/\s+#.*$/, "").trim();
    }
    fm[kv[1]] = v;
  }
  return { fm, body: src.slice(m[0].length) };
}
function mdHeadings(body) {
  const out = [];
  for (const m of body.matchAll(/^#{2,3}\s+(.+)$/gm)) {
    const t = m[1].replace(/[*_`#]/g, "").trim();
    if (t && !out.includes(t)) out.push(t);
  }
  return out;
}
function walkMd(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  (function w(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) w(p);
      else if (/\.(md|mdx)$/.test(e.name)) out.push(p);
    }
  })(dir);
  return out;
}
const COLLECTIONS = [
  { dir: "src/content/articles", urlBase: "articles/", label: "Bài viết", section: "articles" },
  { dir: "src/content/research", urlBase: "research/", label: "Nghiên cứu", section: "research" },
  { dir: "src/content/projects", urlBase: "projects/", label: "Project", section: "projects" },
  { dir: "src/content/learning-paths", urlBase: "learn/", label: "Lộ trình", section: "learn" },
  { dir: "src/content/resources", urlBase: "resources/", label: "Tài nguyên", section: "resources", listOnly: true },
];
for (const c of COLLECTIONS) {
  for (const f of walkMd(path.join(ROOT, c.dir))) {
    const src = fs.readFileSync(f, "utf8");
    const { fm, body } = parseFrontmatter(src);
    if (fm.draft === "true" || fm.status === "draft") continue; // draft không vào chỉ mục
    const slug = path
      .relative(path.join(ROOT, c.dir), f)
      .replace(/\\/g, "/")
      .replace(/\.(md|mdx)$/, "");
    const url = c.listOnly ? c.urlBase : `${c.urlBase}${slug}/`;
    const extra = [fm.summary ?? "", fm.tags ?? "", fm.track ?? ""].join(" ");
    push(c.section, c.label, fm.title ?? slug, url, mdHeadings(body), extra);
  }
}

/* ---------- 2. Trang tĩnh chính của hub mới ---------- */
const STATIC_PAGES = [
  ["Trang chủ — IC Design Learning & Research Hub", "", ["học IC design", "project", "nghiên cứu", "cộng đồng"]],
  ["Học IC Design — giáo trình & lộ trình", "learn/", ["giáo trình V3", "lộ trình học", "bản đồ chủ đề", "phiên bản lưu trữ"]],
  ["Tiến hóa giáo trình V1 → V2 → V3", "learn/evolution/", ["phiên bản", "lịch sử giáo trình", "immutable"]],
  ["Bài viết", "articles/", ["tutorial", "khái niệm", "ghi chú kỹ thuật"]],
  ["Nghiên cứu", "research/", ["research roadmap", "paper reading", "câu hỏi nghiên cứu", "EQ RQ"]],
  ["Project", "projects/", ["project sinh viên", "FPGA", "nghiên cứu"]],
  ["Mentoring", "mentoring/", ["mentor guide", "khung 60 phút", "chẩn đoán hiểu sai"]],
  ["Tài nguyên", "resources/", ["công cụ", "sách", "paper", "EDA"]],
  ["Tin tức ngành — bán dẫn, vi mạch, FPGA/ASIC, việc làm", "news/", ["tin tức", "industry radar", "thị trường", "tuyển dụng", "nghề nghiệp", "việc làm"]],
  ["Cộng đồng", "community/", ["hỏi đáp", "GitHub Discussions", "đóng góp", "pull request"]],
  ["Giới thiệu hub", "about/", ["về hub", "người phụ trách", "trích dẫn"]],
  ["Bản quyền & Attribution", "about/copyright/", ["bản quyền", "trích dẫn", "attribution", "giấy phép"]],
];
for (const [t, p, heads] of STATIC_PAGES) push("hub", "Hub", t, p, heads);

/* ---------- 3. Giáo trình legacy V1/V2/V3 (logic kế thừa từ Learning Hub) ---------- */
const LEGACY = path.join(ROOT, "public/legacy");
function headings(html, max = 44) {
  const out = [];
  const re = /<(h[123]|summary)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html)) && out.length < max) {
    const t = strip(m[2]);
    if (t && t.length > 2 && t.length < 140 && !out.includes(t)) out.push(t);
  }
  return out;
}
function legacyEntry(v, file, week, labelPrefix) {
  const rel = `versions/${v}/${file}`;
  const html = fs.readFileSync(path.join(LEGACY, rel), "utf8");
  const tTag = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
  const t = strip(h1 || tTag || file).slice(0, 110);
  push(v, labelPrefix + (week ? ` · Tuần ${week}` : ""), t, `legacy/${rel}`, headings(html));
}
if (fs.existsSync(LEGACY)) {
  for (const w of [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12]) legacyEntry("v1", `Week${w}.html`, w, "V1");
  for (let w = 1; w <= 12; w++) legacyEntry("v2", `Week${w}.html`, w, "V2");
  for (let w = 1; w <= 12; w++) legacyEntry("v3", `Week${String(w).padStart(2, "0")}.html`, w, "V3");
  for (const f of [
    "index.html", "README.html", "CURRICULUM_MAP.html", "MENTOR_GUIDE.html",
    "PROJECT_GUIDE.html", "TECHNICAL_AUDIT.html", "VALIDATION_REPORT.html",
    "CHANGELOG_V2_TO_V3.html", "implementation-notes.html",
  ]) legacyEntry("v3", f, null, "V3");
}

fs.writeFileSync(OUT, JSON.stringify(IDX), "utf8");
console.log(
  `search-index.json: ${IDX.length} mục (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB) — ` +
  `${IDX.filter((e) => ["v1", "v2", "v3"].includes(e.s)).length} legacy + ${IDX.filter((e) => !["v1", "v2", "v3"].includes(e.s)).length} hub mới`,
);
