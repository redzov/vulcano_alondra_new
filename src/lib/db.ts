import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "teide.db");

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initSchema(_db);
  }
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      expires_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES admin_users(id)
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE NOT NULL,
      service_slug TEXT NOT NULL,
      date TEXT NOT NULL,
      adults INTEGER NOT NULL,
      children INTEGER DEFAULT 0,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      observations TEXT,
      discount_code TEXT,
      is_gift INTEGER DEFAULT 0,
      hotel TEXT,
      payment_method TEXT DEFAULT 'card',
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_status TEXT DEFAULT 'pending',
      payment_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS service_overrides (
      slug TEXT PRIMARY KEY,
      price REAL,
      images_json TEXT,
      data_json TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

// ── Booking helpers ──

export interface BookingInput {
  serviceSlug: string;
  date: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  observations?: string;
  discountCode?: string;
  isGift: boolean;
  hotel?: string;
  paymentMethod: string;
  totalPrice: number;
}

export interface BookingRow {
  id: number;
  reference: string;
  service_slug: string;
  date: string;
  adults: number;
  children: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  observations: string | null;
  discount_code: string | null;
  is_gift: number;
  hotel: string | null;
  payment_method: string;
  total_price: number;
  status: string;
  payment_status: string;
  payment_id: string | null;
  created_at: string;
}

function generateReference(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TE-${year}-${code}`;
}

export function createBooking(input: BookingInput): BookingRow {
  const db = getDb();
  let reference = generateReference();
  // Ensure uniqueness
  const check = db.prepare("SELECT 1 FROM bookings WHERE reference = ?");
  while (check.get(reference)) {
    reference = generateReference();
  }

  const stmt = db.prepare(`
    INSERT INTO bookings (reference, service_slug, date, adults, children, first_name, last_name, email, phone, observations, discount_code, is_gift, hotel, payment_method, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    reference,
    input.serviceSlug,
    input.date,
    input.adults,
    input.children,
    input.firstName,
    input.lastName,
    input.email,
    input.phone,
    input.observations || null,
    input.discountCode || null,
    input.isGift ? 1 : 0,
    input.hotel || null,
    input.paymentMethod,
    input.totalPrice
  );

  return db.prepare("SELECT * FROM bookings WHERE reference = ?").get(reference) as BookingRow;
}

export function getBookingByReference(reference: string): BookingRow | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM bookings WHERE reference = ?").get(reference) as BookingRow | undefined;
}

export function getBookingByReferenceAndEmail(reference: string, email: string): BookingRow | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM bookings WHERE reference = ? AND email = ?").get(reference, email) as BookingRow | undefined;
}

export function getAllBookings(status?: string): BookingRow[] {
  const db = getDb();
  if (status) {
    return db.prepare("SELECT * FROM bookings WHERE status = ? ORDER BY created_at DESC").all(status) as BookingRow[];
  }
  return db.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all() as BookingRow[];
}

export function updateBookingStatus(reference: string, status: string): boolean {
  const db = getDb();
  const result = db.prepare("UPDATE bookings SET status = ? WHERE reference = ?").run(status, reference);
  return result.changes > 0;
}

export function updateBookingPayment(reference: string, paymentStatus: string, paymentId?: string): boolean {
  const db = getDb();
  const result = db.prepare("UPDATE bookings SET payment_status = ?, payment_id = ? WHERE reference = ?").run(paymentStatus, paymentId || null, reference);
  return result.changes > 0;
}

export function getBookingStats(): { totalBookings: number; totalRevenue: number; todayBookings: number } {
  const db = getDb();
  const total = db.prepare("SELECT COUNT(*) as count FROM bookings").get() as { count: number };
  const revenue = db.prepare("SELECT COALESCE(SUM(total_price), 0) as sum FROM bookings WHERE status != 'cancelled'").get() as { sum: number };
  const today = new Date().toISOString().split("T")[0];
  const todayCount = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE date(created_at) = ?").get(today) as { count: number };
  return {
    totalBookings: total.count,
    totalRevenue: revenue.sum,
    todayBookings: todayCount.count,
  };
}

// ── Service override helpers ──

export interface ServiceOverrideRow {
  slug: string;
  price: number | null;
  images_json: string | null;
  data_json: string | null;
  updated_at: string;
}

export interface ServiceDataOverride {
  title?: string;
  shortDescription?: string;
  description?: string;
  fullDescription?: string;
  duration?: string;
  difficulty?: string;
  rating?: number;
  reviewCount?: number;
  languages?: string[];
  highlights?: string[];
  includes?: string[];
  notIncluded?: string[];
  restrictions?: string[];
  importantInfo?: string[];
  prepare?: string[];
  meetingPoint?: string;
}

export function getServiceOverride(slug: string): ServiceOverrideRow | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM service_overrides WHERE slug = ?").get(slug) as ServiceOverrideRow | undefined;
}

export function getAllServiceOverrides(): ServiceOverrideRow[] {
  const db = getDb();
  return db.prepare("SELECT * FROM service_overrides").all() as ServiceOverrideRow[];
}

export function upsertServiceOverride(slug: string, price?: number, images?: string[], data?: ServiceDataOverride): void {
  const db = getDb();
  const existing = getServiceOverride(slug);
  if (existing) {
    db.prepare(
      "UPDATE service_overrides SET price = ?, images_json = ?, data_json = ?, updated_at = datetime('now') WHERE slug = ?"
    ).run(
      price ?? existing.price,
      images ? JSON.stringify(images) : existing.images_json,
      data ? JSON.stringify(data) : existing.data_json,
      slug
    );
  } else {
    db.prepare(
      "INSERT INTO service_overrides (slug, price, images_json, data_json) VALUES (?, ?, ?, ?)"
    ).run(slug, price ?? null, images ? JSON.stringify(images) : null, data ? JSON.stringify(data) : null);
  }
}

export function getServiceData(slug: string): ServiceDataOverride | null {
  const override = getServiceOverride(slug);
  if (!override?.data_json) return null;
  try {
    return JSON.parse(override.data_json) as ServiceDataOverride;
  } catch {
    return null;
  }
}

// ── Session helpers ──

export function createSession(userId: number): string {
  const db = getDb();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  db.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").run(token, userId, expiresAt);
  return token;
}

export function verifySession(token: string): { userId: number } | null {
  const db = getDb();
  // Clean expired sessions
  db.prepare("DELETE FROM sessions WHERE expires_at < datetime('now')").run();
  const session = db.prepare("SELECT user_id FROM sessions WHERE token = ? AND expires_at > datetime('now')").get(token) as { user_id: number } | undefined;
  return session ? { userId: session.user_id } : null;
}

export function deleteSession(token: string): void {
  const db = getDb();
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

// ── Admin user helpers ──

export interface AdminUserRow {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export function getAdminByUsername(username: string): AdminUserRow | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM admin_users WHERE username = ?").get(username) as AdminUserRow | undefined;
}

export function createAdminUser(username: string, passwordHash: string): void {
  const db = getDb();
  db.prepare(
    "INSERT OR REPLACE INTO admin_users (username, password_hash) VALUES (?, ?)"
  ).run(username, passwordHash);
}
