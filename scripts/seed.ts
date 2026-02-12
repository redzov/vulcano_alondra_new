import { createAdminUser, upsertServiceOverride } from "../src/lib/db";
import type { ServiceDataOverride } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth";
import { services } from "../src/lib/services";
import en from "../src/messages/en.json";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error("Missing ADMIN_USERNAME or ADMIN_PASSWORD environment variables.");
  console.error("Set them in .env.local or pass them inline:");
  console.error("  ADMIN_USERNAME=admin ADMIN_PASSWORD=secret npx tsx scripts/seed.ts");
  process.exit(1);
}

// Resolve a translation key like "services.teide-cable-car.title" from the messages object
function resolveKey(messages: Record<string, unknown>, key: string): string {
  const parts = key.split(".");
  let current: unknown = messages;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key; // fallback to key itself
    }
  }
  return typeof current === "string" ? current : key;
}

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  const hash = await hashPassword(ADMIN_PASSWORD);
  createAdminUser(ADMIN_USERNAME, hash);
  console.log(`Admin user created: ${ADMIN_USERNAME}`);

  // Seed service overrides with current prices and ALL text data from en.json
  const messages = en as Record<string, unknown>;

  for (const s of services) {
    const data: ServiceDataOverride = {
      title: resolveKey(messages, s.titleKey),
      shortDescription: resolveKey(messages, s.shortDescriptionKey),
      description: resolveKey(messages, s.descriptionKey),
      fullDescription: resolveKey(messages, s.fullDescriptionKey),
      duration: s.duration,
      difficulty: s.difficulty,
      rating: s.rating,
      reviewCount: s.reviewCount,
      languages: s.languages,
      highlights: s.highlightsKeys.map((k) => resolveKey(messages, k)),
      includes: s.includesKeys.map((k) => resolveKey(messages, k)),
      notIncluded: s.notIncludedKeys.map((k) => resolveKey(messages, k)),
      restrictions: s.restrictionsKeys.map((k) => resolveKey(messages, k)),
      importantInfo: s.importantInfoKeys.map((k) => resolveKey(messages, k)),
      prepare: s.prepareKeys.map((k) => resolveKey(messages, k)),
      meetingPoint: s.meetingPoint,
    };

    upsertServiceOverride(s.slug, s.price, s.images, data);
  }
  console.log(`Seeded ${services.length} services with full data`);

  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
