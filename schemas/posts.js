import Posts from "../models/posts.js";
const typeDefs = `#graphql
    type Posts {
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
    }

    type Comments {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String!
        createdAt: String
        updatedAt: String
    }

    input AddPosts {
        content: String!
        tags: [String]
        imgUrl: String
    }

    input AddComments{
        _id: ID!
        content: String!
    }

    type Query {
        postsByDate: [Posts]
        postsById(_id: ID): Posts
    }
    
    type Mutation {
        addPosts(addPosts:AddPosts): Posts
        addComments(addComments:AddComments): Posts
        addLikes: Posts
    }
`;

const resolvers = {
  Query: {
    postsByDate: async (_, __, contextValue) => {
      contextValue.auth();
      const posts = await Posts.findByDate();
      return posts;
    },
    postsById: async (_, { _id }, contextValue) => {
      contextValue.auth();
      if (!_id) {
        throw new Error("No ID provided");
      }
      const posts = await Posts.findById(_id);
      if (!posts) {
        throw new Error("No post found");
      }
      return posts;
    },
  },
  Mutation: {
    addPosts: async (_, { addPosts }, contextValue) => {
      const { _id } = contextValue.auth();
      const { content, tags, imgUrl } = addPosts;
      if (!content) {
        throw new Error("content is required");
      }
      const authorId = _id;
      const posts = await Posts.create({
        content,
        tags,
        imgUrl,
        authorId,
      });
      console.log(posts);
      return posts;
    },
    addComments: async (_, { addComments }, contextValue) => {
      const { username } = contextValue.auth();
      const { _id, content } = addComments;
      if (!_id || !content) {
        throw new Error("post id and content are required");
      }
      const posts = await Posts.createComments({
        _id,
        content,
        username,
      });
      return posts;
    },
  },
};

export { typeDefs, resolvers };
