import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header2 from "@/components/layout/header/Header2";

describe("Header2 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header2 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
