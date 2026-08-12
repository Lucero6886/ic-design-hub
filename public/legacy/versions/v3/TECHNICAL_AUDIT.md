# TECHNICAL_AUDIT — Hiệu chỉnh kỹ thuật từ Version 2 sang Version 3

Tài liệu này ghi lại **các hiệu chỉnh kỹ thuật đã rà và sửa có chủ đích** so với Version 2 (danh sách không tuyên bố là đầy đủ — phát hiện mới xin bổ sung vào cuối tài liệu kèm ngày), theo khung: file/tuần → phát biểu gốc → vấn đề → cách hiểu đúng → thay đổi đã thực hiện. Đánh số theo mục 5.x của đặc tả Version 3. Các trích dẫn "v2" là nguyên văn (đã rút gọn) từ file HTML v2.

---

## 5.1 — Trạng thái flip-flop khi bật nguồn & vai trò reset

**Vị trí trong v2:** Week5 ("Khi bật nguồn, FF có giá trị ngẫu nhiên"; "khi bật nguồn, FF mang giá trị ngẫu nhiên (mô phỏng hiện X)… Sửa đúng: mọi thanh ghi trạng thái quan trọng phải có nhánh reset"), Week6 ("RESET LÀ BẮT BUỘC: sau bật nguồn FF có giá trị ngẫu nhiên"; "mỗi FF mang giá trị ngẫu nhiên → FSM khởi động ở state bất kỳ"), Week9 (mistake #4 tương tự).

**Vấn đề:** phát biểu tuyệt đối hóa. Hành vi khởi động **phụ thuộc công nghệ hiện thực**, không phải "luôn ngẫu nhiên"; và "mọi thanh ghi phải reset" không phải quy tắc phổ quát — đó là quyết định kiến trúc.

**Cách hiểu đúng (đã dùng trong v3):**
- FPGA: quá trình nạp cấu hình thường đưa FF về giá trị khởi tạo xác định (nhiều tool hỗ trợ khai báo giá trị init). **Nhưng init lúc nạp cấu hình chỉ có hiệu lực tại đúng thời điểm nạp cấu hình** (mỗi lần bật nguồn hoặc nạp lại bitstream đều nạp lại giá trị đó, nhưng khi mạch đang chạy thì không có cách nào áp lại) — muốn khởi động lại hệ khi đang chạy, khôi phục sau lỗi, hay chuyển thiết kế sang ASIC thì vẫn phải có tín hiệu reset chức năng. Vì vậy khóa này bắt buộc `rst_n` ở mọi khối tuần tự, kể cả trên FPGA.
- ASIC: trạng thái sau power-up không được đảm bảo — kiến trúc phải chủ động (mạch reset, power-on-reset, trình tự khởi động).
- Mô phỏng: FF chưa gán hiện `X` — mô hình của "chưa biết", không phải "chắc chắn ngẫu nhiên".
- Thanh ghi **trạng thái điều khiển** cần khởi tạo xác định; **không phải mọi thanh ghi datapath** đều cần reset (chi phí diện tích/routing/timing). Chiến lược reset là quyết định kiến trúc.

**Thay đổi:** Week05 §C6 (mục riêng, có callout hiệu chỉnh), Week05 quiz câu 4, Week06 §C5 (comment code + co-fix), Week07 §C5 (chiến lược reset), Week09 (cách nói "khởi tạo xác định"), Week07 EQ→RQ về chiến lược reset (EQ→RQ của Week09 là độ rộng timer).

---

## 5.2 — Mã hóa FSM sau synthesis

**Vị trí trong v2:** Week6 ("4 state → 2 bit → 2 FF"; "Khối 1 synthesis ra gì? 2 Flip-Flop (state 2 bit, mã hóa nhị phân)" — v2 có nhắc one-hot nhưng phần comment code vẫn khẳng định 2 FF), Week9 ("Mã hóa trạng thái: 4 state → 2 bit → 2 flip-flop", lặp nhiều lần), Week12 ("Khối 1 → 2 Flip-Flop lưu state").

**Vấn đề:** RTL viết `logic [1:0] state` là **biểu diễn**, không phải cam kết số FF vật lý.

**Cách hiểu đúng:** "RTL biểu diễn state bằng 2 bit. Công cụ synthesis có thể giữ nguyên hoặc mã hóa lại FSM (ví dụ one-hot trên FPGA) tùy tool và cài đặt tối ưu."

**Thay đổi:** Week06 §C5 (comment code + co-fix + ô meta), Week09 §C3 (co-fix + meta + quiz câu 5), Week12 §C2 (co-fix). Câu đúng này đồng thời trở thành đáp án một câu quiz ở W9.

---

## 5.3 — wire / reg / logic

**Vị trí trong v2:** Week7 — nội dung về `reg` của v2 nhìn chung đúng ("reg chỉ là luật cú pháp… SystemVerilog thay bằng logic"), nhưng cách nói gọn "logic thay cho wire và reg" dễ bị đọc thành "ba từ là một".

**Cách hiểu đúng:** `wire` là **net** (kết nối, không lưu); `reg` là **kiểu biến** Verilog lịch sử cho phép gán trong khối thủ tục — không đồng nghĩa thanh ghi vật lý; `logic` là kiểu biến SystemVerilog thay hầu hết chỗ dùng `reg` của người mới và dùng được nơi cần wire 1 driver — nhưng **không có nghĩa net và biến là một khái niệm**.

**Thay đổi:** Week07 §C2 (mục riêng + co-fix), quiz câu 2 tuần 7.

---

## 5.4 — Synthesis không phải "dịch 1-1 ra cổng"

**Vị trí trong v2:** Week7 ("được synthesis tool dịch thành netlist (danh sách cổng logic + dây nối) — tức là phần cứng thật" — thiếu ý "tương đương/tối ưu"), Week6 ("state diagram dịch 1-1 thành code Verilog"), Week3 (mô tả assign → đúng các cổng như viết).

**Cách hiểu đúng:** synthesis sinh **mạng cổng/LUT tương đương đã tối ưu** — có thể rút gọn biểu thức, factor logic, biến đổi Boole, map sang LUT (FPGA) hoặc standard cell (ASIC). **Tương đương chức năng** (cùng truth table cho mọi input hợp lệ, cùng quan hệ theo chu kỳ clock) được giữ trong phạm vi synthesizable subset — với hai lưu ý: công cụ được tự do gán giá trị don't-care, và mô phỏng RTL với mô phỏng netlist vẫn có thể lệch quanh giá trị X. **Timing thì KHÔNG được "giữ"**: nó là ràng buộc phải kiểm chứng lại bằng STA sau implementation và có thể không đạt — đó chính là lý do tồn tại của timing closure. Cấu trúc cụ thể thuộc quyền công cụ.

**Thay đổi:** Week02 §C4 (co-fix — nơi định nghĩa synthesis lần đầu), Week03 §C5 (ghi chú ở RTL peek), Week07 (mọi ô "Phần cứng suy ra" dùng cách nói "suy ra/tương đương").

---

## 5.5 — Kinh tế FPGA vs ASIC

**Vị trí trong v2:** Week12 ("FPGA cấu hình lại được bằng bitstream, **NRE ≈ 0**"), Week8 ("khi đã có khuôn, mỗi sản phẩm ép ra **chỉ tốn vài xu**" — ví von ASIC), Week8 bảng break-even có chữ "Giả định" nhưng chưa nhất quán nhãn "minh họa".

**Vấn đề:** "NRE = 0" sai (bỏ qua chi phí kỹ sư/IP/tool/board/verification); "vài xu" là khái quát hóa đơn giá không có điều kiện; số break-even không nhãn rõ dễ bị đọc như giá thị trường.

**Cách hiểu đúng:** "FPGA **tránh được NRE mask/fabrication của ASIC**, nhưng chi phí kỹ sư, IP, tool, board, verification, tích hợp vẫn tồn tại." Đơn giá ASIC phụ thuộc quy trình, die size, **đóng gói (package) và test**, sản lượng, yield — "vài xu" chỉ đúng với die rất nhỏ, sản lượng rất lớn, và thường đã bỏ quên chi phí package/test. Lưu ý thuật ngữ: NRE = Non-Recurring **Engineering**, nên chi phí kỹ sư/IP/tool CHÍNH LÀ một phần NRE — FPGA chỉ loại bỏ phần NRE mask/fabrication, không phải toàn bộ NRE. Mọi con số break-even là **ví dụ minh họa để học cách tính**.

**Thay đổi:** Week08 §C3 (co-fix + 18 nhãn "minh họa" phủ mọi con số), quiz câu NRE tuần 8 và tuần 12, Week12 §C3 (sửa câu NRE ≈ 0).

---

## 5.6 — Synchronizer và metastability

**Vị trí trong v2:** Week11 ("Đồng bộ hóa rx qua 2 flip-flop trước khi dùng (tín hiệu ngoài không theo clk → **tránh** metastability)"), Week12 ("Đồng bộ 2 FF **chống** metastability").

**Vấn đề:** "tránh/chống" ngụ ý loại bỏ hoàn toàn. Metastability không thể triệt tiêu về nguyên lý.

**Cách hiểu đúng:** "Synchronizer **giảm xác suất metastability lan truyền vào logic đồng bộ phía sau** (MTBF tăng theo hàm mũ của **thời gian ổn định khả dụng** ≈ (N−1)×chu kỳ clock — nên cả số tầng lẫn tần số clock đều quyết định), nhưng không thể loại bỏ về mặt toán học/vật lý. Hai giới hạn phải nói kèm: synchronizer **không** cho biết giá trị lấy được là cũ hay mới, và **chỉ dùng cho tín hiệu 1 bit** — bus nhiều bit phải dùng handshake, mã Gray hoặc FIFO (Phase 2)."

**Thay đổi:** Week11 §C5 (mục riêng + co-fix), quiz câu 5 tuần 11, ghi chú mentor W11.

---

## 5.7 — "Ngưỡng 2%" của sai số baud UART

**Vị trí trong v2:** Week11 ("ngưỡng an toàn tổng sai số hai bên thường lấy ≈ 2%"; "Quy tắc thực dụng: tổng sai lệch hai bên nên ≤ 2%") — v2 đã có chữ "thường/thực dụng" nhưng chưa nêu các yếu tố phụ thuộc.

**Cách hiểu đúng:** "vài phần trăm" là **guideline kinh nghiệm**, không phải đặc tả phổ quát; ngưỡng thực tế phụ thuộc: sai số clock của cả hai phía, độ dài khung, phương pháp lấy mẫu, mức oversampling, hiện thực bên nhận. Điều luôn đúng: sai số **tích lũy theo từng bit**. Với `k` là chỉ số bit dữ liệu (0…7) và `e` là **tổng** sai lệch tương đối của cả hai phía, tâm điểm lấy mẫu bit k trôi ≈ (k+1,5)·e bit-time; điểm xấu nhất của khung 8N1 là **stop bit** ở ≈ 9,5·e — vượt nửa bit-time ở đó sinh framing error. Các guideline 1–2% chính là biên an toàn đặt dưới ngưỡng lý thuyết đó.

**Thay đổi:** Week11 §C2 (co-fix nêu đủ các yếu tố phụ thuộc), quiz câu 3 tuần 11.

---

## 5.8 — Tuyên bố mức độ hoàn chỉnh của khóa học

**Vị trí trong v2:** Week12 ("bạn đã học đủ **100% mảnh ghép của một design FPGA tiêu chuẩn**").

**Vấn đề:** phóng đại phạm vi — gây ngộ nhận nguy hiểm cho người học.

**Cách hiểu đúng:** "Học viên đã có **các mảnh nền tảng để xây một thiết kế FPGA đồng bộ nhỏ**." Phía trước còn: timing constraints, STA, CDC, reset-domain, BRAM, PLL/MMCM, synthesis report, resource utilization, timing closure, physical implementation, formal verification, DFT, on-chip debugging.

**Thay đổi:** Week12 §C2 (co-fix + danh sách chủ đề phía trước), Week08 §C4 (cùng danh sách ở nơi so sánh nền tảng), chuẩn đầu ra nguyên văn đặt ở index.html + Week12 + CURRICULUM_MAP.md.

---

## Các hiệu chỉnh/nhất quán hóa nhỏ khác

| # | Vị trí | Nội dung |
|---|---|---|
| a | Toàn khóa | Week 7 đổi tên "What Is Verilog?" → "Writing Clean RTL in SystemVerilog"; T1–T6 được định danh rõ là *guided exposure* RTL (RTL peek T1–T3, RTL guided T4–T6) để T7 là tuần hệ thống hóa, không phải lần đầu gặp. |
| b | Toàn khóa | Chuẩn hóa tín hiệu: `clk`, `rst_n` (bất đồng bộ mức thấp — v2 lẫn lộn `rst` đồng bộ ở W7 và `rst_n` ở W9/W11), `enable`, `tick`, `state`, `next_state`, `count`. |
| c | W4 v2 | Ví dụ nhỏ trong chỉ thị nội bộ nói "MUX 2:1 quét đủ 4 tổ hợp" — thực tế 3 input (a,b,sel) → 8 tổ hợp; v3 dùng 8. |
| d | W10 v2 | Ghi chú "propagation delay nhỏ nhưng không phải bằng 0" của v2 được giữ và nối vào khung t_pd/t_CQ của W5. |
| e | W11 v2 | Sơ đồ LSB-first cho 0x41 của v2 vốn đúng — giữ nguyên trong v3 (C1/C4). |
| f | Toàn khóa | Mọi phát biểu "cấm derived clock" của v2 (vốn đúng và rất tốt) được giữ nguyên và lặp có chủ đích ở W9/W10/W11. |

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**  
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
