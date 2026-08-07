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
      url: "https://taemun.net/inquiry",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
