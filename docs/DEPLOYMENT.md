# DEPLOYMENT — triển khai lên GitHub Pages (qua GitHub Actions)

Khác Learning Hub cũ (site tĩnh thuần, deploy from branch): hub mới có bước **build**, nên
GitHub Pages phải chạy ở chế độ **GitHub Actions**. Workflow đã viết sẵn —
`.github/workflows/deploy.yml`.

## Triển khai lần đầu (một lần, ~10 phút)

### Bước 1 — điền cấu hình trung tâm

Sửa `src/config/site.ts` (MỘT file duy nhất):

```ts
siteUrl: "https://<username>.github.io",
basePath: "/<ten-repo>",          // deploy domain riêng ở gốc thì để "/"
repoUrl: "https://github.com/<username>/<ten-repo>",
```

và sửa link Discussions trong `.github/ISSUE_TEMPLATE/config.yml` cho khớp repo.

### Bước 2 — tạo repo và push

```bash
git init
git add -A
git commit -m "IC Design Learning & Research Hub"
git branch -M main
git remote add origin https://github.com/<username>/<ten-repo>.git
git push -u origin main
```

### Bước 3 — bật Pages chế độ Actions

Trên GitHub: **Settings → Pages → Build and deployment → Source: chọn "GitHub Actions"**
(KHÔNG chọn "Deploy from a branch").

### Bước 4 — chạy deploy

Push ở bước 2 đã kích hoạt workflow (tab **Actions** hiện "Deploy to GitHub Pages").
Nếu bạn bật Pages SAU khi push: vào tab Actions → chọn workflow → **Re-run all jobs**
(hoặc Actions → Deploy to GitHub Pages → Run workflow). 1–3 phút sau, site chạy tại
`https://<username>.github.io/<ten-repo>/`.

Lưu ý hay gặp: lần chạy đầu có thể fail ở bước deploy nếu Pages chưa được bật trước đó —
bật Pages (bước 3) rồi Re-run là xong.

## Workflow làm gì mỗi lần push main

```
checkout → Node 22 + cache npm → configure-pages (lấy site/base ĐÚNG theo repo)
→ npm ci → kiểm hash _source (provenance) → validate legacy + schema nội dung
→ astro build (ASTRO_SITE/ASTRO_BASE từ Pages) → postbuild (redirect URL cũ + _source + .nojekyll)
→ validate dist (link chết, draft lọt, hạ tầng) → upload → deploy
```

Một bước validate FAIL = không deploy — site hỏng không bao giờ lên production.
Concurrency đã bật: hai push liên tiếp không deploy chồng nhau.

## Kiểm tra sau deploy (5 phút)

1. Trang chủ hiện hero + các lối vào theo mục tiêu.
2. `…/learn/` → card "Vào giáo trình V3" → mở một tuần V3 → quiz/tiến độ hoạt động
   (localStorage) → chip "⌂ Hub · V3" quay về cổng legacy.
3. `…/legacy/versions/v1/index.html` → ô "Tuần 5 thiếu nguồn" vẫn hiển thị đúng.
4. `…/search/` → gõ `uart` → kết quả từ hub mới lẫn [V1]/[V2]/[V3]; gõ không dấu `mach tuan tu` → ra kết quả.
5. `…/versions/v3/Week05.html` (URL kiểu CŨ) → tự chuyển về `…/legacy/versions/v3/Week05.html`.
6. `…/legacy/_source/version3.zip` tải được (provenance công khai).
7. `…/rss.xml`, `…/sitemap-index.xml`, `…/robots.txt` trả về nội dung.
8. URL sai bất kỳ → trang 404 của hub.

## Cập nhật site hằng ngày

```bash
# sau khi thêm/sửa nội dung:
npm run check      # nhanh, chạy tại máy
git add -A && git commit -m "..." && git push
# → Actions tự build + validate + deploy
```

Không cần chạy build tay, không cần sinh chỉ mục tay — CI làm hết.

## Trang Tin tức tự cập nhật (từ 13/08/2026)

Workflow có thêm lịch chạy **hằng ngày 22:00 UTC (~5:00 sáng VN)**: bước
`node tools/fetch-news.mjs` lấy tin mới từ danh sách nguồn trong
`src/data/news-sources.json` (RSS chính thức, đã kiểm chứng) → ghi
`src/data/news-items.json` → build + deploy lại. Ba điều cần biết:

1. Nguồn lỗi/mất mạng KHÔNG chặn deploy — bước này luôn kết thúc thành công, tin cũ được giữ.
2. **GitHub tự tắt scheduled workflow nếu repo im ắng 60 ngày** — vào tab Actions, chọn
   workflow, bấm *Enable* là chạy lại (một commit bất kỳ cũng kích hoạt lại).
3. Thêm/bớt nguồn tin: sửa MỘT file `src/data/news-sources.json` (tiêu chí ghi ngay trong
   file); parser có self-test không cần mạng, chạy trong `npm run check`.

## Domain riêng (tùy chọn)

Settings → Pages → Custom domain (+ file `CNAME` trong `public/`). Sau đó sửa
`src/config/site.ts`: `siteUrl` = domain mới, `basePath: "/"`. `configure-pages` trong CI
sẽ tự cấp base rỗng — site chạy ở gốc domain.

## Gỡ lỗi

| Triệu chứng | Nguyên nhân | Xử lý |
|---|---|---|
| Actions fail bước "Provenance" | file `_source/` bị đổi | khôi phục file gốc — thư mục bất biến |
| Actions fail bước build, thông báo tên trường | frontmatter sai schema | sửa theo thông báo; xem AUTHORING_GUIDE §7 |
| Actions fail "validate dist: link chết" | link nội bộ sai trong bài mới | sửa đường dẫn (quy tắc `../../`) |
| Deploy xong nhưng CSS/link hỏng | mở bằng URL thiếu base (vd quên `/ten-repo/`) | dùng đúng URL Pages; nếu đổi tên repo → sửa basePath trong config |
| Trang V1/V2 "vỡ" layout khi offline | hành vi lịch sử (CDN) | không phải lỗi deploy |
