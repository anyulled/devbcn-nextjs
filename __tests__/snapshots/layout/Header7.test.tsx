import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Header7 from "@/components/layout/header/Header7";

describe("Header7 Component", () => {
  const mockProps = {
    scroll: false,
    isSearch: false,
    handleSearch: jest.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Header7 {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
