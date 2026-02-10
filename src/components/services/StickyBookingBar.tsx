"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/services";

interface StickyBookingBarProps {
  service: Service;
}

export default function StickyBookingBar({ service }: StickyBookingBarProps) {
  const t = useTranslations();
  const tb = useTranslations("booking");

  const scrollToBooking = () => {
    document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:hidden">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-text-secondary">{t("featured.from")}</p>
          <p className="text-2xl font-bold text-volcano font-[family-name:var(--font-jakarta)]">
            €{service.price.toFixed(2)}
          </p>
        </div>
        <Button
          onClick={scrollToBooking}
          className="rounded-full bg-volcano hover:bg-volcano-hover text-white px-8 py-5 font-bold shadow-lg hover:scale-105 transition-all"
        >
          {tb("selectDate")}
        </Button>
      </div>
    </div>
  );
}
