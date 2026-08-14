---
title: "Ngân hàng câu hỏi thảo luận theo tuần (Phase 1)"
summary: "36 câu hỏi thảo luận cho 12 tuần — mỗi tuần 3 câu: một câu đào bản chất, một câu bắt hiểu sai kinh điển, một câu mở sang trade-off/nghiên cứu. Dùng cho thread Discussions hằng tuần hoặc 10 phút đầu buổi mentoring."
date: 2026-08-13
draft: false
category: mentoring
track: foundations
tags: [thao-luan, mentoring, phase-1]
---

Quy ước trả lời (nói với sinh viên ngay từ Tuần 1): trả lời bằng **lý do**, không bằng thuật
ngữ; "mình không chắc, nhưng mình suy luận là…" luôn được hoan nghênh; phản biện ý tưởng,
không phản biện người.

## Tuần 1 — Why Semiconductor?

1. Chọn một thiết bị bạn dùng hằng ngày và thử chỉ ra 6 tầng trừu tượng (transistor → SoC)
   nằm ở đâu trong nó. Tầng nào bạn "nhìn thấy" được, tầng nào chỉ suy ra?
2. Vì sao ta có thể thiết kế hệ thống hàng tỷ transistor mà không ai hiểu từng transistor một?
   Điều gì sẽ xảy ra nếu không có trừu tượng hóa số (digital abstraction)?
3. (Mở) Bạn quan sát thấy điện thoại nóng lên khi chơi game — hãy đặt 3 câu hỏi "vì sao"
   liên tiếp từ quan sát đó. Câu nào trong số đó có thể đo được?

## Tuần 2 — From Idea to Chip

1. Trong 8 chặng của design flow, chặng nào tạo ra artifact mà chặng sau KHÔNG thể thiếu?
   Thử bỏ một chặng và lập luận điều gì đổ vỡ.
2. "Làm được" và "kiểm chứng được" khác nhau thế nào? Cho một ví dụ đời thường ngoài IC.
3. Cùng một RTL, flow FPGA và flow ASIC tách nhau từ chặng nào? Vì sao trước đó chúng giống nhau?

## Tuần 3 — Logic Gates & Boolean Thinking

1. Đưa một tình huống đời thực (báo động, bình chọn, khóa cửa…) và dẫn cả nhóm đi đúng quy
   trình: tình huống → truth table → biểu thức → mạch. Chỗ nào dễ sai nhất?
2. Hai bạn vẽ hai mạch khác hẳn nhau nhưng cùng truth table — ai đúng? "Tương đương" nghĩa
   là gì, và tại sao khái niệm này quan trọng với công cụ synthesis?
3. NAND được gọi là "cổng vạn năng" — điều đó có nghĩa gì và vì sao nó hữu ích khi chế tạo?

## Tuần 4 — Combinational Building Blocks

1. Vì sao kỹ sư nghĩ theo khối (MUX, decoder, adder…) thay vì từng cổng? Điều gì tương tự
   trong lập trình phần mềm?
2. Hiểu sai kinh điển: "RTL chạy từ trên xuống dưới như C." Hãy phản bác bằng một ví dụ
   always_comb cụ thể — và giải thích vì sao thiếu default lại sinh latch.
3. (EQ→RQ mầm) Hai cách viết cùng một hành vi có thể tốn phần cứng khác nhau — bạn sẽ ĐO
   điều đó bằng gì ở mức hiểu biết hiện tại của mình?

## Tuần 5 — Sequential Logic & Memory

1. Latch và flip-flop khác nhau ở điểm nào *về thời điểm được phép thay đổi*? Vì sao khóa
   này chọn kể chuyện bằng FF cạnh lên?
2. D đổi giá trị giữa hai cạnh clock — Q ra sao? Trả lời rồi tự kiểm bằng mô phỏng
   (predict-before-simulate) và dán waveform vào thread.
3. (EQ→RQ) Counter của bạn cần đếm tới 9 — vì sao 4 bit? Nếu đề đổi thành đếm tới 99 thì
   độ rộng bit kéo theo những chi phí gì?

## Tuần 6 — Finite-State Machines

1. Nhìn quanh bạn: chọn một "hệ ra quyết định theo trạng thái" ngoài đời (máy giặt, thang
   máy, đèn giao thông…) và vẽ state diagram 4–6 state cho nó. Cái gì là state, cái gì KHÔNG
   phải state?
2. Hiểu sai kinh điển: "nhét thời gian vào state" (mỗi giây một state). Vì sao cách này nổ
   số state? Kiến trúc đúng tách controller và datapath thế nào?
