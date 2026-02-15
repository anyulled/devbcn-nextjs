import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import VideoPlayer from "@/components/elements/VideoPlayer";

describe("VideoPlayer", () => {
  it("renders an iframe with loading='lazy'", () => {
    const url = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    const title = "Rick Roll";

    render(<VideoPlayer url={url} title={title} />);

    const iframe = screen.getByTitle(title);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", url);
    expect(iframe).toHaveAttribute("loading", "lazy");
  });
});
