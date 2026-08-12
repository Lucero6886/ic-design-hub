# CONTENT_CHANGELOG — mọi thay đổi hub thực hiện trên nội dung

Quy ước: bản lưu trữ là bất biến; file này ghi **từng** thay đổi mà quá trình tích hợp Learning Hub đã thực hiện, để mọi khác biệt so với `_source/*.zip` đều truy nguyên được. Phân loại theo `docs/VERSIONING_POLICY.md`.

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
