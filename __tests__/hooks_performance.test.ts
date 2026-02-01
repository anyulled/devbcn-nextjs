
// Mock react cache before importing the hook
jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    cache: (fn: Function) => {
      const cacheMap = new Map();
      return function(...args: any[]) {
        const key = JSON.stringify(args);
        if (cacheMap.has(key)) {
          return cacheMap.get(key);
        }
        const result = fn(...args);
        cacheMap.set(key, result);
        return result;
      }
    }
  };
});

import { getSpeakerByYearAndId } from "@/hooks/useSpeakers";

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: "1", name: "Speaker 1" },
      { id: "2", name: "Speaker 2" },
    ]),
  })
) as jest.Mock;

describe("getSpeakerByYearAndId Performance", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("should call fetch only once if cached", async () => {
    // First call
    await getSpeakerByYearAndId("2024", "1");
    // Second call - same year
    await getSpeakerByYearAndId("2024", "2");

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
  });
});
