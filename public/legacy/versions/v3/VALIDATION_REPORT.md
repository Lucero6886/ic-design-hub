# VALIDATION_REPORT — Version 3 · 07/08/2026 (cập nhật 08/08/2026)

Toàn bộ kiểm định được chạy tự động (script cấu trúc Python + trình duyệt headless Chromium/Playwright + biên dịch & mô phỏng RTL bằng Icarus Verilog 12, cờ `-g2012`). Kết luận chung: **PASS toàn bộ** sau 3 hiệu chỉnh phát hiện trong quá trình kiểm định (ghi ở mục 6).

## 1. Đầy đủ & điều hướng
- ✔ Đủ 12 tuần `Week01.html`–`Week12.html` + `index.html` + `css/style.css` + `js/app.js` + `assets/` + 8 tài liệu .md.
- ✔ Điều hướng tuần trước/sau: kiểm từng link — W(n) trỏ đúng W(n−1)/W(n+1); W01 prev → index; W12 next → index. Index có đủ 12 link tuần.
- ✔ Không có bất kỳ URL ngoài nào (http/https) trong 13 trang HTML — hoạt động offline hoàn toàn (đã render thật với network bị chặn: trang vẫn nguyên vẹn).

## 2. Cấu trúc trang (script kiểm 16 tiêu chí × 12 tuần)
- ✔ 4 layer A/B/C/D hiện diện đúng thứ tự ở cả 12 tuần; `data-week` đúng chuẩn 2 chữ số.
- ✔ Quiz: đúng 5 câu/tuần, mỗi câu 4 lựa chọn A–D + đúng 1 `data-answer` + giải thích trỏ về mục Layer C; phân bố đáp án không dồn về một chữ cái.
- ✔ Rubric: đúng 5 hàng, trọng số 25/20/20/20/15 ở cả 12 tuần.
- ✔ Tổng kết chuẩn 6 ô (I can explain/design/verify/connect · I am still unsure · Next week) + ô phản tư tự lưu — đủ ở cả 12 tuần.
- ✔ Timeline buổi học đúng 6 khung giờ; khối mentor-only đủ ở mọi tuần.
- ✔ Không có `<script>` thực thi inline trong 12 trang tuần (chỉ `application/json` cho widget FSM; index.html có script đọc tiến độ — chủ đích).
- ✔ EQ→RQ (Engineering→Research Question) có mặt từ tuần 6 trở đi, đúng đặc tả.

## 3. JavaScript & tương tác (render thật từng trang)
- ✔ 13/13 trang tải không lỗi JavaScript (pageerror = 0, console error = 0).
- ✔ Quiz engine: chọn đáp án đúng cho cả 5 câu → điểm "5/5" trên cả 12 tuần; chọn sai hiện đúng màu + giải thích; nút "Làm lại" hoạt động.
- ✔ Lưu tiến độ: trả lời quiz / tick checklist / bật mentor → reload trang → trạng thái được khôi phục (kiểm bằng reload thật).
- ✔ Widget hoạt động: counter (W5), fsm "101" (W6), tt (W1/W3/W4/W8), traffic (W9), seg7 + traffic-seg (W10), uart frame (W11); bug hunt bấm trúng cả 10 dòng lỗi cài sẵn (W4/W5/W7/W9); wr predict-reveal mở/đóng đúng.
- ✔ Mentor toggle bật/tắt và lưu lựa chọn xuyên trang.

## 4. RTL — biên dịch & mô phỏng THẬT (điểm kiểm mạnh nhất)
Trích tự động mọi khối RTL/testbench "chuẩn" (bỏ các khối cố tình sai đã dán nhãn SAI/bughunt) từ trang, biên dịch bằng `iverilog -g2012`:

