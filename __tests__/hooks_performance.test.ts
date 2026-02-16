import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

// Mock fetch
const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: "1", name: "Speaker 1" },
        { id: "2", name: "Speaker 2" },
      ]),
  } as Response)
);
globalThis.fetch = mockFetch as unknown as typeof fetch;

// Define a shared variable for the cache map
const cacheMap = new Map<string, unknown>();

// Mock react cache
jest.mock("react", () => {
  const actual = jest.requireActual("react") as Record<string, unknown>;
  return {
    ...actual,
    cache: <T extends (...args: unknown[]) => unknown>(fn: T): T => {
      const cached = (...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);
        if (cacheMap.has(key)) return cacheMap.get(key) as ReturnType<T>;
        const result = fn(...(args as unknown[] as Parameters<T>)) as ReturnType<T>;
        cacheMap.set(key, result);
        return result;
      };
      return cached as unknown as T;
    },
  };
});

describe("getSpeakerByYearAndId Performance", () => {
  beforeEach(() => {
    jest.resetModules();
    mockFetch.mockClear();
    cacheMap.clear();
  });

  it("should call fetch only once for the same year", async () => {
    // Dynamic import to ensure module is loaded in isolation after mock is active
    const useSpeakers = (await import("@/hooks/useSpeakers")) as { getSpeakerByYearAndId: (year: string, id: string) => Promise<unknown> };
    const { getSpeakerByYearAndId } = useSpeakers;

    // First call
    await getSpeakerByYearAndId("2024", "1");
    // Second call - same year, different speaker
    await getSpeakerByYearAndId("2024", "2");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should call fetch again for a different year", async () => {
    const useSpeakers = (await import("@/hooks/useSpeakers")) as { getSpeakerByYearAndId: (year: string, id: string) => Promise<unknown> };
    const { getSpeakerByYearAndId } = useSpeakers;

    // First call - year 2024
    await getSpeakerByYearAndId("2024", "1");
    // Second call - year 2025
    await getSpeakerByYearAndId("2025", "1");

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
