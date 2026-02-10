"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ChevronRight, ArrowUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LegalPage } from "@/lib/pages";

interface LegalPageClientProps {
  page: LegalPage;
}

const sectionCount: Record<string, number> = {
  "terms-and-conditions": 14,
  "privacy-policy": 11,
  "cookies": 6,
};

export default function LegalPageClient({ page }: LegalPageClientProps) {
  const t = useTranslations();

  const count = sectionCount[page.slug] || 5;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-warm-bg border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 pt-28">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-4">
            <Link href="/" className="hover:text-volcano transition-colors">
              {t("header.nav.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-primary font-medium">{t(page.titleKey)}</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-text-primary"
          >
            {t(page.titleKey)}
          </motion.h1>
          <p className="mt-2 text-sm text-text-secondary">
            Last updated: {page.lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="multiple" className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <AccordionItem
                key={i}
                value={`section-${i}`}
                className="rounded-xl border border-gray-200 px-6 data-[state=open]:bg-warm-bg"
              >
                <AccordionTrigger className="text-left font-[family-name:var(--font-jakarta)] font-semibold text-text-primary hover:text-volcano py-5 text-base">
                  {t(`${page.sectionsKey}.${i}.title`)}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary leading-relaxed pb-5">
                  {t(`${page.sectionsKey}.${i}.content`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-volcano transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
            {t("common.backToTop")}
          </button>
        </div>
      </div>
    </div>
  );
}