| Nhóm | Modules | Kết quả |
|---|---|---|
| W5 | counter_mod10 + tb | ✔ compile + **mô phỏng chạy đúng** (đếm 0→9, wrap, enable) |
| W6 | seq_detect_101 (+ TB kiểm định riêng) | ✔ compile + **chuỗi "10101"+"1101" ra đúng 3 lần detect (gối chuỗi hoạt động)** |
| W7 | majority3/vote_unit, half_adder | ✔ compile |
| W9 | tick_gen + traffic_ctrl + tb_traffic | ✔ compile + mô phỏng 2 vòng đèn + reset giữa chừng: **0 vi phạm invariant**, chuỗi pha 0→1→2→3 đúng |
| W10 | seg7_decoder + display_mux | ✔ compile (ghi chú: `unique case` được iverilog chấp nhận nhưng bỏ qua kiểm unique — tool thương mại sẽ kiểm) |
| W11 | uart_tx + tb + status_tx + traffic_system_top | ✔ compile + **tb đo start bit đúng 8 chu kỳ**, start-khi-busy bị bỏ qua đúng spec |
| **Toàn hệ** | tick_gen + traffic_ctrl + seg7_decoder + status_tx + uart_tx + traffic_system_top | ✔ **mô phỏng end-to-end: giải mã byte UART đầu tiên trên dây tx = 0x47 = 'G' (đúng thông điệp "GN …"), stop bit đúng** |

Ghi chú: TB khung sườn `tb_traffic_top` ở W10 là skeleton có chủ đích (bảng giải mã để học viên tự chép đủ) — không đưa vào biên dịch tự động.

## 5. Nhất quán kỹ thuật & thuật ngữ
- ✔ Tín hiệu thống nhất toàn khóa: `clk`, `rst_n` (bất đồng bộ mức thấp), `enable`/`tick`, `state`, `next_state`, `count`; interface project khớp 100% giữa W9 → W10 → W11 → PROJECT_GUIDE.
- ✔ Một clock duy nhất trong mọi RTL; mọi nhịp chậm là clock-enable (không có `@(posedge tick)` ở bất kỳ code chuẩn nào).
- ✔ 8 nhóm hiệu chỉnh 5.1–5.8 hiện diện đúng chỗ; script quét các phát biểu cấm ("NRE = 0", "100% mảnh ghép", "loại bỏ hoàn toàn metastability", "luôn ngẫu nhiên") xác nhận chúng **chỉ xuất hiện dưới dạng trích-dẫn-sai để sửa** (trong callout hiệu chỉnh, phương án quiz sai, cảnh báo mentor) — không còn là phát biểu của giáo trình.
- ✔ Tiên quyết tuần nối tuần khớp CURRICULUM_MAP (retrieval đầu buổi của tuần N hỏi đúng nội dung tuần N−1 ở cả 11 tuần có tuần trước).
- ✔ Không trùng lặp nội dung lớn: mỗi trang 33–47 KB (v2: 111–178 KB), khái niệm nhắc lại đều là spiral có chủ đích kèm tham chiếu tuần gốc.

## 6. Ba lỗi phát hiện & đã sửa trong quá trình validation
1. **W6 `seq_detect_101`:** dạng `next_state = din ? S1 : S0` hợp lệ theo LRM nhưng iverilog (công cụ miễn phí học viên dễ dùng nhất) yêu cầu cast tường minh với enum → đổi sang dạng `if/else` tương đương, dễ đọc hơn với người mới và biên dịch được trên mọi tool.
2. **W11 `tb_uart_tx`:** phép đo start bit dùng `@(negedge tx)` ngay sau xung start → dính race lịch trình (bắt nhầm negedge của D0→D1, đo ra 41/7 thay vì 8). Sửa thành: lái stimulus đồng bộ bằng non-blocking (`start <= 1`) + lấy mẫu ở cạnh xuống clk. Chính quá trình sửa này là bài học TB được ghi lại trong comment code.
3. **W12:** ô cuối tổng kết ghi "Next stage" → chuẩn hóa lại nhãn "Next week — Phase 2" theo format bắt buộc mục 26 của đặc tả.
4. **Sơ đồ kiến trúc (rà soát 08/08/2026, do người dùng phát hiện):** năm sơ đồ ASCII — `PROJECT_GUIDE` §2, Week09 §C1, Week11 §C6, `CURRICULUM_MAP` (khối "Kiến trúc project tích hợp W9–11") và Week10 §C1 — đều **thiếu những nối kết có thật trong RTL** — `clk`/`rst_n` chỉ được vẽ tới khối đầu tiên thay vì tới mọi khối tuần tự; `tick` chỉ vẽ tới `traffic_ctrl` trong khi `status_tx` cũng nhận `tick`; và đường phản hồi `tx_busy` từ `uart_tx` về `status_tx` bị bỏ hẳn. Riêng sơ đồ trong `PROJECT_GUIDE` còn có một chỗ giao đường (`┼`) không thể đọc được là nối hay cắt. Đã thay bằng **hai hình SVG vẽ đúng theo netlist của `traffic_system_top.sv`** (`assets/fig-system-top.svg`, `assets/fig-controller-datapath.svg`) kèm chú giải quy ước, và bổ sung **bảng liên kết tín hiệu** (§2.4 của PROJECT_GUIDE) làm bản đặc tả chuẩn — đối chiếu từng dòng với RTL: đúng 6 dây nội bộ và 6 cổng mức đỉnh. Hai sơ đồ còn lại được sửa cùng đợt: `CURRICULUM_MAP` bỏ hình ASCII, thay bằng **bảng netlist mỗi dòng một dây** trỏ về §2.4 và `assets/fig-system-top.svg` (hình ASCII cũ còn vẽ `display_mux`/`an[1:0]` như phần bắt buộc — sai, đó là mở rộng tự chọn — và viết nhầm "6 byte ASIC" thay vì ASCII); Week10 §C1 vẽ `clk`/`rst_n` tới cả `tick_gen` lẫn `traffic_ctrl`, kèm ghi chú `seg7_decoder` là tổ hợp thuần nên không có clk.

