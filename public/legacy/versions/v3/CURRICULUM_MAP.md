# CURRICULUM_MAP — IC Design Mentoring · Version 3 (Phase 1, 12 tuần)

Tài liệu này là bản đồ chương trình chính thức của Version 3. Mọi tuần đều tuân theo kiến trúc 4 lớp:
**Layer A** — Trước buổi học (15–25 phút; riêng Tuần 12 là 60–90 phút vì phải chuẩn bị hồ sơ bảo vệ) · **Layer B** — Buổi mentoring 60 phút · **Layer C** — Technical Lab / Deep Dive (tự học sâu, không bắt buộc đọc trước) · **Layer D** — Sau buổi học (quiz 5 câu, bài tập, rubric, phản tư, cầu nối tuần sau).

**Chuẩn đầu ra Phase 1** (nguyên văn, dùng thống nhất ở `index.html`, `README.md` và Week 12):
"Sau 12 tuần, học viên có thể đọc một đặc tả đơn giản, phân rã hệ thống số thành các khối chức năng, viết RTL cơ bản bằng SystemVerilog, viết testbench đơn giản, đọc waveform mô phỏng, hiểu synthesis ở mức nền tảng, và tích hợp một thiết kế đồng bộ nhỏ phù hợp để prototype trên FPGA." Chương trình **không** tuyên bố học viên trở thành kỹ sư IC hoàn chỉnh sau 12 tuần.

---

## Bảng bản đồ 12 tuần

