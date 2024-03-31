import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation Register($register: Register) {
    register(register: $register) {
      email
      name
      username
    }
  }
`;

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerFunction, { error, loading, data }] = useMutation(REGISTER, {
    onCompleted: async (data) => {
      navigation.navigate("Login");
    },
  });

  function handleRegister() {
    registerFunction({
      variables: {
        register: {
          email,
          name,
          username,
          password,
        },
      },
    }).catch((error) => {
      console.error("An error occurred while registering in:", error);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>YouTube</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRegister()}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text
            style={styles.loginButtonText}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 24,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#ff0000",
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
    color: "#999",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
