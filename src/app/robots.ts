import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/ddddadminkasjsjsjs/"],
      },
    ],
    sitemap: "https://www.teideexplorer.com/sitemap.xml",
  };
}
