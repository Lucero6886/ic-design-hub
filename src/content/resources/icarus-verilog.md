---
title: "Icarus Verilog (iverilog)"
summary: "Trình biên dịch/mô phỏng Verilog & SystemVerilog mã nguồn mở, chạy dòng lệnh, đa nền tảng — công cụ mô phỏng chính thức của giáo trình Phase 1."
date: 2026-08-08
kind: tool
url: "https://github.com/steveicarus/iverilog"
license: "GPL-2.0 (mã nguồn mở)"
track: verification
tags: [simulation, verilog, systemverilog, toolchain]
whyRecommended: "Toàn bộ RTL của giáo trình V3 được biên dịch và mô phỏng thật bằng `iverilog -g2012` trong quá trình kiểm định (0 lỗi trên 22 khối RTL/testbench) — học viên dùng đúng công cụ mà giáo trình đã dùng để tự kiểm chứng bài của mình, miễn phí và không cần license."
---

Cài đặt nhanh: có sẵn trong hầu hết package manager (`apt install iverilog`,
`brew install icarus-verilog`, bản Windows có installer). Chạy với chuẩn SystemVerilog 2012:

```bash
iverilog -g2012 -o sim tb_traffic.sv traffic_ctrl.sv tick_gen.sv
vvp sim
```

Xem dạng sóng: kết hợp `$dumpfile`/`$dumpvars` trong testbench và mở file `.vcd` bằng một
trình xem waveform (ví dụ GTKWave).
