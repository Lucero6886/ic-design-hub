---
title: "Bắt đầu tại đây — lộ trình cho người mới nhận link hub"
summary: "Bạn vừa nhận link hub và chưa biết đọc gì trước? Trang này là bản đồ duy nhất bạn cần: thứ tự đọc tối ưu, nhịp học mỗi tuần, công cụ cần cài, cách hỏi khi mắc kẹt và cách chứng minh mình đã hiểu."
date: 2026-08-12
category: mentoring
difficulty: foundation
featured: true
track: foundations
tags: [bat-dau, huong-dan, phase-1]
outcomes:
  - "Biết chính xác đọc gì trước, học gì trước và bỏ qua gì ở giai đoạn đầu"
  - "Thiết lập xong công cụ và nhịp học hằng tuần trong ~30 phút"
  - "Biết cách hỏi để được trả lời nhanh và cách tích lũy portfolio từ tuần 1"
---

Chào mừng bạn đến với hub. Trang này dành cho **người mới nhận link lần đầu** — đọc xong
(~10 phút) bạn sẽ không còn phải đoán "bắt đầu từ đâu" nữa.

## 0. Hub này gồm những gì — và bạn cần gì ở giai đoạn nào

Hub có 6 khu vực, nhưng **người mới chỉ cần 2 khu đầu tiên**:

| Khu vực | Dành cho bạn khi… |
|---|---|
| **[Học](../../learn/)** | **NGAY BÂY GIỜ** — giáo trình 12 tuần nằm ở đây |
| **[Bài viết](../../articles/)** | Gặp khái niệm muốn đào sâu thêm |
| **[Project](../../projects/)** | Từ Tuần 9 (project tích hợp) và sau khóa |
| **[Nghiên cứu](../../research/)** | Từ Tuần 6 trở đi (khi gặp EQ→RQ), đọc kỹ ở Tuần 12 |
| **[Tài nguyên](../../resources/)** | Khi cần công cụ — xem mục 2 dưới đây |
| **[Cộng đồng](../../community/)** | Khi mắc kẹt quá 30 phút — xem mục 5 |

**Chưa cần đọc:** Mentor Guide (dành cho mentor), Technical Audit và trang Tiến hóa V1→V3
(tư liệu tham khảo — quay lại sau khi đã học). V1/V2 là **bản lưu trữ lịch sử**, không học theo.

## 1. Con đường của bạn: 12 tuần, một hệ thống chạy được

Bạn sẽ học theo **[giáo trình V3 — IC Design Foundations](../../legacy/versions/v3/index.html)**,
đi đúng thứ tự Tuần 1 → 12, không nhảy cóc (mỗi tuần dùng kết quả tuần trước):

- **Tuần 1–2:** vì sao có chip, và một ý tưởng đi qua những chặng nào để thành chip.
- **Tuần 3–5:** cổng logic → khối tổ hợp → mạch tuần tự (mạch bắt đầu "nhớ").
- **Tuần 6–8:** FSM (mạch ra quyết định) → viết RTL sạch bằng SystemVerilog → FPGA vs ASIC.
- **Tuần 9–11:** **project tích hợp**: xây hệ điều khiển đèn giao thông hoàn chỉnh
  (FSM + hiển thị 7-segment + UART báo về máy tính) — mỗi tuần lắp thêm một mảnh.
- **Tuần 12:** bảo vệ mini (demo + vấn đáp) và cầu nối sang nghiên cứu.

Mỗi trang tuần có **4 lớp** — đây là điều quan trọng nhất cần hiểu về cách học:

| Lớp | Là gì | Khi nào |
|---|---|---|
| **A** | Đọc chuẩn bị ngắn | **Trước** buổi học, 15–25 phút — bắt buộc |
| **B** | Kịch bản buổi mentoring 60 phút | Trong buổi học nhóm |
| **C** | Lab / đào sâu kỹ thuật | Sau buổi — làm bài; tra cứu khi cần, **không cần đọc hết một mạch** |
| **D** | Quiz 5 câu + bài tập + phản tư | Cuối tuần — tự kiểm tra mình |

Quiz, checklist và ô phản tư **tự lưu trên máy bạn** (mở lại trang là còn — nhưng theo từng
trình duyệt/máy: đổi máy sẽ không thấy tiến độ cũ, đó không phải lỗi).

**Việc cần làm đầu tiên:** mở
[Lộ trình IC Design Foundations — Phase 1](../../learn/ic-design-foundations-phase-1/)
(bản tóm tắt có chú thích từng tuần), rồi vào thẳng
[Tuần 1](../../legacy/versions/v3/Week01.html) và đọc Layer A.

