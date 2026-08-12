# DEPLOYMENT — triển khai lên GitHub Pages

## Triển khai lần đầu

```bash
# 1. Tạo repo trên GitHub (ví dụ: ic-design-mentoring-hub), rồi:
git init
git add -A
git commit -m "IC Design Mentoring Learning Hub — V1/V2/V3"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

2. Trên GitHub: **Settings → Pages → Build and deployment**
   - Source: *Deploy from a branch*
   - Branch: `main`, thư mục `/ (root)` → **Save**
3. Đợi 1–2 phút (tab Actions hiện tiến trình "pages build and deployment"). Site chạy tại:
   `https://USERNAME.github.io/REPOSITORY/`

Không có bước build nào: site là HTML/CSS/JS tĩnh thuần.

## Hai điều kiện bắt buộc — đừng bỏ

- **`.nojekyll` phải tồn tại ở gốc repo.** Không có nó, GitHub Pages chạy Jekyll và **loại bỏ thư mục `_source/`** (tên bắt đầu bằng `_`) khỏi site.
- **Không đổi liên kết sang đường dẫn tuyệt đối** (`/assets/...`). Site được thiết kế 100% đường dẫn tương đối để chạy đúng dưới `/REPOSITORY/`. `node tools/validate.mjs` sẽ báo lỗi nếu có liên kết tuyệt đối lọt vào.

## Kiểm tra sau khi deploy (5 phút)

1. Mở trang gốc → thấy 3 card phiên bản; bấm vào từng card.
2. `versions/v1/index.html` → ô "Tuần 5 — không có trong bản lưu trữ" hiển thị; mở Tuần 4 → thanh điều hướng trên/dưới; "Tuần 6 →" kèm ghi chú thiếu nguồn.
3. `versions/v2/Week9.html` → thanh hub trên cùng; trang hiển thị đủ style (V2 cần Internet — nếu đứt mạng, chữ vẫn đọc được nhưng mất bố cục: hành vi lịch sử, không phải lỗi deploy).
4. `versions/v3/index.html` → mở một tuần, làm 1 câu quiz, tải lại trang → trạng thái còn (localStorage); bật công tắc Mentor; chip "⌂ Hub · V3" quay về trang gốc.
5. Trang gốc → ô tìm kiếm: gõ `uart` → kết quả từ cả ba phiên bản, có nhãn [V1]/[V2]/[V3].
6. Gõ một URL sai → trang 404 tùy chỉnh xuất hiện (GitHub Pages tự dùng `404.html`).

## Cập nhật site

```bash
# sau khi sửa nội dung:
node tools/build-search-index.mjs   # nếu thêm/bớt/đổi tiêu đề trang
node tools/validate.mjs             # phải PASS trước khi push
git add -A && git commit -m "..." && git push
```

GitHub Pages tự deploy lại sau mỗi push vào `main` (1–2 phút).

## Tên miền riêng (tùy chọn)

Settings → Pages → Custom domain. Vì toàn bộ liên kết là tương đối, site chạy nguyên trạng dưới domain riêng — không phải sửa gì. Nếu thêm file `CNAME`, giữ nguyên `.nojekyll`.

## Gỡ lỗi thường gặp

| Triệu chứng | Nguyên nhân | Xử lý |
|---|---|---|
| `_source/` 404 trên site | thiếu `.nojekyll` | thêm lại file rỗng `.nojekyll`, push |
| CSS hub không tải khi mở qua Pages | ai đó đổi link sang `/assets/...` | chạy `node tools/validate.mjs`, sửa về tương đối |
| Trang V1/V2 "vỡ" layout | không có Internet/CDN bị chặn | hành vi lịch sử của V1/V2 — không phải lỗi site |
| Tìm kiếm không ra trang mới thêm | quên tái sinh index | `node tools/build-search-index.mjs`, push |
