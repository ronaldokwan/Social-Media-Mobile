import { GraphQLError } from "graphql";
import validator from "validator";
import User from "../models/user";
import { signToken } from "../helpers/jwt";

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password:String!
        followerDetail: [UserDetail]
        followingDetail: [UserDetail]
    }

    type UserDetail {
        _id: ID
        name: String
        username: String
        email: String
    }

    type Token {
        access_token: String
    }

    input Register {
        name: String
        username: String!
        email: String!
        password:String!
    }

    input Login {
        username: String!
        password:String!
    }

    type Query {
        users: [User]
        userById(id: ID): User
    }
    type Mutation {
        register(register:Register): User
        login(login:Login): Token
    }
`;

const resolvers = {
  Query: {
    users: () => User,
    userById: (_, { id }) => {
      if (!id) {
        throw new GraphQLError("No ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { statusCode: 400 },
          },
        });
      }
      return User.find((user) => user.id === id);
    },
  },
  Mutation: {
    register: (_, { name, username, email, password }) => {
      if (!validator.isEmail(email)) {
        throw new GraphQLError("Invalid email format");
      }

      if (!validator.isLength(password, { min: 5 })) {
        throw new GraphQLError("Password must be at least 5 characters long");
      }

      const existingUser = User.find(
        (user) => user.username === username || user.email === email
      );
      if (existingUser) {
        throw new GraphQLError("Username or email already exists");
      }

      const newUser = { name, username, email, password };
      User.push(newUser);
      return newUser;
    },
    login: (_, { username, password }) => {
      const user = User.find((user) => user.username === username);
      if (!user || user.password !== password) {
        throw new GraphQLError("Invalid username or password", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      const token = {
        access_token: signToken({
          _id: user._id,
          username: user.username,
        }),
      };
      return token;
    },
  },
};

export { typeDefs, resolvers };
