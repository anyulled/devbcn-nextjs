import React from "react";

import AdminSponsorForm from "@/components/admin/AdminSponsorForm";
import { createEmptyAdminSponsor, getSelectedEdition, getUniqueEditions } from "@/lib/admin/sponsors";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSponsorCreatePage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ edition?: string }>;
}>) {
  const params = await searchParams;
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const [{ data: editionsData }, { data: categories }, { data: roleRows }, { data: authUsersPage, error: authUsersError }] = await Promise.all([
    supabase.from("sponsors").select("edition").order("edition", { ascending: false }),
    supabase.from("sponsor_categories").select("id, name").order("name"),
    supabase.from("user_roles").select("user_id").eq("role", "global_admin"),
    adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    }),
  ]);

  if (authUsersError) {
    throw new Error(authUsersError.message);
  }

  const uniqueEditions = getUniqueEditions((editionsData || []).map((editionRow) => editionRow.edition));
  const selectedEdition = getSelectedEdition(uniqueEditions, params.edition);
  const adminUserIds = new Set((roleRows ?? []).flatMap((row) => (typeof row.user_id === "string" ? [row.user_id] : [])));

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
          <h2>New Sponsor</h2>
          <p className="subtitle">Create a sponsor record, set its governance fields, and assign initial portal contacts.</p>
        </div>
      </div>

      <div className="admin-card">
        <AdminSponsorForm sponsor={createEmptyAdminSponsor(selectedEdition)} categories={categories ?? []} ownerOptions={ownerOptions} submitMode="create" />
      </div>
    </div>
  );
}
