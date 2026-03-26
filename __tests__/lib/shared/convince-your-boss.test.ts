import { describe, expect, it, jest, afterAll } from "@jest/globals";
import { isTicketSaleActive, findCurrentCategory, getOrdinal } from "@/lib/shared/convince-your-boss";
import { EditionConfig } from "@/config/editions/types";

describe("convince-your-boss shared logic", () => {
  const mockConfig: Partial<EditionConfig> = {
    tickets: {
      startDay: new Date("2023-01-01T00:00:00Z"),
      endDay: new Date("2023-12-31T23:59:59Z"),
      url: "https://tickets.example.com",
      categories: [
        {
          name: "Early Bird",
          price: "100€",
          startDate: new Date("2023-02-01T00:00:00Z"),
          endDate: new Date("2023-03-31T23:59:59Z"),
        },
        {
          name: "Regular",
          price: "200€",
          startDate: new Date("2023-04-01T00:00:00Z"),
          endDate: new Date("2023-05-31T23:59:59Z"),
        },
        {
          name: "Super Last Minute",
          price: "300€",
          startDate: new Date("2023-06-01T00:00:00Z"),
          endDate: new Date("2023-06-30T23:59:59Z"),
        },
      ],
    },
  };

  describe("isTicketSaleActive", () => {
    it("should return true when current date is within range (Early Bird to Super Last Minute)", () => {
      jest.useFakeTimers().setSystemTime(new Date("2023-03-15T12:00:00Z"));
      expect(isTicketSaleActive(mockConfig as EditionConfig)).toBe(true);

      jest.useFakeTimers().setSystemTime(new Date("2023-06-15T12:00:00Z"));
      expect(isTicketSaleActive(mockConfig as EditionConfig)).toBe(true);
    });

    it("should return false when current date is before Early Bird", () => {
      jest.useFakeTimers().setSystemTime(new Date("2023-01-15T12:00:00Z"));
      expect(isTicketSaleActive(mockConfig as EditionConfig)).toBe(false);
    });

    it("should return false when current date is after Super Last Minute", () => {
      jest.useFakeTimers().setSystemTime(new Date("2023-07-15T12:00:00Z"));
      expect(isTicketSaleActive(mockConfig as EditionConfig)).toBe(false);
    });
  });

  describe("findCurrentCategory", () => {
    it("should return the matching category when in range", () => {
      jest.useFakeTimers().setSystemTime(new Date("2023-03-15T12:00:00Z"));
      const cat = findCurrentCategory(mockConfig as EditionConfig);
      expect(cat?.name).toBe("Early Bird");
    });

    it("should return undefined when not in any category range", () => {
      jest.useFakeTimers().setSystemTime(new Date("2023-07-15T12:00:00Z"));
      const cat = findCurrentCategory(mockConfig as EditionConfig);
      expect(cat).toBeUndefined();
    });
  });

  describe("getOrdinal", () => {
    it("should return correct ordinals", () => {
      expect(getOrdinal(1)).toBe("1st");
      expect(getOrdinal(2)).toBe("2nd");
      expect(getOrdinal(3)).toBe("3rd");
      expect(getOrdinal(4)).toBe("4th");
      expect(getOrdinal(11)).toBe("11th");
      expect(getOrdinal(12)).toBe("12th");
      expect(getOrdinal(13)).toBe("13th");
      expect(getOrdinal(21)).toBe("21st");
      expect(getOrdinal(22)).toBe("22nd");
      expect(getOrdinal(23)).toBe("23rd");
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
