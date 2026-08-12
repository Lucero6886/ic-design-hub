# Báo cáo rà soát & đánh giá bộ tài liệu "IC Design Mentoring" (Version 1 và Version 2)

**Thư mục:** Lucero IC community v3 · **Ngày rà soát:** 07/08/2026
**Phạm vi:** 23 file HTML trong `version 1.zip` (11 file, tạo 09/07/2026) và `version2.zip` (12 file, tạo 10/07/2026)

---

## 1. Tóm tắt điều hành

Đây là bộ giáo trình 12 tuần nhập môn thiết kế vi mạch (IC Design) bằng tiếng Việt, gắn thương hiệu Phenikaa University, mỗi tuần là một trang HTML độc lập. Version 2 là bước nhảy vọt so với Version 1 cả về khối lượng lẫn chất lượng: từ dạng "phiếu điều phối buổi sinh hoạt 60 phút" (khoảng 1.300–1.600 từ/tuần, gần như không có nội dung giảng dạy) thành giáo trình tự học tương tác hoàn chỉnh (khoảng 6.300–10.100 từ/tuần, 18 section chuẩn, quiz chấm điểm tự động, code RTL chất lượng công nghiệp, rubric và ghi chú mentor).

Kết luận chính: **Version 2 nên là nền tảng cho version 3.** Version 1 thiếu hẳn Tuần 5 (Sequential Logic — mắt xích bắt buộc trước khi học FSM ở Tuần 6) và không đủ nội dung để tự học. Nội dung chuyên môn của Version 2 được kiểm chứng chi tiết trong đợt rà soát này và **chính xác ở mọi điểm đã kiểm** — kể cả các con số dễ sai (chia baud rate, sai số phần trăm, throughput UART). Các vấn đề còn lại của Version 2 chủ yếu là vấn đề đóng gói và đồng nhất hóa, không phải vấn đề nội dung.

---

## 2. Phương pháp rà soát

Toàn bộ 23 file được phân tích tự động về cấu trúc (section, tiêu đề, thành phần tương tác, liên kết) và được render thật bằng trình duyệt headless (Chromium) để bắt lỗi JavaScript khi tải trang và khi thao tác (bấm đáp án quiz, tick checklist, bấm nút demo). Chức năng chấm điểm quiz được kiểm thử tự động trên cả 5 biến thể cài đặt khác nhau tìm thấy trong Version 2. Về chuyên môn, tôi đọc thẩm định trực tiếp các phần nội dung trọng yếu: toàn bộ code SystemVerilog của Tuần 7 và Tuần 9, khái niệm cốt lõi và "lỗi kinh điển" của Tuần 5, các phép tính UART của Tuần 11, cùng cấu trúc quiz/đáp án của nhiều tuần.

---

## 3. Tổng quan bộ tài liệu

Lộ trình 12 tuần có cung sư phạm hợp lý, đi từ động lực đến thực hành:

| Tuần | Chủ đề | Nhóm |
|---|---|---|
| 1 | Why Semiconductor? Why IC Design? | Động lực & bức tranh ngành |
| 2 | From Idea to Chip (design flow) | Động lực & bức tranh ngành |
| 3 | Logic Gates in Real Systems | Nền tảng số |
| 4 | Combinational Logic Circuits | Nền tảng số |
| 5 | Sequential Logic & Memory *(chỉ có ở v2)* | Nền tảng số |
| 6 | Finite State Machines | Nền tảng số |
| 7 | What Is Verilog? | HDL |
| 8 | FPGA vs ASIC | Nền tảng thực thi |
| 9 | Traffic Light Controller | Mini-project |
| 10 | Counter & 7-Segment Display | Mini-project |
| 11 | UART Communication Basics | Mini-project |
| 12 | Course Wrap-up & Next Steps (mở Phase 2) | Tổng kết |

Thứ tự này đúng chuẩn nhập môn: không thể học FSM (T6) nếu chưa học mạch tuần tự (T5), và ba mini-project (T9–T11) đều tái sử dụng đúng kỹ thuật đã dạy (FSM 3 khối, counter, tick enable). Tuần 12 có quiz tổng hợp gắn nhãn từng tuần (T1, T2…) và định hướng Phase 2 (stopwatch, nhiệt độ + UART, đồng hồ số, vending machine) — nghĩa là bộ tài liệu được thiết kế có chủ đích như Phase 1 của một chương trình dài hơi.

---

## 4. Đánh giá Version 1

