"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactMethods = [
  {
    icon: Mail,
    key: "email",
    href: "mailto:info@volcanoteide.com",
  },
  {
    icon: Phone,
    key: "phone",
    href: "tel:+34922010444",
  },
  {
    icon: MapPin,
    key: "address",
    href: null,
  },
  {
    icon: Clock,
    key: "hours",
    href: null,
  },
];

const quickLinks = [
  { icon: HelpCircle, key: "faq", href: "/info/teide-cable-car-info" },
  { icon: FileText, key: "manage", href: "/manage-booking" },
  { icon: MessageCircle, key: "whatsapp", href: "#" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function ContactPageClient() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Placeholder — Phase 4 will add real form handling
    setTimeout(() => setFormStatus("sent"), 1500);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-warm-bg border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-28">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-4">
            <Link href="/" className="hover:text-volcano transition-colors">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-primary font-medium">{t("title")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              {t("title")}
            </h1>
            <p className="mt-3 text-text-secondary text-lg max-w-2xl">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8">
              <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-text-primary mb-2">
                {t("form.title")}
              </h2>
              <p className="text-text-secondary mb-8">
                {t("form.subtitle")}
              </p>

              {formStatus === "sent" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-text-primary mb-2">
                    {t("form.successTitle")}
                  </h3>
                  <p className="text-text-secondary">
                    {t("form.successMessage")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("form.name")} *
                      </label>
                      <Input
                        required
                        placeholder={t("form.namePlaceholder")}
                        className="rounded-xl border-gray-200 focus:border-volcano focus:ring-volcano"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("form.email")} *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder={t("form.emailPlaceholder")}
                        className="rounded-xl border-gray-200 focus:border-volcano focus:ring-volcano"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t("form.subject")}
                    </label>
                    <Input
                      placeholder={t("form.subjectPlaceholder")}
                      className="rounded-xl border-gray-200 focus:border-volcano focus:ring-volcano"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t("form.bookingRef")}
                    </label>
                    <Input
                      placeholder={t("form.bookingRefPlaceholder")}
                      className="rounded-xl border-gray-200 focus:border-volcano focus:ring-volcano"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t("form.message")} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={t("form.messagePlaceholder")}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-volcano focus:ring-volcano focus:outline-none resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full sm:w-auto rounded-full bg-volcano hover:bg-volcano-hover text-white px-10 py-6 text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                  >
                    {formStatus === "sending" ? (
                      <>{tCommon("loading")}</>
                    ) : (
                      <>
                        {t("form.send")}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-5">
              {contactMethods.map(({ icon: Icon, key, href }) => (
                <div key={key} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-volcano/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-volcano" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {t(`methods.${key}.label`)}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-volcano hover:underline"
                      >
                        {t(`methods.${key}.value`)}
                      </a>
                    ) : (
                      <p className="text-sm text-text-secondary">
                        {t(`methods.${key}.value`)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl bg-warm-bg p-6">
              <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-4">
                {t("quickLinks.title")}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map(({ icon: Icon, key, href }) => (
                  <li key={key}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 text-sm text-text-secondary hover:text-volcano transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {t(`quickLinks.${key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Info */}
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-3">
                {t("company.title")}
              </h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>{t("company.name")}</p>
                <p>{t("company.cif")}</p>
                <p>{t("company.touristId")}</p>
                <p>{t("company.activeTourism")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
