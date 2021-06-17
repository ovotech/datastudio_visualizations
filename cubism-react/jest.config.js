const defaults = {
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/__common__/"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
};

const config = {
  "projects": [
    {
      ...defaults,
      "displayName": "unit",
      "testEnvironment": "node",
    },
    {
      ...defaults,
      "displayName": "integration",
      "testMatch": ["<rootDir>/**/__integration_tests__/*.js"],
      "setupFilesAfterEnv": [
        "./jest.setup.js"
      ],
      "runner": "@jest-runner/electron",
      "testEnvironment": "@jest-runner/electron/environment",
    }
  ],
};

module.exports = config;
