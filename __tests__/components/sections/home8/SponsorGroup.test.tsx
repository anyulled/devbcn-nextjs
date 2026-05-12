import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { SponsorGroup } from "@/components/sections/home8/SponsorGroup";
import { Sponsor } from "@/config/editions/types";

describe("SponsorGroup", () => {
  const mockSponsors: Sponsor[] = [
    {
      name: "Acme Corp",
      website: "https://acme.com",
      image: "/assets/img/sponsors/acme.png",
    },
    {
      name: "Global Tech",
      website: "https://global.tech",
      image: "/assets/img/sponsors/global.png",
    },
  ];

  it("returns null if items array is empty", () => {
    const { container } = render(<SponsorGroup title="Regular" items={[]} sizeClass="col-12" />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null if items is null", () => {
    const { container } = render(<SponsorGroup title="Regular" items={null} sizeClass="col-12" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders correctly with given items", () => {
    render(<SponsorGroup title="Regular Sponsors" items={mockSponsors} sizeClass="col-12" />);

    expect(screen.getByText("Regular Sponsors")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://acme.com");
    expect(links[1]).toHaveAttribute("href", "https://global.tech");

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("alt", "Acme Corp");
    expect(images[1]).toHaveAttribute("alt", "Global Tech");
  });

  it("applies correct height for Regular category", () => {
    render(<SponsorGroup title="Regular" items={[mockSponsors[0]]} sizeClass="col-12" />);

    const containerDiv = screen.getByAltText("Acme Corp").closest("div");
    expect(containerDiv).toHaveStyle({ height: "5rem" });
  });

  it("applies correct height for Premium category (5% larger)", () => {
    render(<SponsorGroup title="Premium" items={[mockSponsors[0]]} sizeClass="col-12" />);

    const containerDiv = screen.getByAltText("Acme Corp").closest("div");
    expect(containerDiv).toHaveStyle({ height: "5.25rem" });
  });

  it("applies correct height for Top category (10% larger than Premium)", () => {
    render(<SponsorGroup title="Top" items={[mockSponsors[0]]} sizeClass="col-12" />);

    const containerDiv = screen.getByAltText("Acme Corp").closest("div");
    expect(containerDiv).toHaveStyle({ height: "5.775rem" });
  });
});
