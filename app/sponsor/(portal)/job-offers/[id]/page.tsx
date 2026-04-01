import React from "react";
import { createClient } from "@/lib/supabase/server";
import JobOfferForm from "@/components/sponsor/JobOfferForm";
import { notFound, redirect } from "next/navigation";

export default async function EditJobOfferPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sponsor/login");
  }

  // Fetch the job offer and ensure ownership (via sponsor_users)
  const { data: jobOffer, error } = await supabase
    .from("job_offers")
    .select(
      `
      *,
      sponsor:sponsors (
        id,
        name,
        edition
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !jobOffer) {
    notFound();
  }

  // Check if the user is authorized for this sponsor
  const { data: authCheck } = await supabase.from("sponsor_users").select("id").eq("sponsor_id", jobOffer.sponsor_id).eq("user_id", user.id).single();

  if (!authCheck) {
    redirect("/sponsor/job-offers?error=Unauthorized");
  }

  return (
    <div className="sponsor-edit-job-page">
      <div className="admin-content-header">
        <div>
          <h2>Edit Job Offer</h2>
          <p className="subtitle">
            Editing "{jobOffer.title}" for {jobOffer.sponsor?.name}
          </p>
        </div>
      </div>

      <div className="admin-card">
        <JobOfferForm sponsorId={jobOffer.sponsor_id} initialData={jobOffer} />
      </div>
    </div>
  );
}
