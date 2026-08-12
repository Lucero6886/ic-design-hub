# VERSIONING_POLICY — quy tắc quản lý phiên bản giáo trình

## Quy tắc nền tảng

**Phiên bản đã lưu trữ là ảnh chụp giáo dục bất biến (immutable educational snapshot).**

Một khi phiên bản được đưa vào `versions/` với trạng thái lưu trữ, nội dung giảng dạy của nó không được sửa nữa — kể cả khi phát hiện lỗi kỹ thuật. Hiệu chỉnh trong tương lai phải đi theo một trong hai đường:

1. **Phiên bản mới** (`versions/v4/`, `v5/`, …) — con đường mặc định cho mọi thay đổi nội dung; hoặc
2. **Bản vá có ghi chép** — chỉ cho lỗi vận hành khiến trang không dùng được (liên kết hỏng, file thiếu, lỗi hiển thị chặn đọc), ghi đầy đủ vào `docs/CONTENT_CHANGELOG.md` (file nào, vì sao, thay đổi gì).

Lý do: bộ tài liệu này có giá trị kép — vừa là giáo trình, vừa là hồ sơ về cách một giáo trình trưởng thành. Viết đè lịch sử phá hủy giá trị thứ hai vĩnh viễn, trong khi phiên bản mới bảo toàn cả hai.

## Phân loại thay đổi

| Loại | Được phép trên bản lưu trữ? | Ghi chép |
|---|---|---|
| Điều hướng (thanh hub, liên kết prev/next hỏng) | Có — không đổi nội dung giảng dạy | CONTENT_CHANGELOG |
| Sửa hiển thị chặn đọc (charset, file thiếu) | Có, tối thiểu | CONTENT_CHANGELOG |
| Sửa lỗi kỹ thuật trong nội dung | **Không** — ghi chú ở VERSION_NOTES/evolution, sửa ở phiên bản mới | VERSION_NOTES |
| Tái cấu trúc sư phạm | **Không** — luôn là phiên bản mới | — |
| Nội dung thiếu trong bản gốc (Tuần 5 của V1) | **Không bao giờ tạo bù** — ghi nhận tường minh | VERSION_NOTES |

## Trạng thái phiên bản

- `current` — bản khuyến nghị để học/dạy/mentoring; đúng một phiên bản mang trạng thái này; vẫn được sửa theo quy trình riêng của nó (với V3: sửa `.md` → tái sinh HTML → chạy validation của nó).
- `historical` — lưu trữ bất biến.

Khi phát hành V(n+1): V(n) chuyển `current` → `historical` **tại thời điểm đó** và đóng băng; nội dung V(n) đúng như lúc chuyển trạng thái. Snapshot zip của V(n) được bổ sung vào `_source/`.

## Bản gốc (`_source/`)

`_source/` chứa các archive nguyên trạng (`version 1.zip`, `version2.zip`, `version3.zip`) và báo cáo rà soát V1/V2 (07/08/2026). Các file này **chỉ đọc về mặt quy ước** — không bao giờ sửa, không bao giờ xóa, không "nén lại cho gọn". Chúng là bằng chứng đối chiếu cuối cùng khi có nghi ngờ trang trong `versions/` bị sửa ngoài quy trình.

## Checklist thêm Version 4

1. `versions/v4/` mới, không đụng `versions/v3/`.
2. Snapshot v3 hiện tại → `_source/version3-final.zip` (nếu v3 có thay đổi sau bản zip đầu); v4 zip → `_source/`.
3. `data/versions.json`: thêm v4 (`current`), đổi v3 → `historical`.
4. `index.html`: thêm card v4, chuyển nhãn KHUYẾN NGHỊ; card v3 chuyển giọng sang lưu trữ.
5. `evolution.html`: thêm chặng V3 → V4 (dẫn chứng từ changelog/audit của v4).
6. `tools/build-search-index.mjs`: thêm vòng lặp v4 → chạy lại; `tools/validate.mjs` phải pass.
7. Trang tuần v3 nhận ghi chú trạng thái mới? **Không** — v3 đóng băng; trạng thái thể hiện ở card, badge và VERSION_NOTES (tạo mới cho v3 lúc đó).
8. Ghi toàn bộ vào `docs/CONTENT_CHANGELOG.md`.

## Lịch sử trạng thái

| Ngày | Sự kiện |
|---|---|
| 09/07/2026 | V1 đóng gói (11 tuần; thiếu Tuần 5) |
| 10/07/2026 | V2 đóng gói (12 tuần) |
| 07–08/08/2026 | V3 xây dựng từ V2 (audit 8 mục + validation); rà soát học thuật bổ sung 40 hiệu chỉnh (08/08) |
| 08/08/2026 | Learning Hub phát hành: V1, V2 chuyển trạng thái lưu trữ chính thức; V3 là bản hiện hành |
