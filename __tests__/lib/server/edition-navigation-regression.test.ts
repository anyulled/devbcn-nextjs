import { describe, expect, it } from "@jest/globals";
import { getEditionNavigation } from "@/lib/server/navigation";

jest.mock("@/hooks/useSpeakers", () => ({ getSpeakers: async (year: string) => (year === "2027" ? [] : [{ id: "speaker" }]) }));
jest.mock("@/hooks/useTalks", () => ({ getTalks: async (year: string) => (year === "2027" ? [] : [{ sessions: [{ id: "talk" }] }]) }));
jest.mock("@/hooks/useSchedule", () => ({ getSchedule: async () => [] }));

describe("edition navigation", () => {
  it.each(["2023", "2024", "2025", "2026"])("shows speaker and talk links for %s when data exists", async (year) => {
    const navigation = await getEditionNavigation(year);
    expect(navigation.yearSpecific.map((link) => link.href)).toEqual(expect.arrayContaining([`/${year}/speakers`, `/${year}/talks`]));
  });

  it("hides speaker and talk links for the unannounced 2027 edition", async () => {
    const navigation = await getEditionNavigation("2027");
    expect(navigation.yearSpecific.map((link) => link.label)).not.toEqual(expect.arrayContaining(["Speakers", "Talks"]));
  });
});