Version 1 gồm 11 file, mỗi file 52–62 KB, khoảng 1.300–1.600 từ. Bản chất của nó là **kịch bản điều phối một buổi sinh hoạt 60 phút**: checklist chuẩn bị, agenda buổi học, nhiệm vụ thuyết trình nhóm, hướng dẫn breakout room, từ vựng tiếng Anh chuyên ngành, lời khuyên mentor và hành động sau buổi học. Cách tiếp cận này phù hợp với mô hình "sinh viên tự thuyết trình, mentor dẫn dắt", nhưng gần như không có nội dung giảng dạy thực chất: cả bộ chỉ có 2 đoạn code (ở Tuần 7), không có quiz, không có rubric, demo tương tác rất mỏng (chủ yếu checkbox và 1–2 slider).

Vấn đề nghiêm trọng nhất: **thiếu hẳn file Week5.html**. Chuỗi file nhảy từ Week4 (mạch tổ hợp) sang Week6 (FSM), trong khi FSM đứng trên nền flip-flop, clock, thanh ghi — đúng phần bị thiếu. Ngoài ra các tuần không liên kết với nhau (không có nút chuyển tuần trước/sau, không trang mục lục), nên bộ tài liệu tồn tại như 11 trang rời rạc.

Điểm cộng của Version 1: sạch về kỹ thuật (không lỗi JavaScript khi render và thao tác), giọng văn thân thiện, và phần "Nhiệm vụ của nhóm" + "Tiến trình buổi học 60 phút" là thứ Version 2 kế thừa dưới dạng section Breakout/Active Learning. Một chi tiết chuyên môn được kiểm ngẫu nhiên — sơ đồ truyền ký tự 'A' (0x41) qua UART theo thứ tự LSB-first ở Tuần 11 — vẽ đúng chuỗi bit.

---

## 5. Đánh giá Version 2

### 5.1. Cấu trúc và khối lượng

Version 2 đủ 12 tuần, mỗi file 111–178 KB, khoảng 6.300–10.100 từ — gấp 4–6 lần Version 1. Mọi tuần dùng chung một khung 18 section theo đúng chu trình học tập: hero (mục tiêu) → learning map (vị trí trong lộ trình) → chuẩn bị trước buổi → **core concepts** (mỗi khái niệm trình bày theo 5 tầng: định nghĩa dễ hiểu → bản chất kỹ thuật → ví dụ đời sống → ví dụ trong IC/FPGA → lỗi hiểu sai phổ biến) → system view → demo tương tác → workflow → **code RTL** → waveform → active learning → breakout → **common mistakes** → mini-project → **quiz** → homework (3 mức khó) → **rubric tự đánh giá** → **mentor notes** → vocabulary (11–12 thuật ngữ Anh–Việt kèm câu ví dụ) → summary. Điều hướng tuần trước/tuần sau có ở cả 12 file và trỏ đúng 100% (đã kiểm từng liên kết).

Khung 5 tầng cho mỗi khái niệm và bộ ba "common mistakes – rubric – mentor notes" là điểm mạnh sư phạm nổi bật: tài liệu vừa dùng được cho sinh viên tự học, vừa dùng được cho mentor đứng lớp (mentor notes ghi rõ chỗ sinh viên hay vấp, câu vấn đáp nên hỏi kèm đáp án kỳ vọng).

### 5.2. Chất lượng chuyên môn (đã thẩm định trực tiếp)

Đây là phần đáng khen nhất của Version 2. Các nội dung tôi kiểm đều chính xác và — quan trọng hơn — dạy đúng **thói quen công nghiệp** ngay từ nhập môn:

Code Tuần 9 (Traffic Light) là một thiết kế mẫu mực: tách Controller/Datapath, FSM viết đúng kiểu 3 khối (state register dùng `<=`, next-state logic và output logic dùng `always_comb` có default trước `case` để chống latch), output Moore có default an toàn "đỏ cả hai hướng", timer nạp N−1, và đặc biệt là kỹ thuật **tick enable** kèm cảnh báo lặp lại nhiều lần "tuyệt đối không dùng `@(posedge tick)` hay lấy `cnt[25]` làm clock" — đúng nguyên tắc single-clock mà người mới hay vi phạm. Testbench đi kèm còn có **invariant check** tự động (`$error` nếu cả hai hướng cùng rời đèn đỏ) — một tư duy verification thật sự, hiếm gặp ở tài liệu nhập môn.

Tuần 7 (Verilog) dạy đúng các điểm khó về ngữ nghĩa: tính song song của `assign` (đảo thứ tự dòng không đổi phần cứng), `reg` không đồng nghĩa thanh ghi vật lý, latch vô tình do thiếu default, `#delay` không tổng hợp được và lời giải thay thế bằng counter (hằng số 24_999_999 cho 0,5 s @ 50 MHz — đúng). Tuần 5 xử lý đúng blocking/non-blocking, gated clock vs clock enable, quy tắc ⌈log₂N⌉ flip-flop.

