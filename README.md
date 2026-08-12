# IC Design Learning & Research Hub

**Cộng đồng học tập, mentoring và nghiên cứu thiết kế vi mạch bằng tiếng Việt** —
giáo trình có phiên bản hóa, bài viết kỹ thuật, project, lộ trình nghiên cứu và cộng đồng
GitHub, trong một website tĩnh duy nhất.

Phụ trách: **Giảng Viên Đinh Văn Nam** · Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa

> © 2026–present. Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử,
> Trường Kỹ Thuật, Đại học Phenikaa. All rights reserved unless otherwise stated.
> Chi tiết (kể cả tư liệu bên thứ ba): `docs/COPYRIGHT_AND_ATTRIBUTION.md`.

## Repo này chứa gì?

| Khu vực | Ở đâu | Ghi chú |
|---|---|---|
| Site cộng đồng (Astro) | `src/` | Learn · Articles · Research · Projects · Mentoring · Resources · Community · About |
| **Nội dung** = file Markdown | `src/content/` | articles / research / projects / learning-paths / resources / announcements |
| Giáo trình V1/V2/V3 (nguyên trạng) | `public/legacy/versions/` | V3 = bản hiện hành khuyến nghị; V1/V2 = lưu trữ bất biến |
| Learning Hub cũ (cổng + evolution) | `public/legacy/` | tự chứa, chạy độc lập được |
| Bản gốc nguyên trạng (provenance) | `_source/` | **BẤT BIẾN** — hash khóa trong `docs/audit/PROVENANCE_RECORD.md`, CI kiểm mỗi build |
| Tài liệu vận hành | `docs/` | kiến trúc, viết bài, deploy, bản quyền, cộng đồng, kiểm định |
| Template + script tạo nội dung | `templates/`, `tools/` | `npm run new:article -- "Tiêu đề"` |

## Chạy thử trên máy

```bash
# Node.js ≥ 22.12
npm install
npm run dev        # http://localhost:4321/ic-design-hub/
```

Kiểm tra trước khi push: `npm run check` · build production: `npm run build` ·
kiểm output: `npm run validate`.

## Thêm nội dung (không cần biết Astro)

```bash
npm run new:article -- "Tiêu đề bài viết"    # hoặc new:research / new:project / new:resource
# → mở file vừa tạo trong src/content/..., điền frontmatter, viết Markdown
# → đổi draft: true thành false khi sẵn sàng → commit + push → tự deploy
```

Trang chủ, danh sách, tag, tìm kiếm, RSS, sitemap **tự cập nhật** — không sửa tay bất kỳ trang
nào. Hướng dẫn đầy đủ từng bước (tiếng Việt, có ví dụ): **`docs/AUTHORING_GUIDE.md`**.

## Triển khai

Push lên `main` → GitHub Actions tự: kiểm provenance → validate → build → deploy Pages.
Cấu hình một lần (Settings → Pages → Source: **GitHub Actions**) + điền URL thật vào
`src/config/site.ts`: xem **`docs/DEPLOYMENT.md`**.

## V1 / V2 / V3 ở đâu?

- Trên site: khu **Học** → "Giáo trình IC Design Foundations" (V3) và "Lịch sử giáo trình";
  hoặc trực tiếp `…/legacy/versions/v1|v2|v3/`.
- URL kiểu cũ (`/versions/v3/Week05.html`) tự chuyển hướng sang vị trí mới.
- Quy tắc bất biến của phiên bản lưu trữ + checklist thêm V4: `docs/VERSIONING_POLICY.md`.
- Mọi thay đổi từng thực hiện trên nội dung: `docs/CONTENT_CHANGELOG.md`.

## Đóng góp & hỏi đáp

- Hỏi đáp / thảo luận: tab **Discussions** của repo (chuyên mục: IC Design Q&A,
  RTL/SystemVerilog Help, FPGA/Toolchain Help, Research, Paper Reading, Student Projects…).
- Báo lỗi / đề xuất: tab **Issues** (5 mẫu điền sẵn).
- Viết bài / thêm project: Pull Request — đọc `CONTRIBUTING.md` (quy trình + chính sách sửa
  lỗi kỹ thuật) và `CODE_OF_CONDUCT.md`.

## Tài liệu chính

`docs/ARCHITECTURE.md` (kiến trúc & quyết định) · `docs/AUTHORING_GUIDE.md` (viết bài) ·
`docs/CONTENT_MODEL.md` (schema nội dung) · `docs/DEPLOYMENT.md` (deploy) ·
`docs/COMMUNITY_SETUP.md` (bật Discussions) · `docs/VERSIONING_POLICY.md` (phiên bản) ·
`docs/COPYRIGHT_AND_ATTRIBUTION.md` (bản quyền) · `docs/MIGRATION_REPORT.md` (đợt chuyển đổi
2026-08-12) · `docs/VALIDATION_REPORT_NEW_HUB.md` (kiểm định) · `docs/audit/` (audit +
provenance) · `docs/legacy-hub/` (tài liệu nguyên bản của hub cũ).
