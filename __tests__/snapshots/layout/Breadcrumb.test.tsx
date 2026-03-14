import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Breadcrumb from "@/components/layout/Breadcrumb";

describe("Breadcrumb Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Breadcrumb />);
    expect(container).toMatchSnapshot();
  });
});
