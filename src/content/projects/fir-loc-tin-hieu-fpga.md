---
title: "FIR filter fixed-point — thí nghiệm bit-width đầu tiên (project nhóm-nghiên cứu 4 tuần)"
summary: "Hiện thực bộ lọc FIR fixed-point bằng SystemVerilog và chạy một thí nghiệm EQ→RQ đúng nghĩa: độ rộng bit của hệ số ảnh hưởng thế nào tới chất lượng lọc và tài nguyên suy ra — có baseline, có số liệu, có phạm vi kết luận."
date: 2026-08-13
draft: false
kind: research
status: proposed
difficulty: intermediate
platform: "Mô phỏng (golden model so sánh bằng Python/Octave)"
tools: ["SystemVerilog", "Icarus Verilog (iverilog -g2012)", "Python (golden model + vẽ đáp ứng)"]
mentor: "Giảng Viên Đinh Văn Nam"
track: hardware-ai
tags: [fir, fixed-point, dsp, eq-rq, phase-2, teamwork]
prerequisites:
  - "Hoàn thành Phase 1; có nền toán tín hiệu cơ bản (track D/C của Tuần 12)"
milestones:
  - { label: "Tuần 1 — Golden model Python + chọn đặc tả bộ lọc + kế hoạch thí nghiệm (baseline, biến, thước đo)", done: false }
  - { label: "Tuần 2 — fir.sv fixed-point pass so khớp golden model (sai số lượng tử hóa được giải thích)", done: false }
  - { label: "Tuần 3 — quét bit-width hệ số (ví dụ 8/12/16 bit): đo sai số + đếm phần cứng suy ra", done: false }
  - { label: "Tuần 4 — báo cáo 7 dòng observation→conclusion + bảo vệ", done: false }
deliverables:
  - "fir.sv (MAC tuần tự hoặc song song — nhóm tự chọn và BẢO VỆ lựa chọn)"
  - "Golden model + script so khớp tự động RTL ↔ model"
  - "Bảng thí nghiệm: bit-width ↔ sai số ↔ ước lượng tài nguyên, kèm điều kiện đo"
  - "Báo cáo nghiên cứu mini theo khung EQ→RQ"
limitations:
  - "Tài nguyên 'đo' ở mức suy ra từ RTL/mô phỏng (đếm FF, phép nhân); đọc report synthesis thật là bài bắc cầu — chấm thiết kế thí nghiệm, không chấm con số tuyệt đối"
futureWork:
  - "Chạy synthesis thật trên toolchain FPGA và so dự đoán ↔ report (mở track B)"
  - "Nối sang track E: cùng câu hỏi bit-width chính là quantization trong AI accelerator"
references:
  - label: "Ghi chú EQ→RQ của hub — khung 7 bước và tiêu chí baseline công bằng"
    note: "research/eq-to-rq-framework/ trên hub"
relatedResearch: [eq-to-rq-framework]
---

## Bài toán

Một bộ lọc FIR thông thấp N-tap, hệ số lượng tử hóa fixed-point. Câu hỏi nghiên cứu trung
tâm (đúng khung EQ→RQ): **"Giảm độ rộng bit hệ số từ 16 xuống 8 bit làm chất lượng lọc xấu
đi bao nhiêu và tiết kiệm bao nhiêu phần cứng — trong điều kiện nào kết luận này đúng?"**

## Vì sao đề này là cầu nối nghiên cứu thật

Đây là lần đầu nhóm làm đủ một chu trình: golden model làm **baseline công bằng**, biến số
được cô lập (chỉ đổi bit-width), thước đo định nghĩa trước (sai số so model, số FF/phép nhân
suy ra), và kết luận buộc phải kèm **phạm vi** ("với bộ lọc này, kiến trúc này, kích thích
này"). Ba người ba mảng: model & thước đo · RTL · thí nghiệm & báo cáo — xoay vòng mỗi tuần.
