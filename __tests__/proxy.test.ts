import { describe, expect, it } from "@jest/globals";
import type { NextRequest } from "next/server";

import { proxy } from "@/proxy";

const createRequest = (url: string) =>
  ({
    nextUrl: new URL(url),
    url,
  }) as unknown as NextRequest;

describe("middleware", () => {
  it("serves a cleanup script for legacy registerSW.js requests", async () => {
    const response = await proxy(createRequest("https://www.devbcn.com/registerSW.js"));
    const body = await response.text();

    expect(response.headers.get("content-type")).toBe("application/javascript; charset=utf-8");
    expect(response.headers.get("cache-control")).toBe("no-cache, no-store, must-revalidate");
    expect(body).toContain("devbcn-sw-cleanup");
    expect(body).toContain("Legacy service worker cleanup failed");
  });

  it("serves a legacy manifest for manifest.json requests", async () => {
    const response = await proxy(createRequest("https://www.devbcn.com/manifest.json"));
    const body = await response.text();
    const manifest = JSON.parse(body) as {
      background_color: string;
      display: string;
      icons: Array<{ purpose?: string; src: string; type: string }>;
      name: string;
      short_name: string;
      start_url: string;
      theme_color: string;
    };

    expect(response.headers.get("content-type")).toBe("application/manifest+json; charset=utf-8");
    expect(manifest.name).toBe("DevBcn Conference");
    expect(manifest.short_name).toBe("DevBcn");
    expect(manifest.start_url).toBe(".");
    expect(manifest.display).toBe("standalone");
    expect(manifest.background_color).toBe("#ffffff");
    expect(manifest.theme_color).toBe("#000000");
    expect(manifest.icons).toEqual([
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
        purpose: "maskable",
        src: "/assets/img/icons/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ]);
  });

  it("rewrites service-worker.js to the kill-switch worker", async () => {
    const response = await proxy(createRequest("https://www.devbcn.com/service-worker.js"));

    expect(response.headers.get("x-middleware-rewrite")).toBe("https://www.devbcn.com/sw.js");
  });
});
