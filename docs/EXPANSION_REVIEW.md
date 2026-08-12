# EXPANSION_REVIEW — rà soát khả năng mở rộng: project nhóm, tư duy thiết kế chip, thị trường

Ngày: 2026-08-13 · Người đọc: giảng viên phụ trách hub
Câu hỏi được rà soát: hub hiện tại mở rộng được đến đâu để sinh viên (1) phát triển kỹ năng
làm việc nhóm, (2) rèn tư duy thiết kế chip, (3) nắm được thị trường bán dẫn trong nước và
quốc tế — mà không phá các nguyên tắc nền (không backend, không bịa nội dung, legacy bất biến)?

---

## 1. Những gì kiến trúc ĐÃ hỗ trợ sẵn (không cần xây thêm)

| Nhu cầu | Đã có sẵn trong hub |
|---|---|
| Project là đối tượng tri thức | Collection `projects` với mentor, contributors, milestones, deliverables, reproducibility, limitations — đủ để mô tả project nhóm nghiêm túc |
| Làm việc nhóm THẬT | Chính quy trình GitHub của hub: mỗi nhóm fork/branch → Pull Request → review chéo → merge. Đây là teamwork công nghiệp thật, không phải mô phỏng |
| Trưng bày & phản biện | Discussions "Student Projects" (show & tell) + mini-defense Tuần 12 đã có văn hóa "hỏi để hiểu, chấm lý do" |
| Tư duy thiết kế chip | V3 đã cài sẵn: interface-là-hợp-đồng (T9–11), controller–datapath, predict-before-simulate, EQ→RQ — mở rộng là NHÂN các bài học này lên project mới, không cần phát minh phương pháp mới |
| Thị trường | Track taxonomy vừa bổ sung track `industry` (đã kích hoạt bằng 2 tài nguyên kiểm chứng: Chiến lược 1018/QĐ-TTg và số liệu SIA) |
| Mở rộng vô hạn không đổi kiến trúc | Thêm project/bài viết/tài nguyên = thêm file Markdown; learning-path mới cho Phase 2 = 1 file |

Kết luận rà soát: **kiến trúc không cần thay đổi gì** cho cả ba mục tiêu. Việc mở rộng là việc
VẬN HÀNH (ra đề project, tổ chức nhóm, nuôi chuyên mục thị trường) — đúng như thiết kế.

## 2. Mô hình project nhóm đề xuất (Phase 2, 4 tuần/đợt)

Nhóm **3 sinh viên** (đúng khuyến nghị lớp lệch trình độ của MENTOR_GUIDE), vai trò **xoay
vòng mỗi tuần** để ai cũng qua đủ ba ghế:

- **Design lead** — vẽ block diagram/interface, quyết định kiến trúc tuần đó.
- **Verification lead** — viết testbench, định nghĩa invariant, giữ "bằng chứng trước kết luận".
- **Integration & docs lead** — quản repo, review PR, viết log tuần, chuẩn bị demo.

Quy trình chuẩn một project (chạy hoàn toàn trên hạ tầng sẵn có):

1. Nhóm mở issue "Đề xuất project" trên hub → mentor duyệt phạm vi.
2. Tạo repo riêng của nhóm (fork từ template RTL nếu có) — spec + interface chốt ở tuần 1
   như "hợp đồng" (bài học T9–11 nhân rộng).
3. Mỗi tuần: PR chéo (người này viết, người kia review) + log tuần; mentor chỉ hỏi, không sửa hộ.
4. Kết thúc: mini-defense theo rubric Tuần 12 + đăng trang project lên hub
   (file .md, contributors ghi tên khi các em đồng ý) + post "Student Projects" trên Discussions.

**3 đề bài mẫu đã soạn sẵn** (bám 5 track A–E của Tuần 12, dùng được ngay, nằm ở
`templates/proposals/` — thầy duyệt rồi chuyển vào `src/content/projects/` khi giao đề):

| File | Đề bài | Track | Kỹ năng nhóm rèn được |
|---|---|---|---|
| `uart-rx-doi-thoai-hai-chieu.md` | UART RX + loopback: hệ T9–11 nhận lệnh từ PC (đổi thời lượng đèn qua terminal) | A·FPGA | Interface hai chiều, CDC nhập môn, chia RX/parser/integration cho 3 người |
| `stopwatch-da-che-do.md` | Đồng hồ bấm giờ đa chế độ trên nền datapath T10 | A·FPGA (nhẹ hơn) | FSM chế độ, debounce, phân module rõ để làm song song |
| `fir-loc-tin-hieu-fpga.md` | FIR filter fixed-point + so sánh tài nguyên theo hệ số lượng tử | C/D·Research | EQ→RQ đo được (bit-width ↔ tài nguyên/chất lượng), thí nghiệm có baseline |

