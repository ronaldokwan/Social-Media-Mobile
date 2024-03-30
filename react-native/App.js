import * as React from "react";
import StackNavigator from "./navigators/StackNavigator.js";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext.js";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo.js";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <ApolloProvider client={client}>
        <StackNavigator />
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
