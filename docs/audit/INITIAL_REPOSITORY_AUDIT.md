# INITIAL_REPOSITORY_AUDIT — rà soát repo `learning-hub` TRƯỚC khi chuyển đổi

Ngày rà soát: **2026-08-12** · Người thực hiện: đợt chuyển đổi "Community Hub"
Nguồn rà soát: `learning-hub.zip` (giải nén, 111 file) — đối chiếu chéo với thư mục
`learning-hub/` và `ic-design-mentoring-hub.zip` (trùng nội dung từng byte).

Tài liệu đã đọc đầy đủ trước khi kết luận: `README.md`, `index.html`, `about.html`,
`evolution.html`, `404.html`, `data/versions.json`, toàn bộ `docs/` (6 file),
`tools/build-search-index.mjs`, `tools/validate.mjs`, `assets/css/site.css`,
`assets/js/site.js`, V3 `README / CURRICULUM_MAP / MENTOR_GUIDE / PROJECT_GUIDE /
TECHNICAL_AUDIT / CHANGELOG_V2_TO_V3 / VALIDATION_REPORT / implementation-notes`
(bản .md), `versions/v3/tools/mkdocs.mjs`, trang tuần đại diện V1 (Week1), V2 (Week1),
V3 (Week12), và `_source/bao-cao-danh-gia-lucero-ic-v1-v2.md`.

---

## 1. Kiến trúc hiện tại

Site tĩnh thuần, **không framework, không build chain, không npm dependency** ở tầng hub.
Một hub (index/evolution/about/404 + `assets/`) trỏ vào ba phiên bản giáo trình độc lập
trong `versions/v1|v2|v3/`. Mỗi phiên bản tự chứa asset của nó. `_source/` chứa zip gốc
nguyên trạng; `.nojekyll` giữ cho GitHub Pages phục vụ thư mục bắt đầu bằng `_`.
Toàn bộ liên kết là **đường dẫn tương đối** — site chạy đúng dưới `USERNAME.github.io/REPO/`.

## 2. Các loại nội dung

| Loại | Vị trí | Ghi chú |
|---|---|---|
| Trang tuần V1 (11 trang) | `versions/v1/Week*.html` | Phiếu điều phối 60′; Tailwind/Fonts/FontAwesome qua CDN; **Tuần 5 không tồn tại trong bản gốc** (trang Week5.html hiện tại là trang "ghi nhận thiếu nguồn" do hub tạo) |
| Trang tuần V2 (12 trang) | `versions/v2/Week*.html` | Giáo trình tự học 18 section, quiz inline, CDN-phụ-thuộc |
| Trang tuần V3 (12 trang) | `versions/v3/Week01–12.html` | Mô hình 4 lớp; offline hoàn toàn; quiz engine + mentor mode + localStorage `licv3:` |
| Tài liệu vận hành V3 (8 tài liệu × .md + .html) | `versions/v3/*.md/.html` | `.md` là nguồn; `.html` sinh bằng `versions/v3/tools/mkdocs.mjs` (cần `marked`) |
| Trang hub | `index/evolution/about/404.html` | Card phiên bản là HTML tĩnh có chủ đích (chạy được khi tắt JS) |
| Manifest phiên bản | `data/versions.json` | Phục vụ tooling; không render runtime |
| Tài liệu vận hành hub | `docs/*.md` (6 file) | Kiến trúc, chính sách phiên bản, changelog, manifest, deploy, validation |
| Provenance | `_source/*.zip` + báo cáo rà soát | Bất biến |

## 3. Logic phiên bản/lịch sử hiện có

- V1 (07/2026, historical) → V2 (07/2026, historical) → V3 (08/2026, current/recommended).
- `VERSIONING_POLICY.md`: bản lưu trữ là **immutable educational snapshot**; chỉ 2 loại
  sửa được phép trên trang lưu trữ (điều hướng; sửa hiển thị chặn đọc) và phải ghi vào
  `CONTENT_CHANGELOG.md`. Tuần 5 V1 **không bao giờ được tạo bù**.
- Checklist thêm V4 đã được viết sẵn (README + VERSIONING_POLICY).
- `CONTENT_CHANGELOG.md` ghi từng thay đổi của đợt tích hợp 08/08/2026 (thanh điều hướng
  V1/V2, chip Hub·V3, vá template mkdocs) — kỷ luật này PHẢI được duy trì.

## 4. Build/deploy hiện tại

