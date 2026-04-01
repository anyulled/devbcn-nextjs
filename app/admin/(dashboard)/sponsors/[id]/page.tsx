import React from "react";
import { notFound } from "next/navigation";

import AdminSponsorForm from "@/components/admin/AdminSponsorForm";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

interface AdminSponsorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminSponsorDetailPage({ params }: Readonly<AdminSponsorPageProps>) {
  const { id } = await params;
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const [{ data: sponsor, error: sponsorError }, { data: categories }, { data: roleRows }, { data: authUsersPage, error: authUsersError }] = await Promise.all([
    supabase
      .from("sponsors")
      .select(
        `
        id,
        name,
        edition,
        category_id,
        status,
        internal_owner_user_id,
        website,
        logo_url,
        description,
        twitter,
        linkedin,
        bluesky,
        instagram,
        contacts:sponsor_users (
          email,
          name
        )
      `
      )
      .eq("id", id)
      .maybeSingle(),
    supabase.from("sponsor_categories").select("id, name").order("name"),
    supabase.from("user_roles").select("user_id").eq("role", "global_admin"),
    adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    }),
  ]);

  if (sponsorError || !sponsor) {
    notFound();
  }

  if (authUsersError) {
    throw new Error(authUsersError.message);
  }

  const adminUserIds = new Set((roleRows ?? []).map((row) => row.user_id).filter((userId): userId is string => typeof userId === "string"));

  const ownerOptions = authUsersPage.users
    .filter((user) => adminUserIds.has(user.id))
    .map((user) => ({
      userId: user.id,
      label: user.email ? `${user.email}${user.user_metadata?.full_name ? ` (${user.user_metadata.full_name as string})` : ""}` : user.id,
    }))
    .sort((left, right) => left.label.localeCompare(right.label));

  return (
    <div className="admin-sponsor-detail-page">
      <div className="admin-content-header compact">
        <div>
          <h2>Edit Sponsor</h2>
          <p className="subtitle">Keep the canonical sponsor profile polished, assign access, and control its public status.</p>
        </div>
      </div>

      <div className="admin-card">
        <AdminSponsorForm sponsor={sponsor} categories={categories ?? []} ownerOptions={ownerOptions} />
      </div>
    </div>
  );
}
