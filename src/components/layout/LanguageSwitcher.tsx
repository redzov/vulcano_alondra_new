"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
];

export default function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "en" | "es" | "de" | "fr" | "nl" | "pl" });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-volcano ${
          scrolled ? "text-text-primary" : "text-white"
        }`}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors hover:bg-warm-bg ${
                lang.code === locale ? "text-volcano font-semibold" : "text-text-primary"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
