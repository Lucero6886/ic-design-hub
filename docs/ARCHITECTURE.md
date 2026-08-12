# ARCHITECTURE — kiến trúc IC Design Learning & Research Hub

Tài liệu cho người bảo trì. Kế thừa `docs/legacy-hub/SITE_ARCHITECTURE.md` (kiến trúc của
Learning Hub cũ — vẫn đúng cho cây legacy) và mô tả lớp mới bên trên.

## 1. Mô hình tổng thể

**Shell Astro content-first + cây legacy bất biến.**

```
repo
├── src/                        ← SITE MỚI (Astro 7, static output)
│   ├── config/site.ts          ← NGUỒN SỰ THẬT DUY NHẤT: tác giả, bản quyền, URL, nav
│   ├── content.config.ts       ← schema 6 collection (zod, validate lúc build)
│   ├── content/                ← NỘI DUNG = file Markdown (mỗi bài một file)
│   │   ├── articles/ research/ projects/ learning-paths/ resources/ announcements/
│   ├── data/tracks.ts          ← taxonomy track IC design (active/planned)
│   ├── layouts/ components/ pages/ styles/ utils/
├── public/
│   ├── legacy/                 ← TOÀN BỘ Learning Hub cũ, tự chứa, khép kín
│   │   ├── index.html evolution.html about.html 404.html
│   │   ├── assets/ data/ docs/ tools/           (của hub cũ, nguyên trạng)
│   │   └── versions/v1 v2 v3                    (giáo trình — xem §3)
│   └── search-index.json       ← SINH TỰ ĐỘNG (gitignore) bởi tools/build-search-index.mjs
├── _source/                    ← PROVENANCE BẤT BIẾN (zip gốc + báo cáo rà soát)
├── tools/                      ← script build/validate, không dependency ngoài Node
├── templates/                  ← template nội dung cho tác giả
├── docs/                       ← tài liệu vận hành (file này, authoring, deploy…)
└── .github/                    ← CI deploy + issue forms + PR template
```

Nguyên tắc phân lớp: **site mới chỉ TRỎ VÀO legacy, không nhào nặn lại legacy.** Cây
`public/legacy/` tự chứa 100% (asset, search index, validator riêng) — có thể nhấc ra chạy
độc lập bất kỳ lúc nào, đúng như Learning Hub cũ.

## 2. Vì sao Astro + Markdown (quyết định kiến trúc)

- Output tĩnh thuần → GitHub Pages, không server/database.
- Content collections + zod: frontmatter sai → **build fail có chủ đích**, không render sai âm thầm.
- Thêm nội dung = thêm MỘT file `.md` — trang chủ/danh sách/tag/search/RSS/sitemap tự cập nhật.
  So sánh: hub cũ phải sửa tay index.html + versions.json + search index cho mỗi thay đổi.
- Tách content (Markdown) khỏi presentation (layout/component) — thay giao diện không đụng nội dung.
- Đường tiến hóa: có thể thêm CMS git-based (Phase 2, xem §9) mà không đổi cấu trúc nội dung.

## 3. Cây legacy và tính bất biến

- `public/legacy/versions/v1|v2`: **immutable educational snapshot** — trang tuần gốc không
  đổi một ký tự (và chúng vốn không chứa metadata tác giả nào). Trang hub-tạo (index,
  VERSION_NOTES, Week5-notice) đã nhận bản vá attribution có ghi chép.
- `public/legacy/versions/v3`: bản giáo trình HIỆN HÀNH — sửa được theo quy trình riêng của nó
  (`.md` → `node tools/mkdocs.mjs` trong thư mục v3), đã nhận bản vá attribution.
- `public/legacy/{index,evolution,about}.html`: hub cũ, giữ làm cổng lưu trữ; nhận bản vá
  attribution + 1 banner điều hướng về hub mới (thay đổi loại "điều hướng" theo VERSIONING_POLICY).
- `_source/`: bất biến tuyệt đối, hash khóa trong `docs/audit/PROVENANCE_RECORD.md`, được CI
  kiểm mỗi lần build (`tools/check-source-hashes.mjs`) và được copy vào `dist/legacy/_source/`
  lúc build để tiếp tục phục vụ công khai như hub cũ.
