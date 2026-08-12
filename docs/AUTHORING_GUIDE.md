# AUTHORING_GUIDE — hướng dẫn viết & đăng nội dung (dành cho người KHÔNG cần biết Astro)

Nguyên tắc của hub: **đăng một nội dung mới = tạo MỘT file Markdown**. Không sửa trang chủ,
không sửa menu, không sửa chỉ mục tìm kiếm, không sửa RSS/sitemap — tất cả tự cập nhật khi build.

Bạn chỉ cần biết: (1) copy một file template, (2) điền phần khai báo đầu file (frontmatter),
(3) viết Markdown, (4) commit & push. Hết.

---

## 0. Chuẩn bị máy (làm một lần)

```bash
# cần Node.js ≥ 22.12 (https://nodejs.org, bản LTS)
git clone https://github.com/USERNAME/ic-design-hub.git
cd ic-design-hub
npm install
npm run dev     # mở http://localhost:4321/ic-design-hub/ để xem thử
```

`npm run dev` bật server xem thử: **sửa file là trang tự tải lại**. Không cần build gì thêm.

---

## 1. Thêm một BÀI VIẾT

### Cách A — dùng lệnh tạo nhanh (khuyến nghị)

```bash
npm run new:article -- "Blocking vs non-blocking assignment"
# → Đã tạo: src/content/articles/blocking-vs-non-blocking-assignment.md
```

### Cách B — copy tay (không cần lệnh nào)

Copy `templates/article.md` vào `src/content/articles/ten-bai-cua-ban.md`
(tên file = URL của bài: `articles/ten-bai-cua-ban/` — chữ thường, không dấu, nối bằng `-`).

### Điền frontmatter (phần giữa hai dấu `---` đầu file)

```yaml
---
title: "Blocking vs non-blocking assignment — vì sao và khi nào"
summary: "Phân biệt = và <= trong always block: quy tắc thực dụng, lý do phần cứng, và các lỗi kinh điển."
date: 2026-08-20            # ngày công bố, dạng YYYY-MM-DD
draft: false                # true = bản nháp, KHÔNG xuất hiện trên site
category: tutorial          # tutorial | concept | technical-note | mentoring | news
difficulty: foundation      # foundation | intermediate | advanced (có thể bỏ)
track: systemverilog        # id track trong src/data/tracks.ts (có thể bỏ)
tags: [systemverilog, rtl]  # chữ thường, không dấu cách
---
```

Các trường khác (prerequisites, outcomes, references, related…) — xem chú thích ngay trong
template. **Điền sai schema thì build báo lỗi chỉ rõ trường nào sai** — đó là tính năng,
không phải sự cố.

### Viết nội dung

