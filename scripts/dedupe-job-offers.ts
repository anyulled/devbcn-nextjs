import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
  throw new Error("Missing Supabase env vars");
}

type JobOfferRow = {
  id: string;
  sponsor_id: string;
  title: string;
  location: string | null;
  url: string | null;
  text: string | null;
  created_at?: string | null;
};

type SponsorRow = { id: string; name: string; edition: string };

const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, { auth: { persistSession: false } });

function norm(v: string | null | undefined): string {
  return (v || "").trim().toLowerCase();
}

function dedupeKey(offer: JobOfferRow, sponsor: SponsorRow | undefined): string {
  const edition = sponsor?.edition || "";
  const sponsorName = sponsor?.name || offer.sponsor_id;
  return [edition, norm(sponsorName), norm(offer.title), norm(offer.location), norm(offer.url), norm(offer.text)].join("|");
}

async function main() {
  const { data: sponsors, error: sErr } = await supabase.from("sponsors").select("id,name,edition");
  if (sErr) throw sErr;
  const sponsorMap = new Map((sponsors || []).map((s) => [s.id, s as SponsorRow]));

  const { data: offers, error: oErr } = await supabase.from("job_offers").select("id,sponsor_id,title,location,url,text,created_at");
  if (oErr) throw oErr;

  const groups = new Map<string, JobOfferRow[]>();
  for (const offer of (offers || []) as JobOfferRow[]) {
    const key = dedupeKey(offer, sponsorMap.get(offer.sponsor_id));
    const arr = groups.get(key) || [];
    arr.push(offer);
    groups.set(key, arr);
  }

  const duplicateGroups = [...groups.entries()].filter(([, arr]) => arr.length > 1);
  const duplicateIdsToDelete: string[] = [];

  for (const [, arr] of duplicateGroups) {
    const sorted = [...arr].sort((a, b) => (a.created_at || "").localeCompare(b.created_at || "") || a.id.localeCompare(b.id));
    duplicateIdsToDelete.push(...sorted.slice(1).map((x) => x.id));
  }

  console.log(`Total offers: ${(offers || []).length}`);
  console.log(`Duplicate groups: ${duplicateGroups.length}`);
  console.log(`Duplicate rows to delete: ${duplicateIdsToDelete.length}`);

  if (process.argv.includes("--apply") && duplicateIdsToDelete.length > 0) {
    const { error: dErr } = await supabase.from("job_offers").delete().in("id", duplicateIdsToDelete);
    if (dErr) throw dErr;
    console.log(`Deleted ${duplicateIdsToDelete.length} duplicate rows.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
