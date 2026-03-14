import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header3 from "@/components/layout/header/Header3";

describe("Header3 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header3 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
