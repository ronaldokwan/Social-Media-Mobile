import { GraphQLError } from "graphql";

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password:String!
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
        login(login:Login): User
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
    addUser: (_, { name, username }) => {
      const newUser = { id, name, username };
      users.push(newUser);
      return newUser;
    },
  },
};

export { typeDefs, resolvers };
