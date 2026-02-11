import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getServiceBySlug, getRelatedServices, allServiceSlugs, getServiceWithOverrides } from "@/lib/services";
import { getServiceData } from "@/lib/db";
import ServicePageClient from "./ServicePageClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = await getServiceWithOverrides(slug);
  if (!service) return {};

  const t = await getTranslations({ locale });
  const textOverrides = getServiceData(slug);
  const title = textOverrides?.title || t(service.titleKey);
  const description = (textOverrides?.shortDescription || t(service.descriptionKey)).slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Teide Explorer`,
      description,
      images: service.images[0]
        ? [{ url: service.images[0], width: 1200, height: 630, alt: title }]
        : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: service.images[0] ? [service.images[0]] : undefined,
    },
    alternates: {
      languages: {
        en: `/en/services/${slug}`,
        es: `/es/services/${slug}`,
        de: `/de/services/${slug}`,
        fr: `/fr/services/${slug}`,
        nl: `/nl/services/${slug}`,
        pl: `/pl/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const service = await getServiceWithOverrides(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(slug);
  const t = await getTranslations({ locale });

  // Get text overrides from DB (apply for all locales as admin-managed content)
  const textOverrides = getServiceData(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: textOverrides?.title || t(service.titleKey),
    description: textOverrides?.shortDescription || t(service.descriptionKey),
    image: service.images[0],
    offers: {
      "@type": "Offer",
      price: service.price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: service.rating.toString(),
      reviewCount: service.reviewCount.toString(),
      bestRating: "5",
    },
    touristType: "Sightseeing",
    provider: {
      "@type": "Organization",
      name: "Teide Explorer",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageClient
        service={service}
        relatedServices={relatedServices}
        textOverrides={textOverrides}
      />
    </>
  );
}
