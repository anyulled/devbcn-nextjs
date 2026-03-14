import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import PageHeader from "@/components/layout/PageHeader";

describe("PageHeader Component", () => {
  it("matches snapshot with default props", () => {
    const { container } = render(<PageHeader title="Test Page" breadcrumbText="Test" />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with custom background", () => {
    const { container } = render(<PageHeader title="Talks 2026" breadcrumbText="Talks" backgroundImageId={6} contentColClass="col-lg-6" />);
    expect(container).toMatchSnapshot();
  });
});
