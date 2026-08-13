/**
 * ============================================================================
 * CẤU HÌNH TRUNG TÂM CỦA WEBSITE — NGUỒN SỰ THẬT DUY NHẤT (single source of truth)
 * ============================================================================
 *
 * MỌI thông tin danh tính (tác giả, đơn vị, bản quyền, tiêu đề site, URL…)
 * chỉ được khai báo TẠI ĐÂY. Layout, component, trang, RSS, sitemap, search
 * đều đọc từ file này — không lặp lại chuỗi danh tính ở bất kỳ file nào khác.
 *
 * Khi cần đổi thông tin (ví dụ điền URL repo GitHub thật):
 *   1. Sửa đúng file này.
 *   2. Chạy `npm run build` — toàn site cập nhật theo.
 * ============================================================================
 */

export const SITE = {
  /** Tiêu đề đầy đủ của site (dùng cho <title>, OG, RSS) */
  title: "IC Design Learning & Research Hub",
  /** Tên ngắn hiển thị trên thanh điều hướng */
  shortName: "IC Design Hub",
  /** Mô tả mặc định (meta description, RSS) */
  description:
    "Cộng đồng học tập, mentoring và nghiên cứu thiết kế vi mạch (IC Design · RTL · FPGA · ASIC) bằng tiếng Việt — giáo trình có phiên bản, bài viết kỹ thuật, project và lộ trình nghiên cứu.",
  /** Ngôn ngữ chính của site */
  lang: "vi",

  /**
   * URL nơi site được deploy (KHÔNG có đường dẫn con).
   * Ví dụ: "https://username.github.io"
   * Có thể ghi đè lúc build bằng biến môi trường ASTRO_SITE (CI tự làm việc này).
   */
  siteUrl: "https://lucero6886.github.io",

  /**
   * Đường dẫn con khi deploy dạng project site GitHub Pages: "/TEN-REPO".
   * Deploy ở gốc domain thì để "/".
   * Có thể ghi đè lúc build bằng biến môi trường ASTRO_BASE (CI tự làm việc này).
   */
  basePath: "/ic-design-hub",

  /** URL repository GitHub — cộng đồng (Discussions/Issues) dẫn từ đây. */
  repoUrl: "https://github.com/Lucero6886/ic-design-hub",
} as const;

export const AUTHOR = {
  /** Danh tính công khai chuẩn của tác giả/mentor (theo quy định §0 — không tự đổi) */
  name: "Giảng Viên Đinh Văn Nam",
  affiliation: "Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa",
  /** Dòng đơn vị hiển thị dạng ngắn trên footer/hero */
  affiliationDisplay: "Khoa Điện-Điện Tử · Trường Kỹ Thuật · Đại học Phenikaa",
  /** Email liên hệ công khai (để trống nếu chưa muốn công bố) */
  email: "",
} as const;

export const COPYRIGHT = {
  holder: "Giảng Viên Đinh Văn Nam",
  holderWithAffiliation:
    "Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa",
  startYear: 2026,
  /** Câu bản quyền chuẩn (canonical notice) — dùng nguyên văn ở footer và trang bản quyền */
  notice(currentYear: number = new Date().getFullYear()): string {
    const range =
      currentYear > this.startYear ? `${this.startYear}–${currentYear}` : `${this.startYear}–present`;
    return `© ${range}. Bản quyền thuộc về Giảng Viên Đinh Văn Nam, Khoa Điện-Điện Tử, Trường Kỹ Thuật, Đại học Phenikaa. All rights reserved unless otherwise stated.`;
  },
} as const;

/** Điều hướng chính — sửa MỘT nơi này, header/footer/sitemap-nav cập nhật theo */
export const NAV = [
  { href: "learn/", label: "Học" },
  { href: "articles/", label: "Bài viết" },
  { href: "research/", label: "Nghiên cứu" },
  { href: "projects/", label: "Project" },
  { href: "mentoring/", label: "Mentoring" },
  { href: "resources/", label: "Tài nguyên" },
  { href: "news/", label: "Tin tức" },
  { href: "community/", label: "Cộng đồng" },
  { href: "about/", label: "Giới thiệu" },
] as const;

/** Đường dẫn tới giáo trình legacy (cây bảo tồn nguyên trạng trong public/legacy/) */
export const LEGACY = {
  root: "legacy/",
  hubIndex: "legacy/index.html",
  evolution: "legacy/evolution.html",
  about: "legacy/about.html",
  v1: "legacy/versions/v1/index.html",
  v2: "legacy/versions/v2/index.html",
  v3: "legacy/versions/v3/index.html",
  v3CurriculumMap: "legacy/versions/v3/CURRICULUM_MAP.html",
  v3MentorGuide: "legacy/versions/v3/MENTOR_GUIDE.html",
  v3ProjectGuide: "legacy/versions/v3/PROJECT_GUIDE.html",
  v3TechnicalAudit: "legacy/versions/v3/TECHNICAL_AUDIT.html",
  v3ValidationReport: "legacy/versions/v3/VALIDATION_REPORT.html",
} as const;

/** Liên kết cộng đồng — sinh từ repoUrl để không phải hard-code URL Discussions */
export const COMMUNITY = {
  discussionsUrl: () => `${SITE.repoUrl}/discussions`,
  issuesUrl: () => `${SITE.repoUrl}/issues`,
  newIssueUrl: () => `${SITE.repoUrl}/issues/new/choose`,
  contributingUrl: () => `${SITE.repoUrl}/blob/main/CONTRIBUTING.md`,
} as const;
