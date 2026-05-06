import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_STORAGE_SUPABASE_ANON_KEY!,
  };
}

export async function createClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch (error) {
          console.error("[Supabase Server Client] Failed to set auth cookies in createClient().", {
            cookieCount: cookiesToSet.length,
            error,
          });
        }
      },
    },
  });
}

export async function createRouteHandlerClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });
}
