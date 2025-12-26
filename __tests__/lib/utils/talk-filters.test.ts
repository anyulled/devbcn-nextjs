import { Talk } from "@/hooks/types";
import { filterTalks } from "@/lib/utils/talk-filters";

describe("filterTalks utility", () => {
  const mockTalks: Talk[] = [
    {
      id: "1",
      title: "Advanced Java Techniques",
      description: "Deep dive into JVM internals and performance.",
      startsAt: "2025-07-08T09:00:00",
      endsAt: "2025-07-08T10:00:00",
      isServiceSession: false,
      isPlenumSession: false,
      speakers: [],
      categories: [
        {
          id: 1,
          name: "Track",
          categoryItems: [{ id: 100, name: "Java & JVM" }],
          sort: 0,
        },
      ],
      roomId: 1,
      room: "Room 1",
      liveUrl: null,
      recordingUrl: null,
      status: "Accepted",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [],
    },
    {
      id: "2",
      title: "React Server Components",
      description: "Learn how to use RSC in Next.js applications.",
      startsAt: "2025-07-08T10:00:00",
      endsAt: "2025-07-08T11:00:00",
      isServiceSession: false,
      isPlenumSession: false,
      speakers: [],
      categories: [
        {
          id: 1,
          name: "Track",
          categoryItems: [{ id: 101, name: "Frontend" }],
          sort: 0,
        },
      ],
      roomId: 2,
      room: "Room 2",
      liveUrl: null,
      recordingUrl: null,
      status: "Accepted",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [],
    },
    {
      id: "3",
      title: "Cloud Native Java",
      description: "Building resilient systems with Spring Boot.",
      startsAt: "2025-07-08T11:00:00",
      endsAt: "2025-07-08T12:00:00",
      isServiceSession: false,
      isPlenumSession: false,
      speakers: [],
      categories: [
        {
          id: 1,
          name: "Track",
          categoryItems: [{ id: 100, name: "Java & JVM" }],
          sort: 0,
        },
      ],
      roomId: 1,
      room: "Room 1",
      liveUrl: null,
      recordingUrl: null,
      status: "Accepted",
      isInformed: true,
      isConfirmed: true,
      questionAnswers: [],
    },
  ];

  it("should return all talks when no filters are applied", () => {
    const result = filterTalks(mockTalks, "", "");
    expect(result).toHaveLength(3);
  });

  it("should filter by track only", () => {
    const result = filterTalks(mockTalks, "Java & JVM", "");
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.categories.some((c) => c.name === "Track" && c.categoryItems[0].name === "Java & JVM"))).toBe(true);
  });

  it("should filter by search query matching title", () => {
    const result = filterTalks(mockTalks, "", "React");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should filter by search query matching description", () => {
    const result = filterTalks(mockTalks, "", "JVM");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should be case-insensitive", () => {
    const result = filterTalks(mockTalks, "", "java");
    expect(result).toHaveLength(2); // "Advanced Java Techniques" and "Cloud Native Java"
  });

  it("should filter by both track and search query", () => {
    const result = filterTalks(mockTalks, "Java & JVM", "Cloud");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("should return empty array when no matches are found", () => {
    const result = filterTalks(mockTalks, "Frontend", "Java");
    expect(result).toHaveLength(0);
  });
});
