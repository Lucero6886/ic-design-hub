# GITHUB_PLAYBOOK — khai thác GitHub cho dạy học, nghiên cứu và cộng đồng vi mạch

Dành cho giảng viên phụ trách hub. Trả lời ba câu hỏi: (1) GitHub **Projects** là gì và dùng
thế nào; (2) gắn các project của hub vào đó ra sao; (3) bức tranh đầy đủ: từng tính năng
GitHub phục vụ việc học – nghiên cứu – cộng đồng ở chỗ nào, nhịp vận hành, và những gì không
nên làm.

---

## 1. GitHub Projects là gì — hiểu bằng bản chất

Tab **Projects** trên repo là **bảng điều phối công việc** (project board). Bản chất của nó:

- **Đơn vị công việc là item** — mỗi item là một **Issue**, một **Pull Request**, hoặc một
  dòng nháp (draft). Board không chứa "nội dung", nó chứa **trạng thái của việc**.
- Mỗi item mang các **trường (field)**: Status (Todo / In Progress / Done — tùy biến được),
  người phụ trách, nhãn, và **trường tự tạo** (ví dụ: "Tuần", "Nhóm", "Track A–E").
- Một project xem được theo 3 kiểu: **Board** (cột kéo-thả kiểu Kanban), **Table** (bảng như
  Excel), **Roadmap** (dòng thời gian). Cùng dữ liệu, ba cách nhìn.
- Có **workflow tự động**: issue bị đóng → tự nhảy sang Done; item mới khớp bộ lọc → tự vào
  board. Không phải kéo tay từng thẻ.
- Project sống ở **cấp tài khoản/tổ chức** và *liên kết* vào repo (nên một board gom được
  issue từ NHIỀU repo — chìa khóa cho mô hình nhóm bên dưới). Có thể đặt **public** để cả
  cộng đồng xem tiến độ.

Phân biệt quan trọng với hub của thầy: trang **Project trên website hub** là *hồ sơ tri thức*
(đặc tả, mục tiêu, milestone, kết quả — bền vững, có bản quyền); còn **GitHub Projects** là
*nhịp thở hằng tuần* (ai đang làm gì, kẹt ở đâu, xong chưa). Hai thứ bổ sung nhau, không
thay thế nhau.

## 2. Mô hình 3 tầng cho hệ sinh thái của thầy

```text
TẦNG TRI THỨC   trang /projects/ trên hub  ← đề bài, spec, milestone, kết quả cuối
TẦNG ĐIỀU PHỐI  GitHub Projects (board)    ← trạng thái tuần: nhóm nào đang ở milestone nào
TẦNG SẢN XUẤT   repo riêng của từng nhóm   ← code + testbench + PR review chéo + CI mô phỏng
```

Luồng chạy một đợt project (4 tuần, khớp quy trình đã có trong EXPANSION_REVIEW):

1. Nhóm đọc đề trên hub → mở **Issue** "Đề xuất project" trên repo `ic-design-hub`
   (mẫu có sẵn) — issue này chính là "thẻ" đại diện nhóm.
2. Thầy add issue đó vào board **"Phase 2 — Đợt 1"** → đặt trường Nhóm/Track/Tuần.
3. Nhóm tạo **repo riêng** từ khung `templates/team-repo/` (đã kèm Makefile + CI tự mô phỏng)
   — link repo dán vào issue.
4. Mỗi tuần: nhóm cập nhật issue một comment ngắn (link log tuần + trạng thái milestone);
   thẻ trên board nhảy cột theo milestone T1→T4.
5. Bảo vệ xong → issue đóng (tự sang Done) → nhóm mở **PR** đăng trang project lên hub
   (contributors ghi tên khi các em đồng ý) → showcase trên Discussions.

Board public = sinh viên khóa sau và cộng đồng nhìn thấy "một đợt project trông như thế nào"
— tự nó là tài liệu tuyển thành viên tốt nhất.

## 3. Tạo board đầu tiên — từng bước bấm chuột (~15 phút)

1. Trên trang cá nhân GitHub (hoặc repo) → tab **Projects** → **New project** → chọn
   **Board** → đặt tên `Phase 2 — Đợt 1 (2026)`.