Markdown bình thường: `##` cho mục, ` ```systemverilog ` cho code (tô màu tự động), bảng, ảnh.

- **Ảnh:** đặt file vào `public/images/ten-bai/` rồi chèn
  `![mô tả ảnh](../../images/ten-bai/hinh-1.png)` — LUÔN viết mô tả ảnh (alt) và chỉ dùng
  ảnh mình có quyền dùng (ảnh bên thứ ba: ghi nguồn vào trường `attribution`).
- **Link nội bộ:** từ trang bài viết, đường dẫn bắt đầu bằng `../../` là về gốc site.
  Ví dụ: `[giáo trình V3](../../legacy/versions/v3/index.html)`,
  `[bài khác](../../articles/slug-bai-khac/)`.
- **Quy ước kỹ thuật:** phát biểu → phạm vi → giả định → giới hạn → dẫn chứng. Thuật ngữ giữ
  tiếng Anh kèm giải nghĩa Việt lần đầu: "kiểm chứng (verification)".

### Xem thử → kiểm tra → đăng

```bash
npm run dev                        # xem thử tại localhost
npm run check                      # kiểm schema + provenance + legacy
git add . && git commit -m "Bài viết: blocking vs non-blocking" && git push
```

Push lên `main` xong, GitHub Actions tự build + deploy (1–3 phút). Bài tự xuất hiện ở:
trang chủ (nếu mới nhất), trang Bài viết, trang tag, tìm kiếm, RSS, sitemap.

---

## 2. Thêm một GHI CHÚ NGHIÊN CỨU

```bash
npm run new:research -- "Ảnh hưởng của mã hóa state đến tài nguyên FPGA"
```

Khác biệt quan trọng so với bài viết — hai trường bắt buộc:

```yaml
kind: question        # note | paper-reading | question | roadmap | methodology | experiment-log
status: exploratory   # idea | exploratory | active | validated | superseded | archived
evidenceLevel: hypothesis
# established     = kiến thức đã xác lập   | heuristic = kinh nghiệm kỹ thuật
# hypothesis      = giả thuyết             | question  = câu hỏi mở
# evidence        = có dữ liệu thực nghiệm | interpretation = diễn giải của tác giả
```

`evidenceLevel` hiển thị thành nhãn ngay trên trang — người đọc luôn biết mình đang đọc
kiến thức đã xác lập hay giả thuyết. **Không bịa trích dẫn/DOI/số liệu**; nguồn chưa kiểm
chứng được ghi `needsVerification: true` trong references (site sẽ hiện nhãn cảnh báo).

---

## 3. Thêm một PROJECT

```bash
npm run new:project -- "UART receiver với oversampling 16x"
```

Project là "đối tượng tri thức" — frontmatter phong phú hơn (milestones, deliverables,
reproducibility, limitations…). Điền được đến đâu hay đến đó, chỉ `title/summary/date/kind/status`
là bắt buộc. Quy tắc cứng:

- `contributors:` CHỈ ghi tên khi có đồng ý công khai. Không email/MSSV/điểm số.
- "Kết quả hiện tại" chỉ ghi điều **có bằng chứng** (waveform, log, ảnh) — không báo cáo số
  liệu chưa đo, không bịa kết quả synthesis/FPGA.

---

## 4. Thêm TÀI NGUYÊN / THÔNG BÁO / LỘ TRÌNH

```bash
npm run new:resource -- "Tên công cụ/sách"
npm run new:announcement -- "Khai giảng Phase 1 khóa 2027"
# lộ trình học: copy tay templates/learning-path.md → src/content/learning-paths/
```

Tài nguyên bắt buộc có `whyRecommended` (vì sao đáng dùng) — tránh danh sách link vô hồn.
Ghi `license` của tài nguyên khi biết.

---

## 5. CẬP NHẬT bài đã đăng

1. Sửa trực tiếp file trong `src/content/…`.
2. Thêm/cập nhật trường `updated: 2026-09-15` (giữ nguyên `date` gốc) — trang sẽ hiện
   "cập nhật 15/09/2026".
3. Nếu hiệu chỉnh làm **đổi kết luận kỹ thuật**: ghi một dòng ngay trong bài
   (vd "*Hiệu chỉnh 09/2026: …*") và một dòng vào `docs/CONTENT_CHANGELOG.md`.
4. Commit & push như thường.

Bản nháp: đặt `draft: true` — file cứ nằm trong repo, không xuất hiện trên site/search/RSS
cho tới khi đổi thành `false`.

---

## 6. Trích dẫn & ảnh — an toàn bản quyền

- Trích ý + ghi nguồn: dùng `references:` (có `label`, `url`, `note`).
- KHÔNG chép nguyên văn dài từ sách/paper; KHÔNG dùng hình của người khác khi chưa được phép.
- Hình bên thứ ba được phép dùng → ghi nguồn vào trường `attribution` (hiện thành khung
  attribution cuối bài).
- Nguồn không kiểm chứng được → `needsVerification: true`.

---

## 7. Khi build BÁO LỖI

Build fail là **lưới an toàn**, thông báo luôn chỉ rõ file + trường lỗi. Hay gặp nhất:

| Thông báo chứa | Nguyên nhân | Sửa |
|---|---|---|
| `[InvalidContentEntryDataError]` + tên trường | frontmatter sai schema (thiếu trường bắt buộc, giá trị ngoài danh sách) | so lại với template |
| `date: Invalid date` | ngày không đúng dạng `YYYY-MM-DD` | sửa định dạng |
| `track: Invalid enum value` | id track không tồn tại | xem danh sách trong `src/data/tracks.ts` |
| `link chết → …` (từ `npm run validate`) | link nội bộ sai đường dẫn | nhớ quy tắc `../../` về gốc site |
| `PROVENANCE FAIL` | file trong `_source/` bị đổi | khôi phục ngay — thư mục này bất biến |

---

## 8. Tóm tắt một trang

```
copy template  →  điền frontmatter  →  viết Markdown  →  npm run dev (xem thử)
→  npm run check  →  git commit + push  →  GitHub Actions tự deploy
```

Mọi thứ còn lại (trang chủ, menu, tag, tìm kiếm, RSS, sitemap) — tự động. Nếu bạn thấy mình
đang sửa nhiều file HTML chỉ để đăng một bài viết, dừng lại: đang làm sai cách, xem lại
hướng dẫn này.