3. (EQ→RQ chính thức đầu tiên) Binary / one-hot / Gray — câu hỏi "mã hóa nào tốt hơn?" cần
   thêm những điều kiện gì để trở thành câu hỏi đo được?

## Tuần 7 — Writing Clean RTL in SystemVerilog

1. Đọc một đoạn RTL của bạn cùng nhóm và nói ra **phần cứng suy ra** (hardware inference).
   Ai nói được phần cứng trước khi nói cú pháp, người đó hiểu.
2. Blocking (`=`) vs non-blocking (`<=`): quy tắc thực dụng của khóa là gì, và điều gì sai nếu
   trộn chúng trong một always_ff? Minh họa bằng ví dụ 2 thanh ghi hoán đổi giá trị.
3. (EQ→RQ) "Thanh ghi nào cần reset?" — vì sao đây là quyết định kiến trúc có chi phí chứ
   không phải quy tắc phổ quát? (Gợi ý đọc thêm: bài viết về reset trên hub.)

## Tuần 8 — FPGA vs ASIC

1. Hiểu sai kinh điển: "FPGA thì NRE = 0." Sửa lại phát biểu cho đúng — FPGA tránh được
   khoản NRE *nào*, và khoản nào vẫn còn nguyên?
2. Đề bài: sản phẩm đo nhịp tim đeo tay, dự kiến 5.000 chiếc/năm — nhóm bạn chọn FPGA hay
   ASIC? Bảo vệ bằng khung PPA + NRE + time-to-market (số liệu được phép là ước lượng minh họa).
3. Cùng RTL counter của Tuần 5: trên FPGA nó thành LUT/FF thế nào, còn trên ASIC thành gì?
   Vì sao "cùng chức năng, khác hiện thực"?

## Tuần 9 — Project A: FSM Traffic Controller

1. Safety invariant "ít nhất một hướng luôn ĐỎ" — vì sao phải kiểm **ở mọi cạnh clock trong
   testbench** thay vì nhìn waveform bằng mắt? Kể một tình huống mắt người bỏ sót.
2. Hiểu sai kinh điển: "muốn nhịp 1 Hz thì chia clock ra làm clock mới." Vì sao khóa này cấm
   derived clock và bắt dùng clock-enable? Hệ quả của làm sai là gì?
3. (EQ→RQ của tuần) Timer rộng bao nhiêu bit là "đủ"? Đo chữ "đủ" đó bằng những đại lượng nào?

## Tuần 10 — Project B: 7-Segment Display

1. "Interface là hợp đồng": tuần này bạn có muốn sửa cổng của `traffic_ctrl` không? Trước
   khi sửa, trả lời câu hỏi bắt buộc của khóa: *có cách nào KHÔNG sửa mà vẫn đạt yêu cầu?*
2. Vì sao quét (multiplex) nhiều digit lại tiết kiệm chân FPGA? Trade-off của tần số quét
   quá thấp / quá cao là gì (mắt người + công suất)?
3. `seg7_decoder` là tổ hợp thuần — vì sao nó KHÔNG cần clk, và điều gì xảy ra nếu bạn
   "tiện tay" thêm clk vào?

## Tuần 11 — Project C: UART Status

1. Đường phản hồi `tx_busy` — chuyện gì xảy ra nếu thiếu nó? (Gợi ý từ giáo trình: mất 5
   trong 6 byte.) Từ đó rút ra nguyên tắc gì khi hai module tốc độ khác nhau nói chuyện?
2. Hiểu sai kinh điển: "synchronizer 2 FF *chống* metastability." Sửa phát biểu cho đúng —
   nó làm được gì, không làm được gì, và giới hạn 1-bit nghĩa là sao?
3. (EQ→RQ) Sai số baud bao nhiêu phần trăm thì hỏng khung 8N1? Câu trả lời phụ thuộc những
   yếu tố nào — và bạn mô hình hóa nó được không?

## Tuần 12 — Capstone & Research Bridge

1. "Demo chạy = em hiểu" — vì sao khóa này chấm vấn đáp chứ không chỉ chấm demo? Kể một bug
   thật của nhóm bạn mà waveform đã chỉ ra.
2. Nhìn lại 12 tuần: quyết định thiết kế nào bạn sẽ làm KHÁC nếu làm lại, và bằng chứng nào
   khiến bạn đổi ý?
3. Research question 7 dòng của bạn: cả nhóm phản biện hai tiêu chí — có ĐO được không, và
   baseline có CÔNG BẰNG không? (Chưa cần mới lạ — đó là chuyện của Phase 2.)