2. Sửa cột Status thành đúng milestone của đề bài: `Đề xuất` · `T1 — Spec/Interface` ·
   `T2 — Module lẻ pass TB` · `T3 — Tích hợp` · `T4 — Bảo vệ` · `Hoàn thành`.
3. **+ Add item** → gõ `#` → chọn issue "Đề xuất project" của từng nhóm (issue nằm ở repo
   `ic-design-hub`).
4. Thêm trường tự tạo: nút **+** ở góc bảng → New field → `Nhóm` (text), `Track` (single
   select: A–E), `Repo` (text — dán link repo nhóm).
5. Bật tự động: biểu tượng **⋯ → Workflows** → bật *Item closed → Done* và *Auto-add* với bộ
   lọc `label:project-proposal` (issue mở từ mẫu đề xuất tự vào board).
6. **⋯ → Settings → Visibility: Public** — cộng đồng xem được, chỉ thầy/nhóm sửa được.
7. Về repo `ic-design-hub` → tab Projects → **Link a project** → chọn board vừa tạo (để tab
   Projects của repo không còn trống).

Board thứ hai nên có (5 phút): **"Vận hành hub"** — auto-add mọi issue của repo
(`content-error`, `resource-suggestion`, `article-proposal`, `website-bug`) để thầy nhìn một
chỗ thấy hết việc tồn của website, khỏi lục từng tab.

## 4. Bản đồ đầy đủ: tính năng GitHub → việc của thầy

| Tính năng | Dùng cho | Trạng thái với hub |
|---|---|---|
| **Pages + Actions** | Website hub tự build/deploy, tin tức tự cập nhật | ✅ đang chạy |
| **Discussions** | Q&A, thảo luận tuần, showcase, radar bán dẫn | ✅ đã có hướng dẫn bật (COMMUNITY_SETUP) |
| **Issues + form mẫu** | Báo lỗi nội dung, đề xuất project/bài viết/tài nguyên | ✅ 5 mẫu sẵn |
| **Pull Request + review chéo** | Kỹ năng teamwork công nghiệp thật; đóng góp nội dung hub | ✅ template có cam kết bản quyền |
| **Projects (bài này)** | Điều phối đợt project + việc vận hành hub | 🔲 thầy tạo theo mục 3 |
| **Template repository** | Khung repo nhóm 1-click (`Use this template`) | 🔲 tạo từ `templates/team-repo/` — xem mục 5 |
| **Actions trên repo nhóm** | **CI tự mô phỏng iverilog mỗi push** — trọng tài verification tự động | ✅ file `ci.yml` viết sẵn trong khung |
| **Releases + tag** | Mốc phát hành giáo trình (vd `curriculum-v3.1`) kèm ghi chú | 🔲 dùng khi có đợt sửa V3 đáng kể |
| **Topics + About + social preview** | Người quan tâm vi mạch TÌM THẤY repo | 🔲 5 phút — mục 6 |
| **GitHub Classroom** | Lớp đông: phát đề từ template, thu bài theo deadline, **autograding chạy testbench tự chấm** | 🔲 cân nhắc khi dạy lớp >20 SV — mục 7 |
| **Organization** | Gom repo các nhóm về một mái nhà, phân quyền theo team | 🔲 khi ≥2 đợt project — mục 8 |

## 5. Template repository cho nhóm (làm một lần, 10 phút)

Khung đã có sẵn trong repo hub: `templates/team-repo/` — gồm cấu trúc `rtl/ tb/ docs/`,
Makefile (`make sim` — **đã kiểm chứng chạy thật**), ví dụ counter + testbench self-check,
mẫu log tuần, luật làm việc nhóm, và CI mô phỏng (`ci.yml` — đổi tên thư mục
`github-workflows/` → `.github/workflows/` khi dùng). Cách biến nó thành template 1-click:

1. Tạo repo mới trên GitHub: `ic-team-template` (public).
2. Copy nội dung `templates/team-repo/` vào, đổi tên thư mục workflow như hướng dẫn, push.
3. Settings của repo đó → tích **Template repository**.
4. Từ nay mỗi nhóm bấm **Use this template → Create a new repository** — 30 giây có repo
   chuẩn kèm CI: push phát đầu tiên là tab Actions tự biên dịch + mô phỏng, testbench sai
   là đỏ. "CI xanh mới được merge" — kỷ luật verification thành phản xạ.

