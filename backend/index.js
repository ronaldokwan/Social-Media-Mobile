import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { verifyToken } from "./helpers/jwt.js";
import {
  resolvers as resolversFollow,
  typeDefs as typeDefsFollow,
} from "./schemas/follow.js";
import {
  resolvers as resolversPosts,
  typeDefs as typeDefsPosts,
} from "./schemas/posts.js";
import {
  resolvers as resolversUser,
  typeDefs as typeDefsUser,
} from "./schemas/user.js";

const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsPosts, typeDefsFollow],
  resolvers: [resolversUser, resolversPosts, resolversFollow],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: ({ req, res }) => {
    return {
      auth: () => {
        const token = req.headers.authorization;
        if (!token) throw new Error("Invalid Token");

        const data = token.split(" ")[1];
        const decoded = verifyToken(data);
        if (!decoded) throw new Error("Invalid Token");

        return decoded;
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
