import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import ServicesListClient from "./ServicesListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("header.nav.activities")} | Teide Explorer`,
    description: t("servicesPage.subtitle"),
  };
}

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesListClient services={services} />
    </Suspense>
  );
}
