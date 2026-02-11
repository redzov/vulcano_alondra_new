import { NextResponse } from "next/server";
import { logoutAdmin, makeClearSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    logoutAdmin(request);
    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", makeClearSessionCookie());
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
