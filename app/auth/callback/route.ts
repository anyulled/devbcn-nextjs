import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { resolvePostLoginDestination, getPortalAccess } from "@/lib/auth/portal-access";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = requestUrl.searchParams.get("next");

  const supabase = await createRouteHandlerClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL("/sponsor/login?error=unauthorized", requestUrl.origin), {
        status: 303,
      });
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    const adminClient = createAdminClient();
    await adminClient
      .from("sponsor_users")
      .update({
        user_id: user.id,
      })
      .eq("email", user.email.toLowerCase());
  }

  const access = await getPortalAccess(supabase);
  const isSafeRelativePath = typeof nextPath === "string" && nextPath.startsWith("/") && !nextPath.startsWith("//") && !nextPath.startsWith("/\\");
  const destination = isSafeRelativePath ? nextPath : resolvePostLoginDestination(access);

  return NextResponse.redirect(new URL(destination, requestUrl.origin), {
    status: 303,
  });
}
