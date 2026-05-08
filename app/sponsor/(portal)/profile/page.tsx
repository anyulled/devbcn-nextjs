import React from "react";
import { createClient } from "@/lib/supabase/server";
import SponsorProfileForm from "@/components/sponsor/SponsorProfileForm";
import { redirect } from "next/navigation";

export default async function SponsorProfilePage() {
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
    .select(
      `
      sponsor:sponsors (
        *
      )
    `
    )
    .eq("user_id", user.id)
    .single();

  const sponsorData = sponsorUsers?.sponsor;
  const sponsor = Array.isArray(sponsorData) ? sponsorData[0] : sponsorData;

  if (!sponsor) {
    redirect("/sponsor");
  }

  return (
    <div className="sponsor-profile-page">
      <div className="admin-content-header">
        <div>
          <h2>Company Profile</h2>
          <p className="subtitle">
            Manage information for {sponsor.name} in the {sponsor.edition} edition
          </p>
        </div>
      </div>

      <div className="admin-card">
        <SponsorProfileForm initialData={sponsor} />
      </div>
    </div>
  );
}
