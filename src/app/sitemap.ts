import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://taemun.net",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://taemun.net/portfolio",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://taemun.net/inquiry",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://taemun.net/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    // 샘플(/demo/*)은 noindex 라 싣지 않는다
  ];
}
