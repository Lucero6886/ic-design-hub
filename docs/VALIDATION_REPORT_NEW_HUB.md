# VALIDATION_REPORT_NEW_HUB — kiểm định đợt chuyển đổi · 2026-08-12

Mọi mục PASS/FAIL dưới đây đều là **kết quả thực thi thật** trong quá trình chuyển đổi
(môi trường: Node v22.22.2, Astro 7.2.1, Chromium headless qua Playwright). Mục chưa kiểm được
khai báo minh bạch ở phần NOT TESTED. Công cụ chạy lại được:
`npm run check` · `npm run build` · `npm run validate` · `node tools/e2e-smoke.mjs`.

## 1. Provenance — `_source/` bất biến

| Kiểm tra | Kết quả |
|---|---|
| SHA-256 của 4 file `_source/` đo TRƯỚC chuyển đổi (ghi tại `docs/audit/PROVENANCE_RECORD.md`) và đo LẠI SAU toàn bộ chuyển đổi | **PASS** — 4/4 trùng khớp tuyệt đối (`tools/check-source-hashes.mjs`, chạy trong `npm run check` + CI mỗi build) |

## 2. Bảo tồn nội dung legacy

| Kiểm tra | Kết quả |
|---|---|
| `diff -rq` toàn cây gốc ↔ `public/legacy/` | **PASS** — đúng **40 file** khác biệt, trùng 100% với allowlist bản vá attribution đã ghi trong CONTENT_CHANGELOG; **không** file nào bị thêm/xóa |
| 23 trang tuần gốc V1 (11) + V2 (12) | **PASS** — byte-identical, không nằm trong danh sách khác biệt |
| `assets/js/search-index.js` của legacy sau khi chạy lại generator gốc | **PASS** — 44 mục, output không đổi (chứng tỏ bản vá không đụng tiêu đề/đề mục nào) |
| Validator NGUYÊN BẢN của Learning Hub chạy trên cây legacy (53 file HTML: link nội bộ, đường dẫn tuyệt đối, cross-version, title/lang/charset, id trùng, allowlist domain) | **PASS** — 0 lỗi, 0 cảnh báo |
| Hậu kiểm danh tính cũ trên toàn cây legacy (html/md/mjs/js/css/json) | **PASS** — 0 lần xuất hiện "Thạc sỹ Đinh Văn Nam" / "Bản quyền thuộc Khoa" |

## 3. Build & schema

| Kiểm tra | Kết quả |
|---|---|
| `astro check` (type + content schema) | **PASS** — 0 errors, 0 warnings |
| `astro build` production | **PASS** — 42 trang; postbuild sinh 51 trang chuyển hướng URL cũ + copy `_source` + `.nojekyll` |
| Build với base = `/ic-design-hub` (project site) | **PASS** — validate-dist 0 lỗi |
| Build với base = `/` + site khác (domain riêng) | **PASS** — validate-dist 0 lỗi, canonical đúng |
| Frontmatter sai schema → build phải FAIL | **PASS** — kiểm bằng file lỗi chủ ý trong quá trình phát triển (zod báo đúng trường) |

## 4. Liên kết & hạ tầng output (`tools/validate-dist.mjs`)

| Kiểm tra | Kết quả |
|---|---|
| Mọi href/src nội bộ của 42 trang site mới trỏ tới file có thật trong dist (kể cả link vào legacy) | **PASS** — 0 link chết |
| title/lang/charset/canonical trên trang site mới | **PASS** |
| `sitemap-index.xml` + `sitemap-0.xml` (47 URL, gồm 6 trang legacy chính) · `rss.xml` · `robots.txt` (trỏ sitemap) · `404.html` · `.nojekyll` · `legacy/_source/*` | **PASS** — tồn tại; XML well-formed (python minidom) |

## 5. Chống rò rỉ bản nháp

| Kiểm tra | Kết quả |
|---|---|
| Tạo bài canary `draft: true` → build → grep toàn dist + search-index | **PASS** — không xuất hiện. Ghi chú trung thực: lần chạy ĐẦU phát hiện **bug thật** trong parser frontmatter của search-index (không cắt comment YAML nên `draft: true  # …` không được nhận diện) — đã sửa, chạy lại PASS. Bản build/deploy chính thức dùng bản đã sửa |

## 6. Trình duyệt thật — Chromium headless, phục vụ dưới `/ic-design-hub/` (mô phỏng project Pages)

`node tools/e2e-smoke.mjs` — **18/18 PASS**:

