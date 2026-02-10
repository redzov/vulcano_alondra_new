"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingSearchBar from "./BookingSearchBar";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/cable-car-view.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
            {t("title")}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-3 text-sm sm:text-base text-white/70 max-w-xl mx-auto"
        >
          {t("description")}
        </motion.p>

        {/* Booking Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-10"
        >
          <BookingSearchBar />
        </motion.div>

        {/* Quick CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="outline"
            className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white px-6"
          >
            {t("bookFrom")} €172.00
          </Button>
          <Button
            variant="ghost"
            className="rounded-full text-white/80 hover:bg-white/10 hover:text-white px-6"
          >
            {t("manageBooking")}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
