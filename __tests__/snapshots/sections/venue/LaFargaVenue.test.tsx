import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import LaFargaVenue from "@/components/sections/venue/LaFargaVenue";

describe("LaFargaVenue Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<LaFargaVenue />);
    expect(container).toMatchSnapshot();
  });
});
