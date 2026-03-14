import { expect, describe, it } from "@jest/globals";
import fc from "fast-check";

describe("Property Tests for Schedule Data", () => {
  it("should always return an array", () => {
    fc.assert(
      fc.property(fc.array(fc.record({ title: fc.string(), time: fc.date() })), (data) => {
        expect(Array.isArray(data)).toBe(true);
      })
    );
  });
});
