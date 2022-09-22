module.exports = {
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/lib/"],
  testRegex: "(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
  },
};
