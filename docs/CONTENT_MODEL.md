# CONTENT_MODEL — mô hình nội dung (6 collection)

Schema chuẩn nằm ở `src/content.config.ts` (zod — validate lúc build; sai là build fail với
thông báo rõ). Tài liệu này là bản đọc cho con người. Template điền sẵn: `templates/*.md`.

## Trường chung (mọi collection trừ announcements)

| Trường | Bắt buộc | Ý nghĩa |
|---|---|---|
| `title` | ✔ | Tiêu đề |
| `summary` | ✔ | 1–3 câu — hiện ở card/danh sách/meta description |
| `date` | ✔ | Ngày công bố `YYYY-MM-DD` |
| `updated` | | Ngày cập nhật cuối (chỉ khi đã sửa) |
| `draft` | | `true` = nháp, không lên site/search/RSS (mặc định `false`) |
| `featured` | | Ghim nổi bật (mặc định `false`) |
| `track` | | Id track trong `src/data/tracks.ts` |
| `tags` | | Mảng tag chữ thường không dấu cách |
| `lang` | | `vi` (mặc định) \| `en` — trù bị song ngữ |
| `author` | | CHỈ điền khi không phải tác giả mặc định (hub tự dùng danh tính chuẩn từ config) |
| `attribution` | | Ghi nguồn tư liệu bên thứ ba dùng trong bài |
| `references` | | Mảng `{label, url?, note?, needsVerification?}` — nguồn chưa kiểm chứng đánh dấu rõ |
| `relatedArticles/Projects/Research` | | Slug nội dung liên quan → khối "Kết nối tri thức" (learning → project → research) |

## articles — bài viết

`category`: `tutorial | concept | technical-note | mentoring | news` ·
`difficulty`: `foundation | intermediate | advanced` ·
`prerequisites[]`, `outcomes[]` ·
`status`: `draft | published | archived`.
Thời gian đọc tính tự động — không phải điền.

## research — ghi chú nghiên cứu

`kind`: `note | paper-reading | question | roadmap | methodology | experiment-log` ·
`status` (§26 đặc tả): `idea | exploratory | active | validated | superseded | archived` ·
**`evidenceLevel` (bắt buộc)**: `established | heuristic | hypothesis | question | evidence |
interpretation` — nhãn phân tách "kiến thức đã xác lập / kinh nghiệm / giả thuyết / câu hỏi /
bằng chứng thực nghiệm / diễn giải tác giả", hiển thị ngay trên trang ·
`paper` (cho paper-reading).

## projects — project (đối tượng tri thức hạng nhất)

`kind`: `learning | fpga | ic-design | student | research` ·
`status`: `proposed | active | completed | paused | archived` ·
`platform`, `tools[]`, `mentor`, `contributors[]` (chỉ khi có đồng ý công khai),
`repoUrl/demoUrl/paperUrl`, `prerequisites[]`, `milestones[{label,done}]`, `deliverables[]`,
`reproducibility`, `limitations[]`, `futureWork[]`.

## learning-paths — lộ trình học

`level`, `duration`, `audience`, `steps[{label,url,note?}]` (bắt buộc ≥1 chặng — url nhận
đường dẫn nội bộ kể cả `legacy/...` hoặc URL ngoài).

## resources — tài nguyên

`kind`: `tool | book | paper | software | hdl-eda | reference | course` ·
`url`, `license` (ghi khi biết) · **`whyRecommended` (bắt buộc)** — vì sao đáng dùng.

## announcements — thông báo ngắn

Chỉ `title/summary/date/draft/lang/linkUrl` — tin hiện ở "Cập nhật mới" trang chủ + RSS,
không có trang riêng.

## Phiên bản hóa (§26 đặc tả — mỗi loại một semantics, KHÔNG dùng chung)

| Loại | Cơ chế phiên bản |
|---|---|
| Giáo trình | V1 → V2 → V3 → V4… (immutable snapshot, xem `docs/VERSIONING_POLICY.md`) |
| Bài viết | `date` + `updated` (+ ghi chú trong bài khi hiệu chỉnh đổi kết luận) |
| Ghi chú nghiên cứu | trường `status` (idea → … → validated/superseded/archived) |
| Project | trường `status` (proposed → active → completed/paused/archived) |

## Quan hệ tri thức (§10 đặc tả)

Chuỗi Concept → Lesson → Lab → Project → Trade-off → Research question được thể hiện bằng:
`prerequisites` (học trước), `relatedArticles/Projects/Research` (liên kết ngang, khai báo
tường minh trong frontmatter — chỉ tạo khi quan hệ có thật và bảo vệ được về mặt kỹ thuật),
và các `steps` của learning-path trỏ vào giáo trình/bài viết/project.
