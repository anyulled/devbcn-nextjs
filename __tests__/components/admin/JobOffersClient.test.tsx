import { describe, expect, it } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { JobOffersClient } from "@/app/admin/(dashboard)/job-offers/JobOffersClient";

const mockJobOffers = [
  {
    id: "1",
    title: "Frontend Developer",
    location: "Barcelona",
    url: "https://example.com/job",
    text: "Job description",
    created_at: "2024-01-15",
    sponsor_id: "sponsor-1",
    sponsor: {
      name: "Tech Corp",
      edition: "2024",
    },
  },
  {
    id: "2",
    title: "Backend Engineer",
    location: "Remote",
    url: null,
    text: "Backend role",
    created_at: "2024-02-01",
    sponsor_id: "sponsor-2",
    sponsor: {
      name: "Data Inc",
      edition: "2025",
    },
  },
  {
    id: "3",
    title: "DevOps Engineer",
    location: null,
    url: null,
    text: "DevOps role",
    created_at: "2024-03-01",
    sponsor_id: "sponsor-3",
    sponsor: {
      name: "Cloud Ltd",
      edition: "2026",
    },
  },
];

describe("JobOffersClient", () => {
  it("renders all job offers when no filter is selected", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
    expect(screen.getByText("DevOps Engineer")).toBeInTheDocument();
  });

  it("renders year filter dropdown with all options", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    const select = screen.getByLabelText(/filter by year/i);
    expect(select).toBeInTheDocument();

    expect(screen.getByText("All Years (3)")).toBeInTheDocument();
    expect(screen.getByText("2026 (1)")).toBeInTheDocument();
    expect(screen.getByText("2025 (1)")).toBeInTheDocument();
    expect(screen.getByText("2024 (1)")).toBeInTheDocument();
  });

  it("filters job offers by year", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    const select = screen.getByLabelText(/filter by year/i);
    fireEvent.change(select, { target: { value: "2025" } });

    expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
    expect(screen.queryByText("Frontend Developer")).not.toBeInTheDocument();
    expect(screen.queryByText("DevOps Engineer")).not.toBeInTheDocument();
  });

  it("shows empty state when year has no results", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    const select = screen.getByLabelText(/filter by year/i);
    fireEvent.change(select, { target: { value: "2023" } });

    expect(screen.getByText((content) => content.includes("No job offers found"))).toBeInTheDocument();
  });

  it("displays edition in table cell", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("displays sponsor name", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Data Inc")).toBeInTheDocument();
    expect(screen.getByText("Cloud Ltd")).toBeInTheDocument();
  });

  it("displays location or default fallback", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText("Remote/TBD")).toBeInTheDocument();
  });

  it("displays results summary", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    expect(screen.getByText(/showing 3 of 3 job offers/i)).toBeInTheDocument();
  });

  it("updates results summary when filtering", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    const select = screen.getByLabelText(/filter by year/i);
    fireEvent.change(select, { target: { value: "2025" } });

    expect(screen.getByText(/showing 1 of 3 job offers for 2025/i)).toBeInTheDocument();
  });

  it("has edit button linking to edit page", () => {
    render(<JobOffersClient jobOffers={mockJobOffers} availableYears={["2026", "2025", "2024"]} />);

    const editLinks = screen.getAllByRole("link", { name: /edit job offer/i });
    expect(editLinks).toHaveLength(3);
    expect(editLinks[0]).toHaveAttribute("href", "/admin/job-offers/1");
  });

  it("shows empty state when no job offers exist", () => {
    render(<JobOffersClient jobOffers={[]} availableYears={["2026"]} />);

    expect(screen.getByText(/no job offers found in the system/i)).toBeInTheDocument();
  });
});
