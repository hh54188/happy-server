module.exports = {
  name: "GraphQLPlugin",
  version: "0.0.1",
  register: function(server, options) {
    server.route({
      method: "GET",
      path: "/test",
      handler: function(request, h) {
        return "Hello graphql";
      }
    });
  }
};
