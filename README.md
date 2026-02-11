# Teide Explorer

Modern booking website for Teide National Park tours and activities (Tenerife, Spain).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion
- **i18n:** next-intl (6 locales: EN, ES, DE, FR, NL, PL)
- **Database:** SQLite via better-sqlite3
- **Auth:** bcryptjs + httpOnly session cookies

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=your_64_char_hex_secret
```

### 3. Seed the database

```bash
npx tsx scripts/seed.ts
```

This creates `data/teide.db` with the admin user and service data.

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    [locale]/              # Public pages (homepage, services, checkout, etc.)
    api/                   # API routes (bookings, admin, payment)
    ddddadminkasjsjsjs/    # Admin panel
  components/              # Reusable UI components
  lib/
    db.ts                  # SQLite database connection + helpers
    auth.ts                # Authentication utilities
    services.ts            # Service catalog (11 tours/activities)
  messages/                # i18n translation files (en, es, de, fr, nl, pl)
scripts/
  seed.ts                  # Database seeder
data/
  teide.db                 # SQLite database (auto-created by seed)
```

## Features

- 11 tour/activity services with full details
- Multi-language support (6 locales)
- Online booking system with form validation
- Manage existing bookings by reference + email
- Admin panel for managing services (prices, images, all text fields)
- SEO optimized (JSON-LD, sitemap, robots.txt, meta tags)
- Responsive design (mobile-first)
- Payment gateway interface prepared (provider TBD)

## Admin Panel

Access: `/ddddadminkasjsjsjs`

The admin panel allows editing all service fields:
- Title, descriptions (short + full)
- Price, duration, difficulty, rating
- Languages, images
- Highlights, includes, not included
- Restrictions, important info, what to bring
- Meeting point

## Deployment Notes

SQLite requires a writable filesystem. For serverless platforms (Vercel), switch to [Turso](https://turso.tech/) (`@libsql/client`) - only `src/lib/db.ts` connection setup needs to change. Works out of the box on VPS / self-hosted servers.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `SESSION_SECRET` | 64-char hex string for session signing |
