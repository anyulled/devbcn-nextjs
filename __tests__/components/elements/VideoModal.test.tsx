import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("next/dynamic", () =>
  jest.fn(() => (props: { channel: string; isOpen: boolean; videoId: string }) => (
    <div data-testid="video-modal" data-channel={props.channel} data-open={String(props.isOpen)} data-video-id={props.videoId} />
  ))
);

describe("VideoModal", () => {
  it("applies default props", async () => {
    const VideoModal = (await import("@/components/elements/VideoModal")).default;
    render(<VideoModal />);

    expect(screen.getByTestId("video-modal")).toHaveAttribute("data-channel", "youtube");
    expect(screen.getByTestId("video-modal")).toHaveAttribute("data-open", "false");
    expect(screen.getByTestId("video-modal")).toHaveAttribute("data-video-id", "");
  });

  it("overrides default props", async () => {
    const VideoModal = (await import("@/components/elements/VideoModal")).default;
    render(<VideoModal isOpen={true} videoId="xyz" channel="vimeo" />);

    expect(screen.getByTestId("video-modal")).toHaveAttribute("data-channel", "vimeo");
    expect(screen.getByTestId("video-modal")).toHaveAttribute("data-open", "true");
    expect(screen.getByTestId("video-modal")).toHaveAttribute("data-video-id", "xyz");
  });
});
