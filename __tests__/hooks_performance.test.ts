import "@testing-library/jest-dom";
import { cache } from "react";
import { getSpeakerByYearAndId } from "@/hooks/useSpeakers";

// Mock react cache before importing the hook
jest.mock("react", () => {
  const actual = jest.requireActual("react") as typeof import("react");
  const cacheMaps: Map<string, unknown>[] = [];

  const mockedCache = (fn: (...args: unknown[]) => unknown) => {
    const cacheMap = new Map<string, unknown>();
    cacheMaps.push(cacheMap);
    return function (...args: unknown[]) {
      const key = JSON.stringify(args);
      if (cacheMap.has(key)) {
        return cacheMap.get(key);
      }
      const result = fn(...args);
      cacheMap.set(key, result);
      return result;
    };
  };

  // Attach a helper to clear the caches
  interface CacheWithReset {
    _reset?: () => void;
  }
  (mockedCache as CacheWithReset)._reset = () => {
    cacheMaps.forEach((map) => map.clear());
  };

  return {
    ...(actual as Record<string, unknown>),
    cache: mockedCache,
  };
});

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: "1", name: "Speaker 1" },
        { id: "2", name: "Speaker 2" },
      ]),
  })
) as jest.Mock;

describe("getSpeakerByYearAndId Performance", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    // Clear all caches before each test
    interface CacheWithReset {
      _reset?: () => void;
    }
    const cacheWithReset = cache as CacheWithReset;
    if (cacheWithReset._reset) {
      cacheWithReset._reset();
    }
  });

  it("should call fetch only once for the same year", async () => {
    // First call
    await getSpeakerByYearAndId("2024", "1");
    // Second call - same year
    await getSpeakerByYearAndId("2024", "2");

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
  });

  it("should call fetch again for a different year", async () => {
    // First call - year 2024
    await getSpeakerByYearAndId("2024", "1");

    // Second call - year 2025
    await getSpeakerByYearAndId("2025", "1");

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(2);
  });

  it("should call fetch again if cache is cleared (simulating new request)", async () => {
    // First call
    await getSpeakerByYearAndId("2024", "1");

    // Reset cache manually to simulate new request
    interface CacheWithReset {
      _reset?: () => void;
    }
    const cacheWithReset = cache as CacheWithReset;
    if (cacheWithReset._reset) {
      cacheWithReset._reset();
    }
    (global.fetch as jest.Mock).mockClear();

    // Second call - same year, but fresh cache
    await getSpeakerByYearAndId("2024", "2");

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
  });
});
