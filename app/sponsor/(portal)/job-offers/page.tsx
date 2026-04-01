import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

interface JobOffer {
  id: string;
  title: string;
  location?: string;
  created_at: string;
}

function JobOffersTable({
  jobOffers,
  error,
}: Readonly<{
  jobOffers: JobOffer[] | null;
  error: { message: string } | null;
}>) {
  if (error) return <div className="error-alert">Error loading job offers: {error.message}</div>;

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobOffers?.map((offer) => (
            <tr key={offer.id}>
              <td>
                <strong>{offer.title}</strong>
              </td>
              <td>{offer.location || "Remote/TBD"}</td>
              <td>{new Date(offer.created_at).toLocaleDateString()}</td>
              <td className="actions-cell">
                <div className="action-group">
                  <Link href={`/sponsor/job-offers/${offer.id}`} className="icon-button edit" title="Edit">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button className="icon-button delete" title="Delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {jobOffers?.length === 0 && (
            <tr>
              <td colSpan={4} className="empty-table-cell">
                You haven't posted any job offers yet. Click "Post New Job" to start.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default async function SponsorJobOffersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sponsor/login");
  }

  // Get the sponsor linked to this user
  const { data: sponsorUsers } = await supabase
    .from("sponsor_users")
    .select("sponsor:sponsors(id, name, edition, category_id)")
    .eq("user_id", user.id)
    .single();

  const sponsorData = (sponsorUsers as unknown as { sponsor: unknown })?.sponsor;
  const sponsor = (Array.isArray(sponsorData) ? sponsorData[0] : sponsorData) as { id: string; edition: string; category_id: string };

  if (!sponsor) {
    redirect("/admin");
  }

  // Fetch job offers for this sponsor
  const { data: jobOffers, error } = await supabase.from("job_offers").select("*").eq("sponsor_id", sponsor.id).order("created_at", { ascending: false });

  // Fetch category limits
  const { data: category } = await supabase.from("sponsor_categories").select("max_job_offers").eq("id", sponsor.category_id).single();

  const maxOffers = category?.max_job_offers || 0;
  const currentCount = jobOffers?.length || 0;
  const canAddMore = currentCount < maxOffers;
  const usagePercentage = maxOffers > 0 ? Math.min(100, (currentCount / maxOffers) * 100) : 0;

  return (
    <div className="sponsor-job-offers-page">
      <div className="admin-content-header">
        <div>
          <h2>My Job Offers</h2>
          <p className="subtitle">Manage job listings for the {sponsor.edition} edition</p>
        </div>
        {canAddMore ? (
          <Link href="/sponsor/job-offers/new" className="action-button primary">
            <i className="fas fa-plus"></i> Post New Job
          </Link>
        ) : (
          <div className="badge warning">
            <i className="fas fa-exclamation-triangle"></i> Max limit reached ({maxOffers})
          </div>
        )}
      </div>

      <div className="limit-summary-bar">
        <div className="usage-indicator">
          <span>
            Usage: <strong>{currentCount}</strong> / {maxOffers} offers
          </span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${usagePercentage}%` }}></div>
          </div>
        </div>
      </div>

      <JobOffersTable jobOffers={jobOffers} error={error} />
    </div>
  );
}
