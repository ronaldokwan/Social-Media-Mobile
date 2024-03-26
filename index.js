import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  typeDefs as typeDefsUser,
  resolvers as resolversUser,
} from "./schemas/user.js";
import {
  typeDefs as typeDefsPosts,
  resolvers as resolversPosts,
} from "./schemas/posts.js";
import {
  typeDefs as typeDefsFollow,
  resolvers as resolversFollow,
} from "./schemas/follow.js";
import { verifyToken } from "./helpers/jwt.js";

const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsPosts, typeDefsFollow],
  resolvers: [resolversUser, resolversPosts, resolversFollow],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
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
