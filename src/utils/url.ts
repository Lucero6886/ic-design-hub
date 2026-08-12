/**
 * Helper đường dẫn an toàn với base path (deploy dưới /TEN-REPO/ của GitHub Pages).
 * KHÔNG bao giờ viết href="/..." trực tiếp trong template — luôn dùng href() này.
 */
const BASE = import.meta.env.BASE_URL; // Astro đảm bảo giá trị theo cấu hình `base`

/** Nối một đường dẫn tương-đối-với-gốc-site vào base. href("articles/") → "/repo/articles/" */
export function href(path: string): string {
  const b = BASE.endsWith("/") ? BASE : BASE + "/";
  return b + path.replace(/^\/+/, "");
}

/** Format ngày kiểu Việt Nam: 12/08/2026 */
export function fmtDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

/** ISO date cho thẻ <time datetime> */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Ước lượng thời gian đọc (200 từ/phút — hiển thị "~N phút đọc") */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
