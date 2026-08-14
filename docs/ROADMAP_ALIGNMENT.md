# ROADMAP_ALIGNMENT — đối chiếu hub với mô hình lộ trình cộng đồng (14/08/2026)

Mô hình do tác giả đề xuất (sơ đồ hình cây): Community → 12-week Foundation → RTL +
Verification → **rẽ nhánh FPGA / ASIC** → hợp lưu ở **Dual-target project** → **PPA
comparison** → **Engineering review** → rẽ nhánh cuối **Industry/Project** và **Research**.

Tài liệu này rà từng nút của sơ đồ so với **nội dung có thật** trong hub, chấm mức khớp và
nêu rõ việc phải làm. Nguyên tắc bất di: nút nào chưa có tài liệu thật thì ghi "Định hướng",
không lấp bằng nội dung tự sinh.

---

## 1. Bảng đối chiếu từng nút

| Nút trong sơ đồ | Hiện trạng trong hub | Mức khớp |
|---|---|---|
| **IC DESIGN COMMUNITY** | Khu Cộng đồng + Discussions (8 chuyên mục) + Issues 5 mẫu + PR review chéo; GITHUB_PLAYBOOK cho điều phối | ✅ Đủ |
| **12-WEEK FOUNDATION** | Giáo trình V3 12 tuần (bản hiện hành) + learning-path "IC Design Foundations — Phase 1" + trang "Bắt đầu tại đây" | ✅ Đủ |
| **RTL + VERIFICATION** | Track `rtl`, `systemverilog`, `verification` đều **active**; bài A–Z mô phỏng; bài chuyên sâu Icarus; project T9–11 có invariant check | ✅ Đủ |
| **FPGA TRACK → Real Hardware** | Track `fpga` **active**; Phase 2 track A đã công bố (Week12); project mẫu UART RX + Stopwatch; giáo trình dừng ở mức "phù hợp prototype trên FPGA" | 🟡 Có định hướng, **chưa có giáo trình Phase 2** |
| **ASIC TRACK → RTL → GDS** | Phase 2 track B đã công bố; các track `asic-frontend`, `synthesis`, `timing-sta`, `physical-design` đang **planned**; V3 nói rõ STA/PD/DFT nằm ngoài Phase 1 | 🟠 **Khoảng trống lớn nhất** — chưa có bất kỳ tài liệu RTL→GDS nào |
| **DUAL-TARGET PROJECT** (cùng RTL, hai đích) | Ý tưởng "cùng một RTL, hai con đường hiện thực" là **câu hỏi cốt lõi Tuần 8** và có trong Curriculum Map; nhưng **chưa có project nào yêu cầu chạy cả hai đích** | 🟠 Thiếu — nút hợp lưu chưa tồn tại dưới dạng đề bài |
| **PPA COMPARISON** | Khái niệm PPA có trong Week8/Week12 + track B; project FIR đã có thí nghiệm bit-width ↔ tài nguyên (một nửa của PPA) | 🟡 Có mầm, **chưa có bài chuẩn "đo và so sánh PPA"** |
| **ENGINEERING REVIEW** | Mini-defense Tuần 12 dạy đúng khái niệm *design review* (Week12: "Nghề đánh giá kỹ sư đúng cách này — design review"); rubric 5 tiêu chí; PR review chéo trong repo nhóm | ✅ Đủ (nên đặt tên tường minh hơn) |
| **INDUSTRY/PROJECT** (Advanced FPGA, Embedded) | Track `industry` **active** (chiến lược quốc gia + số liệu SIA); trang Tin tức có khu Việc làm & nghề nghiệp; Phase 2 track A/D | 🟡 Có khung, thiếu "Embedded System" trong taxonomy |
| **RESEARCH** (Architecture, Optimization, HW-aware AI, IC research) | Khu Nghiên cứu + EQ→RQ + 5 track Phase 2 (C/E khớp trực tiếp); track `hardware-ai`, `ai-for-ic`, `low-power` planned | ✅ Khớp về cấu trúc, nội dung đang mỏng (đúng thiết kế) |

