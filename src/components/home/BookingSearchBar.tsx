"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { CalendarIcon, ChevronDown, Search } from "lucide-react";
import { format } from "date-fns";
import { enUS, es, de, fr, nl, pl } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type Locale } from "date-fns";

const CATEGORY_KEYS = [
  "cable_car",
  "hiking",
  "stars",
  "observatory",
  "independently",
] as const;

const dateLocales: Record<string, Locale> = {
  en: enUS,
  es,
  de,
  fr,
  nl,
  pl,
};

export default function BookingSearchBar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [category, setCategory] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const dateLocale = dateLocales[locale] || enUS;

  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (dateFrom) params.set("from", format(dateFrom, "yyyy-MM-dd"));
    if (dateTo) params.set("to", format(dateTo, "yyyy-MM-dd"));
    const query = params.toString();
    router.push(query ? `/services?${query}` : "/services");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 sm:p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-2">
          {/* Category Dropdown */}
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-between w-full h-12 sm:h-14 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                <span
                  className={`text-sm sm:text-base truncate ${
                    category ? "text-text-primary font-medium" : "text-gray-400"
                  }`}
                >
                  {category
                    ? t(`categories.items.${category}.name`)
                    : t("hero.selectExperience")}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-2"
              align="start"
              sideOffset={4}
            >
              <button
                onClick={() => {
                  setCategory("");
                  setCategoryOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 text-gray-400 transition-colors"
              >
                {t("hero.allCategories")}
              </button>
              {CATEGORY_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCategory(key);
                    setCategoryOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    category === key
                      ? "bg-volcano/10 text-volcano font-medium"
                      : "hover:bg-gray-50 text-text-primary"
                  }`}
                >
                  {t(`categories.items.${key}.name`)}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Date From */}
          <Popover open={fromOpen} onOpenChange={setFromOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 w-full h-12 sm:h-14 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span
                  className={`text-sm sm:text-base truncate ${
                    dateFrom
                      ? "text-text-primary font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {dateFrom
                    ? format(dateFrom, "d MMM yyyy", { locale: dateLocale })
                    : t("hero.dateFrom")}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={(date) => {
                  setDateFrom(date);
                  setFromOpen(false);
                  if (date && dateTo && date > dateTo) {
                    setDateTo(undefined);
                  }
                }}
                disabled={{ before: today }}
                locale={dateLocale}
              />
            </PopoverContent>
          </Popover>

          {/* Date To */}
          <Popover open={toOpen} onOpenChange={setToOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 w-full h-12 sm:h-14 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span
                  className={`text-sm sm:text-base truncate ${
                    dateTo ? "text-text-primary font-medium" : "text-gray-400"
                  }`}
                >
                  {dateTo
                    ? format(dateTo, "d MMM yyyy", { locale: dateLocale })
                    : t("hero.dateTo")}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={(date) => {
                  setDateTo(date);
                  setToOpen(false);
                }}
                disabled={{ before: dateFrom || today }}
                locale={dateLocale}
              />
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-volcano hover:bg-volcano-hover text-white font-semibold text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <Search className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">{t("hero.search")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
