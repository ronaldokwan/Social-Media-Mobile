import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  typeDefs as typeDefsBooks,
  resolvers as resolversBook,
} from "./schemas/book.js";

const server = new ApolloServer({
  typeDefs: [typeDefsBooks],
  resolvers: [resolversBook],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀  Server ready at: ${url}`);
