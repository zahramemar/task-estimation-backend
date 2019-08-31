const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = require("./resolvers");
const typeDefs = "./src/schema.graphql";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({ ...request, prisma })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
