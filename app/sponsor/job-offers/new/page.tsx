import React from "react";
import { createClient } from "@/lib/supabase/server";
import JobOfferForm from "@/components/sponsor/JobOfferForm";
import { redirect } from "next/navigation";

export default async function NewJobOfferPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get the sponsor linked to this user
  const { data: sponsorUsers } = await supabase
    .from("sponsor_users")
    .select("sponsor:sponsors(id, name, edition, category_id)")
    .eq("user_id", user.id)
    .single();

  const sponsorData = sponsorUsers?.sponsor;
  const sponsor = (Array.isArray(sponsorData) ? sponsorData[0] : sponsorData) as { id: string; name: string; edition: string; category_id: string };

  if (!sponsor) {
    redirect("/sponsor");
  }

  // Double-check limits server-side
  const { count: jobOfferCount } = await supabase.from("job_offers").select("*", { count: "exact", head: true }).eq("sponsor_id", sponsor.id);

  const { data: category } = await supabase.from("sponsor_categories").select("max_job_offers").eq("id", sponsor.category_id).single();

  const maxOffers = category?.max_job_offers || 0;

  if (jobOfferCount !== null && jobOfferCount >= maxOffers) {
    redirect("/sponsor/job-offers?error=limit_reached");
  }

  return (
    <div className="sponsor-new-job-page">
      <div className="admin-content-header">
        <div>
          <h2>Post New Job Offer</h2>
          <p className="subtitle">
            Creating listing for {sponsor.name} ({sponsor.edition})
          </p>
        </div>
      </div>

      <div className="admin-card">
        <JobOfferForm sponsorId={sponsor.id} />
      </div>
    </div>
  );
}
