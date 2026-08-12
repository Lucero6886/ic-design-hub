# MENTOR_GUIDE — Cẩm nang vận hành chương trình cho mentor

Đối tượng: mentor dẫn buổi 60 phút hằng tuần (kỹ sư/giảng viên/anh chị đi trước). Nguyên tắc gốc của Version 3: **mentor điều phối để học viên tự giải thích và tự thiết kế** — không phải giảng lại giáo trình.

## 1. Chuẩn bị mỗi tuần (20–30 phút cho T1–T8; 60–90 phút cho T9–T11 vì phải chạy trước mô phỏng)

1. Mở trang tuần, bật công tắc **Mentor** (góc phải thanh tiêu đề) — mọi ghi chú riêng cho bạn hiện ra ngay trong ngữ cảnh bài học.
2. Đọc **Layer B** (timeline 60′ + mentor box). Đây là kịch bản chạy buổi — bạn KHÔNG cần đọc hết Layer C để đứng lớp; Layer C là nơi tra cứu khi học viên hỏi sâu.
3. Làm trước **quiz 5 câu** (Layer D) — nó cho bạn biết tuần này "ăn điểm" ở khái niệm nào.
4. Chuẩn bị vật liệu buổi học nếu timeline yêu cầu (in đoạn RTL lỗi cho tuần 7, giấy A3 cho tuần vẽ diagram…). Mỗi timeline 25–45′ ghi rõ artifact nhóm phải nộp cuối giờ.
5. Với tuần 9–11: chạy trước mô phỏng của chính bạn một lần để chắc chắn demo được khi cần "cứu". RTL đầy đủ nằm ở Layer C của `Week09/Week10/Week11.html`; `PROJECT_GUIDE.md` chỉ có đặc tả, bảng interface và verification plan.

## 2. Cách dùng khung 60 phút

Khung 6 bước cố định mọi tuần — giữ đúng nhịp quan trọng hơn dạy thêm nội dung:

| Khung giờ | Việc | Nguyên tắc cho mentor |
|---|---|---|
| 0–5′ | Retrieval tuần trước | Hỏi nhanh, gọi ngẫu nhiên, không chấm điểm. Trả lời sai = dữ liệu tốt, đừng sửa vội — ghi lên bảng. |
| 5–15′ | Học viên giải thích | Im lặng nhiều nhất có thể. Chỉ hỏi "vì sao?", "ví dụ?". Đừng gật đầu sớm với câu trả lời đúng — để lớp phán xét. |
| 15–25′ | Mentor sửa & giảng sâu | Chỉ sửa những hiểu sai ĐÃ lộ ra + 3 điều bắt buộc đúng của tuần (ghi sẵn trong timeline). Tối đa 10 phút nói liên tục. |
| 25–45′ | Active design / breakout | Lõi của buổi. Đi từng nhóm, hỏi — không cho đáp án. Mỗi nhóm phải ra ARTIFACT (tờ giấy có diagram/bảng/waveform dự đoán). |
| 45–55′ | Chia sẻ & tranh luận | Cho các nhóm chất vấn nhau trước; bạn chỉ trọng tài và nêu câu hỏi ép suy nghĩ có sẵn trong timeline. |
| 55–60′ | Chốt & giao việc | Đúng công thức: 1 điều phải nhớ, 1 hiểu sai phải tránh, 1 artifact phải nộp trước buổi sau. |

## 3. Chẩn đoán hiểu sai — kỹ thuật cốt lõi

Mỗi mentor box có sẵn bộ: **câu chẩn đoán → đáp án tốt → câu hỏi tiếp → cứu nguy → mở rộng**. Cách dùng:

- **Hỏi chẩn đoán** ("D đổi giữa hai cạnh clock, Q ra sao?") — câu được thiết kế để phân biệt hiểu-thật với thuộc-lòng.
- Trả lời đúng → **hỏi tiếp** (câu sâu hơn một nấc). Trả lời trôi chảy cả hai → dùng **mở rộng học viên giỏi**.
- Bí → dùng **cứu nguy** (một hình ảnh đời thường đã soạn sẵn), rồi hỏi lại câu gốc bằng từ của học viên.
- Nghe LÝ DO, đừng nghe thuật ngữ: "em không chắc, nhưng em nghĩ vì FF chỉ chụp tại cạnh…" đáng giá hơn một tràng định nghĩa đúng.

Dấu hiệu hiểu sai phổ biến toàn khóa cần bắt sớm: nghĩ RTL chạy tuần tự như C (T4–T7); nhầm latch với FF (T5); tạo latch ngoài ý muốn khi thiếu default trong `always_comb` (T4, T7); nhét thời gian vào state (T6, T9); coi "compile sạch/mô phỏng pass" là xong (T7–T11); muốn chế clock chậm thay vì dùng enable (T9–T11).

## 4. Tránh giảng một chiều

