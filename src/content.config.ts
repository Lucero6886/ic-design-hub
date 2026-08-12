/**
 * MÔ HÌNH NỘI DUNG (content collections) — schema kiểm chứng lúc build.
 *
 * Frontmatter sai → BUILD FAIL với thông báo rõ ràng (không render sai âm thầm).
 * Chi tiết từng trường + ví dụ: docs/CONTENT_MODEL.md và templates/*.md
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { TRACK_IDS } from "./data/tracks";

/** Trường chung của mọi loại nội dung */
const common = {
  title: z.string().min(3, "title quá ngắn"),
  /** Tóm tắt 1–3 câu — hiển thị ở card, danh sách, meta description */
  summary: z.string().min(10, "summary cần ít nhất 10 ký tự"),
  /** Ngày công bố */
  date: z.coerce.date(),
  /** Ngày cập nhật cuối (bỏ trống nếu chưa sửa lần nào) */
  updated: z.coerce.date().optional(),
  /** Bản nháp: true → KHÔNG xuất hiện trên site production, search, RSS, sitemap */
  draft: z.boolean().default(false),
  /** Ghim nổi bật trên trang chủ/section */
  featured: z.boolean().default(false),
  /** Track kiến thức IC (taxonomy trung tâm — xem src/data/tracks.ts) */
  track: z.enum(TRACK_IDS).optional(),
  /** Tag tự do (chữ thường, không dấu cách — vd "fsm", "uart", "sta") */
  tags: z.array(z.string()).default([]),
  /** Ngôn ngữ của nội dung (mặc định tiếng Việt; chuẩn bị cho song ngữ sau này) */
  lang: z.enum(["vi", "en"]).default("vi"),
  /**
   * Tác giả — mặc định là danh tính chuẩn trong src/config/site.ts.
   * CHỈ điền khi người viết KHÔNG phải tác giả mặc định (vd bài đóng góp của sinh viên).
   */
  author: z.string().optional(),
  /** Ghi chú bản quyền/attribution riêng cho tư liệu bên thứ ba dùng trong bài */
  attribution: z.string().optional(),
  /** Tài liệu tham khảo */
  references: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url().optional(),
        note: z.string().optional(),
        /** true khi nguồn chưa kiểm chứng được — hiển thị cảnh báo rõ ràng */
        needsVerification: z.boolean().default(false),
      }),
    )
    .default([]),
  /** Liên kết tri thức: slug của nội dung liên quan (learning → project → research) */
  relatedArticles: z.array(z.string()).default([]),
  relatedProjects: z.array(z.string()).default([]),
  relatedResearch: z.array(z.string()).default([]),
};

/** BÀI VIẾT — bài giảng, tutorial, khái niệm, ghi chú kỹ thuật */
const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    ...common,
    /** Thể loại bài viết */
    category: z
      .enum(["tutorial", "concept", "technical-note", "mentoring", "news"])
      .default("technical-note"),
    difficulty: z.enum(["foundation", "intermediate", "advanced"]).optional(),
    /** Kiến thức cần có trước khi đọc */
    prerequisites: z.array(z.string()).default([]),
    /** Chuẩn đầu ra: đọc xong bài này, người học làm được gì */
    outcomes: z.array(z.string()).default([]),
    status: z.enum(["draft", "published", "archived"]).default("published"),
  }),
});

/** GHI CHÚ NGHIÊN CỨU — research note, paper reading, câu hỏi nghiên cứu */
const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: z.object({
    ...common,
    kind: z
      .enum(["note", "paper-reading", "question", "roadmap", "methodology", "experiment-log"])
      .default("note"),
    /** Trạng thái nghiên cứu (§26): idea → exploratory → active → validated / superseded / archived */
    status: z
      .enum(["idea", "exploratory", "active", "validated", "superseded", "archived"])
      .default("idea"),
    /**
     * Mức bằng chứng — BẮT BUỘC để phân tách rõ (theo §11):
     * established (kiến thức đã xác lập) · heuristic (kinh nghiệm kỹ thuật) ·
     * hypothesis (giả thuyết) · question (câu hỏi mở) · evidence (có dữ liệu thực nghiệm) ·
     * interpretation (diễn giải của tác giả)
     */
    evidenceLevel: z.enum([
      "established",
      "heuristic",
      "hypothesis",
      "question",
      "evidence",
      "interpretation",
    ]),
    /** Với paper-reading: bài báo nào (citation đầy đủ trong references) */
    paper: z.string().optional(),
  }),
});

/** PROJECT — đối tượng tri thức hạng nhất (không phải blog post) */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    ...common,
    kind: z
      .enum(["learning", "fpga", "ic-design", "student", "research"])
      .default("learning"),
    status: z
      .enum(["proposed", "active", "completed", "paused", "archived"])
      .default("proposed"),
    difficulty: z.enum(["foundation", "intermediate", "advanced"]).optional(),
    /** Nền tảng mục tiêu: FPGA / ASIC / simulation-only… */
    platform: z.string().optional(),
    /** Công cụ sử dụng */
    tools: z.array(z.string()).default([]),
    mentor: z.string().optional(),
    /**
     * Người đóng góp — CHỈ ghi tên khi đã có sự đồng ý công khai rõ ràng
     * (không bao giờ tự động đưa thông tin sinh viên lên site).
     */
    contributors: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    paperUrl: z.string().url().optional(),
    prerequisites: z.array(z.string()).default([]),
    /** Mốc tiến độ */
    milestones: z
      .array(z.object({ label: z.string(), done: z.boolean().default(false) }))
      .default([]),
    deliverables: z.array(z.string()).default([]),
    /** Thông tin tái lập (reproducibility): tool + version + lệnh chạy */
    reproducibility: z.string().optional(),
    limitations: z.array(z.string()).default([]),
    futureWork: z.array(z.string()).default([]),
  }),
});

/** LỘ TRÌNH HỌC — learning path có thứ tự, trỏ vào bài viết/giáo trình/project */
const learningPaths = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/learning-paths" }),
  schema: z.object({
    ...common,
    audience: z.string().optional(),
    /** Thời lượng dự kiến, vd "12 tuần" */
    duration: z.string().optional(),
    level: z.enum(["foundation", "intermediate", "advanced"]).default("foundation"),
    /** Các chặng của lộ trình; url có thể là đường dẫn nội bộ (kể cả legacy/...) hoặc ngoài */
    steps: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          note: z.string().optional(),
        }),
      )
      .min(1),
  }),
});

/** TÀI NGUYÊN — tool, sách, paper, phần mềm, tài liệu HDL/EDA */
const resources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resources" }),
  schema: z.object({
    ...common,
    kind: z
      .enum(["tool", "book", "paper", "software", "hdl-eda", "reference", "course"])
      .default("reference"),
    url: z.string().url().optional(),
    /** Bản quyền/giấy phép của tài nguyên bên thứ ba (luôn ghi rõ khi biết) */
    license: z.string().optional(),
    /** Vì sao tài nguyên này đáng dùng — bắt buộc, tránh danh sách link vô hồn */
    whyRecommended: z.string().min(10),
  }),
});

/** THÔNG BÁO — tin ngắn của hub (khai giảng, phát hành phiên bản, sự kiện) */
const announcements = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/announcements" }),
  schema: z.object({
    title: common.title,
    summary: common.summary,
    date: common.date,
    draft: common.draft,
    lang: common.lang,
    /** Thông báo có thể chỉ là một đoạn ngắn không cần trang riêng */
    linkUrl: z.string().optional(),
  }),
});

export const collections = {
  articles,
  research,
  projects,
  "learning-paths": learningPaths,
  resources,
  announcements,
};
