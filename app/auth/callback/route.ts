import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { resolvePostLoginDestination, getPortalAccess } from "@/lib/auth/portal-access";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = requestUrl.searchParams.get("next");

  console.log("[Auth Callback] Received callback, code:", code ? "present" : "missing", "next:", nextPath);

  const supabase = await createRouteHandlerClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[Auth Callback] Code exchange error:", error);
      return NextResponse.redirect(new URL("/sponsor/login?error=unauthorized", requestUrl.origin), {
        status: 303,
      });
    }
    console.log("[Auth Callback] Session exchanged successfully");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("[Auth Callback] User:", user?.id, "Email:", user?.email);

  if (user?.email) {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("sponsor_users")
      .update({
        user_id: user.id,
      })
      .eq("email", user.email.toLowerCase())
      .select();

    console.log("[Auth Callback] Updated sponsor_users:", data, "Error:", error);
  }

  const access = await getPortalAccess(supabase);
  console.log("[Auth Callback] Access:", { isSponsorContact: access.isSponsorContact, sponsorIds: access.sponsorIds });

  const destination = nextPath?.startsWith("/") ? nextPath : resolvePostLoginDestination(access);

  return NextResponse.redirect(new URL(destination, requestUrl.origin), {
    status: 303,
  });
}
