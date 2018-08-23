module.exports = {
  name: "ReduxRenderPlugin",
  version: "0.0.1",
  register: function(server, options) {
    server.route({
      method: "GET",
      path: "/redux/",
      handler: function(request, h) {
        return "Hello Redux";
      }
    });
  }
};
