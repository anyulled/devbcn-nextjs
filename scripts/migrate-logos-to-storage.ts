/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable security/detect-non-literal-fs-filename */
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";

dotenv.config({ path: ".env" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or STORAGE_SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

const BUCKET_NAME = "sponsor_logos";

/**
 * Gets the content type based on file extension
 */
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

/**
 * Processes a single sponsor logo migration
 */
async function migrateSponsorLogo(sponsor: { id: string; name: string; logo_url: string; edition: string }) {
  const { id, name, logo_url, edition } = sponsor;

  if (!logo_url) {
    console.log(`Skipping ${name} (${edition}): No logo URL.`);
    return;
  }

  // Skip if already a Supabase storage URL
  if (logo_url.includes(".supabase.co/storage/v1/object/public/")) {
    console.log(`Skipping ${name} (${edition}): Already migrated.`);
    return;
  }

  // 2. Identify local file path
  const cleanPath = logo_url.startsWith("/") ? logo_url.substring(1) : logo_url;
  const localFilePath = path.join(process.cwd(), "public", cleanPath);

  if (!fs.existsSync(localFilePath)) {
    console.warn(`Warning: File not found for ${name} (${edition}) at ${localFilePath}`);
    return;
  }

  // 3. Upload to Supabase Storage
  const fileExtension = path.extname(localFilePath);
  const fileName = `${id}/${path.basename(localFilePath, fileExtension)}-${Date.now()}${fileExtension}`;
  const fileBuffer = fs.readFileSync(localFilePath);
  const contentType = getContentType(fileExtension);

  console.log(`Uploading logo for ${name} (${edition})...`);

  const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(fileName, fileBuffer, {
    contentType,
    upsert: true,
  });

  if (uploadError) {
    console.error(`Error uploading logo for ${name}:`, uploadError);
    return;
  }

  // 4. Get public URL and update database
  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  const publicUrl = urlData.publicUrl;

  const { error: updateError } = await supabase.from("sponsors").update({ logo_url: publicUrl }).eq("id", id);

  if (updateError) {
    console.error(`Error updating sponsor ${name} in database:`, updateError);
  } else {
    console.log(`Successfully migrated logo for ${name}. New URL: ${publicUrl}`);
  }
}

async function main() {
  console.log("Starting logo migration to Supabase Storage...");

  const { data: sponsors, error: fetchError } = await supabase.from("sponsors").select("id, name, logo_url, edition");

  if (fetchError) {
    console.error("Error fetching sponsors:", fetchError);
    return;
  }

  console.log(`Found ${sponsors?.length || 0} sponsors to check.`);

  for (const sponsor of sponsors || []) {
    await migrateSponsorLogo(sponsor);
  }

  console.log("\nLogo migration completed.");
}

main().catch(console.error);
