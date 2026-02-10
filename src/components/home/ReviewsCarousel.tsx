"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviewKeys = ["review1", "review2", "review3", "review4"] as const;

export default function ReviewsCarousel() {
  const t = useTranslations("reviews");
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % reviewKeys.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviewKeys.length) % reviewKeys.length);

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

        {/* Desktop: Grid of all reviews */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition-all"
            >
              <Quote className="h-8 w-8 text-volcano/20 mb-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Number(t(`items.${key}.rating`))
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-4">
                &ldquo;{t(`items.${key}.text`)}&rdquo;
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-text-primary text-sm">
                  {t(`items.${key}.name`)}
                </p>
                <p className="text-xs text-text-secondary">
                  {t(`items.${key}.location`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-white p-6 shadow-md"
            >
              <Quote className="h-8 w-8 text-volcano/20 mb-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Number(t(`items.${reviewKeys[current]}.rating`))
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                &ldquo;{t(`items.${reviewKeys[current]}.text`)}&rdquo;
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-text-primary text-sm">
                  {t(`items.${reviewKeys[current]}.name`)}
                </p>
                <p className="text-xs text-text-secondary">
                  {t(`items.${reviewKeys[current]}.location`)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-volcano hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviewKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-volcano w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-volcano hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
