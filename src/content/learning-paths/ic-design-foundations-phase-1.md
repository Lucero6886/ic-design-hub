---
title: "IC Design Foundations — Phase 1 (12 tuần, giáo trình V3)"
summary: "Lộ trình chính thức cho người bắt đầu: 12 tuần từ 'vì sao có chip' đến một hệ FPGA tích hợp chạy được (FSM + 7-segment + UART), theo giáo trình V3 đã audit kỹ thuật."
date: 2026-08-08
level: foundation
duration: "12 tuần"
audience: "Sinh viên bắt đầu học thiết kế vi mạch số; nhóm mentoring hằng tuần"
track: foundations
tags: [phase-1, rtl, fpga, systemverilog, fsm]
relatedProjects: [smart-traffic-controller-fpga]
relatedResearch: [eq-to-rq-framework]
steps:
  - label: "Tuần 1 — Why Semiconductor? Why IC Design?"
    url: "legacy/versions/v3/Week01.html"
    note: "Chuỗi trừu tượng transistor → SoC"
  - label: "Tuần 2 — From Idea to Chip"
    url: "legacy/versions/v3/Week02.html"
    note: "8 chặng design flow; FPGA vs ASIC flow"
  - label: "Tuần 3 — Logic Gates & Boolean Thinking"
    url: "legacy/versions/v3/Week03.html"
  - label: "Tuần 4 — Combinational Building Blocks"
    url: "legacy/versions/v3/Week04.html"
    note: "MUX/decoder/comparator/adder; RTL tổ hợp đầu tiên"
  - label: "Tuần 5 — Sequential Logic & Memory"
    url: "legacy/versions/v3/Week05.html"
    note: "D-FF, counter, testbench đầu tiên; predict-before-simulate"
  - label: "Tuần 6 — Finite-State Machines"
    url: "legacy/versions/v3/Week06.html"
    note: "FSM 3 khối; EQ→RQ chính thức bắt đầu"
  - label: "Tuần 7 — Writing Clean RTL in SystemVerilog"
    url: "legacy/versions/v3/Week07.html"
    note: "Hardware inference; blocking vs non-blocking; latch"
  - label: "Tuần 8 — FPGA vs ASIC"
    url: "legacy/versions/v3/Week08.html"
    note: "LUT/FF/BRAM/DSP; NRE & PPA; bài đọc paper đầu tiên"
  - label: "Tuần 9 — Project A: FSM Traffic Controller"
    url: "legacy/versions/v3/Week09.html"
    note: "Bắt đầu project tích hợp 3 tuần"
  - label: "Tuần 10 — Project B: Counter & 7-Segment Display"
    url: "legacy/versions/v3/Week10.html"
  - label: "Tuần 11 — Project C: UART Status Communication"
    url: "legacy/versions/v3/Week11.html"
    note: "Hoàn tất hệ tích hợp: FSM ↔ Timer → Display → UART TX → PC"
  - label: "Tuần 12 — Capstone Review & Research Bridge"
    url: "legacy/versions/v3/Week12.html"
    note: "Mini-defense; chọn track Phase 2; research question đầu tiên"
  - label: "Tài liệu điều phối: Curriculum Map (bản đồ 12 tuần)"
    url: "legacy/versions/v3/CURRICULUM_MAP.html"
  - label: "Project Guide — đặc tả project tích hợp T9–11"
    url: "legacy/versions/v3/PROJECT_GUIDE.html"
---

Lộ trình này là cách dùng **giáo trình V3 (bản hiện hành, khuyến nghị)** theo đúng thiết kế
của nó. Mỗi tuần theo mô hình 4 lớp:

- **Layer A — trước buổi học (15–25′):** đọc phần chuẩn bị, trả lời câu hỏi định hướng.
- **Layer B — buổi mentoring 60′:** học nhóm theo khung 6 bước; mỗi nhóm nộp một artifact cuối giờ.
- **Layer C — technical lab / deep dive:** tự học sâu, tra cứu khi cần — không bắt buộc đọc hết.
- **Layer D — sau buổi học:** quiz 5 câu, bài tập, phản tư; tiến độ tự lưu trên máy của bạn.

**Chuẩn đầu ra Phase 1** (nguyên văn từ giáo trình): sau 12 tuần, học viên có thể đọc một đặc tả
đơn giản, phân rã hệ thống số thành các khối chức năng, viết RTL cơ bản bằng SystemVerilog,
viết testbench đơn giản, đọc waveform mô phỏng, hiểu synthesis ở mức nền tảng, và tích hợp
một thiết kế đồng bộ nhỏ phù hợp để prototype trên FPGA. Chương trình cung cấp nền tảng —
**không** tuyên bố tạo ra kỹ sư IC hoàn chỉnh trong 12 tuần.

Ba kỷ luật xuyên suốt: **vẽ trước khi code · dự đoán trước khi mô phỏng · bằng chứng trước khi
kết luận.**
