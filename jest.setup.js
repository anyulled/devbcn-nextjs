import "@testing-library/jest-dom";
import "whatwg-fetch";

jest.mock("@vercel/analytics", () => ({
  track: jest.fn(),
}));
