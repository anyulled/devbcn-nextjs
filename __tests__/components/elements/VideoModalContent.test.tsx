import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("react-modal-video", () => ({
  __esModule: true,
  default: ({ channel, videoId }: { channel: string; videoId: string }) => <div data-testid="modal-video" data-channel={channel} data-video-id={videoId} />,
}));

describe("VideoModalContent", () => {
  it("renders modal video with props", async () => {
    const VideoModalContent = (await import("@/components/elements/VideoModalContent")).default;
    render(
      <VideoModalContent
        channel="youtube"
        isOpen={true}
        videoId="abc123"
        onClose={() => undefined}
        allowFullScreen={true}
        ratio="16:9"
        animationSpeed={300}
        classNames={{
          modalVideo: "modal-video",
          modalVideoClose: "modal-video-close",
          modalVideoBody: "modal-video-body",
          modalVideoInner: "modal-video-inner",
          modalVideoIframeWrap: "modal-video-movie-wrap",
          modalVideoCloseBtn: "modal-video-close-btn",
          modalVideoEffect: "modal-video-effect",
        }}
        aria={{ openMessage: "Open", dismissBtnMessage: "Close" }}
      />
    );

    expect(screen.getByTestId("modal-video")).toHaveAttribute("data-channel", "youtube");
    expect(screen.getByTestId("modal-video")).toHaveAttribute("data-video-id", "abc123");
  });
});
