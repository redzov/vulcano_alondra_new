import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedActivities from "@/components/home/FeaturedActivities";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturePills from "@/components/home/FeaturePills";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
        de: "/de",
        fr: "/fr",
        nl: "/nl",
        pl: "/pl",
      },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedActivities />
      <CategoryGrid />
      <FeaturePills />
      <ReviewsCarousel />
    </>
  );
}
