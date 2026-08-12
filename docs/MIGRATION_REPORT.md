# MIGRATION_REPORT — Learning Hub → IC Design Learning & Research Community Hub

Ngày thực hiện: **2026-08-12** · Nguồn: `learning-hub.zip` (bản do tác giả cung cấp;
trùng byte với `ic-design-mentoring-hub.zip`).

## 1. Mục tiêu và cách tiếp cận

Chuyển Learning Hub (cổng 3 phiên bản giáo trình) thành nền tảng cộng đồng dài hạn
(Learn / Knowledge / Research / Projects / Mentoring / Resources / Community / About) mà:
KHÔNG mất tính năng đang chạy, KHÔNG sửa lịch sử, KHÔNG bịa nội dung, và về sau **thêm một
nội dung = thêm một file Markdown**. Trình tự thực hiện theo đúng phase A→J
(audit → preserve → architecture → legacy → content model → migration → community →
search/SEO → validation → documentation).

## 2. Những gì ĐƯỢC GIỮ NGUYÊN (và bằng chứng)

| Hạng mục | Bằng chứng |
|---|---|
| `_source/` bất biến | 4/4 hash SHA-256 khớp trước–sau (`docs/audit/PROVENANCE_RECORD.md`; CI kiểm mỗi build) |
| Nội dung giảng dạy V1/V2 (23 trang tuần gốc) | không một thay đổi nào trong đợt (grep xác nhận chúng vốn không chứa metadata tác giả — không cần vá) |
| Toàn bộ chức năng V3: 4 lớp, quiz, mentor mode, localStorage `licv3:`, offline, RTL | cây `versions/v3` chỉ nhận thay thế chuỗi danh tính ở meta/footer; validator legacy PASS 0 lỗi |
| Điều hướng nội bộ legacy (thanh hub V1/V2, chip ⌂ Hub·V3, prev/next bỏ qua Tuần 5) | cả cây di chuyển nguyên khối → link tương đối không đổi; `tools/validate-legacy.mjs` PASS |
| Search cũ của legacy (file JS index, chạy cả file://) | giữ nguyên trong cây; regenerate cho kết quả y hệt (44 mục) |
| Tài liệu cũ (README + 6 docs) | bản nguyên trạng: `docs/legacy-hub/`; bản phục vụ: `public/legacy/docs/` |
| Chính sách bất biến + changelog | kế thừa và mở rộng: `docs/VERSIONING_POLICY.md`, `docs/CONTENT_CHANGELOG.md` |

## 3. Những gì THAY ĐỔI

1. **Vị trí cây cũ:** root → `public/legacy/` (URL cũ có trang chuyển hướng tương thích tự sinh —
   51 trang; index.html cũ không stub vì trang chủ mới thay thế).
2. **Attribution:** 40 file / 166 thay thế theo danh tính chuẩn mới — chi tiết từng file trong
   `docs/CONTENT_CHANGELOG.md`; hạng mục "Attribution / legal metadata correction" được bổ
   sung chính thức vào VERSIONING_POLICY.
3. **Banner điều hướng** trên 3 trang gốc hub cũ (loại thay đổi "điều hướng" — chuẩn cũ).
4. **Site mới** (Astro 7): cấu hình trung tâm, 6 content collection có schema, trang section,
   tag, tìm kiếm toàn hub (kèm cả legacy, gõ không dấu được), RSS, sitemap, robots, 404,
   canonical/OG, dark mode, skip-link/focus/reduced-motion.
5. **CI/CD:** push main → provenance check → validate → build (site/base tự theo Pages) →
   postbuild → validate dist → deploy. Deploy from branch (cũ) → GitHub Actions (mới).
6. **Cộng đồng:** 5 issue form, PR template có cam kết bản quyền, CONTRIBUTING,
   CODE_OF_CONDUCT, hướng dẫn bật Discussions (docs/COMMUNITY_SETUP.md).

## 4. Nội dung khởi tạo (chỉ từ tư liệu THẬT)

| Nội dung mới | Nguồn gốc |
|---|---|
| Lộ trình "IC Design Foundations — Phase 1" | CURRICULUM_MAP + cấu trúc 12 tuần V3 |
| Project "Smart Traffic Controller FPGA System" | PROJECT_GUIDE V3 + Validation Report (kết quả mô phỏng THẬT đã chạy 08/08) |
| Ghi chú "EQ→RQ" (methodology, nhãn heuristic) | MENTOR_GUIDE §7 + EQ→RQ các tuần 6–12 |
| Ghi chú "5 track Phase 2" (roadmap, nhãn interpretation) | Week12 V3 (nguyên bảng 5 track A–E) |
| Bài viết "FF khởi động với giá trị gì?" | TECHNICAL_AUDIT §5.1 (cùng tác giả; có dòng `attribution`) |
| 2 tài nguyên (Icarus Verilog, EDA Playground) | công cụ THẬT được giáo trình dùng (iverilog trong validation; EDA Playground trong V2) |
| 1 thông báo ra mắt hub | sự kiện thật (chính đợt chuyển đổi này) |

Các track chưa có tài liệu (ASIC Front-End, STA, Physical Design, AI for IC…) hiển thị nhãn
**"Định hướng"** — không có bài viết tự sinh nào được tạo.

## 5. Tính năng cũ → tương đương mới (không hồi quy âm thầm)

| Tính năng cũ | Số phận |
|---|---|
| Duyệt 3 phiên bản độc lập | GIỮ nguyên trạng tại `legacy/` + lối vào từ Learn/trang chủ |
| Search 3 phiên bản (fold tiếng Việt, scope) | GIỮ trong legacy **và** nâng cấp ở `/search/` (phủ thêm nội dung mới, cùng thuật toán fold) |
| Quiz/tiến độ/mentor mode/offline của V3 | GIỮ nguyên (không đụng js/css/localStorage) |
| Trang evolution 11 phương diện | GIỮ nguyên + trang dẫn nhập mới `learn/evolution/` |
| validate.mjs / build-search-index.mjs cũ | GIỮ trong cây legacy, được `npm run check` gọi qua wrapper |
| Card phiên bản tĩnh trên index cũ | GIỮ trong legacy; site mới render card từ `versions.json` (một nguồn dữ liệu) |
| Khả năng mở file:// của hub cũ | GIỮ cho cây legacy (tự chứa); site mới cần HTTP (clean URL) — đánh đổi có chủ đích, đã ghi nhận |

## 6. Rủi ro còn lại / việc thủ công của tác giả

1. Điền `siteUrl/basePath/repoUrl` thật vào `src/config/site.ts` + link trong
   `.github/ISSUE_TEMPLATE/config.yml` (đang là placeholder USERNAME).
2. Bật GitHub Pages chế độ **GitHub Actions** + bật **Discussions** (docs/DEPLOYMENT.md,
   docs/COMMUNITY_SETUP.md).
3. Nếu Learning Hub cũ ĐÃ từng deploy ở một URL công khai: các URL cũ dạng
   `/versions/...` được chuyển hướng tự động; riêng trang chủ cũ `/index.html` giờ là trang
   chủ mới (có lối vào legacy rõ ràng) — cân nhắc thông báo cho người học.
4. Ảnh OG (social preview) chưa có file ảnh riêng — meta đã đủ; có thể bổ sung ảnh sau.

## 7. Kiểm định

Toàn bộ kết quả kiểm định THẬT (lệnh + kết quả từng mục PASS/FAIL/NOT TESTED):
`docs/VALIDATION_REPORT_NEW_HUB.md`.
