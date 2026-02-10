"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  BarChart3,
  Ticket,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  Star,
  Globe,
  Settings,
  Bell,
  Search,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign,
  Activity,
  Mountain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { services } from "@/lib/services";

// Demo stats data
const stats = [
  {
    label: "Total Bookings",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Ticket,
  },
  {
    label: "Revenue",
    value: "€186,420",
    change: "+8.2%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Visitors Today",
    value: "1,234",
    change: "+23.1%",
    trend: "up" as const,
    icon: Eye,
  },
  {
    label: "Avg Rating",
    value: "4.52",
    change: "+0.3",
    trend: "up" as const,
    icon: Star,
  },
];

// Demo recent bookings
const recentBookings = [
  { ref: "VT-2025-39012", service: "Teide Cable Car", guests: 4, total: 94.0, status: "confirmed", time: "2 min ago" },
  { ref: "VT-2025-39011", service: "Sunset & Stars", guests: 2, total: 344.0, status: "confirmed", time: "15 min ago" },
  { ref: "VT-2025-39010", service: "Observatory Visit", guests: 6, total: 126.0, status: "pending", time: "32 min ago" },
  { ref: "VT-2025-39009", service: "Hiking Teide Peak", guests: 2, total: 326.0, status: "confirmed", time: "1 hour ago" },
  { ref: "VT-2025-39008", service: "Astronomic Tour", guests: 3, total: 309.0, status: "cancelled", time: "2 hours ago" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-yellow-50 text-yellow-600",
  cancelled: "bg-red-50 text-red-500",
};

export default function AdminDashboardClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const topServices = [...services]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                <Link href="/" className="hover:text-volcano transition-colors">Home</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-text-primary font-medium">Admin Dashboard</span>
              </div>
              <h1 className="font-[family-name:var(--font-jakarta)] text-2xl sm:text-3xl font-bold text-text-primary flex items-center gap-3">
                <Mountain className="h-7 w-7 text-volcano" />
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200 w-64"
                />
              </div>
              <button className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Bell className="h-5 w-5 text-text-secondary" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-volcano rounded-full" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Settings className="h-5 w-5 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-volcano/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-volcano" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-success" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary font-[family-name:var(--font-jakarta)]">
                {stat.value}
              </p>
              <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary flex items-center gap-2">
                  <Activity className="h-5 w-5 text-volcano" />
                  Recent Bookings
                </h2>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  View All
                </Button>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {recentBookings.map((booking) => (
                <div key={booking.ref} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{booking.service}</p>
                      <p className="text-xs text-text-secondary font-mono">{booking.ref}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-1 text-sm text-text-secondary">
                      <Users className="h-3.5 w-3.5" />
                      {booking.guests}
                    </div>
                    <span className="text-sm font-semibold text-text-primary">
                      €{booking.total.toFixed(2)}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                    <span className="hidden sm:block text-xs text-text-secondary flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {booking.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Services */}
          <div className="rounded-2xl bg-white shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-text-primary flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-volcano" />
                Top Services
              </h2>
            </div>
            <div className="p-6 space-y-5">
              {topServices.map((service, i) => (
                <div key={service.slug} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-text-secondary w-6">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm font-semibold text-text-primary hover:text-volcano transition-colors truncate block"
                    >
                      {service.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-text-secondary">{service.rating} ({service.reviewCount})</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-volcano">€{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/services"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-volcano/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-volcano/10 flex items-center justify-center">
              <Ticket className="h-5 w-5 text-volcano" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Manage Services</p>
              <p className="text-xs text-text-secondary">{services.length} active</p>
            </div>
          </Link>
          <Link
            href="/manage-booking"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-volcano/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Bookings</p>
              <p className="text-xs text-text-secondary">View & manage</p>
            </div>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-volcano/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Messages</p>
              <p className="text-xs text-text-secondary">3 unread</p>
            </div>
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-volcano/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Globe className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Site Content</p>
              <p className="text-xs text-text-secondary">Pages & i18n</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
