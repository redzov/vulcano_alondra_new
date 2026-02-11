"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  Calendar,
  Users,
  Clock,
  Mail,
  Phone,
  FileEdit,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BookingStatus = "idle" | "searching" | "found" | "not_found";

interface BookingData {
  reference: string;
  serviceSlug: string;
  date: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  hotel: string | null;
  createdAt: string;
}

export default function ManageBookingClient() {
  const t = useTranslations("manageBooking");
  const tCommon = useTranslations("common");

  const [bookingRef, setBookingRef] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [booking, setBooking] = useState<BookingData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingRef.trim() || !email.trim()) return;

    setStatus("searching");
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(bookingRef.trim())}?email=${encodeURIComponent(email.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setBooking(data);
        setStatus("found");
      } else {
        setStatus("not_found");
      }
    } catch {
      setStatus("not_found");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setBookingRef("");
    setEmail("");
    setBooking(null);
  };

  const formatServiceSlug = (slug: string) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 pt-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/booking/img1_bkg_booking_management.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-white/80 text-lg">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Search Form / Results */}
            <div className="lg:col-span-3">
              {status === "idle" || status === "searching" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-text-primary mb-2">
                    {t("search.title")}
                  </h2>
                  <p className="text-text-secondary mb-8">
                    {t("search.subtitle")}
                  </p>

                  <form onSubmit={handleSearch} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("search.reference")} *
                      </label>
                      <Input
                        required
                        value={bookingRef}
                        onChange={(e) => setBookingRef(e.target.value)}
                        placeholder={t("search.referencePlaceholder")}
                        className="rounded-xl border-gray-200 focus:border-volcano focus:ring-volcano"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("search.email")} *
                      </label>
                      <Input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("search.emailPlaceholder")}
                        className="rounded-xl border-gray-200 focus:border-volcano focus:ring-volcano"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "searching"}
                      className="w-full sm:w-auto rounded-full bg-volcano hover:bg-volcano-hover text-white px-10 py-6 text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                      {status === "searching" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {tCommon("loading")}
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          {t("search.button")}
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : status === "found" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Booking Found */}
                  {booking && (
                  <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-text-primary">
                          {t("result.found")}
                        </h2>
                        <p className="text-sm text-text-secondary">
                          {t("result.reference")}: <span className="font-mono font-semibold">{booking.reference}</span>
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 ${
                      booking.status === "confirmed" ? "bg-success/10" :
                      booking.status === "cancelled" ? "bg-red-50" : "bg-yellow-50"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        booking.status === "confirmed" ? "bg-success" :
                        booking.status === "cancelled" ? "bg-red-500" : "bg-yellow-500"
                      }`} />
                      <span className={`text-sm font-semibold ${
                        booking.status === "confirmed" ? "text-success" :
                        booking.status === "cancelled" ? "text-red-500" : "text-yellow-600"
                      }`}>{booking.status}</span>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-warm-bg">
                        <Calendar className="h-5 w-5 text-volcano mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{t("result.date")}</p>
                          <p className="text-sm text-text-secondary">{booking.date}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-warm-bg">
                        <Users className="h-5 w-5 text-volcano mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{t("result.guests")}</p>
                          <p className="text-sm text-text-secondary">
                            {booking.adults} {t("result.adults")}
                            {booking.children > 0 && `, ${booking.children} ${t("result.children")}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-warm-bg">
                        <Clock className="h-5 w-5 text-volcano mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{t("result.service")}</p>
                          <p className="text-sm text-text-secondary">{formatServiceSlug(booking.serviceSlug)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-sm font-semibold text-text-primary">{t("result.total")}</span>
                      <span className="text-2xl font-bold text-volcano font-[family-name:var(--font-jakarta)]">
                        &euro;{booking.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-5 rounded-2xl border border-gray-200 hover:border-volcano/30 hover:bg-volcano/5 transition-all text-left">
                      <div className="w-10 h-10 rounded-full bg-volcano/10 flex items-center justify-center flex-shrink-0">
                        <FileEdit className="h-5 w-5 text-volcano" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{t("actions.modify")}</p>
                        <p className="text-xs text-text-secondary">{t("actions.modifyDesc")}</p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-5 rounded-2xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-left">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                        <XCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{t("actions.cancel")}</p>
                        <p className="text-xs text-text-secondary">{t("actions.cancelDesc")}</p>
                      </div>
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-sm text-volcano hover:underline"
                  >
                    {t("actions.searchAnother")}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  </div>
                  <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-text-primary mb-2">
                    {t("notFound.title")}
                  </h2>
                  <p className="text-text-secondary mb-6 max-w-md mx-auto">
                    {t("notFound.message")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={handleReset}
                      className="rounded-full bg-volcano hover:bg-volcano-hover text-white px-8 py-5 font-bold"
                    >
                      {t("notFound.tryAgain")}
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-gray-200 px-8 py-5 font-bold"
                    >
                      <Link href="/contact">{t("notFound.contact")}</Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Cancellation Policy */}
              <div className="rounded-2xl bg-warm-bg p-6">
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-4">
                  {t("policy.title")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-text-secondary">
                      {t("policy.free")}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-text-secondary">
                      {t("policy.late")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary mb-4">
                  {t("help.title")}
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:info@teideexplorer.com"
                    className="flex items-center gap-3 text-sm text-text-secondary hover:text-volcano transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    info@teideexplorer.com
                  </a>
                  <a
                    href="tel:+34922010440"
                    className="flex items-center gap-3 text-sm text-text-secondary hover:text-volcano transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +34 922 010 444
                  </a>
                </div>
              </div>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-text-secondary">
                <Link href="/" className="hover:text-volcano transition-colors">
                  {t("breadcrumb.home")}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-text-primary font-medium">{t("title")}</span>
              </nav>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