| Tuần | Câu hỏi cốt lõi | Khái niệm chính | Kỹ năng kỹ thuật | Artifact bắt buộc | Đóng góp vào project | Kết nối tư duy nghiên cứu | Điều kiện tiên quyết | Tuần sau cần gì từ tuần này |
|---|---|---|---|---|---|---|---|---|
| **1. Why Semiconductor? Why IC Design?** | Vì sao trừu tượng hóa số (digital abstraction) là nền của mọi con chip? | Semiconductor, transistor-as-switch, gate, khối chức năng, IC, SoC; chuỗi trừu tượng 6 tầng: transistor → logic gate → functional block → digital system → IC → SoC | Nhìn một thiết bị và chỉ ra các tầng trừu tượng; đọc sơ đồ khối SoC | 1 trang "bản đồ trừu tượng" của một thiết bị tự chọn (điện thoại/xe/router) | Định vị project W9–11 nằm ở tầng "block→system" | Quan sát → câu hỏi ("vì sao chip nóng? vì sao 3nm khó?") — chưa formal | Không | W2 dùng chuỗi trừu tượng để đặt design flow lên trên |
| **2. From Idea to Chip** | Một ý tưởng đi qua những chặng nào để thành chip, và mỗi chặng sinh ra artifact gì? | Requirement & Spec → Architecture → RTL → Verification → Synthesis → Implementation → Fab/FPGA config → Test (8 chặng); phân biệt flow FPGA vs ASIC | Gọi tên đúng artifact từng chặng (spec, block diagram, RTL, testbench, netlist, bitstream/GDSII) | Bảng "chặng → artifact → ai làm" cho một sản phẩm giả định | Chính là flow học viên sẽ đi W9–11 (đến chặng FPGA) | Phân biệt "làm được" vs "kiểm chứng được" — mầm verification | W1 (tầng trừu tượng) | W3+ luôn định vị "ta đang ở chặng nào của flow" |
| **3. Logic Gates & Boolean Thinking** | Làm sao biến một tình huống đời thực thành mạch logic? | Mức logic, AND/OR/NOT/NAND/NOR/XOR/XNOR, truth table, biểu thức Boole, biến đổi đơn giản | Quy trình: tình huống → truth table → biểu thức → mạch; đọc/viết truth table thành thạo | Truth table + biểu thức + sơ đồ mạch cho 1 bài toán tự chọn (báo động, bình chọn…) | Cổng logic là "nguyên tử" của next-state/output logic trong FSM W9 | "Hai mạch khác nhau, cùng truth table" → khái niệm tương đương & tối ưu | W2 (RTL nằm ở đâu trong flow) | W4 ghép cổng thành khối |
| **4. Combinational Building Blocks** | Vì sao kỹ sư nghĩ theo khối chức năng thay vì từng cổng? | MUX, decoder, encoder, comparator, half/full adder, tư duy ALU; propagation delay | Chọn đúng khối cho yêu cầu; ghép khối; đọc RTL tổ hợp (guided); always_comb + default chống latch | RTL tổ hợp đầu tiên (MUX/comparator) + truth table đối chiếu waveform | MUX/decoder/comparator xuất hiện trong timer, seg7, UART W9–11 | "Cùng hành vi, khác phần cứng" — chi phí LUT/cổng của các cách viết | W3 | W5 cần comparator/adder cho counter; delay tổ hợp → hiểu f_max |
| **5. Sequential Logic & Memory** | Làm sao mạch "nhớ"? Điều gì quyết định lúc nào được nhớ? | D-FF, register, counter, clock/cạnh clock, state; t_pd, t_su, t_h, t_cq; khởi tạo & reset (đúng bản chất theo công nghệ) | Vẽ waveform Q từ D+clk; thiết kế counter mod-N trên giấy; viết counter RTL always_ff; testbench cho mạch **tuần tự** (có clock/reset) + kỷ luật predict-before-simulate | Counter mod-10 RTL + testbench + waveform chú thích 2 lần wrap | Timer/counter là datapath của toàn bộ project W9–11 | Bit width ↔ area/power/timing — EQ→RQ mở màn (không bắt buộc) | W4 (khối tổ hợp, delay) | W6 cần state + FF; W9 cần counter làm timer |
| **6. Finite-State Machines** | Làm sao mô tả và hiện thực "hệ thống ra quyết định theo trạng thái"? | State, transition, state diagram, Moore vs Mealy, next-state/output/state-register (3 khối), controller–datapath | Vẽ state diagram TRƯỚC khi code; lập transition table; đọc & viết FSM 3 khối; sequence detector "101" | State diagram + transition table + FSM RTL + waveform 2 chuỗi test | Traffic controller W9 = FSM này + timer W5 | **EQ→RQ chính thức bắt đầu:** mã hóa state (binary/one-hot/Gray) ↔ PPA & độ tin cậy | W5 (FF, state vật lý) | W7 chuẩn hóa cách viết; W9 dùng nguyên khuôn FSM 3 khối |
| **7. Writing Clean RTL in SystemVerilog** *(đổi tên từ "What Is Verilog?")* | Viết RTL thế nào để mô tả ĐÚNG phần cứng mình muốn? | module/port/hierarchy, logic, assign, always_comb, always_ff, blocking vs non-blocking, latch, chiến lược reset/khởi tạo, synthesizable subset, song song phần cứng, style | Đọc RTL → nói ra phần cứng suy ra (hardware inference); tự viết module + hierarchy sạch; debug RTL lỗi cài sẵn | "Style card" cá nhân + sửa 3 đoạn RTL lỗi (latch, blocking, reset) kèm giải thích | Chuẩn code cho MỌI module W9–11 | Research literacy bắt đầu: giải phẫu một paper (title/abstract/contribution/method/result); EQ→RQ: chiến lược reset ↔ area/routing/power | W4–W6 (đã "gặp" RTL guided) | W8 hiểu synthesis; W9–11 áp style chuẩn |
| **8. FPGA vs ASIC** | Cùng một RTL, hai con đường hiện thực khác nhau thế nào và chọn ra sao? | Kiến trúc FPGA (LUT/FF/BRAM/DSP/routing/clocking), standard cell, NRE vs unit cost (nhấn mạnh: FPGA tránh NRE mask/fab chứ không phải chi phí = 0), PPA, time-to-market; sim vs synthesis vs implementation vs configuration vs hardware test | Đánh giá trade-off theo kịch bản; đọc bảng break-even (ví dụ minh họa); đoán RTL→tài nguyên FPGA | Phân tích chọn FPGA/ASIC cho 2 kịch bản + giải thích bằng số liệu minh họa | Project W9–11 là FPGA-oriented: hiểu vì sao prototype trên FPGA | Bài đọc research đầu tiên: abstract + system diagram của 1 paper FPGA (4 câu hỏi định hướng) | W7 (RTL → synthesis) | W9–11 nói "hardware inferred" theo LUT/FF chuẩn xác |
| **9. Project A — FSM Traffic Controller** | Biến một yêu cầu an toàn giao thông thành controller + datapath chạy được? | Spec → state diagram → RTL; tick 1 Hz (clock enable, không phải clock mới); safety invariant "ít nhất một hướng luôn ĐỎ — không bao giờ hai hướng cùng rời đèn đỏ" | Viết spec ngắn; thiết kế FSM 4 pha + timer; testbench có invariant check; đọc waveform nhiều tín hiệu | `tick_gen.sv`, `traffic_ctrl.sv`, `tb_traffic.sv` + waveform chú thích 1 chu kỳ đèn | **Nền của hệ thống tích hợp** — mọi tuần sau xây tiếp lên module này | EQ→RQ: chọn độ rộng timer ↔ area/power/độ chính xác; nghĩ về property/invariant như mầm formal | W5 (counter), W6 (FSM), W7 (style) | W10 dùng nguyên trạng `traffic_ctrl` + cổng `time_left`, `phase` |
| **10. Project B — Counter & 7-Segment Display** | Làm sao cho con người NHÌN THẤY trạng thái hệ thống? | Countdown hiển thị, giải mã BCD→7 đoạn, quét (multiplex) nhiều digit, phân tần hiển thị | Thiết kế datapath hiển thị; ghép module qua interface có sẵn; mô phỏng hệ 2 module trở lên | `seg7_decoder.sv` + hệ W9+W10 mô phỏng chung, waveform giải thích (`display_mux.sv` là mở rộng tự chọn) | Hệ thống lớn dần: FSM → timer → display (không làm lại từ đầu) | EQ→RQ: tần số quét ↔ công suất & chất lượng hiển thị; mã hóa BCD vs binary | W9 (interface `traffic_ctrl`) | W11 thêm kênh giao tiếp; giữ nguyên các module đã có |
| **11. Project C — UART Status Communication** | Làm sao hệ thống BÁO CÁO trạng thái ra thế giới ngoài? | Truyền nối tiếp, frame 8N1, baud rate & sai số (guideline vài %, phụ thuộc frame/sampling/clock hai phía), FSM uart_tx, tín hiệu bất đồng bộ & synchronizer (giảm xác suất lan truyền metastability — không triệt tiêu) | Thiết kế uart_tx (FSM + shift register + baud tick); tích hợp 3 tuần thành một top; phân tích sai số baud | `uart_tx.sv`, `status_tx.sv`, `traffic_system_top.sv` + waveform 1 frame + ảnh terminal (nếu có board) | **Hoàn tất hệ tích hợp**: Clock/Reset → FSM ↔ Timer → Display → UART TX → PC | EQ→RQ: kiến trúc UART ↔ công suất thấp; sai số baud ↔ độ dài frame (mô hình hóa) | W9, W10 (hệ đang chạy), W6 (FSM) | W12 demo + bảo vệ chính hệ thống này |
| **12. Capstone Review & Research Bridge** | Bạn đã xây được gì, hiểu nó sâu tới đâu, và đi tiếp hướng nào? | Demo → Explain → Reflect → Diagnose gaps → Plan; danh mục chủ đề nâng cao còn ở phía trước (STA, CDC, BRAM, PLL, timing closure, DFT, formal…); 5 track Phase 2 | Mini-defense: trình bày kiến trúc, controller vs datapath, waveform, 1 bug thật, 1 trade-off; tự chẩn đoán lỗ hổng | Portfolio 12 mục + bài trình bày 10 slide + kế hoạch Phase 2 cá nhân | Tổng kết và bảo vệ hệ thống tích hợp W9–11 | Chu trình nghiên cứu đầy đủ: observation→limitation→question→hypothesis→experiment→evidence→conclusion; chọn track A–E | W9–11 (hệ hoàn chỉnh) | Phase 2 |

