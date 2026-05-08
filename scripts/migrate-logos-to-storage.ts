import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import { editions } from "../config/editions/index";
import { Sponsor } from "../config/editions/types";

dotenv.config({ path: ".env" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or STORAGE_SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, {
  auth: { persistSession: false },
});

const BUCKET_NAME = "sponsor_logos";
const FORCED = process.argv.includes("--force");
const ONLY_SPONSOR = getArgValue("--sponsor");
const ONLY_EDITION = getArgValue("--edition");

function getArgValue(flag: string): string | null {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getContentType(extension: string): string {
  switch (extension.toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

function buildObjectPath(sponsor: { edition: string; name: string }, fileExtension: string): string {
  return `${sponsor.edition}/${slugify(sponsor.name)}${fileExtension.toLowerCase()}`;
}

function isSupabaseLogo(url: string): boolean {
  return url.includes(".supabase.co/storage/v1/object/public/");
}

function filePathFromLogoUrl(logoUrl: string): string {
  const cleanPath = logoUrl.startsWith("/") ? logoUrl.slice(1) : logoUrl;
  return path.join(process.cwd(), "public", cleanPath);
}

function getConfigLogoPath(edition: string, sponsorName: string): string | null {
  const editionData = editions[edition as keyof typeof editions];
  if (!editionData) return null;

  const groups: Array<Sponsor[] | null> = [
    editionData.sponsorsData.top,
    editionData.sponsorsData.premium,
    editionData.sponsorsData.regular,
    editionData.sponsorsData.basic,
    editionData.sponsorsData.communities,
    editionData.sponsorsData.media_partners,
    editionData.sponsorsData.supporters,
  ];

  for (const group of groups) {
    for (const sponsor of group || []) {
      if (sponsor.name.toLowerCase() === sponsorName.toLowerCase() && sponsor.image) {
        return filePathFromLogoUrl(sponsor.image);
      }
    }
  }

  return null;
}

async function migrateSponsorLogo(sponsor: { id: string; name: string; logo_url: string | null; edition: string }) {
  const { id, name, logo_url: logoUrl, edition } = sponsor;

  if (!logoUrl) {
    console.log(`Skipping ${name} (${edition}): No logo URL.`);
    return;
  }

  if (!FORCED && isSupabaseLogo(logoUrl)) {
    console.log(`Skipping ${name} (${edition}): Already in Supabase Storage.`);
    return;
  }

  const localFilePath = !isSupabaseLogo(logoUrl) ? filePathFromLogoUrl(logoUrl) : getConfigLogoPath(edition, name);

  if (!localFilePath) {
    console.warn(`Skipping ${name} (${edition}): Could not resolve local logo path from edition config.`);
    return;
  }

  if (!fs.existsSync(localFilePath)) {
    console.warn(`Skipping ${name} (${edition}): Local file not found at ${localFilePath}`);
    return;
  }

  const fileExtension = path.extname(localFilePath);
  const contentType = getContentType(fileExtension);
  const objectPath = buildObjectPath({ edition, name }, fileExtension);
  const fileBuffer = fs.readFileSync(localFilePath);

  const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(objectPath, fileBuffer, {
    contentType,
    upsert: true,
  });

  if (uploadError) {
    console.error(`Upload failed for ${name} (${edition}):`, uploadError.message);
    return;
  }

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(objectPath);
  const publicUrl = urlData.publicUrl;

  if (logoUrl === publicUrl) {
    console.log(`No DB change needed for ${name} (${edition}): URL already up-to-date.`);
    return;
  }

  const { error: updateError } = await supabase.from("sponsors").update({ logo_url: publicUrl }).eq("id", id);

  if (updateError) {
    console.error(`DB update failed for ${name} (${edition}):`, updateError.message);
    return;
  }

  console.log(`Updated ${name} (${edition}) -> ${publicUrl}`);
}

async function main() {
  console.log("Starting sponsor logo sync...");

  const query =
    ONLY_SPONSOR && ONLY_EDITION
      ? supabase.from("sponsors").select("id, name, logo_url, edition").eq("name", ONLY_SPONSOR).eq("edition", ONLY_EDITION)
      : ONLY_SPONSOR
        ? supabase.from("sponsors").select("id, name, logo_url, edition").eq("name", ONLY_SPONSOR)
        : ONLY_EDITION
          ? supabase.from("sponsors").select("id, name, logo_url, edition").eq("edition", ONLY_EDITION)
          : supabase.from("sponsors").select("id, name, logo_url, edition");

  const { data: sponsors, error: fetchError } = await query;

  if (fetchError) {
    console.error("Error fetching sponsors:", fetchError.message);
    process.exit(1);
  }

  console.log(`Found ${sponsors?.length || 0} sponsor records.`);

  for (const sponsor of sponsors || []) {
    await migrateSponsorLogo(sponsor);
  }

  console.log("Logo sync completed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