## 6b. Rà soát học thuật toàn khóa (08/08/2026) — 40 hiệu chỉnh

Đợt rà soát này do người dùng yêu cầu: *"đảm bảo chuẩn học thuật, người đọc dễ hiểu, nắm bản chất và đúng chính xác; tránh lỗi học thuật và rườm rà phức tạp."* Phương pháp gồm hai vòng, vòng sau kiểm chính kết quả vòng trước — vì lần trước chính người dùng, chứ không phải công cụ của tôi, là người phát hiện lỗi sơ đồ.

**Vòng 1 — 5 tác nhân rà soát song song** trên toàn bộ 12 trang tuần và 8 tài liệu. Mọi phát hiện đều phải kèm trích dẫn nguyên văn và được kiểm tra tồn tại trong file trước khi sửa. Kết quả: **25 hiệu chỉnh**.

**Vòng 2 — 3 tác nhân kiểm ngược chính các đoạn vừa viết lại** (không rà soát lại phần khác), cộng thêm chứng minh bằng mô phỏng cho các khẳng định về ngôn ngữ. Kết quả: **15 hiệu chỉnh nữa, trong đó 5 lỗi nằm ngay trong bản sửa của vòng 1.** Đây là số liệu đáng ghi lại: một lần rà soát là không đủ.

### Nhóm 1 — Khẳng định sai về ngôn ngữ SystemVerilog (đã chứng minh bằng iverilog)

| Trang | Trước | Sau |
|---|---|---|
| W5 §C4 | "so sánh `4'd16` (bị cắt thành 0) → điều kiện wrap không bao giờ khớp → counter chạy tự do 0…15" | Ngược hẳn: `4'd16` bị cắt thành `4'd0` nên `count == 0` **khớp ngay sau reset** → counter **đứng yên tại 0**. Trường hợp "chạy tự do 0…15" là của hằng *không khai kích thước* `count == 16`. Cả hai đã mô phỏng đối chứng. |
| W5 §C4 | "so sánh `== 4'd10` → không bao giờ tới → thành counter 16" (v2) | `4'd10` **tới được** → thành mod-11 (off-by-one) |
| W7 Bẫy 3 | Giải thích "hằng `1` mở rộng 32 bit" nhưng minh họa bằng `x <= x + 1'b1` | Minh họa bằng `x <= x + 1`; thêm đoạn nói rõ `x + 1'b1` được tính **ngay ở 4 bit** nên giá trị 16 không bao giờ tồn tại — cùng kết quả, khác cơ chế. Đo bằng `$bits`: `x+1` rộng 32, `x+1'b1` rộng 4. |
| W7 §C6 | "`initial` sống trong testbench, không tổng hợp được" | Nói rõ ngoại lệ: tool FPGA **có** nhận `initial` để đặt giá trị FF lúc nạp bitstream; vẫn xếp vào ô testbench vì (a) flow ASIC không có, (b) giá trị đó chỉ áp tại thời điểm nạp cấu hình, không thay được `rst_n` |
| W4 | "chuỗi `if` thiếu `else` cuối cũng cùng số phận (sinh latch)" | Khi đã gán giá trị mặc định ở đầu khối thì thiếu `else` **không** sinh latch |
| W6 quiz 5 | Tiền đề bất khả: 4 state lấp kín 2 bit mà vẫn hỏi về `default` | Đổi sang 5 state trên 3 bit; giải thích nêu rõ khi nào `default` thực sự có tác dụng |