Tuần 11 (UART) được kiểm toàn bộ số liệu: bit time 104,17 µs @ 9600 và 8,68 µs @ 115200 (đúng); DIV = 5208 @ 50 MHz/9600, DIV = 434 @ 115200, DIV = 2813 @ 27 MHz/9600 với sai số 0,006%/0,018% (đúng cả); và bài toán throughput tính **đúng cả overhead khung 10 bit**: 2000 byte/s = 16.000 bit dữ liệu nhưng 20.000 bit trên dây, nên 19200 baud không đủ, phải chọn 38400 — chi tiết mà nhiều tài liệu làm sai. Giải thích oversampling ×16 và lấy mẫu giữa bit cũng chuẩn.

### 5.3. Kiểm thử chức năng

Cả 12 trang render không phát sinh lỗi JavaScript. Quiz của cả 5 biến thể cài đặt đều chấm điểm đúng: khi máy chọn toàn bộ đáp án được đánh dấu đúng, hệ thống trả về 10/10 (hoặc 9/9); khi chọn bừa, điểm và phản hồi sai/đúng hiển thị tương ứng. Mỗi câu hỏi có đúng một đáp án đúng. Chất lượng câu hỏi tốt — hỏi bản chất và tình huống ("vì sao tách Controller khỏi Datapath", "tick là enable hay clock") chứ không hỏi thuộc lòng.

---

## 6. So sánh trực tiếp hai phiên bản

| Tiêu chí | Version 1 | Version 2 |
|---|---|---|
| Số tuần | 11/12 — **thiếu Tuần 5** | 12/12 |
| Dung lượng/tuần | 52–62 KB · ~1.300–1.600 từ | 103–167 KB · ~6.300–10.100 từ |
| Bản chất | Phiếu điều phối buổi học 60' | Giáo trình tự học + tài liệu mentor |
| Cấu trúc | 9 mục, không đồng nhất id | 18 section chuẩn, lặp lại đủ 12 tuần |
| Code RTL | 2 snippet (chỉ T7) | Có ở hầu hết các tuần, chất lượng công nghiệp, comment tiếng Việt |
| Quiz | Không có | 9–10 câu/tuần, chấm điểm tự động, hoạt động tốt |
| Rubric, mentor notes, common mistakes | Không có | Đủ ở cả 12 tuần |
| Từ vựng chuyên ngành | Có (dạng thẻ) | 11–12 thuật ngữ/tuần kèm câu ví dụ tiếng Anh |
| Điều hướng giữa các tuần | Không | Prev/next đúng 100%, chưa có trang mục lục |
| Lỗi JS khi render/thao tác | 0 | 0 |

---

## 7. Các vấn đề phát hiện (xếp theo mức độ)

### Mức cao — nên xử lý trước khi phát hành v3

**(1) Phụ thuộc hoàn toàn vào Internet/CDN.** Cả hai phiên bản tải Tailwind qua Play CDN (`cdn.tailwindcss.com`), FontAwesome và Google Fonts lúc chạy. Mở file khi không có mạng (hoặc CDN bị chặn) thì trang mất toàn bộ layout — tôi đã tái hiện đúng hiện tượng này khi render trong môi trường chặn CDN. Play CDN cũng là công cụ dev, chính Tailwind khuyến cáo không dùng cho sản phẩm. Với đối tượng sinh viên hay học offline/mạng yếu, đây là rủi ro thực tế. Hướng xử lý: build Tailwind ra một file CSS tĩnh nhúng thẳng vào trang (hoặc dùng chung 1 file css), thay FontAwesome bằng SVG inline, self-host font.

**(2) Version 1 thiếu Tuần 5.** Nếu vẫn còn ý định dùng v1 ở bất kỳ vai trò nào, cần bổ sung; còn nếu v3 xây trên v2 thì coi như v1 đã hết vai trò, chỉ giữ làm tham khảo cho format "tiến trình buổi học 60 phút".

### Mức trung bình — ảnh hưởng trải nghiệm và bảo trì

**(3) Không lưu tiến độ.** Không phiên bản nào lưu trạng thái (không dùng localStorage): tải lại trang là mất hết tick checklist, điểm quiz, lựa chọn rubric. Với tài liệu tự học 12 tuần, việc nhớ tiến độ giữa các lần mở là tính năng đáng đầu tư nhất về UX.

**(4) Thiếu trang mục lục (index/hub).** V2 chỉ có prev/next; sinh viên không có một trang nhìn thấy toàn bộ 12 tuần, trạng thái đã học/chưa học, và mô tả ngắn từng tuần.

