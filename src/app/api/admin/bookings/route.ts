import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getAllBookings, getBookingStats } from "@/lib/db";

export async function GET(request: Request) {
  try {
    requireAuth(request);
  } catch (res) {
    return res as Response;
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || undefined;
    const bookings = getAllBookings(status);
    const stats = getBookingStats();

    return NextResponse.json({ bookings, stats });
  } catch (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
