import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getBookingByReference, updateBookingStatus } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    requireAuth(request);
  } catch (res) {
    return res as Response;
  }

  try {
    const { reference } = await params;
    const booking = getBookingByReference(reference);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Admin get booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    requireAuth(request);
  } catch (res) {
    return res as Response;
  }

  try {
    const { reference } = await params;
    const { status } = await request.json();

    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = updateBookingStatus(reference, status);
    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, reference, status });
  } catch (error) {
    console.error("Admin update booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
