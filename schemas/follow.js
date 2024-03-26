import { GraphQLError } from "graphql";

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    input AddFollow {
        _id: ID
        followingId: ID
        followerId: ID
    }

    type Query {
        follows: [Follow]
        followById(id: ID): Follow
    }

    type Mutation {
        addFollow(addFollow:AddFollow): Follow
    }
`;

const resolvers = {
  Query: {
    follows: (_, __, contextValue) => {
      contextValue.auth();
      follows;
    },
    followById: (_, { id }, contextValue) => {
      contextValue.auth();
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
    addFollow: (_, { name, username, email, password }, contextValue) => {
      contextValue.auth();
      const newFollow = { id, name, username };
      follows.push(newFollow);
      return newFollow;
    },
  },
};

export { typeDefs, resolvers };
