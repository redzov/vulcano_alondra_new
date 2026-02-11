import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getServiceOverride, upsertServiceOverride } from "@/lib/db";
import type { ServiceDataOverride } from "@/lib/db";
import { getServiceBySlug } from "@/lib/services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    requireAuth(request);
  } catch (res) {
    return res as Response;
  }

  try {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const override = getServiceOverride(slug);
    let data: ServiceDataOverride = {};
    if (override?.data_json) {
      try {
        data = JSON.parse(override.data_json);
      } catch {
        // ignore parse errors
      }
    }

    return NextResponse.json({
      slug: service.slug,
      price: override?.price ?? service.price,
      images: override?.images_json ? JSON.parse(override.images_json) : service.images,
      category: service.category,
      // Text fields from data_json (or empty fallbacks)
      title: data.title || "",
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      fullDescription: data.fullDescription || "",
      duration: data.duration || service.duration,
      difficulty: data.difficulty || service.difficulty,
      rating: data.rating ?? service.rating,
      reviewCount: data.reviewCount ?? service.reviewCount,
      languages: data.languages || service.languages,
      highlights: data.highlights || [],
      includes: data.includes || [],
      notIncluded: data.notIncluded || [],
      restrictions: data.restrictions || [],
      importantInfo: data.importantInfo || [],
      prepare: data.prepare || [],
      meetingPoint: data.meetingPoint || service.meetingPoint,
    });
  } catch (error) {
    console.error("Admin get service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    requireAuth(request);
  } catch (res) {
    return res as Response;
  }

  try {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const body = await request.json();
    const { price, images, ...textFields } = body;

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    if (images !== undefined && !Array.isArray(images)) {
      return NextResponse.json({ error: "Images must be an array" }, { status: 400 });
    }

    // Build data override from text fields
    const data: ServiceDataOverride = {
      title: textFields.title,
      shortDescription: textFields.shortDescription,
      description: textFields.description,
      fullDescription: textFields.fullDescription,
      duration: textFields.duration,
      difficulty: textFields.difficulty,
      rating: textFields.rating,
      reviewCount: textFields.reviewCount,
      languages: textFields.languages,
      highlights: textFields.highlights,
      includes: textFields.includes,
      notIncluded: textFields.notIncluded,
      restrictions: textFields.restrictions,
      importantInfo: textFields.importantInfo,
      prepare: textFields.prepare,
      meetingPoint: textFields.meetingPoint,
    };

    upsertServiceOverride(slug, price, images, data);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Admin update service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
