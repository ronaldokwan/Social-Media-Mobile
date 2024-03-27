import Follow from "../models/follow.js";

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    input AddFollow {
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
        throw new Error("No ID provided", {
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
    addFollow: async (_, { addFollow }, contextValue) => {
      contextValue.auth();
      const { followingId, followerId } = addFollow;
      if (!followingId && !followerId) {
        throw new Error("followingId and followerId is required");
      }
      const newFollow = await Follow.create({ followingId, followerId });
      return newFollow;
    },
  },
};

export { typeDefs, resolvers };
