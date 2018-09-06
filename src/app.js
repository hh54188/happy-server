const Hapi = require("hapi");
const Inert = require("inert");
const next = require("next");

const sampleHandler = require("./handlers/sample");
const appServicePlugin = require("./plugins/app");

const server = new Hapi.Server({
  port: 4000
});

async function startServer() {
  await server.register(Inert);
  await server.register(appServicePlugin);
  await server.start();
}

server.route({
  method: "GET",
  path: "/",
  handler: sampleHandler
});

try {
  startServer();
} catch (error) {
  console.log(`Error while starting server: ${error.message}`);
  return;
}

console.log("Server running at: ", server.info.uri);
