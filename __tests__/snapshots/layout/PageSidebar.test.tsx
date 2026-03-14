import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import PageSidebar from "@/components/layout/PageSidebar";

describe("PageSidebar Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<PageSidebar year="2026" />);
    expect(container).toMatchSnapshot();
  });
});
