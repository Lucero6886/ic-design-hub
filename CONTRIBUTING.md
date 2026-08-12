# Đóng góp cho IC Design Learning & Research Hub

Cảm ơn bạn muốn đóng góp. Tài liệu này là quy trình đầy đủ; hướng dẫn viết nội dung chi tiết
(kèm ví dụ frontmatter) nằm ở `docs/AUTHORING_GUIDE.md`.

## Bạn có thể đóng góp gì

| Việc | Kênh |
|---|---|
| Hỏi đáp, thảo luận học tập/nghiên cứu | GitHub **Discussions** |
| Báo lỗi nội dung/kỹ thuật, lỗi website | **Issues** (chọn đúng mẫu) |
| Gợi ý tài nguyên, đề xuất project/bài viết | **Issues** (mẫu tương ứng) |
| Viết bài, thêm project/ghi chú/tài nguyên, sửa lỗi | **Pull Request** |

## Quy trình Pull Request

1. Fork repo, tạo nhánh từ `main` (vd `article/fsm-encoding`).
2. Tạo nội dung: copy template trong `templates/` vào đúng thư mục `src/content/…`
   (hoặc dùng `npm run new:article -- "Tiêu đề"`). Điền frontmatter — build sẽ **fail có chủ
   đích** nếu frontmatter sai schema.
3. Chạy kiểm tra tại máy:
   ```bash
   npm install
   npm run check     # provenance + schema + legacy
   npm run build && npm run validate
   ```
4. Mở PR — điền đủ PR template, đặc biệt phần **cam kết bản quyền & an toàn thông tin**.
5. Mentor/maintainer review về: chính xác kỹ thuật (ưu tiên số 1), nguồn dẫn, phạm vi phát biểu,
   chính tả. Nội dung kỹ thuật viết theo khung *phát biểu → phạm vi → giả định → giới hạn → dẫn chứng*.

## Chính sách sửa lỗi kỹ thuật (technical correction policy)

- **Nội dung hub mới** (`src/content/`, trang site): sửa trực tiếp qua PR; bài đã công bố có
  hiệu chỉnh ý nghĩa thì cập nhật trường `updated` và ghi chú trong bài nếu hiệu chỉnh làm đổi
  kết luận.
- **Giáo trình V3** (`public/legacy/versions/v3/`): là bản hiện hành — sửa lỗi kỹ thuật được
  phép qua PR, kèm nguồn đối chiếu, sửa cả file `.md` nguồn lẫn `.html` (tái sinh bằng
  `node tools/mkdocs.mjs` trong thư mục v3, cần cài `marked`), và ghi vào
  `docs/CONTENT_CHANGELOG.md`.
- **V1/V2** (`public/legacy/versions/v1|v2/`): bản lưu trữ **bất biến** — KHÔNG sửa nội dung
  giảng dạy kể cả khi sai; lỗi được ghi nhận ở Issues + VERSION_NOTES/evolution. Xem
  `docs/VERSIONING_POLICY.md`.
- **`_source/`**: không bao giờ đụng tới, dưới mọi hình thức.

## Điều PR KHÔNG được làm

- Sửa `_source/` hoặc nội dung giảng dạy V1/V2.
- Thêm nội dung sinh tự động hàng loạt để "lấp" chuyên mục trống.
- Bịa trích dẫn/DOI/số liệu thực nghiệm; trình bày giả thuyết như kết luận.
- Đưa thông tin cá nhân của người khác (email, MSSV, điểm…) hoặc dữ liệu chưa được phép công bố.
- Thêm tracking/analytics, API key, tài nguyên từ CDN không cần thiết.

## Môi trường

Node.js ≥ 22.12 (`.nvmrc` có sẵn). Không cần Docker. Lệnh: `npm run dev` (xem thử),
`npm run check`, `npm run build`, `npm run validate`.

## Bản quyền khi đóng góp

Người đóng góp giữ quyền tác giả phần mình viết và đồng ý cho hub đăng tải với ghi nhận tên
(trường `author` trong frontmatter). Nội dung gốc của hub thuộc bản quyền
**Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa** —
xem `docs/COPYRIGHT_AND_ATTRIBUTION.md`.