## 2. Công cụ — 30 phút thiết lập, đúng thời điểm

Đừng cài mọi thứ ngay ngày đầu. Theo nhịp này:

- **Tuần 1–3:** chỉ cần trình duyệt. Không cài gì cả.
- **Tuần 3–4 (khi bắt đầu chạy RTL):** dùng [EDA Playground](../../resources/) trên trình duyệt —
  không cài đặt, chạy được ngay trong buổi học.
- **Tuần 5 trở đi (testbench đầu tiên):** cài [Icarus Verilog](../../resources/) trên máy —
  đây là công cụ mô phỏng chính thức của khóa, chính là thứ giáo trình dùng để kiểm định
  toàn bộ RTL. Lệnh mẫu có sẵn trong trang Tài nguyên.

## 3. Ba kỷ luật — thứ thật sự quyết định bạn hiểu nhanh hay chậm

Toàn bộ giáo trình xoay quanh ba thói quen. Làm đúng ba điều này, bạn học một lần là chắc;
bỏ qua, bạn sẽ "tưởng là hiểu" cho đến Tuần 9 rồi vỡ trận:

1. **Vẽ trước khi code** — state diagram / block diagram / bảng chân lý trước, RTL sau.
2. **Dự đoán trước khi mô phỏng** — viết ra waveform bạn *kỳ vọng*, chạy, rồi đối chiếu.
   Chênh lệch giữa dự đoán và thực tế chính là chỗ bạn học được nhiều nhất.
3. **Bằng chứng trước khi kết luận** — "code chạy rồi" chưa phải là hiểu; phải chỉ được
   vào waveform và giải thích *vì sao* nó đúng.

## 4. Nhịp học gợi ý mỗi tuần (~4–6 giờ)

Layer A (25′) → buổi nhóm 60′ → Layer C + bài tập (2–3h, chia 2 buổi ngắn thay vì dồn một
buổi dài) → quiz + phản tư Layer D (30′) → đọc "cầu nối tuần sau" (5′). Học nhóm 2–3 người
lệch trình độ một chút là tối ưu — người giải thích được cho người khác là người hiểu thật.

## 5. Mắc kẹt thì làm gì (theo đúng thứ tự này)

1. **Tự debug 30 phút** — đọc lại Layer C của tuần, kiểm tra lại dự đoán waveform.
2. **Tìm kiếm trên hub** — ô [Tìm kiếm](../../search/) phủ toàn bộ giáo trình + bài viết,
   gõ không dấu cũng được (`mach tuan tu`, `fsm`, `uart`).
3. **Hỏi cộng đồng** — vào [Cộng đồng](../../community/) → GitHub Discussions, chọn đúng
   chuyên mục. Câu hỏi tốt gồm 3 phần: *mình làm gì → mình dự đoán gì → thực tế ra gì*
   (kèm code + waveform). Câu hỏi kiểu này thường được trả lời nhanh gấp nhiều lần.

## 6. Tích lũy portfolio từ Tuần 1 — đừng để đến Tuần 12

Mỗi tuần giáo trình yêu cầu một **artifact** (bản đồ trừu tượng, truth table, RTL + testbench,
waveform chú thích…). Giữ tất cả vào một thư mục/repo cá nhân ngay từ đầu: Tuần 12 bạn cần
**portfolio 12 mục + bài trình bày 10 slide** để bảo vệ — nếu tích lũy dần thì tuần cuối chỉ
là sắp xếp lại, không phải làm gấp.

## 7. Sau 12 tuần thì sao?

Bạn sẽ chọn một trong [5 track Phase 2 (A–E)](../../research/phase-2-tracks/) — FPGA, ASIC,
kiến trúc phần cứng, DSP hay AI accelerator — và mang theo một câu hỏi nghiên cứu đầu tiên
viết theo khung [EQ→RQ](../../research/eq-to-rq-framework/). Chưa cần nghĩ về nó bây giờ;
giáo trình sẽ dẫn bạn tới đó đúng lúc.

---

**Tóm tắt cho người vội:** mở [Lộ trình Phase 1](../../learn/ic-design-foundations-phase-1/)
→ học [Tuần 1](../../legacy/versions/v3/Week01.html) theo nhịp 4 lớp → giữ ba kỷ luật ở mục 3
→ lưu artifact mỗi tuần → mắc kẹt thì hỏi theo mục 5. Chúc bạn học tốt!
