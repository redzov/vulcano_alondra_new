"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Sparkles,
  MapPin,
  ShieldAlert,
  Backpack,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceGallery from "@/components/services/ServiceGallery";
import ServiceInfo from "@/components/services/ServiceInfo";
import BookingWidget from "@/components/services/BookingWidget";
import ServiceCard from "@/components/services/ServiceCard";
import StickyBookingBar from "@/components/services/StickyBookingBar";
import type { Service } from "@/lib/services";

interface TextOverrides {
  title?: string;
  shortDescription?: string;
  description?: string;
  fullDescription?: string;
  highlights?: string[];
  includes?: string[];
  notIncluded?: string[];
  restrictions?: string[];
  importantInfo?: string[];
  prepare?: string[];
}

interface ServicePageClientProps {
  service: Service;
  relatedServices: Service[];
  textOverrides?: TextOverrides | null;
}

export default function ServicePageClient({ service, relatedServices, textOverrides }: ServicePageClientProps) {
  const t = useTranslations();

  // Helper: use text override if available, otherwise fall back to translation key
  const text = (override: string | undefined, key: string) => override || t(key);
  const textArray = (overrides: string[] | undefined, keys: string[]) =>
    overrides && overrides.length > 0 ? overrides : keys.map((k) => t(k));

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-warm-bg border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 pt-24">
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-volcano transition-colors">
              {t("header.nav.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/services" className="hover:text-volcano transition-colors">
              {t("header.nav.activities")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-primary font-medium truncate">
              {text(textOverrides?.title, service.titleKey)}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column — Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ServiceGallery images={service.images} title={text(textOverrides?.title, service.titleKey)} />
            </motion.div>

            {/* Title + short description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-text-primary">
                {text(textOverrides?.title, service.titleKey)}
              </h1>
              <p className="mt-3 text-text-secondary text-lg leading-relaxed">
                {text(textOverrides?.shortDescription, service.shortDescriptionKey)}
              </p>
            </motion.div>

            {/* Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <ServiceInfo service={service} />
            </motion.div>

            {/* Highlights */}
            {(textOverrides?.highlights?.length || service.highlightsKeys.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="rounded-2xl bg-volcano/5 border border-volcano/10 p-6"
              >
                <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-volcano" />
                  Highlights
                </h2>
                <ul className="space-y-2.5">
                  {textArray(textOverrides?.highlights, service.highlightsKeys).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-volcano/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-volcano" />
                      </div>
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start border-b bg-transparent rounded-none h-auto p-0 gap-4 sm:gap-8">
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-volcano data-[state=active]:text-volcano bg-transparent px-0 pb-3 font-semibold text-sm sm:text-base"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="included"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-volcano data-[state=active]:text-volcano bg-transparent px-0 pb-3 font-semibold text-sm sm:text-base"
                  >
                    What&apos;s Included
                  </TabsTrigger>
                  <TabsTrigger
                    value="restrictions"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-volcano data-[state=active]:text-volcano bg-transparent px-0 pb-3 font-semibold text-sm sm:text-base"
                  >
                    Restrictions
                  </TabsTrigger>
                  <TabsTrigger
                    value="info"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-volcano data-[state=active]:text-volcano bg-transparent px-0 pb-3 font-semibold text-sm sm:text-base"
                  >
                    Important Info
                  </TabsTrigger>
                </TabsList>

                {/* Description Tab */}
                <TabsContent value="description" className="mt-6">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-text-secondary leading-relaxed text-base whitespace-pre-line">
                      {text(textOverrides?.fullDescription, service.fullDescriptionKey)}
                    </p>
                  </div>
                </TabsContent>

                {/* Included Tab */}
                <TabsContent value="included" className="mt-6 space-y-8">
                  {/* Included */}
                  <div>
                    <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-text-primary mb-4">
                      Included
                    </h3>
                    <ul className="space-y-3">
                      {textArray(textOverrides?.includes, service.includesKeys).map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-success" />
                          </div>
                          <span className="text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  {(textOverrides?.notIncluded?.length || service.notIncludedKeys.length > 0) && (
                    <div>
                      <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-text-primary mb-4">
                        Not Included
                      </h3>
                      <ul className="space-y-3">
                        {textArray(textOverrides?.notIncluded, service.notIncludedKeys).map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                              <X className="h-3 w-3 text-red-500" />
                            </div>
                            <span className="text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                {/* Restrictions Tab */}
                <TabsContent value="restrictions" className="mt-6">
                  <ul className="space-y-3">
                    {textArray(textOverrides?.restrictions, service.restrictionsKeys).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                          <ShieldAlert className="h-3 w-3 text-yellow-600" />
                        </div>
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                {/* Important Info Tab */}
                <TabsContent value="info" className="mt-6 space-y-8">
                  <ul className="space-y-3">
                    {textArray(textOverrides?.importantInfo, service.importantInfoKeys).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-volcano/10 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="h-3 w-3 text-volcano" />
                        </div>
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* What to Bring / Prepare */}
                  {(textOverrides?.prepare?.length || service.prepareKeys.length > 0) && (
                    <div>
                      <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-text-primary mb-4 flex items-center gap-2">
                        <Backpack className="h-4 w-4 text-volcano" />
                        What to Bring
                      </h3>
                      <ul className="space-y-3">
                        {textArray(textOverrides?.prepare, service.prepareKeys).map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Meeting Point */}
                  {service.meetingPoint && (
                    <div className="rounded-2xl bg-warm-bg p-5">
                      <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-volcano" />
                        Meeting Point
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {service.meetingPoint}
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Right column — Booking Widget (desktop) */}
          <div className="hidden lg:block" id="booking-widget">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <BookingWidget service={service} />
            </motion.div>
          </div>
        </div>

        {/* Related Activities */}
        {relatedServices.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 lg:mt-24 pb-20 lg:pb-0"
          >
            <h2 className="font-[family-name:var(--font-jakarta)] text-2xl sm:text-3xl font-bold text-text-primary mb-8">
              Related Activities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Sticky mobile booking bar */}
      <StickyBookingBar service={service} />
    </>
  );
}
