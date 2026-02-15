const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^swiper/css$": "<rootDir>/__mocks__/styleMock.js",
    "^swiper/css/(.*)$": "<rootDir>/__mocks__/styleMock.js",
    "^@/(.*)$": "<rootDir>/$1",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "hooks/**/*.{js,jsx,ts,tsx}",
    "config/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
};

module.exports = createJestConfig(customJestConfig);
