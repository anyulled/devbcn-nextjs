import React from "react";
import { createClient } from "@/lib/supabase/server";
import { JobOffersClient } from "./JobOffersClient";
import { editions } from "@/config/editions";

export default async function AdminJobOffersPage() {
  const supabase = await createClient();

  const { data: jobOffers, error } = await supabase
    .from("job_offers")
    .select(
      `
      *,
      sponsor:sponsors(name, logo_url)
    `
    )
    .order("created_at", { ascending: false });

  const availableYears = Object.keys(editions).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="admin-job-offers-page">
      <div className="admin-content-header">
        <h2>Job Offers Management</h2>
      </div>

      {error ? (
        <div className="error-alert">Error loading job offers: {error.message}</div>
      ) : (
        <JobOffersClient jobOffers={jobOffers || []} availableYears={availableYears} />
      )}
    </div>
  );
}
