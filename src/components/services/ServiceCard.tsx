"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations();

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.images[0]}
            alt={t(service.titleKey)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-0.5 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{service.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-volcano transition-colors">
            {t(service.titleKey)}
          </h3>

          <div className="flex items-center gap-3 mb-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {service.duration}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-text-secondary">{t("featured.from")}</span>
              <p className="text-xl font-bold text-volcano">€{service.price.toFixed(2)}</p>
            </div>
            <Button
              size="sm"
              className="rounded-full bg-volcano hover:bg-volcano-hover text-white font-semibold shadow-md hover:scale-105 transition-all"
            >
              {t("featured.bookNow")}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