### Nhóm 2 — Sơ đồ và waveform không khớp RTL

| Trang | Lỗi | Sửa |
|---|---|---|
| W9 §C5 | Waveform vẽ GREEN_EW dài 7 nhịp trong khi `time_left` ngay phía trên đọc 6 nhịp; pha YELLOW_EW bị nuốt mất nhãn | Thêm vạch chuyển pha tại nhịp thứ 7, nhãn `YELLOW_EW` và `ew=VÀNG`, kéo dài lane thêm một ô |
| W9 | Ghi chú "gai tại `cnt==9`" | `tick` là tín hiệu **đã đăng ký** nên trùng với `cnt==0` |
| W10 §C1 | Sơ đồ vẽ `clk`/`rst_n` chỉ tới `tick_gen` | Vẽ tới cả `traffic_ctrl`; ghi rõ `seg7_decoder` là tổ hợp thuần nên không có clk |
| W10 §C3/§C5 | `.DIV(50_000_000)` cứng ở C3 nhưng testbench C5 dùng `#(.DIV(10))` — lỗi elaboration | Tham số hóa `.DIV(DIV)` |
| W10 | `tick` vẽ như xung vuông 50% duty, mâu thuẫn với "rộng đúng 1 chu kỳ" | Vẽ thành gai hẹp |
| W12 §C3 | Sơ đồ dùng tên không tồn tại `sec_left`/`state`; thiếu nhánh `tick` → `status_tx` | Đổi thành `time_left[4]`, `phase[2]`; thêm nhánh `tick` rẽ đôi và đường phản hồi `tx_busy` |
| CURRICULUM_MAP | Hình ASCII vẽ `display_mux`/`an[1:0]` như phần bắt buộc, thiếu fan-out của `tick`, thiếu `tx_busy`, viết nhầm "6 byte ASIC" | **Bỏ hình ASCII**, thay bằng bảng netlist mỗi dòng một dây, trỏ về §2.4 và `assets/fig-system-top.svg` |

### Nhóm 3 — Mô hình kinh tế và quy trình (W8, W12)

- Bảng chi phí FPGA/ASIC ghi cột "rẻ hơn ~80 lần / ~6 lần". **Tỉ số không bất biến** với phần NRE thiết kế chung đã bị bỏ khỏi cả hai cột (thêm 500.000$ chung là "80 lần" tụt còn ~5 lần), trong khi **hiệu số thì bất biến**. Đổi cột thành hiệu số tiền, kèm đoạn giải thích vì sao — đó chính là kỷ luật đọc mô hình chi phí.
- "NRE bổ sung coi như nhỏ" (tái phạm bẫy FPGA-NRE≈0 của v2) → nói rõ NRE thiết kế **có ở cả hai phương án và được giả định xấp xỉ bằng nhau nên triệt tiêu khi lấy hiệu**; thực tế phía ASIC còn nặng hơn nên hòa vốn thật dịch sang phải.
- Time-to-market: hai con số nêu như sự thật phổ quát → dán nhãn "bậc độ lớn minh họa", và sửa "hai bậc độ lớn" thành "một đến hai bậc" cho khớp chính dải vừa nêu.
- W12: "physical implementation và STA là của riêng ASIC" → sai, FPGA cũng có cả hai; chỉ **DFT** là hoàn toàn mới.
- W12: đề cương nghiên cứu đòi `evidence`/`conclusion` **trước** khi làm thí nghiệm → đổi thành "tiêu chí bằng chứng" + "dạng kết luận dự kiến".

### Nhóm 4 — Đặc tả tự mâu thuẫn và tài liệu lệch nhau

