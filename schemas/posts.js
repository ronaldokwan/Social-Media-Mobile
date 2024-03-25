import { GraphQLError } from "graphql";

const typeDefs = `#graphql
    type Posts {
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments: [Comments]
        likes: [Likes]
        createdAt: Date
        updatedAt: Date
    }

    type Comments {
        content: String!
        username: String!
        createdAt: Date
        updatedAt: Date
    }

    type Likes {
        username: String!
        createdAt: Date
        updatedAt: Date
    }

    type Query {
        posts: [Posts]
        postsById(id: ID): Posts
    }
    
    type Mutation {
        addPosts(content: String!, tags: String): Posts
    }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    postsById: (_, { id }) => {
      if (!id) {
        throw new GraphQLError("No ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { statusCode: 400 },
          },
        });
      }
      return posts.find((posts) => posts.id === id);
    },
  },
  Mutation: {
    addPosts: (_, { content, tags }) => {
      const newPosts = { id: posts.length + 1, content, tags };
      posts.push(newPosts);
      return newPosts;
    },
  },
};

export { typeDefs, resolvers };