**Kết luận tổng:** hub khớp mô hình **ở phần thân** (Community → Foundation → RTL+Verification
→ Review → hai nhánh cuối) và khớp **về ý định** ở phần rẽ nhánh FPGA/ASIC. Ba nút **chưa có
thật**: `RTL → GDS`, `Dual-target project`, `PPA comparison`. Đây chính là ranh giới
Phase 1 / Phase 2 mà giáo trình V3 đã tuyên bố minh bạch — không phải lỗi, mà là **việc chưa
làm**, và nay được ghi thành lộ trình có thứ tự.

---

## 2. Điều chỉnh đã thực hiện ngay (14/08/2026)

1. **Taxonomy bổ sung 2 track** cho khớp sơ đồ: `embedded-systems` (nhánh Industry/Project)
   và `rtl-to-gds` (nút ASIC — gộp flow synthesis→PnR→signoff thành một track định hướng
   duy nhất, dễ hiểu hơn là rải rác 4 track con). Cả hai gắn nhãn **Định hướng**.
2. **Trang lộ trình cộng đồng** `/learn/roadmap/` — vẽ đúng sơ đồ của tác giả, mỗi nút gắn
   nhãn trạng thái thật (Đang có / Định hướng) và link tới nội dung tương ứng. Sinh viên
   nhìn một trang là hiểu mình đang ở đâu và phía trước là gì.
3. Ghi rõ **ranh giới trung thực**: nút "RTL → GDS" và "PPA comparison" hiển thị "Định
   hướng — chưa có giáo trình", đúng chính sách không bịa nội dung.

## 3. Việc phải làm để khớp 100% (theo thứ tự khả thi)

| Ưu tiên | Việc | Vì sao thứ tự này | Ghi chú thực nghiệm |
|---|---|---|---|
| **1** | **Đề bài Dual-target** — lấy chính `traffic_ctrl` (T9) hoặc FIR: chạy trên FPGA toolchain **và** chạy synthesis mã nguồn mở, ghi lại số liệu hai bên | Nút hợp lưu; dùng lại thiết kế đã có nên rẻ nhất | Cần cài toolchain một lần; kết quả là bảng số liệu thật, không phải lý thuyết |
| **2** | **Bài "Đọc và so sánh PPA"** — dạy đọc utilization/timing report, và khung so sánh công bằng (cùng ràng buộc, cùng testbench) | Không có bài này thì dual-target chỉ ra hai đống số vô nghĩa | Phải chạy thật một lần trên mỗi flow rồi mới viết |
| **3** | **Chuỗi RTL → GDS nhập môn** (track `rtl-to-gds`) — synthesis → floorplan → PnR → xem layout, trên PDK mã nguồn mở | Nút nặng nhất; nên làm sau khi có #1, #2 làm nền | Hệ sinh thái mã nguồn mở (OpenLane/OpenROAD + PDK mở như sky130/IHP) đủ chín cho mục đích **giáo dục**; **phải tự chạy được end-to-end rồi mới viết bài**, không viết theo tài liệu người khác |
| **4** | **Đổi tên/nhấn mạnh "Engineering Review"** thành một mục mentoring riêng (checklist review dùng chung cho mini-defense T12 + PR review repo nhóm) | Rẻ, tăng giá trị ngay | Chất liệu đã có sẵn trong rubric T12 + MENTOR_GUIDE |
| **5** | **Embedded System** — đề bài nhỏ nối FPGA với vi điều khiển/PC (mở rộng tự nhiên từ UART đã có) | Nhánh Industry; đề UART RX hiện tại đã là bước một | — |

## 4. Ranh giới trung thực cần giữ

- **Không** tuyên bố hub "dạy RTL→GDS" khi chưa có bài đã chạy thật. Sinh viên đọc lộ trình
  phải phân biệt được: *đang có* vs *định hướng*.
- **Không** hứa "tape-out" — chương trình mã nguồn mở dừng ở mức layout/GDS học thuật; các
  chương trình chế tạo thật (shuttle) là chuyện khác, phụ thuộc kinh phí và thời điểm.
- Số liệu PPA từ toolchain mã nguồn mở **không so sánh trực tiếp** được với công nghiệp
  (PDK, thư viện, ràng buộc khác nhau) — mọi kết luận phải kèm phạm vi, đúng kỷ luật EQ→RQ.
