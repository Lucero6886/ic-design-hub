/**
 * Helper truy vấn nội dung dùng chung — LỌC DRAFT MỘT NƠI DUY NHẤT.
 * Mọi trang danh sách/index/RSS đều đi qua đây để bản nháp không bao giờ lọt ra production.
 */
import { getCollection, type CollectionEntry, type DataEntryMap } from "astro:content";

type Key = keyof DataEntryMap;

/** Lấy collection đã lọc draft (và status archived nếu có), sắp xếp mới → cũ theo date */
export async function getPublished<C extends Key>(name: C): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(name);
  return all
    .filter((e) => {
      const d = e.data as Record<string, unknown>;
      if (d.draft === true) return false;
      if (d.status === "draft") return false;
      return true;
    })
    .sort((a, b) => {
      const da = (a.data as { date?: Date }).date?.valueOf() ?? 0;
      const db = (b.data as { date?: Date }).date?.valueOf() ?? 0;
      return db - da;
    });
}

/** Nhãn tiếng Việt cho status/kind — một nơi duy nhất */
export const LABELS: Record<string, string> = {
  // research status
  idea: "Ý tưởng",
  exploratory: "Thăm dò",
  active: "Đang thực hiện",
  validated: "Đã kiểm chứng",
  superseded: "Đã được thay thế",
  archived: "Lưu trữ",
  // project status
  proposed: "Đề xuất",
  completed: "Hoàn thành",
  paused: "Tạm dừng",
  // evidence levels
  established: "Kiến thức đã xác lập",
  heuristic: "Kinh nghiệm kỹ thuật",
  hypothesis: "Giả thuyết",
  question: "Câu hỏi nghiên cứu",
  evidence: "Có bằng chứng thực nghiệm",
  interpretation: "Diễn giải của tác giả",
  // article categories
  tutorial: "Hướng dẫn",
  concept: "Khái niệm",
  "technical-note": "Ghi chú kỹ thuật",
  mentoring: "Mentoring",
  news: "Tin tức",
  // research kinds
  note: "Ghi chú nghiên cứu",
  "paper-reading": "Đọc paper",
  roadmap: "Lộ trình nghiên cứu",
  methodology: "Phương pháp",
  "experiment-log": "Nhật ký thí nghiệm",
  // project kinds
  learning: "Project học tập",
  fpga: "Project FPGA",
  "ic-design": "Project IC Design",
  student: "Project sinh viên",
  research: "Project nghiên cứu",
  // resource kinds
  tool: "Công cụ",
  book: "Sách",
  paper: "Paper",
  software: "Phần mềm",
  "hdl-eda": "HDL / EDA",
  reference: "Tài liệu tham khảo",
  course: "Khóa học",
  // difficulty
  foundation: "Nền tảng",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
};

export function label(key: string | undefined): string {
  if (!key) return "";
  return LABELS[key] ?? key;
}
