"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sun, Globe, RefreshCw, Leaf } from "lucide-react";

const featureIcons = {
  solar: Sun,
  online: Globe,
  cancel: RefreshCw,
  sustainable: Leaf,
} as const;

const featureKeys = ["solar", "online", "cancel", "sustainable"] as const;

export default function FeaturePills() {
  const t = useTranslations("features");

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-2xl bg-warm-bg p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="mx-auto w-16 h-16 rounded-2xl bg-volcano/10 flex items-center justify-center mb-5 group-hover:bg-volcano/20 transition-colors">
                  <Icon className="h-8 w-8 text-volcano" />
                </div>
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
