# Pull Request

## Thay đổi gì?

<!-- Mô tả ngắn: thêm bài viết X / sửa lỗi Y / cập nhật trang Z -->

## Vì sao?

<!-- Lý do thay đổi; với sửa lỗi kỹ thuật: dẫn nguồn tin cậy -->

## Trang/khu vực bị ảnh hưởng

<!-- vd: articles/ten-bai/, trang chủ, khu Research -->

## Tham chiếu kỹ thuật (nếu là nội dung kỹ thuật)

<!-- Sách/paper/tài liệu vendor đối chiếu; ghi "không áp dụng" nếu không phải nội dung kỹ thuật -->

## Đã kiểm tra

- [ ] `npm run check` PASS (schema nội dung + legacy + provenance)
- [ ] `npm run build && npm run validate` PASS (link nội bộ, draft không lọt)
- [ ] Xem thử bằng `npm run dev` — trang hiển thị đúng

## Cam kết bản quyền & an toàn thông tin — BẮT BUỘC

- [ ] Nội dung do tôi viết, hoặc tôi có quyền sử dụng và đã ghi nguồn rõ ràng (trường `attribution`/`references`)
- [ ] Không sao chép nguyên văn quá mức tư liệu có bản quyền của bên thứ ba
- [ ] Không chứa thông tin bí mật/cá nhân: email, mã số sinh viên, điểm số, dữ liệu nghiên cứu chưa công bố, API key…
- [ ] Tên cá nhân xuất hiện trong nội dung (nếu có) đã có sự đồng ý công khai
- [ ] KHÔNG sửa file trong `_source/` và KHÔNG sửa nội dung giảng dạy của `public/legacy/versions/v1|v2/`
