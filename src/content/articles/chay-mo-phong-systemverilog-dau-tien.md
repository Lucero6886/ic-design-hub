---
title: "Cầm tay chỉ việc: từ máy trắng đến mô phỏng SystemVerilog đầu tiên (kèm waveform)"
summary: "Hướng dẫn A–Z đã kiểm chứng từng lệnh: cài Icarus Verilog + GTKWave trên Windows/Linux/macOS, viết counter mod-10 và testbench, dự đoán trước khi chạy, mô phỏng, rồi mở waveform — trong khoảng 30–45 phút."
date: 2026-08-13
category: tutorial
difficulty: foundation
track: verification
tags: [iverilog, gtkwave, cai-dat, mo-phong, huong-dan]
prerequisites: ["Đã học tới Tuần 4–5 của giáo trình (biết always_ff, reset là gì)"]
outcomes:
  - "Cài xong bộ công cụ mô phỏng miễn phí trên máy của bạn"
  - "Tự biên dịch và chạy mô phỏng một module + testbench"
  - "Mở và đọc được file waveform đầu tiên trong GTKWave"
attribution: "Mọi lệnh Linux trong bài đã được chạy kiểm chứng thật với Icarus Verilog 12.0 (stable) ngày 13/08/2026; các bước Windows/macOS lấy từ tài liệu chính thức của công cụ (xem Tài liệu tham khảo)."
references:
  - label: "OSS CAD Suite (YosysHQ) — bộ công cụ EDA mã nguồn mở đóng gói sẵn cho Windows/Linux/macOS (gồm iverilog, GTKWave)"
    url: "https://github.com/YosysHQ/oss-cad-suite-build"
  - label: "Icarus Verilog — trang chính thức"
    url: "https://github.com/steveicarus/iverilog"
  - label: "Giáo trình V3, Tuần 5 — nơi counter mod-10 và testbench đầu tiên được dạy trong ngữ cảnh"
    note: "legacy/versions/v3/Week05.html"
relatedProjects: [smart-traffic-controller-fpga]
---

Bài này dành cho bạn nào tới Tuần 5 và muốn chạy mô phỏng **trên máy của mình** thay vì chỉ
dùng EDA Playground. Làm theo đúng thứ tự — mỗi bước đều có cách kiểm tra "đã xong chưa".

## Bước 1 — Cài bộ công cụ (10–15 phút, làm một lần)

Bạn cần hai thứ: **iverilog** (biên dịch + mô phỏng) và **GTKWave** (xem waveform).

**Windows (khuyến nghị: OSS CAD Suite — một file nén có sẵn tất cả):**

