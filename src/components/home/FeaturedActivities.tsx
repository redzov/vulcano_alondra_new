"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const featured = [
  { key: "cableCar", slug: "teide-cable-car", image: "/images/categories/subcat-69.jpg" },
  { key: "sunsetStars", slug: "sunset-and-stars", image: "/images/categories/subcat-94.jpg" },
  { key: "hiking", slug: "hiking-teide-with-cable-car", image: "/images/categories/subcat-73.jpg" },
] as const;

export default function FeaturedActivities() {
  const t = useTranslations("featured");

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-text-primary">
            {t("title")}
          </h2>
          <p className="mt-3 text-text-secondary text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(({ key, slug, image }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/services/${slug}`} className="group block">
                <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={t(`items.${key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-text-primary">
                        {t(`items.${key}.rating`)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-text-primary mb-2 group-hover:text-volcano transition-colors">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-5 text-sm text-text-secondary">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {t(`items.${key}.duration`)}
                      </span>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-text-secondary">{t("from")}</span>
                        <p className="text-2xl font-bold text-volcano">
                          €{t(`items.${key}.price`)}
                        </p>
                        <span className="text-xs text-text-secondary">{t("perPerson")}</span>
                      </div>
                      <Button className="rounded-full bg-volcano hover:bg-volcano-hover text-white px-6 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all">
                        {t("bookNow")}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
