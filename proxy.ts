import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const SW_CLEANUP_QUERY_PARAM = "devbcn-sw-cleanup";

function buildLegacyRegisterSwScript(): string {
  return [
    "(function () {",
    "  async function cleanup() {",
    "    try {",
    "      var hadRegistrations = false;",
    "      var hadCaches = false;",
    "",
    '      if ("serviceWorker" in navigator) {',
    "        var registrations = await navigator.serviceWorker.getRegistrations();",
    "        hadRegistrations = registrations.length > 0;",
    "        await Promise.all(registrations.map(function (registration) {",
    "          return registration.unregister();",
    "        }));",
    "      }",
    "",
    '      if ("caches" in window) {',
    "        var cacheNames = await caches.keys();",
    "        hadCaches = cacheNames.length > 0;",
    "        await Promise.all(cacheNames.map(function (cacheName) {",
    "          return caches.delete(cacheName);",
    "        }));",
    "      }",
    "",
    "      if (hadRegistrations || hadCaches) {",
    "        var url = new URL(window.location.href);",
    '        if (url.searchParams.get("' + SW_CLEANUP_QUERY_PARAM + '") !== "1") {',
    '          url.searchParams.set("' + SW_CLEANUP_QUERY_PARAM + '", "1");',
    "          window.location.replace(url.toString());",
    "        }",
    "      }",
    "    } catch (error) {",
    '      console.error("[DevBcn] Legacy service worker cleanup failed:", error);',
    "    }",
    "  }",
    "",
    "  void cleanup();",
    "})();",
  ].join("\n");
}

function buildLegacyManifest(): string {
  return JSON.stringify(
    {
      name: "DevBcn Conference",
      short_name: "DevBcn",
      description: "The biggest developer conference in Barcelona. Join hundreds of developers for cutting-edge talks, workshops, and networking.",
      start_url: ".",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "64x64 32x32 24x24 16x16",
          type: "image/x-icon",
        },
        {
          src: "/assets/img/icons/logo192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/assets/img/icons/logo512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/assets/img/icons/maskable_icon_x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    null,
    2
  );
}

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
  const { pathname } = request.nextUrl;

  if (pathname.endsWith("/registerSW.js")) {
    return new NextResponse(buildLegacyRegisterSwScript(), {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Clear-Site-Data": '"cache"',
        "Content-Type": "application/javascript; charset=utf-8",
      },
    });
  }

  if (pathname.endsWith("/service-worker.js")) {
    return NextResponse.rewrite(new URL("/sw.js", request.url));
  }

  if (pathname.endsWith("/manifest.json")) {
    return new NextResponse(buildLegacyManifest(), {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/manifest+json; charset=utf-8",
      },
    });
  }

  return updateSupabaseSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/sponsor/:path*", "/auth/:path*", "/registerSW.js", "/service-worker.js", "/manifest.json"],
};