## 6. Để cộng đồng vi mạch TÌM THẤY (5 phút, làm ngay được)

- Repo `ic-design-hub` → bánh răng cạnh **About** → Description: một câu có từ khóa
  ("Cộng đồng học tập & nghiên cứu thiết kế vi mạch tiếng Việt — giáo trình 12 tuần, project
  FPGA, mentoring"); Website: link Pages; **Topics**: `ic-design`, `fpga`, `systemverilog`,
  `vietnamese`, `education`, `rtl`, `semiconductor`, `asic`.
- Settings → General → Social preview: tải một ảnh 1280×640 (chụp trang chủ hub là đủ) —
  link share lên Zalo/Facebook sẽ hiện ảnh tử tế.
- Nhắc sinh viên **Star + Watch** repo: Watch = nhận thông báo Discussions (đây là "kênh
  chìm" giữ cộng đồng quay lại); Star = tín hiệu uy tín khi người ngoài đánh giá dự án.

## 7. GitHub Classroom — khi thành môn học chính thức

Khi dạy lớp đông thay vì nhóm mentoring nhỏ: [GitHub Classroom](https://classroom.github.com)
(miễn phí cho giáo dục) phát đề tự động từ template repo cho từng SV/nhóm, thu theo deadline,
và **autograding**: mỗi lần SV push, test tự chạy và chấm — với vi mạch, "test" chính là
`make sim` + kiểm không có `ERROR`, tức là dùng lại đúng CI trong khung team-repo. Thầy nhìn
một bảng thấy cả lớp ai xanh ai đỏ. Nên thí điểm 1 assignment nhỏ (counter mod-6) trước khi
dùng cho project lớn.

## 8. Lộ trình Organization (chưa cần ngay)

Khi có ≥2 đợt project song song, lập **Organization** (vd `phenikaa-ic`): repo hub + template
+ repo các nhóm về một mái nhà; mỗi nhóm một **Team** với quyền đúng repo của mình; Projects
cấp org gom nhìn mọi đợt; trang org có README giới thiệu (dùng lại nội dung About của hub).
Nguyên tắc chuyển: **chuyển dần** — hub cá nhân vẫn chạy tốt, chỉ chuyển khi số repo nhóm
bắt đầu khó quản trên tài khoản cá nhân. (Lưu ý kỹ thuật khi ấy: transfer repo sang org sẽ
đổi URL — cập nhật `siteUrl/repoUrl/basePath` trong `src/config/site.ts` và bật lại Pages.)

## 9. Nhịp vận hành gợi ý (tổng ~30 phút/tuần)

- **Thứ 2 (10′):** đăng thread "[Tuần N] Thảo luận" (ngân hàng câu hỏi có sẵn); liếc board
  Phase 2 — nhóm nào 2 tuần không nhúc nhích thì hỏi thăm trong issue của nhóm.
- **Trong tuần (0′):** CI + PR review chéo tự vận hành; thầy chỉ vào khi được tag.
- **Thứ 6 (15′):** đọc log tuần các nhóm (link trong issue); trả lời Discussions tồn;
  câu hỏi lặp ≥2 lần → ghi vào danh sách FAQ.
- **Mỗi tháng (30′):** seminar Radar bán dẫn; kéo thẻ board; 1 tin hay → bài `category: news`.

Số đo cộng đồng lành mạnh (xem trong **Insights** của repo + số liệu Discussions): số câu
hỏi được trả lời trong 48h, số PR từ sinh viên được merge, số nhóm qua milestone đúng hạn —
KHÔNG chạy theo số Star.

## 10. Những điều KHÔNG nên làm

- **Không** bắt sinh viên học Projects/board trước khi biết Issue + PR — board chỉ có nghĩa
  khi bên dưới có việc thật đang chạy.
- **Không** đưa điểm số/danh sách lớp lên board public — board chỉ chứa trạng thái kỹ thuật;
  điểm ở lớp (đúng chính sách riêng tư của hub).
- **Không** tạo 5 board khi chưa dùng hết 1 — bắt đầu với "Phase 2 — Đợt 1" + "Vận hành hub".
- **Không** dùng board thay cho trang project của hub — kết quả cuối (spec, waveform, bài
  học) phải quay về trang hub, nơi có bản quyền, đường dẫn bền và tìm kiếm được; board là
  công cụ tạm thời theo đợt.
