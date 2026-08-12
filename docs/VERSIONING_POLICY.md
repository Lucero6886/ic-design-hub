# VERSIONING_POLICY — quy tắc quản lý phiên bản (bản hiện hành, kế thừa 08/08/2026)

Kế thừa toàn bộ chính sách của Learning Hub (bản nguyên trạng:
`docs/legacy-hub/VERSIONING_POLICY.md`) và mở rộng cho hub cộng đồng. Khi hai bản khác nhau,
bản này là hiện hành.

## 1. Quy tắc nền tảng (không đổi)

**Phiên bản giáo trình đã lưu trữ là ảnh chụp giáo dục bất biến (immutable educational
snapshot).** Nội dung giảng dạy của bản lưu trữ không được sửa — kể cả khi phát hiện lỗi kỹ
thuật. Hiệu chỉnh đi theo: (a) **phiên bản mới** (`v4`, `v5`…), hoặc (b) **bản vá có ghi
chép** thuộc đúng các hạng mục cho phép ở §2. Nội dung thiếu trong bản gốc (Tuần 5 của V1)
**không bao giờ được tạo bù**. `_source/` bất biến tuyệt đối (hash:
`docs/audit/PROVENANCE_RECORD.md`; CI kiểm mỗi lần build).

## 2. Phân loại thay đổi trên bản lưu trữ

| Loại | Được phép? | Ghi chép |
|---|---|---|
| Điều hướng (thanh/banner/chip hub; sửa liên kết hỏng) | Có — không đổi nội dung giảng dạy | CONTENT_CHANGELOG |
| Sửa hiển thị chặn đọc (charset, file thiếu) | Có, tối thiểu | CONTENT_CHANGELOG |
| **Attribution / legal metadata correction** *(bổ sung 2026-08-12)* — hiệu chỉnh hiển thị tác giả/chủ sở hữu bản quyền (meta tag, footer, dòng "Biên soạn", câu bản quyền, câu hướng dẫn trích dẫn) | Có — vì đây là metadata pháp lý, không phải nội dung giáo dục; KHÔNG áp dụng cho `_source/` | CONTENT_CHANGELOG: từng file + số lượt thay thế; script vá giữ trong `tools/` |
| Sửa lỗi kỹ thuật trong nội dung giảng dạy | **Không** trên bản lưu trữ — ghi nhận ở VERSION_NOTES/evolution, sửa ở phiên bản mới. (V3 là bản HIỆN HÀNH nên được sửa theo quy trình riêng của nó + changelog) | VERSION_NOTES / CONTENT_CHANGELOG |
| Tái cấu trúc sư phạm | **Không** — luôn là phiên bản mới | — |
| Tạo bù nội dung thiếu | **Không bao giờ** | VERSION_NOTES |

## 3. Trạng thái phiên bản giáo trình (không đổi)

`current` (đúng một bản; hiện là **V3**) · `historical` (bất biến). Khi phát hành V(n+1):
V(n) chuyển `historical` và đóng băng; snapshot zip của V(n) bổ sung vào `_source/`.

## 4. Semantics phiên bản cho NỘI DUNG MỚI (bổ sung 2026-08-12)

Giáo trình và nội dung hub mới KHÔNG dùng chung cơ chế phiên bản:

| Loại nội dung | Cơ chế | Ghi chú |
|---|---|---|
| Giáo trình | V1 → V2 → V3 → V4… | như §1–§3 |
| Bài viết (articles) | `date` + `updated` | hiệu chỉnh đổi kết luận → ghi chú trong bài + CONTENT_CHANGELOG |
| Ghi chú nghiên cứu (research) | trường `status`: idea → exploratory → active → validated / superseded / archived | không đánh số phiên bản |
| Project | trường `status`: proposed → active → completed / paused / archived | không đánh số phiên bản |
| Tài nguyên/thông báo | `date` (+ sửa tại chỗ) | |

Không tạo số phiên bản cho mọi thứ — chỉ giáo trình cần semantics V-number.

## 5. Checklist thêm Version 4 (cập nhật đường dẫn cho hub mới)

1. Tạo `public/legacy/versions/v4/` — KHÔNG đụng `versions/v3/`.
2. Snapshot: nếu v3 có thay đổi sau zip gốc → đóng `_source/version3-final.zip`; thêm zip v4
   vào `_source/`; **cập nhật bảng hash** trong `docs/audit/PROVENANCE_RECORD.md` và
   `tools/check-source-hashes.mjs` (thêm entry mới — entry cũ giữ nguyên).
3. `public/legacy/data/versions.json`: thêm v4 (`current`), đổi v3 → `historical`
   (site mới đọc file này để render card giáo trình — KHÔNG phải sửa trang chủ tay).
4. Cây legacy cũ: thêm card v4 vào `public/legacy/index.html` + cập nhật
   `public/legacy/evolution.html` (chuẩn cũ của hub lưu trữ); chạy lại
   `node tools/build-search-index.mjs` trong `public/legacy/` và validator của nó.
5. Search hub mới: thêm vòng lặp v4 trong `tools/build-search-index.mjs` (mục legacy).
6. Trang "Tiến hóa" mới (`src/pages/learn/evolution.astro`) render từ versions.json — tự cập nhật.
7. Ghi toàn bộ vào `docs/CONTENT_CHANGELOG.md` + mục Lịch sử dưới đây.

## 6. Lịch sử trạng thái

| Ngày | Sự kiện |
|---|---|
| 09/07/2026 | V1 đóng gói (11 tuần; thiếu Tuần 5) |
| 10/07/2026 | V2 đóng gói (12 tuần) |
| 07–08/08/2026 | V3 xây từ V2 (audit 8 mục + validation; 40 hiệu chỉnh học thuật 08/08) |
| 08/08/2026 | Learning Hub phát hành: V1/V2 lưu trữ chính thức; V3 hiện hành |
| 12/08/2026 | Chuyển đổi thành IC Design Learning & Research Community Hub: cây cũ bảo tồn nguyên trạng tại `public/legacy/`; bản vá attribution 40 file (danh tính chuẩn: Giảng Viên Đinh Văn Nam); bổ sung hạng mục "Attribution / legal metadata correction" và semantics phiên bản cho nội dung mới |
