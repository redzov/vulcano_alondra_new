import { NextResponse } from "next/server";
import { createBooking, getServiceOverride } from "@/lib/db";
import { getServiceBySlug } from "@/lib/services";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      serviceSlug,
      date,
      adults,
      children = 0,
      firstName,
      lastName,
      email,
      phone,
      observations,
      discountCode,
      isGift = false,
      hotel,
      paymentMethod = "card",
      acceptTerms,
    } = body;

    // Validate required fields
    if (!serviceSlug || !date || !adults || !firstName || !lastName || !email || !phone || !acceptTerms) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Look up service price (with DB override)
    const service = getServiceBySlug(serviceSlug);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const override = getServiceOverride(serviceSlug);
    const price = override?.price ?? service.price;
    const totalPrice = adults * price + children * price * 0.5;

    const booking = createBooking({
      serviceSlug,
      date,
      adults,
      children,
      firstName,
      lastName,
      email,
      phone,
      observations,
      discountCode,
      isGift,
      hotel,
      paymentMethod,
      totalPrice,
    });

    return NextResponse.json({
      reference: booking.reference,
      totalPrice: booking.total_price,
      status: booking.status,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
