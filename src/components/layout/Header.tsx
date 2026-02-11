"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Only the homepage has a dark hero — all other pages need dark header text from the start
  const isHomepage = /^\/[a-z]{2}\/?$/.test(pathname);
  const showDark = !isHomepage || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.activities"), href: "/services" },
    { label: t("nav.teideToday"), href: "/info/weather-and-webcams" },
    { label: t("nav.manageBooking"), href: "/manage-booking" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showDark
            ? "bg-white/95 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5">
              <Image
                src="/images/logos/teide-explorer-logo.png"
                alt="Teide Explorer"
                width={729}
                height={1022}
                className="h-20 w-auto flex-shrink-0"
                priority
              />
              <span
                className={`font-[family-name:var(--font-jakarta)] text-xl font-bold transition-colors ${
                  showDark ? "text-text-primary" : "text-white"
                }`}
              >
                Teide Explorer
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-volcano ${
                    showDark ? "text-text-primary" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <LanguageSwitcher scrolled={showDark} />
              </div>
              <Button
                asChild
                className="hidden sm:inline-flex rounded-full bg-volcano hover:bg-volcano-hover text-white px-6 py-2.5 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <Link href="/services">{t("bookNow")}</Link>
              </Button>
              <button
                className="lg:hidden p-2"
                onClick={() => setMobileOpen(true)}
                aria-label={t("menu")}
              >
                <Menu
                  className={`h-6 w-6 ${showDark ? "text-text-primary" : "text-white"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
