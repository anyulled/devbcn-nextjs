import { cache } from "react";
import { getSchedule } from "@/hooks/useSchedule";

// Mock react cache before importing the hook
jest.mock("react", () => {
  const actual = jest.requireActual("react");
  // We use require here because jest.mock is hoisted and cannot access outer scope imports
  // Relative path from __tests__/schedule_performance.test.ts to __tests__/utils/mockReactCache.ts
  const { createMockCache } = require("./utils/mockReactCache");

  return {
    ...actual,
    cache: createMockCache(),
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