Không có build. Deploy = push lên `main` + GitHub Pages "Deploy from a branch" (root).
Hai script Node không dependency: `tools/build-search-index.mjs` (sinh
`assets/js/search-index.js`) và `tools/validate.mjs` (link nội bộ, đường dẫn tuyệt đối,
liên kết chéo phiên bản, title/lang/charset, id trùng, allowlist domain ngoài).
V3 có pipeline riêng: sửa `.md` → `node versions/v3/tools/mkdocs.mjs` (cần `marked`).

## 5. Kiến trúc tìm kiếm hiện tại

Chỉ mục sinh sẵn thành file JS (`window.LICHUB_INDEX`, ~90 KB, 44 trang) — chạy được cả
trên `file://`. Tìm theo tiêu đề + đề mục; **gập dấu tiếng Việt hai phía** (`fold()`:
NFD → bỏ dấu tổ hợp → `đ→d`); lọc phạm vi V1/V2/V3; xếp hạng title(3đ)/heading(1đ);
yêu cầu mọi term đều khớp. Đây là hành vi tốt cần **giữ lại** ở hub mới.

## 6. Thành phần tái sử dụng được

- Hàm `fold()` tiếng Việt (search + slug) — dùng lại nguyên văn.
- Logic quét heading của `build-search-index.mjs` — dùng lại cho phần chỉ mục legacy.
- `validate.mjs` — chạy được nguyên trạng trên cây legacy sau khi di chuyển (đường dẫn
  của nó tự neo theo vị trí file).
- Design token của V3 (`versions/v3/css/style.css`) — tham chiếu thẩm mỹ (không dùng chung
  file, đúng nguyên tắc "hub không dùng chung asset với phiên bản").
- `data/versions.json` — trở thành nguồn dữ liệu phiên bản cho site mới (import lúc build).

## 7. Điểm mạnh kỹ thuật

1. Kỷ luật bất biến + changelog + provenance zip: hiếm thấy và rất giá trị.
2. Validator và search-index generator không dependency, chạy nhanh, có thật.
3. `VALIDATION_REPORT.md` trung thực (ghi rõ cả mục CHƯA kiểm — mục 8).
4. 100% đường dẫn tương đối → an toàn dưới project-path của GitHub Pages.
5. V3 offline hoàn toàn, RTL đã biên dịch/mô phỏng thật bằng `iverilog -g2012`.
6. Nội dung V3 có chuẩn thuật ngữ tốt (statement → scope → assumption → limitation).

## 8. Nợ kỹ thuật / giới hạn bảo trì

1. **Metadata trùng lặp thủ công**: tác giả/đơn vị/copyright lặp ~97 lần trong 40 file;
   card phiên bản phải cập nhật ở 2 nơi (versions.json + index.html); navigation lặp trong
   từng trang hub. Thêm một mảng nội dung mới (bài viết, project) = sửa tay nhiều file.
2. **Không có mô hình nội dung**: không frontmatter, không schema, không tag/category,
   không RSS/sitemap — không mở rộng được thành hub bài viết/nghiên cứu/project.
3. Trang hub viết tay từng file HTML → không tách content/presentation.
4. Search chỉ index tiêu đề+đề mục (chấp nhận được cho legacy; không đủ cho hub bài viết).
5. V1/V2 phụ thuộc CDN (đặc điểm lịch sử — GIỮ NGUYÊN, chỉ ghi nhận).
6. Không có CI: validate chạy tay, không chặn push hỏng.
7. `docs/*.md` được liên kết trực tiếp từ trang HTML (about.html) — trên GitHub Pages
   những file này trả về text/plain (đọc được nhưng không đẹp); giữ hành vi cũ trong cây
   legacy, hub mới có trang HTML riêng.

## 9. Bất nhất về tác giả/bản quyền (yêu cầu §25 của đặc tả chuyển đổi)

- `Thạc sỹ Đinh Văn Nam`: **97 lần / 40 file** — toàn bộ trang hub, trang hub-tạo của
  V1/V2 (index, VERSION_NOTES, Week5-notice), toàn bộ 21 trang HTML V3 + 8 file .md V3 +
  template `mkdocs.mjs` + `README-tools.md`, `README.md` gốc.
- `Bản quyền thuộc Khoa Điện – Điện tử, Trường Kỹ thuật, Đại học Phenikaa`: **69 lần /
  39 file** — mâu thuẫn với danh tính chuẩn mới (bản quyền thuộc **Giảng Viên Đinh Văn Nam**).
- **Trang tuần gốc V1 (11) và V2 (12) KHÔNG chứa meta tác giả/bản quyền nào** → không cần
  (và không được) vá gì trong nội dung giáo dục gốc. Đây là phát hiện quan trọng: bản vá
  attribution không hề đụng tới artifact giáo dục nguyên bản.
