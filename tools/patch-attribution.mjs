#!/usr/bin/env node
/**
 * BẢN VÁ ATTRIBUTION / METADATA PHÁP LÝ — chạy MỘT LẦN trong đợt chuyển đổi 2026-08-12.
 *
 * Phạm vi (theo VERSIONING_POLICY, hạng mục "Attribution / legal metadata correction"):
 *   - CHỈ đổi danh tính tác giả + chủ sở hữu bản quyền trên các trang hub-tạo và
 *     trên bản nhúng của giáo trình V3 (bản hiện hành).
 *   - KHÔNG đụng tới trang tuần gốc V1/V2 (chúng không chứa metadata tác giả nào —
 *     đã kiểm chứng bằng grep trước khi vá) và KHÔNG đụng `_source/`.
 *   - Danh sách file là ALLOWLIST tường minh: file ngoài danh sách không bao giờ bị sửa.
 *
 * Script được giữ lại trong repo để bản vá tự tài liệu hóa và tái lập được.
 * Kết quả từng file được ghi vào docs/CONTENT_CHANGELOG.md (bảng trong mục 2026-08-12).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.join(ROOT, "public/legacy");

/** Cặp thay thế — thứ tự quan trọng (chuỗi dài/bold trước) */
const REPLACEMENTS = [
  {
    from: "Bản quyền thuộc **Khoa Điện – Điện tử, Trường Kỹ thuật, Đại học Phenikaa**",
    to: "Bản quyền thuộc về **Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa**",
  },
  {
    from: "Bản quyền thuộc Khoa Điện – Điện tử, Trường Kỹ thuật, Đại học Phenikaa",
    to: "Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa",
  },
  { from: "Thạc sỹ Đinh Văn Nam", to: "Giảng Viên Đinh Văn Nam" },
];

/** ALLOWLIST — đúng các file mang danh tính cũ (xác định bằng grep toàn kho, xem
 *  docs/audit/INITIAL_REPOSITORY_AUDIT.md mục 9). Trang tuần gốc V1/V2 KHÔNG có trong này. */
const FILES = [
  // Trang hub cũ (hub-tạo 08/08/2026 — không phải artifact giáo dục)
  "index.html",
  "about.html",
  "evolution.html",
  "README.md",
  // Trang hub-tạo trong V1/V2 (index/notes/trang ghi nhận Tuần 5)
  "versions/v1/index.html",
  "versions/v1/VERSION_NOTES.html",
  "versions/v1/Week5.html",
  "versions/v2/index.html",
  "versions/v2/VERSION_NOTES.html",
  // V3 — bản hiện hành (active content): 21 trang HTML + 8 nguồn .md + tooling
  ...[...Array(12)].map((_, i) => `versions/v3/Week${String(i + 1).padStart(2, "0")}.html`),
  "versions/v3/index.html",
  "versions/v3/README.html",
  "versions/v3/README.md",
  "versions/v3/CURRICULUM_MAP.html",
  "versions/v3/CURRICULUM_MAP.md",
  "versions/v3/MENTOR_GUIDE.html",
  "versions/v3/MENTOR_GUIDE.md",
  "versions/v3/PROJECT_GUIDE.html",
  "versions/v3/PROJECT_GUIDE.md",
  "versions/v3/TECHNICAL_AUDIT.html",
  "versions/v3/TECHNICAL_AUDIT.md",
  "versions/v3/CHANGELOG_V2_TO_V3.html",
  "versions/v3/CHANGELOG_V2_TO_V3.md",
  "versions/v3/VALIDATION_REPORT.html",
  "versions/v3/VALIDATION_REPORT.md",
  "versions/v3/implementation-notes.html",
  "versions/v3/implementation-notes.md",
  "versions/v3/tools/mkdocs.mjs",
  "versions/v3/tools/README-tools.md",
];

let totalFiles = 0;
let totalHits = 0;
const report = [];

for (const rel of FILES) {
  const f = path.join(LEGACY, rel);
  if (!fs.existsSync(f)) {
    report.push(`MISSING  ${rel}`);
    continue;
  }
  let s = fs.readFileSync(f, "utf8");
  let hits = 0;
  for (const { from, to } of REPLACEMENTS) {
    let n = 0;
    while (s.includes(from)) {
      s = s.replace(from, to);
      n++;
    }
    hits += n;
  }
  if (hits > 0) {
    fs.writeFileSync(f, s, "utf8");
    totalFiles++;
    totalHits += hits;
    report.push(`PATCHED  ${rel}  (${hits} thay thế)`);
  } else {
    report.push(`nochange ${rel}`);
  }
}

console.log(report.join("\n"));
console.log(`\n=> ${totalFiles} file được vá, ${totalHits} lượt thay thế.`);

// Kiểm tra hậu điều kiện: không còn danh tính cũ ở BẤT KỲ đâu trong cây legacy
// (trừ khi nằm trong file không thuộc allowlist — khi đó phải rà lại thủ công).
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(html|md|mjs|js|css|json)$/.test(e.name)) out.push(p);
  }
  return out;
}
const leftovers = [];
for (const f of walk(LEGACY)) {
  const s = fs.readFileSync(f, "utf8");
  if (s.includes("Thạc sỹ Đinh Văn Nam") || s.includes("Bản quyền thuộc Khoa")) {
    leftovers.push(path.relative(LEGACY, f));
  }
}
if (leftovers.length) {
  console.error("\nCẢNH BÁO — danh tính cũ còn sót ở:", leftovers);
  process.exit(1);
}
console.log("Hậu kiểm: không còn danh tính cũ trong cây legacy. ✔");
