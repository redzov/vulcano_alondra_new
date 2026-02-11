import { NextResponse } from "next/server";
import { getBookingByReferenceAndEmail, updateBookingPayment } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { bookingReference, email } = await request.json();

    if (!bookingReference || !email) {
      return NextResponse.json({ error: "Missing bookingReference or email" }, { status: 400 });
    }

    const booking = getBookingByReferenceAndEmail(bookingReference, email);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Payment gateway preparation
    // When a provider is chosen (Stripe, Redsys, etc.), implement the redirect URL here.
    // For now, return a placeholder response.
    const paymentData = {
      bookingReference: booking.reference,
      amount: booking.total_price,
      currency: "EUR",
      description: `Teide Explorer - Booking ${booking.reference}`,
      returnUrl: `${new URL(request.url).origin}/en/manage-booking`,
      cancelUrl: `${new URL(request.url).origin}/en/manage-booking`,
      // paymentUrl: null — no provider configured yet
      paymentUrl: null as string | null,
      message: "Payment gateway not yet configured. Your booking has been saved.",
    };

    // Mark booking as confirmed (since we don't have real payment yet)
    updateBookingPayment(booking.reference, "pending");

    return NextResponse.json(paymentData);
  } catch (error) {
    console.error("Payment create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
