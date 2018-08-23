const next = require("next");
const {
  pathWrapper,
  defaultHandlerWrapper,
  nextHandlerWrapper
} = require("./next-wrapper");

const nextRenderService = next({ dev: true });

module.exports = {
  name: "NextjsRenderPlugin",
  version: "0.0.1",
  register: function(server, options) {
    nextRenderService.prepare().then(async () => {
      server.route({
        method: "GET",
        path: "/next/",
        handler: function(request, h) {
          // const result = pathWrapper(nextRenderService, "/a");
          // console.log("result--->", result());
          // return pathWrapper(nextRenderService, "/a");
          // return server.route({
          //   method: "GET",
          //   path: "/a",
          //   handler: pathWrapper(nextRenderService, "/a")
          // });
          return "Next.js";
        }
      });
    });
  }
};
