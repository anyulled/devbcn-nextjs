import React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

function getWebsiteLabel(website: string): string {
  try {
    const url = new URL(website);
    return `${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return website;
  }
}

function getCategoryName(category: unknown): string {
  if (Array.isArray(category)) {
    const firstCategory = category[0];
    if (firstCategory && typeof firstCategory === "object" && "name" in firstCategory && typeof firstCategory.name === "string") {
      return firstCategory.name;
    }
  }

  if (category && typeof category === "object" && "name" in category && typeof category.name === "string") {
    return category.name;
  }

  return "Uncategorized";
}

export default async function AdminSponsorsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ edition?: string }>;
}>) {
  const params = await searchParams;
  const selectedEdition = params.edition;
  const supabase = await createClient();

  // Fetch all available editions for the filter
  const { data: editionsData } = await supabase.from("sponsors").select("edition").order("edition", { ascending: false });

  // Deduplicate editions and ensure they are strings
  const uniqueEditions: string[] = Array.from(new Set((editionsData || []).map((e) => String(e.edition))));

  // Fetch sponsors based on filter
  const query = selectedEdition
    ? supabase
        .from("sponsors")
        .select(
          `
          id,
          edition,
          name,
          website,
          logo_url,
          status,
          category:sponsor_categories(name),
          contacts:sponsor_users(email)
        `
        )
        .eq("edition", selectedEdition)
        .order("name")
    : supabase
        .from("sponsors")
        .select(
          `
          id,
          edition,
          name,
          website,
          logo_url,
          status,
          category:sponsor_categories(name),
          contacts:sponsor_users(email)
        `
        )
        .order("name");

  const { data: sponsors, error } = await query;

  return (
    <div className="admin-sponsors-page">
      <div className="admin-content-header">
        <h2>Sponsors Management</h2>
      </div>

      <div className="filters-bar">
        <label htmlFor="edition-filter">Filter by Edition:</label>
        <div className="edition-pills">
          <Link href="/admin/sponsors" className={`edition-pill ${selectedEdition === undefined ? "active" : ""}`}>
            All
          </Link>
          {uniqueEditions.map((edition) => (
            <Link key={edition} href={`/admin/sponsors?edition=${edition}`} className={`edition-pill ${selectedEdition === edition ? "active" : ""}`}>
              {edition}
            </Link>
          ))}
        </div>
      </div>

      {error ? (
        <div className="error-alert">Error loading sponsors: {error.message}</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Edition</th>
                <th>Sponsor</th>
                <th>Category</th>
                <th>Status</th>
                <th>Website</th>
                <th>Contacts</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sponsors?.map((sponsor) => (
                <tr key={sponsor.id}>
                  <td className="edition-cell">{sponsor.edition}</td>
                  <td className="sponsor-cell">
                    <div className="sponsor-info">
                      {sponsor.logo_url && <Image src={sponsor.logo_url} alt={sponsor.name} className="sponsor-logo-sm" width={64} height={64} />}
                      <strong>{sponsor.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge category">{getCategoryName(sponsor.category)}</span>
                  </td>
                  <td>
                    <span className={`badge status ${sponsor.status || "published"}`}>{sponsor.status || "published"}</span>
                  </td>
                  <td>
                    {sponsor.website && (
                      <a href={sponsor.website} target="_blank" rel="noreferrer" className="website-link">
                        <i className="fas fa-external-link-alt"></i>
                        <span>{getWebsiteLabel(sponsor.website)}</span>
                      </a>
                    )}
                  </td>
                  <td>
                    {sponsor.contacts && sponsor.contacts.length > 0 ? (
                      <div className="contact-list">
                        {sponsor.contacts
                          .map((contact) => contact.email)
                          .filter((email): email is string => Boolean(email))
                          .map((email) => (
                            <span key={email}>{email}</span>
                          ))}
                      </div>
                    ) : (
                      <span className="text-muted">No contact</span>
                    )}
                  </td>
                  <td className="table-actions">
                    <Link href={`/admin/sponsors/${sponsor.id}`} className="action-button secondary">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {sponsors?.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-table-cell">
                    No sponsors found for this edition.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
