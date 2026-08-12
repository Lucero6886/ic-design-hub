# VALIDATION_REPORT — kiểm định Learning Hub · 08/08/2026

Báo cáo này thuộc về **website Learning Hub** (kiểm định nội bộ của giáo trình V3 nằm riêng tại `versions/v3/VALIDATION_REPORT.html`). Mọi kết quả dưới đây đều được **thực thi thật** trong quá trình tích hợp; công cụ chạy lại được: `tools/validate.mjs` (liên kết/cấu trúc) và Playwright + Chromium headless (render). Không có mục nào là suy đoán.

## 1. Liên kết & cấu trúc — `node tools/validate.mjs`

Phạm vi: **53 file HTML** (toàn site, trừ `_source/`).

| Kiểm tra | Kết quả |
|---|---|
| Mọi `href`/`src` nội bộ trỏ tới file tồn tại | ✔ 0 liên kết chết |
| Không có liên kết đường dẫn tuyệt đối (`/...`) — bắt buộc cho GitHub Pages dưới `/REPO/` | ✔ 0 |
| Không có liên kết nhảy nhầm giữa các phiên bản (ngoài danh sách chủ đích: hub, trang chủ phiên bản, VERSION_NOTES, tham chiếu Tuần 5 đã ghi chép) | ✔ 0 |
| `<title>`, `lang`, `charset` trên mọi trang | ✔ đủ 53/53 |
| ID trùng lặp trong từng trang (kể cả sau khi chèn thanh điều hướng) | ✔ 0 |
| Domain ngoài nằm trong allowlist lịch sử (CDN của V1/V2, forms.gle, edaplayground) | ✔ không có domain lạ |

## 2. Render headless (Chromium, **network bị chặn hoàn toàn**)

| Nhóm trang | Kết quả |
|---|---|
| Hub (index, evolution, about, 404) + portal/notes V1 V2 + trang ghi nhận Tuần 5 | ✔ 0 lỗi JS, 0 lỗi console, 0 request ra ngoài |
| Toàn bộ 21 trang V3 | ✔ 0 lỗi JS, 0 request ra ngoài — **khả năng offline của V3 còn nguyên sau tích hợp** |
| 23 trang tuần V1/V2 (lưu trữ) | ✔ thanh điều hướng hub hiển thị trên cả 23 trang; khi offline, xuất hiện đúng **một** lỗi lịch sử `tailwind is not defined` — được đối chứng là **có sẵn trong bản gốc `_source/*.zip`** (render bản gốc chưa chỉnh sửa cho cùng một lỗi), tức tích hợp không tạo ra khác biệt hành vi |

Ghi chú V1/V2 online: môi trường kiểm định chặn CDN nên không render "có mạng" được tại đây; bằng chứng online nằm ở đợt rà soát 07/08/2026 (lưu tại `_source/bao-cao-danh-gia-lucero-ic-v1-v2.md`): cả 23 trang render không lỗi JS và quiz của cả 5 biến thể V2 chấm điểm đúng khi CDN tải được.

## 3. Mô phỏng GitHub Pages (HTTP dưới đường dẫn con `/hub/`)

Phục vụ site qua HTTP tại một đường dẫn con — đúng tình huống `https://USER.github.io/REPO/`:

- ✔ 16 trang đại diện (gốc + cả ba phiên bản): HTTP 200, **0 request 404** cho css/js/ảnh.
- ✔ Click-through thật: Hub → card V3 → Week05 → chip "⌂ Hub · V3" → về Hub.
- ✔ Điều hướng V1: Tuần 4 → nút "Tuần 6 →" (kèm ghi chú "Tuần 5 thiếu nguồn") → sang đúng Week6.

## 4. Chức năng tìm kiếm

- ✔ `uart` → 7 kết quả từ đủ ba phiên bản, nhãn [V1]/[V2]/[V3] hiển thị đúng.
- ✔ Lọc phạm vi V2 → chỉ còn kết quả V2 (3).
- ✔ Gõ không dấu `mach tuan tu` → 8 kết quả (gập dấu tiếng Việt hai chiều hoạt động).

## 5. Tương tác V3 sau tích hợp

Kiểm định đầy đủ của V3 (quiz engine, lưu tiến độ, mentor mode, widget, 21 trang render offline) đã chạy trước khi nhúng — kết quả trong `versions/v3/VALIDATION_REPORT.html`. Tích hợp chỉ thêm một chip điều hướng tĩnh vào nav có sẵn nên không đổi hành vi; xác nhận lại sau tích hợp: 21/21 trang V3 render sạch với network bị chặn (mục 2), namespace localStorage `licv3:` không đổi (grep xác nhận).

## 6. RTL của V3 — biên dịch & mô phỏng lại TỪ BẢN NHÚNG trong hub

Trích tự động mọi khối RTL từ `versions/v3/Week*.html` của hub, biên dịch `iverilog -g2012`:

| Hạng mục | Kết quả |
|---|---|
| 22 khối RTL/testbench trích được, biên dịch gộp 23 module | ✔ 0 lỗi |
| `tb_counter_mod10`, `tb_traffic`, `tb_traffic_top`, `tb_uart_tx` | ✔ 0 dòng `$error` |
| Mô phỏng toàn hệ `traffic_system_top` (testbench kiểm định giải mã ngược UART) | ✔ 0 vi phạm invariant an toàn; luồng đọc ra `GN 08 | GN 07 | GN 06`; byte đầu `0x47` = `'G'` |

(Hai file hỗ trợ kiểm định — wrapper `traffic_top` theo header trang Tuần 10 mô tả, và testbench toàn hệ — chỉ phục vụ mô phỏng, không thuộc giáo trình.)

## 7. Responsive & hiển thị

- ✔ Chụp màn hình đối chứng ở 1280px và 390px (mobile): topbar wrap đúng, card xếp cột, không tràn ngang.
- ✔ Bảng dài trong evolution/notes nằm trong khung cuộn ngang (`.tblwrap`).
- ✔ Sửa trong đợt kiểm: nhãn/badge chứa tiếng Việt bỏ font monospace (glyph dấu tổ hợp như "Ở" tách rời trên font mono fallback) — chuyển sang system sans, kiểm lại bằng screenshot.

## 8. Phạm vi chưa kiểm (khai báo minh bạch)

- Chưa render V1/V2 với CDN thật (môi trường chặn) — dựa trên bằng chứng online 07/08/2026 nêu ở mục 2.
- Chưa kiểm trên Firefox/Safari (site dùng HTML/CSS chuẩn, không API đặc thù; rủi ro thấp).
- Chưa deploy thật lên GitHub Pages từ môi trường này — mô phỏng đường dẫn con ở mục 3 là proxy sát nhất; checklist sau deploy nằm trong `docs/DEPLOYMENT.md`.
