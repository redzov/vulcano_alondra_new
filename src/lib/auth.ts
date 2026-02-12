import crypto from "crypto";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "admin_session";
const SALT_ROUNDS = 12;
const SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds
const SECRET = process.env.SESSION_SECRET || "fallback-dev-secret-change-me";

// ── Stateless HMAC session tokens ──

function signToken(payload: string): string {
  const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

function verifyToken(token: string): string | null {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;
  const payload = token.substring(0, lastDot);
  const sig = token.substring(lastDot + 1);
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  return payload;
}

function createStatelessSession(): string {
  const payload = `admin:${Date.now()}`;
  return signToken(payload);
}

function verifyStatelessSession(token: string): { userId: number } | null {
  const payload = verifyToken(token);
  if (!payload) return null;
  const [prefix, tsStr] = payload.split(":");
  if (prefix !== "admin") return null;
  const ts = parseInt(tsStr, 10);
  if (isNaN(ts)) return null;
  // Check expiration
  if (Date.now() - ts > SESSION_MAX_AGE * 1000) return null;
  return { userId: 1 };
}

// ── Cookie helpers ──

function parseCookies(request: Request): Record<string, string> {
  const header = request.headers.get("cookie") || "";
  return Object.fromEntries(
    header.split(";").map((c) => {
      const [key, ...rest] = c.trim().split("=");
      return [key, rest.join("=")];
    })
  );
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// ── Public API ──

export function getSessionFromRequest(request: Request): { userId: number } | null {
  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return null;

  // Try DB-backed session first
  try {
    const { verifySession } = require("./db");
    const session = verifySession(token);
    if (session) return session;
  } catch {
    // DB unavailable — fall through to stateless
  }

  return verifyStatelessSession(token);
}

export function requireAuth(request: Request): { userId: number } {
  const session = getSessionFromRequest(request);
  if (!session) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return session;
}

export async function loginAdmin(
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  // Try DB-backed login first
  try {
    const { getAdminByUsername, createSession } = require("./db");
    const user = getAdminByUsername(username);
    if (user) {
      const valid = await bcrypt.compare(password, user.password_hash);
      if (valid) {
        const token = createSession(user.id);
        return { success: true, token };
      }
      return { success: false, error: "Invalid credentials" };
    }
  } catch {
    // DB unavailable — fall through to env-var auth
  }

  // Env-var fallback (works on Vercel without DB)
  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;
  if (!envUser || !envPass) {
    return { success: false, error: "Admin not configured" };
  }
  if (username === envUser && password === envPass) {
    const token = createStatelessSession();
    return { success: true, token };
  }
  return { success: false, error: "Invalid credentials" };
}

export function logoutAdmin(request: Request): void {
  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return;
  try {
    const { deleteSession } = require("./db");
    deleteSession(token);
  } catch {
    // DB unavailable — stateless token just expires naturally
  }
}

export function makeSessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

export function makeClearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
