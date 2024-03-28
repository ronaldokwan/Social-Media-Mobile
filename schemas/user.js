import validator from "validator";
import User from "../models/user.js";
import { signToken } from "../helpers/jwt.js";
import { comparePassword } from "../helpers/bcrypt.js";

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password:String!
    }

    type UserFollow {
        _id: ID
        name: String
        username: String!
        email: String!
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
        userById(_id: ID): User
        userDetail(username: String): UserFollow
    }

    type Mutation {
        register(register:Register): UserDetail
        login(login:Login): Token
    }
`;

const resolvers = {
  Query: {
    userById: async (_, { _id }, contextValue) => {
      contextValue.auth();
      if (!_id) {
        throw new Error("No ID provided");
      }
      const user = await User.findId(_id);
      if (!user) throw new Error("User not found");
      return user;
    },
    userDetail: async (_, { username }, contextValue) => {
      contextValue.auth();
      if (!username) {
        throw new Error("Username required");
      }
      const user = await User.getDetail(username);
      return user;
    },
  },

  Mutation: {
    register: async (_, { register }) => {
      const { name, username, email, password } = register;
      if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
      }

      if (!validator.isLength(password, { min: 5 })) {
        throw new Error("Password must be at least 5 characters long");
      }

      const existingUsername = await User.findUsername(username);
      const existingEmail = await User.findEmail(email);
      if (existingUsername || existingEmail) {
        throw new Error("Username or email already exists");
      }

      await User.create({ name, username, email, password });
      return { name, username, email };
    },
    login: async (_, { login }) => {
      const { username, password } = login;
      if (!username || !password)
        throw new Error("Invalid username or password");

      const user = await User.findUsername(username);
      if (!user) throw Error("Invalid username or password");

      const checkPassword = comparePassword(password, user.password);
      if (!checkPassword) throw { name: "Invalid email/password" };

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
