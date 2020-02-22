const path = require("path");

module.exports = {
  collectCoverageFrom: ["**/src/**/*.js"],
  testEnvironment: "jsdom",
  moduleDirectories: [
    "node_modules",
    path.join(__dirname, "test"),
    path.join(__dirname, "src"),
  ],
};
