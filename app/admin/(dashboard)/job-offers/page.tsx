import React from "react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminJobOffersPage() {
  const supabase = await createClient();

  // Fetch all job offers with their sponsors
  const { data: jobOffers, error } = await supabase
    .from("job_offers")
    .select(
      `
      *,
      sponsor:sponsors(name, edition)
    `
    )
    .order("created_at", { ascending: false });

  return (
    <div className="admin-job-offers-page">
      <div className="admin-content-header">
        <h2>Global Job Offers View</h2>
        <p className="subtitle">All active job offers across all editions and sponsors</p>
      </div>

      {error ? (
        <div className="error-alert">Error loading job offers: {error.message}</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Edition</th>
                <th>Sponsor</th>
                <th>Title</th>
                <th>Location</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {jobOffers?.map((offer) => (
                <tr key={offer.id}>
                  <td className="edition-cell">
                    <strong>{offer.sponsor?.edition}</strong>
                  </td>
                  <td>{offer.sponsor?.name}</td>
                  <td>
                    <div className="job-title-cell">
                      <strong>{offer.title}</strong>
                      <span className="text-muted block text-xs">{offer.url ? "Has Link" : "No Link"}</span>
                    </div>
                  </td>
                  <td>{offer.location || "Remote/TBD"}</td>
                  <td className="date-cell">{new Date(offer.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {jobOffers?.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-table-cell">
                    No job offers found in the system.
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
