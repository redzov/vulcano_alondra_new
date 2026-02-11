"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { format, type Locale } from "date-fns";
import { es, de, fr, nl, pl, enUS } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Shield,
  RefreshCw,
  Users,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "@/i18n/navigation";
import type { Service } from "@/lib/services";

interface BookingWidgetProps {
  service: Service;
}

const localeMap: Record<string, Locale> = {
  en: enUS,
  es,
  de,
  fr,
  nl,
  pl,
};

export default function BookingWidget({ service }: BookingWidgetProps) {
  const t = useTranslations();
  const tb = useTranslations("booking");
  const locale = useLocale();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const totalGuests = adults + children;
  const totalPrice = useMemo(
    () => adults * service.price + children * (service.price * 0.5),
    [adults, children, service.price]
  );

  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const dateLocale = localeMap[locale] || enUS;

  const handleBook = () => {
    if (!selectedDate) return;
    const params = new URLSearchParams({
      service: service.slug,
      date: format(selectedDate, "yyyy-MM-dd"),
      adults: adults.toString(),
      children: children.toString(),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6 sticky top-24">
      {/* Price */}
      <div className="mb-6">
        <p className="text-sm text-text-secondary">{t("featured.from")}</p>
        <p className="text-4xl font-bold text-volcano font-[family-name:var(--font-jakarta)]">
          €{service.price.toFixed(2)}
        </p>
        <p className="text-sm text-text-secondary">{t("featured.perPerson")}</p>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          {tb("selectDate")}
        </label>
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-left hover:border-volcano/50 transition-colors">
              <CalendarIcon className="h-5 w-5 text-text-secondary flex-shrink-0" />
              <span
                className={`text-sm flex-1 ${selectedDate ? "text-text-primary font-medium" : "text-text-secondary"}`}
              >
                {selectedDate
                  ? format(selectedDate, "PPP", { locale: dateLocale })
                  : tb("chooseDatePlaceholder")}
              </span>
              <ChevronDown className="h-4 w-4 text-text-secondary" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setDateOpen(false);
              }}
              disabled={(date) => date < today}
              locale={dateLocale}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guest Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          {tb("guests")}
        </label>
        <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-left hover:border-volcano/50 transition-colors">
              <Users className="h-5 w-5 text-text-secondary flex-shrink-0" />
              <span className="text-sm text-text-primary font-medium flex-1">
                {adults} {tb("adults")}
                {children > 0 && `, ${children} ${tb("children")}`}
              </span>
              <ChevronDown className="h-4 w-4 text-text-secondary" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4" align="start">
            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{tb("adults")}</p>
                  <p className="text-xs text-text-secondary">{tb("adultsAge")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-text-primary hover:border-volcano hover:text-volcano transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{adults}</span>
                  <button
                    onClick={() => setAdults(Math.min(20, adults + 1))}
                    disabled={adults >= 20}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-text-primary hover:border-volcano hover:text-volcano transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{tb("children")}</p>
                  <p className="text-xs text-text-secondary">{tb("childrenAge")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-text-primary hover:border-volcano hover:text-volcano transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{children}</span>
                  <button
                    onClick={() => setChildren(Math.min(10, children + 1))}
                    disabled={children >= 10}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-text-primary hover:border-volcano hover:text-volcano transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Price Summary */}
      {(selectedDate || totalGuests > 0) && (
        <div className="mb-6 rounded-xl bg-warm-bg p-4 space-y-2">
          {adults > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">
                {adults} × {tb("adult")} (€{service.price.toFixed(2)})
              </span>
              <span className="text-text-primary font-medium">
                €{(adults * service.price).toFixed(2)}
              </span>
            </div>
          )}
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">
                {children} × {tb("child")} (€{(service.price * 0.5).toFixed(2)})
              </span>
              <span className="text-text-primary font-medium">
                €{(children * service.price * 0.5).toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="text-sm font-semibold text-text-primary">{tb("total")}</span>
            <span className="text-lg font-bold text-volcano">
              €{totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Book button */}
      <Button
        onClick={handleBook}
        disabled={!selectedDate}
        className="w-full rounded-full bg-volcano hover:bg-volcano-hover text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {selectedDate ? (
          <>
            {t("featured.bookNow")} — €{totalPrice.toFixed(2)}
          </>
        ) : (
          tb("selectDateToBook")
        )}
      </Button>

      {/* Trust signals */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <RefreshCw className="h-4 w-4 text-success flex-shrink-0" />
          <span>{tb("freeCancellation")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <Shield className="h-4 w-4 text-success flex-shrink-0" />
          <span>{tb("securePayment")}</span>
        </div>
      </div>
    </div>
  );
}
