"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const t = useTranslations("footer");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-footer-dark text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Customer Service */}
          <div>
            <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold mb-6">
              {t("customerService.title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/manage-booking" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("customerService.manageBooking")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("customerService.contact")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("customerService.faq")}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@volcanoteide.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-volcano transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  {t("customerService.email")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold mb-6">
              {t("company.title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("company.about")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("company.workWithUs")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("company.agencies")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("company.sustainability")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold mb-6">
              {t("legal.title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/terms-and-conditions" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("legal.terms")}
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("legal.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("legal.cookies")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-volcano transition-colors text-sm">
                  {t("legal.csr")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Certifications & Social */}
          <div>
            <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold mb-6">
              {t("social.title")}
            </h3>
            <div className="flex gap-3 mb-8">
              {["facebook", "instagram", "youtube", "tiktok", "x"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-volcano transition-colors"
                  aria-label={social}
                >
                  <span className="text-sm font-medium uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-volcano/20 flex items-center justify-center">
                  <span className="text-volcano text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-300">{t("certifications.official")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success text-xs font-bold">★</span>
                </div>
                <span className="text-sm text-gray-300">{t("certifications.bestChoice")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>© {new Date().getFullYear()} {t("copyright")}</p>
              <p className="mt-1">{t("touristId")} · {t("activeTourism")}</p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">{t("securePayment")}</span>
              <div className="flex gap-2">
                <Image
                  src="/images/payments/credit-card-small-amex.png"
                  alt="American Express"
                  width={40}
                  height={25}
                  className="h-6 w-auto opacity-70"
                />
                <Image
                  src="/images/payments/ideal-sofort-bancontact.png"
                  alt="iDEAL / SOFORT"
                  width={80}
                  height={25}
                  className="h-6 w-auto opacity-70"
                />
              </div>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-volcano transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
