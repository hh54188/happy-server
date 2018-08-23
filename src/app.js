const Hapi = require("hapi");

const sampleHandler = require("./handlers/sample");
const samplePlugin = require("./plugins/sample");

const nextjsRenderPlugin = require("./plugins/nextjs_render");
const reduxRenderPlugin = require("./plugins/redux_render");

// ===== GraphQL Section =====
// const { makeExecutableSchema } = require("graphql-tools");
// const GraphQLPlugin = require("./plugins/graphql");
// const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi");
// const graphqlSchema = require("./plugins/graphql/schema");
// const createResolvers = require("./plugins/graphql/resolvers");
// const executableSchema = makeExecutableSchema({
//   typeDefs: [graphqlSchema],
//   resolvers: createResolvers()
// });
// ===== GraphQL Section =====

const server = new Hapi.Server({
  port: 4000
});

server.route({
  method: "GET",
  path: "/",
  handler: sampleHandler
});

async function startServer() {
  await server.register(samplePlugin);
  await server.register(nextjsRenderPlugin);
  await server.register(reduxRenderPlugin);
  await server.start();
}

try {
  startServer();
} catch (error) {
  console.log(`Error while starting server: ${error.message}`);
  return;
}

console.log("Server running at: ", server.info.uri);
