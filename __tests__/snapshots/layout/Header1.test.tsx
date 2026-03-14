import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header1 from "@/components/layout/header/Header1";

describe("Header1 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot without scroll", () => {
    const { container } = render(<Header1 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with scroll", () => {
    const { container } = render(<Header1 {...mockProps} scroll={true} />);
    expect(container).toMatchSnapshot();
  });
});
