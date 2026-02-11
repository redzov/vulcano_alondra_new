"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, Link } from "@/i18n/navigation";
import Image from "next/image";
import { format, type Locale } from "date-fns";
import { enUS, es, de, fr, nl, pl } from "date-fns/locale";
import {
  CreditCard,
  Gift,
  MapPin,
  Shield,
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import type { Service } from "@/lib/services";

const localeMap: Record<string, Locale> = { en: enUS, es, de, fr, nl, pl };

const HOTELS = [
  "Hotel Botánico (Puerto de la Cruz)",
  "Hotel Mencey (Santa Cruz)",
  "Hard Rock Hotel (Adeje)",
  "Hotel Ritz-Carlton Abama (Guía de Isora)",
  "Hotel Gran Tacande (Costa Adeje)",
  "Hotel Laguna Nivaria (Costa Adeje)",
  "Hotel Jardín Tropical (Costa Adeje)",
  "Hotel Best Semiramis (Puerto de la Cruz)",
  "Hotel Maritim (Puerto de la Cruz)",
  "Hotel Sunlight Bahia Principe (Costa Adeje)",
];

interface CheckoutClientProps {
  service: Service;
}

export default function CheckoutClient({ service }: CheckoutClientProps) {
  const t = useTranslations();
  const tc = useTranslations("checkout");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateLocale = localeMap[locale] || enUS;

  // Read booking data from URL
  const dateStr = searchParams.get("date") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const bookingDate = dateStr ? new Date(dateStr + "T00:00:00") : new Date();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [observations, setObservations] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountStatus, setDiscountStatus] = useState<"idle" | "invalid" | "applied">("idle");
  const [isGift, setIsGift] = useState(false);
  const [hotel, setHotel] = useState("");
  const [hotelOpen, setHotelOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const hasPickup = service.meetingPoint.toLowerCase().includes("pick-up");

  const totalPrice = useMemo(
    () => adults * service.price + children * service.price * 0.5,
    [adults, children, service.price]
  );

  const handleCheckDiscount = () => {
    if (!discountCode.trim()) return;
    // Demo: always invalid
    setDiscountStatus("invalid");
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!email.trim() || !email.includes("@")) newErrors.email = true;
    if (!phone.trim()) newErrors.phone = true;
    if (hasPickup && !hotel) newErrors.hotel = true;
    if (!acceptTerms) newErrors.acceptTerms = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: service.slug,
          date: dateStr,
          adults,
          children,
          firstName,
          lastName,
          email,
          phone,
          observations,
          discountCode: discountCode || undefined,
          isGift,
          hotel: hotel || undefined,
          paymentMethod,
          acceptTerms,
          acceptMarketing,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Booking failed");
        setSubmitting(false);
        return;
      }

      setBookingRef(data.reference);
      setSubmitted(true);
    } catch {
      setSubmitError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success confirmation
  if (submitted) {
    return (
      <div className="min-h-screen bg-warm-bg pt-28 pb-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-text-primary mb-3">
              {tc("bookingConfirmed")}
            </h1>
            <p className="text-text-secondary mb-2">
              {tc("confirmationMessage")}
            </p>
            {bookingRef && (
              <p className="text-sm font-mono font-semibold text-volcano mb-2">
                {bookingRef}
              </p>
            )}
            <p className="text-sm text-text-secondary mb-8">
              {t(service.titleKey)} &middot;{" "}
              {format(bookingDate, "PPP", { locale: dateLocale })}
            </p>
            <Button
              asChild
              className="rounded-full bg-volcano hover:bg-volcano-hover text-white px-8 py-5 font-semibold"
            >
              <Link href="/">{tc("backToHome")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const paymentOptions = [
    { key: "card", label: tc("cardPayment"), sublabel: "Visa / Mastercard / Amex" },
  ];

  return (
    <div className="min-h-screen bg-warm-bg pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-[family-name:var(--font-jakarta)] text-2xl sm:text-3xl font-bold text-text-primary mb-8">
          {tc("title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Reservation Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-volcano" />
                {tc("reservationDetails")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    {tc("firstName")} <span className="text-volcano">*</span>
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: false })); }}
                    className={`h-11 rounded-xl border-gray-200 ${errors.firstName ? "border-red-400 ring-1 ring-red-400" : ""}`}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{tc("required")}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    {tc("lastName")} <span className="text-volcano">*</span>
                  </label>
                  <Input
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: false })); }}
                    className={`h-11 rounded-xl border-gray-200 ${errors.lastName ? "border-red-400 ring-1 ring-red-400" : ""}`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{tc("required")}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    {tc("email")} <span className="text-volcano">*</span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: false })); }}
                    className={`h-11 rounded-xl border-gray-200 ${errors.email ? "border-red-400 ring-1 ring-red-400" : ""}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{tc("required")}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    {tc("phone")} <span className="text-volcano">*</span>
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: false })); }}
                    className={`h-11 rounded-xl border-gray-200 ${errors.phone ? "border-red-400 ring-1 ring-red-400" : ""}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{tc("required")}</p>}
                </div>
              </div>

              {/* Observations */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  {tc("observations")}
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder={tc("observationsPlaceholder")}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-volcano/50 focus:ring-1 focus:ring-volcano/30 outline-none resize-y"
                />
              </div>
            </div>

            {/* Discount Code + Gift */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    {tc("discountCode")}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={discountCode}
                      onChange={(e) => { setDiscountCode(e.target.value); setDiscountStatus("idle"); }}
                      className="h-11 rounded-xl border-gray-200 flex-1"
                    />
                    <Button
                      onClick={handleCheckDiscount}
                      className="h-11 rounded-xl bg-volcano hover:bg-volcano-hover text-white px-5 font-medium"
                    >
                      {tc("checkCode")}
                    </Button>
                  </div>
                  {discountStatus === "invalid" && (
                    <p className="text-xs text-red-500 mt-1">{tc("invalidCode")}</p>
                  )}
                </div>
              </div>

              <Separator className="my-5" />

              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={isGift}
                  onCheckedChange={(v) => setIsGift(v === true)}
                  className="data-[state=checked]:bg-volcano data-[state=checked]:border-volcano"
                />
                <Gift className="h-4 w-4 text-volcano" />
                <span className="text-sm font-medium text-text-primary">{tc("itsAGift")}</span>
              </label>
            </div>

            {/* Pick-up Information (conditional) */}
            {hasPickup && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-volcano" />
                  {tc("pickupInfo")}
                </h2>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    {tc("selectHotel")} <span className="text-volcano">*</span>
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setHotelOpen(!hotelOpen)}
                      className={`w-full flex items-center justify-between h-11 px-4 rounded-xl border text-left text-sm transition-colors ${
                        errors.hotel
                          ? "border-red-400 ring-1 ring-red-400"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className={hotel ? "text-text-primary" : "text-gray-400"}>
                        {hotel || tc("selectHotel")}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </button>
                    {hotelOpen && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {HOTELS.map((h) => (
                          <button
                            key={h}
                            onClick={() => {
                              setHotel(h);
                              setHotelOpen(false);
                              setErrors((p) => ({ ...p, hotel: false }));
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                              hotel === h ? "bg-volcano/5 text-volcano font-medium" : "text-text-primary"
                            }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.hotel && <p className="text-xs text-red-500 mt-1">{tc("required")}</p>}
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-volcano" />
                {tc("paymentMethod")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setPaymentMethod(opt.key)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === opt.key
                        ? "border-volcano bg-volcano/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        paymentMethod === opt.key ? "border-volcano" : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === opt.key && (
                        <div className="w-2.5 h-2.5 rounded-full bg-volcano" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-text-primary">{opt.label}</span>
                      {opt.sublabel && (
                        <span className="block text-xs text-text-secondary">{opt.sublabel}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="space-y-4">
                <label className={`flex items-start gap-3 cursor-pointer ${errors.acceptTerms ? "text-red-500" : ""}`}>
                  <Checkbox
                    checked={acceptTerms}
                    onCheckedChange={(v) => { setAcceptTerms(v === true); setErrors((p) => ({ ...p, acceptTerms: false })); }}
                    className={`mt-0.5 data-[state=checked]:bg-volcano data-[state=checked]:border-volcano ${
                      errors.acceptTerms ? "border-red-400" : ""
                    }`}
                  />
                  <span className="text-sm text-text-secondary leading-relaxed">
                    {tc("acceptTerms")}{" "}
                    <Link href="/legal/terms-and-conditions" className="text-volcano hover:underline">
                      {tc("termsLink")}
                    </Link>
                    , {" "}
                    <Link href="/legal/privacy-policy" className="text-volcano hover:underline">
                      {tc("privacyLink")}
                    </Link>
                    {" "}{tc("and")}{" "}
                    <Link href="/legal/cookies" className="text-volcano hover:underline">
                      {tc("cookiesLink")}
                    </Link>
                    {" "}<span className="text-volcano">*</span>
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-xs text-red-500 ml-8">{tc("required")}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={acceptMarketing}
                    onCheckedChange={(v) => setAcceptMarketing(v === true)}
                    className="mt-0.5 data-[state=checked]:bg-volcano data-[state=checked]:border-volcano"
                  />
                  <span className="text-sm text-text-secondary leading-relaxed">
                    {tc("marketingOptIn")}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full rounded-full bg-volcano hover:bg-volcano-hover text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Processing..." : `${tc("confirmBooking")} \u2014 \u20AC${totalPrice.toFixed(2)}`}
            </Button>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:order-last order-first">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-4">
                {tc("orderSummary")}
              </h2>

              {/* Service Image */}
              {service.images[0] && (
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={service.images[0]}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-text-primary mb-3">
                {t(service.titleKey)}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>{format(bookingDate, "PPP", { locale: dateLocale })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>
                    {tc("adultsCount", { count: adults })}
                    {children > 0 && `, ${tc("childrenCount", { count: children })}`}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Price breakdown */}
              <div className="space-y-2">
                {adults > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {adults} &times; {t("booking.adult")} (&euro;{service.price.toFixed(2)})
                    </span>
                    <span className="text-text-primary font-medium">
                      &euro;{(adults * service.price).toFixed(2)}
                    </span>
                  </div>
                )}
                {children > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {children} &times; {t("booking.child")} (&euro;{(service.price * 0.5).toFixed(2)})
                    </span>
                    <span className="text-text-primary font-medium">
                      &euro;{(children * service.price * 0.5).toFixed(2)}
                    </span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">{t("booking.total")}</span>
                  <span className="text-xl font-bold text-volcano">
                    &euro;{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Trust signals */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <RefreshCw className="h-4 w-4 text-success flex-shrink-0" />
                  <span>{t("booking.freeCancellation")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Shield className="h-4 w-4 text-success flex-shrink-0" />
                  <span>{t("booking.securePayment")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