Ba đề này đều nối tiếp trực tiếp hệ Smart Traffic Controller và kỹ năng Phase 1 — không đòi
kiến thức chưa dạy; đề khó dần từ 2 → 1 → 3.

## 3. Mảng thị trường trong nước & quốc tế — "Industry Radar"

Nguyên tắc: hub KHÔNG chép báo cáo thị trường (bản quyền + lỗi thời nhanh) mà dạy sinh viên
**theo dõi nguồn gốc định kỳ**. Đã khởi động bằng 2 tài nguyên kiểm chứng:

- **Trong nước:** Chiến lược phát triển công nghiệp bán dẫn VN — Quyết định 1018/QĐ-TTg
  (21/09/2024), mục tiêu 50.000 kỹ sư đến 2030, tầm nhìn 2050. Bối cảnh đáng theo dõi tiếp:
  các trung tâm thiết kế quốc tế mở tại VN, trung tâm prototyping chip quốc gia đầu tiên,
  Đà Nẵng/HCM thu hút đầu tư bán dẫn, xu hướng "China+1".
- **Quốc tế:** SIA — doanh số toàn cầu 2025 đạt kỷ lục 791,7 tỷ USD (+25,6%), dự báo chạm
  1.000 tỷ USD trong 2026 nhờ AI. Đây là nguồn số liệu chuẩn để sinh viên tập đọc chu kỳ ngành.

Hoạt động vận hành đề xuất (mỗi mục = một hoạt động lặp lại được, chi phí thấp):

1. **Seminar "Radar bán dẫn" mỗi tháng 30′** — một sinh viên trình bày 1 bản tin doanh số
   SIA hoặc 1 tin đầu tư bán dẫn VN, cả nhóm hỏi "điều này nghĩa là gì với kỹ năng mình đang
   học?". Kết quả tốt → đăng thành bài viết category `news` trên hub (một file .md).
2. **Bản đồ nghề nghiệp** — một bài viết (thầy hoặc sinh viên khá viết, thầy duyệt) map kỹ
   năng Phase 1/2 → vị trí thật ở VN: design verification, RTL design, physical design,
   FAE, đóng gói-kiểm thử… mỗi vị trí kèm kỹ năng hub dạy ở đâu.
3. **Company watch** — mỗi nhóm project "nhận" theo dõi 1 công ty (trong nước hoặc quốc tế)
   trong học kỳ; cuối kỳ trình bày 5 phút: công ty đứng khâu nào của chuỗi giá trị, tuyển gì.
4. Mỗi tài nguyên thị trường mới thêm vào track `industry` qua đúng quy trình resource
   (bắt buộc `whyRecommended` + nguồn) — chống biến hub thành bãi link.

## 4. Lộ trình triển khai gợi ý theo học kỳ

| Giai đoạn | Việc | Công sức |
|---|---|---|
| Ngay | Commit 3 đề bài mẫu + 2 tài nguyên thị trường (đã soạn); giao đề đợt 1 cho 1–2 nhóm thí điểm | ~1 giờ |
| Tháng đầu | Chạy seminar Radar #1; nhóm thí điểm mở issue + repo | 30′/tháng |
| Cuối đợt 4 tuần | Mini-defense; nhóm tự viết trang project (PR đầu tiên của các em vào hub) | buổi review |
| Học kỳ sau | Từ kết quả thí điểm, viết learning-path "Phase 2 — Track A" đầu tiên (1 file); nhân số nhóm | tăng dần |

## 5. Những gì KHÔNG nên làm (giữ đúng nguyên tắc nền)

- Không xây LMS/backend/chấm điểm tự động trên hub — teamwork chạy trên GitHub, điểm số ở lớp.
- Không đăng thông tin nhóm/điểm/email sinh viên lên hub; tên chỉ xuất hiện khi các em đồng ý.
- Không chép số liệu thị trường vào bài viết tĩnh mà không ghi ngày + nguồn (số liệu bán dẫn
  lỗi thời theo quý); quy ước: mọi con số thị trường phải kèm nguồn + thời điểm.
- Không tạo trước hàng loạt trang track Phase 2 rỗng — mỗi track chỉ xuất hiện khi có đề bài
  thật đầu tiên (đúng chính sách "không lấp chỗ trống").
