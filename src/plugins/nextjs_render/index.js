const next = require("next");
const nextRenderService = next({ dir: "./pages", dev: true });

const {
  pathWrapper,
  defaultHandlerWrapper,
  nextHandlerWrapper
} = require("./next-wrapper");

module.exports = {
  name: "NextjsRenderPlugin",
  version: "0.0.1",
  register: async function(server, options) {
    nextRenderService.prepare().then(async () => {
      server.route({
        method: "GET",
        path: "/next/",
        handler: function(request, h) {
          return defaultHandlerWrapper(nextRenderService, "/")(request);
          // console.log("h.context------>");
          // console.log(h.context, this.app);
          // const result = pathWrapper(nextRenderService, "/a");
          // console.log("result--->", result(request));
          // return pathWrapper(nextRenderService, "/a");
          // return server.route({
          //   method: "GET",
          //   path: "/a",
          //   handler: pathWrapper(nextRenderService, "/a")
          // });
          // return "Next.js";
          // return result(request);
        }
      });
    });
  }
};
