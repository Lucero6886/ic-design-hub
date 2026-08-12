# IMPLEMENTATION NOTES — Ghi chú triển khai Version 3

Tài liệu này dành cho người chủ chương trình: (1) toàn cảnh hệ thống đã xây và bản chất từng thành phần; (2) **mọi điểm hiện thực KHÁC so với đặc tả** kèm lý do; (3) cách bảo trì/mở rộng. Bản HTML dễ đọc: `implementation-notes.html`.

---

## 1. Toàn cảnh những gì đã xây

**Sản phẩm:** thư mục `version3/` độc lập, offline hoàn toàn, gồm 13 trang học (index + 12 tuần), 8 trang tài liệu vận hành HTML kèm 8 bản `.md` văn bản gốc, 1 file CSS + 1 file JS dùng chung. Version 2 không bị đụng tới (hai file zip gốc giữ nguyên để đối chiếu).

**Quy trình đã thực hiện** (đúng 8 phase của đặc tả mục 29):
1. **Audit v2** — đọc/phân tích tự động 12 file v2, trích nguyên văn mọi phát biểu thuộc 8 nhóm lỗi kỹ thuật 5.1–5.8 (kết quả trong `TECHNICAL_AUDIT.md`), thống kê trùng lặp/độ dài (v2: 6.300–10.100 từ/tuần, mọi thứ trong một luồng đọc duy nhất — đây là điểm yếu chính cần sửa).
2. **Curriculum spec** — `CURRICULUM_MAP.md` (bảng 12 tuần đủ 9 cột theo đặc tả + 6 learning spirals) và chốt kiến trúc project 3 tuần TRƯỚC khi viết trang (interface `traffic_ctrl` có `phase`/`time_left` ngay từ W9).
3. **Design system dùng chung** — `css/style.css` (design tokens, 4 màu layer, mọi component) + `js/app.js` (một quiz engine duy nhất, checklist, localStorage, mentor toggle, highlighter SystemVerilog, 8 widget tương tác) + một "hợp đồng template" nội bộ quy định chính xác skeleton trang, và **tuần mẫu Week05** được xây và kiểm thử trình duyệt trước khi nhân rộng.
4–7. **Dựng 12 tuần + tài liệu** — theo template; tuần 7 đổi vai thành RTL discipline; tuần 9–11 thành project tích hợp; tuần 12 thành capstone ngắn nhất khóa.
8. **Validation** — script cấu trúc (16 tiêu chí × 12 tuần), render thật 13 trang bằng Chromium (0 lỗi JS, quiz chấm đúng, tiến độ khôi phục sau reload), và đặc biệt: **biên dịch + mô phỏng THẬT toàn bộ RTL bằng Icarus Verilog** — kể cả chạy end-to-end cả hệ 3 tuần và giải mã đúng byte UART 'G' trên dây tx. Chi tiết: `VALIDATION_REPORT.md`.

**Kiến trúc một trang tuần** (bất biến ở cả 12 tuần):

```
topbar (điều hướng A/B/C/D + công tắc Mentor + thanh tiến độ cuộn)
hero   (mục tiêu 3–5 · vị trí tuần trước/này/sau)
A  Trước buổi học  (15–25′): vì sao · tiên quyết · 5 khái niệm thiết yếu · 1 hoạt động chuẩn bị · 2 câu tự chẩn đoán
B  Buổi mentoring 60′: timeline 6 khung giờ cố định + khối mentor-only (6 phần theo đặc tả mục 13)
C  Technical Lab: 5–9 mục deep-dive gập/mở — toàn bộ RTL/waveform/bẫy/từ vựng nằm ở đây
D  Sau buổi học: quiz 5 câu · bài tập bắt buộc (deliverable tường minh) · thử thách nâng cao · EQ→RQ (từ T6) · rubric 25/20/20/20/15 · tổng kết 6 ô chuẩn
weeknav (tuần trước/sau)
```

---

## 2. Các điểm KHÁC so với đặc tả — và lý do

Đặc tả được tuân thủ gần như toàn bộ (xem checklist mục 3 dưới). Những chỗ tôi chủ động làm khác/làm thêm:

