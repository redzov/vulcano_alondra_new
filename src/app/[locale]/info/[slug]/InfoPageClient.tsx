"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Ticket, MapPin, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { infoPages } from "@/lib/pages";
import type { InfoPage } from "@/lib/pages";

interface InfoPageClientProps {
  page: InfoPage;
}

export default function InfoPageClient({ page }: InfoPageClientProps) {
  const t = useTranslations();

  const otherInfoPages = infoPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${page.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              {t("header.nav.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium">{t(page.titleKey)}</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            {t(page.titleKey)}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="prose prose-gray prose-lg max-w-none">
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {t(page.contentKey)}
                </p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Quick CTA */}
              <div className="rounded-2xl bg-volcano/5 border border-volcano/10 p-6">
                <Ticket className="h-8 w-8 text-volcano mb-3" />
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-2">
                  Book Cable Car Tickets
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Ascend to 3,555m in just 8 minutes. Book online now.
                </p>
                <Button
                  asChild
                  className="w-full rounded-full bg-volcano hover:bg-volcano-hover text-white font-semibold"
                >
                  <Link href="/services/teide-cable-car">
                    {t("featured.bookNow")} →
                  </Link>
                </Button>
              </div>

              {/* Quick links */}
              <div className="rounded-2xl bg-warm-bg p-6">
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-4">
                  Related Pages
                </h3>
                <ul className="space-y-3">
                  {otherInfoPages.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/info/${p.slug}`}
                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-volcano transition-colors"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                        {t(p.titleKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-volcano">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl sm:text-3xl font-bold text-white mb-4">
            Explore Our Activities
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Discover all the ways to experience Mount Teide — from cable car rides to stargazing tours.
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white text-white hover:bg-white hover:text-volcano px-8 py-6 text-base font-semibold"
          >
            <Link href="/services/teide-cable-car">
              {t("common.seeAll")} Activities →
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
