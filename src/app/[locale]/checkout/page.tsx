import { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import CheckoutClient from "./CheckoutClient";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { service: slug } = await searchParams;
  return {
    title: slug ? "Checkout | Teide Explorer" : "Checkout",
  };
}

export default async function CheckoutPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { service: slug } = await searchParams;

  if (!slug) {
    notFound();
  }

  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  return (
    <Suspense>
      <CheckoutClient service={service} />
    </Suspense>
  );
}
