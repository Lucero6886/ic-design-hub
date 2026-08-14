#!/usr/bin/env node
/**
 * BẢN VÁ HIỂN THỊ 2026-08-14 — tắt ligature vùng code trên 23 trang tuần gốc V1/V2.
 *
 * Vấn đề: V2 nạp webfont JetBrains Mono (CDN), V1 dùng stack mono của Tailwind
 * (ui-monospace đứng đầu — trên một số trình duyệt/máy resolve ra Cascadia Code).
 * Các font này bật ligature mặc định → chuỗi hai ký tự "<=" (toán tử non-blocking
 * SystemVerilog) bị VẼ thành hình giống ≤ — sai ký hiệu trong ngữ cảnh giảng dạy.
 *
 * Phân loại theo VERSIONING_POLICY: "Sửa hiển thị chặn đọc, tối thiểu" — chèn đúng MỘT
 * thẻ <style> tự chứa trước </head>, không đổi một ký tự nội dung giảng dạy nào
 * (byte của "<=" giữ nguyên; chỉ ép font hiển thị từng ký tự). Ghi CONTENT_CHANGELOG.
 * Script giữ lại trong repo để bản vá tự tài liệu hóa; chạy lại an toàn (idempotent).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.join(ROOT, "public/legacy");

const STYLE =
  '<style id="icdh-no-code-ligatures">/* [Hub 2026-08-14] Tắt ligature vùng code: tránh "<=" bị vẽ thành ≤ (Cascadia Code/JetBrains Mono). Nội dung không đổi. */\n' +
  'code, pre, kbd, samp, .code-block, .mono { font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0, "dlig" 0; }</style>\n';

const FILES = [
  ...[1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12].map((w) => `versions/v1/Week${w}.html`),
  ...[...Array(12)].map((_, i) => `versions/v2/Week${i + 1}.html`),
];

let patched = 0;
for (const rel of FILES) {
  const f = path.join(LEGACY, rel);
  let s = fs.readFileSync(f, "utf8");
  if (s.includes("icdh-no-code-ligatures")) { console.log(`skip     ${rel}`); continue; }
  if (!s.includes("</head>")) { console.error(`!!       ${rel}: không thấy </head>`); process.exitCode = 1; continue; }
  s = s.replace("</head>", STYLE + "</head>");
  fs.writeFileSync(f, s, "utf8");
  patched++;
  console.log(`PATCHED  ${rel}`);
}
console.log(`=> ${patched}/${FILES.length} trang tuần V1/V2 được chèn style tắt ligature.`);
