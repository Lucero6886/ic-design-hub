# IC Design Mentoring — Learning Hub

**Giáo trình mentoring 12 tuần nhập môn thiết kế vi mạch số** (Digital IC Design · RTL · FPGA · System Thinking), tiếng Việt — kèm toàn bộ lịch sử phát triển của chính nó.

Khoa Điện – Điện tử · Trường Kỹ thuật · **Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam** · © 2026

*(English: a Vietnamese 12-week introductory IC-design mentoring curriculum, published as one GitHub Pages site holding three independently browsable historical versions of itself.)*

---

## Kho này là gì?

Một website tĩnh duy nhất (GitHub Pages) chứa **ba trạng thái lịch sử** của cùng một giáo trình:

| Phiên bản | Trạng thái | Nội dung | Dùng khi |
|---|---|---|---|
| **V1** — Bản gốc (07/2026) | Lưu trữ | 11 phiếu điều phối buổi sinh hoạt 60′ (Tuần 5 không có trong bản lưu) | Tham khảo format buổi học; rà soát lịch sử |
| **V2** — Bản mở rộng (07/2026) | Lưu trữ | Giáo trình tự học 12 tuần, 18 section, quiz, RTL, rubric, mentor notes | Đối chiếu sư phạm; truy nguyên hiệu chỉnh |
| **V3** — Bản hiện hành (08/2026) | **Khuyến nghị** | Hệ 4 lớp, project tích hợp T9–11, capstone T12, audit + validation, offline | **Học · Dạy · Mentoring hôm nay** |

Ba phiên bản **không bị gộp** và **không bị viết lại cho giống nhau**. Nguyên tắc: *phiên bản đã lưu trữ là bất biến* — xem `docs/VERSIONING_POLICY.md`.

## Cấu trúc thư mục

```
/
├── index.html              # Cổng chọn phiên bản + tìm kiếm toàn hub
├── evolution.html          # So sánh V1 → V2 → V3 (11 phương diện, có dẫn chứng)
├── about.html              # Giới thiệu, trích dẫn, nguyên tắc quản lý phiên bản
├── 404.html
├── .nojekyll               # BẮT BUỘC: để GitHub Pages phục vụ thư mục _source/
├── assets/                 # CSS/JS của hub (không đụng tới asset các phiên bản)
│   ├── css/site.css
│   └── js/site.js · search-index.js (sinh tự động)
├── data/versions.json      # Manifest phiên bản (cho tooling & bảo trì)
├── versions/
│   ├── v1/                 # 11 trang gốc + index + VERSION_NOTES + trang ghi nhận Week5
│   ├── v2/                 # 12 trang gốc + index + VERSION_NOTES
│   └── v3/                 # Bản V3 nguyên vẹn (12 tuần, css/js/assets, 8 tài liệu, tools/)
├── docs/                   # Tài liệu vận hành website (kiến trúc, manifest, deploy, kiểm định)
├── tools/                  # build-search-index.mjs · validate.mjs (không cần dependency)
├── _source/                # BẢN GỐC NGUYÊN TRẠNG: version 1.zip · version2.zip · version3.zip
└── README.md               #   + báo cáo rà soát V1/V2 (07/08/2026)
```

## Xem thử trên máy (local)

Không cần build. Chỉ cần một web server tĩnh bất kỳ:

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
cd REPOSITORY
python3 -m http.server 8000
# mở http://localhost:8000/
```

Mở thẳng `index.html` bằng file:// cũng chạy được (hub và V3 hoạt động offline hoàn toàn, kể cả tìm kiếm). Riêng các trang **V1/V2 cần Internet** để tải CSS từ CDN — đó là đặc điểm lịch sử của chúng, được giữ nguyên có chủ đích.

## Triển khai GitHub Pages

1. Tạo repository (ví dụ `ic-design-mentoring-hub`) và push toàn bộ nội dung thư mục này lên nhánh `main`.
2. Trên GitHub: **Settings → Pages → Build and deployment** → Source: *Deploy from a branch* → Branch: `main` / `/ (root)` → Save.
3. Đợi 1–2 phút. Site xuất hiện tại `https://USERNAME.github.io/REPOSITORY/`.

Toàn bộ liên kết trong site là **đường dẫn tương đối**, nên site chạy đúng ở mọi đường dẫn con (`/REPOSITORY/`) lẫn domain riêng — không có cấu hình nào phải sửa. File `.nojekyll` phải được giữ (không có nó, GitHub Pages bỏ qua thư mục `_source/` vì bắt đầu bằng `_`). Chi tiết và cách kiểm sau khi deploy: `docs/DEPLOYMENT.md`.

## Bảo trì

- **Sửa nội dung V3** (bản hiện hành): sửa trong `versions/v3/` theo hướng dẫn riêng của nó (`versions/v3/implementation-notes.html`, mục Bảo trì). Sau khi sửa tài liệu `.md` của V3, chạy `node versions/v3/tools/mkdocs.mjs` trong thư mục `versions/v3/` (cần cài `marked`).
- **Không sửa nội dung V1/V2** — chúng là bản lưu trữ. Nếu buộc phải đụng (ví dụ sửa liên kết hỏng), ghi vào `docs/CONTENT_CHANGELOG.md`.
- **Đổi/thêm trang** → chạy lại chỉ mục tìm kiếm và kiểm định:
  ```bash
  node tools/build-search-index.mjs
  node tools/validate.mjs
  ```
- **Thêm Version 4 trong tương lai** (không phải thiết kế lại site):
  1. Tạo `versions/v4/` (giữ nguyên v3, **không** ghi đè).
  2. Thêm entry vào `data/versions.json`; đổi `status` của v3 thành `historical` nếu v4 thay thế nó.
  3. Thêm card V4 vào `index.html` (card là HTML tĩnh có chủ đích — site phải chạy được khi không có JavaScript) và cập nhật `evolution.html`.
  4. Thêm vòng lặp v4 vào `tools/build-search-index.mjs`, chạy lại index + validate.
  5. Ghi quyết định vào `docs/VERSIONING_POLICY.md` (mục lịch sử) và `docs/CONTENT_CHANGELOG.md`.

## Tài liệu

- `docs/SITE_ARCHITECTURE.md` — kiến trúc site và các quyết định tích hợp (vì sao banner tĩnh, vì sao card không render từ JSON…)
- `docs/CONTENT_MANIFEST.md` — danh mục đầy đủ file ba phiên bản
- `docs/VERSIONING_POLICY.md` — quy tắc bất biến của phiên bản lưu trữ
- `docs/DEPLOYMENT.md` — triển khai & kiểm tra sau deploy
- `docs/VALIDATION_REPORT.md` — kết quả kiểm định website này (link, render, RTL)
- `docs/CONTENT_CHANGELOG.md` — mọi thay đổi hub từng thực hiện trên nội dung

## Bản quyền

© 2026 · Bản quyền thuộc về **Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa**. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
