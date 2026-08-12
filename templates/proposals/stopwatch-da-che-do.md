---
# ĐỀ BÀI MẪU — duyệt xong chuyển vào src/content/projects/ và đổi draft: false khi giao đề
title: "Stopwatch đa chế độ — FSM chế độ trên datapath quen thuộc (project nhóm 3–4 tuần)"
summary: "Đồng hồ bấm giờ chạy trên nền các khối đã học: đếm phút:giây hiển thị 7-segment, ba chế độ (chạy/tạm dừng/lap), nút bấm có chống dội — bài tập tích hợp đầu tay cho nhóm mới ghép."
date: 2026-08-13
draft: true
kind: student
status: proposed
difficulty: foundation
platform: "Mô phỏng bắt buộc; FPGA board là mở rộng"
tools: ["SystemVerilog", "Icarus Verilog (iverilog -g2012)"]
mentor: "Giảng Viên Đinh Văn Nam"
track: fpga
tags: [fsm, seg7, debounce, phase-2, teamwork]
prerequisites:
  - "Hoàn thành Phase 1 tối thiểu đến T10 (counter, FSM, seg7)"
milestones:
  - { label: "Tuần 1 — Spec + state diagram chế độ + interface giữa 3 module", done: false }
  - { label: "Tuần 2 — timer phút:giây + seg7 multiplex 4 digit pass testbench", done: false }
  - { label: "Tuần 3 — FSM chế độ + debounce nút bấm; tích hợp; demo + bảo vệ", done: false }
deliverables:
  - "debounce.sv · mode_fsm.sv · time_counter.sv · display_mux4.sv · stopwatch_top.sv"
  - "Testbench self-check từng module + kịch bản bấm nút toàn hệ"
  - "Log tuần + waveform chú thích thời điểm chuyển chế độ"
limitations:
  - "Không yêu cầu lưu nhiều lap; độ chính xác theo tick mô phỏng (board thật là mở rộng)"
futureWork:
  - "EQ→RQ gợi ý: chu kỳ quét 4 digit ↔ công suất & chất lượng hiển thị (nối tiếp EQ→RQ của T10)"
references:
  - label: "Giáo trình V3 Tuần 10 — seg7, multiplexing; Tuần 6 — FSM"
    note: "legacy/versions/v3/Week10.html · legacy/versions/v3/Week06.html"
relatedProjects: [smart-traffic-controller-fpga]
---

## Bài toán

Stopwatch phút:giây (00:00 → 59:59) hiển thị 4 digit 7-segment quét, ba nút: start/stop,
lap (đóng băng hiển thị nhưng thời gian vẫn chạy ngầm), reset.

## Vì sao đề này hợp với nhóm mới ghép

Mọi khối đều đã gặp trong Phase 1 — thử thách nằm ở **ghép và phân công**, không ở kiến thức
mới: nút bấm là tín hiệu bẩn (cần debounce), "lap" buộc tách *giá trị đếm* khỏi *giá trị hiển
thị* (một quyết định kiến trúc nhỏ nhưng thật), và FSM chế độ đứng trên datapath đúng mô hình
controller–datapath của T6. Nhóm nào chốt interface sớm sẽ đi nhanh — nhóm nào code trước vẽ
sau sẽ tự thấy vì sao ba kỷ luật tồn tại.
