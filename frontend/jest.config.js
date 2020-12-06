module.exports = {
  preset: 'ts-jest',
  "moduleNameMapper": {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  testEnvironment: 'jsdom',
  verbose: true,
  testURL: 'http://localhost/',
  globals: {
    window: {}
  }
};
