import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'fs';

const DIR = new URL('../', import.meta.url).pathname;  // thư mục version3/

const DOCS = [
  { md: 'README.md',              title: 'README — Hướng dẫn sử dụng bộ tài liệu', sub: 'Bắt đầu từ đây: cách dùng, cấu trúc thư mục, chương trình 12 tuần', short: 'README' },
  { md: 'CURRICULUM_MAP.md',      title: 'Bản đồ chương trình 12 tuần',            sub: 'Khái niệm · kỹ năng · artifact · dependency · vòng xoáy học tập', short: 'Curriculum Map' },
  { md: 'MENTOR_GUIDE.md',        title: 'Cẩm nang vận hành cho mentor',           sub: 'Chuẩn bị · khung 60 phút · chẩn đoán hiểu sai · đánh giá · mentoring nghiên cứu', short: 'Mentor Guide' },
  { md: 'PROJECT_GUIDE.md',       title: 'Đặc tả project tích hợp (Tuần 9–11)',    sub: 'Smart Traffic Controller: spec · kiến trúc · interface · milestone · verification', short: 'Project Guide' },
  { md: 'TECHNICAL_AUDIT.md',     title: 'Hiệu chỉnh kỹ thuật v2 → v3',            sub: 'Từng phát biểu sai của Version 2 và bản đúng đã dùng trong Version 3', short: 'Technical Audit' },
  { md: 'CHANGELOG_V2_TO_V3.md',  title: 'Nhật ký thay đổi Version 2 → Version 3', sub: 'Thay đổi có ý nghĩa, nhóm theo 7 hạng mục', short: 'Changelog' },
  { md: 'VALIDATION_REPORT.md',   title: 'Báo cáo kiểm định Version 3',            sub: 'Cấu trúc · trình duyệt offline · biên dịch và mô phỏng RTL thật', short: 'Validation' },
];
// implementation-notes.html là trang biên soạn riêng (không sinh tự động) — vẫn nằm trong thanh điều hướng
const NAVALL = [...DOCS.map(d => ({ href: d.md.replace(/\.md$/, '.html'), short: d.short })),
                { href: 'implementation-notes.html', short: 'Implementation Notes' }];

const MD2HTML = Object.fromEntries([...DOCS.map(d => [d.md, d.md.replace(/\.md$/, '.html')]),
                                    ['implementation-notes.md', 'implementation-notes.html']]);

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// id luôn bắt đầu bằng chữ ("m-") để dùng được với querySelector/CSS
const slug = s => 'm-' + s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 46);

for (const doc of DOCS) {
  const raw = readFileSync(DIR + doc.md, 'utf8');
  // bỏ khối bản quyền cuối file (đã có ở chân trang HTML)
  const body = raw.replace(/\n---\n\n\*\*Khoa Điện[\s\S]*$/, '\n');

  let html = marked.parse(body, { mangle: false, headerIds: false });

  // 1) bảng: thêm class + bọc cuộn ngang
  html = html.replace(/<table>/g, '<div class="tblwrap"><table class="tbl">').replace(/<\/table>/g, '</table></div>');
  // 2) code block: dùng style code chung, không tô màu tự động (nhiều khối là sơ đồ ASCII)
  html = html.replace(/<pre><code(?:\s+class="[^"]*")?>/g, '<pre class="code" data-nohl><code>');
  // 3) id cho h2 để làm mục lục
  const toc = [];
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, t) => {
    const text = t.replace(/<[^>]+>/g, '');
    const id = slug(text) || 'muc-' + (toc.length + 1);
    toc.push({ id, text });
    return `<h2 id="${id}">${t}</h2>`;
  });
  // 4) liên kết chéo giữa các tài liệu: <code>X.md</code> → link sang X.html
  for (const [md, h] of Object.entries(MD2HTML)) {
    if (md === doc.md) continue;
    html = html.split(`<code>${md}</code>`).join(`<a href="${h}" title="Mở ${h}"><code>${md}</code></a>`);
  }
  html = html.replace(/href="([A-Za-z0-9_.-]+)\.md"/g, (m, n) => MD2HTML[n + '.md'] ? `href="${MD2HTML[n + '.md']}"` : m);
  // 5) trỏ tới trang tuần: <code>WeekNN.html</code> → link
  html = html.replace(/<code>(Week\d\d\.html|index\.html)<\/code>/g, '<a href="$1"><code>$1</code></a>');
  // 6) h1 đầu tiên đã nằm ở hero → bỏ khỏi thân bài
  html = html.replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/, '');

  // Nếu tiêu đề đã tự đánh số (1., 5.1 …) thì dùng danh sách không đánh số để tránh "1. 1."
  const selfNumbered = toc.filter(t => /^\d/.test(t.text.trim())).length >= Math.ceil(toc.length / 2);
  const tag = selfNumbered ? 'ul class="plain"' : 'ol';
  const tocHtml = toc.length >= 3
    ? `<nav class="doc-toc"><b>Nội dung tài liệu</b><${tag}>${toc.map(t => `<li><a href="#${t.id}">${t.text}</a></li>`).join('')}</${selfNumbered ? 'ul' : 'ol'}></nav>\n`
    : '';

  const navChips = NAVALL.map(n => n.href === doc.md.replace(/\.md$/, '.html')
    ? `<span class="chip active">${n.short}</span>`
    : `<a class="chip" href="${n.href}">${n.short}</a>`).join('\n      ');

  const footNav = NAVALL.filter(n => n.href !== doc.md.replace(/\.md$/, '.html'))
    .map(n => `<a href="${n.href}">${n.short}</a>`).join('\n      ');

  const out = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="Giảng Viên Đinh Văn Nam">
