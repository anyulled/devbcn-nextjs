import JobOffersAccordion from "@/components/job-offers/JobOffersAccordion";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

type JobOffer = {
  id: string;
  title: string;
  location: string;
  text: string;
  url?: string;
};

const mockOffers: JobOffer[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    location: "Remote",
    text: "Work on the UI",
    url: "https://example.com/apply",
  },
  {
    id: "2",
    title: "Backend Engineer",
    location: "Berlin",
    text: "Build APIs",
  },
];

describe("JobOffersAccordion", () => {
  it("renders offers and toggles accordion items", () => {
    render(<JobOffersAccordion offers={mockOffers} />);

    // First offer should be expanded by default (activeAccordion = 1)
    const firstCollapse = screen.getByTestId("collapse1");
    expect(firstCollapse).toHaveClass("show");

    // Second offer should be collapsed initially
    const secondCollapse = screen.getByTestId("collapse2");
    expect(secondCollapse).not.toHaveClass("show");

    // Click header of second accordion to expand it
    const secondHeader = screen.getByText("Backend Engineer");
    fireEvent.click(secondHeader);
    expect(secondCollapse).toHaveClass("show");
    // First should now be collapsed
    expect(firstCollapse).not.toHaveClass("show");
  });

  it("shows apply button when url is provided", () => {
    render(<JobOffersAccordion offers={mockOffers} />);
    const applyButton = screen.getByRole("link", { name: /apply now/i });
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveAttribute("href", "https://example.com/apply");
  });
});
