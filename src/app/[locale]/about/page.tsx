import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("about.title")} | Volcano Teide`,
    description: t("about.hero.subtitle"),
    alternates: {
      languages: {
        en: "/en/about",
        es: "/es/about",
        de: "/de/about",
        fr: "/fr/about",
        nl: "/nl/about",
        pl: "/pl/about",
      },
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
