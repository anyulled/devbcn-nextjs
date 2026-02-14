import { render, screen } from "@testing-library/react";
import ScheduleContainer from "../../../components/schedule/ScheduleContainer";
import { DailySchedule } from "../../../hooks/useSchedule";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

// Mock the hook
jest.mock("../../../hooks/useMediaQuery");

// Mock child components to verify rendering
jest.mock("../../../components/schedule/ScheduleGrid", () => {
  const MockScheduleGrid = () => <div data-testid="schedule-grid">Grid</div>;
  MockScheduleGrid.displayName = "MockScheduleGrid";
  return MockScheduleGrid;
});

jest.mock("../../../components/schedule/ScheduleMobile", () => {
  const MockScheduleMobile = () => <div data-testid="schedule-mobile">Mobile</div>;
  MockScheduleMobile.displayName = "MockScheduleMobile";
  return MockScheduleMobile;
});

// Mock context
jest.mock("../../../context/ScheduleContext", () => ({
  useScheduleContext: () => ({
    savedSessionIds: [],
    isSaved: () => false,
    toggleSession: jest.fn(),
  }),
}));

const mockSchedule: DailySchedule[] = [];

describe("ScheduleContainer Optimization", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both components initially (SSR/Hydration)", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(null);
    render(<ScheduleContainer initialSchedule={mockSchedule} year="2024" />);

    // Both should be present to support hydration matching and CSS hiding
    expect(screen.getByTestId("schedule-grid")).toBeInTheDocument();
    expect(screen.getByTestId("schedule-mobile")).toBeInTheDocument();
  });

  it("renders only ScheduleGrid on Desktop", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    render(<ScheduleContainer initialSchedule={mockSchedule} year="2024" />);

    expect(screen.getByTestId("schedule-grid")).toBeInTheDocument();
    expect(screen.queryByTestId("schedule-mobile")).not.toBeInTheDocument();
  });

  it("renders only ScheduleMobile on Mobile", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    render(<ScheduleContainer initialSchedule={mockSchedule} year="2024" />);

    expect(screen.queryByTestId("schedule-grid")).not.toBeInTheDocument();
    expect(screen.getByTestId("schedule-mobile")).toBeInTheDocument();
  });
});
