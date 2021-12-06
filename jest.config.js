module.exports = {
    testPathIgnorePatterns: ["./.next/", "./node_modules/"],
    setupFilesAfterEnv: ["./setupTests.ts"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "./node_modules/babel-jest",
    },
    testEnvironment: "jsdom"
};