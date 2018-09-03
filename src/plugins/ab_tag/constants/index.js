const path = require("path");

const assetPrefix = "tag_next";
const publicPath = path.join(".", "public", "dist");
const distPath = path.join(publicPath, "dist");
const pagesPath = path.join(distPath, "bundles", "pages");

module.exports = {
  assetPrefix,
  publicPath,
  distPath,
  pagesPath
};