- Trang chủ tải, đủ ≥6 lối vào theo mục tiêu.
- Điều hướng thật: Trang chủ → Học → **giáo trình V3 legacy** mở đúng; chip "⌂ Hub · V3" còn nguyên.
- Tìm kiếm: `uart` → 9 kết quả; **không dấu** `mach tuan tu` → 14 kết quả; link kết quả có base path đúng.
- Trang bài viết render Markdown + khung attribution hiển thị.
- URL kiểu cũ `/versions/v3/Week05.html` tự chuyển về `/legacy/versions/v3/Week05.html`.
- Mobile 390px: 5 trang đại diện **0px tràn ngang** (lần đo đầu phát hiện tràn 5px do chuỗi
  đường dẫn dài trong references — đã sửa bằng `overflow-wrap`, đo lại 0px).
- Dark mode toggle hoạt động.
- 0 lỗi console/page trên các trang hub mới đã duyệt.

## 7. Legacy render với network NGOÀI bị chặn (offline-tương-đương)

| Kiểm tra | Kết quả |
|---|---|
| **Toàn bộ 21 trang V3** (12 tuần + index + 8 tài liệu) render, chặn mọi request ra ngoài localhost | **PASS** — 21/21 trang **0 lỗi console** → khả năng offline của V3 còn nguyên sau bản vá attribution |
| Cổng legacy (index/evolution/about) + index V1/V2 | **PASS** — 0 lỗi |
| Trang tuần V1 (Week4) + V2 (Week9) offline | **PASS** — chỉ còn đúng lỗi lịch sử đã ghi nhận từ 08/08/2026 (`tailwind` CDN không tải được khi offline — hành vi có sẵn trong `_source`, không phải do chuyển đổi) |
| Namespace localStorage `licv3:` của V3 | **PASS** — ghi/đọc được, tên namespace không đổi |

## 8. Nội dung & danh tính

| Kiểm tra | Kết quả |
|---|---|
| meta author/copyright + footer trên trang site mới sinh từ **một** nguồn (`src/config/site.ts`) | **PASS** — kiểm chuỗi trên trang render: "Giảng Viên Đinh Văn Nam" + câu bản quyền chuẩn "© 2026–present… All rights reserved unless otherwise stated." |
| Legacy V3/hub-tạo hiển thị danh tính chuẩn mới | **PASS** — kiểm meta trên Week05 legacy qua HTTP |
| Không có nội dung bịa cho track trống | **PASS** — track chưa có tài liệu hiển thị nhãn "Định hướng", trang tag rỗng ghi rõ "không lấp bằng nội dung tự sinh"; toàn bộ 8 nội dung khởi tạo truy nguyên về tư liệu V3/Learning Hub thật (bảng nguồn gốc trong MIGRATION_REPORT §4) |
| Tương phản màu (WCAG) — 9 cặp token chính light+dark | **PASS** — tính toán tỷ lệ: thấp nhất 5.01:1 (AA cho chữ nhỏ ≥4.5:1); một cặp ban đầu 4.09:1 đã được chỉnh (--ink-faint) |

## 9. NOT TESTED — khai báo minh bạch

- **Deploy thật lên GitHub Pages** — môi trường chuyển đổi không có repo/credentials của tác
  giả. Proxy sát nhất đã chạy: phục vụ dist dưới đường dẫn con + click-through trình duyệt thật
  (mục 6) và build hai chế độ base (mục 3). Checklist sau deploy: `docs/DEPLOYMENT.md`.
- **Render V1/V2 với CDN thật (có mạng)** — môi trường chặn CDN ngoài; dựa trên bằng chứng
  online 07/08/2026 lưu tại `_source/bao-cao-danh-gia-lucero-ic-v1-v2.md` + việc 23 trang gốc
  byte-identical (mục 2) nên hành vi online không thể thay đổi.
- **Firefox / Safari** — chỉ chạy Chromium headless; site dùng HTML/CSS chuẩn, không API đặc thù.
- **Audit accessibility tự động (axe/Lighthouse) và screen reader tiếng Việt** — các cơ chế đã
  triển khai thủ công (skip-link, focus-visible, aria-pressed/aria-live cho search, heading
  hierarchy, alt, reduced-motion, contrast đo tay ở mục 8) nhưng chưa chạy bộ audit máy.
- **GitHub Discussions/issue forms trên GitHub thật** — cần repo; file cấu hình đã đúng
  schema GitHub, hướng dẫn bật: `docs/COMMUNITY_SETUP.md`.

## 10. Tổng kết

| Nhóm | Kết quả |
|---|---|
| Provenance | PASS 4/4 |
| Bảo tồn legacy (diff + validator gốc + offline render) | PASS toàn bộ |
| Build/schema/link/hạ tầng (2 chế độ base) | PASS 0 lỗi |
| Trình duyệt thật (điều hướng, search tiếng Việt, mobile, dark mode, redirect URL cũ) | 18/18 PASS |
| Draft không rò rỉ | PASS (sau khi sửa 1 bug tự phát hiện) |
| Chưa kiểm | 5 mục khai báo ở §9 — không mục nào chặn deploy |
