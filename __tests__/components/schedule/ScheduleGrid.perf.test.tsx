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

const generateLargeSchedule = (): DailySchedule[] => {
  const rooms: GridRoom[] = Array.from({ length: 5 }, (_, roomIndex) => {
    const sessions: GridSession[] = Array.from({ length: 10 }, (_, sessionIndex) => ({
      id: `session-${roomIndex}-${sessionIndex}`,
      title: `Session ${roomIndex}-${sessionIndex}`,
      description: "Description",
      startsAt: `2023-01-01T${10 + sessionIndex}:00:00`,
      endsAt: `2023-01-01T${10 + sessionIndex}:50:00`,
      isServiceSession: false,
      isPlenumSession: false,
      speakers: [],
      roomId: roomIndex,
      room: `Room ${roomIndex}`,
      status: "confirmed",
    }));

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
    expect(screen.getByText("10:30")).toBeInTheDocument();

    const button = screen.getByText(/Rerender/);
    fireEvent.click(button);

    expect(screen.getByText("Rerender 1")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });
});
