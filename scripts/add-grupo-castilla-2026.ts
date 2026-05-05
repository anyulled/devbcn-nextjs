import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "sponsor_logos";
const EDITION = "2026";
const SPONSOR_NAME = "Grupo Castilla";
const SPONSOR_WEBSITE = "https://www.grupocastilla.es/servicios-rrhh/consultoria-tecnologica/";
const LOGO_SOURCE_PATH = "public/assets/img/all-images/sponsors/grupo-castilla.png";
const LOGO_STORAGE_PATH = `${EDITION}/grupo-castilla.png`;

async function main() {
  if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_STORAGE_SUPABASE_URL or STORAGE_SUPABASE_SERVICE_ROLE_KEY in .env");
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, { auth: { persistSession: false } });

  const { data: category, error: categoryError } = await supabase.from("sponsor_categories").select("id").eq("name", "Basic").single();
  if (categoryError || !category) {
    throw new Error(`Basic category not found: ${categoryError?.message ?? "unknown error"}`);
  }

  const logoBytes = await readFile(LOGO_SOURCE_PATH);
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(LOGO_STORAGE_PATH, logoBytes, {
    contentType: "image/png",
    upsert: true,
  });

  if (uploadError) {
    throw new Error(`Logo upload failed: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(LOGO_STORAGE_PATH);

  const { error: sponsorError } = await supabase.from("sponsors").upsert(
    {
      edition: EDITION,
      name: SPONSOR_NAME,
      website: SPONSOR_WEBSITE,
      logo_url: publicUrlData.publicUrl,
      category_id: category.id,
      status: "published",
    },
    { onConflict: "edition,name" }
  );

  if (sponsorError) {
    throw new Error(`Sponsor upsert failed: ${sponsorError.message}`);
  }

  console.log(`Sponsor synced: ${SPONSOR_NAME} (${EDITION}) -> ${publicUrlData.publicUrl}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
