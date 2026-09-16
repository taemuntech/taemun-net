import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /admin 은 페이지 metadata 의 robots noindex 와 이중으로 막는다(한 번 색인되면 되돌리기 어렵다)
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: "https://taemun.net/sitemap.xml",
  };
}