- Mọi thay đổi trên cây legacy: ghi ở `docs/CONTENT_CHANGELOG.md` (mục 2026-08-12).

## 4. Base path & URL

- Site chạy đúng cả ở `https://user.github.io/REPO/` lẫn domain riêng: `astro.config.mjs` đọc
  `ASTRO_SITE`/`ASTRO_BASE` từ CI (lấy từ cấu hình Pages) — fallback về `src/config/site.ts`.
- Trong template KHÔNG viết `href="/..."` — luôn dùng helper `href()` (`src/utils/url.ts`).
- Trong Markdown, link nội bộ dùng đường dẫn tương đối `../../…` (trang chi tiết nằm sâu 2 cấp).
- URL cũ của Learning Hub (`/versions/...`, `/evolution.html`, `/about.html`) được giữ tương
  thích bằng trang chuyển hướng meta-refresh sinh tự động lúc build (`tools/postbuild.mjs`) —
  GitHub Pages không có server-side redirect.

## 5. Tìm kiếm

`tools/build-search-index.mjs` (chạy tự động trong dev/build/check) quét: frontmatter +
heading của mọi collection (bỏ draft) + trang tĩnh chính + **toàn bộ trang legacy V1/V2/V3**
(tái dùng logic quét heading đã kiểm định của hub cũ) → `public/search-index.json`.
Trang `/search/` tải JSON này và tìm client-side với **gập dấu tiếng Việt hai phía**
(gõ `mach tuan tu` ra "mạch tuần tự"), lọc phạm vi hub mới/V1/V2/V3.
Cây legacy vẫn giữ search cũ của riêng nó — hai hệ độc lập, đúng nguyên tắc tự chứa.

## 6. Luồng dữ liệu khi bảo trì

```
Viết .md → npm run dev (xem thử) → npm run check → push main
  → CI: provenance → validate legacy + schema → build (site/base từ Pages)
  → postbuild (redirect cũ + _source) → validate dist → deploy Pages
```

## 7. Danh tính & bản quyền

MỌI chuỗi danh tính đọc từ `src/config/site.ts` (SITE/AUTHOR/COPYRIGHT/NAV/LEGACY/COMMUNITY).
Đổi thông tin = sửa một file. Cây legacy là ngoại lệ có chủ đích (HTML tĩnh lịch sử) — đã
được vá một lần bằng `tools/patch-attribution.mjs` (allowlist 40 file, ghi chép đầy đủ).

## 8. Những gì cố tình KHÔNG làm

- Không CMS/backend/database/authentication — cộng đồng dùng GitHub Discussions/Issues/PR.
- Không analytics/tracking.
- Không UI framework (React/Vue) — trang là HTML tĩnh + 2 script nhỏ (theme, search).
- Không font/CDN ngoài — system font stack, tự chứa (V1/V2 legacy giữ CDN lịch sử của chúng).
- Không viết lại V1/V2 theo chuẩn mới; không tạo nội dung Tuần 5 V1; không bịa nội dung cho
  track trống.

## 9. Đường mở rộng đã trù bị

- **V4**: tạo `public/legacy/versions/v4/` theo checklist trong `docs/VERSIONING_POLICY.md` —
  KHÔNG cần thiết kế lại site.
- **CMS Phase 2 (tùy chọn)**: nội dung đã là Markdown + frontmatter chuẩn trong git — mọi CMS
  git-based (sửa file qua trình duyệt, commit vào repo) đều gắn được mà không đổi kiến trúc;
  không chọn vendor trước, không lock-in.
- **Song ngữ**: mọi collection đã có trường `lang` (vi/en) — thêm bản dịch = thêm file, lọc
  theo lang khi cần.
- **Quy mô 200+ bài**: danh sách/tag/search đều sinh từ collection — không có bước tay nào
  tăng theo số bài. Cần phân trang thì thêm `paginate()` của Astro vào trang danh sách.
