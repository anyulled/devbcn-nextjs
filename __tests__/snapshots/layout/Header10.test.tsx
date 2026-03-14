import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header10 from "@/components/layout/header/Header10";

describe("Header10 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header10 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