- Quy tắc 10 phút: không nói liên tục quá 10 phút — timeline đã ép sẵn điều này.
- Đổi "để thầy giải thích" thành "nhóm nào giải thích được chỗ này?". Đổi "đúng rồi" thành "vì sao em chắc?".
- Khi học viên hỏi một câu hay ngoài phạm vi (CDC, STA…): trả lời 2 câu + chỉ vào danh sách "chủ đề phía trước" (T8/T12) + gợi thành research question nếu hợp (mẫu EQ→RQ có từ T6).

## 5. Lớp lệch trình độ

- Ghép nhóm 2–3 người trộn trình độ; vai trò luân phiên (người vẽ, người phản biện, người trình bày).
- Nhóm nhanh: mỗi timeline 25–45′ đều có bài mở rộng trong mentor box (vd T9: pha all-red; T7: multiple drivers). Đừng phát thêm lý thuyết — phát thêm bài thiết kế.
- Học viên đuối: giao lại đúng phần Layer A + 2 câu tự chẩn đoán của tuần trước; hẹn 15′ trước buổi sau; KHÔNG hạ chuẩn artifact — hạ phạm vi (counter mod-6 thay vì mod-10) nhưng vẫn đủ chuỗi dự đoán→mô phỏng→đối chiếu.

## 6. Đánh giá tiến độ project (T9–11)

- Chấm theo rubric 5 tiêu chí in ở Layer D mỗi tuần (25/20/20/20/15). Nguyên tắc: **code chạy chưa phải điểm tối đa** — phải giải thích được.
- Mốc phải đạt: cuối T9 — traffic_ctrl mô phỏng pass invariant; cuối T10 — hệ ghép display, waveform giải thích được thời điểm seg đổi; cuối T11 — top mô phỏng ra frame UART đúng, (nếu có board) terminal in dòng trạng thái.
- Nhóm trễ mốc: cho dùng RTL chuẩn của mốc trước làm nền để đi tiếp (không phạt điểm tích hợp), nhưng module đó vẫn phải **gõ lại tay** trước buổi bảo vệ — nếu không, phần "RTL đúng" ở T12 chấm 0 và ghi rõ lý do, nhưng phần vấn đáp T12 vẫn hỏi như thường — hiểu mới là thứ được chấm.
- Interface là hợp đồng: nhóm nào muốn sửa `traffic_ctrl` ở T10/T11 → dừng lại hỏi "có cách nào KHÔNG sửa không?" — đây là bài học tích hợp quan trọng nhất.

## 7. Chuyển dần sang mentoring nghiên cứu

Lộ trình đã cài trong giáo trình — việc của mentor là kích hoạt đúng lúc:

- T6–T8: khi học viên hỏi "chọn cái nào tốt hơn?", trả lời bằng khung EQ→RQ: "đó là một câu hỏi đo được — đo bằng gì?".
- T8: bài đọc abstract + system diagram đầu tiên (4 câu hỏi định vị). Chấm "trả lời có bằng chứng từ bài báo", không chấm ý kiến.
- T9–T11: mỗi tuần một EQ→RQ gắn với chính hệ của học viên (T9 độ rộng timer, T10 tần số quét, T11 kiến trúc UART; chiến lược reset là EQ→RQ của T7). Khuyến khích nhóm chọn MỘT câu để làm thí nghiệm nhỏ, **đo bằng thứ đã có**: số FF suy ra được từ RTL, số chu kỳ đếm trên waveform, độ dài khung. Nhóm nào có tool và muốn so báo cáo synthesis thì coi là bài bắc cầu Phase 2 — chấm phần *thiết kế thí nghiệm*, không chấm con số (đọc utilization/timing report chưa thuộc phạm vi Phase 1).
- T12: học viên viết research question 7 dòng theo chu trình observation → limitation → question → hypothesis → experiment → evidence → conclusion, và chọn track Phase 2. Vai trò mentor: kiểm tra câu hỏi có ĐO ĐƯỢC không, có baseline công bằng không — chưa cần mới lạ.

## 8. Mini-defense tuần 12

- Học viên thấy trước ngân hàng 10 câu (Layer B tuần 12) — công khai là chủ đích: luyện giải thích, không phải đánh úp.
- Mỗi thành viên trả lời ít nhất 1 câu. Khung 60′ chỉ đủ cho tối đa 4 nhóm (≈12 học viên) — lớp đông hơn thì tách hai ca bảo vệ, hoặc rút demo còn 90 giây và chuyển bớt câu hỏi sang nhận xét viết. Chấm theo rubric bảo vệ (Layer D T12): lý do > thuật ngữ; "em không biết, nhưng em sẽ kiểm bằng cách…" là câu trả lời tốt.
- Kết buổi bằng kế hoạch cá nhân Phase 2 (track + 1 việc đầu tiên) — đừng kết bằng tổng kết của mentor.

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**  
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
