#!/usr/bin/env node
/**
 * Chạy validator NGUYÊN BẢN của Learning Hub trên cây legacy (public/legacy/).
 * Validator cũ tự neo theo vị trí file của nó nên hoạt động nguyên trạng trong cây con.
 * Exit code khác 0 = cây legacy có liên kết hỏng / lỗi cấu trúc.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const r = spawnSync(process.execPath, ["tools/validate.mjs"], {
  cwd: path.join(ROOT, "public/legacy"),
  stdio: "inherit",
});
process.exit(r.status ?? 1);
