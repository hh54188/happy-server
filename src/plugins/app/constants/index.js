const path = require("path");

const assetPrefix = "assetPrefix";
const publicPath = path.join(".", "public");
const distPath = path.join(publicPath, "dist");
const pagesPath = path.join(distPath, "bundles", "pages");

module.exports = {
  assetPrefix,
  publicPath,
  distPath,
  pagesPath
};
