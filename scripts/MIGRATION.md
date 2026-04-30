# Migration Scripts Documentation

This document describes the purpose, order, and execution instructions for the migration scripts located in the `scripts/` directory. These scripts are used to transition data from static configuration files to the Supabase database.

## Prerequisites

Before running any migration script, ensure you have the following environment variables configured in your `.env` file:

```env
NEXT_PUBLIC_STORAGE_SUPABASE_URL=your_supabase_url
STORAGE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> [!IMPORTANT]
> The `SERVICE_ROLE_KEY` is required because these scripts bypass Row Level Security (RLS) to perform administrative data migrations.

## Recommended Execution Order

To ensure data integrity and avoid foreign key violations, follow this exact order:

1.  **`migrate-sponsors.ts`**: Populates the core structural data (categories, sponsors, and job offers).
2.  **`migrate-logos-to-storage.ts`**: Moves local image files to Supabase Storage and updates database links.
3.  **`fix-caixabank-duplicate.ts`**: (Optional/Maintenance) Performs specific data cleanup for the 2026 edition.

---

## Detailed Script Reference

### 1. Main Data Migration

**File:** `scripts/migrate-sponsors.ts`  
**Purpose:** Reads the static configuration from `config/editions/` and `config/job-offers/` and inserts them into the Supabase `sponsor_categories`, `sponsors`, and `job_offers` tables.  
**How to run:**

```bash
npm run migrate
```

_Alternatively:_ `npx tsx scripts/migrate-sponsors.ts`

### 2. Logo Storage Migration

**File:** `scripts/migrate-logos-to-storage.ts`  
**Purpose:** Iterates through all sponsors in the database, finds their local logo files (under `public/`), uploads them to the `sponsor_logos` bucket in Supabase Storage, and updates the `logo_url` field to the new public storage URL.  
**How to run:**

```bash
npm run migrate:logos
```

_Alternatively:_ `npx tsx scripts/migrate-logos-to-storage.ts`

### 3. Data Cleanup (Caixabank)

**File:** `scripts/fix-caixabank-duplicate.ts`  
**Purpose:** Fixes a specific duplication issue where "Caixabank Tech" and "CAIXABANK TECH S.L." were both present. It merges job offers to the preferred record and deletes the duplicate.  
**How to run:**

```bash
npx tsx scripts/fix-caixabank-duplicate.ts
```

---

## Troubleshooting

### "Missing SUPABASE_URL..."

Ensure your `.env` file is in the root directory and contains the correct keys. Note that some scripts expect `STORAGE_SUPABASE_SERVICE_ROLE_KEY` while others might look for `SUPABASE_SERVICE_ROLE_KEY` (check the script source if you encounter issues).

### File Not Found Warnings

If `migrate-logos-to-storage.ts` warns about missing files, verify that the `logo_url` in the static config correctly points to an existing file in the `public/` directory.

### Duplicate Entries

The `migrate-sponsors.ts` script uses `upsert` with a conflict target of `(edition, name)`, so it is safe to run multiple times without creating duplicate sponsors.
