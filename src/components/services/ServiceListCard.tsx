"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Star, Clock, Globe, Bus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/services";

interface ServiceListCardProps {
  service: Service;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25;
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i <= full
                ? "fill-yellow-400 text-yellow-400"
                : i === full + 1 && half
                  ? "fill-yellow-400/50 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-text-secondary ml-0.5">
        {rating.toFixed(4)}
      </span>
    </div>
  );
}

export default function ServiceListCard({ service }: ServiceListCardProps) {
  const t = useTranslations();
  const hasPickup = service.meetingPoint.toLowerCase().includes("pick-up");

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 border-b border-gray-200 last:border-b-0">
      {/* Image */}
      <Link
        href={`/services/${service.slug}`}
        className="relative w-full sm:w-52 md:w-60 flex-shrink-0 aspect-[4/3] sm:aspect-[4/3] rounded-lg overflow-hidden group"
      >
        <Image
          src={service.images[0]}
          alt={t(service.titleKey)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 240px"
        />
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Link href={`/services/${service.slug}`}>
          <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary hover:text-volcano transition-colors line-clamp-2">
            {t(service.titleKey)}
          </h3>
        </Link>
        <Link
          href={`/services/${service.slug}`}
          className="text-sm text-volcano hover:underline mt-0.5 line-clamp-1"
        >
          {t(service.shortDescriptionKey)}
        </Link>

        {/* Info Table */}
        <div className="mt-3 grid grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden text-sm">
          <div className="bg-gray-50 px-3 py-2">
            <div className="flex items-center gap-1 text-text-secondary font-medium mb-0.5">
              <Clock className="h-3.5 w-3.5 text-volcano" />
              {t("servicesPage.duration")}:
            </div>
            <span className="text-text-primary">{service.duration}</span>
          </div>
          <div className="bg-gray-50 px-3 py-2">
            <div className="flex items-center gap-1 text-text-secondary font-medium mb-0.5">
              <Globe className="h-3.5 w-3.5 text-green-600" />
              {t("servicesPage.languageFilter")}:
            </div>
            <span className="text-text-primary">
              {service.languages.join(" · ")}
            </span>
          </div>
          <div className="bg-gray-50 px-3 py-2">
            <div className="flex items-center gap-1 text-text-secondary font-medium mb-0.5">
              <Bus className="h-3.5 w-3.5" />
              {t("servicesPage.transport")}:
            </div>
            <span className="text-text-primary">
              {hasPickup ? t("servicesPage.yes") : t("servicesPage.no")}
            </span>
          </div>
        </div>

        {/* View More */}
        <Link
          href={`/services/${service.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-volcano transition-colors"
        >
          {t("servicesPage.viewMore")} <Plus className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Price & Actions */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 flex-shrink-0 sm:w-36 sm:text-right">
        <div>
          <span className="text-xs text-text-secondary">
            {t("servicesPage.from")}
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-volcano leading-tight">
            €{service.price.toFixed(2)}
          </p>
        </div>
        <Button
          asChild
          className="rounded-lg bg-volcano hover:bg-volcano-hover text-white font-semibold px-6 py-2 shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          <Link href={`/services/${service.slug}`}>
            {t("servicesPage.buy")}
          </Link>
        </Button>
        <StarRating rating={service.rating} />
      </div>
    </div>
  );
}
