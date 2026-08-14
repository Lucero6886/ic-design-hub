# COMMUNITY_SETUP — bật và cấu hình cộng đồng GitHub (làm MỘT lần)

> Đọc kèm: **`docs/GITHUB_PLAYBOOK.md`** — bức tranh đầy đủ về khai thác GitHub
> (Projects/board điều phối đợt project, template repo nhóm + CI mô phỏng, Classroom,
> Organization, topics/discoverability, nhịp vận hành hằng tuần).

Website là site tĩnh; phần cộng đồng chạy trên hạ tầng GitHub của repo. Các bước dưới đây do
chủ repo thực hiện thủ công trên giao diện GitHub — tổng cộng ~15 phút.

## 1. Bật GitHub Discussions

1. Vào repo → **Settings** → tab **General** → kéo xuống mục **Features**.
2. Tích chọn **Discussions** → bấm **Set up discussions** (GitHub tạo discussion chào mừng, có thể sửa/xóa).

### 1.1 Tạo chuyên mục (categories)

Vào tab **Discussions** → biểu tượng bút chì cạnh "Categories" → tạo các chuyên mục sau
(khớp với trang Cộng đồng của website):

| Chuyên mục | Định dạng (format) | Dùng cho |
|---|---|---|
| Announcements | **Announcement** (chỉ maintainer đăng) | Thông báo chương trình |
| IC Design Q&A | **Q&A** | Câu hỏi khái niệm |
| RTL / SystemVerilog Help | **Q&A** | Gỡ rối code |
| FPGA / Toolchain Help | **Q&A** | Công cụ, mô phỏng, board |
| Research Questions & Ideas | Open-ended discussion | EQ→RQ, ý tưởng, thiết kế thí nghiệm |
| Paper Reading | Open-ended discussion | Cùng đọc paper |
| Student Projects | Show and tell | Trình bày project |
| Community Feedback | Open-ended discussion | Góp ý cho hub |

GitHub tạo sẵn vài category mặc định (General, Ideas…) — có thể xóa hoặc đổi tên cho gọn.

### 1.2 Ghim discussion mở đầu

Tạo một discussion trong Announcements: chào mừng + link về website + nhắc quy tắc ứng xử
(CODE_OF_CONDUCT.md) → bấm **Pin discussion**.

## 2. Issues

Không cần bật gì — repo đã kèm 5 issue form trong `.github/ISSUE_TEMPLATE/`
(báo lỗi nội dung, gợi ý tài nguyên, đề xuất project, đề xuất bài viết, lỗi website) và đã tắt
blank issue. **Việc cần làm một lần:** mở file `.github/ISSUE_TEMPLATE/config.yml` sửa
`USERNAME/ic-design-hub` thành repo thật của bạn (link "Hỏi đáp… (Discussions)").

Gợi ý tạo label (Settings → Labels): `content-error`, `resource-suggestion`,
`project-proposal`, `article-proposal`, `website-bug` (issue form đã gắn sẵn các label này —
GitHub tự tạo label khi issue đầu tiên dùng nó, hoặc bạn tạo trước cho chủ động).

## 3. Pull Request

`.github/PULL_REQUEST_TEMPLATE.md` đã có sẵn — không cần cấu hình. Khuyến nghị bật
branch protection cho `main`: Settings → Branches → Add rule → Require a pull request
before merging (tùy mức bạn muốn chặt chẽ).

## 4. Cập nhật URL trong cấu hình trung tâm

Sau khi biết tên repo thật, sửa **một** file `src/config/site.ts`:

```ts
repoUrl: "https://github.com/<username>/<repo>",
siteUrl: "https://<username>.github.io",
basePath: "/<repo>",
```

Trang Cộng đồng, footer, nút "Vào Discussions"… tự trỏ đúng sau lần build kế tiếp
(link Discussions/Issues **sinh từ repoUrl**, không hard-code ở bất kỳ trang nào).

## 5. Điều hành (moderation)

- Quy tắc: `CODE_OF_CONDUCT.md` (nhắc nhở → xóa/khóa → hạn chế tham gia).
- Q&A: đánh dấu câu trả lời đúng (Mark as answer) để người sau tra cứu nhanh.
- Câu hỏi lặp lại nhiều lần → ứng viên tốt cho một bài viết mới trên hub (mẫu issue
  "Đề xuất bài viết").
- Discussions có thể chuyển đổi thành Issue khi hóa ra là việc cần làm — dùng nút
  "Convert to issue".
