import { expect, describe, it } from "@jest/globals";
import { slugify } from "../../lib/shared/slugify";
import fc from "fast-check";

describe("slugify fuzz tests", () => {
  it("should never throw an error on any string input", () => {
    fc.assert(
      fc.property(fc.string(), (text: string) => {
        const result = slugify(text);
        expect(typeof result).toBe("string");
      })
    );
  });
});
