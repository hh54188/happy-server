const next = require("next");
const path = require("path");
const { assetPrefix, publicPath, pagesPath, distPath } = require("./constants");

const nextRenderService = next({
  dir: path.join(__dirname),
  dev: process.env.NODE_ENV !== "production"
});

const { defaultHandler, nextHandlerWrapper } = require("./handlers");

module.exports = {
  name: "AppService",
  version: "0.0.1",
  register: async function(server, options) {
    // https://github.com/zeit/next.js/blob/master/examples/custom-server-hapi/server.js
    // Or nextRenderService.prepare().then(async () => {
    await nextRenderService.prepare();

    server.route({
      method: "GET",
      path: `/app/${assetPrefix}/_next/webpack-hmr`,
      handler: nextHandlerWrapper(nextRenderService)
    });

    server.route({
      method: "GET",
      path: "/app/{param*}",
      handler: defaultHandler(nextRenderService)
    });

    server.route({
      method: "GET",
      path: `/app/${assetPrefix}/_next/on-demand-entries-ping`,
      handler: nextHandlerWrapper(nextRenderService)
    });

    server.route({
      method: "GET",
      path: `/app/${assetPrefix}/_next/-/page/{param*}`,
      handler: {
        directory: {
          path: path.join(__dirname, pagesPath),
          listing: true
        }
      }
    });

    server.route({
      method: "GET",
      path: `/app/${assetPrefix}/_next/{param*}`,
      handler: {
        directory: {
          path: path.join(__dirname, distPath),
          listing: true
        }
      }
    });
  }
};
