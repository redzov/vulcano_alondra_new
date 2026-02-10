import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getInfoPageBySlug, allInfoSlugs } from "@/lib/pages";
import InfoPageClient from "./InfoPageClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return allInfoSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const page = getInfoPageBySlug(slug);
  if (!page) return {};

  const t = await getTranslations({ locale });

  return {
    title: `${t(page.titleKey)} | Volcano Teide`,
    alternates: {
      languages: {
        en: `/en/info/${slug}`,
        es: `/es/info/${slug}`,
        de: `/de/info/${slug}`,
        fr: `/fr/info/${slug}`,
        nl: `/nl/info/${slug}`,
        pl: `/pl/info/${slug}`,
      },
    },
  };
}

export default async function InfoPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const page = getInfoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <InfoPageClient page={page} />;
}
