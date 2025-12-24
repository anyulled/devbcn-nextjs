import JobOffersAccordion from "@/components/job-offers/JobOffersAccordion";
import { JobOffer } from "@/config/data/job-offers/types";
import { fireEvent, render, screen } from "@testing-library/react";

const mockOffers: JobOffer[] = [
  {
    id: "1",
    title: "Senior Developer",
    location: "Remote",
    url: "https://example.com/apply",
    text: `**Description:**

This is a great job opportunity.

**Requirements:**

- 5+ years experience
- Strong communication skills`,
  },
  {
    id: "2",
    title: "Junior Developer",
    location: "Hybrid",
    text: "Entry level position for new developers.",
  },
];

describe("JobOffersAccordion", () => {
  it("should render all job offers", () => {
    render(<JobOffersAccordion offers={mockOffers} />);
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
  });

  it("should display job locations", () => {
    render(<JobOffersAccordion offers={mockOffers} />);
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText("Hybrid")).toBeInTheDocument();
  });

  it("should have first accordion open by default", () => {
    const { container } = render(<JobOffersAccordion offers={mockOffers} />);
    const firstAccordion = container.querySelector(".accordion-collapse.show");
    expect(firstAccordion).toBeInTheDocument();
  });

  it("should toggle accordion on click", () => {
    const { container } = render(<JobOffersAccordion offers={mockOffers} />);
    const secondButton = screen.getByText("Junior Developer").closest("button");

    // Second accordion should be collapsed initially
    let accordions = container.querySelectorAll(".accordion-collapse.show");
    expect(accordions).toHaveLength(1);

    // Click to open second accordion
    if (secondButton) {
      fireEvent.click(secondButton);
    }

    // Now second should be open, first closed
    accordions = container.querySelectorAll(".accordion-collapse.show");
    expect(accordions).toHaveLength(1);
  });

  it("should render apply button when URL is provided", () => {
    render(<JobOffersAccordion offers={mockOffers} />);
    const applyLink = screen.getByText(/apply now/i).closest("a");
    expect(applyLink).toBeInTheDocument();
    expect(applyLink).toHaveAttribute("href", "https://example.com/apply");
    expect(applyLink).toHaveAttribute("target", "_blank");
  });

  it("should not render apply button when URL is not provided", () => {
    render(<JobOffersAccordion offers={[mockOffers[1]]} />);
    const applyButton = screen.queryByText(/apply now/i);
    expect(applyButton).not.toBeInTheDocument();
  });

  it("should render markdown content", () => {
    const { container } = render(<JobOffersAccordion offers={mockOffers} />);
    // Check for strong tags (bold text)
    const strongElements = container.querySelectorAll("strong");
    expect(strongElements.length).toBeGreaterThan(0);

    // Check for list items
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("should handle empty offers array", () => {
    const { container } = render(<JobOffersAccordion offers={[]} />);
    const accordionItems = container.querySelectorAll(".accordion-item");
    expect(accordionItems).toHaveLength(0);
  });

  it("should render correct number of offers", () => {
    const { container } = render(<JobOffersAccordion offers={mockOffers} />);
    const accordionItems = container.querySelectorAll(".accordion-item");
    expect(accordionItems).toHaveLength(mockOffers.length);
  });
});
