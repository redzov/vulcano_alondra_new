import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ManageBookingClient from "./ManageBookingClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("manageBooking.title")} | Volcano Teide`,
    description: t("manageBooking.subtitle"),
    alternates: {
      languages: {
        en: "/en/manage-booking",
        es: "/es/manage-booking",
        de: "/de/manage-booking",
        fr: "/fr/manage-booking",
        nl: "/nl/manage-booking",
        pl: "/pl/manage-booking",
      },
    },
  };
}

export default function ManageBookingPage() {
  return <ManageBookingClient />;
}
