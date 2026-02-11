"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type NavItem = {
  label: string;
  href: string;
};

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileDrawer({ open, onClose, navItems }: MobileDrawerProps) {
  const t = useTranslations("header");

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-white p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/logos/teide-explorer-logo.png"
                alt="Teide Explorer"
                width={729}
                height={1022}
                className="h-[72px] w-auto flex-shrink-0"
              />
              <span className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary">
                Teide Explorer
              </span>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
              <X className="h-5 w-5 text-text-secondary" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-3 text-base font-medium text-text-primary rounded-xl hover:bg-warm-bg transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTA */}
          <div className="px-6 py-6 border-t">
            <Button asChild className="w-full rounded-full bg-volcano hover:bg-volcano-hover text-white py-6 text-base font-semibold shadow-md">
              <Link href="/services" onClick={onClose}>{t("bookNow")}</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
