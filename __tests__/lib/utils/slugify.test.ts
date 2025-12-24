import { slugify } from "@/lib/utils/slugify";

describe("slugify", () => {
  it("should convert basic company names to lowercase slugs", () => {
    expect(slugify("GFT")).toBe("gft");
    expect(slugify("King")).toBe("king");
    expect(slugify("Idealista")).toBe("idealista");
  });

  it("should replace spaces with hyphens", () => {
    expect(slugify("New Relic")).toBe("new-relic");
    expect(slugify("Sopra Steria")).toBe("sopra-steria");
    expect(slugify("Allianz Technology")).toBe("allianz-technology");
  });

  it("should remove special characters", () => {
    expect(slugify("Company & Co.")).toBe("company-co");
    expect(slugify("Test@Company!")).toBe("testcompany");
    expect(slugify("Name (with) brackets")).toBe("name-with-brackets");
  });

  it("should handle multiple consecutive spaces/hyphens", () => {
    expect(slugify("Multiple   Spaces")).toBe("multiple-spaces");
    expect(slugify("Multiple---Hyphens")).toBe("multiple-hyphens");
    expect(slugify("Mixed  -  Both")).toBe("mixed-both");
  });

  it("should trim leading and trailing hyphens", () => {
    expect(slugify("-Leading")).toBe("leading");
    expect(slugify("Trailing-")).toBe("trailing");
    expect(slugify("-Both-")).toBe("both");
  });

  it("should handle empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle string with only special characters", () => {
    expect(slugify("@#$%")).toBe("");
    expect(slugify("---")).toBe("");
  });

  it("should handle underscores", () => {
    expect(slugify("Company_Name")).toBe("company-name");
    expect(slugify("Multiple_Under_Scores")).toBe("multiple-under-scores");
  });
});
