import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";

const LOGIN = gql`
  mutation Login($login: Login) {
    login(login: $login) {
      access_token
    }
  }
`;

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsSignedIn } = useContext(AuthContext);
  const [loginFunction, { error, loading, data }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync("access_token", data?.login.access_token);
      setIsSignedIn(true);
    },
  });

  function handleLogin() {
    loginFunction({
      variables: {
        login: {
          username,
          password,
        },
      },
    }).catch((error) => {
      console.error("An error occurred while logging in:", error);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => handleLogin()}>
          <Text>Login</Text>
        </TouchableOpacity>
        <Text variant="titleMedium">or</Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            variant="titleLarge"
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