- W6 "khóa số 2 nút": spec viết "bấm sai quay về đầu" nhưng phần sau lại nói "ở lại GOT_A" → spec viết lại tường minh.
- W11 mở đầu nói `uart_tx` "đúng khuôn T6" (3 khối) trong khi RTL ở C3 cố ý **gộp** thành một `always_ff`; W6 cũng khẳng định `uart_tx` là "biến thể của đúng khuôn này". Sửa cả ba chỗ (W6, W11 mở đầu, ghi chú mentor W11) thành: dùng đúng *bộ đồ nghề* T6 nhưng gộp khối — và biến chính việc gộp thành câu hỏi luyện tập.
- Invariant an toàn bị phát biểu yếu đi ("không bao giờ hai hướng cùng xanh") ở W2 và W8, trong khi testbench thật kiểm "luôn có ít nhất một hướng ĐỎ" — bản yếu cho lọt tổ hợp xanh–vàng. Đã thống nhất.
- `PROJECT_GUIDE` §2.4 tự nhận là "toàn bộ tín hiệu trong hệ" nhưng §2.5/§2.6 lại nhắc `next_state`, `timer_done`, `baud_tick` không có trong bảng → giới hạn lại phạm vi: bảng đặc tả **tín hiệu mức đỉnh**.
- `PROJECT_GUIDE` quy tắc 4 giải thích bắt tay ngược chiều nhân quả (nói `status_tx` chậm hơn `uart_tx`). Thực tế `status_tx` chạy một trạng thái mỗi `clk` nên **nhanh hơn hàng nghìn lần** — đó mới là lý do cần `tx_busy`.
- `PROJECT_GUIDE` M4 viết "start bit đúng `DIV` chu kỳ" nhưng trong tài liệu này `DIV` là tham số của `tick_gen` → nói rõ là `CLK_HZ/BAUD`.
- `MENTOR_GUIDE` chỉ mentor đọc RTL trong `PROJECT_GUIDE.md` — tài liệu đó **không có dòng RTL nào**; RTL nằm ở Layer C các trang tuần.
- `MENTOR_GUIDE` gộp "nhầm latch với FF" (vốn là T5) vào nhãn T4/T7; danh sách EQ→RQ của T9–T11 liệt kê 4 chủ đề cho 3 tuần và gán nhầm "chiến lược reset" (thực ra là T7).
- `TECHNICAL_AUDIT` §5.4 viết "timing spec được giữ" → timing là **ràng buộc** do STA kiểm và **có thể trượt**; §5.1 "init chỉ giải quyết lần bật nguồn đầu tiên" → đúng ra là "chỉ có hiệu lực tại thời điểm nạp cấu hình".
- `CURRICULUM_MAP`: gán nhầm nơi chứa phát biểu chuẩn đầu ra; chuỗi trừu tượng ghi 4 tầng thay vì 6; số chặng quy trình sai; lấy `S=GN T=09` làm mặc định (thực ra `GN 09` mới là mặc định).
- W10 §C5: mô hình tham chiếu trong testbench có `default` trả về một mẫu 7 đoạn **trông hợp lệ**, nên bảng chép thiếu sẽ đổ lỗi nhầm cho RTL. Đổi thành trả `x` kèm `$error` riêng — nguyên tắc: *mô hình tham chiếu phải hỏng ồn ào, không hỏng lặng lẽ.*

### Kiểm định lại sau khi sửa

| Hạng mục | Kết quả |
|---|---|
| Biên dịch RTL (`iverilog -g2012`, 22 khối trích tự động + 23 module) | ✔ 0 lỗi |
| `tb_counter_mod10`, `tb_traffic`, `tb_traffic_top`, `tb_uart_tx` | ✔ 0 `$error` |
| Mô phỏng toàn hệ `traffic_system_top` (giải mã ngược luồng UART) | ✔ 0 vi phạm invariant; luồng đọc ra `GN 08 | GN 07 | GN 06`; byte đầu `0x47` = `'G'` |
| Script cấu trúc (21 trang: link chết, tài nguyên ngoài, 4 layer, rubric = 100%, đáp án quiz nằm trong tập lựa chọn, namespace lưu trữ, thương hiệu/tác giả) | ✔ 0 lỗi, 0 cảnh báo |
| `DIV = (CLK_HZ + BAUD/2)/BAUD` (đổi từ phép cắt sang làm tròn cho khớp quy tắc dạy ở Layer A) | ✔ 434 @ 50 MHz/115200; mô phỏng lại toàn hệ đạt |


## 7. Phạm vi chưa kiểm (khai báo minh bạch)
- Chưa chạy synthesis thật trên tool FPGA (Vivado/Quartus/Gowin) — RTL viết trong tập synthesizable chuẩn và đã mô phỏng đúng, nhưng con số tài nguyên trong bài là ước lượng giảng dạy.
- `unique case` chỉ được kiểm ngữ nghĩa trên tool thương mại (iverilog bỏ qua quality này — không ảnh hưởng hành vi).
- Render kiểm trên Chromium; Firefox/Safari dùng chung chuẩn HTML/CSS cơ bản, rủi ro thấp nhưng chưa kiểm trực tiếp.

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**  
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
