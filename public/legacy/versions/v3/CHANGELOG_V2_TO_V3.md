# CHANGELOG — Version 2 → Version 3

Chỉ ghi các thay đổi có ý nghĩa, nhóm theo 7 hạng mục của đặc tả. Chi tiết hiệu chỉnh kỹ thuật: xem `TECHNICAL_AUDIT.md`. Chi tiết quyết định triển khai: xem `implementation-notes.md`.

## 1. Curriculum (chương trình)
- Giữ khung 12 tuần và trình tự chủ đề của v2 (đã hợp lý), với 2 thay đổi lớn:
  - **Tuần 7 đổi tên và đổi vai**: "What Is Verilog?" → **"Writing Clean RTL in SystemVerilog"**. T1–T6 được thiết kế lại thành *guided exposure* (RTL peek T1–T3, RTL guided T4–T6) để T7 là tuần **hệ thống hóa kỷ luật viết RTL**, không phải lần đầu gặp HDL.
  - **Tuần 9–11 hợp nhất thành MỘT project tích hợp** "Smart Traffic Controller FPGA System" (v2 là 3 bài rời): T9 FSM+timer → T10 nối display → T11 nối UART, trên một hợp đồng interface cố định (`phase`, `time_left` xuất sẵn từ T9). Tuần 12 bảo vệ chính hệ này.
- **Tuần 12 đổi bản chất**: từ trang ôn tập lý thuyết dài nhất khóa (v2: 178 KB) thành tuần capstone ngắn nhất (~34 KB): mini-defense, portfolio 12 mục, phiếu bảo vệ, 5 track Phase 2, chu trình nghiên cứu.
- Chuẩn đầu ra Phase 1 được phát biểu nguyên văn, nhất quán ở index, Week12 và CURRICULUM_MAP; loại bỏ mọi tuyên bố "đủ 100%".
- Thêm `CURRICULUM_MAP.md`: bảng 12 tuần × (câu hỏi cốt lõi, khái niệm, kỹ năng, artifact, đóng góp project, kết nối nghiên cứu, tiên quyết, phụ thuộc tuần sau) + 6 vòng xoáy học tập.

## 2. Pedagogy (sư phạm)
- **Kiến trúc 4 lớp** thay cho trang một-mạch-dài của v2: A Trước buổi (15–25′, không yêu cầu đọc cả bài) · B Buổi mentoring 60′ (timeline 6 bước cố định 0-5/5-15/15-25/25-45/45-55/55-60) · C Technical Lab (deep dive gập/mở — toàn bộ chiều sâu kỹ thuật dồn về đây) · D Sau buổi (quiz 5 câu, bài tập bắt buộc + nâng cao, rubric, phản tư).
- Nguyên tắc áp dụng xuyên suốt: **predict-before-simulate** (widget/wr ở mọi tuần), **learn-by-explaining** (phần 5–15′ tuần nào cũng là học viên trình bày), **debug-before-answers** (bài "săn bug" cài lỗi chủ đích ở W4, W5, W7, W9), **design-before-code** (breakout thiết kế giấy trước khi chạm code — đặc biệt W6, W9), **hardware thinking** (chuỗi "phần cứng nào được suy ra?" ở mọi RTL frame + drill riêng W7).
- **Tổng kết tuần chuẩn hóa đúng 6 ô**: I can explain / I can design / I can verify / I can connect / I am still unsure (ô nhập tự lưu) / Next week.
- **Câu hỏi quiz đổi chất**: 5 câu/tuần thiên về dự đoán–suy luận–"điều gì đổi nếu", mỗi câu có giải thích trỏ về đúng mục Layer C; bỏ kiểu 10 câu nhớ định nghĩa của v2.
- **Cầu nối nghiên cứu** đưa vào có lộ trình: EQ→RQ từ T6; giải phẫu paper T7; bài đọc abstract+diagram đầu tiên T8; research question từ chính project T9–T11; chu trình observation→…→conclusion + 5 track ở T12. (v2 không có tuyến này.)

