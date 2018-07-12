const schema = `
  type User {
    id: ID!
    email: String!
  }
  type Query {
    users: [User]
  }
  schema {
    query: Query
  }
`;

module.exports = schema;
