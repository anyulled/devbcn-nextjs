import { render, screen, fireEvent } from "@testing-library/react";
import ScheduleGrid from "../../../components/schedule/ScheduleGrid";
import { DailySchedule, GridRoom, GridSession } from "../../../hooks/useSchedule";
import React, { useState } from "react";

// Mock useScheduleContext
jest.mock("../../../context/ScheduleContext", () => ({
  useScheduleContext: () => ({
    isSaved: () => false,
    toggleSession: jest.fn(),
  }),
}));

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

const generateLargeSchedule = (): DailySchedule[] => {
  const rooms: GridRoom[] = [];
  for (let i = 0; i < 5; i++) {
    const sessions: GridSession[] = [];
    for (let j = 0; j < 10; j++) {
      sessions.push({
        id: `session-${i}-${j}`,
        title: `Session ${i}-${j}`,
        description: "Description",
        startsAt: `2023-01-01T${10 + j}:00:00`,
        endsAt: `2023-01-01T${10 + j}:50:00`,
        isServiceSession: false,
        isPlenumSession: false,
        speakers: [],
        roomId: i,
        room: `Room ${i}`,
        status: "confirmed",
      });
    }
    rooms.push({
      id: i,
      name: `Room ${i}`,
      sessions: sessions,
      hasOnlyPlenumSessions: false,
    });
  }

  return [
    {
      date: "2023-01-01",
      rooms: rooms,
      timeSlots: [],
    },
  ];
};

function Wrapper() {
  const [count, setCount] = useState(0);
  const schedule = React.useMemo(() => generateLargeSchedule(), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Rerender {count}</button>
      <ScheduleGrid schedule={schedule} year="2023" />
    </div>
  );
}

describe("ScheduleGrid Performance", () => {
  it("renders correctly and updates without crashing", () => {
    render(<Wrapper />);

    // Verify grid dimensions by checking time labels
    // Based on mock data: Start 10:00, End 10:50 -> Range 10:00 - 11:00
    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("10:30")).toBeInTheDocument();
    // 11:00 might be present if loops goes <= totalRows, let's check implementation

    const button = screen.getByText(/Rerender/);
    fireEvent.click(button);

    expect(screen.getByText("Rerender 1")).toBeInTheDocument();

    // Verify it still looks correct
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });
});
