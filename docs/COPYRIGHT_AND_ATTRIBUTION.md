# COPYRIGHT_AND_ATTRIBUTION — chính sách bản quyền của repository

(Bản hiển thị cho người dùng cuối: trang `Bản quyền & Attribution` trên website —
`src/pages/about/copyright.astro`. Hai bản dùng chung nội dung chuẩn dưới đây;
chuỗi hiển thị trên site sinh từ `src/config/site.ts`.)

## 1. Câu bản quyền chuẩn (canonical notice)

> © 2026–present. Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử,
> Trường Kỹ Thuật, Đại học Phenikaa. All rights reserved unless otherwise stated.

Áp dụng cho toàn bộ **nội dung giáo dục gốc** của hub: giáo trình các phiên bản, bài viết,
ghi chú nghiên cứu, tài liệu mentoring, đặc tả project do tác giả biên soạn, và phần văn bản
của website. Quy định kèm theo:

- KHÔNG tuyên bố bản quyền thuộc Khoa/Trường/Đại học — đơn vị là **affiliation** (nơi công tác),
  không phải chủ sở hữu.
- Danh tính công khai của tác giả/mentor: **Giảng Viên Đinh Văn Nam** (không dùng danh xưng cũ
  trong nội dung đang hoạt động; artifact lịch sử trong `_source/` giữ nguyên trạng).
- Nội dung gốc **không phát hành theo giấy phép mở nào** (không CC/MIT/Apache/GPL) trừ khi
  tác giả tuyên bố khác một cách tường minh cho từng phần cụ thể.

## 2. Nguồn sự thật duy nhất

Mọi chuỗi tác giả/đơn vị/bản quyền trên site mới sinh từ `src/config/site.ts`
(`AUTHOR`, `COPYRIGHT`). Không hard-code danh tính trong trang/component/nội dung.
Ngoại lệ có chủ đích: cây `public/legacy/` (HTML tĩnh lịch sử) — đã vá một lần, xem §4.

## 3. Tư liệu bên thứ ba

- Paper, sách, chuẩn, datasheet, hình, code, dataset, repository của bên thứ ba **giữ nguyên
  bản quyền của chủ sở hữu tương ứng**. Hub trích dẫn ở mức hợp lý cho mục đích học thuật và
  luôn ghi nguồn; hub không tuyên bố sở hữu.
- Trong nội dung: dùng `references:` cho nguồn; `attribution:` cho tư liệu nhúng trong bài;
  `license:` cho tài nguyên giới thiệu. Nguồn chưa kiểm chứng: `needsVerification: true`
  (site hiện nhãn cảnh báo) — không bao giờ bịa trích dẫn/DOI.
- Phần mềm mã nguồn mở dùng để XÂY site (Astro và các gói trong `package.json`) giữ giấy phép
  riêng của từng gói — không thuộc phạm vi câu bản quyền ở §1.

## 4. Hồ sơ hiệu chỉnh attribution (2026-08-12)

Trước chuyển đổi, 40 file mang danh tính cũ ("Thạc sỹ Đinh Văn Nam") và/hoặc câu bản quyền cũ
(thuộc Khoa/Trường/Đại học). Đợt chuyển đổi đã thực hiện **bản vá attribution / metadata pháp lý**
— phân loại được bổ sung chính thức vào `docs/VERSIONING_POLICY.md`:

- Phạm vi vá: trang hub cũ + trang hub-tạo trong V1/V2 + toàn bộ V3 (bản hiện hành) + template
  tái sinh tài liệu V3. **166 lượt thay thế / 40 file** — danh sách từng file trong
  `docs/CONTENT_CHANGELOG.md`; script vá được giữ tại `tools/patch-attribution.mjs` (allowlist).
- KHÔNG đụng: nội dung giảng dạy V1/V2 (23 trang tuần gốc — vốn không chứa metadata tác giả nào,
  đã kiểm chứng), và `_source/` (hash đối chiếu trong `docs/audit/PROVENANCE_RECORD.md`).
- Bản chất: sửa **hiển thị attribution**, không sửa nội dung giáo dục.

## 5. Đóng góp của sinh viên & cộng đồng

- Người đóng góp giữ quyền tác giả phần mình viết; khi mở PR, xác nhận (checklist trong PR
  template): nội dung của mình hoặc có quyền dùng + đã ghi nguồn + không có thông tin cá
  nhân/bí mật; đồng ý đăng trên hub với ghi nhận tên (`author` trong frontmatter).
- Tên sinh viên chỉ xuất hiện khi có đồng ý công khai rõ ràng. Không bao giờ công bố email,
  MSSV, điểm số, repo riêng tư, dữ liệu nghiên cứu chưa công bố.

## 6. Trích dẫn hub

> "IC Design Learning & Research Hub, Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử,
> Trường Kỹ Thuật, Đại học Phenikaa." — kèm URL trang; nếu trích giáo trình, ghi thêm phiên bản
> (vd "IC Design Foundations, Version 3, Tuần 6").

## 7. Khiếu nại bản quyền

Mở issue "Báo lỗi nội dung" hoặc liên hệ tác giả. Khiếu nại attribution được ưu tiên xử lý;
mọi hiệu chỉnh ghi vào `docs/CONTENT_CHANGELOG.md`.
