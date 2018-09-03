/* eslint-disable */
const withLess = require("@zeit/next-less");
const path = require("path");
const { assetPrefix, distPath } = require("./constants");

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = withLess({
  distDir: distPath,
  assetPrefix,
  cssModules: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  }
});