| # | Khác biệt | Lý do & bản chất |
|---|---|---|
| 1 | **Thêm `index.html`** (đặc tả mục 21 không liệt kê) | Cần một hub để 12 file không rời rạc (đây là điểm yếu đã ghi nhận của cả v1 lẫn v2); index còn hiển thị tiến độ quiz từng tuần đọc từ localStorage. Không phá vỡ cấu trúc đặc tả — chỉ bổ sung. |
| 2 | **Lưu tiến độ bằng localStorage** (đặc tả không yêu cầu) | v2 mất trắng trạng thái mỗi lần tải lại trang. Toàn bộ checklist/quiz/ô phản tư/chế độ mentor được lưu theo khóa `licv3:wNN:*`. Lưu ý bản chất: dữ liệu nằm trong trình duyệt của từng máy (mở bằng file:// thì mọi trang cùng máy dùng chung một kho; xóa dữ liệu duyệt web = mất tiến độ; không đồng bộ giữa các máy). Engine có fallback in-memory nếu trình duyệt chặn localStorage. |
| 3 | **Quiz 5 câu/tuần** thay vì 10 câu như v2 | Đặc tả mục 3 Layer D quy định "5-question formative quiz" — làm đúng đặc tả. Chiều sâu luyện tập không mất: các bài drill/predict/bug-hunt trong Layer C đảm nhận phần đó. |
| 4 | **Rubric tuần 1–3 đổi nhãn 2 hàng** ("RTL đúng"→"Thiết kế đúng", "Verification"→"Kiểm chứng/đối chiếu") | Đặc tả mục 12 định nghĩa 5 hạng mục theo hướng project có code; tuần 1–3 artifact chưa có code. Giữ nguyên trọng số 25/20/20/20/15 và tinh thần từng hạng mục, chỉ đổi nhãn cho khớp artifact. |
| 5 | **Layer A của tuần 12 có khối lượng 60–90′** (thay vì 15–25′) | Tuần 12 không phải bài học — là buổi bảo vệ; phần "trước buổi" là chạy lại hệ + chụp 3 waveform + điền phiếu bảo vệ. Đây là deviation có chủ đích so với khung Layer A chuẩn, ghi rõ ngay trên trang. |
| 6 | **EQ→RQ có một bản "làm quen" ở tuần 5** | Đặc tả mục 9 nói "từ khoảng tuần 6" — bản ở T5 được dán nhãn làm quen và không bắt buộc, để T6 vào chính thức không đột ngột. |
| 7 | **Retrieval tuần 1 = icebreaker** | Không có "tuần trước" để hỏi — thay bằng 2 câu khởi động kỳ vọng/bối cảnh. |
| 8 | **Thông điệp UART là `GN 09\n` (6 byte)** thay vì ví dụ `STATE=GREEN_NS TIME=08` của đặc tả | Đặc tả mục 7 cho phép "another simple machine-readable format". Chuỗi 6 byte cố định giúp `status_tx` đủ đơn giản cho người mới (ROM 6 phần tử + FSM 4 trạng thái); định dạng dài hơn (`S=GN T=09\n`) được giao làm thử thách nâng cao T11 — đúng tinh thần "kiến trúc không đổi, chỉ đổi nội dung". |
| 9 | **`uart_tx` gộp controller + datapath trong một khối `always_ff`** (không tách 3 khối như FSM kinh điển) | Quyết định sư phạm có cân nhắc: FSM của uart_tx là pipeline tuyến tính (IDLE→START→DATA→STOP), tách 3 khối làm code dài gần gấp đôi mà không thêm insight; dạng chuẩn 3 khối đã được dạy kỹ và bắt buộc ở W6/W9. Trang W11 ghi chú rõ điều này ("gộp một khối cho gọn nhập môn"). |
| 10 | **Icon = emoji/ký tự, font = system stack** (v2 dùng FontAwesome + Google Fonts) | Điều kiện offline tuyệt đối. Đánh đổi: bề ngoài icon kém "đồng phục" hơn font-icon một chút. |
| 11 | **12 trang tuần cấm `<script>` inline** (mọi tương tác qua engine chung); riêng index.html có một script nhỏ đọc tiến độ | Kỷ luật này là thứ giết chết tình trạng "5 engine quiz khác nhau" của v2. Ngoại lệ duy nhất được phép: `<script type="application/json">` chứa cấu hình widget FSM (dữ liệu, không phải code). |
| 12 | **Đặt tên file `Week01.html`…`Week12.html`** (zero-padded, khác v2 `Week1.html`) | Theo đúng cấu trúc đề xuất trong đặc tả mục 21; sort đúng thứ tự trong mọi trình quản lý file. |
| 13 | **TB skeleton ở W10** (`tb_traffic_top` có bảng giải mã rút gọn "chép đủ 10 hàng theo bảng C2") | Chủ đích sư phạm: học viên phải tự hoàn thiện trọng tài độc lập — không được copy nguyên. Vì vậy khối này không đưa vào biên dịch tự động (đã ghi trong VALIDATION_REPORT). |
| 14 | **Khối mentor-only là toggle ẩn/hiện, không phải file riêng** | Đặc tả mục 13 yêu cầu "mentor-only section" mỗi tuần. Hiện thực bằng công tắc giữ trải nghiệm một-file và để mentor dùng ngay trong ngữ cảnh bài. Bản chất: học viên bật công tắc vẫn xem được — coi đây là "đáp án mở" (minh bạch, giống sách giáo viên bán công khai). Nếu muốn tách hẳn, xem hướng dẫn mục 5. |
| 15 | **3 sửa lỗi phát sinh khi validation** (chi tiết mục 6 của VALIDATION_REPORT): đổi ternary-enum thành if/else ở W6 cho tương thích iverilog; sửa race đo start-bit trong TB W11 (chuyển stimulus sang non-blocking + lấy mẫu cạnh xuống); chuẩn hóa nhãn "Next week — Phase 2" ở W12 | Đây là minh chứng quy trình "kiểm chứng bằng công cụ thật" hoạt động: chính testbench trong giáo trình bắt được lỗi của chính nó — và bài học đó được giữ lại trong comment code cho học viên. |

**Cách tổ chức thi công (minh bạch):** phần lõi rủi ro cao do tôi trực tiếp viết và kiểm — design system (css/js), hợp đồng template, tuần mẫu W5, ba tuần nặng RTL W7/W9/W11, toàn bộ tài liệu .md, toàn bộ validation. Tám tuần còn lại (W1–4, W6, W8, W10, W12) được dựng song song bởi các agent con theo hợp đồng template + chỉ thị nội dung chi tiết từng tuần (bao gồm code RTL cho sẵn nguyên văn cho W6/W10), sau đó toàn bộ 12 tuần đi qua cùng một bộ kiểm định cấu trúc + trình duyệt + RTL nêu trên. Các khác biệt nhỏ mà agent chủ động đề xuất (ví dụ W4 sửa "4 tổ hợp" thành "8 tổ hợp" cho đúng kỹ thuật) đã được rà và giữ lại có chọn lọc.

---

## 3. Đối chiếu "Definition of Done" (đặc tả mục 31)

| Điều kiện | Trạng thái |
|---|---|
| 1. Đủ 12 tuần | ✔ |
| 2. Mỗi tuần tách rõ 4 lớp A/B/C/D | ✔ (kiểm tự động) |
| 3. Mentor chạy được buổi 60′ | ✔ timeline 6 khung + mentor box + MENTOR_GUIDE |
| 4. Không bắt học viên đọc cả trang trước buổi | ✔ Layer A 15–25′, ghi tường minh trên mọi trang |
| 5. Tuần 7 = RTL có hệ thống, không phải "làm quen Verilog" | ✔ đổi tên + T1–6 guided exposure |
| 6. Tuần 9–11 = MỘT project FPGA tích hợp | ✔ interface hợp đồng + mô phỏng end-to-end pass |
| 7. Tuần 12 = capstone/phản tư/cầu nghiên cứu | ✔ trang ngắn nhất khóa, mini-defense |
| 8. Sửa hết lỗi kỹ thuật 5.1–5.8 | ✔ TECHNICAL_AUDIT.md, đánh dấu co-fix trong bài |
| 9. Style RTL nhất quán | ✔ (một bảng quy ước, kiểm bằng grep + compile) |
| 10. Verification xuyên suốt | ✔ TB từ T5, invariant T9, self-check T10, đo bằng số T11 |
| 11. Controller–datapath lặp lại có chủ đích | ✔ T6 → T9 → T10 → T11 → T12 |
| 12. FPGA vs ASIC chính xác | ✔ (5.5 + nhãn minh họa) |
| 13. Mỗi tuần có artifact | ✔ deliverable tường minh mọi tuần |
| 14. Nghiên cứu đưa vào từ từ | ✔ EQ→RQ T6+, paper anatomy T7, đọc abstract T8, RQ từ project T9–11, chu trình đầy đủ T12 |
| 15. Mentor notes thực dụng | ✔ 6 phần/tuần |
| 16. Version 2 nguyên vẹn | ✔ không đụng file gốc |
| 17–19. CHANGELOG / TECHNICAL_AUDIT / VALIDATION_REPORT tồn tại | ✔ |
| 20. Mạch lạc và dễ học hơn v2, không chỉ dài hơn | ✔ trang giảm ~65% dung lượng, chiều sâu chuyển vào Layer C gập/mở + kiểm chứng bằng công cụ |

---

## 4. Bản chất hệ thống — để anh nắm toàn bộ

### 4.1 CSS (`css/style.css`, ~19 KB)
- Design tokens ở `:root` (màu, bo góc, bóng, font stack). **Đổi nhận diện thương hiệu = sửa vài biến đầu file** (`--blue`, `--la/--lb/--lc/--ld` cho 4 layer).
- Mỗi component có class riêng, đúng một nơi định nghĩa: callout (`co-*`), khung code (`rtl-frame`/`pre.code` + màu token `.kw/.tp/.cm/.nb/.st/.fn/.sys`), deep-dive (`details.dd`), quiz (`qz-*`), checklist (`ck`), widget (`widget`, `bitbox`, `fsm-st`, `lamp`, `seg7`, `uf-bit`…), waveform (`wavebox`, `wv-*`), EQ→RQ (`eqrq`), tổng kết (`ican`), rubric/từ vựng (bảng `tbl` biến thể), mentor (`mentor-box`, `mentor-only`).
- Responsive: các grid tự gập dưới 860px; in ấn: mở toàn bộ deep-dive khi print.

### 4.2 JavaScript (`js/app.js`, ~21 KB, không phụ thuộc thư viện)
- `store`: bọc localStorage an toàn (try/catch, fallback bộ nhớ), namespace `licv3:wNN:`.
- Khóa dữ liệu: `licv3:mentor` (chế độ mentor, toàn cục) · `licv3:wNN:ck:<id>` (checklist) · `licv3:wNN:quiz:<id>` (đáp án đã chọn) · `licv3:wNN:quizscore:<id>` (`{ok,total,done}` — index.html đọc khóa này) · `licv3:wNN:reflect:<id>` (ô phản tư).
- Quiz engine đọc markup thuần (`.qz-item[data-answer]` + `.qz-opt[data-key]`): trang không có JS riêng vẫn hiển thị đủ nội dung câu hỏi (degrade tử tế).
- Highlighter SystemVerilog: tokenizer regex một lượt (comment → string → system task → số → từ khóa/kiểu), chạy trên textContent nên nội dung HTML đã escape an toàn.
- 8 widget đều là "data-driven": `data-widget="counter|seg7|fsm|traffic|tt|uart"` + tham số `data-*`; riêng FSM nhận cấu hình JSON trong `<script type="application/json">`. Thêm một FSM mới cho tuần khác = viết JSON mới, không viết JS.
- Bug hunt: dòng lỗi là `span.bh-line[data-bug][data-msg]` — thêm bài mới chỉ cần soạn HTML.

### 4.3 RTL của project (đã mô phỏng pass toàn bộ)
- `tick_gen` (chia 1 Hz, enable — không derived clock) → `traffic_ctrl` (FSM 3 khối + timer nạp N−1; xuất `phase`, `time_left` làm hợp đồng) → `seg7_decoder` (tổ hợp, default "-") / `display_mux` (quét 2 digit ~1 kHz) → `status_tx` (ROM 6 byte + FSM handshake 4 trạng thái) → `uart_tx` (baud enable + FSM IDLE/START/DATA/STOP + shift LSB-first) → `traffic_system_top` (chỉ nối dây).
- Tham số mô phỏng thu nhỏ dùng nhất quán: DIV=10, GREEN=6/YELLOW=2, CLK_HZ:BAUD=8:1.

### 4.4 Vòng đời sử dụng
Học viên mở `index.html` → vào tuần → đọc Layer A trước buổi → buổi học chạy theo Layer B → tự học Layer C → làm Layer D (điểm quiz tự lưu, index tự cập nhật tiến độ). Mentor: bật toggle + đọc MENTOR_GUIDE một lần trước khóa.

---

## 5. Bảo trì & mở rộng

- **Sửa nội dung một tuần:** mở WeekNN.html — mọi nội dung là HTML thuần có chú thích section rõ (`<!-- LAYER A -->`…). Không cần build tool.
- **Sửa tài liệu vận hành:** sửa bản `.md` (nguồn sự thật), rồi dựng lại bản `.html` bằng script `mkdocs.mjs` (dùng thư viện `marked`): đọc `.md` → sinh HTML → tự thêm mục lục từ các đề mục `##`, bọc bảng trong khung cuộn ngang, gắn class `pre.code data-nohl` cho khối code, biến các nhắc tới `TÊN.md` thành liên kết sang `TÊN.html`, rồi ghép vào khung trang chuẩn (topbar + hero + chân trang bản quyền). Sửa nhanh một câu chữ thì có thể sửa thẳng cả hai bản; sửa nhiều thì luôn sửa `.md` rồi dựng lại để hai bản không lệch nhau. Riêng `implementation-notes.html` được biên soạn tay (bố cục theo lớp màu), không sinh tự động — sửa thủ công cả hai bản.
- **Thêm tuần/trang mới:** copy Week05.html làm khung (nó là trang mẫu chuẩn), đổi `data-week`, nội dung, và 2 link weeknav; thêm thẻ vào index.
- **Đổi câu hỏi quiz:** sửa markup `.qz-item` (đổi `data-answer`, nội dung, giải thích) — engine tự nhận, không đụng JS. Giữ đúng 4 lựa chọn A–D.
- **Muốn tách hẳn nội dung mentor khỏi học viên:** cách một dòng: thêm `?mentor` gate trong app.js (đọc query string thay vì toggle); cách triệt để: script tách các khối `.mentor-only` ra file WeekNN-mentor.html — cấu trúc class hiện tại cho phép làm tự động.
- **Đổi thời lượng project:** `GREEN_TICKS ≤ 15` do timer 4 bit — muốn dài hơn phải nới `time_left`/timer (đúng bài EQ→RQ của W9, có thể dùng làm bài tập thật).
- **Kiểm định lại sau khi sửa:** ba lớp kiểm dùng trong dự án này đều là script chạy lại được (cấu trúc Python / Playwright / iverilog) — mô tả đủ trong VALIDATION_REPORT để tái lập.

## 6. Giới hạn đã biết
- Chưa chạy synthesis trên tool FPGA thật (số liệu tài nguyên trong bài là ước lượng giảng dạy; RTL thuộc tập synthesizable chuẩn).
- Tiến độ localStorage là theo-máy-theo-trình-duyệt; không có tài khoản/đồng bộ.
- Trang đã kiểm trên Chromium; Firefox/Safari chưa kiểm trực tiếp (rủi ro thấp — HTML/CSS chuẩn, không API lạ).
- Nội dung mentor có thể bị học viên xem qua toggle (đánh đổi có chủ đích — xem mục 2.14).

## 7. Đợt rà soát học thuật 08/08/2026 — bản chất vấn đề

Mục này ghi lại **vì sao** các lỗi của đợt rà soát cuối tồn tại được, chứ không chỉ liệt kê chúng (danh sách đầy đủ ở `VALIDATION_REPORT.md` §6b).

**7.1 Lỗi "nói tắt đúng hướng nhưng sai chi tiết".** Đây là nhóm đông nhất và khó thấy nhất. Câu "`initial` không tổng hợp được" đúng về *ý định dạy* (đừng dùng `initial` để khởi tạo phần cứng) nhưng sai về *sự thật* (tool FPGA có nhận `initial`). Câu "`4'd16` bị cắt thành 0 nên điều kiện không bao giờ khớp" đúng nửa đầu, sai hẳn nửa sau. Người viết đúng bản chất trong đầu vẫn viết ra câu sai, vì câu nói tắt nghe trôi chảy. **Cách chặn duy nhất tin được là chạy thử**, không phải đọc lại. Mọi khẳng định về hành vi ngôn ngữ trong khóa này giờ đều có một đoạn mô phỏng đối chứng.

**7.2 Lỗi hình vẽ là lỗi hệ thống, không phải lỗi lẻ.** Đợt trước người dùng chỉ ra ba sơ đồ thiếu nối kết. Sửa ba hình đó là chưa đủ: đợt này quét lại toàn bộ hình thì còn hai chỗ nữa cùng đúng một kiểu thiếu (nhánh rẽ của `tick`, đường phản hồi `tx_busy`, `clk`/`rst_n` chỉ vẽ tới khối đầu). Nguyên nhân chung: hình ASCII vẽ tốt luồng chính, nhưng **fan-out và feedback thì không có chỗ để vẽ**, nên chúng lặng lẽ biến mất. Kết luận đã áp dụng: nơi nào cần đặc tả chính xác thì dùng **bảng** (mỗi dòng một dây, có nguồn và mọi đích) hoặc **SVG vẽ theo netlist**; ASCII chỉ dùng cho hình gợi ý có ghi rõ nó là gợi ý.

**7.3 Lỗi "tỉ số thay vì hiệu số".** Bảng chi phí FPGA/ASIC bỏ phần NRE thiết kế chung khỏi cả hai cột — hợp lệ, vì nó triệt tiêu khi lấy hiệu. Nhưng cột kết luận lại ghi "rẻ hơn 80 lần", mà tỉ số **không** bất biến với đại lượng vừa bỏ đi. Bài học tổng quát đáng dạy hơn cả con số: *chỉ phát biểu đại lượng nào bất biến với giả định mình vừa đặt ra* — nay đã viết thẳng vào W8 §C3.

**7.4 Lỗi tài liệu tự mâu thuẫn.** Khi cùng một sự thật được viết ở 3–5 nơi, sửa một nơi tạo mâu thuẫn ở bốn nơi còn lại. Ba ví dụ trong đợt này: khuôn FSM của `uart_tx` (W6, W11 mở đầu, ghi chú mentor W11), invariant an toàn (W2, W8, W9, PROJECT_GUIDE), phạm vi bảng tín hiệu (§2.4 vs §2.5/§2.6). Cách chặn đã áp dụng: **một nguồn sự thật duy nhất** — `PROJECT_GUIDE` §2.4 cho tín hiệu, tuyên bố thẳng "khi hình và bảng khác nhau, lấy bảng làm gốc"; mọi nơi khác trỏ về đó thay vì chép lại.

**7.5 Lỗi trong chính bản sửa.** Vòng kiểm ngược tìm ra 15 lỗi nữa, 5 trong số đó nằm trong các đoạn vừa viết lại ở vòng một (ví dụ: đoạn sửa về `x + 1` giải thích đúng luật 32 bit rồi lại minh họa bằng `x + 1'b1` — trường hợp *không* áp dụng luật đó). Đây là lý do quy trình bảo trì ở mục 5 nay yêu cầu: sửa xong phải kiểm ngược chính bản sửa, và kiểm bằng công cụ chứ không bằng đọc lại.

**7.6 Mô hình tham chiếu phải hỏng ồn ào.** Testbench W10 §C5 để sẵn bảng giải mã thiếu hàng cho học viên chép nốt, với `default` trả về một mẫu 7 đoạn trông hợp lệ. Hậu quả: học viên chạy thử sẽ thấy hàng loạt `$error` và kết luận **RTL** sai, trong khi lỗi ở testbench. Đã đổi `default` thành trả `x` kèm thông báo riêng. Nguyên tắc này đã viết thành một mục học trong trang: trọng tài mà đoán thì hết là trọng tài.

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**  
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
