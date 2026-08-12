# tools/ — Script dựng lại bản HTML của các tài liệu .md

`mkdocs.mjs` đọc các file `.md` trong thư mục cha và sinh ra bản `.html` tương ứng
(mục lục tự động từ đề mục `##`, bảng có khung cuộn ngang, liên kết chéo giữa các tài liệu,
khung trang chuẩn kèm chân trang bản quyền).

## Chạy

Cần Node.js và thư viện `marked`:

```
npm install marked          # một lần
node tools/mkdocs.mjs       # chạy từ thư mục version3/
```

Script ghi đè 7 file: README.html, CURRICULUM_MAP.html, MENTOR_GUIDE.html, PROJECT_GUIDE.html,
TECHNICAL_AUDIT.html, CHANGELOG_V2_TO_V3.html, VALIDATION_REPORT.html.

`implementation-notes.html` **không** do script sinh ra — trang này được biên soạn tay theo bố cục
lớp màu; khi sửa nội dung phải sửa thủ công cả `implementation-notes.md` và `.html`.

## Lưu ý

- Đường dẫn thư mục nằm ở hằng `DIR` đầu file (mặc định `/home/claude/version3/`) — đổi cho khớp máy bạn.
- Khối bản quyền ở cuối mỗi `.md` được script tự bỏ khỏi thân bài vì chân trang HTML đã có.
- Thêm tài liệu mới: khai báo thêm một mục trong mảng `DOCS` (tên file, tiêu đề, mô tả, nhãn ngắn).

---

**Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa** · Biên soạn: **Giảng Viên Đinh Văn Nam**
© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa.
