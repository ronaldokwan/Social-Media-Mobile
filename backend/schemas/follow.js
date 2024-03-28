import Follow from "../models/follow.js";
import { gql } from "graphql-tag";

const typeDefs = gql`
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  input AddFollow {
    followingId: ID
  }

  type Mutation {
    addFollow(addFollow: AddFollow): Follow
  }
`;

const resolvers = {
  Mutation: {
    addFollow: async (_, { addFollow }, contextValue) => {
      const { _id } = contextValue.auth();
      const followerId = _id;
      const { followingId } = addFollow;
      if (!followingId) {
        throw new Error("followingId is required");
      }
      const newFollow = await Follow.create({ followingId, followerId });
      return newFollow;
    },
  },
};

export { typeDefs, resolvers };
