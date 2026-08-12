#!/usr/bin/env node
/**
 * Tạo nội dung mới từ template — giữ CỐ Ý đơn giản (copy template + điền ngày/slug).
 * Không có script này vẫn làm tay được: copy file trong templates/ rồi sửa.
 *
 *   npm run new:article  -- "Tiêu đề bài viết"
 *   npm run new:research -- "Tiêu đề ghi chú"
 *   npm run new:project  -- "Tên project"
 *   npm run new:resource -- "Tên tài nguyên"
 *   npm run new:announcement -- "Tiêu đề thông báo"
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const KINDS = {
  article: { template: "templates/article.md", dir: "src/content/articles" },
  research: { template: "templates/research-note.md", dir: "src/content/research" },
  project: { template: "templates/project.md", dir: "src/content/projects" },
  resource: { template: "templates/resource.md", dir: "src/content/resources" },
  announcement: { template: "templates/announcement.md", dir: "src/content/announcements" },
};

const kind = process.argv[2];
const title = process.argv.slice(3).join(" ").trim();
if (!KINDS[kind] || !title) {
  console.error('Cách dùng: npm run new:article -- "Tiêu đề bài viết"');
  console.error("Các loại: " + Object.keys(KINDS).join(", "));
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFD")
  .replace(/[̀-ͯ]/g, "")
  .replace(/đ/g, "d")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .slice(0, 80);

const { template, dir } = KINDS[kind];
const out = path.join(ROOT, dir, `${slug}.md`);
if (fs.existsSync(out)) {
  console.error(`Đã tồn tại: ${path.relative(ROOT, out)} — chọn tiêu đề khác hoặc sửa file đó.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
let s = fs.readFileSync(path.join(ROOT, template), "utf8");
s = s.replaceAll("__TITLE__", title.replace(/"/g, '\\"')).replaceAll("__DATE__", today);

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, s, "utf8");
console.log(`Đã tạo: ${path.relative(ROOT, out)}`);
console.log("Tiếp theo: mở file, điền frontmatter còn thiếu, viết nội dung, rồi `npm run dev` để xem.");
console.log("Lưu ý: file đang ở draft: true — đổi thành false khi sẵn sàng công bố.");
