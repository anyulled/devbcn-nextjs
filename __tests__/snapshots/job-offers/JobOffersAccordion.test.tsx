import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import JobOffersAccordion from "@/components/job-offers/JobOffersAccordion";
import { JobOffer } from "@/config/job-offers/job-offers/types";

const mockOffers: JobOffer[] = [
  {
    id: "1",
    title: "Senior React Developer",
    location: "Barcelona, Spain",
    text: "We are looking for an experienced React developer...",
    url: "https://example.com/apply",
  },
  {
    id: "2",
    title: "DevOps Engineer",
    location: "Remote",
    text: "Join our infrastructure team...",
    url: "https://example.com/apply2",
  },
];

describe("JobOffersAccordion Component", () => {
  it("matches snapshot with multiple offers", () => {
    const { container } = render(<JobOffersAccordion offers={mockOffers} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with single offer", () => {
    const { container } = render(<JobOffersAccordion offers={[mockOffers[0]]} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with empty offers", () => {
    const { container } = render(<JobOffersAccordion offers={[]} />);
    expect(container).toMatchSnapshot();
  });
});
