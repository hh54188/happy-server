const Hapi = require("hapi");
const Inert = require("inert");
const next = require("next");

const sampleHandler = require("./handlers/sample");
const samplePlugin = require("./plugins/sample");
const abTagRenderServicePlugin = require("./plugins/ab_tag");

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

async function startServer() {
  await server.register(Inert);
  await server.register(abTagRenderServicePlugin);
  await server.register(samplePlugin);
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
