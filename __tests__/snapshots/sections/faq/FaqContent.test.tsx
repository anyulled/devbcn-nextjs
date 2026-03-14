import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import FaqContent from "@/components/sections/faq/FaqContent";

describe("FaqContent Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<FaqContent />);
    expect(container).toMatchSnapshot();
  });
});
