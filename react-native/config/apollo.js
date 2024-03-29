import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
import dotenv from "dotenv";
dotenv.config();

const httpLink = createHttpLink({
  uri: process.env.URL,
});

const authLink = setContext(async (_, { headers }) => {
  const access_token = await SecureStore.getItemAsync("access_token");
  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;
