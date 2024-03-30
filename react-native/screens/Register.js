import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />
        <TextInput
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => handleRegister()}>
          <Text>Register</Text>
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
