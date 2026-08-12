# PROVENANCE_RECORD — hồ sơ xuất xứ của kho lưu trữ gốc

Ghi ngày **2026-08-12**, trước khi thực hiện bất kỳ thay đổi nào trong đợt chuyển đổi
"Learning Hub → IC Design Learning & Research Community Hub".

Nguyên tắc (kế thừa `VERSIONING_POLICY` của Learning Hub và được giữ nguyên ở hub mới):
các file trong `_source/` là **hồ sơ xuất xứ bất biến** — không sửa, không nén lại,
không tái tạo, không thay thế âm thầm.

## 1. Băm SHA-256 của `_source/` (đo TRƯỚC khi chuyển đổi)

Đo trên bản giải nén từ `learning-hub.zip` do tác giả cung cấp ngày 12/08/2026:

| File | Bytes | SHA-256 |
|---|---|---|
| `_source/bao-cao-danh-gia-lucero-ic-v1-v2.md` | 16 634 | `5376ffb5d882e716718cf9c7aef0f0f28b6d9727178f01967ba1b31308b5aa20` |
| `_source/version 1.zip` | 139 466 | `555727fd7273fa2770e9eaca4123f6bf9aa6072782bced6b33a1903cec058e53` |
| `_source/version2.zip` | 383 611 | `7c06d461532c0b7cc0614a71fce176825c0dac361497d99b4a8d2ee8064f5993` |
| `_source/version3.zip` | 313 704 | `92427e1adc392244d057c413f61a41b1e330b4d9eb5d3920dc3b39737d50308f` |

Kiểm tra lại bất kỳ lúc nào:

```bash
npm run check          # bước đầu tiên của check là đối chiếu 4 hash này
# hoặc thủ công:
node tools/check-source-hashes.mjs
```

## 2. Quan sát về các bản sao bên ngoài repo (chỉ ghi nhận, không xử lý)

Trong thư mục làm việc của tác giả (`PKAIC community/`) tồn tại các bản zip rời:

- `version 1.zip`, `version2.zip` — **trùng hash** với bản trong `_source/` (cùng nội dung).
- `version3.zip` (292 328 B, SHA-256 `7c0ee02f…cbbc4c`) — **KHÁC** với `_source/version3.zip`
  (313 704 B). Bản trong `_source/` là snapshot V3 do Learning Hub đóng gói ngày 08/08/2026
  (kèm chip điều hướng và bộ tài liệu audit đầy đủ) và là bản chuẩn của repo.
  Bản rời nhiều khả năng là một export V3 sớm hơn. Không file nào bị sửa; chỉ ghi nhận
  để tránh nhầm lẫn về sau.
- `ic-design-mentoring-hub.zip` và `learning-hub.zip` — giải nén ra **nội dung giống nhau
  từng byte** (cùng một site, hai tên file). Hub mới được xây từ bản `learning-hub.zip`.

## 3. Cam kết kiểm chứng sau chuyển đổi

Sau khi hoàn tất chuyển đổi, 4 hash ở mục 1 được đo lại và phải **trùng khớp tuyệt đối**.
Kết quả đối chiếu nằm trong `docs/VALIDATION_REPORT_NEW_HUB.md` (mục "Provenance").
