import { describe, it, expect } from "@jest/globals";

jest.mock("@/config/editions", () => ({
  getEditionConfig: () => ({
    diversity: { sponsors: ["sponsor1"] },
    navigation: {
      main: [{ title: "Home", href: "/" }],
      yearSpecific: [{ title: "Schedule", href: "/schedule", condition: "hasSchedule" }],
      news: [],
    },
  }),
}));

jest.mock("@/hooks/useSpeakers", () => ({
  getSpeakers: () =>
    Promise.resolve([
      { id: "1", fullName: "Speaker 1" },
      { id: "2", fullName: "Speaker 2" },
    ]),
}));

jest.mock("@/hooks/useTalks", () => ({
  getTalks: () => Promise.resolve([{ id: "1", title: "Talk 1" }]),
}));

jest.mock("@/hooks/useSchedule", () => ({
  getSchedule: () => Promise.resolve([{ date: "2026-06-15", rooms: [] }]),
}));

jest.mock("@/config/job-offers/job-offers", () => ({
  hasJobOffers: () => true,
}));

jest.mock("@/app/[year]/cfp/cfpData", () => ({
  cfpData: {
    "2026": [{ trackName: "Java", members: ["speaker1"] }],
  },
}));

describe("getEditionNavigation", () => {
  it("returns navigation object with required properties", async () => {
    const { getEditionNavigation } = await import("@/lib/shared/navigation");
    const result = await getEditionNavigation("2026");

    expect(result).toBeDefined();
    expect(result).toHaveProperty("main");
    expect(result).toHaveProperty("yearSpecific");
    expect(result).toHaveProperty("news");
  });
});
