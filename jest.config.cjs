module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.+)": "<rootDir>/src/$1",
  },
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  setupFiles: ["./jest.polyfills.js"],
};