---

## Các vòng xoáy học tập (learning spirals)

**RTL:** W2 (RTL là mô tả hiện thực) → W4 (đọc/viết tổ hợp guided) → W5 (tuần tự) → W6 (FSM) → W7 (chuẩn hóa kỷ luật viết) → W9 (controller+datapath) → W11 (tích hợp nhiều module) → W12 (giải thích toàn hệ).
**Verification:** W2 (verification là một chặng) → W3 (quét đủ truth table) → W5 (testbench đầu tiên, predict-before-simulate) → W6 (test theo chuỗi kích thích) → W9 (invariant check trong testbench) → W10–11 (test hệ nhiều module, edge case) → W12 (waveform làm bằng chứng khi bảo vệ).
**Timing:** W4 (propagation delay) → W5 (t_su/t_h/t_cq, f_max trực giác) → W9 (tick enable vs derived clock) → W11 (sai số baud tích lũy) → W12 (nêu giới hạn: STA/timing closure thuộc Phase 2).
**Trừu tượng & kiến trúc:** W1 (chuỗi trừu tượng) → W2 (flow) → W4 (block thinking) → W6 (controller–datapath) → W9–11 (kiến trúc hệ thật) → W12 (trình bày kiến trúc).
**FPGA/ASIC mapping:** W2 (hai flow) → W4–7 ("hardware inferred" mỗi lần viết RTL) → W8 (LUT/FF/BRAM/DSP chi tiết) → W9–11 (dự đoán tài nguyên) → W12 (câu hỏi "sang ASIC thì khác gì?").
**Tư duy nghiên cứu:** W1–5 (quan sát, đặt câu hỏi — không formal) → W6 (EQ→RQ đầu tiên) → W7 (giải phẫu paper) → W8 (đọc abstract + diagram có định hướng) → W9–11 (EQ→RQ gắn với chính project) → W12 (chu trình nghiên cứu + chọn track).

