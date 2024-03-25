import { GraphQLError } from "graphql";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
const typeDefs = `#graphql
    type Book {
        id: Int
        title: String!
        author: String
    }

    type Query {
        books: [Book]
        bookById(id: Int): Book
    }
    type Mutation {
        addBook(title: String!, author: String): Book
    }
`;

const resolvers = {
  Query: {
    books: () => books,
    bookById: (_, { id }) => {
      if (!id) {
        throw new GraphQLError("No ID provided", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { statusCode: 400 },
          },
        });
      }
      return books.find((book) => book.id === id);
    },
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { id: books.length + 1, title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

export { typeDefs, resolvers };
