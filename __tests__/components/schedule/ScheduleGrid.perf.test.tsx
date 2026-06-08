import { describe, expect, it, jest } from "@jest/globals";
import React, { useState, useMemo } from "react";

// Mock FIRST
jest.mock("@/context/ScheduleContext", () => ({
  __esModule: true,
  useScheduleContext: jest.fn(() => ({
    isSaved: jest.fn(() => false),
    toggleSession: jest.fn(),
  })),
}));

jest.mock("next/link", () => {
  const MockLink = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };
  MockLink.displayName = "MockLink";
  return {
    __esModule: true,
    default: MockLink,
  };
});

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen, fireEvent } from "@testing-library/react";
import type { DailySchedule, GridRoom, GridSession } from "../../../hooks/useSchedule";

const createSession = (session: Partial<GridSession> & Pick<GridSession, "id" | "title" | "startsAt" | "endsAt" | "roomId" | "room">): GridSession => ({
  description: "Description",
  isServiceSession: false,
  isPlenumSession: false,
  speakers: [],
  status: "confirmed",
  ...session,
});

const generateLargeSchedule = (): DailySchedule[] => {
  const rooms: GridRoom[] = Array.from({ length: 5 }, (_, roomIndex) => {
    const sessions: GridSession[] = Array.from({ length: 10 }, (_, sessionIndex) =>
      createSession({
        id: `session-${roomIndex}-${sessionIndex}`,
        title: `Session ${roomIndex}-${sessionIndex}`,
        startsAt: `2023-01-01T${10 + sessionIndex}:00:00`,
        endsAt: `2023-01-01T${10 + sessionIndex}:50:00`,
        roomId: roomIndex,
        room: `Room ${roomIndex}`,
      })
    );

    return {
      id: roomIndex,
      name: `Room ${roomIndex}`,
      sessions: sessions,
      hasOnlyPlenumSessions: false,
    };
  });

  return [
    {
      date: "2023-01-01",
      rooms: rooms,
      timeSlots: [],
    },
  ];
};

const generateScheduleWithShortServiceBreak = (): DailySchedule[] => [
  {
    date: "2026-06-16",
    rooms: [
      {
        id: 1,
        name: "Room 1",
        hasOnlyPlenumSessions: false,
        sessions: [
          createSession({
            id: "room-1-morning",
            title: "Morning Talk",
            startsAt: "2026-06-16T11:25:00",
            endsAt: "2026-06-16T12:15:00",
            roomId: 1,
            room: "Room 1",
          }),
          createSession({
            id: "room-1-after-break",
            title: "After Break Talk",
            startsAt: "2026-06-16T12:25:00",
            endsAt: "2026-06-16T13:15:00",
            roomId: 1,
            room: "Room 1",
          }),
        ],
      },
      {
        id: 2,
        name: "Room 2",
        hasOnlyPlenumSessions: false,
        sessions: [
          createSession({
            id: "room-2-morning",
            title: "Parallel Morning Talk",
            startsAt: "2026-06-16T11:25:00",
            endsAt: "2026-06-16T12:15:00",
            roomId: 2,
            room: "Room 2",
          }),
        ],
      },
      {
        id: 10,
        name: "Exhibit Hall",
        hasOnlyPlenumSessions: true,
        sessions: [
          createSession({
            id: "service-break",
            title: "Session Break",
            startsAt: "2026-06-16T12:15:00",
            endsAt: "2026-06-16T12:25:00",
            isServiceSession: true,
            isPlenumSession: true,
            roomId: 10,
            room: "Exhibit Hall",
          }),
        ],
      },
    ],
    timeSlots: [],
  },
];

interface WrapperProps {
  scheduleGridComponent: React.ComponentType<{ schedule: DailySchedule[]; year: string }>;
}

function Wrapper({ scheduleGridComponent }: Readonly<WrapperProps>) {
  const [count, setCount] = useState(0);
  const schedule = useMemo(() => generateLargeSchedule(), []);
  const Grid = scheduleGridComponent;

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Rerender {count}</button>
      <Grid schedule={schedule} year="2023" />
    </div>
  );
}

describe("ScheduleGrid Performance", () => {
  it("renders correctly and updates without crashing", async () => {
    const ScheduleGrid = (await import("../../../components/schedule/ScheduleGrid")).default;
    render(<Wrapper scheduleGridComponent={ScheduleGrid} />);

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("10:50")).toBeInTheDocument();

    const button = screen.getByText(/Rerender/);
    fireEvent.click(button);

    expect(screen.getByText("Rerender 1")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });

  it("uses exact time boundaries for short full-width service sessions", async () => {
    const ScheduleGrid = (await import("../../../components/schedule/ScheduleGrid")).default;
    render(<ScheduleGrid schedule={generateScheduleWithShortServiceBreak()} year="2026" />);

    expect(screen.getByText("11:25")).toBeInTheDocument();
    expect(screen.getByText("12:15")).toBeInTheDocument();
    expect(screen.getByText("12:25")).toBeInTheDocument();
    expect(screen.queryByText("12:30")).not.toBeInTheDocument();

    const grid = screen.getByTestId("schedule-grid");
    expect(grid).toHaveStyle({
      gridTemplateRows: "50px minmax(120px, auto) minmax(48px, auto) minmax(120px, auto)",
    });

    const serviceCell = screen.getByText("Session Break").closest("div[style]");
    expect(serviceCell).toHaveStyle({
      gridColumn: "2 / span 2",
      gridRow: "3 / span 1",
    });
  });
});
