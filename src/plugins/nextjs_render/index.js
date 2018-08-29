const next = require("next");
const path = require("path");
const nextRenderService = next({
  dir: path.join(__dirname),
  dev: true
});

const { defaultHandler } = require("./hanlders");

module.exports = {
  name: "NextjsRenderPlugin",
  version: "0.0.1",
  register: async function(server, options) {
    // https://github.com/zeit/next.js/blob/master/examples/custom-server-hapi/server.js
    // Or nextRenderService.prepare().then(async () => {
    await nextRenderService.prepare();
    server.route({
      method: "GET",
      path: "/next/{param*}",
      handler: function(request, h) {
        const routerHanlder = defaultHandler(nextRenderService);
        return routerHanlder(request);
      }
    });

    // server.route({
    //   method: 'GET',
    //   path: '/_next/{param*}',
    // })
  }
};
