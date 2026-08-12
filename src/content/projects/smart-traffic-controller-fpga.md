---
title: "Smart Traffic Controller FPGA System (project tích hợp Tuần 9–11)"
summary: "Hệ điều khiển đèn giao thông hai hướng trên FPGA: FSM 4 pha + timer 1 Hz, hiển thị 7-segment, báo trạng thái về PC qua UART 8N1 — một hệ duy nhất lớn dần qua 3 tuần, bảo vệ ở Tuần 12."
date: 2026-08-08
kind: learning
status: completed
difficulty: foundation
platform: "FPGA (mô phỏng bắt buộc; nạp board là mở rộng)"
tools: ["SystemVerilog", "Icarus Verilog (iverilog -g2012)"]
mentor: "Giảng Viên Đinh Văn Nam"
track: fpga
tags: [fsm, uart, seg7, traffic-controller, phase-1]
prerequisites:
  - "Tuần 5 (counter, testbench)"
  - "Tuần 6 (FSM 3 khối)"
  - "Tuần 7 (style RTL sạch)"
deliverables:
  - "tick_gen.sv — chia 1 Hz bằng clock-enable (không derived clock)"
  - "traffic_ctrl.sv — FSM 4 pha + timer đếm lùi (controller + datapath)"
  - "seg7_decoder.sv — giải mã BCD → 7 đoạn (tổ hợp thuần)"
  - "status_tx.sv + uart_tx.sv — gửi 'GN 09\\n' (6 byte ASCII) mỗi giây, 115200 8N1"
  - "traffic_system_top.sv — top chỉ nối dây, không chứa logic riêng"
  - "Testbench có invariant check + waveform chú thích"
milestones:
  - { label: "T9 — traffic_ctrl mô phỏng pass safety invariant", done: true }
  - { label: "T10 — hệ ghép display; giải thích được thời điểm seg đổi trên waveform", done: true }
  - { label: "T11 — top mô phỏng ra frame UART đúng ('GN 09' đọc ngược được từ waveform)", done: true }
  - { label: "T12 — mini-defense: demo + vấn đáp + 1 bug thật + 1 trade-off", done: true }
reproducibility: "RTL đầy đủ nằm ở Layer C của Week09/10/11; toàn bộ 22 khối RTL/testbench của V3 đã được trích và biên dịch lại bằng `iverilog -g2012`, mô phỏng toàn hệ với testbench kiểm định giải mã ngược UART — kết quả trong Validation Report của Learning Hub (0 lỗi, 0 vi phạm invariant)."
limitations:
  - "Phạm vi Phase 1: chưa có timing constraints/STA, CDC, BRAM/PLL — được nêu rõ ở Tuần 8/12 là nội dung Phase 2."
  - "display_mux (quét 2 digit) là mở rộng tự chọn, không thuộc traffic_system_top chuẩn."
futureWork:
  - "Đo tài nguyên thật (LUT/FF) trên toolchain FPGA và so với dự đoán — bài bắc cầu Phase 2."
  - "Các EQ→RQ gắn với hệ: độ rộng timer ↔ area/power; tần số quét ↔ công suất; kiến trúc UART ↔ công suất thấp."
references:
  - label: "PROJECT_GUIDE — đặc tả kỹ thuật gốc (spec, kiến trúc, interface, verification plan)"
    note: "Mở trong giáo trình: legacy/versions/v3/PROJECT_GUIDE.html"
relatedResearch: [eq-to-rq-framework]
---

## Bài toán

Điều khiển đèn ngã tư hai hướng NS/EW theo chu trình GREEN_NS → YELLOW_NS → GREEN_EW →
YELLOW_EW; hiển thị số giây còn lại của pha trên LED 7 đoạn; mỗi giây gửi một dòng trạng thái
(`GN 09\n`) về PC qua UART. Toàn hệ chạy **một clock duy nhất** — mọi nhịp chậm (1 Hz, baud)
đều là clock-enable, cấm derived clock.

## Yêu cầu an toàn (safety invariant)

> Tại mọi thời điểm sau reset, **ít nhất một trong hai hướng đang ĐỎ** — không bao giờ hai
> hướng cùng rời đèn đỏ.

Invariant này được kiểm **tự động trong testbench ở mọi cạnh clock** — đây là bài học
verification quan trọng nhất của project: thuộc tính an toàn không phải thứ "nhìn waveform
thấy có vẻ đúng", mà là thứ máy kiểm hộ bạn hàng nghìn chu kỳ.

## Kiến trúc

```
traffic_system_top            ← top CHỈ nối dây
├── u_tick : tick_gen         ← T9  · tuần tự (chia 1 Hz, clock-enable)
├── u_ctrl : traffic_ctrl     ← T9  · FSM 4 pha + timer (controller + datapath)
├── u_seg  : seg7_decoder     ← T10 · TỔ HỢP thuần (không clk)
├── u_stat : status_tx        ← T11 · tuần tự (đóng khung 6 byte)
└── u_tx   : uart_tx          ← T11 · tuần tự (FSM + shift register + baud tick)
```

Interface giữa các module là **hợp đồng cố định từ Tuần 9** — tuần sau xây tiếp lên module
tuần trước mà không sửa lại. Đường phản hồi `tx_busy` từ `uart_tx` về `status_tx` là chi tiết
kiến trúc then chốt: thiếu nó là mất 5 trong 6 byte của khung trạng thái.

## Vì sao project này là cầu nối học → nghiên cứu

Mỗi tuần của project gắn một câu hỏi kỹ thuật có thể "nâng cấp" thành câu hỏi nghiên cứu
đo được (khung EQ→RQ): chọn độ rộng timer (T9), tần số quét hiển thị (T10), kiến trúc UART
(T11). Xem ghi chú [EQ→RQ — từ câu hỏi kỹ thuật đến câu hỏi nghiên cứu](../../research/eq-to-rq-framework/).

## Dùng project này thế nào

- **Học viên:** làm theo Tuần 9–11 của [giáo trình V3](../../legacy/versions/v3/index.html) — RTL
  hoàn chỉnh và cách xây từng phần nằm ở Layer C mỗi tuần.
- **Mentor:** milestone nghiệm thu từng tuần + rubric nằm trong
  [PROJECT_GUIDE](../../legacy/versions/v3/PROJECT_GUIDE.html) và Layer D các tuần 9–11.