## 3. Technical correctness (chính xác kỹ thuật)
- 8 nhóm hiệu chỉnh 5.1–5.8 thực hiện đầy đủ, đánh dấu bằng callout "Hiệu chỉnh kỹ thuật so với v2" ngay trong bài: khởi tạo FF theo công nghệ & reset là quyết định kiến trúc (5.1); mã hóa FSM thuộc quyền công cụ (5.2); wire/reg/logic chính xác (5.3); synthesis = netlist tương đương đã tối ưu (5.4); kinh tế FPGA/ASIC không còn "NRE = 0"/"vài xu", mọi số dán nhãn minh họa (5.5); synchronizer giảm xác suất, không triệt tiêu metastability (5.6); "2%" chuyển thành guideline kèm các yếu tố phụ thuộc (5.7); bỏ "100% mảnh ghép", thêm danh sách chủ đề nâng cao phía trước (5.8). Chi tiết từng trích dẫn gốc: `TECHNICAL_AUDIT.md`.
- Nhất quán hóa reset toàn khóa: `rst_n` bất đồng bộ mức thấp (v2 lẫn `rst` đồngng bộ ở W7).

## 4. Project integration (tích hợp project)
- Interface hợp đồng cố định công bố từ W9: `traffic_ctrl(clk, rst_n, tick → ns_light, ew_light, phase, time_left)`; W10/W11 chỉ nối thêm, không sửa module cũ.
- RTL mới cho tuyến tích hợp: `traffic_ctrl` (mở rộng từ v2, thêm `phase`/`time_left`), `seg7_decoder`, `display_mux` (W10), `uart_tx`, `status_tx`, `traffic_system_top` (W11). Toàn hệ MỘT clock; mọi nhịp chậm là clock-enable.
- Verification leo thang theo tuần: testbench đầu tiên (T5) → invariant an toàn chạy mọi cạnh (T9) → self-check seg vs bảng giải mã (T10) → đo start bit bằng đếm chu kỳ + test race start/busy (T11).
- `PROJECT_GUIDE.md` mới: spec hệ thống, kiến trúc, interface từng module, milestone 3 tuần, verification plan, rubric.

## 5. Mentor usability (khả dụng cho mentor)
- Mỗi tuần có **Mentor Session Guide** hiển thị công khai (timeline 60′) + **khối mentor-only** bật bằng công tắc "Mentor" (lưu lựa chọn), đủ 6 phần theo đặc tả: mục tiêu, hiểu sai kinh điển, câu chẩn đoán → đáp án tốt → hỏi tiếp, cứu nguy, mở rộng học viên giỏi, ghi chú nhịp buổi học.
- `MENTOR_GUIDE.md` mới: cách chuẩn bị, cách dùng khung 60′, kỹ thuật chẩn đoán hiểu sai, tránh giảng một chiều, xử lý lớp lệch trình độ, đánh giá tiến độ project, chuyển dần sang mentoring nghiên cứu.

## 6. Interface (giao diện & hạ tầng)
- **Bỏ toàn bộ phụ thuộc CDN** (v2 cần Tailwind Play CDN + FontAwesome + Google Fonts — mất mạng là vỡ trang): v3 dùng `css/style.css` + `js/app.js` cục bộ, font hệ thống, icon emoji/SVG inline. Mở file là chạy, offline hoàn toàn.
- **Một engine quiz duy nhất** (v2 có ≥5 biến thể khác nhau giữa các tuần) + **lưu tiến độ localStorage** (checklist, điểm quiz, ô phản tư, chế độ mentor) — v2 mất trắng khi tải lại trang.
- Thêm **index.html** làm hub 12 tuần kèm tiến độ quiz mỗi tuần (v2 không có mục lục).
- Widget tương tác chuẩn hóa thành thư viện dùng chung: counter stepper, 7-segment, FSM stepper (config JSON), traffic phase stepper, truth-table điền ô, predict-reveal, bug hunt, UART frame builder. Mỗi widget gắn với đúng một khái niệm cần dạy.
- **Sơ đồ kiến trúc vẽ bằng SVG** thay cho ASCII art: hai hình (`fig-system-top`, `fig-controller-datapath`) vẽ đúng theo netlist RTL, có chú giải quy ước đọc sơ đồ (chiều mũi tên, độ rộng bit, chấm nối/không nối, đường phản hồi), kèm **bảng liên kết tín hiệu** làm đặc tả chuẩn. Dùng lại ở PROJECT_GUIDE §2, Week09 và Week11.
- Kích thước trang giảm mạnh: v2 ≈ 111–178 KB/tuần; v3 ≈ 33–47 KB/tuần (chưa kể css/js dùng chung tải một lần) — chiều sâu kỹ thuật giữ trong Layer C dạng gập/mở.

