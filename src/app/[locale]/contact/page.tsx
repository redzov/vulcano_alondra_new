import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("contact.title")} | Teide Explorer`,
    alternates: {
      languages: {
        en: "/en/contact",
        es: "/es/contact",
        de: "/de/contact",
        fr: "/fr/contact",
        nl: "/nl/contact",
        pl: "/pl/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
