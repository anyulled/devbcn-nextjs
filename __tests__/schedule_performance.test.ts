import { cache } from "react";
import { getSchedule } from "@/hooks/useSchedule";

// Mock react cache before importing the hook
jest.mock("react", () => {
  const actual = jest.requireActual("react");
  const cacheMaps: Map<any, any>[] = [];

  const mockedCache = (fn: Function) => {
    const cacheMap = new Map();
    cacheMaps.push(cacheMap);
    return function (...args: any[]) {
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
  (mockedCache as any)._reset = () => {
    cacheMaps.forEach((map) => map.clear());
  };

  return {
    ...actual,
    cache: mockedCache,
  };
});

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          date: "2024-05-17",
          rooms: [],
        },
      ]),
  })
) as jest.Mock;

describe("getSchedule Performance", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    // Clear all caches before each test
    if ((cache as any)._reset) {
      (cache as any)._reset();
    }
  });

  it("should call fetch once for the same year (AFTER optimization)", async () => {
    // First call
    await getSchedule("2024");
    // Second call - same year
    await getSchedule("2024");

    // Expect 1 call because it IS cached now
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
  });
});
