import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
// import { gql, useMutation } from "@apollo/client";

// const LOGIN = gql`
//   mutation Login($login: LoginInput!) {
//     login(login: $login) {
//       access_token
//     }
//   }
// `;

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loginMutation, { loading, error }] = useMutation(LOGIN);

  // const handleLogin = async () => {
  //   try {
  //     const { data } = await loginMutation({
  //       variables: {
  //         login: {
  //           username,
  //           password,
  //         },
  //       },
  //     });
  //     const { access_token } = data.login;
  //     // Handle the access_token as needed (e.g., store it in AsyncStorage)
  //     console.log("Access Token:", access_token);
  //     // Navigate to the Home screen after successful login
  //     navigation.navigate("Home");
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     // Handle the error as needed (e.g., display an error message)
  //   }
  // };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
      />
      {/* <Button
        title="Login"
        // onPress={handleLogin}
        disabled={loading}
        loading={loading}
      /> */}
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
}
