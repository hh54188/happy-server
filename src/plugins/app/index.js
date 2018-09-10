const next = require("next");
const path = require("path");
const { assetPrefix, publicPath, pagesPath, distPath } = require("./constants");

const nextRenderService = next({
  dir: path.join(__dirname),
  dev: process.env.NODE_ENV !== "production",
  distDir: distPath,
  assetPrefix
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
      path: `/app/{param*}`,
      handler: defaultHandler(nextRenderService)
    });

    server.route({
      method: "GET",
      path: `/app/${assetPrefix}/_next/{param*}`,
      handler: async ({ raw, url }, h) => {
        const handler = nextRenderService.getRequestHandler();
        const {
          pathname: originPathname,
          path: originPath,
          href: originHref
        } = url;
        const newURL = {
          ...url,
          pathname: originPathname.replace("/app/assetPrefix", ""),
          path: originPath.replace("/app/assetPrefix", ""),
          href: originHref.replace("/app/assetPrefix", "")
        };
        await handler(raw.req, raw.res, newURL);
        return h.close;
      }
    });

    server.route({
      method: "GET",
      path: `/app/${assetPrefix}/_next/webpack-hmr`,
      handler: async ({ raw, url }, h) => {
        const handler = nextRenderService.getRequestHandler();
        const {
          pathname: originPathname,
          path: originPath,
          href: originHref
        } = url;
        const newURL = {
          ...url,
          pathname: originPathname.replace("/app", ""),
          path: originPath.replace("/app", ""),
          href: originHref.replace("/app", "")
        };
        await handler(raw.req, raw.res, newURL);
        return h.close;
      }
    });

    server.route({
      method: "GET",
      path: `/app/${assetPrefix}/_next/on-demand-entries-ping`,
      handler: nextHandlerWrapper(nextRenderService)
    });
  }
};
