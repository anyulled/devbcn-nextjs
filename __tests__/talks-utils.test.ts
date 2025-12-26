import { SessionGroup, Talk } from "@/hooks/types";
import { getLevelFromTalk, getLevelStars, getSlidesUrl, getTagsFromTalk, getTrackFromTalk, getUniqueTracks, groupTalksByTrack } from "@/hooks/useTalks";

describe("Talk Utility Functions", () => {
  const mockTalk: Talk = {
    id: "123",
    title: "Test Talk",
    description: "Test description",
    startsAt: "2025-07-08T09:00:00",
    endsAt: "2025-07-08T10:00:00",
    isServiceSession: false,
    isPlenumSession: false,
    speakers: [{ id: "sp1", name: "Speaker One" }],
    categories: [
      {
        id: 1,
        name: "Track",
        categoryItems: [{ id: 100, name: "Java & JVM" }],
        sort: 0,
      },
      {
        id: 2,
        name: "Level",
        categoryItems: [{ id: 200, name: "Advanced" }],
        sort: 1,
      },
    ],
    roomId: 1,
    room: "Room 1",
    liveUrl: null,
    recordingUrl: null,
    status: "Accepted",
    isInformed: true,
    isConfirmed: true,
    questionAnswers: [
      {
        id: 1,
        question: "Tags/Topics",
        questionType: "Short_Text",
        answer: "java, cloud, serverless",
        sort: 0,
        answerExtra: null,
      },
    ],
  };

  describe("getTrackFromTalk", () => {
    it("extracts track name from categories", () => {
      expect(getTrackFromTalk(mockTalk)).toBe("Java & JVM");
    });

    it('returns "Other" when no track category exists', () => {
      const talkWithoutTrack = {
        ...mockTalk,
        categories: [],
      };
      expect(getTrackFromTalk(talkWithoutTrack)).toBe("Other");
    });
  });

  describe("getLevelFromTalk", () => {
    it("extracts level from categories", () => {
      expect(getLevelFromTalk(mockTalk)).toBe("Advanced");
    });

    it('returns "Not specified" when no level exists', () => {
      const talkWithoutLevel = {
        ...mockTalk,
        categories: [mockTalk.categories[0]],
      };
      expect(getLevelFromTalk(talkWithoutLevel)).toBe("Not specified");
    });
  });

  describe("getLevelStars", () => {
    it("returns 1 star for introductory", () => {
      expect(getLevelStars("Introductory")).toBe("⭐");
      expect(getLevelStars("beginner")).toBe("⭐");
    });

    it("returns 2 stars for intermediate", () => {
      expect(getLevelStars("Intermediate")).toBe("⭐⭐");
    });

    it("returns 3 stars for advanced", () => {
      expect(getLevelStars("Advanced")).toBe("⭐⭐⭐");
    });

    it("returns empty string for unknown level", () => {
      expect(getLevelStars("Unknown")).toBe("");
    });
  });

  describe("getTagsFromTalk", () => {
    it("extracts and trims tags from questionAnswers", () => {
      const tags = getTagsFromTalk(mockTalk);
      expect(tags).toEqual(["java", "cloud", "serverless"]);
    });

    it("returns empty array when no tags question exists", () => {
      const talkWithoutTags = {
        ...mockTalk,
        questionAnswers: [],
      };
      expect(getTagsFromTalk(talkWithoutTags)).toEqual([]);
    });

    it("returns empty array when answer is null", () => {
      const talkWithNullAnswer = {
        ...mockTalk,
        questionAnswers: [
          {
            id: 1,
            question: "Tags/Topics",
            questionType: "Short_Text",
            answer: null,
            sort: 0,
            answerExtra: null,
          },
        ],
      };
      expect(getTagsFromTalk(talkWithNullAnswer)).toEqual([]);
    });
  });

  describe("getSlidesUrl", () => {
    it("extracts slides url from questionAnswers", () => {
      const talkWithSlides = {
        ...mockTalk,
        questionAnswers: [
          {
            id: 2,
            question: "Slides",
            questionType: "Short_Text",
            answer: "https://example.com/slides.pdf",
            sort: 0,
            answerExtra: null,
          },
        ],
      };
      expect(getSlidesUrl(talkWithSlides)).toBe("https://example.com/slides.pdf");
    });

    it("returns null when no slides answer exists", () => {
      expect(getSlidesUrl(mockTalk)).toBeNull();
    });
  });

  describe("getUniqueTracks", () => {
    it("returns sorted unique tracks from session groups", () => {
      const mockGroups: SessionGroup[] = [
        {
          groupId: 1,
          groupName: "Group 1",
          sessions: [
            mockTalk,
            {
              ...mockTalk,
              id: "456",
              categories: [
                {
                  id: 1,
                  name: "Track",
                  categoryItems: [{ id: 101, name: "Frontend" }],
                  sort: 0,
                },
              ],
            },
          ],
        },
      ];

      const tracks = getUniqueTracks(mockGroups);
      expect(tracks).toEqual(["Frontend", "Java & JVM"]);
    });
  });

  describe("groupTalksByTrack", () => {
    it("groups talks by their track", () => {
      const talks: Talk[] = [
        mockTalk,
        {
          ...mockTalk,
          id: "456",
          title: "Talk 2",
        },
        {
          ...mockTalk,
          id: "789",
          title: "Talk 3",
          categories: [
            {
              id: 1,
              name: "Track",
              categoryItems: [{ id: 101, name: "Frontend" }],
              sort: 0,
            },
          ],
        },
      ];

      const grouped = groupTalksByTrack(talks);

      expect(grouped.size).toBe(2);
      expect(grouped.get("Java & JVM")).toHaveLength(2);
      expect(grouped.get("Frontend")).toHaveLength(1);
    });
  });
});
