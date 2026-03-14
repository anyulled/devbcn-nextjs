import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header5 from "@/components/layout/header/Header5";

describe("Header5 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header5 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
