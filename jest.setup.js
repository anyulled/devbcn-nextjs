import "@testing-library/jest-dom";
import "whatwg-fetch";

// Mock analytics libraries
jest.mock("@next/third-parties/google", () => ({
  sendGTMEvent: jest.fn(),
  sendGAEvent: jest.fn(),
  GoogleTagManager: () => null,
  GoogleAnalytics: () => null,
}));

jest.mock("@vercel/analytics", () => ({
  track: jest.fn(),
}));
