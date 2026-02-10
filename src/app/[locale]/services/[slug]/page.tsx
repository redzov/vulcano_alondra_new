import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getServiceBySlug, getRelatedServices, allServiceSlugs } from "@/lib/services";
import ServicePageClient from "./ServicePageClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale });
  const title = t(service.titleKey);
  const description = t(service.descriptionKey).slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Volcano Teide`,
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
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(slug);
  const t = await getTranslations({ locale });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: t(service.titleKey),
    description: t(service.descriptionKey),
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
      name: "Volcano Teide",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageClient service={service} relatedServices={relatedServices} />
    </>
  );
}
