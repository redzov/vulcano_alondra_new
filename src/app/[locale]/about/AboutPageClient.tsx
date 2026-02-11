"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  Sun,
  Leaf,
  Award,
  Users,
  Mountain,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Calendar, key: "since" },
  { icon: Users, key: "visitors" },
  { icon: Mountain, key: "altitude" },
  { icon: Globe, key: "languages" },
];

const values = [
  { icon: Sun, key: "solar" },
  { icon: Leaf, key: "sustainability" },
  { icon: ShieldCheck, key: "safety" },
  { icon: Award, key: "excellence" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function AboutPageClient() {
  const t = useTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero/banner-corporate-4.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-volcano">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {stats.map(({ icon: Icon, key }) => (
              <div key={key} className="bg-volcano py-8 px-6 text-center">
                <Icon className="h-6 w-6 text-white/70 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white font-[family-name:var(--font-jakarta)]">
                  {t(`stats.${key}.value`)}
                </p>
                <p className="text-sm text-white/70 mt-1">
                  {t(`stats.${key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
              <span className="text-volcano font-semibold text-sm uppercase tracking-wider">
                {t("story.label")}
              </span>
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-6">
                {t("story.title")}
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>{t("story.p1")}</p>
                <p>{t("story.p2")}</p>
                <p>{t("story.p3")}</p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero/cable-car-view.jpg"
                  alt="Teide Cable Car"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-volcano text-white rounded-2xl p-6 shadow-xl hidden lg:block">
                <p className="text-4xl font-bold font-[family-name:var(--font-jakarta)]">1971</p>
                <p className="text-sm text-white/80">{t("story.founded")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-warm-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-volcano font-semibold text-sm uppercase tracking-wider">
              {t("values.label")}
            </span>
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-text-primary mt-3">
              {t("values.title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, key }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-volcano/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-7 w-7 text-volcano" />
                </div>
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-3">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t(`values.items.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/categories/subcat-135.jpg"
                  alt="Sustainable Teide"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <span className="text-volcano font-semibold text-sm uppercase tracking-wider">
                {t("sustainability.label")}
              </span>
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-6">
                {t("sustainability.title")}
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>{t("sustainability.p1")}</p>
                <p>{t("sustainability.p2")}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-success/10 rounded-full px-5 py-2.5">
                  <Sun className="h-5 w-5 text-success" />
                  <span className="text-sm font-semibold text-success">{t("sustainability.badge1")}</span>
                </div>
                <div className="flex items-center gap-3 bg-volcano/10 rounded-full px-5 py-2.5">
                  <Leaf className="h-5 w-5 text-volcano" />
                  <span className="text-sm font-semibold text-volcano">{t("sustainability.badge2")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-warm-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-[family-name:var(--font-jakarta)] text-2xl sm:text-3xl font-bold text-text-primary">
              {t("certifications.title")}
            </h2>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <Image
              src="/images/logos/sustainability-charter.png"
              alt="European Charter for Sustainable Tourism"
              width={120}
              height={120}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/logos/carbon-footprint.gif"
              alt="Carbon Footprint Registry"
              width={120}
              height={120}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-volcano">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl sm:text-3xl font-bold text-white mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="rounded-full bg-white text-volcano hover:bg-white/90 px-8 py-6 text-base font-semibold"
            >
              <Link href="/services">
                {t("cta.explore")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white bg-transparent text-white hover:bg-white hover:text-volcano px-8 py-6 text-base font-semibold"
            >
              <Link href="/contact">
                {t("cta.contact")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
