import type { SupabaseClient, User } from "@supabase/supabase-js";

export type PortalRole = "global_admin" | "contact" | null;

export interface PortalAccess {
  user: User | null;
  role: PortalRole;
  isGlobalAdmin: boolean;
  isSponsorContact: boolean;
  sponsorIds: string[];
}

function normalizeRole(role: string | null | undefined): PortalRole {
  if (role === "global_admin" || role === "contact") {
    return role;
  }

  return null;
}

export async function getPortalAccess(supabase: SupabaseClient): Promise<PortalAccess> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      role: null,
      isGlobalAdmin: false,
      isSponsorContact: false,
      sponsorIds: [],
    };
  }

  const [{ data: roleRow }, { data: sponsorRows }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("sponsor_users").select("sponsor_id").eq("user_id", user.id),
  ]);

  const role = normalizeRole(roleRow?.role);
  const sponsorIds: string[] = [];
  for (const row of sponsorRows ?? []) {
    if (typeof row.sponsor_id === "string") {
      sponsorIds.push(row.sponsor_id);
    }
  }

  return {
    user,
    role,
    isGlobalAdmin: role === "global_admin",
    isSponsorContact: sponsorIds.length > 0,
    sponsorIds,
  };
}

export function resolvePostLoginDestination(access: PortalAccess): "/admin" | "/sponsor" | "/sponsor/login?error=unauthorized" {
  if (access.isGlobalAdmin) {
    return "/admin";
  }

  if (access.isSponsorContact) {
    return "/sponsor";
  }

  return "/sponsor/login?error=unauthorized";
}

export function getAdminRedirectPath(access: PortalAccess): "/admin/login" | "/sponsor" | "/admin/login?error=unauthorized" | null {
  if (!access.user) {
    return "/admin/login";
  }

  if (access.isGlobalAdmin) {
    return null;
  }

  if (access.isSponsorContact) {
    return "/sponsor";
  }

  return "/admin/login?error=unauthorized";
}

export function getSponsorRedirectPath(access: PortalAccess): "/sponsor/login" | "/admin" | "/sponsor/login?error=unauthorized" | null {
  if (!access.user) {
    return "/sponsor/login";
  }

  if (access.isSponsorContact) {
    return null;
  }

  if (access.isGlobalAdmin) {
    return "/admin";
  }

  return "/sponsor/login?error=unauthorized";
}
