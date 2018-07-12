const Hapi = require("hapi");
const { makeExecutableSchema } = require("graphql-tools");

const SampleHandler = require("./handlers/sample");
const SamplePlugin = require("./plugins/sample");
const GraphQLPlugin = require("./plugins/graphql");

// ===== GraphQL Section =====
const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi");
const graphqlSchema = require("./plugins/graphql/schema");
const createResolvers = require("./plugins/graphql/resolvers");
const executableSchema = makeExecutableSchema({
  typeDefs: [graphqlSchema],
  resolvers: createResolvers()
});
// ===== GraphQL Section =====

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
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: "/graphiql",
      graphiqlOptions: {
        endpointURL: "/graphql"
      }
    }
  });
  await server.register({
    plugin: graphqlHapi,
    options: {
      path: "/graphql",
      graphqlOptions: {
        schema: executableSchema
      },
      route: {
        cors: true
      }
    }
  });
  await server.start();
}
try {
  startServer();
} catch (error) {
  console.log(`Error while starting server: ${error.message}`);
  return;
}

console.log("Server running at: ", server.info.uri);