- `_source/` chứa danh tính cũ bên trong zip/báo cáo — **giữ nguyên** (provenance).

## 10. Khả năng truy cập (accessibility)

Hub: có `aria-label`, `aria-pressed`, `role="status"`, `aria-live`, noscript fallback,
lang="vi", semantic HTML — khá tốt. Thiếu: skip-link, khai báo focus-visible nhất quán,
prefers-reduced-motion. V1/V2: chất lượng lịch sử (giữ nguyên). V3: tốt (đã audit riêng).

## 11. Responsive

Đã kiểm 1280px/390px trong đợt 08/08 (VALIDATION_REPORT mục 7) — đạt. Không thấy vấn đề mới.

## 12. SEO/metadata

Có `<title>`, description, author, copyright meta trên trang hub. **Thiếu**: canonical,
Open Graph, sitemap.xml, robots.txt, RSS, structured data. Hub mới phải bổ sung.

## 13. Liên kết hỏng

`tools/validate.mjs` chạy lại ngày 12/08/2026 trên bản giải nén: **0 lỗi** (53 file HTML).
(Kết quả chạy thật — xem VALIDATION_REPORT_NEW_HUB mục Legacy.)

## 14. Hành vi offline

Hub + V3: offline hoàn toàn (kể cả tìm kiếm — index là file JS, không fetch).
V1/V2: cần CDN (đặc điểm lịch sử được bảo toàn có chủ đích). PHẢI giữ nguyên tính chất này
trong cây legacy của hub mới.

## 15. Rủi ro phụ thuộc

Hub cũ: không dependency runtime → rủi ro 0. V1/V2: CDN bên thứ ba (tailwind CDN,
Google Fonts, FontAwesome, cdnjs) có thể đổi/mất trong tương lai xa — rủi ro lịch sử đã
được chấp nhận và ghi nhận; không xử lý trong đợt này. V3 tooling: `marked` (chỉ khi tái
sinh tài liệu). Hub mới thêm Astro + 2 integration chính thức — có lockfile + CI.

## 16. Rủi ro di trú (migration)

1. Di chuyển cây cũ vào thư mục con → liên kết nội bộ tương đối **vẫn đúng** (cả cây đi
   cùng nhau), nhưng URL tuyệt đối cũ (nếu site đã từng deploy) đổi → cần trang chuyển
   hướng tương thích tại đường dẫn cũ.
2. `_source/` phải tiếp tục được phục vụ trên site (hành vi cũ có `.nojekyll`) → pipeline
   build mới phải copy `_source/` vào output.
3. Trang `docs/*.md` được link từ about.html cũ → cây legacy phải mang theo `docs/` của nó.
4. Vá attribution phải chỉ đụng meta/footer/danh tính — **không** đụng nội dung giảng dạy.
5. Search cũ trong cây legacy phải tiếp tục hoạt động nguyên trạng (index tương đối trong cây).
6. GitHub Pages phải chuyển sang "GitHub Actions" mode (site mới cần build) — tài liệu
   deploy phải viết lại rõ ràng.

## 17. Những thứ TUYỆT ĐỐI KHÔNG được sửa

1. `_source/*` — bất biến, hash đã ghi trong `docs/audit/PROVENANCE_RECORD.md`.
2. Nội dung giảng dạy 11 trang tuần gốc V1 và 12 trang tuần gốc V2 (từng ký tự).
3. Nội dung giáo dục V3 (12 tuần + 8 tài liệu) — chỉ được vá **danh tính/bản quyền**
   (meta + footer) theo diện "attribution/legal metadata patch", ghi changelog đầy đủ.
4. Cơ chế của V3: quiz engine, mentor mode, namespace localStorage `licv3:`, khả năng
   offline, RTL trong bài.
5. Tuần 5 của V1: không bao giờ tạo bù nội dung.
6. `docs/` cũ (6 file) — nguyên bản được bảo tồn (trong cây legacy và/hoặc `docs/legacy-hub/`);
   chính sách mới được viết thành tài liệu mới thay vì sửa đè lịch sử.

## 18. Kết luận cho kiến trúc mới

Giữ toàn bộ site cũ như một **cây legacy khép kín, tự chứa, tự kiểm định được** dưới
`public/legacy/` của một shell Astro content-first; site mới chỉ *trỏ vào* legacy, không
nhào nặn lại nó. Mọi metadata danh tính đặt vào MỘT file cấu hình trung tâm. Nội dung mới
(bài viết/nghiên cứu/project/lộ trình/tài nguyên/thông báo) là content collections có
schema, tự lên chỉ mục/search/RSS/sitemap khi build. Không bịa nội dung cho mục trống.
