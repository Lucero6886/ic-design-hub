---
title: "Portfolio sinh viên từ A đến Z — repo GitHub kể câu chuyện 12 tuần của bạn"
summary: "Hướng dẫn cầm tay chỉ việc: lập repo portfolio từ Tuần 1, cấu trúc thư mục chuẩn cho 12 artifact, thói quen 15 phút mỗi tuần, và cách biến nó thành bộ hồ sơ bảo vệ Tuần 12 kiêm CV kỹ thuật khi đi thực tập."
date: 2026-08-13
draft: false
category: mentoring
difficulty: foundation
track: foundations
tags: [portfolio, github, huong-dan, phase-1]
---

Tuần 12 bạn phải nộp **portfolio 12 mục + bài trình bày 10 slide**. Sinh viên làm dồn tuần
cuối luôn khổ; sinh viên tích lũy 15 phút mỗi tuần thì tuần 12 chỉ là sắp xếp lại. Bài này
chỉ việc từng bước theo cách thứ hai.

## Bước 1 — Lập repo (một lần, 10 phút, ngay Tuần 1)

1. Tạo tài khoản GitHub (miễn phí) nếu chưa có.
2. Tạo repository mới: `ic-portfolio-<tên bạn>` — chọn **Public** (đây là hồ sơ năng lực
   của bạn; nếu ngại, để Private và mở Public ở Tuần 12).
3. Tạo cấu trúc thư mục:

```text
ic-portfolio-ten-ban/
├── README.md            ← mục lục 12 tuần (bảng, cập nhật dần)
├── week01/  … week12/   ← mỗi tuần một thư mục
└── project/             ← RTL + testbench hệ tích hợp T9–11 (bản của BẠN)
```

## Bước 2 — Mỗi tuần bỏ vào đúng một artifact (15 phút sau Layer D)

Danh mục theo đúng yêu cầu từng tuần của giáo trình:

| Tuần | Artifact bỏ vào `weekNN/` |
|---|---|
| 1 | Ảnh/scan "bản đồ trừu tượng" thiết bị bạn chọn |
| 2 | Bảng "chặng → artifact → ai làm" |
| 3 | Truth table + biểu thức + sơ đồ mạch bài tự chọn |
| 4 | RTL tổ hợp đầu tiên + waveform đối chiếu truth table |
| 5 | `counter_mod10.sv` + testbench + **waveform chú thích 2 lần wrap** |
| 6 | State diagram + transition table + FSM RTL + waveform 2 chuỗi test |
| 7 | "Style card" cá nhân + 3 đoạn RTL lỗi đã sửa kèm giải thích |
| 8 | Phân tích chọn FPGA/ASIC cho 2 kịch bản |
| 9 | `tick_gen.sv` + `traffic_ctrl.sv` + `tb_traffic.sv` + waveform 1 chu kỳ đèn |
| 10 | `seg7_decoder.sv` + waveform hệ ghép W9+W10 |
| 11 | `uart_tx.sv` + `status_tx.sv` + `traffic_system_top.sv` + waveform 1 frame UART |
| 12 | 10 slide bảo vệ + kế hoạch Phase 2 + research question 7 dòng |

Mỗi thư mục tuần kèm một `README.md` **5 dòng** theo mẫu:

```markdown
# Tuần N — <tên tuần>
- Artifact: <file gì, làm gì>
- Điều tôi giải thích được: <1 câu, bằng lý do>
- Bug/bất ngờ gặp phải: <1 câu — dự đoán khác thực tế chỗ nào>
- Bằng chứng: <tên file waveform/ảnh>
```

Quy ước commit: mỗi tuần ít nhất 1 commit, message rõ (`week05: counter + tb + waveform`).
Lịch sử commit đều đặn 12 tuần tự nó là một dòng trên CV.

## Bước 3 — Waveform chú thích: artifact giá trị nhất

Ảnh waveform "trần" không nói lên điều gì. Chuẩn của khóa: chụp từ GTKWave rồi chú thích
(mũi tên + chữ) đúng 3 điểm: sự kiện gì — xảy ra tại cạnh clock nào — vì sao đúng. Mỗi tuần
1 ảnh như vậy là đủ; 12 ảnh là một câu chuyện kỹ thuật hoàn chỉnh.

## Bước 4 — Tuần 12: từ portfolio thành hồ sơ bảo vệ (2 giờ thay vì 2 ngày)

1. Điền nốt bảng mục lục trong `README.md` gốc — link tới từng tuần.
2. Soạn 10 slide bám rubric bảo vệ: kiến trúc hệ (controller vs datapath trên diagram CỦA
   BẠN) → interface giữa các khối → 3 waveform then chốt làm bằng chứng → 1 bug thật và cách
   tìm ra → 1 trade-off → giới hạn + kế hoạch Phase 2.
3. Đưa link repo cho mentor TRƯỚC buổi bảo vệ.

## Bước 5 — Sau khóa: portfolio thành CV kỹ thuật

Ứng tuyển thực tập, dòng đáng giá nhất không phải "đã học SystemVerilog" mà là:
*"Thiết kế và kiểm chứng hệ FPGA tích hợp (FSM + 7-segment + UART) — repo: <link>"*.
Người phỏng vấn mở repo thấy waveform chú thích + testbench self-check + log 12 tuần —
đó là bằng chứng, không phải lời kể. Giữ repo sống sau khóa: project Phase 2 thêm vào
đúng cấu trúc này.

## Ba lỗi thường gặp

1. **Dồn tuần cuối** — mất giá trị lịch sử commit và chắc chắn thiếu artifact giữa kỳ.
2. **Chỉ bỏ code, không bỏ bằng chứng** — thiếu waveform chú thích thì không chứng minh
   được "hiểu"; code ai cũng chép được, bằng chứng thì không.
3. **Chép RTL mẫu nguyên xi** — quy định của khóa: module dùng lại từ RTL chuẩn phải
   **gõ lại tay và giải thích được**; portfolio chép máy sẽ lộ ngay ở vấn đáp.
