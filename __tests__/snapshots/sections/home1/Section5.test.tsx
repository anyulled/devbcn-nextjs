import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";

jest.mock("@/components/elements/VideoModal", () => () => <div data-testid="video-modal" />);
jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));
jest.mock("swiper/modules", () => ({}));

describe("Home1 Section5 Component", () => {
  it("matches snapshot", async () => {
    const Section5 = (await import("@/components/sections/home1/section5")).default;
    const { container } = render(<Section5 />);
    expect(container).toMatchSnapshot();
  });
});
