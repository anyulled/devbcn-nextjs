import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { SessionGroup, Speaker, Talk } from "@/hooks/types";
import * as talks from "@/hooks/useTalks";

jest.mock("@/config/editions", () => ({
  getEditionConfig: jest.fn(() => ({
    sessionizeUrl: "https://sessionize.test",
  })),
}));

const buildTalk = (overrides: Partial<Talk> = {}): Talk => ({
  id: "talk-1",
  title: "Test Talk",
  description: "Test description",
  startsAt: "2026-06-15T10:00:00",
  endsAt: "2026-06-15T11:00:00",
  isServiceSession: false,
  isPlenumSession: false,
  speakers: [{ id: "speaker-1", name: "Speaker 1" }],
  categories: [],
  roomId: 1,
  room: "Room A",
  liveUrl: null,
  recordingUrl: null,
  status: "confirmed",
  isInformed: true,
  isConfirmed: true,
  questionAnswers: [],
  ...overrides,
});

describe("useTalks helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getTrackFromTalk returns track or fallback", () => {
    const withTrack = buildTalk({
      categories: [
        {
          id: 1,
          name: "Track",
          categoryItems: [{ id: 1, name: "Java" }],
          sort: 1,
        },
      ],
    });
    expect(talks.getTrackFromTalk(withTrack)).toBe("Java");

    const withoutTrack = buildTalk();
    expect(talks.getTrackFromTalk(withoutTrack)).toBe("Other");
  });

  it("getLevelFromTalk returns level or fallback", () => {
    const withLevel = buildTalk({
      categories: [
        {
          id: 2,
          name: "Level",
          categoryItems: [{ id: 2, name: "Intermediate" }],
          sort: 1,
        },
      ],
    });
    expect(talks.getLevelFromTalk(withLevel)).toBe("Intermediate");
    expect(talks.getLevelFromTalk(buildTalk())).toBe("Not specified");
  });

  it("getLevelStars maps level values", () => {
    expect(talks.getLevelStars("Beginner")).toBe("⭐");
    expect(talks.getLevelStars("Introductory")).toBe("⭐");
    expect(talks.getLevelStars("Intermediate")).toBe("⭐⭐");
    expect(talks.getLevelStars("Advanced")).toBe("⭐⭐⭐");
    expect(talks.getLevelStars("Unknown")).toBe("");
  });

  it("getTagsFromTalk parses tags and handles blanks", () => {
    const talkWithTags = buildTalk({
      questionAnswers: [
        {
          id: 1,
          question: "Tags/Topics",
          questionType: "text",
          answer: "Java,  Kotlin, , Testing ",
          sort: 1,
          answerExtra: null,
        },
      ],
    });
    expect(talks.getTagsFromTalk(talkWithTags)).toEqual(["Java", "Kotlin", "Testing"]);
    expect(talks.getTagsFromTalk(buildTalk())).toEqual([]);
  });

  it("getSlidesUrl returns slides url or null", () => {
    const talkWithSlides = buildTalk({
      questionAnswers: [
        {
          id: 2,
          question: "Slides",
          questionType: "text",
          answer: "https://slides.test",
          sort: 1,
          answerExtra: null,
        },
      ],
    });
    expect(talks.getSlidesUrl(talkWithSlides)).toBe("https://slides.test");
    expect(talks.getSlidesUrl(buildTalk())).toBeNull();
  });

  it("getUniqueTracks returns sorted unique tracks", () => {
    const groups: SessionGroup[] = [
      { groupId: 1, groupName: "A", sessions: [buildTalk({ categories: [{ id: 1, name: "Track", categoryItems: [{ id: 1, name: "Java" }], sort: 1 }] })] },
      {
        groupId: 2,
        groupName: "B",
        sessions: [buildTalk({ id: "talk-2", categories: [{ id: 1, name: "Track", categoryItems: [{ id: 2, name: "Cloud" }], sort: 1 }] })],
      },
    ];
    expect(talks.getUniqueTracks(groups)).toEqual(["Cloud", "Java"]);
  });

  it("groupTalksByTrack groups talks by track", () => {
    const talksList = [
      buildTalk({ id: "t1", categories: [{ id: 1, name: "Track", categoryItems: [{ id: 1, name: "Java" }], sort: 1 }] }),
      buildTalk({ id: "t2", categories: [{ id: 1, name: "Track", categoryItems: [{ id: 2, name: "Cloud" }], sort: 1 }] }),
      buildTalk({ id: "t3", categories: [{ id: 1, name: "Track", categoryItems: [{ id: 1, name: "Java" }], sort: 1 }] }),
    ];
    const grouped = talks.groupTalksByTrack(talksList);
    expect(grouped.get("Java")?.length).toBe(2);
    expect(grouped.get("Cloud")?.length).toBe(1);
  });

  it("getTalkSpeakersWithDetails returns matching speakers", async () => {
    const mockSpeakers: Speaker[] = [
      {
        id: "speaker-1",
        firstName: "Jane",
        lastName: "Doe",
        fullName: "Jane Doe",
        bio: "Bio",
        tagLine: "Tag",
        profilePicture: "",
        sessions: [],
        isTopSpeaker: false,
        links: [],
        questionAnswers: [],
        categories: [],
      },
      {
        id: "speaker-2",
        firstName: "John",
        lastName: "Smith",
        fullName: "John Smith",
        bio: "Bio",
        tagLine: "Tag",
        profilePicture: "",
        sessions: [],
        isTopSpeaker: false,
        links: [],
        questionAnswers: [],
        categories: [],
      },
    ];
    const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;
    globalThis.fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSpeakers,
    } as Response);

    const result = await talks.getTalkSpeakersWithDetails("2028", ["speaker-2"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("speaker-2");
  });

  it("getTalkByYearAndId returns talk or undefined", async () => {
    const sessionGroups: SessionGroup[] = [{ groupId: 1, groupName: "Main", sessions: [buildTalk({ id: "talk-1" }), buildTalk({ id: "talk-2" })] }];
    const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;
    globalThis.fetch = mockFetch;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => sessionGroups,
    } as Response);

    const found = await talks.getTalkByYearAndId("2026", "talk-2");
    const missing = await talks.getTalkByYearAndId("2026", "talk-404");

    expect(found?.id).toBe("talk-2");
    expect(missing).toBeUndefined();
  });

  it("getRelatedTalksByTrack excludes current talk and limits results", async () => {
    const sessionGroups: SessionGroup[] = [
      {
        groupId: 1,
        groupName: "Main",
        sessions: [
          { ...buildTalk({ id: "t1" }), categories: [{ id: 1, name: "Track", categoryItems: [{ id: 1, name: "Java" }], sort: 1 }] },
          { ...buildTalk({ id: "t2" }), categories: [{ id: 1, name: "Track", categoryItems: [{ id: 1, name: "Java" }], sort: 1 }] },
          { ...buildTalk({ id: "t3" }), categories: [{ id: 1, name: "Track", categoryItems: [{ id: 1, name: "Java" }], sort: 1 }] },
          { ...buildTalk({ id: "t4" }), categories: [{ id: 2, name: "Track", categoryItems: [{ id: 2, name: "Cloud" }], sort: 1 }] },
        ],
      },
    ];
    const mockFetch = jest.fn() as jest.MockedFunction<typeof globalThis.fetch>;
    globalThis.fetch = mockFetch;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => sessionGroups,
    } as Response);

    const related = await talks.getRelatedTalksByTrack("2027", "Java", "t1", 2);
    const ids = related.map((t) => t.id);

    expect(ids).not.toContain("t1");
    expect(ids).toHaveLength(2);
    expect(ids).toEqual(["t2", "t3"]);
  });
});
