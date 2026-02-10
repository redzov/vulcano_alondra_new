"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
            <Link href="/" className="flex items-center gap-2.5">
              <svg
                viewBox="0 0 144.85 144.85"
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 flex-shrink-0"
                aria-hidden="true"
              >
                <rect
                  width="144.85"
                  height="144.85"
                  rx="17.16"
                  ry="17.16"
                  fill="#fff"
                />
                <path
                  d="m81.89,91.21c-1.17.36-1.61.45-2.58.69l.24-1.37c.28-1.61.89-2.78,2.95-2.78,1.05,0,1.65.44,1.65,1.13,0,1.17-.73,1.9-2.26,2.34m-9,5.09c-.16.85-.24,1.65-.24,2.38,0,3.35,1.74,5.13,5.81,5.13,3.47,0,7.22-1.21,9.61-2.7l-1.09-4.04c-2.66,1.17-5.65,2.18-7.71,2.18-1.05,0-1.13-.65-1.01-1.37l.24-1.37c1.69-.44,1.74-.44,4.12-1.17,4.84-1.45,6.82-3.23,6.82-7.06,0-3.31-2.83-4.92-6.54-4.92-6.21,0-8.23,2.91-9.04,7.43l-.97,5.53Zm-13.24-4.72c.36-1.9.97-3.47,3.91-3.47.81,0,1.57.04,2.22.16l-1.53,8.76c-1.09.97-2.54,2.02-4.56,2.02-1.01,0-1.29-.48-1.09-1.53l1.05-5.93Zm9.16,11.83l5.01-28.49-5.81.81-1.37,7.83c-.52-.12-1.78-.2-2.38-.2-8.27,0-9.48,3.51-10.29,8.19l-.93,5.29c-.77,4.4.28,6.98,4.56,6.98,2.83,0,4.84-.93,6.26-2.1l.16,1.7h4.8Zm-25.47,0h5.69l3.55-20.02-5.85.81-3.39,19.21Zm3.87-21.83l5.81-.81,1.09-6.05-5.85.81-1.05,6.05Zm-11.46,9.64c-1.17.36-1.61.45-2.58.69l.24-1.37c.28-1.61.89-2.78,2.95-2.78,1.05,0,1.65.44,1.65,1.13,0,1.17-.73,1.9-2.26,2.34m-9,5.09c-.16.85-.24,1.65-.24,2.38,0,3.35,1.74,5.13,5.81,5.13,3.47,0,7.22-1.21,9.61-2.7l-1.09-4.04c-2.66,1.17-5.65,2.18-7.71,2.18-1.05,0-1.13-.65-1.01-1.37l.24-1.37c1.7-.44,1.74-.44,4.12-1.17,4.84-1.45,6.82-3.23,6.82-7.06,0-3.31-2.83-4.92-6.54-4.92-6.21,0-8.23,2.91-9.04,7.43l-.97,5.53Zm-2.54-14.53h7.26l.93-5.25H11.91l-.93,5.25h7.26l-3.79,21.63h5.97l3.79-21.63Z"
                  fill="#e94e1b"
                />
                <path
                  d="m128.1,57.26l-.85,4.88c-.32,1.94-1.53,3.03-3.71,3.03-1.86,0-2.74-.81-2.74-2.22,0-.24.04-.53.08-.81l.85-4.88c.32-1.94,1.57-3.03,3.71-3.03,1.86,0,2.74.77,2.74,2.22,0,.24-.04.52-.08.81m-5.41,12.67c7.14,0,9.4-3.23,10.25-7.95l.81-4.56c.08-.48.12-.97.12-1.41,0-3.51-2.38-6.54-7.67-6.54-6.86,0-9.32,2.91-10.21,7.95l-.81,4.56c-.08.44-.12.93-.12,1.37,0,3.59,2.62,6.58,7.63,6.58m-16.95-.4h5.69l2.42-13.8c.16-1.01.2-1.57.2-2.26,0-2.5-.97-4-3.59-4-2.26,0-4.68.77-7.75,2.22l.04-2.18-5,.85-3.35,19.17h5.69l2.22-12.67c1.53-.81,4.04-1.86,5.09-1.86.56,0,.77.16.77.56,0,.16-.04.36-.08.61l-2.34,13.36Zm-23.81-11.82c.36-1.9.73-3.35,3.67-3.35.61,0,1.45.04,2.22.2l-1.49,8.52c-1.29,1.09-2.87,1.94-4.32,1.94-1.01,0-1.25-.4-1.09-1.45l1.01-5.85Zm8.96,11.82l3.27-18.81c-2.74-.85-5.45-1.21-7.51-1.21-7.75,0-9.61,3.47-10.41,8.15l-.93,5.29c-.77,4.4.08,6.98,4.36,6.98,2.83,0,4.88-1.05,6.26-2.1l.16,1.69h4.8Zm-24.7.4c2.1,0,4.84-.69,6.5-1.49l-.52-4.56c-1.37.4-4.08,1.21-5.53,1.21-.73,0-1.05-.32-1.05-.97,0-.2.04-.53.08-.77l1.05-5.97c.4-2.26,1.25-3.07,3.83-3.07,1.13,0,2.3.24,3.27.57l1.37-4.6c-1.13-.44-2.83-.81-4.56-.81-5.57,0-8.27,1.41-9.36,6.98l-1.09,5.49c-.24,1.13-.32,1.98-.32,2.99,0,3.47,1.82,5,6.34,5m-15.98-.4h5.69l5-28.49-5.85.81-4.84,27.69Zm-6.13-12.27l-.85,4.88c-.32,1.94-1.53,3.03-3.71,3.03-1.86,0-2.74-.81-2.74-2.22,0-.24.04-.53.08-.81l.85-4.88c.32-1.94,1.57-3.03,3.71-3.03,1.86,0,2.74.77,2.74,2.22,0,.24-.04.52-.08.81m-5.41,12.67c7.14,0,9.4-3.23,10.25-7.95l.81-4.56c.08-.48.12-.97.12-1.41,0-3.51-2.38-6.54-7.67-6.54-6.86,0-9.32,2.91-10.21,7.95l-.81,4.56c-.08.44-.12.93-.12,1.37,0,3.59,2.62,6.58,7.63,6.58m-15.5-.4l12.19-26.88h-6.46l-9.44,21.75-1.94-21.75h-6.05l2.87,26.88h8.84Z"
                  fill="#e94e1b"
                />
              </svg>
              <span
                className={`font-[family-name:var(--font-jakarta)] text-xl font-bold transition-colors ${
                  showDark ? "text-text-primary" : "text-white"
                }`}
              >
                Volcano Teide
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
