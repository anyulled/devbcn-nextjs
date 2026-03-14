import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import VideoPlayer from "@/components/elements/VideoPlayer";

describe("VideoPlayer Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<VideoPlayer url="https://www.youtube.com/embed/test" title="Test Video" />);
    expect(container).toMatchSnapshot();
  });
});
