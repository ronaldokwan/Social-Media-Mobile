import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity style={styles.registerButton}>
          <Text
            style={styles.registerButtonText}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  orText: {
    marginBottom: 20,
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
});
