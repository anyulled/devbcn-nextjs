import { describe, expect, it } from "@jest/globals";
import { createEmptyAdminSponsor, getSelectedEdition, getUniqueEditions } from "@/lib/admin/sponsors";

describe("admin sponsors edition filtering", () => {
  it("sorts editions descending and deduplicates them", () => {
    expect(getUniqueEditions(["2025", "2026", "2024", "2026", null, undefined])).toEqual(["2026", "2025", "2024"]);
  });

  it("defaults to the highest available edition when no filter is provided", () => {
    expect(getSelectedEdition(["2026", "2025", "2024"])).toBe("2026");
  });

  it("keeps the requested edition when it is provided", () => {
    expect(getSelectedEdition(["2026", "2025", "2024"], "2025")).toBe("2025");
  });

  it("builds a new admin sponsor with published status and the selected edition", () => {
    expect(createEmptyAdminSponsor("2026")).toMatchObject({
      edition: "2026",
      status: "published",
      contacts: [],
      name: "",
    });
  });
});
