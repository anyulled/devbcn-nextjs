import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header6 from "@/components/layout/header/Header6";

describe("Header6 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header6 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
