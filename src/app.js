const Hapi = require("hapi");

const SampleHandler = require("./handlers/sample");
const SamplePlugin = require("./plugins/sample");
const GraphQLPlugin = require("./plugins/graphql");

const server = new Hapi.Server({
  port: 4000
});

server.route({
  method: "GET",
  path: "/",
  handler: SampleHandler
});

async function startServer() {
  await server.register(SamplePlugin);
  await server.register(GraphQLPlugin);
  await server.start();
}
try {
  startServer();
} catch (error) {
  console.log(`Error while starting server: ${error.message}`);
  return;
}

console.log("Server running at: ", server.info.uri);
