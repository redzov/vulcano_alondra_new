"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categoryKeys = [
  "cable_car",
  "hiking",
  "stars",
  "observatory",
  "independently",
] as const;

export default function CategoryGrid() {
  const t = useTranslations("categories");

  return (
    <section className="py-20 lg:py-28 bg-warm-bg">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href="/services" className="group block">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={`/images/categories/${t(`items.${key}.image`)}`}
                    alt={t(`items.${key}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-white mb-1">
                      {t(`items.${key}.name`)}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">
                        {t(`items.${key}.count`)}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-volcano transition-colors">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </span>
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
