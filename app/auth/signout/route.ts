import { NextResponse } from "next/server";

import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createRouteHandlerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/", url.origin), {
    status: 303,
  });
}
