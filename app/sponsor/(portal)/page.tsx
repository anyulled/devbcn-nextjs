import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

function SponsorStats({
  jobOfferCount,
  maxOffers,
  remainingOffers,
}: Readonly<{
  jobOfferCount: number;
  maxOffers: number;
  remainingOffers: number;
}>) {
  return (
    <div className="stats-grid">
      <div className="stat-card cyan">
        <div className="stat-icon">
          <i className="fas fa-briefcase"></i>
        </div>
        <div className="stat-info">
          <h3>Job Offers Posted</h3>
          <span className="stat-number">{jobOfferCount || 0}</span>
        </div>
      </div>

      <div className="stat-card green">
        <div className="stat-icon">
          <i className="fas fa-plus-circle"></i>
        </div>
        <div className="stat-info">
          <h3>Offers Remaining</h3>
          <span className="stat-number">{remainingOffers}</span>
        </div>
      </div>

      <div className="stat-card purple">
        <div className="stat-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="stat-info">
          <h3>Max Allowed</h3>
          <span className="stat-number">{maxOffers}</span>
        </div>
      </div>
    </div>
  );
}

export default async function SponsorPortalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sponsor/login");
  }

  // Get the sponsor(s) associated with this user
  const { data: sponsorUsers } = await supabase
    .from("sponsor_users")
    .select(
      `
      sponsor:sponsors (
        id,
        name,
        edition,
        category:sponsor_categories (
          name,
          max_job_offers
        )
      )
    `
    )
    .eq("user_id", user.id);

  const sponsorData = (sponsorUsers as unknown as Array<{ sponsor: unknown }>)?.[0]?.sponsor;
  const sponsor = (Array.isArray(sponsorData) ? sponsorData[0] : sponsorData) as { id: string; name: string; edition: string; category: unknown };

  if (!sponsor) {
    redirect("/admin");
  }

  // Fetch job offers for this sponsor
  const { count: jobOfferCount } = await supabase.from("job_offers").select("*", { count: "exact", head: true }).eq("sponsor_id", sponsor.id);

  const categoryData = sponsor.category;
  const category = Array.isArray(categoryData) ? categoryData[0] : categoryData;
  const maxOffers = category?.max_job_offers || 0;
  const remainingOffers = Math.max(0, maxOffers - (jobOfferCount || 0));

  return (
    <div className="sponsor-dashboard">
      <div className="admin-content-header">
        <div>
          <h2>Welcome, {sponsor.name}</h2>
          <p className="subtitle">Managing {sponsor.edition} Edition</p>
        </div>
        <div className="sponsor-badge category">{category?.name} Tier</div>
      </div>

      <SponsorStats jobOfferCount={jobOfferCount || 0} maxOffers={maxOffers} remainingOffers={remainingOffers} />

      <section className="sponsor-actions">
        <h3>Quick Actions</h3>
        <div className="quick-links-grid">
          <Link href="/sponsor/job-offers/new" className="quick-link">
            <i className="fas fa-file-export"></i>
            <span>Post New Job Offer</span>
          </Link>
          <Link href="/sponsor/profile" className="quick-link">
            <i className="fas fa-id-card"></i>
            <span>Edit Company Profile</span>
          </Link>
          <Link href="/sponsor/job-offers" className="quick-link">
            <i className="fas fa-list"></i>
            <span>Manage Existing Offers</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
