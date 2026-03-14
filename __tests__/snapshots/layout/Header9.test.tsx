import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header9 from "@/components/layout/header/Header9";

describe("Header9 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header9 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
