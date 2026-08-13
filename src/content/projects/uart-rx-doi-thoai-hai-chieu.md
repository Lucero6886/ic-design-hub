---
title: "UART RX — cho hệ đèn giao thông biết lắng nghe (project nhóm 4 tuần)"
summary: "Nâng cấp hệ Smart Traffic Controller từ chỉ-nói (TX) thành đối thoại hai chiều: nhận lệnh từ PC qua UART RX để đổi thời lượng đèn ngay khi hệ đang chạy — không reset, không nạp lại bitstream."
date: 2026-08-13
draft: false
kind: student
status: proposed
difficulty: intermediate
platform: "Mô phỏng bắt buộc; FPGA board là mở rộng"
tools: ["SystemVerilog", "Icarus Verilog (iverilog -g2012)"]
mentor: "Giảng Viên Đinh Văn Nam"
track: fpga
tags: [uart, rx, phase-2, teamwork]
prerequisites:
  - "Hoàn thành Phase 1 (đặc biệt T11 — uart_tx và T6 — FSM)"
milestones:
  - { label: "Tuần 1 — Spec + interface chốt (hợp đồng): khung lệnh, bảng tín hiệu, kế hoạch verify", done: false }
  - { label: "Tuần 2 — uart_rx.sv pass testbench đơn lẻ (oversampling, phát hiện start/stop)", done: false }
  - { label: "Tuần 3 — cmd_parser.sv + tích hợp vào traffic_system_top; hệ đổi GREEN_TICKS khi nhận lệnh", done: false }
  - { label: "Tuần 4 — test loopback TX↔RX toàn hệ + mini-defense", done: false }
deliverables:
  - "uart_rx.sv (FSM + oversampling + synchronizer 2FF cho tín hiệu rx bất đồng bộ)"
  - "cmd_parser.sv (giải khung lệnh, ví dụ 'SET G 08\\n')"
  - "Testbench có self-check cho từng module + test loopback toàn hệ"
  - "Log tuần của nhóm + waveform chú thích + bài trình bày bảo vệ"
limitations:
  - "Phạm vi lệnh tối giản (1–2 lệnh); không yêu cầu xử lý lỗi khung nâng cao (parity, framing-error recovery là mở rộng)"
futureWork:
  - "EQ→RQ gợi ý: hệ số oversampling (8x vs 16x) ↔ dung sai baud & tài nguyên — đo được bằng mô phỏng"
references:
  - label: "Giáo trình V3 Tuần 11 — uart_tx, sai số baud, synchronizer & metastability"
    note: "legacy/versions/v3/Week11.html — RX là bài toán đối ngẫu của TX, khó hơn ở chỗ phải LẤY MẪU đúng"
relatedProjects: [smart-traffic-controller-fpga]
---

## Bài toán

Hệ T9–11 mới chỉ **nói** (`GN 09\n` mỗi giây). Project này thêm tai: PC gửi lệnh
`SET G 08\n` qua terminal → hệ đổi thời lượng đèn xanh sang 8 giây **ngay khi đang chạy**.

## Vì sao đề này rèn teamwork thật

Ba module có ranh giới tự nhiên (rx / parser / integration) — nhóm 3 người chia được việc
NHƯNG không ai làm xong một mình: interface giữa ba phần phải chốt như hợp đồng từ tuần 1,
và test loopback cuối cùng chỉ pass khi cả ba phần đúng cùng lúc. Vai trò design/verification/
integration xoay vòng mỗi tuần.

## Điểm kỹ thuật trọng yếu (mentor nhấn khi duyệt spec)

- `rx` là tín hiệu **bất đồng bộ** đi vào miền clock của hệ — bắt buộc synchronizer 2FF
  (ôn T11: synchronizer *giảm xác suất* metastability lan truyền, không triệt tiêu).
- Lấy mẫu giữa bit bằng **oversampling + đếm**, tuyệt đối không derived clock (kỷ luật T9).
- Invariant an toàn của đèn (ít nhất một hướng ĐỎ) phải **tiếp tục được kiểm** khi tham số
  đổi lúc đang chạy — lệnh mới không được phép phá an toàn.
