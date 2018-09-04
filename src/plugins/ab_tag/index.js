const next = require("next");
const path = require("path");
const { assetPrefix, publicPath, pagesPath, distPath } = require("./constants");

const nextRenderService = next({
  dir: path.join(__dirname),
  dev: process.env.NODE_ENV !== "production"
});

const { defaultHandler, nextHandlerWrapper } = require("./hanlders");

module.exports = {
  name: "AbTagRenderService",
  version: "0.0.1",
  register: async function(server, options) {
    // https://github.com/zeit/next.js/blob/master/examples/custom-server-hapi/server.js
    // Or nextRenderService.prepare().then(async () => {
    await nextRenderService.prepare();

    server.route({
      method: "GET",
      path: `/tag/${assetPrefix}/_next/webpack-hmr`,
      handler: function() {
        return nextHandlerWrapper(nextRenderService);
      }
    });

    server.route({
      method: "GET",
      path: "/tag/{param*}",
      handler: function(request, h) {
        return defaultHandler(nextRenderService)(request);
      }
    });

    server.route({
      method: "GET",
      path: `/tag/${assetPrefix}/_next/on-demand-entries-ping`,
      handler: function() {
        return nextHandlerWrapper(nextRenderService);
      }
    });

    server.route({
      method: "GET",
      path: `/tag/${assetPrefix}/_next/-/page/{param*}`,
      handler: {
        directory: {
          path: path.join(__dirname, pagesPath),
          listing: true
        }
      }
    });

    server.route({
      method: "GET",
      path: `/tag/${assetPrefix}/_next/{param*}`,
      handler: {
        directory: {
          path: path.join(__dirname, distPath),
          listing: true
        }
      }
    });
  }
};
