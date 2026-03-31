import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

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
          *,
          category:sponsor_categories(name)
        `
        )
        .eq("edition", selectedEdition)
        .order("name")
    : supabase
        .from("sponsors")
        .select(
          `
          *,
          category:sponsor_categories(name)
        `
        )
        .order("name");

  const { data: sponsors, error } = await query;

  return (
    <div className="admin-sponsors-page">
      <div className="admin-content-header">
        <h2>Sponsors Management</h2>
        <Link href="/admin/sponsors/new" className="action-button primary">
          <i className="fas fa-plus"></i> Add Sponsor
        </Link>
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
                <th>Website</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sponsors?.map((sponsor) => (
                <tr key={sponsor.id}>
                  <td className="edition-cell">{sponsor.edition}</td>
                  <td className="sponsor-cell">
                    <div className="sponsor-info">
                      {sponsor.logo_url && <img src={sponsor.logo_url} alt={sponsor.name} className="sponsor-logo-sm" />}
                      <strong>{sponsor.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge category">{sponsor.category?.name || "Uncategorized"}</span>
                  </td>
                  <td>
                    {sponsor.website_url && (
                      <a href={sponsor.website_url} target="_blank" rel="noreferrer" className="website-link">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </td>
                  <td>{sponsor.contact_person || <span className="text-muted">No contact</span>}</td>
                  <td className="actions-cell">
                    <div className="action-group">
                      <Link href={`/admin/sponsors/${sponsor.id}`} className="icon-button edit" title="Edit">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button className="icon-button delete" title="Delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sponsors?.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-table-cell">
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
