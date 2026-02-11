import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.teideexplorer.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Teide Explorer — Activities & Tours on Mount Teide, Tenerife",
    template: "%s | Teide Explorer",
  },
  description:
    "The only website specialised in activities and tours in Teide National Park. Cable car, hiking, stargazing, observatory visits and more.",
  keywords: [
    "Mount Teide",
    "Teide cable car",
    "Tenerife tours",
    "Teide National Park",
    "stargazing Tenerife",
    "Teide hiking",
    "volcano tour",
    "Tenerife activities",
    "Teide observatory",
    "Canary Islands",
  ],
  authors: [{ name: "Teide Explorer" }],
  creator: "Teleferico del Pico del Teide, S.A.",
  publisher: "Teide Explorer",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/images/logos/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Teide Explorer",
    title: "Teide Explorer — Activities & Tours on Mount Teide, Tenerife",
    description:
      "The only website specialised in activities and tours in Teide National Park. Cable car, hiking, stargazing, observatory visits and more.",
    images: [
      {
        url: "/images/hero/banner-corporate-4.jpg",
        width: 1200,
        height: 630,
        alt: "Mount Teide — Tenerife, Canary Islands",
      },
    ],
    locale: "en",
    alternateLocale: ["es", "de", "fr", "nl", "pl"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TeideExplorer",
    title: "Teide Explorer — Activities & Tours on Mount Teide",
    description:
      "Cable car, hiking, stargazing and more in Teide National Park, Tenerife.",
    images: ["/images/hero/banner-corporate-4.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Teide Explorer",
    description:
      "Activities and tours on Mount Teide, Tenerife — cable car, hiking, stargazing, observatory visits.",
    url: SITE_URL,
    image: `${SITE_URL}/images/hero/banner-corporate-4.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle San Francisco, 5",
      addressLocality: "Santa Cruz de Tenerife",
      postalCode: "38002",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.2726,
      longitude: -16.6424,
    },
    telephone: "+34922010444",
    email: "info@teideexplorer.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    sameAs: [
      "https://www.facebook.com/VolcanoTeideExperience",
      "https://www.instagram.com/volcanoteide",
      "https://www.youtube.com/c/VolcanoTeideExperience",
      "https://twitter.com/VolcanoTeide",
      "https://www.tiktok.com/@volcano_teide",
    ],
    provider: {
      "@type": "Organization",
      name: "Teleferico del Pico del Teide, S.A.",
      legalName: "Teleferico del Pico del Teide, S.A.",
      url: SITE_URL,
    },
  };

  return (
    <html lang={locale} className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased text-text-primary">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
