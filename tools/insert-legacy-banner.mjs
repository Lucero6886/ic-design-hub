#!/usr/bin/env node
/**
 * Chèn banner "cây lưu trữ" vào 3 trang gốc của Learning Hub cũ (index/evolution/about).
 * Chạy MỘT LẦN trong đợt chuyển đổi 2026-08-12; giữ lại để bản vá tự tài liệu hóa.
 *
 * Đây là thay đổi loại "điều hướng" theo VERSIONING_POLICY (giống thanh điều hướng hub
 * từng chèn vào trang V1/V2 ngày 08/08/2026): khối tự chứa, inline style, không JS,
 * không đụng CSS/nội dung của trang. KHÔNG chèn vào trang tuần của bất kỳ phiên bản nào.
 * 404.html không cần banner (đã có lời dẫn quay về trang chủ hub cũ).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.join(ROOT, "public/legacy");

const BANNER = `<div id="icdh-legacy-banner" style="background:#12314a;color:#cfe3f5;font:14px/1.5 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;padding:9px 16px;text-align:center">
Bạn đang xem <b>Learning Hub phiên bản lưu trữ</b> (cổng V1/V2/V3 nguyên trạng). Hub mới — bài viết, project, nghiên cứu, cộng đồng — ở đây: <a href="../" style="color:#8ec4ee;font-weight:700">Về IC Design Learning &amp; Research Hub →</a>
</div>
`;

for (const rel of ["index.html", "evolution.html", "about.html"]) {
  const f = path.join(LEGACY, rel);
  let s = fs.readFileSync(f, "utf8");
  if (s.includes("icdh-legacy-banner")) {
    console.log(`skip     ${rel} (đã có banner)`);
    continue;
  }
  s = s.replace(/<body>\s*\n/, (m) => m + BANNER);
  fs.writeFileSync(f, s, "utf8");
  console.log(`INSERTED ${rel}`);
}
console.log("Banner legacy: xong.");
