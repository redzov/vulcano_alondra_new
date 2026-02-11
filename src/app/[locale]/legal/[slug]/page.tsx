import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getLegalPageBySlug, allLegalSlugs } from "@/lib/pages";
import LegalPageClient from "./LegalPageClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return allLegalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) return {};

  const t = await getTranslations({ locale });

  return {
    title: `${t(page.titleKey)} | Teide Explorer`,
    alternates: {
      languages: {
        en: `/en/legal/${slug}`,
        es: `/es/legal/${slug}`,
        de: `/de/legal/${slug}`,
        fr: `/fr/legal/${slug}`,
        nl: `/nl/legal/${slug}`,
        pl: `/pl/legal/${slug}`,
      },
    },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const page = getLegalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <LegalPageClient page={page} />;
}
