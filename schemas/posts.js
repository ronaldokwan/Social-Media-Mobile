import Posts from "../models/posts.js";
import redis from "../config/redis.js";

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

    type PostsDetail {
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
        authorDetail: [AuthorDetail]
    }

    type AuthorDetail {
        _id: ID
        name: String
        username: String
        email: String
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
        postsByDate: [PostsDetail]
        postsById(_id: ID!): PostsDetail
    }
    
    type Mutation {
        addPosts(addPosts:AddPosts): Posts
        addComments(addComments:AddComments): Posts
        addLikes( _id: ID!): Posts
    }
`;

const resolvers = {
  Query: {
    postsByDate: async (_, __, contextValue) => {
      contextValue.auth();
      const redisPosts = await redis.get("posts");
      if (redisPosts) {
        console.log("from redis");
        return JSON.parse(redisPosts);
      } else {
        console.log("from mongodb");
        const posts = await Posts.findByDate();
        await redis.set("posts", JSON.stringify(posts));
        return posts;
      }
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
      console.log(posts);
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
      await redis.del("posts");
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
      await redis.del("posts");
      return posts;
    },
    addLikes: async (_, { _id }, contextValue) => {
      const { username } = contextValue.auth();
      if (!_id) {
        throw new Error("post id is required");
      }
      const posts = await Posts.createLikes({
        _id,
        username,
      });
      await redis.del("posts");
      return posts;
    },
  },
};

export { typeDefs, resolvers };
