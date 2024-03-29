import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register Screen</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
      />

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
      />

      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />

      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
}
