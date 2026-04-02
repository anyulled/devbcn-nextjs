export function getUniqueEditions(editions: Array<string | null | undefined>): string[] {
  return Array.from(new Set(editions.filter((edition): edition is string => typeof edition === "string" && edition.length > 0))).sort((left, right) =>
    right.localeCompare(left, undefined, { numeric: true })
  );
}

export function getSelectedEdition(editions: string[], requestedEdition?: string): string | undefined {
  if (requestedEdition) {
    return requestedEdition;
  }

  return editions[0];
}

export interface AdminSponsorRecord {
  id: string;
  name: string;
  edition: string;
  category_id: number | null;
  status: "draft" | "published" | "needs_review" | null;
  internal_owner_user_id: string | null;
  website: string | null;
  logo_url: string | null;
  description: string | null;
  twitter: string | null;
  linkedin: string | null;
  bluesky: string | null;
  instagram: string | null;
  contacts: Array<{
    email: string | null;
    name: string | null;
  }> | null;
}

export function createEmptyAdminSponsor(edition?: string): AdminSponsorRecord {
  return {
    id: "",
    name: "",
    edition: edition ?? "",
    category_id: null,
    status: "published",
    internal_owner_user_id: null,
    website: null,
    logo_url: null,
    description: null,
    twitter: null,
    linkedin: null,
    bluesky: null,
    instagram: null,
    contacts: [],
  };
}
