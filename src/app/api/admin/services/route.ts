import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getAllServiceOverrides } from "@/lib/db";
import { services } from "@/lib/services";

export async function GET(request: Request) {
  try {
    requireAuth(request);
  } catch (res) {
    return res as Response;
  }

  try {
    const overrides = getAllServiceOverrides();
    const overrideMap = new Map(overrides.map((o) => [o.slug, o]));

    const result = services.map((service) => {
      const override = overrideMap.get(service.slug);
      return {
        slug: service.slug,
        titleKey: service.titleKey,
        price: override?.price ?? service.price,
        images: override?.images_json ? JSON.parse(override.images_json) : service.images,
        category: service.category,
        duration: service.duration,
        difficulty: service.difficulty,
        rating: service.rating,
        reviewCount: service.reviewCount,
        hasOverride: !!override,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin services error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
