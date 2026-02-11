"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { format } from "date-fns";
import { enUS, es, de, fr, nl, pl } from "date-fns/locale";
import {
  CalendarIcon,
  ChevronDown,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ServiceListCard from "@/components/services/ServiceListCard";
import type { Service } from "@/lib/services";
import { type Locale } from "date-fns";

const CATEGORY_KEYS = [
  "cable_car",
  "hiking",
  "stars",
  "vip",
  "kids",
  "observatory",
  "groups",
  "excursions",
  "independently",
] as const;

const ALL_LANGUAGES = ["DE", "EN", "ES", "FR", "IT", "NL", "PL", "RU"];

const DURATION_BUCKETS = [
  { key: "under2h", maxMinutes: 120 },
  { key: "2to4h", maxMinutes: 240 },
  { key: "4to8h", maxMinutes: 480 },
  { key: "over8h", maxMinutes: Infinity },
] as const;

const dateLocales: Record<string, Locale> = { en: enUS, es, de, fr, nl, pl };

function parseDurationMinutes(duration: string): number {
  let total = 0;
  const hourMatch = duration.match(/(\d+)\s*hour/);
  const minMatch = duration.match(/(\d+)\s*min/);
  if (hourMatch) total += parseInt(hourMatch[1]) * 60;
  if (minMatch) total += parseInt(minMatch[1]);
  return total || 60;
}

function getDurationBucket(minutes: number): string {
  if (minutes < 120) return "under2h";
  if (minutes < 240) return "2to4h";
  if (minutes < 480) return "4to8h";
  return "over8h";
}

interface ServicesListClientProps {
  services: Service[];
}

export default function ServicesListClient({
  services,
}: ServicesListClientProps) {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dateLocale = dateLocales[locale] || enUS;

  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Initialize from URL params
  const initialCategories = searchParams.get("category")
    ? searchParams.get("category")!.split(",")
    : [];
  const initialFrom = searchParams.get("from")
    ? new Date(searchParams.get("from")! + "T00:00:00")
    : undefined;
  const initialTo = searchParams.get("to")
    ? new Date(searchParams.get("to")! + "T00:00:00")
    : undefined;

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPickups, setSelectedPickups] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(initialFrom);
  const [dateTo, setDateTo] = useState<Date | undefined>(initialTo);
  const [searchCategory, setSearchCategory] = useState<string>(
    initialCategories.length === 1 ? initialCategories[0] : ""
  );
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const priceMin = 0;
  const priceMax = 200;
  const isPriceFiltered = priceRange[0] > priceMin || priceRange[1] < priceMax;

  // Filter logic
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(service.category)
      ) {
        return false;
      }

      // Language filter
      if (selectedLanguages.length > 0) {
        const hasLanguage = selectedLanguages.some((lang) =>
          service.languages.includes(lang)
        );
        if (!hasLanguage) return false;
      }

      // Price filter
      if (isPriceFiltered) {
        if (service.price < priceRange[0] || service.price > priceRange[1])
          return false;
      }

      // Duration filter
      if (selectedDurations.length > 0) {
        const minutes = parseDurationMinutes(service.duration);
        const bucket = getDurationBucket(minutes);
        if (!selectedDurations.includes(bucket)) return false;
      }

      // Pick-ups filter
      if (selectedPickups.length > 0) {
        const hasPickup = service.meetingPoint
          .toLowerCase()
          .includes("pick-up");
        if (selectedPickups.includes("pickup") && !hasPickup) return false;
        if (
          selectedPickups.includes("self") &&
          hasPickup &&
          !selectedPickups.includes("pickup")
        )
          return false;
      }

      return true;
    });
  }, [
    services,
    selectedCategories,
    selectedLanguages,
    priceRange,
    isPriceFiltered,
    selectedDurations,
    selectedPickups,
  ]);

  // Toggle helpers
  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const toggleLanguage = useCallback((lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  }, []);

  const toggleDuration = useCallback((dur: string) => {
    setSelectedDurations((prev) =>
      prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
    );
  }, []);

  const togglePickup = useCallback((pickup: string) => {
    setSelectedPickups((prev) =>
      prev.includes(pickup)
        ? prev.filter((p) => p !== pickup)
        : [...prev, pickup]
    );
  }, []);

  // Active filters for tags
  const activeFilters: { label: string; onRemove: () => void }[] = [];

  if (dateFrom && dateTo) {
    activeFilters.push({
      label: `${format(dateFrom, "yyyy-MM-dd")} : ${format(dateTo, "yyyy-MM-dd")}`,
      onRemove: () => {
        setDateFrom(undefined);
        setDateTo(undefined);
      },
    });
  } else if (dateFrom) {
    activeFilters.push({
      label: `${t("hero.dateFrom")}: ${format(dateFrom, "d MMM yyyy", { locale: dateLocale })}`,
      onRemove: () => setDateFrom(undefined),
    });
  }

  selectedCategories.forEach((cat) => {
    activeFilters.push({
      label: t(`categories.items.${cat}.name`),
      onRemove: () => toggleCategory(cat),
    });
  });

  selectedLanguages.forEach((lang) => {
    activeFilters.push({
      label: t(`languages.${lang}`),
      onRemove: () => toggleLanguage(lang),
    });
  });

  if (isPriceFiltered) {
    activeFilters.push({
      label: `€${priceRange[0]} – €${priceRange[1]}`,
      onRemove: () => setPriceRange([priceMin, priceMax]),
    });
  }

  selectedDurations.forEach((dur) => {
    activeFilters.push({
      label: t(`servicesPage.${dur}`),
      onRemove: () => toggleDuration(dur),
    });
  });

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setPriceRange([priceMin, priceMax]);
    setSelectedDurations([]);
    setSelectedPickups([]);
    setDateFrom(undefined);
    setDateTo(undefined);
    setSearchCategory("");
  };

  const handleSearchBarSearch = () => {
    if (searchCategory) {
      setSelectedCategories([searchCategory]);
    }
  };

  // Sidebar content (reusable for mobile + desktop)
  const sidebarContent = (
    <Accordion
      type="multiple"
      defaultValue={["activities", "language", "price", "duration", "pickups"]}
      className="w-full"
    >
      {/* Activities */}
      <AccordionItem value="activities">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          {t("servicesPage.activities")}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            {CATEGORY_KEYS.filter(
              (key) => services.some((s) => s.category === key)
            ).map((key) => (
              <label
                key={key}
                className="flex items-start gap-2.5 cursor-pointer text-sm"
              >
                <Checkbox
                  checked={selectedCategories.includes(key)}
                  onCheckedChange={() => toggleCategory(key)}
                  className="mt-0.5 data-[state=checked]:bg-volcano data-[state=checked]:border-volcano"
                />
                <span className="leading-snug">
                  {t(`categories.items.${key}.name`)}
                </span>
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Language of activities */}
      <AccordionItem value="language">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          {t("servicesPage.languageFilter")}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            {ALL_LANGUAGES.filter(
              (lang) => services.some((s) => s.languages.includes(lang))
            ).map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-2.5 cursor-pointer text-sm"
              >
                <Checkbox
                  checked={selectedLanguages.includes(lang)}
                  onCheckedChange={() => toggleLanguage(lang)}
                  className="data-[state=checked]:bg-volcano data-[state=checked]:border-volcano"
                />
                <span>{t(`languages.${lang}`)}</span>
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Price Range */}
      <AccordionItem value="price">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          {t("servicesPage.priceRange")}
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-1">
            <Slider
              min={priceMin}
              max={priceMax}
              step={5}
              value={priceRange}
              onValueChange={(val) =>
                setPriceRange(val as [number, number])
              }
              className="mb-3 [&_[data-slot=slider-range]]:bg-volcano [&_[data-slot=slider-thumb]]:border-volcano"
            />
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>€{priceRange[0]}</span>
              <span>€{priceRange[1]}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Duration */}
      <AccordionItem value="duration">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          {t("servicesPage.duration")}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            {DURATION_BUCKETS.filter((bucket) =>
              services.some(
                (s) => getDurationBucket(parseDurationMinutes(s.duration)) === bucket.key
              )
            ).map((bucket) => (
              <label
                key={bucket.key}
                className="flex items-center gap-2.5 cursor-pointer text-sm"
              >
                <Checkbox
                  checked={selectedDurations.includes(bucket.key)}
                  onCheckedChange={() => toggleDuration(bucket.key)}
                  className="data-[state=checked]:bg-volcano data-[state=checked]:border-volcano"
                />
                <span>{t(`servicesPage.${bucket.key}`)}</span>
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Pick-ups */}
      <AccordionItem value="pickups">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          {t("servicesPage.pickups")}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            {services.some((s) => s.meetingPoint.toLowerCase().includes("pick-up")) && (
              <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                <Checkbox
                  checked={selectedPickups.includes("pickup")}
                  onCheckedChange={() => togglePickup("pickup")}
                  className="data-[state=checked]:bg-volcano data-[state=checked]:border-volcano"
                />
                <span>{t("servicesPage.hotelPickup")}</span>
              </label>
            )}
            {services.some((s) => !s.meetingPoint.toLowerCase().includes("pick-up")) && (
              <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                <Checkbox
                  checked={selectedPickups.includes("self")}
                  onCheckedChange={() => togglePickup("self")}
                  className="data-[state=checked]:bg-volcano data-[state=checked]:border-volcano"
                />
                <span>{t("servicesPage.selfArrival")}</span>
              </label>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="bg-warm-bg min-h-screen">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-2 bg-gray-50 rounded-xl p-2">
            {/* Category Dropdown */}
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center justify-between w-full h-12 px-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors text-left">
                  <span
                    className={`text-sm truncate ${
                      searchCategory
                        ? "text-text-primary font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {searchCategory
                      ? t(`categories.items.${searchCategory}.name`)
                      : t("hero.selectExperience")}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-2"
                align="start"
              >
                <button
                  onClick={() => {
                    setSearchCategory("");
                    setCategoryOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 text-gray-400"
                >
                  {t("hero.allCategories")}
                </button>
                {CATEGORY_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSearchCategory(key);
                      setCategoryOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      searchCategory === key
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
                <button className="flex items-center gap-2 w-full h-12 px-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors text-left">
                  <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span
                    className={`text-sm truncate ${
                      dateFrom
                        ? "text-text-primary font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {dateFrom
                      ? format(dateFrom, "dd/MM/yyyy")
                      : t("hero.dateFrom")}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={(date) => {
                    setDateFrom(date);
                    setFromOpen(false);
                    if (date && dateTo && date > dateTo)
                      setDateTo(undefined);
                  }}
                  disabled={{ before: today }}
                  locale={dateLocale}
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 w-full h-12 px-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors text-left">
                  <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span
                    className={`text-sm truncate ${
                      dateTo
                        ? "text-text-primary font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {dateTo
                      ? format(dateTo, "dd/MM/yyyy")
                      : t("hero.dateTo")}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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
              onClick={handleSearchBarSearch}
              className="h-12 px-6 rounded-lg bg-volcano hover:bg-volcano-hover text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Search className="h-5 w-5 mr-2" />
              {t("hero.search")}
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters + Results Count */}
      {(activeFilters.length > 0 || filteredServices.length > 0) && (
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {activeFilters.length > 0 && (
                  <span className="text-sm font-medium text-text-secondary">
                    {t("servicesPage.activeFilters")}
                  </span>
                )}
                {activeFilters.map((filter, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="px-3 py-1 gap-1.5 text-sm font-normal cursor-pointer hover:bg-gray-50"
                    onClick={filter.onRemove}
                  >
                    {filter.label}
                    <X className="h-3 w-3 text-gray-400 hover:text-red-500" />
                  </Badge>
                ))}
                {activeFilters.length > 1 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-volcano hover:underline ml-1"
                  >
                    {t("servicesPage.clearAll")}
                  </button>
                )}
              </div>
              <span className="text-sm font-medium text-volcano">
                {t("servicesPage.resultsFound", {
                  count: filteredServices.length,
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content: Sidebar + List */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          {/* Mobile Filters Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <Button
              onClick={() => setMobileFiltersOpen(true)}
              className="rounded-full bg-volcano hover:bg-volcano-hover text-white shadow-lg px-5 py-6"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              {t("servicesPage.filters")}
            </Button>
          </div>

          {/* Mobile Filters Drawer */}
          <Sheet
            open={mobileFiltersOpen}
            onOpenChange={setMobileFiltersOpen}
          >
            <SheetContent side="left" className="w-80 bg-white p-0 overflow-y-auto">
              <div className="px-6 py-5 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">
                    {t("servicesPage.filters")}
                  </h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">{sidebarContent}</div>
            </SheetContent>
          </Sheet>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              {sidebarContent}
            </div>
          </aside>

          {/* Activity List */}
          <main className="flex-1 min-w-0">
            {filteredServices.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-text-secondary">
                  {t("servicesPage.noResults")}
                </p>
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="mt-4"
                >
                  {t("servicesPage.clearAll")}
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {filteredServices.map((service) => (
                  <ServiceListCard key={service.slug} service={service} />
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
