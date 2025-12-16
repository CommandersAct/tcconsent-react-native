const { createRunOncePlugin } = require("@expo/config-plugins");

const pkg = require("../package.json");

const withTCConsentPlugin = (config) => {
  return config;
};

module.exports = createRunOncePlugin(
  withTCConsentPlugin,
  pkg.name,
  pkg.version
)