<meta name="copyright" content="© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa">
<meta name="description" content="${esc(doc.title)} — IC Design Mentoring Version 3. Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa. Biên soạn: Giảng Viên Đinh Văn Nam.">
<title>${esc(doc.title)} | IC Design Mentoring v3</title>
<link rel="stylesheet" href="css/style.css">
<script src="js/app.js" defer></script>
</head>
<body data-week="doc">

<header class="topbar">
  <div class="topbar-in">
    <a class="brand" href="index.html"><span class="logo">IC</span>
      <span>IC Design Mentoring<small>Tài liệu vận hành · Version 3</small></span></a>
    <nav class="layer-chips">
      <a class="chip" href="../../index.html" title="Learning Hub — cổng ba phiên bản giáo trình; đây là V3, bản hiện hành được khuyến nghị">⌂ Hub · V3</a>
      ${navChips}
      <a class="chip" href="index.html">← Mục lục</a>
    </nav>
  </div>
  <div class="scrollbar"><div></div></div>
</header>

<section class="doc-hero">
  <div class="wrap">
    <div class="pill-row">
      <span class="pill">Tài liệu vận hành</span>
      <span class="pill acc">${esc(doc.short)}</span>
      <span class="pill">Khoa Điện – Điện tử · ĐH Phenikaa</span>
    </div>
    <h1>${esc(doc.title)}</h1>
    <p class="sub">${esc(doc.sub)}</p>
    <p class="src">Bản văn bản gốc: <b>${doc.md}</b> · cùng thư mục</p>
  </div>
</section>

<main class="wrap doc-main">
${tocHtml}<article class="doc-body">
${html.trim()}
</article>

<div class="doc-foot-nav">
      <a class="home" href="index.html">← Mục lục chương trình</a>
      ${footNav}
</div>

<div class="footer">
      <b>IC Design Mentoring — Version 3 · Phase 1</b>
      <span class="org">Khoa Điện – Điện tử · Trường Kỹ thuật · Đại học Phenikaa</span>
      <span>Biên soạn: <b style="display:inline">Giảng Viên Đinh Văn Nam</b></span>
      <span class="cr">© 2026 · Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. Tài liệu phục vụ đào tạo — vui lòng giữ nguyên thông tin tác giả khi chia sẻ.</span>
      <span class="cr">Hoạt động offline — không cần Internet.</span>
    </div>
</main>
</body>
</html>
`;
  const outName = doc.md.replace(/\.md$/, '.html');
  writeFileSync(DIR + outName, out, 'utf8');
  console.log(`✓ ${outName.padEnd(26)} ${(out.length / 1024).toFixed(1)} KB · ${toc.length} mục trong TOC`);
}
