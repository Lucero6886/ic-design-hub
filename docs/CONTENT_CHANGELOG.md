# CONTENT_CHANGELOG — mọi thay đổi hub thực hiện trên nội dung

Quy ước: bản lưu trữ là bất biến; file này ghi **từng** thay đổi trên nội dung để mọi khác
biệt so với `_source/*.zip` đều truy nguyên được. Phân loại theo `docs/VERSIONING_POLICY.md`.
Ghi các sự kiện: di trú phiên bản, hiệu chỉnh kỹ thuật, hiệu chỉnh attribution, thay đổi kiến
trúc ảnh hưởng URL/nội dung, phát hành giáo trình lớn — KHÔNG ghi sửa chính tả lặt vặt.

## 2026-08-12 — Chuyển đổi thành IC Design Learning & Research Community Hub

### Kiến trúc & vị trí nội dung

| Thay đổi | Loại | Chi tiết |
|---|---|---|
| Toàn bộ site Learning Hub cũ chuyển vào `public/legacy/` (nguyên cây: index/evolution/about/404, assets, data, docs, tools, versions/v1·v2·v3) | KIẾN TRÚC / URL | Liên kết nội bộ tương đối của cây giữ nguyên nên điều hướng trong legacy không đổi. URL cũ `/versions/...`, `/evolution.html`, `/about.html` có trang chuyển hướng tương thích sinh tự động lúc build (`tools/postbuild.mjs`, 51 trang). |
| `_source/` giữ ở gốc repo, KHÔNG chỉnh sửa | KHÔNG ĐỔI | 4/4 hash SHA-256 khớp hồ sơ trước–sau chuyển đổi (`docs/audit/PROVENANCE_RECORD.md`); build copy vào `dist/legacy/_source/` để tiếp tục phục vụ công khai. |
| README + docs cũ của hub lưu bản byte-nguyên-trạng tại `docs/legacy-hub/` | BẢO TỒN | Bản đang phục vụ trong `public/legacy/docs/` giữ nguyên (không mang danh tính nên không cần vá). |
| Nội dung giảng dạy V1 (11 trang tuần gốc) và V2 (12 trang tuần gốc) | **KHÔNG ĐỔI** | Không một ký tự nào thay đổi trong đợt này. |

### Bản vá attribution / legal metadata (hạng mục mới của VERSIONING_POLICY)

Theo quyết định của tác giả: danh tính công khai chuẩn là **Giảng Viên Đinh Văn Nam**; bản
quyền thuộc về **Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học
Phenikaa** (không thuộc Khoa/Trường/Đại học). Thực hiện bằng `tools/patch-attribution.mjs`
(allowlist tường minh — file ngoài danh sách không bị đụng), **40 file / 166 lượt thay thế**,
hậu kiểm toàn cây legacy không còn danh tính cũ:

| Nhóm file | Số file | Lượt thay thế |
|---|---|---|
| Trang hub cũ: `index.html`(5) · `about.html`(6) · `evolution.html`(4) · `README.md`(2) | 4 | 17 |
| Trang hub-tạo V1: `index`(4) · `VERSION_NOTES`(3) · `Week5`(1); V2: `index`(4) · `VERSION_NOTES`(3) | 5 | 15 |
| V3 — 12 trang tuần (`Week01–12.html`, mỗi trang 5) | 12 | 60 |
| V3 — `index.html`(7) · 8 tài liệu `.html` (5–7/mỗi) · 8 nguồn `.md` (2–4/mỗi) | 17 | 67 |
| V3 tooling: `tools/mkdocs.mjs`(5 — template tái sinh giữ danh tính mới) · `tools/README-tools.md`(2) | 2 | 7 |

Thay thế gồm: meta `author`/`copyright`, dòng "Biên soạn:", câu bản quyền footer, câu hướng
dẫn trích dẫn. KHÔNG đổi nội dung giảng dạy; KHÔNG đụng `_source/`.

### Điều hướng (đúng chuẩn cũ 08/08/2026)

| Thay đổi | Loại | Chi tiết |
|---|---|---|
| Chèn 1 banner tự chứa (inline style, không JS) ngay sau `<body>` của `public/legacy/{index,evolution,about}.html`, trỏ về hub mới (`../`) | ĐIỀU HƯỚNG | Script: `tools/insert-legacy-banner.mjs`. KHÔNG chèn vào bất kỳ trang tuần nào. |

### Site mới (không thuộc phạm vi changelog nội dung, ghi để truy nguyên)

