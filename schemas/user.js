import { GraphQLError } from "graphql";

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password:String!
    }

    type Query {
        users: [User]
        userById(id: ID): User
    }
    type Mutation {
        addUser(name: String, username: String!, email: String!, password:String!): User
    }
`;

const resolvers = {
  Query: {
    users: () => users,
    userById: (_, { id }) => {
      if (!id) {
        throw new GraphQLError("No ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { statusCode: 400 },
          },
        });
      }
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    addUser: (_, { name, username, email, password }) => {
      const newUser = { id, name, username };
      users.push(newUser);
      return newUser;
    },
  },
};

export { typeDefs, resolvers };
