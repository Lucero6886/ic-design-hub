/**
 * TAXONOMY TRI THỨC IC DESIGN — danh sách track trung tâm.
 *
 * Nguyên tắc (§9 đặc tả): track "planned" là ĐỊNH HƯỚNG tương lai — chưa chắc đã có
 * nội dung. KHÔNG bịa bài viết để lấp track. Trang taxonomy chỉ hiển thị track
 * "active" như khu vực có nội dung; track "planned" hiển thị nhãn "Định hướng".
 *
 * Khi track planned có nội dung thật đầu tiên: đổi status thành "active".
 */
export interface Track {
  id: string;
  label: string;
  labelEn: string;
  status: "active" | "planned";
  description: string;
}

export const TRACKS: Track[] = [
  { id: "foundations", label: "Nền tảng bán dẫn & IC", labelEn: "Semiconductor & IC Foundations", status: "active", description: "Trừu tượng hóa số, transistor-as-switch, chuỗi transistor → SoC, design flow." },
  { id: "digital-logic", label: "Logic số", labelEn: "Digital Logic", status: "active", description: "Cổng logic, đại số Boole, khối tổ hợp, mạch tuần tự, FSM." },
  { id: "rtl", label: "Thiết kế RTL", labelEn: "RTL Design", status: "active", description: "Viết RTL sạch, hardware inference, style kỷ luật, controller–datapath." },
  { id: "systemverilog", label: "SystemVerilog", labelEn: "SystemVerilog", status: "active", description: "Ngôn ngữ mô tả phần cứng: module, always_comb/always_ff, blocking vs non-blocking." },
  { id: "verification", label: "Kiểm chứng (verification)", labelEn: "Verification", status: "active", description: "Testbench, predict-before-simulate, invariant, self-checking, đọc waveform." },
  { id: "fpga", label: "FPGA", labelEn: "FPGA", status: "active", description: "LUT/FF/BRAM/DSP, prototype, toolchain, tối ưu tài nguyên." },
  { id: "asic-frontend", label: "ASIC Front-End", labelEn: "ASIC Front-End", status: "planned", description: "Standard cell, front-end flow, chuẩn bị synthesis/STA chuyên sâu." },
  { id: "synthesis", label: "Tổng hợp logic (synthesis)", labelEn: "Synthesis", status: "planned", description: "RTL → netlist tương đương đã tối ưu; đọc synthesis report." },
  { id: "timing-sta", label: "Timing / STA", labelEn: "Timing / STA", status: "planned", description: "Ràng buộc thời gian, phân tích tĩnh, timing closure." },
  { id: "cdc-reset", label: "CDC / Reset", labelEn: "CDC / Reset", status: "planned", description: "Clock-domain crossing, chiến lược reset, synchronizer, metastability." },
  { id: "computer-architecture", label: "Kiến trúc máy tính", labelEn: "Computer Architecture", status: "planned", description: "Pipeline, bộ nhớ, ISA, vi kiến trúc." },
  { id: "physical-design", label: "Physical Design", labelEn: "Physical Design", status: "planned", description: "Floorplan, place & route, clock tree, signoff." },
  { id: "low-power", label: "Thiết kế công suất thấp", labelEn: "Low-Power Design", status: "planned", description: "Clock gating, power gating, DVFS, phân tích công suất." },
  { id: "analog-mixed", label: "Analog / Mixed-Signal", labelEn: "Analog / Mixed-Signal", status: "planned", description: "Mạch tương tự, ADC/DAC, giao tiếp analog–digital." },
  { id: "fabrication", label: "Công nghệ bán dẫn / chế tạo", labelEn: "Semiconductor Technology / Fabrication", status: "planned", description: "Quy trình fab, node công nghệ, yield, package & test." },
  { id: "eda", label: "Công cụ EDA", labelEn: "EDA", status: "planned", description: "Simulator, synthesizer, formal tool, flow tự động hóa." },
  { id: "ai-for-ic", label: "AI cho thiết kế IC", labelEn: "AI for IC Design", status: "planned", description: "ML trong EDA, tối ưu hóa thiết kế bằng AI." },
  { id: "hardware-ai", label: "Phần cứng cho AI", labelEn: "Hardware-Aware AI / AI Accelerator", status: "planned", description: "Neural accelerator, quantization, mixed precision, FPGA inference." },
  { id: "rtl-to-gds", label: "RTL → GDS (flow ASIC)", labelEn: "RTL-to-GDS Flow", status: "planned", description: "Chuỗi hiện thực ASIC: synthesis → floorplan → place & route → signoff → layout/GDS. Nút 'ASIC track' của lộ trình cộng đồng — xem docs/ROADMAP_ALIGNMENT.md." },
  { id: "embedded-systems", label: "Hệ nhúng & tích hợp", labelEn: "Embedded Systems", status: "planned", description: "Ghép thiết kế số với vi điều khiển/máy tính: giao tiếp, firmware, hệ hoàn chỉnh — nhánh Industry/Project của lộ trình." },
  { id: "research-methodology", label: "Phương pháp nghiên cứu", labelEn: "Research Methodology", status: "active", description: "EQ→RQ, thiết kế thí nghiệm, baseline công bằng, bằng chứng trước kết luận." },
  { id: "industry", label: "Công nghiệp & thị trường bán dẫn", labelEn: "Semiconductor Industry & Market", status: "active", description: "Chuỗi giá trị bán dẫn, hệ sinh thái trong nước và quốc tế, chiến lược quốc gia, con đường nghề nghiệp." },
  { id: "academic-writing", label: "Viết học thuật", labelEn: "Academic Writing", status: "planned", description: "Viết paper, trình bày kết quả, trích dẫn đúng chuẩn." },
  { id: "reproducible-research", label: "Nghiên cứu tái lập được", labelEn: "Reproducible Research", status: "planned", description: "Log thí nghiệm, phiên bản hóa dữ liệu/script, môi trường tái lập." },
];

export const TRACK_IDS = TRACKS.map((t) => t.id) as [string, ...string[]];

export function trackById(id: string | undefined): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}
