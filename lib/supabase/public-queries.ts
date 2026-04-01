import { createClient } from "@supabase/supabase-js";
import { Sponsors, Sponsor } from "@/config/editions/types";
import { Company, JobOffer } from "@/config/job-offers/job-offers/types";

const PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL!;
const PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_STORAGE_SUPABASE_ANON_KEY!;

function getPublicClient() {
  return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

interface SponsorRow {
  name: string;
  website: string | null;
  logo_url: string | null;
  status: "draft" | "published" | "needs_review" | null;
  category: { name: string } | null;
}

function mapCategory(categoryName: string): keyof Sponsors {
  const name = categoryName.toLowerCase().replace(" ", "_");
  if (name === "top") return "top";
  if (name === "premium") return "premium";
  if (name === "regular") return "regular";
  if (name === "community" || name === "communities") return "communities";
  if (name === "media_partner" || name === "media_partners") return "media_partners";
  if (name === "supporter" || name === "supporters") return "supporters";
  return "basic";
}

/**
 * Fetches all sponsors for a specific edition from Supabase and
 * formats them into the legacy Sponsors object structure expected by Section4.
 */
export async function getSponsorsForEdition(edition: string): Promise<Sponsors> {
  const supabase = getPublicClient();

  const { data, error } = await supabase
    .from("sponsors")
    .select(
      `
      name,
      website,
      logo_url,
      status,
      category:sponsor_categories(name)
    `
    )
    .eq("edition", edition)
    .in("status", ["published", "needs_review"]);

  const sponsorsData = data as unknown as SponsorRow[];

  if (error) {
    console.error("Error fetching sponsors for edition", edition, error);
    return {
      top: null,
      premium: null,
      regular: null,
      communities: null,
      basic: null,
      media_partners: null,
      supporters: null,
    };
  }

  const grouped: Sponsors = {
    top: [],
    premium: [],
    regular: [],
    communities: [],
    basic: [],
    media_partners: [],
    supporters: [],
  };

  sponsorsData?.forEach((row) => {
    const categoryKey = mapCategory(row.category?.name || "Basic");
    const sponsor: Sponsor = {
      name: row.name,
      website: row.website || "",
      image: row.logo_url || "",
    };

    const list = grouped[categoryKey];
    if (Array.isArray(list)) {
      list.push(sponsor);
    }
  });

  // Set empty arrays to null to match the previous structure exactly
  const categories = Object.keys(grouped) as Array<keyof Sponsors>;
  categories.forEach((key) => {
    const list = grouped[key];
    if (Array.isArray(list) && list.length === 0) {
      Object.defineProperty(grouped, key, {
        value: null,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  });

  return grouped;
}

/**
 * Fetches all companies (sponsors) that have job offers for a specific edition.
 */
export async function getJobOffersForEdition(edition: string): Promise<Company[]> {
  const supabase = getPublicClient();

  // Find all sponsors for the given edition
  const { data: sponsors, error: sponsorsError } = await supabase
    .from("sponsors")
    .select(
      `
      id,
      name,
      website,
      logo_url,
      description,
      status,
      twitter,
      linkedin,
      bluesky,
      instagram
    `
    )
    .eq("edition", edition)
    .in("status", ["published", "needs_review"])
    .order("name");

  if (sponsorsError || !sponsors) {
    console.error("Error fetching sponsors for job offers", sponsorsError);
    return [];
  }

  const sponsorIds = sponsors.map((s) => s.id);

  if (sponsorIds.length === 0) return [];

  // Find all job offers for those sponsors
  const { data: offers, error: offersError } = await supabase
    .from("job_offers")
    .select("*")
    .in("sponsor_id", sponsorIds)
    .order("created_at", { ascending: false });

  if (offersError) {
    console.error("Error fetching job offers", offersError);
    return [];
  }

  const companies: Company[] = [];

  sponsors.forEach((sponsor) => {
    const sponsorOffers = offers?.filter((o) => o.sponsor_id === sponsor.id) || [];

    if (sponsorOffers.length > 0) {
      const mappedOffers: JobOffer[] = sponsorOffers.map((o) => ({
        id: String(o.id),
        title: String(o.title),
        url: String(o.url ?? ""),
        text: String(o.text ?? ""),
        location: String(o.location ?? ""),
      }));

      companies.push({
        id: sponsor.name.toLowerCase().replaceAll(/\s+/g, "-"),
        name: sponsor.name,
        description: sponsor.description ?? "",
        logo: sponsor.logo_url ?? "",
        url: sponsor.website ?? "",
        linkedin: sponsor.linkedin ?? "",
        twitter: sponsor.twitter ?? "",
        offers: mappedOffers,
      });
    }
  });

  return companies;
}
