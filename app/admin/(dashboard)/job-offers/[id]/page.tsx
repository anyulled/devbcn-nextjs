import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { JobOfferEditForm } from "./JobOfferEditForm";

interface JobOfferEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobOfferEditPage({ params }: JobOfferEditPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch the job offer with its sponsor
  const { data: jobOffer, error } = await supabase
    .from("job_offers")
    .select(
      `
      *,
      sponsor:sponsors(id, name, edition, website, logo_url, description, linkedin, twitter)
    `
    )
    .eq("id", id)
    .single();

  if (error || !jobOffer) {
    notFound();
  }

  return (
    <div className="admin-job-offer-edit-page">
      <div className="admin-content-header">
        <div>
          <h2>Edit Job Offer</h2>
          <p className="subtitle">
            Editing &quot;{jobOffer.title}&quot; from {jobOffer.sponsor?.name}
          </p>
        </div>
      </div>

      <JobOfferEditForm jobOffer={jobOffer} currentSponsor={jobOffer.sponsor} />
    </div>
  );
}
