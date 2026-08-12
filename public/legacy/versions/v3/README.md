# IC Design Mentoring — Version 3 (Phase 1, 12 tuần)

> **Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa**
> **Biên soạn:** Giảng Viên Đinh Văn Nam
> © 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa.

Giáo trình mentoring thiết kế vi mạch số / FPGA bằng tiếng Việt (thuật ngữ kỹ thuật giữ tiếng Anh), xây trên nền Version 2, tái kiến trúc theo mô hình 4 lớp học tập và một project tích hợp 3 tuần.

## Dùng ngay
Mở `index.html` bằng trình duyệt bất kỳ. **Không cần Internet, không cần cài đặt** — chỉ cần giữ nguyên cả thư mục (các trang dùng chung `css/` và `js/`). Tiến độ (checklist, quiz, ô phản tư, chế độ mentor) tự lưu trên máy qua localStorage của trình duyệt.

- Học viên: mỗi tuần đọc **Layer A** trước buổi (15–25′) → dự buổi mentoring 60′ (**Layer B**) → thực hành với **Layer C** → làm quiz/bài tập **Layer D**.
- Mentor: bật công tắc **Mentor** trên thanh tiêu đề của mỗi trang để hiện ghi chú riêng (đáp án kỳ vọng, câu cứu nguy, bài mở rộng). Đọc thêm `MENTOR_GUIDE.md`.

## Cấu trúc thư mục
```
version3/
├── index.html                  # Hub 12 tuần + tiến độ quiz
├── Week01.html … Week12.html   # 12 tuần, mỗi tuần 4 lớp A/B/C/D
├── css/style.css               # Design system dùng chung (không CDN)
├── js/app.js                   # Engine: quiz, checklist, localStorage, widget tương tác
├── assets/                     # Tài nguyên tĩnh
├── README.md / .html           # File này
├── CURRICULUM_MAP.md / .html   # Bản đồ 12 tuần: khái niệm, artifact, dependency, learning spirals
├── MENTOR_GUIDE.md / .html     # Cẩm nang vận hành buổi học cho mentor
├── PROJECT_GUIDE.md / .html    # Đặc tả project tích hợp T9–11 (Smart Traffic Controller)
├── TECHNICAL_AUDIT.md / .html  # Hiệu chỉnh kỹ thuật so với v2 (trích dẫn gốc → bản đúng)
├── CHANGELOG_V2_TO_V3.md/.html # Thay đổi có ý nghĩa, nhóm theo 7 hạng mục
├── VALIDATION_REPORT.md/.html  # Kết quả kiểm định tự động toàn bộ
└── implementation-notes.md/.html # Ghi chú triển khai + các điểm khác đặc tả
```

Mỗi tài liệu vận hành có **hai bản**: `.html` để đọc trên trình duyệt (có mục lục riêng, điều hướng qua lại giữa các tài liệu, cùng giao diện với các trang tuần) và `.md` là bản văn bản gốc để chỉnh sửa hoặc đưa vào git. Sau khi sửa `.md` cần dựng lại `.html` tương ứng — hướng dẫn trong `implementation-notes.md`, mục Bảo trì.

## Chương trình 12 tuần
T1 Why Semiconductor · T2 From Idea to Chip · T3 Logic Gates & Boolean Thinking · T4 Combinational Building Blocks · T5 Sequential Logic & Memory · T6 Finite-State Machines · T7 Writing Clean RTL in SystemVerilog · T8 FPGA vs ASIC · **T9–T11 Project tích hợp: FSM Traffic Controller → 7-Segment Display → UART Status** · T12 Capstone Review & Research Bridge.

**Chuẩn đầu ra Phase 1:** sau 12 tuần, học viên có thể đọc một đặc tả đơn giản, phân rã hệ thống số thành các khối chức năng, viết RTL cơ bản bằng SystemVerilog, viết testbench đơn giản, đọc waveform mô phỏng, hiểu synthesis ở mức nền tảng, và tích hợp một thiết kế đồng bộ nhỏ phù hợp để prototype trên FPGA. Chương trình cung cấp nền tảng — không tuyên bố tạo ra kỹ sư IC hoàn chỉnh trong 12 tuần.

## Ghi chú phiên bản
- Version 2 được giữ nguyên vẹn (hai file zip gốc) để đối chiếu — Version 3 nằm trong thư mục riêng này.
- Mọi hiệu chỉnh kỹ thuật so với v2 được đánh dấu ngay trong bài bằng callout "Hiệu chỉnh kỹ thuật so với v2" và tổng hợp trong `TECHNICAL_AUDIT.md`.

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**  
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ hoặc trích dẫn.