## 7. Assessment (đánh giá)
- **Rubric thống nhất 5 tiêu chí × trọng số cố định**: Hiểu khái niệm 25% · Kiến trúc 20% · RTL đúng 20% · Verification 20% · Giao tiếp kỹ thuật 15% (tuần 1–3 điều chỉnh nhãn cho phù hợp artifact không-code); kèm nguyên tắc "code chạy được chưa phải điểm tối đa".
- Mọi bài tập có **deliverable liệt kê tường minh** (file gì, ảnh gì, mấy dòng giải thích) — loại bỏ dạng "tìm hiểu thêm về X".
- Tuần 12: rubric bảo vệ + ngân hàng 10 câu vấn đáp công khai trước + portfolio 12 mục + format trình bày 10 slide.

## 8. Rà soát học thuật sau phát hành (08/08/2026)

Sau khi v3 hoàn tất, người dùng yêu cầu rà soát lại **toàn bộ** nội dung theo tiêu chí "chuẩn học thuật, dễ hiểu, nắm bản chất, chính xác — tránh lỗi học thuật và rườm rà". Đợt này sinh **40 hiệu chỉnh**, chi tiết từng mục ghi ở `VALIDATION_REPORT.md` §6b. Bốn nhóm chính:

1. **Khẳng định sai về ngôn ngữ** — chủ yếu quanh luật độ rộng bit và tính tổng hợp được. Ví dụ nặng nhất: W5 mô tả hậu quả của `count == 4'd16` **ngược hẳn** thực tế (hằng bị cắt thành 0 nên counter đứng yên tại 0, chứ không chạy tự do 0…15). Mọi khẳng định loại này giờ đều có mô phỏng đối chứng bằng iverilog.
2. **Sơ đồ/waveform lệch RTL** — tiếp nối lỗi người dùng phát hiện ở đợt trước. Đã quét lại **toàn bộ** hình trong khóa, không chỉ ba hình bị báo: waveform W9 vẽ pha xanh dài 7 nhịp trong khi hàng `time_left` ngay trên đọc 6; sơ đồ W10 §C1 và hình ASCII trong `CURRICULUM_MAP` vẫn thiếu nhánh. Hình ASCII trong `CURRICULUM_MAP` bị **bỏ hẳn** và thay bằng bảng netlist mỗi dòng một dây — cùng lý do người dùng nêu ban đầu: hình ASCII dễ nuốt mất nhánh rẽ mà người đọc không thấy.
3. **Mô hình kinh tế và quy trình** — bảng chi phí FPGA/ASIC phát biểu bằng **tỉ số**, nhưng tỉ số không bất biến với phần NRE chung đã bỏ khỏi phép tính (hiệu số thì bất biến). Đổi sang hiệu số và giải thích tại chỗ vì sao. Thêm: "physical implementation và STA chỉ ASIC mới có" là sai — FPGA cũng có, chỉ **DFT** là mới.
4. **Tài liệu tự mâu thuẫn** — `uart_tx` được ba nơi mô tả là "đúng khuôn FSM 3 khối" trong khi RTL cố ý gộp một khối; invariant an toàn bị phát biểu yếu đi ở W2/W8 so với thứ testbench thật kiểm; `PROJECT_GUIDE` giải thích cơ chế bắt tay **ngược chiều nhân quả**; `MENTOR_GUIDE` chỉ mentor tìm RTL ở tài liệu không chứa RTL.

**Ghi chú phương pháp — điểm đáng lưu lại nhất của đợt này:** vòng rà soát thứ hai (kiểm chính các đoạn vừa viết lại ở vòng một) phát hiện thêm 15 lỗi, **trong đó 5 lỗi nằm ngay trong bản sửa của vòng một**. Bản sửa không tự động đúng hơn bản gốc. Quy trình đề nghị cho mọi lần cập nhật sau: sửa → kiểm ngược chính bản sửa → chứng minh bằng công cụ (mô phỏng/script) chứ không bằng lập luận.

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**  
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
