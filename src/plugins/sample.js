module.exports = {
  name: "SamplePlugin",
  version: "0.0.1",
  register: function(server, options) {
    server.route({
      method: "GET",
      path: "/plugin/",
      handler: function(request, h) {
        return "Hello Plugin";
      }
    });
  }
};
