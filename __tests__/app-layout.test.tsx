import { afterEach, describe, expect, it, jest } from "@jest/globals";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const initialNodeEnvironment = process.env.NODE_ENV;

jest.mock("@/components/layout/ClientLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@vercel/analytics/react", () => ({
  __esModule: true,
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

jest.mock("@vercel/speed-insights/next", () => ({
  __esModule: true,
  SpeedInsights: () => <div data-testid="vercel-speed-insights" />,
}));

jest.mock("next/font/google", () => ({
  Figtree: () => ({ variable: "figtree" }),
  Space_Grotesk: () => ({ variable: "grotesk" }),
}));

describe("RootLayout", () => {
  afterEach(() => {
    Object.defineProperty(process.env, "NODE_ENV", { configurable: true, value: initialNodeEnvironment, writable: true });
  });

  it("renders Vercel telemetry without Google Analytics or Tag Manager", async () => {
    Object.defineProperty(process.env, "NODE_ENV", { configurable: true, value: "production", writable: true });
    const RootLayout = (await import("@/app/layout")).default;
    const markup = renderToStaticMarkup(<RootLayout>content</RootLayout>);

    expect(markup).toContain("vercel-analytics");
    expect(markup).toContain("vercel-speed-insights");
    expect(markup).not.toContain("googletagmanager");
    expect(markup).not.toContain("google-analytics");
    expect(markup).not.toContain("dataLayer");
  });
});
