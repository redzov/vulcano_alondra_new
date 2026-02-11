import bcrypt from "bcryptjs";
import { verifySession, getAdminByUsername, createSession, deleteSession } from "./db";

const SALT_ROUNDS = 12;
const SESSION_COOKIE = "admin_session";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getSessionFromRequest(request: Request): { userId: number } | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...rest] = c.trim().split("=");
      return [key, rest.join("=")];
    })
  );
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  return verifySession(token);
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
  const user = getAdminByUsername(username);
  if (!user) {
    return { success: false, error: "Invalid credentials" };
  }
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return { success: false, error: "Invalid credentials" };
  }
  const token = createSession(user.id);
  return { success: true, token };
}

export function logoutAdmin(request: Request): void {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...rest] = c.trim().split("=");
      return [key, rest.join("=")];
    })
  );
  const token = cookies[SESSION_COOKIE];
  if (token) {
    deleteSession(token);
  }
}

export function makeSessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`;
}

export function makeClearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
