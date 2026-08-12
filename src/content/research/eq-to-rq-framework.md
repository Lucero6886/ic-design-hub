---
title: "EQ→RQ — từ câu hỏi kỹ thuật đến câu hỏi nghiên cứu"
summary: "Khung phương pháp của chương trình: biến câu hỏi kỹ thuật ('chọn cái nào tốt hơn?') thành câu hỏi nghiên cứu đo được, có baseline công bằng — kèm các ví dụ EQ→RQ thật đã cài trong giáo trình V3."
date: 2026-08-08
kind: methodology
status: active
evidenceLevel: heuristic
track: research-methodology
tags: [eq-rq, research-methodology, phase-2]
relatedProjects: [smart-traffic-controller-fpga]
references:
  - label: "Giáo trình V3, Tuần 6–12 — nơi khung EQ→RQ được cài và luyện tập"
    note: "legacy/versions/v3/ (Week06 → Week12)"
  - label: "MENTOR_GUIDE §7 — chuyển dần sang mentoring nghiên cứu"
    note: "legacy/versions/v3/MENTOR_GUIDE.html"
---

> **Mức bằng chứng của ghi chú này: kinh nghiệm kỹ thuật (heuristic).** Đây là khung làm việc
> được đúc kết và dùng trong chương trình mentoring — không phải một phương pháp luận đã được
> kiểm chứng bằng nghiên cứu giáo dục định lượng.

## Vấn đề

Sinh viên kỹ thuật thường dừng ở câu hỏi dạng *"cách nào tốt hơn?"* — câu hỏi này chưa nghiên
cứu được vì thiếu ba thứ: **đại lượng đo**, **điều kiện so sánh công bằng**, và **phạm vi**.
Khung EQ→RQ (engineering question → research question) là bài tập lặp đi lặp lại trong
chương trình để lấp đúng ba chỗ trống đó.

## Khung 7 bước (dùng ở Tuần 12)

```
observation → limitation → question → hypothesis → experiment → evidence → conclusion
(quan sát)    (giới hạn)   (câu hỏi)  (giả thuyết)  (thí nghiệm)  (bằng chứng)  (kết luận)
```

Một research question 7 dòng đạt yêu cầu khi: câu hỏi **đo được**, baseline **công bằng**
(cùng điều kiện, cùng ràng buộc), và kết luận chỉ nói trong phạm vi bằng chứng cho phép.
Ở mức Phase 1, "đo" ưu tiên bằng thứ đã có: số FF suy ra từ RTL, số chu kỳ đếm trên waveform,
độ dài khung truyền — chưa cần synthesis report.

## Các EQ→RQ thật trong giáo trình (kèm nơi luyện)

| Tuần | Engineering question | Hướng nâng thành research question |
|---|---|---|
| T6 | Chọn mã hóa state nào (binary/one-hot/Gray)? | Mã hóa state ↔ tài nguyên/timing/độ tin cậy — đo trên cùng FSM, cùng tool, cùng ràng buộc |
| T7 | Thanh ghi nào cần reset? | Chiến lược reset ↔ area/routing/power — phạm vi: loại thanh ghi, công nghệ |
| T9 | Timer rộng bao nhiêu bit là đủ? | Độ rộng timer ↔ area/power/độ chính xác — trade-off đo được |
| T10 | Quét hiển thị tần số nào? | Tần số quét ↔ công suất & chất lượng hiển thị |
| T11 | Kiến trúc uart_tx nào? | Kiến trúc UART ↔ công suất thấp; sai số baud ↔ độ dài frame (mô hình hóa) |

## Vai trò của mentor

Khi học viên hỏi "chọn cái nào tốt hơn?", không trả lời đáp án — trả lời bằng khung:
*"đó là một câu hỏi đo được — đo bằng gì?"*. Chấm phần **thiết kế thí nghiệm** (câu hỏi có đo
được không, baseline có công bằng không), không chấm con số; chưa cần tính mới lạ ở giai đoạn này.

## Giới hạn của khung

- EQ→RQ tạo ra câu hỏi nghiên cứu **ở mức bài tập** — một RQ "thật" cho công bố còn cần khảo
  sát tài liệu (literature review) để xác lập tính mới, điều nằm ngoài phạm vi Phase 1.
- Nhiều trade-off phụ thuộc công nghệ/tool; kết luận đo trên một FPGA cụ thể không tự động
  tổng quát hóa — phần "phạm vi" của kết luận là bắt buộc.
