/** RSS tổng hợp: bài viết + ghi chú nghiên cứu + project + thông báo (đã lọc draft). */
import rss from "@astrojs/rss";
import { SITE, AUTHOR } from "../config/site";
import { getPublished } from "../utils/content";

export async function GET(context) {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  const [articles, research, projects, announcements] = await Promise.all([
    getPublished("articles"),
    getPublished("research"),
    getPublished("projects"),
    getPublished("announcements"),
  ]);

  const items = [
    ...articles.map((e) => ({
      title: e.data.title,
      description: e.data.summary,
      pubDate: e.data.date,
      link: `${base}articles/${e.id}/`,
      categories: ["articles", ...(e.data.tags ?? [])],
    })),
    ...research.map((e) => ({
      title: `[Nghiên cứu] ${e.data.title}`,
      description: e.data.summary,
      pubDate: e.data.date,
      link: `${base}research/${e.id}/`,
      categories: ["research", ...(e.data.tags ?? [])],
    })),
    ...projects.map((e) => ({
      title: `[Project] ${e.data.title}`,
      description: e.data.summary,
      pubDate: e.data.date,
      link: `${base}projects/${e.id}/`,
      categories: ["projects", ...(e.data.tags ?? [])],
    })),
    ...announcements.map((e) => ({
      title: `[Thông báo] ${e.data.title}`,
      description: e.data.summary,
      pubDate: e.data.date,
      link: e.data.linkUrl
        ? e.data.linkUrl.startsWith("http")
          ? e.data.linkUrl
          : `${base}${e.data.linkUrl.replace(/^\/+/, "")}`
        : `${base}`,
      categories: ["announcements"],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items,
    customData: `<language>${SITE.lang}</language><managingEditor>${AUTHOR.name}</managingEditor>`,
  });
}
