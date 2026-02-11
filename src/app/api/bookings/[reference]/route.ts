import { NextResponse } from "next/server";
import { getBookingByReferenceAndEmail } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const booking = getBookingByReferenceAndEmail(reference, email);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      reference: booking.reference,
      serviceSlug: booking.service_slug,
      date: booking.date,
      adults: booking.adults,
      children: booking.children,
      firstName: booking.first_name,
      lastName: booking.last_name,
      email: booking.email,
      phone: booking.phone,
      observations: booking.observations,
      hotel: booking.hotel,
      totalPrice: booking.total_price,
      status: booking.status,
      paymentStatus: booking.payment_status,
      createdAt: booking.created_at,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