1. Vào trang [Releases của OSS CAD Suite](https://github.com/YosysHQ/oss-cad-suite-build/releases),
   tải bản `windows-x64` mới nhất (file `.exe` tự giải nén).
2. Giải nén vào thư mục không có dấu/khoảng trắng, ví dụ `C:\oss-cad-suite`.
3. Mỗi lần dùng: mở Command Prompt, chạy `C:\oss-cad-suite\environment.bat` — sau lệnh này
   `iverilog`, `vvp`, `gtkwave` dùng được trong cửa sổ đó.

**Ubuntu/Debian (2 lệnh):**

```bash
sudo apt-get install -y iverilog gtkwave
```

**macOS (Homebrew):**

```bash
brew install icarus-verilog gtkwave
```

**Kiểm tra đã xong chưa:** gõ `iverilog -V` — thấy dòng
`Icarus Verilog version 12.0 (stable)` (hoặc mới hơn) là đạt.

## Bước 2 — Tạo hai file (5 phút)

Tạo thư mục `lab01` và hai file sau (gõ lại thay vì copy — bạn sẽ nhớ cú pháp nhanh hơn).

`counter_mod10.sv` — mạch đếm 0→9 rồi quay về 0, đúng phong cách RTL của giáo trình:

```systemverilog
// counter mod-10: dem 0..9 roi quay ve 0
module counter_mod10 (
  input  logic       clk,
  input  logic       rst_n,   // reset bat dong bo, tich cuc muc thap
  input  logic       enable,
  output logic [3:0] count
);
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)            count <= 4'd0;
    else if (enable)       count <= (count == 4'd9) ? 4'd0 : count + 4'd1;
  end
endmodule
```

`tb_counter_mod10.sv` — testbench có tự kiểm tra và xuất waveform:

```systemverilog
module tb_counter_mod10;
  logic clk = 0, rst_n, enable;
  logic [3:0] count;
  counter_mod10 dut (.clk, .rst_n, .enable, .count);
  always #5 clk = ~clk;               // clock chu ky 10ns
  initial begin
    $dumpfile("wave.vcd");            // xuat file song cho GTKWave
    $dumpvars(0, tb_counter_mod10);
    rst_n = 0; enable = 0;
    #12 rst_n = 1; enable = 1;        // tha reset, cho phep dem
    #250;
    if (count !== 4'd5) $error("du doan sai: count=%0d (ky vong 5)", count);
    $display("KET THUC: count=%0d sau 25 canh clock co enable — dung du doan", count);
    $finish;
  end
endmodule
```

## Bước 3 — DỰ ĐOÁN trước khi chạy (bắt buộc — 5 phút giấy bút)

Trước khi gõ lệnh nào, trả lời trên giấy: *kết thúc mô phỏng, `count` bằng bao nhiêu?*

Lập luận: reset thả ở t=12ns; cạnh clock lên đầu tiên "nhìn thấy" enable là t=15ns; các cạnh
tiếp theo cách nhau 10ns; mô phỏng dừng quanh t=262ns → các cạnh 15, 25, …, 255 = **25 cạnh**
→ count = 25 mod 10 = **5**.

Chuyện thật khi soạn bài này: người viết dự đoán nhẩm là 4 — chạy ra 5 — và phải quay lại đếm
cạnh clock mới thấy mình quên cạnh đầu tại t=15. **Chênh lệch giữa dự đoán và kết quả chính
là chỗ bạn học được nhiều nhất** — nếu bạn cũng đoán 4, đừng sửa số vội: tự đếm lại cạnh đã.

## Bước 4 — Biên dịch và mô phỏng (1 phút)

Đứng trong thư mục `lab01`, chạy:

```bash
iverilog -g2012 -o sim counter_mod10.sv tb_counter_mod10.sv
vvp sim
```

Kết quả đúng phải in ra:

```text
VCD info: dumpfile wave.vcd opened for output.
KET THUC: count=5 sau 25 canh clock co enable — dung du doan
```

Không có dòng `ERROR` nào → testbench tự kiểm tra đã pass, và thư mục xuất hiện file `wave.vcd`.

## Bước 5 — Mở waveform (5 phút)

```bash
gtkwave wave.vcd
```

Trong GTKWave: khung trái chọn scope `tb_counter_mod10` → kéo `clk`, `rst_n`, `enable`,
`count[3:0]` sang khung sóng (hoặc chọn rồi bấm Append) → bấm nút zoom-fit. Ba thứ cần tự
chỉ ra được trên màn hình: (1) thời điểm `rst_n` thả; (2) `count` chỉ đổi **tại cạnh lên**
của `clk`; (3) cú wrap 9 → 0. Chụp màn hình có chú thích — đó chính là một artifact
kiểu Tuần 5 cho portfolio của bạn.

## Bước 6 — Tự biến tấu để chắc tay (15 phút)

- Đổi thành counter **mod-6** (đồng hồ giây hàng chục). Dự đoán trước giá trị cuối, rồi chạy.
- Thêm cổng ra `tick` bật lên đúng 1 chu kỳ khi wrap 9→0 — đây chính là ý tưởng `tick_gen`
  của project Tuần 9.
- Cố tình xóa nhánh `if (!rst_n)` rồi chạy lại: quan sát `count` thành `x` — ôn lại bài
  [FF khởi động với giá trị gì?](../reset-va-trang-thai-khoi-dong-flip-flop/)

## Lỗi thường gặp

| Triệu chứng | Nguyên nhân | Sửa |
|---|---|---|
| `iverilog: command not found` | chưa cài / chưa chạy `environment.bat` (Windows) | làm lại Bước 1; Windows phải chạy environment.bat trong MỖI cửa sổ lệnh mới |
| Lỗi cú pháp tại `always_ff` / `logic` | quên cờ `-g2012` | luôn biên dịch với `iverilog -g2012 …` |
| Chạy xong không thấy `wave.vcd` | testbench thiếu `$dumpfile`/`$dumpvars` | kiểm tra hai dòng đầu khối `initial` |
| GTKWave mở ra trống trơn | chưa kéo tín hiệu vào khung sóng | chọn scope bên trái → Append tín hiệu |
| Kết quả khác dự đoán | thường là bạn đếm cạnh clock sai — như người viết bài này | đếm lại trên giấy trước khi đổ lỗi cho công cụ |

Từ đây, mọi bài RTL trong Layer C của giáo trình đều chạy được trên máy bạn bằng đúng hai
lệnh ở Bước 4. Mắc kẹt quá 30 phút → [hỏi cộng đồng](../../community/) kèm code + dự đoán +
kết quả thực tế.
