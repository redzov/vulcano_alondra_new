"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Mail, ArrowUp } from "lucide-react";
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
                  href="mailto:info@teideexplorer.com"
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
              {[
                { name: "facebook", url: "https://www.facebook.com/VolcanoTeideExperience" },
                { name: "instagram", url: "https://www.instagram.com/volcanoteide" },
                { name: "youtube", url: "https://www.youtube.com/c/VolcanoTeideExperience" },
                { name: "tiktok", url: "https://www.tiktok.com/@volcano_teide" },
                { name: "x", url: "https://twitter.com/VolcanoTeide" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-volcano transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-sm font-medium uppercase">
                    {social.name[0]}
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
              <p>&copy; 2026 {t("copyright")}</p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">{t("securePayment")}</span>
              <div className="flex gap-1.5">
                {["Visa", "Mastercard", "PayPal", "Maestro", "Amex", "iDEAL", "Bancontact"].map((name) => (
                  <span
                    key={name}
                    className="px-2 py-1 rounded bg-white/10 text-[10px] font-medium text-gray-300 leading-none"
                  >
                    {name}
                  </span>
                ))}
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
