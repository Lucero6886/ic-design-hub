# SITE_ARCHITECTURE — kiến trúc website và các quyết định tích hợp

Tài liệu cho người bảo trì. Người dùng cuối không cần đọc file này.

## 1. Mô hình tổng thể

**MỘT hub → BA phiên bản duyệt độc lập.** Hub sở hữu: trang chủ, trang tiến hóa, giới thiệu, tìm kiếm, CSS/JS riêng (`assets/`). Mỗi phiên bản sở hữu trọn thư mục `versions/vN/` của nó, gồm cả asset riêng (V3 có `css/ js/ assets/ tools/` nội bộ). Hub **không** dùng chung asset với phiên bản nào — một phiên bản có thể được thêm/bỏ mà không ảnh hưởng phần còn lại.

```
index.html ──┬── versions/v1/ (lưu trữ, bất biến)
             ├── versions/v2/ (lưu trữ, bất biến)
             ├── versions/v3/ (hiện hành)
             ├── evolution.html · about.html
             └── _source/ (zip gốc, chỉ đọc)
```

## 2. Các quyết định thiết kế (và lý do)

**Đường dẫn tương đối tuyệt đối mọi nơi.** GitHub Pages phục vụ site tại `https://USER.github.io/REPO/` — không phải domain gốc. Mọi liên kết trong site do hub tạo đều tương đối (`../../index.html`, `Week02.html`); không có liên kết nào bắt đầu bằng `/`. `tools/validate.mjs` kiểm tự động điều này.

**Trang lịch sử chỉ nhận đúng MỘT loại chỉnh sửa: thanh điều hướng.** Mỗi trang tuần V1/V2 được chèn một thanh điều hướng tự chứa (inline style, không phụ thuộc CSS của trang hay của hub, không JavaScript) ngay sau `<body>`; V1 thêm một thanh nữa trước `</body>` vì trang gốc của nó hoàn toàn không có điều hướng, còn V2 giữ prev/next gốc ở cuối trang. Không dùng iframe (phá deep-link, phá lịch sử trình duyệt), không sửa CSS của trang (đổi diện mạo lịch sử), không server-side include (Pages là site tĩnh). Thanh này ở vị trí `static` — không `sticky` — vì trang V2 có header `sticky top-0` riêng, hai thanh sticky sẽ đè nhau.

**Nhận diện phiên bản luôn hiển thị bằng chữ, không chỉ bằng màu.** Badge trong thanh điều hướng ghi rõ "V1 · BẢN LƯU TRỮ GỐC" / "V2 · BẢN MỞ RỘNG"; trang V3 có chip "⌂ Hub · V3" trong topbar sticky của chính nó. Màu (V1 hổ phách, V2 xanh da trời, V3 xanh lục) chỉ là lớp bổ trợ.

**Bộ chuyển phiên bản trỏ về TRANG CHỦ phiên bản, không trỏ "cùng tuần".** Chủ đích: ba giáo trình không tương đương từng-tuần (V1 thiếu Tuần 5; T9–11 của V3 là một project tích hợp khác hẳn ba bài rời của V2). Nhảy "cùng số tuần" sẽ ngụ ý một sự tương đương không có thật — đúng nguyên tắc "version separation > forced consistency".

**V3 được nhúng nguyên vẹn, cộng đúng một chip điều hướng.** Mỗi trang V3 nhận một `<a class="chip">⌂ Hub · V3</a>` chèn vào nav có sẵn (chip đầu tiên để không bị khuất khi wrap trên mobile). Template `versions/v3/tools/mkdocs.mjs` được vá cùng một chip để tái sinh tài liệu không làm mất nó. Không đụng: mô hình 4 lớp, quiz engine, chế độ mentor, localStorage (namespace `licv3:` — không đổi), khả năng offline, RTL.

**Card phiên bản trên trang chủ là HTML tĩnh, không render từ `data/versions.json`.** Site phải dùng được khi JavaScript tắt/hỏng (nguyên tắc progressive enhancement); JSON manifest phục vụ tooling và người bảo trì. Đánh đổi chấp nhận: khi thêm V4 phải cập nhật hai nơi — README ghi rõ checklist.

**Tìm kiếm là một file JS sinh sẵn, không phải fetch JSON.** `assets/js/search-index.js` gán `window.LICHUB_INDEX` — thẻ `<script>` chạy được cả trên `file://` (fetch JSON bị CORS chặn trên file://). Chỉ index tiêu đề + đề mục (44 trang, ~80 KB) — đủ để định vị, không phình to. Có gập dấu tiếng Việt hai phía (index lẫn truy vấn) để gõ không dấu vẫn tìm được.

**Tiến độ học không được thêm cho V1/V2.** V1/V2 trong lịch sử không lưu trạng thái — thêm vào là làm sai lệch artifact. V3 giữ nguyên cơ chế localStorage riêng (`licv3:wNN:*`), độc lập theo phiên bản đúng yêu cầu, vì V1/V2 không ghi gì.

**`_source/` + `.nojekyll`.** Bản zip gốc nguyên trạng nằm trong repo làm bằng chứng lịch sử. GitHub Pages mặc định chạy Jekyll và **bỏ qua thư mục bắt đầu bằng `_`** — file `.nojekyll` ở gốc tắt hành vi đó. Xóa file này là `_source/` biến mất khỏi site.

## 3. Luồng dữ liệu khi bảo trì

```
sửa nội dung → node tools/build-search-index.mjs → node tools/validate.mjs → commit
   (V3 .md → chạy thêm node tools/mkdocs.mjs trong versions/v3/ trước)
```

## 4. Những gì cố tình KHÔNG làm

- Không framework, không build chain, không npm dependency cho hub (V3 dùng `marked` chỉ khi tái sinh tài liệu — không cần lúc chạy site).
- Không analytics, không tài khoản, không backend.
- Không viết lại V1/V2 theo chuẩn V3 (kể cả sửa lỗi kỹ thuật đã biết — chúng được ghi chú ở VERSION_NOTES và evolution.html thay vì sửa tại chỗ).
- Không tạo nội dung Tuần 5 cho V1 dưới bất kỳ hình thức nào.
