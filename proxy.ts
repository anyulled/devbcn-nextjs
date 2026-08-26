import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

async function updateSupabaseSession(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL!, process.env.NEXT_PUBLIC_STORAGE_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/sponsor/:path*", "/auth/:path*"],
};
