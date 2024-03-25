import { GraphQLError } from "graphql";

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: Date
        updatedAt: Date
    }

    type Query {
        follows: [Follow]
        followById(id: ID): Follow
    }
    type Mutation {
        addFollow(name: String, username: String!, email: String!, password:String!): Follow
    }
`;

const resolvers = {
  Query: {
    follows: () => follows,
    followById: (_, { id }) => {
      if (!id) {
        throw new GraphQLError("No ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { statusCode: 400 },
          },
        });
      }
      return follows.find((follow) => follow.id === id);
    },
  },
  Mutation: {
    addFollow: (_, { name, username, email, password }) => {
      const newFollow = { id, name, username };
      follows.push(newFollow);
      return newFollow;
    },
  },
};

export { typeDefs, resolvers };
