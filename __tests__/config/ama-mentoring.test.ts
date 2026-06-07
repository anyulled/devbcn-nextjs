import { describe, expect, it } from "@jest/globals";

import { getAmaScheduleForYear, getMentoringScheduleForYear } from "@/config/ama-mentoring";

describe("AMA and mentoring schedules", () => {
  it("exposes the normalized AMA schedule for 2026", () => {
    const amaSchedule = getAmaScheduleForYear("2026");

    expect(amaSchedule).toHaveLength(32);
    expect(amaSchedule[0]).toMatchObject({
      day: "Tuesday",
      time: "11:25",
      slotLabel: "AMA 1",
      speakers: [
        {
          id: "f44f5308-1287-4e6c-8f48-6ed26ea9f9d3",
          name: 'Mauricio "Salaboy" Salatino',
          avatarUrl: "https://sessionize.com/image/e246-400o400o1-h4ox8BbQwTTWpqcjCtMao7.jpg",
        },
      ],
    });
    expect(amaSchedule[amaSchedule.length - 1]).toMatchObject({
      day: "Wednesday",
      time: "14:40",
      slotLabel: "AMA 4",
      speakers: [
        {
          id: "07b7f9f5-c7a8-41af-96f8-8006ff0e0ebb",
          name: "Jordi Serra Gonzalez",
          avatarUrl: "https://sessionize.com/image/6aaf-400o400o1-VnnQYrxLA3Hkcp18GqBnKe.png",
        },
      ],
    });
  });

  it("exposes the normalized public speaking mentoring schedule for 2026", () => {
    const mentoringSchedule = getMentoringScheduleForYear("2026");

    expect(mentoringSchedule).toHaveLength(8);
    expect(mentoringSchedule[0]).toMatchObject({
      day: "Tuesday",
      time: "11:25",
      slotLabel: "Public Speaking",
      speakers: [
        {
          id: "1595afca-83d0-4893-afa1-a6b8d832aee5",
          name: "Bruno Souza",
          avatarUrl: "https://sessionize.com/image/f5ea-400o400o1-7PDkcAx4GvdyyQxXxcu1NL.jpg",
        },
        {
          id: "8f5f4c31-232b-4e04-b736-6b2775c939cf",
          name: "Victor Rentea",
          avatarUrl: "https://sessionize.com/image/470a-400o400o1-MwrDEbm44NuY3zi63tM8En.png",
        },
        {
          id: "8c35e745-682e-4f8d-9b98-127459a8849d",
          name: "Paolo Ricciuti",
          avatarUrl: "https://sessionize.com/image/17ec-400o400o1-H1AauBKT5HiWfsQAFsv9AB.jpg",
        },
      ],
    });
    expect(mentoringSchedule[mentoringSchedule.length - 1]).toMatchObject({
      day: "Wednesday",
      time: "14:40",
      slotLabel: "Public Speaking",
      speakers: [
        {
          id: "086de2f4-8bfc-47ab-8f65-c623a5753fcf",
          name: "Ana Maria Mihalceanu",
          avatarUrl: "https://sessionize.com/image/02cb-400o400o1-Lawur2AKGny32MmkpG69jQ.JPG",
        },
        {
          id: "8c35e745-682e-4f8d-9b98-127459a8849d",
          name: "Paolo Ricciuti",
          avatarUrl: "https://sessionize.com/image/17ec-400o400o1-H1AauBKT5HiWfsQAFsv9AB.jpg",
        },
        {
          id: "5ecff6ff-7704-433e-a38f-a057d05eacec",
          name: "Olena Kutsenko",
          avatarUrl: "https://sessionize.com/image/926f-400o400o1-QJxA1DujA7NtvobmMfB4M1.jpg",
        },
      ],
    });
  });
});