Shell Astro + 6 content collection; nội dung khởi tạo đều dẫn xuất từ tư liệu THẬT của V3
(lộ trình Phase 1 từ CURRICULUM_MAP; project Smart Traffic Controller từ PROJECT_GUIDE;
2 ghi chú nghiên cứu từ Week12/MENTOR_GUIDE; 1 bài viết từ TECHNICAL_AUDIT §5.1 — có ghi
`attribution`; 2 tài nguyên đã dùng trong giáo trình) — không có nội dung tự sinh để lấp chỗ.

## 2026-08-08 — Tích hợp Learning Hub (đợt duy nhất)

### Version 1 (`versions/v1/`)

| Thay đổi | Loại | Chi tiết |
|---|---|---|
| Chèn thanh điều hướng hub vào 11 trang tuần | ĐIỀU HƯỚNG | Một khối `<div id="lichub-nav-top">` ngay sau `<body>` và một khối `lichub-nav-bottom` trước `</body>` (V1 gốc không có bất kỳ điều hướng nào). Inline style tự chứa, không JavaScript, không đụng CSS gốc. Prev/next bỏ qua Tuần 5 kèm ghi chú "(Tuần 5 thiếu nguồn)" tại Tuần 4 và Tuần 6. |
| Tạo mới `index.html` | TRANG MỚI CỦA HUB | Mục lục 11 tuần + ô ghi nhận Tuần 5 thiếu nguồn. Không thuộc bản gốc, dùng style hub. |
| Tạo mới `VERSION_NOTES.html` | TRANG MỚI CỦA HUB | Danh mục file, nguồn gốc, hiện trạng kỹ thuật, giới hạn lịch sử. |
| Tạo mới `Week5.html` | TRANG MỚI CỦA HUB | Trang **ghi nhận thiếu nguồn** — tuyên bố rõ không phải nội dung giáo trình, trỏ sang V2/V3. Không tạo bù nội dung. |
| Nội dung giảng dạy 11 trang gốc | **KHÔNG ĐỔI** | Không sửa một ký tự nào ngoài khối chèn nêu trên. Đối chiếu gốc: `_source/version 1.zip`. |

### Version 2 (`versions/v2/`)

| Thay đổi | Loại | Chi tiết |
|---|---|---|
| Chèn thanh điều hướng hub vào 12 trang tuần | ĐIỀU HƯỚNG | Một khối `lichub-nav-top` ngay sau `<body>`. Không chèn thanh cuối trang vì V2 gốc đã có prev/next riêng ở cuối — giữ nguyên. |
| Tạo mới `index.html`, `VERSION_NOTES.html` | TRANG MỚI CỦA HUB | Mục lục 12 tuần; ghi chú phiên bản kèm kết quả thẩm định 07/08/2026. |
| Nội dung giảng dạy 12 trang gốc | **KHÔNG ĐỔI** | Kể cả 8 phát biểu đã được V3 hiệu chỉnh — giữ nguyên trạng có chủ đích (truy nguyên tại `evolution.html#audit`). Đối chiếu gốc: `_source/version2.zip`. |

### Version 3 (`versions/v3/`)

| Thay đổi | Loại | Chi tiết |
|---|---|---|
| Chèn 1 chip `⌂ Hub · V3` vào nav topbar của 21 trang HTML | ĐIỀU HƯỚNG | Chip đầu tiên trong `<nav class="layer-chips">`, trỏ `../../index.html`, kiêm badge nhận diện phiên bản luôn hiển thị (topbar V3 vốn sticky). |
| Vá template trong `tools/mkdocs.mjs` | HẠ TẦNG | Thêm cùng chip vào template topbar để tái sinh tài liệu `.md → .html` không làm mất chip. |
| Mọi thứ còn lại (nội dung, 4 lớp, quiz engine, mentor mode, localStorage `licv3:`, RTL, khả năng offline) | **KHÔNG ĐỔI** | Đối chiếu gốc: `_source/version3.zip`. Lưu ý: chip chỉ tồn tại trong bản nhúng của hub; bản V3 standalone phân phối riêng không có chip này. |

### Ghi chú kiểm chứng

Sau tích hợp: toàn bộ RTL của V3 được trích và biên dịch lại bằng `iverilog -g2012`, render lại 21 trang V3 với network bị chặn — kết quả trong `docs/VALIDATION_REPORT.md`. Không phát hiện khác biệt hành vi nào do tích hợp gây ra.