---

## Kiến trúc project tích hợp W9–11 — SMART TRAFFIC CONTROLLER FPGA SYSTEM

Một hệ thống duy nhất, lớn dần qua 3 tuần. Interface cố định ngay từ W9 (chi tiết trong `PROJECT_GUIDE.md`):

Hình vẽ đúng netlist: `assets/fig-system-top.svg`. Bản đặc tả gốc của mọi tín hiệu: `PROJECT_GUIDE.md` §2.4 — **khi hình và bảng khác nhau, lấy bảng làm gốc.** Dưới đây là danh sách kết nối, mỗi dòng đúng một dây (dạng netlist đọc được, không dùng hình ASCII vì hình ASCII dễ nuốt mất nhánh rẽ):

| Dây | Nguồn | Các đích |
|---|---|---|
| `clk`, `rst_n` | cổng vào của `traffic_system_top` | **cả 4 khối tuần tự**: `tick_gen`, `traffic_ctrl`, `status_tx`, `uart_tx` — riêng `seg7_decoder` là tổ hợp thuần nên KHÔNG nhận clk |
| `tick` (1 Hz, enable rộng 1 chu kỳ) | `tick_gen` | `traffic_ctrl` **và** `status_tx` — hai đích, không phải một |
| `ns_light[2:0]`, `ew_light[2:0]` | `traffic_ctrl` | cổng ra → LED đèn |
| `phase[1:0]` | `traffic_ctrl` | `status_tx` |
| `time_left[3:0]` | `traffic_ctrl` | `seg7_decoder` **và** `status_tx` |
| `seg[6:0]` | `seg7_decoder` | cổng ra → LED 7 đoạn |
| `tx_start`, `tx_data[7:0]` | `status_tx` | `uart_tx` |
| `tx_busy` | `uart_tx` | `status_tx` — **đường phản hồi**, thiếu nó là mất 5 trong 6 byte |
| `tx` | `uart_tx` | cổng ra → cầu USB-UART → PC terminal |

Vai trò theo tuần: **W9** dựng `tick_gen` + `traffic_ctrl` (FSM 4 pha + timer đếm lùi). **W10** thêm `seg7_decoder` — module bắt buộc duy nhất của tuần; `display_mux` và cổng `an[1:0]` là mở rộng tự chọn, KHÔNG thuộc `traffic_system_top`. **W11** thêm `status_tx` + `uart_tx`; mỗi `tick` gửi `"GN 09\n"` — 6 byte ASCII (bản dài `"S=GN T=09\n"` là mở rộng tự chọn).

Quy ước tín hiệu thống nhất toàn khóa: `clk`, `rst_n` (bất đồng bộ, tích cực mức thấp), `enable`, `tick` (xung enable đúng 1 chu kỳ), `state`, `next_state`, `count`. Mọi flip-flop đánh nhịp bằng đúng một `clk`; mọi "nhịp chậm" đều là clock-enable, không bao giờ là derived clock.

---

## Ghi chú phạm vi

Khóa này KHÔNG dạy (và nói rõ với học viên ở W8/W12 rằng đây là phần phía trước): timing constraints & STA, CDC, reset-domain chi tiết, BRAM/PLL/MMCM, đọc synthesis report & utilization, timing closure, physical implementation, formal verification, DFT, on-chip debug. Phase 1 cung cấp nền tảng, không phải sự thành thạo.

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**  
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
