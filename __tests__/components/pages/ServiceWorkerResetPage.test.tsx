import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

type UnregisterMock = jest.MockedFunction<() => Promise<void>>;
type DeleteCacheMock = jest.MockedFunction<(cacheName: string) => Promise<boolean>>;
type GetRegistrationsMock = jest.MockedFunction<() => Promise<Array<{ unregister: UnregisterMock }>>>;
type CacheKeysMock = jest.MockedFunction<() => Promise<string[]>>;

const unregister = jest.fn(() => Promise.resolve(undefined)) as UnregisterMock;
const deleteCache = jest.fn((cacheName: string) => Promise.resolve(cacheName.length > 0)) as DeleteCacheMock;
const getRegistrations = jest.fn(() => Promise.resolve([{ unregister }])) as GetRegistrationsMock;
const cacheKeys = jest.fn(() => Promise.resolve(["legacy-cache"])) as CacheKeysMock;

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("ServiceWorkerResetPage", () => {
  beforeEach(() => {
    unregister.mockClear();
    deleteCache.mockClear();
    getRegistrations.mockClear();

    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: {
        getRegistrations,
      },
    });

    Object.defineProperty(window, "caches", {
      configurable: true,
      value: {
        delete: deleteCache,
        keys: cacheKeys,
      },
    });
  });

  it("cleans legacy service worker state and shows a home link", async () => {
    const ServiceWorkerResetPage = (await import("@/components/pages/ServiceWorkerResetPage")).default;
    render(<ServiceWorkerResetPage />);

    await waitFor(() => {
      expect(screen.getByText(/cleanup complete/i)).toBeInTheDocument();
    });

    expect(getRegistrations).toHaveBeenCalledTimes(1);
    expect(unregister).toHaveBeenCalledTimes(1);
    expect(deleteCache).toHaveBeenCalledWith("legacy-cache");
    expect(screen.getByRole("link", { name: /go to home/i })).toHaveAttribute("href", "/");
  });
});
