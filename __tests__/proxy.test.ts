import { describe, expect, it } from "@jest/globals";
import { config } from "@/proxy";

describe("proxy configuration", () => {
  it("only runs for authenticated routes", () => {
    expect(config.matcher).toEqual(["/admin/:path*", "/sponsor/:path*", "/auth/:path*"]);
  });
});
