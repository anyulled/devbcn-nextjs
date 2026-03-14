import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header4 from "@/components/layout/header/Header4";

describe("Header4 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header4 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
