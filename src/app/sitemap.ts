import type { MetadataRoute } from "next";
import { allServiceSlugs } from "@/lib/services";
import { infoPages, legalPages } from "@/lib/pages";

const SITE_URL = "https://www.teideexplorer.com";
const locales = ["en", "es", "de", "fr", "nl", "pl"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages per locale
  const staticPages = ["", "/about", "/contact", "/services", "/manage-booking"];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      });
    }

    // Service pages
    for (const slug of allServiceSlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/services/${slug}`])
          ),
        },
      });
    }

    // Info pages
    for (const page of infoPages) {
      entries.push({
        url: `${SITE_URL}/${locale}/info/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/info/${page.slug}`])
          ),
        },
      });
    }

    // Legal pages
    for (const page of legalPages) {
      entries.push({
        url: `${SITE_URL}/${locale}/legal/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/legal/${page.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
