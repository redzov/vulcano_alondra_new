export interface InfoPage {
  slug: string;
  titleKey: string;
  contentKey: string;
  image: string;
}

export interface LegalPage {
  slug: string;
  titleKey: string;
  sectionsKey: string;
  lastUpdated: string;
}

export const infoPages: InfoPage[] = [
  {
    slug: "teide-national-park",
    titleKey: "info.teide-national-park.title",
    contentKey: "info.teide-national-park.content",
    image: "/images/hero/cable-car-view.jpg",
  },
  {
    slug: "teide-cable-car-info",
    titleKey: "info.teide-cable-car-info.title",
    contentKey: "info.teide-cable-car-info.content",
    image: "/images/categories/subcat-69.jpg",
  },
  {
    slug: "weather-and-webcams",
    titleKey: "info.weather-and-webcams.title",
    contentKey: "info.weather-and-webcams.content",
    image: "/images/hero/banner-corporate-4.jpg",
  },
];

export const legalPages: LegalPage[] = [
  {
    slug: "terms-and-conditions",
    titleKey: "legal.terms-and-conditions.title",
    sectionsKey: "legal.terms-and-conditions.sections",
    lastUpdated: "2025-01-15",
  },
  {
    slug: "privacy-policy",
    titleKey: "legal.privacy-policy.title",
    sectionsKey: "legal.privacy-policy.sections",
    lastUpdated: "2025-01-15",
  },
  {
    slug: "cookies",
    titleKey: "legal.cookies.title",
    sectionsKey: "legal.cookies.sections",
    lastUpdated: "2025-01-15",
  },
];

export const allInfoSlugs = infoPages.map((p) => p.slug);
export const allLegalSlugs = legalPages.map((p) => p.slug);

export function getInfoPageBySlug(slug: string) {
  return infoPages.find((p) => p.slug === slug);
}

export function getLegalPageBySlug(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}
