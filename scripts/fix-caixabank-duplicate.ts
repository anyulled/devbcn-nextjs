import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

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

async function findCaixabankSponsors() {
  const { data, error } = await supabase.from("sponsors").select("id, name, edition").eq("edition", "2026").ilike("name", "%caixa%");

  if (error) {
    console.error("Error fetching sponsors:", error);
    return null;
  }
  return data;
}

async function moveJobOffersToSponsor(fromId: string, toId: string) {
  const { error } = await supabase.from("job_offers").update({ sponsor_id: toId }).eq("sponsor_id", fromId);

  return error;
}

async function deleteSponsor(id: string) {
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  return error;
}

async function main() {
  console.log("Fixing Caixabank duplicate...");

  const sponsors = await findCaixabankSponsors();
  if (!sponsors || sponsors.length < 2) {
    console.log("No duplicates to fix.");
    return;
  }

  const original = sponsors.find((s) => s.name === "Caixabank Tech");
  const duplicate = sponsors.find((s) => s.name === "CAIXABANK TECH S.L.");

  if (!original || !duplicate) {
    console.log("Could not identify sponsors.");
    return;
  }

  console.log(`Moving job offers from ${duplicate.name} to ${original.name}...`);
  const moveError = await moveJobOffersToSponsor(duplicate.id, original.id);

  if (moveError) {
    console.error("Error moving job offers:", moveError);
    return;
  }

  console.log("Deleting duplicate sponsor...");
  const deleteError = await deleteSponsor(duplicate.id);

  if (deleteError) {
    console.error("Error deleting sponsor:", deleteError);
    return;
  }

  console.log("Done!");
}

main().catch(console.error);
