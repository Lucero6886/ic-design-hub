#!/usr/bin/env node
/**
 * Đối chiếu hash SHA-256 của `_source/` với hồ sơ xuất xứ
 * (docs/audit/PROVENANCE_RECORD.md). Bất kỳ sai khác nào = FAIL.
 * Chạy trong `npm run check` và trong CI trước khi build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const EXPECTED = {
  "bao-cao-danh-gia-lucero-ic-v1-v2.md":
    "5376ffb5d882e716718cf9c7aef0f0f28b6d9727178f01967ba1b31308b5aa20",
  "version 1.zip": "555727fd7273fa2770e9eaca4123f6bf9aa6072782bced6b33a1903cec058e53",
  "version2.zip": "7c06d461532c0b7cc0614a71fce176825c0dac361497d99b4a8d2ee8064f5993",
  "version3.zip": "92427e1adc392244d057c413f61a41b1e330b4d9eb5d3920dc3b39737d50308f",
};

let fail = 0;
for (const [name, want] of Object.entries(EXPECTED)) {
  const f = path.join(ROOT, "_source", name);
  if (!fs.existsSync(f)) {
    console.error(`FAIL  _source/${name}: KHÔNG TỒN TẠI`);
    fail++;
    continue;
  }
  const got = crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
  if (got !== want) {
    console.error(`FAIL  _source/${name}: hash lệch!\n      muốn ${want}\n      thấy ${got}`);
    fail++;
  } else {
    console.log(`OK    _source/${name}`);
  }
}
if (fail) {
  console.error(`\nPROVENANCE FAIL — ${fail} file lệch so với hồ sơ xuất xứ. _source/ là BẤT BIẾN.`);
  process.exit(1);
}
console.log("Provenance: 4/4 hash khớp hồ sơ. ✔");
