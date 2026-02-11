import { NextResponse } from "next/server";
import { loginAdmin, makeSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const result = await loginAdmin(username, password);

    if (!result.success || !result.token) {
      return NextResponse.json({ error: result.error || "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", makeSessionCookie(result.token));
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
