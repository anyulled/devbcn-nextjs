import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Section1 from "@/components/sections/home8/section1";

jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("@/components/BackgroundCarousel", () => ({ __esModule: true, default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
jest.mock("@/components/elements/VideoOverlay", () => ({ __esModule: true, default: () => null }));
jest.mock("@/components/elements/TrackBadges", () => ({ __esModule: true, default: () => null }));

describe("edition hero", () => {
  it.each(["2023", "2024", "2025"])("does not advertise sessions in %s", (year) => {
    render(<Section1 year={year} />);
    expect(screen.queryByRole("link", { name: /explore ama/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /explore mentoring/i })).not.toBeInTheDocument();
  });

  it.each(["2026", "2027"])("links to sessions for %s", (year) => {
    render(<Section1 year={year} />);
    expect(screen.getByRole("link", { name: /explore ama/i })).toHaveAttribute("href", `/${year}/ama`);
    expect(screen.getByRole("link", { name: /explore mentoring/i })).toHaveAttribute("href", `/${year}/mentoring`);
  });
});
