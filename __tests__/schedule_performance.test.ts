import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

// Mock fetch
const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ date: "2024-05-17", rooms: [] }]),
  } as Response)
);
globalThis.fetch = mockFetch as unknown as typeof fetch;

// Define a shared variable for the cache map
const cacheMap = new Map<string, unknown>();

// Mock react cache BEFORE anything else
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

describe("getSchedule Performance", () => {
  beforeEach(() => {
    jest.resetModules();
    mockFetch.mockClear();
    cacheMap.clear();
  });

  it("should call fetch once for the same year", async () => {
    // Dynamic import to ensure module is loaded in isolation after mock is active
    const useSchedule = (await import("@/hooks/useSchedule")) as { getSchedule: (year: string) => Promise<unknown> };
    const { getSchedule } = useSchedule;

    await getSchedule("2024");
    await getSchedule("2024");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