**(5) Version 2 không đồng nhất về cài đặt giữa các tuần** — dấu hiệu các file được sinh theo từng đợt khác nhau: ít nhất 5 biến thể engine quiz (đánh dấu `data-correct` trên nút, `data-answer` bằng chữ cái, `data-answer` bằng chỉ số, render từ mảng `quizData` rồi bấm "Chấm điểm"…); Tuần 4 và Tuần 10 chỉ có 9 câu trong khi các tuần khác 10 câu; tiêu đề quiz mỗi tuần một kiểu; giải thích đáp án từng câu có tuần đầy đủ (T1, T9) có tuần gần như không có (T11, T12); format `<title>` khác nhau (T4–T6 dùng dấu ":" và tên song ngữ, các tuần khác dùng "—"); một số tuần thiếu `id="hero"`. Tất cả đều không lộ ra với người học, nhưng sẽ làm việc bảo trì/cập nhật v3 tốn công gấp nhiều lần. Hướng xử lý: chuẩn hóa một template + một quiz engine dùng chung, đưa nội dung câu hỏi về một định dạng dữ liệu thống nhất.

### Mức thấp — ghi nhận để cân nhắc

**(6) Tên gọi "Verilog" nhưng code là SystemVerilog** (`logic`, `always_ff`, `always_comb`). Về sư phạm đây là lựa chọn đúng (chống latch, ý định rõ), và Tuần 7 có giải thích quan hệ `reg`/`logic`, nhưng v3 nên nói rõ ngay đầu Tuần 7 rằng "ta viết SystemVerilog — hậu duệ trực tiếp của Verilog" để sinh viên không bối rối khi đọc tài liệu ngoài. Cần lưu ý một số công cụ miễn phí đời cũ (Icarus Verilog mặc định) cần bật cờ SystemVerilog mới biên dịch được các ví dụ.

**(7) Thương hiệu:** tất cả 23 file đều gắn Phenikaa University; tên "Lucero" chỉ xuất hiện ở tên thư mục. Nếu v3 phát hành dưới danh nghĩa cộng đồng Lucero, cần rà lại phần branding.

**(8) Trang dài** (Tuần 12 tới ~10.000 từ, 178 KB). Chấp nhận được với dạng tài liệu tuần, nhưng nếu thêm tính năng lưu tiến độ thì nên kèm nút "thu gọn section" để đỡ ngợp.

---

## 8. Khuyến nghị cho Version 3 (theo thứ tự ưu tiên)

1. **Chọn Version 2 làm nền**, khai tử v1 (giữ lại làm tư liệu tham khảo format buổi học).
2. **Đóng gói offline-first:** CSS tĩnh dùng chung, icon SVG inline, font self-host — bảo đảm mở file là chạy, không cần mạng.
3. **Chuẩn hóa template:** một quiz engine duy nhất (thống nhất 10 câu/tuần, giải thích đáp án cho từng câu ở cả 12 tuần), thống nhất format tiêu đề, đủ `id` cho mọi section.
4. **Thêm trang `index.html`** làm hub 12 tuần + lưu tiến độ bằng localStorage (checklist, điểm quiz, rubric) — hai tính năng này cộng hưởng với nhau.
5. Cân nhắc **tách hoặc thu gọn phần Mentor Notes** khỏi giao diện sinh viên (toggle "chế độ mentor") để trang sinh viên gọn hơn.
6. Bổ sung ghi chú SystemVerilog/công cụ ở Tuần 7 và hướng dẫn cài đặt một toolchain miễn phí thống nhất cho cả khóa.

---

## 9. Phụ lục — số liệu từng tuần (Version 2)

| Tuần | Kích thước | Số từ | Quiz | Từ vựng | Rubric (tiêu chí) |
|---|---|---|---|---|---|
| 1 | 112,6 KB | 7.611 | 10 câu | 12 | 5 |
| 2 | 116,0 KB | 6.292 | 10 câu | 11 | 5 |
| 3 | 123,4 KB | 6.840 | 10 câu | 12 | 5 |
| 4 | 118,3 KB | 6.958 | 9 câu | 12 | 5 |
| 5 | 117,6 KB | 6.602 | 10 câu | 12 | 5 |
| 6 | 146,3 KB | 8.888 | 10 câu | 12 | 7 |
| 7 | 111,2 KB | 6.422 | 10 câu | 12 | 5 |
| 8 | 112,1 KB | 6.784 | 10 câu | 12 | 5 |
| 9 | 145,1 KB | 9.482 | 10 câu | 12 | 7 |
| 10 | 124,1 KB | 7.059 | 9 câu | 12 | 6 |
| 11 | 143,4 KB | 8.389 | 10 câu | 12 | 6 |
| 12 | 178,3 KB | 10.088 | 10 câu | 12 | 4 |

Version 1 (tham chiếu): 11 file, 52,3–62,5 KB, 1.294–1.604 từ/tuần, không quiz, 2 đoạn code duy nhất ở Tuần 7, thiếu Tuần 5.

*Ghi chú: số từ đếm trên phần văn bản hiển thị (đã loại mã script/style); "Quiz" đã kiểm thử chấm điểm tự động; toàn bộ liên kết tuần trước/sau ở v2 đã xác minh trỏ đúng file.*
