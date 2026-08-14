# <Tên project> — Nhóm <tên nhóm>

> Repo nhóm theo chuẩn của IC Design Learning & Research Hub.
> Đề bài gốc: <link trang project trên hub> · Mentor: Giảng Viên Đinh Văn Nam

## Cấu trúc

```text
rtl/     ← module thiết kế (.sv) — mỗi module một file
tb/      ← testbench (BẮT BUỘC có self-check: $error khi sai)
docs/    ← spec, interface, log tuần, waveform chú thích
Makefile ← make sim (biên dịch + mô phỏng) · make wave (mở GTKWave) · make clean
```

File mẫu `counter_mod10` có sẵn để kiểm tra môi trường: clone xong chạy `make sim` —
thấy `KET THUC: count=5 …` là toolchain hoạt động; sau đó thay bằng module của đề bài.

## Luật làm việc nhóm (3 người, vai trò xoay vòng mỗi tuần)

| Vai trò | Tuần này làm gì |
|---|---|
| Design lead | Vẽ diagram/interface, viết RTL của tuần |
| Verification lead | Viết testbench + invariant, giữ "bằng chứng trước kết luận" |
| Integration & docs lead | Quản repo, review PR, viết `docs/log-tuan-N.md`, chuẩn bị demo |

1. **Interface chốt ở Tuần 1 là hợp đồng** — muốn sửa phải trả lời "có cách nào KHÔNG sửa không?" trước cả nhóm.
2. **Không push thẳng vào `main`** — mọi thay đổi qua Pull Request, người KHÁC review (đúng một luật của khóa: người viết không tự duyệt bài mình).
3. **CI phải xanh mới merge** — tab Actions chạy `make sim` tự động; testbench fail = PR đỏ = chưa xong.
4. Cuối tuần: điền `docs/log-tuan-N.md` (theo mẫu) + 1 waveform chú thích.

## Thiết lập lần đầu

1. Copy khung này làm gốc repo (hoặc dùng nút **Use this template** nếu mentor đã tạo template repository).
2. Đổi tên `github-workflows/` thành `.github/workflows/` rồi push — CI tự chạy.
3. Điền tên project/nhóm vào README này; xóa file mẫu counter khi bắt đầu code thật.
