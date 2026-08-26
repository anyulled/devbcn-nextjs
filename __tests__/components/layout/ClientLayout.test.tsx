import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

const aosInit = jest.fn();
const cacheDelete = jest.fn<(cacheName: string) => Promise<boolean>>();
const cacheKeys = jest.fn<() => Promise<string[]>>();
const getRegistrations = jest.fn<() => Promise<ServiceWorkerRegistration[]>>();
const unregister = jest.fn<() => Promise<boolean>>();

jest.mock("aos", () => ({
  __esModule: true,
  default: { init: aosInit },
}));

jest.mock("@/components/elements/AddClassBody", () => ({
  __esModule: true,
  default: () => <div data-testid="add-class-body" />,
}));

jest.mock("@/components/elements/BackToTop", () => ({
  __esModule: true,
  default: ({ target }: { target: string }) => <div data-testid="back-to-top" data-target={target} />,
}));

jest.mock("@/components/layout/footer/Footer8", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-8" />,
}));

describe("ClientLayout", () => {
  beforeEach(() => {
    aosInit.mockClear();
    cacheDelete.mockClear();
    cacheKeys.mockClear();
    getRegistrations.mockClear();
    unregister.mockClear();
    cacheDelete.mockResolvedValue(true);
    cacheKeys.mockResolvedValue([]);
    getRegistrations.mockResolvedValue([]);
    unregister.mockResolvedValue(true);
    window.localStorage.clear();
    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: { getRegistrations } as unknown as ServiceWorkerContainer,
    });
    Object.defineProperty(window, "caches", {
      configurable: true,
      value: { delete: cacheDelete, keys: cacheKeys } as unknown as CacheStorage,
    });
  });

  it("initializes AOS and renders children", async () => {
    const ClientLayout = (await import("@/components/layout/ClientLayout")).default;
    render(
      <ClientLayout>
        <div data-testid="child" />
      </ClientLayout>
    );

    expect(screen.getByTestId("add-class-body")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("footer-8")).toBeInTheDocument();
    expect(screen.getByTestId("back-to-top")).toHaveAttribute("data-target", "#top");
    await waitFor(() => {
      expect(aosInit).toHaveBeenCalledTimes(1);
    });
  });

  it("removes legacy service-worker registrations and caches once", async () => {
    getRegistrations.mockResolvedValue([{ unregister } as unknown as ServiceWorkerRegistration]);
    cacheKeys.mockResolvedValue(["workbox-precache-v2"]);
    const ClientLayout = (await import("@/components/layout/ClientLayout")).default;
    render(<ClientLayout>content</ClientLayout>);

    await waitFor(() => {
      expect(unregister).toHaveBeenCalledTimes(1);
      expect(cacheDelete).toHaveBeenCalledWith("workbox-precache-v2");
      expect(window.localStorage.getItem("devbcn-legacy-service-worker-migration-v1")).toBe("complete");
    });
  });
});
