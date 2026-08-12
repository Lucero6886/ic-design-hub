// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config/site.ts";

/**
 * site/base có thể ghi đè bằng biến môi trường (CI của GitHub Actions tự set
 * từ cấu hình Pages của repo — xem .github/workflows/deploy.yml), mặc định
 * lấy từ cấu hình trung tâm src/config/site.ts.
 */
const site = process.env.ASTRO_SITE || SITE.siteUrl;
// ASTRO_BASE có thể là chuỗi RỖNG một cách hợp lệ (deploy ở gốc domain) —
// chỉ rơi về cấu hình trung tâm khi biến KHÔNG được set.
const base =
  process.env.ASTRO_BASE !== undefined ? process.env.ASTRO_BASE || "/" : SITE.basePath;

export default defineConfig({
  site,
  base,
  // Site tĩnh thuần — không server, không adapter.
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      // Cây legacy là HTML tĩnh trong public/ nên sitemap integration không tự
      // thấy nó; các trang legacy quan trọng được liệt kê thủ công tại đây.
      customPages: [
        "legacy/index.html",
        "legacy/evolution.html",
        "legacy/about.html",
        "legacy/versions/v1/index.html",
        "legacy/versions/v2/index.html",
        "legacy/versions/v3/index.html",
      ].map((p) => new URL(base.replace(/\/?$/, "/") + p, site).href),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
  },
  build: {
    // giữ mặc định "directory": /articles/ten-bai/ → articles/ten-bai/index.html
    format: "directory",
  },
});
