import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { editions } from "../config/editions/index";
import { getJobOffersByYear } from "../config/job-offers/job-offers/index";
import { Sponsor, Sponsors } from "../config/editions/types";

dotenv.config({ path: ".env" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY check .env");
  process.exit(1);
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

type CategoryLimitData = {
  name: string;
  max_job_offers: number;
};

const CATEGORIES: CategoryLimitData[] = [
  { name: "Top", max_job_offers: 5 },
  { name: "Premium", max_job_offers: 3 },
  { name: "Regular", max_job_offers: 1 },
  { name: "Basic", max_job_offers: 0 },
  { name: "Community", max_job_offers: 0 },
  { name: "Media Partner", max_job_offers: 0 },
  { name: "Supporter", max_job_offers: 0 },
];

async function getOrCreateCategory(name: string): Promise<number | null> {
  const { data: existing } = await supabase.from("sponsor_categories").select("id").eq("name", name).single();

  if (existing) return (existing as { id: number }).id;

  const defaultCat = CATEGORIES.find((c) => c.name.toLowerCase() === name.toLowerCase());

  const { data: inserted, error: insertErr } = await supabase
    .from("sponsor_categories")
    .insert({
      name,
      max_job_offers: defaultCat?.max_job_offers ?? 0,
    })
    .select("id")
    .single();

  if (insertErr) {
    console.error(`Error inserting category ${name}:`, insertErr);
    return null;
  }
  return (inserted as { id: number }).id;
}

async function migrateSponsorsForYear(year: string, sponsorsData: Sponsors) {
  const categoryMapping: Record<string, string> = {
    top: "Top",
    premium: "Premium",
    regular: "Regular",
    basic: "Basic",
    communities: "Community",
    media_partners: "Media Partner",
    supporters: "Supporter",
  };

  for (const [key, categoryName] of Object.entries(categoryMapping)) {
    const categorySponsors = (sponsorsData as unknown as Record<string, Sponsor[]>)[key] || [];
    if (categorySponsors.length === 0) continue;

    const categoryId = await getOrCreateCategory(categoryName);
    if (!categoryId) continue;

    for (const sponsor of categorySponsors) {
      const { error: sponsorErr } = await supabase.from("sponsors").upsert(
        {
          edition: year,
          name: sponsor.name,
          website: sponsor.website || null,
          logo_url: sponsor.image || null,
          category_id: categoryId,
          description: null,
        },
        { onConflict: "edition,name" }
      );

      if (sponsorErr) {
        console.error(`Failed to insert sponsor ${sponsor.name} (${year}):`, sponsorErr);
        continue;
      }

      console.log(`Migrated Sponsor: ${sponsor.name} (${categoryName})`);
    }
  }
}

async function getOrCreateSponsorForJob(year: string, company: { name: string; logo?: string; url?: string; description?: string }): Promise<string | null> {
  const { data: existingSponsor, error: sfErr } = await supabase.from("sponsors").select("id").eq("edition", year).eq("name", company.name).single();

  const existingId = (existingSponsor as { id: string } | null)?.id;

  if (sfErr || !existingId) {
    console.warn(`Could not find matching Sponsor record for Job Offer Company: ${company.name} in year ${year}. Creating a generic Sponsor placeholder...`);
    const catId = await getOrCreateCategory("Regular");
    if (!catId) return null;

    const { data: spc, error: insErr } = await supabase
      .from("sponsors")
      .insert({
        edition: year,
        name: company.name,
        logo_url: company.logo,
        website: company.url,
        category_id: catId,
        description: company.description,
      })
      .select("id")
      .single();

    if (insErr) {
      console.error(`Error creating placeholder sponsor: ${insErr.message}`);
      return null;
    }
    return (spc as { id: string }).id;
  }

  if (company.description) {
    await supabase.from("sponsors").update({ description: company.description }).eq("id", existingId);
  }

  return existingId;
}

async function migrateJobOffersForYear(year: string) {
  const jobOffersData = getJobOffersByYear(year);

  for (const company of jobOffersData) {
    const sponsorId = await getOrCreateSponsorForJob(year, company);
    if (!sponsorId) continue;

    for (const offer of company.offers) {
      const { error: offerErr } = await supabase.from("job_offers").insert({
        sponsor_id: sponsorId,
        title: offer.title,
        location: offer.location || null,
        url: offer.url || null,
        text: offer.text || null,
      });

      if (offerErr) {
        console.error(`Failed to insert job offer ${offer.title} for ${company.name}:`, offerErr);
      } else {
        console.log(`Migrated Job Offer: ${offer.title} (${company.name})`);
      }
    }
  }
}

async function main() {
  console.log("Migration script started...");

  const allYears = Object.keys(editions);

  for (const year of allYears) {
    console.log(`\nMigrating Sponsors for Edition ${year}...`);
    const editionData = editions[year as keyof typeof editions];
    await migrateSponsorsForYear(year, editionData.sponsorsData);

    console.log(`\nMigrating Job Offers for Edition ${year}...`);
    await migrateJobOffersForYear(year);
  }

  console.log("\nMigration completed successfully.");
}

main().catch(console.error);
