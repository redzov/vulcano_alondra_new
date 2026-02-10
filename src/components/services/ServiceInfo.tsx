"use client";

import { useTranslations } from "next-intl";
import { Clock, Star, Euro, Globe, Mountain, Users } from "lucide-react";
import type { Service } from "@/lib/services";

interface ServiceInfoProps {
  service: Service;
}

const difficultyColor: Record<string, string> = {
  Low: "text-success",
  Medium: "text-yellow-600",
  High: "text-volcano",
};

export default function ServiceInfo({ service }: ServiceInfoProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-wrap items-center gap-6 py-5 px-6 rounded-2xl bg-warm-bg">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-volcano" />
        <div>
          <p className="text-xs text-text-secondary">{t("featured.duration")}</p>
          <p className="text-sm font-semibold text-text-primary">{service.duration}</p>
        </div>
      </div>

      <div className="w-px h-10 bg-gray-300 hidden sm:block" />

      <div className="flex items-center gap-2">
        <Euro className="h-5 w-5 text-volcano" />
        <div>
          <p className="text-xs text-text-secondary">{t("featured.from")}</p>
          <p className="text-sm font-semibold text-text-primary">€{service.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="w-px h-10 bg-gray-300 hidden sm:block" />

      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        <div>
          <p className="text-xs text-text-secondary">Rating</p>
          <p className="text-sm font-semibold text-text-primary">
            {service.rating}/5
            <span className="text-xs text-text-secondary font-normal ml-1">
              ({service.reviewCount})
            </span>
          </p>
        </div>
      </div>

      <div className="w-px h-10 bg-gray-300 hidden sm:block" />

      <div className="flex items-center gap-2">
        <Mountain className="h-5 w-5 text-volcano" />
        <div>
          <p className="text-xs text-text-secondary">Difficulty</p>
          <p className={`text-sm font-semibold ${difficultyColor[service.difficulty]}`}>
            {service.difficulty}
          </p>
        </div>
      </div>

      <div className="w-px h-10 bg-gray-300 hidden sm:block" />

      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-volcano" />
        <div>
          <p className="text-xs text-text-secondary">Languages</p>
          <p className="text-sm font-semibold text-text-primary">
            {service.languages.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
